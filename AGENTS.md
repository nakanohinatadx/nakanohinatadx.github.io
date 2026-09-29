# Project Guide

## Purpose

This repository is a static GitHub Pages site with a small dashboard and two map pages. It has no server-side runtime or build step.

## Pages and supported features

- `index.html` is the dashboard. It links to both map pages.
- `01_Live_Stream_Location.html` is the original Taiwan example. It shows a fixed Taiwan location on Leaflet/OpenStreetMap alongside a fixed YouTube video.
- `02_Japan_Live_Camera_Map.html` is the Japanese-language camera map. It fetches `dB/map_embeded_db.json`, displays camera markers, supports text search and hierarchical category filters, and uses category emoji as marker icons. Selecting a marker loads its YouTube video or attempts the channel's current live stream; a YouTube link is available when embedding is unavailable.
- The Japan map includes a device-location button. It requests a one-time browser location, focuses the map, and displays the reported accuracy radius. Browser permission and a secure context such as HTTPS are required.
- The Japan map uses a roughly 65/35 map/video split on wide screens and stacks the panels on narrower screens.

## Data and dependencies

- `dB/map_embeded_db.json` is the camera-map input. Its current snapshot contains 394 locations and a Japanese two-level taxonomy. The number of records can change when the data is refreshed.
- `mapIndex` is the map database's local four-digit index. `source.recordId` and `source.pageId` refer to the original Cametan record; keep those identifiers distinct.
- The data path is case-sensitive on GitHub Pages. Preserve the exact `dB/map_embeded_db.json` spelling in both the repository and the page.
- The pages use CDN-hosted Tailwind CSS, Leaflet, and Lucide where included. The OpenStreetMap tile attribution must remain visible when changing map integrations.

## Editing guidance

- Keep the site compatible with static hosting. Load local data with relative paths; do not add a server-side dependency or build requirement without an explicit request.
- Keep the dashboard links in `index.html` pointed at the matching page filenames.
- Keep the Taiwan page's existing English/Traditional Chinese content and the Japan page's Japanese interface unless a requested change calls for translation.
- When changing the Japan map data shape, update both the page logic and `dB/map_embeded_db.json` together. Keep marker coordinates sourced from each record's location.
- Preserve YouTube video/channel links and the fallback behavior for records that cannot be embedded.
- Avoid committing temporary files, editor backups, credentials, or generated artifacts unrelated to the site.

## Verification

- For HTML changes, check tag and attribute structure and verify internal links.
- For map or data changes, check that the JSON parses, the page's relative data path matches the repository casing, and coordinates/category IDs are read from the current schema.
- Use focused syntax checks for inline JavaScript when it changes. No build system or automated test suite is defined.
