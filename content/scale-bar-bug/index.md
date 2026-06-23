---
title: "Tracking down an invisible scale bar"
date: 2026-03-10T11:00:00+02:00
draft: false
---

One of our users filed a bug report with a screenshot attached: the map scale bar had disappeared. The screenshot showed a perfectly normal-looking Rana map viewer, publications panel on the left, layer controls on the right — and no scale bar where there should have been one. The bug was filed as a screenshot but the most useful thing turned out to be a screen recording.

Scale bars are one of those UI elements that nobody notices until they're gone. They're cartographic furniture, and when they're present and correct they're invisible in the best way. When they disappear, the first response is usually "was there always a scale bar here?"

## Reproducing it

The recording made reproduction straightforward. The scale bar vanished only when the user had switched the base map from the default OpenStreetMap layer to the Dutch topographic background (BRT Achtergrondkaart) and then zoomed past a certain threshold. At high zoom levels on the default basemap, the scale bar was fine. On the Dutch topographic background at the same zoom, gone.

That's a useful clue. The two basemaps are served at different tile sizes and use slightly different projection handling for the Netherlands — the Dutch topo map is optimised for the Dutch RD New coordinate system rather than Web Mercator. Our scale bar calculation was pulling the map's current projection to compute the physical distance represented by a pixel at the current zoom level, and something in that calculation was producing a negative or zero value when the RD New projection metadata came back in an unexpected format.

## The fix

The immediate fix was defensive: if the calculated scale bar width falls below a minimum threshold or comes back as NaN, fall back to a Web Mercator approximation rather than hiding the element. The proper fix was to handle the RD New projection spec correctly, which required tracing through the proj4 library to find where the unit conversion was going wrong.

The issue was that the RD New projection returns linear units in metres, but the field name for that in the proj4 definition string is `units=m` rather than the more common `to_meter` form. Our parser was reading the wrong field and silently returning undefined, which the downstream code was treating as a falsy zero.

## What it taught us

We had a test for scale bar rendering but not for scale bar rendering on non-standard projections. That test now exists. We also added a visible console warning when the scale bar falls back to approximation mode, so if this happens in a different projection context we'll see it immediately rather than waiting for a user report.

Screen recordings are worth a thousand screenshots for localisation bugs. It's worth reminding users to record rather than screenshot when they notice something spatial going wrong.
