const fs = require('fs');
const path = require('path');
const jose = require('jose');

async function getAccessToken(clientEmail, privateKey) {
  const formattedKey = privateKey.replace(/\\n/g, '\n');
  const alg = 'RS256';
  
  const pkcs8Key = await jose.importPKCS8(formattedKey, alg);
  
  const jwt = await new jose.SignJWT({
    scope: 'https://www.googleapis.com/auth/webmasters.readonly'
  })
    .setProtectedHeader({ alg })
    .setIssuer(clientEmail)
    .setAudience('https://oauth2.googleapis.com/token')
    .setExpirationTime('1h')
    .setIssuedAt()
    .sign(pkcs8Key);

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  if (!tokenRes.ok) {
    throw new Error(`Failed to exchange GSC JWT token: ${await tokenRes.text()}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function runGSC(historyDir) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const siteUrl = process.env.GSC_SITE_URL || 'https://siphorahq.in/';

  if (!clientEmail || !privateKey) {
    console.log("ℹ️ GSC credentials missing in environment. Marking as 'Not Connected'.");
    const placeholder = { connected: false, reason: 'Credentials (GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY) not set.' };
    fs.writeFileSync(path.join(historyDir, 'gsc.json'), JSON.stringify(placeholder, null, 2));
    return placeholder;
  }

  try {
    console.log("🔑 Authenticating GSC Service Account...");
    const accessToken = await getAccessToken(clientEmail, privateKey);
    console.log("📡 Connected to Google Search Console API. Querying data...");

    const today = new Date();
    const end = today.toISOString().split('T')[0];
    const start = new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0];

    const fetchGscData = async (payload) => {
      const res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );
      if (!res.ok) throw new Error(`GSC Query failed: ${await res.text()}`);
      return await res.json();
    };

    // Overall Totals
    const totalsData = await fetchGscData({ startDate: start, endDate: end });
    const totalRow = totalsData.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    // Top Queries
    const queriesData = await fetchGscData({
      startDate: start,
      endDate: end,
      dimensions: ['query'],
      rowLimit: 10
    });

    // Top Pages
    const pagesData = await fetchGscData({
      startDate: start,
      endDate: end,
      dimensions: ['page'],
      rowLimit: 10
    });

    const report = {
      connected: true,
      siteUrl,
      startDate: start,
      endDate: end,
      totals: {
        clicks: totalRow.clicks,
        impressions: totalRow.impressions,
        ctr: Math.round(totalRow.ctr * 100 * 10) / 10,
        position: Math.round(totalRow.position * 10) / 10
      },
      topQueries: (queriesData.rows || []).map(r => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Math.round(r.ctr * 100 * 10) / 10,
        position: Math.round(r.position * 10) / 10
      })),
      topPages: (pagesData.rows || []).map(r => ({
        page: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: Math.round(r.ctr * 100 * 10) / 10,
        position: Math.round(r.position * 10) / 10
      }))
    };

    fs.writeFileSync(path.join(historyDir, 'gsc.json'), JSON.stringify(report, null, 2));
    return report;

  } catch (e) {
    console.error("🔴 Search Console Integration failed:", e.message);
    const errorData = { connected: false, error: e.message };
    fs.writeFileSync(path.join(historyDir, 'gsc.json'), JSON.stringify(errorData, null, 2));
    return errorData;
  }
}

module.exports = { runGSC };
