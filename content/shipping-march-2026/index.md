---
title: "What we shipped in March"
date: 2026-03-31T09:00:00+02:00
draft: false
---

March was a productive month for Rana. Looking at the delivery board, a good mix of user-facing improvements and internal tooling work made it through.

On the visible side, we finished implementing emoji reactions on Rana Publications — a small feature that had been requested for a while and turned out to add a surprising amount of life to otherwise static reports. We also fixed a long-standing clickable hit area issue for line elements and polygon borders in the map viewer: features at the edges of layers were nearly impossible to select with a click, which was especially frustrating on touch devices.

Search in the Create Study Area process got a fix too. Previously, the search field would hold on to its value after a user cleared the selection, causing confusion when restarting a search. Small fix, real improvement.

## In progress

The largest in-flight item at the end of the month was raster styling in Publications 2.0. This is a meaningful upgrade: instead of the flat colour exports we currently produce, users will be able to style raster calculation outputs directly within a publication, choosing colour ramps and breakpoints. We're doing this through a new styling panel that lives alongside the map view.

A few things moved into the To Do column that will carry into April: fullscreen toggle for map viewers, a direct deep-link from QGIS's schematisation manager into Rana, and a Touch Devices issue around an unexpected "Null island" placement on first coordinate study area load.

## Bugs fixed

The raster panel overlapping the scroll area in Publication Viewer was quietly driving people mad. Fixed. A contributor filter list UI glitch also got resolved — a cosmetic issue but one of those things that erodes trust in the product when it's visible to collaborators you're sharing a publication with.

The most technically interesting bug was one introduced by an external library update: a new schematisation was silently using an outdated spatial reference, which caused geometry to come in slightly off. We caught it because a water authority noticed that their pump stations weren't landing on the right streets.
