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
