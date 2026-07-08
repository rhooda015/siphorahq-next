# SEO Changelog - siphorahq.in

This log tracks all Technical SEO fixes and search optimizations deployed on the codebase.

## [2026-06-29] Technical SEO & Indexing Optimizations

### 1. Canonical Domain Standardization (Critical)
- **Fix:** Fixed a critical base domain mismatch in `src/lib/metadata.ts` where the `metadataBase` was configured to `https://www.siphorahq.in` instead of the canonical `https://siphorahq.in`.
- **Fix:** Corrected all `www.` prefix URLs in `src/lib/metadata.ts` and `src/components/ProductSchema.tsx` to use the canonical domain `https://siphorahq.in` directly to prevent crawler redirect chains.
- **Impact:** Eliminates canonical loop errors in Google Search Console, consolidating indexing signals on the root domain.

### 2. Sitemap, Footer, & Redirection Alignment (High)
- **Fix:** Identified navigation split between `/about` and `/our-story`.
- **Fix:** Updated the sitemap generator (`src/app/sitemap.ts`) and the site footer (`src/components/Footer.tsx`) to link to `/our-story` instead of the legacy `/about` route.
- **Fix:** Configured permanent (301) redirects in `next.config.mjs` to redirect `/about` to `/our-story`.
- **Impact:** Directs all internal link equity and crawler budgets to the primary brand story page.

### 3. Duplicate Page Consolidation (High)
- **Fix:** Unified multiple duplicate shipping policies (`/shipping`, `/shipping-returns`) into the canonical `/shipping-policy` route.
- **Fix:** Unified returns details from `/returns` to the canonical `/refund-policy` route.
- **Fix:** Configured 301 redirects in `next.config.mjs` for all legacy variations:
  - `/shipping` -> `/shipping-policy`
  - `/shipping-returns` -> `/shipping-policy`
  - `/returns` -> `/refund-policy`
- **Impact:** Prevents duplicate content penalties while preserving user access.

### 4. Brand Spelling and Capitalization Standardization (High)
- **Fix:** Standardized the brand name from `SiphoraHQ` (mixed case) to `Siphorahq` (lowercase h) across all titles, descriptions, metadata templates, and structured JSON-LD schemas.
- **Impact:** Aligns Google's brand entity understanding, improving search relevance matching for "Siphorahq".

### 5. Page-Level Metadata Extensions (Medium)
- **Fix:** Attached custom metadata exports to previously unoptimized pages: `/faq`, `/why-choose-us`, `/sustainability`, `/craftsmanship`, `/terms-of-service`, and `/journal`.
- **Impact:** Ensures clean search snippets (titles and descriptions) for secondary pages instead of generic fallbacks.

### 6. HTML Validation & Hydration Resolution (Medium)
- **Fix:** Resolved invalid nested `<ul>` tag within `<p>` on `/why-choose-us/page.tsx`, resolving Next.js rendering warnings.
- **Impact:** Ensures correct DOM parsing by Google's headless rendering bots.

### 7. App Manifest Correction (Medium)
- **Fix:** Corrected name and description fields in `/public/manifest.json` which incorrectly stated "Luxury Indian Fashion / ethnic wear" to "Siphorahq - Luxury Porcelain Dinnerware".
- **Impact:** Prevents Google from miscategorizing the brand entity in vertical searches.

### 8. Homepage Brand Signals (Medium)
- **Fix:** Modified the hidden H1 tag on the homepage (`src/app/page.tsx`) from "Luxury Porcelain Tea Cups & Dinnerware in India" to "Siphorahq — Luxury Porcelain Tea Cups & Dinnerware in India".
- **Impact:** Directly establishes branded topical authority on the entry page.
