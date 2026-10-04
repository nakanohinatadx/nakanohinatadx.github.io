# Project Guide

## Purpose

This repository is a static GitHub Pages site with a dashboard and six feature pages. It has no server-side runtime or build step.

## Pages and supported features

The dashboard links to all six feature pages:

```text
index.html
```

The Taiwan example shows a fixed Taiwan location on Leaflet/OpenStreetMap alongside a fixed YouTube video:

```text
01_Live_Stream_Location.html
```

The Japanese-language camera map fetches the camera database, displays camera markers, supports text search and hierarchical category filters, and uses category emoji as marker icons. Selecting a marker loads its YouTube video or attempts the channel's current live stream; a YouTube link is available when embedding is unavailable.

```text
02_Japan_Live_Camera_Map.html
```

The Japan map includes a device-location button. It requests a one-time browser location, focuses the map, and displays the reported accuracy radius. Browser permission and a secure context such as HTTPS are required. The map uses a roughly 65/35 map/video split on wide screens and stacks the panels on narrower screens.

The GPS location page uses Leaflet with OpenStreetMap tiles and requests a one-time device location only after the user selects the current-location button. Browser permission and a secure context such as HTTPS are required.

```text
03_GPS_Location.html
```

The GPS page can save each captured fix in browser `localStorage` and display it as a page marker. These markers are overlays and do not create or edit OpenStreetMap data. Saved fixes remain in that browser unless its site storage is cleared. The information panel shows one selected fix; the record picker opens a dialog to select another saved fix and focus the map on its marker. Displayed location includes coordinates and accuracy. Timestamps use the device's local time with a numeric UTC offset, in `YYYY-MM-DD HH:MM:SS +HH:MM` format.

The GPS page can send up to 10 unsent saved fixes per email through EmailJS. The user reviews the message before sending. EmailJS is a client-side external service; do not add private credentials or server-side dependencies to this static site.

The Taiwan street store page records GPS pins in browser IndexedDB, applies the Japanese A-H / A.1-H.3 category taxonomy, and lets the user select records for manual EmailJS sending. The location and category are stored locally first. Its email rows contain values only, in the documented ten-field order.

```text
04_Taiwan_Street_Store_Map.html
```

The Taiwan store database map fetches the public, repository-backed store database and displays the shared locations on Leaflet/OpenStreetMap with category icons, search, and two-level category filters. It does not read or merge another visitor's IndexedDB.

```text
05_Taiwan_Store_Database_Map.html
```

The Taiwan store visit planner reads the same database, lets the user select stops, computes a stop order in browser JavaScript using driving-time matrices from the OSRM public demo, displays the returned road route on OSM, and can hand the ordered stops to Google Maps. It may request the current location only after an explicit button click. The public router is best-effort; this static page does not host a routing server or persist itineraries across devices.

```text
06_Taiwan_Store_Visit_Planner.html
```

The local database updater is a local tool, not a GitHub writer or a page in the dashboard. It loads the current JSON and provides create, read/list, edit, and delete actions plus validated EmailJS row import. Pasted rows skip IDs already present. All changes remain in browser memory until the user downloads the updated JSON, replaces the repository copy, and commits/pushes it. Data sync is one-way from the local updater/repository to the public GitHub Pages database.

```text
local_taiwan_store_db_update.html
```

## Data and dependencies

The Japan camera map database is:

```text
dB/map_embeded_db.json
```

Its current snapshot contains 394 locations and a Japanese two-level taxonomy. The number of records can change when the data is refreshed. `mapIndex` is the map database's local four-digit index. `source.recordId` and `source.pageId` refer to the original Cametan record; keep those identifiers distinct.

The Taiwan store database is:

```text
dB/taiwan_store_db.json
```

It uses schema version 1 with a `records` array. Each record has an `id`, `recordedAt`, a `location` object (`latitude`, `longitude`, `accuracyMeters`, `positionAdjusted`), and a `category` object (`level1Id`, `level1Label`, `level2Id`, `level2Label`). Optional `isSample: true` marks synthetic demo rows; keep those visibly identified and do not present them as real observations. The EmailJS value row order is `id`, `recordedAt`, `latitude`, `longitude`, `accuracyMeters`, `positionAdjusted`, `level1Id`, `level1Label`, `level2Id`, `level2Label`. Preserve this order when handling returned rows. Category IDs A-H and A.1-H.3 are stable; labels must agree with the selected IDs.

The store database is served publicly by GitHub Pages. Do not put credentials or data intended to be private in this file. The local updater produces a replacement download; it does not publish changes until the JSON is committed and pushed. Keep the database path's exact capitalization in the repository and pages 05/06 fetch paths.

Pages 03-06 use the same browser-only PBKDF2 passphrase gate and session unlock. This is a visual screening gate only: the static HTML, JavaScript, and public JSON remain directly accessible, and this must not be described as encryption or authorization.

The data path is case-sensitive on GitHub Pages. Preserve the exact spelling shown above in both the repository and the page. The pages use CDN-hosted Tailwind CSS, Leaflet, and Lucide where included. OpenStreetMap tile attribution must remain visible when changing map integrations.

## Editing guidance

- Keep the site compatible with static hosting. Load local data with relative paths; do not add a server-side dependency or build requirement without an explicit request.
- Keep the dashboard links pointed at the matching page filenames, including the GPS location page.
- Keep the page 05/06 dashboard links, `dB/taiwan_store_db.json` schema, page 05/06 fetch logic, and local updater's parser/editor/serializer in sync when changing shared-store data.
- Keep page 05 markers sourced from each record's `location` and category icon sourced from `category.level1Id`. Preserve the OSM attribution.
- Keep page 06 route points sourced from the selected database records and preserve its OSM attribution. It uses an external, best-effort driving router; do not imply offline or guaranteed routing.
- Keep EmailJS row import deduplicated by record ID. The local updater may explicitly edit or delete records, but all CRUD changes must remain local until the exported JSON is pushed. Never add automatic browser-to-GitHub writes or embed a GitHub credential in these static pages.
- Store database rows are public once pushed to GitHub Pages. Do not use this flow for private locations or credentials.
- Keep the Taiwan page's existing English/Traditional Chinese content and the Japan page's Japanese interface unless a requested change calls for translation.
- Keep the GPS page's Japanese interface unless a requested change calls for translation. Keep browser storage, map markers, displayed records, and batch-email state consistent when changing its history behavior.
- When changing the Japan map data shape, update both the page logic and the camera database together. Keep marker coordinates sourced from each record's location.
- Preserve YouTube video/channel links and the fallback behavior for records that cannot be embedded.
- Avoid committing temporary files, editor backups, credentials, or generated artifacts unrelated to the site.

## Verification

- For HTML changes, check tag and attribute structure and verify internal links.
- For map or data changes, check that the JSON parses, the page's relative data path matches the repository casing, and coordinates/category IDs are read from the current schema.
- Use focused syntax checks for inline JavaScript when it changes. No build system or automated test suite is defined.
