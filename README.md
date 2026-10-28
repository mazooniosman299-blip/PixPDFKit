# PixPDFKit — أدوات PDF مجانية / Free PDF tools

Website: **https://mazooniosman299-blip.github.io/PixPDFKit/ar/** (Arabic), [English](https://mazooniosman299-blip.github.io/PixPDFKit/en/).

13 PDF tools, 46 bilingual HTML pages and practical guides. All file processing happens in the browser. Some JavaScript libraries are fetched from trusted public CDNs, so an internet connection is needed.

## Live hosting (free)
The project is live in the isolated `PixPDFKit/` directory of the public GitHub Pages origin repository `mazooniosman299-blip.github.io`. The existing root homepage and unrelated projects were retained.

Production release: `PixPDFKit-website.zip`. The publishing workflow in the Pages origin repository copies the validated package into its isolated folder. GitHub Pages then serves the static site. The `ci/smoke.js` Chromium end-to-end suite tests conversion and actual downloads across all 13 tools via `.github/workflows/smoke.yml`.

The optional standalone GitHub Pages workflow is manual-only because standalone Pages is not enabled for this repository.

## AdSense and limitations
A `github.io` subdirectory is **not a standalone domain eligible for direct AdSense submission**. Google requires a supported domain (or an official host-partner route). Do not add a random AdSense publisher ID to `ads.txt`; verify ownership/account and domain eligibility before submission.

Some encrypted PDFs cannot be opened. Compression re-renders PDF pages as images, which can remove selectable/searchable text or increase size. PDF editing can invalidate signatures and interactive elements. Large documents are constrained by browser memory.

## AdSense zero-budget site integration (October 28, 2026)

- **AdSense site to consider submitting:** `mazooniosman299-blip.github.io` (hostname only, no `/PixPDFKit/` suffix). The PDF app stays at `https://mazooniosman299-blip.github.io/PixPDFKit/ar/`.
- The root hostname already serves `/ads.txt` with `google.com, pub-5086201923236113, DIRECT, f08c47fec0942fa0`. Never copy the cancelled secondary account publisher ID `pub-8746785804696048`.
- Publisher verification meta is deployed on **all PixPDFKit HTML pages**, injected automatically by the origin repository's `.github/workflows/sync-pixpdfkit.yml`. The originating ZIP is intentionally ad-free until the official site/account review; this is a verification meta tag, not ad inventory.
- The original root homepage links to PixPDFKit, and the root sitemap and robots.txt point visitors and crawlers to the PDF hub and its sitemap. The original root tools are preserved.
- GitHub CI browser conversion tests passed. The publishing workflow completed successfully on 2026-10-28.
- **NOT YET COMPLETE:** Sign in to the publisher's *correct* AdSense account, confirm active account/payment setup, add `mazooniosman299-blip.github.io` to Sites if the AdSense UI accepts it, select meta tag verification and submit for review. Only Google can approve. A PSL-listed GitHub hostname may be accepted in site management, but acceptance is not guaranteed; do not buy domains or use a second AdSense account as a workaround.
- After official approval, add the real AdSense code and any required EEA/UK/Swiss CMP/consent implementation and update privacy notices **before advertising is activated**.
