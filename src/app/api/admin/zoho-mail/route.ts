import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import StoreSettings from '@/models/StoreSettings';

async function getZohoAccessToken(clientId: string, clientSecret: string, refreshToken: string, region: string) {
  const url = `https://accounts.zoho${region}/oauth/v2/token`;
  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token'
  });

  const response = await fetch(`${url}?${params.toString()}`, { method: 'POST' });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.access_token;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const settings = await StoreSettings.findOne();
    
    if (!settings?.zohoClientId || !settings?.zohoClientSecret || !settings?.zohoRefreshToken) {
      return NextResponse.json({ error: 'Zoho Mail not configured', configured: false }, { status: 400 });
    }

    const region = settings.zohoRegion || '.in';
    const accessToken = await getZohoAccessToken(settings.zohoClientId, settings.zohoClientSecret, settings.zohoRefreshToken, region);

    // 1. Get Accounts
    const accountsRes = await fetch(`https://mail.zoho${region}/api/accounts`, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` }
    });
    const accountsData = await accountsRes.json();
    if (!accountsData.data || accountsData.data.length === 0) {
      throw new Error('No Zoho Mail accounts found');
    }
    const accountId = accountsData.data[0].accountId;

    // 2. Get Folders
    const foldersRes = await fetch(`https://mail.zoho${region}/api/accounts/${accountId}/folders`, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` }
    });
    const foldersData = await foldersRes.json();

    // 3. Get Recent Emails from Inbox (assuming folderId for Inbox is fetched or just use 'messages/view' without folder defaults to all/Inbox)
    // Actually, mail.zoho.com/api/accounts/{accountId}/messages/view is valid
    const messagesRes = await fetch(`https://mail.zoho${region}/api/accounts/${accountId}/messages/view?limit=20`, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` }
    });
    const messagesData = await messagesRes.json();

    return NextResponse.json({
      configured: true,
      folders: foldersData.data || [],
      messages: messagesData.data || [],
      accountId
    });

  } catch (error: any) {
    console.error('Zoho Mail API Error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to fetch Zoho Mail', configured: true }, { status: 500 });
  }
}
