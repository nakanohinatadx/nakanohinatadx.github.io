# Project Guide

## Purpose

This repository is a static GitHub Pages site with a small dashboard and three map pages. It has no server-side runtime or build step.

## Pages and supported features

The dashboard links to all three map pages:

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

## Data and dependencies

The Japan camera map database is:

```text
dB/map_embeded_db.json
```

Its current snapshot contains 394 locations and a Japanese two-level taxonomy. The number of records can change when the data is refreshed. `mapIndex` is the map database's local four-digit index. `source.recordId` and `source.pageId` refer to the original Cametan record; keep those identifiers distinct.

The data path is case-sensitive on GitHub Pages. Preserve the exact spelling shown above in both the repository and the page. The pages use CDN-hosted Tailwind CSS, Leaflet, and Lucide where included. OpenStreetMap tile attribution must remain visible when changing map integrations.

## Editing guidance

- Keep the site compatible with static hosting. Load local data with relative paths; do not add a server-side dependency or build requirement without an explicit request.
- Keep the dashboard links pointed at the matching page filenames, including the GPS location page.
- Keep the Taiwan page's existing English/Traditional Chinese content and the Japan page's Japanese interface unless a requested change calls for translation.
- Keep the GPS page's Japanese interface unless a requested change calls for translation. Keep browser storage, map markers, displayed records, and batch-email state consistent when changing its history behavior.
- When changing the Japan map data shape, update both the page logic and the camera database together. Keep marker coordinates sourced from each record's location.
- Preserve YouTube video/channel links and the fallback behavior for records that cannot be embedded.
- Avoid committing temporary files, editor backups, credentials, or generated artifacts unrelated to the site.

## Verification

- For HTML changes, check tag and attribute structure and verify internal links.
- For map or data changes, check that the JSON parses, the page's relative data path matches the repository casing, and coordinates/category IDs are read from the current schema.
- Use focused syntax checks for inline JavaScript when it changes. No build system or automated test suite is defined.
