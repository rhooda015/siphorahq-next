# SEO Audit Log - siphorahq.in

This file logs the periodic SEO audits of `siphorahq.in`.

---

## [2026-06-30] 🚀 PRODUCTION DEPLOYMENT VERIFICATION

**Deployed:** `https://siphorahq.in` via Vercel (deployment `dpl_Hb7tyX7iUu4vDeySDmSUe1smWvqH`)
**Method:** Lighthouse CLI against live production URLs (no CDN cold-start bias)

### ✅ Infrastructure Checks
| Check | URL | Status | Response Time |
| :--- | :--- | :--- | :--- |
| Homepage | https://siphorahq.in | **200 OK** | 2.0s |
| robots.txt | https://siphorahq.in/robots.txt | **200 OK** | 0.8s |
| sitemap.xml | https://siphorahq.in/sitemap.xml | **200 OK** | 0.4s |

**robots.txt Content:**
```
User-Agent: *
Allow: /
Disallow: /account/
Disallow: /api/
Disallow: /checkout/
Disallow: /cart/
Disallow: /admin/
Disallow: /*?*
Sitemap: https://siphorahq.in/sitemap.xml
```

**sitemap.xml:** Valid, contains all key URLs with `https://siphorahq.in` canonical domain ✅

### ✅ noindex Scan — 12/12 Pages Clean
All public pages verified `noindex`-free on production:
`/` `/products` `/collections` `/our-story` `/contact` `/gifting` `/care-instructions` `/login` `/faq` `/new-arrivals` `/best-sellers` `/gift-sets`

### ✅ Page Metadata Verified (Live HTML)
| Page | Title | H1 |
| :--- | :--- | :--- |
| `/` | Siphorahq — Luxury Porcelain Dinnerware India | Luxury Porcelain Tea Cups & Dinnerware in India |
| `/products` | Shop Premium Porcelain Cups, Tea Sets & Dinnerware \| Siphorahq | Shop All Porcelain |
| `/collections` | Luxury Porcelain Collections \| Siphorahq | Curated Collections |
| `/our-story` | Our Story \| Premium Porcelain Tableware for Elegant Indian Homes \| Siphorahq | Crafting Everyday Dining into Something Beautiful |
| `/contact` | Contact Us — SiphoraHQ Customer Care | Get in Touch |

### 📊 Production Lighthouse Scores (Real — https://siphorahq.in)
| Page | Performance | SEO | Accessibility | LCP | CLS | TBT |
| :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| `/` (Homepage) | 70 | **100** ✅ | 95 | 5.5 s | **0** ✅ | 180 ms |
| `/products` | 68 | **100** ✅ | 94 | 9.3 s | **0** ✅ | — |
| `/collections` | 77 | **100** ✅ | 96 | 5.7 s | **0** ✅ | — |
| `/our-story` | 69 | **100** ✅ | 96 | 5.6 s | **0** ✅ | — |
| `/contact` | 82 | **100** ✅ | 84 | 4.5 s | **0** ✅ | — |
| `/products/[id]` | 47 | 92 | 86 | 14.9 s | **0** ✅ | — |

**CLS = 0 across ALL pages** — zero layout shift, premium UX ✅

### ⚠️ Remaining Issues
1. **Product detail SEO 92** (not 100) — Lighthouse flagged missing structured data fields on the test product. Static products need `@type: Product` schema with `aggregateRating`. 
2. **LCP on product detail (14.9s)** — caused by Cloudinary image fetch from external CDN with no `preconnect` hint. Fix: add `<link rel="preconnect" href="https://res.cloudinary.com">` to `layout.tsx`.
3. **Performance scores 68–77** — the JS bundle is large (NextAuth, Razorpay, Mongoose). These are structural — acceptable for a full-stack ecommerce app at this stage.

### Summary
- **SEO = 100/100** on homepage, products, collections, our-story, contact ✅
- **CLS = 0** across all pages ✅  
- **noindex = 0** on all public pages ✅
- **robots.txt + sitemap.xml = 200** ✅
- **Canonical domain = https://siphorahq.in** ✅

---

## [2026-06-29] SEO Growth Dashboard & Proactive Audit

### 📊 SEO GROWTH DASHBOARD [2026-06-29]
* **Overall SEO Score:** **94/100** (Technical & Content)
* **Indexed Pages (Google):** **Pending GSC Sync**
* **Technical Issue Count:** **21**
* **Lighthouse Performance:** **60/100**
* **GSC Impressions (30d):** **Not Connected**
* **GSC Organic Clicks (30d):** **Not Connected**
* **GSC Avg. Position (30d):** **Not Connected**
* **Auto-Fixes Applied:** **0**

---

### 🔍 Keyword Search Position Tracking
* **Status:** Not Connected (No dynamic query rankings)
*No active Search Console query metrics available due to connection status.*

---

### 🕵️ Live Competitor Gap Audit
| Competitor | Crawl Status | Title Patterns / Findings | Gaps & Notes |
| :--- | :---: | :--- | :--- |
| Nestasia | SUCCESS | Modern Home Decor by Nestasia - India&#39;s Most Loved Lifestyle Store | Successfully crawled. Title uses length of 70 characters. |
| Ellementry | SUCCESS | Shop Handmade Lifestyle and Homeware Products
 &ndash; ellementry | Successfully crawled. Title uses length of 65 characters. |
| Elvy | SUCCESS | Luxury Home Decor Accessories Store - ELVY Lifestyle | Successfully crawled. Title uses length of 52 characters. |

---

### ⚖️ Transparent Scoring & Verification Evidence
* **Technical SEO:** **25/25**
  - ✅ robots.txt is present and valid (+5)
  - ✅ sitemap.xml is present and configured (+5)
  - ✅ No broken internal links found (+15)
* **Indexability:** **20/20**
  - ✅ Canonical domains configured correctly (+10)
  - ✅ No pages contain index-blocking noindex directives (+5)
  - ✅ No orphan pages detected (+5)
* **Content & Meta:** **15/15**
  - ✅ All pages have unique titles, descriptions, and H1 tags (+15)
* **Performance:** **18.8/25**
  - ✅ Average Lighthouse Performance Score: 75/100 (+18.8)
* **Structured Schema:** **10/10**
  - ✅ Structured schema data is valid (+10)
* **Internal Linking Flow:** **5/5**
  - ✅ Internal link structure is fluid (+5)

---
## [2026-06-29] Initial Run
- **Indexed Pages (Google):** 0
- **Robots.txt:** Passed (Valid, allows crawl, sitemap configured)
- **Sitemap.xml:** Passed (Valid, HTTP 200, contains 23 URLs)
- **Homepage (HTTP 200):** Passed
- **Homepage Title:** "Siphorahq — Luxury Porcelain Dinnerware India" (Passed)
- **Homepage Meta Description:** "Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide." (Passed)
- **Homepage Robots Noindex Check:** Passed (No noindex tag present)
- **Brand Visibility ("siphorahq"):** No external websites or backlinks indexed.
- **Trend:** Initial check. Indexed pages: 0.