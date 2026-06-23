---
title: "QGIS in the browser, with real geometry"
date: 2026-06-23T10:00:00+02:00
draft: false
---

I built a demo that runs QGIS compiled to WebAssembly in the browser, exposes GEOS to JavaScript, and adds multiplayer editing on top. It's called gisma, and you can try it at [gisma-4cbc4e.netlify.app](https://gisma-4cbc4e.netlify.app/).

There are plenty of web map editors. What's different here is that the geometry engine is real. When you run a buffer or an intersect in gisma, it's not a JavaScript approximation — it's GEOS, the same C++ library that powers QGIS, PostGIS, Shapely, and most of the serious GIS stack, compiled to WebAssembly and called directly from the browser.

## What GEOS is and why it matters

GEOS is a geometry engine that implements the OpenGIS Simple Features specification. It handles things like: does polygon A intersect polygon B? What's the union of these two geometries? Buffer this point by 50 kilometres. These operations sound straightforward but the edge cases are deep — coordinate precision, self-intersecting rings, degenerate geometries, floating point errors accumulating across complex shapes. GEOS has been solving these problems for twenty years. Any JavaScript alternative would be starting from scratch.

Compiling GEOS to WebAssembly means none of that work needs to be redone. The same code paths, the same robustness guarantees, the same handling of Antimerica-crossing polygons and polar coordinates — all of it runs in a browser tab at near-native speed.

The demo exposes two operations from the right-hand panel: **buffer** (expand a geometry outward by a given distance) and **intersect** (return the overlapping area between two layers). Both produce new layers in the layer list, which can then be inspected, styled, or used as inputs to further operations.

## The multiplayer layer

Geometry engines are infrastructure. What makes gisma interesting as a product direction is the editing model on top of it.

Multiple users can edit the same feature set simultaneously. Changes propagate in real time — if one person moves a vertex, everyone else sees it move. This is not unusual for document editors, but it's still rare in GIS tools, where the collaboration model is usually: export a file, share it, import it, reconcile conflicts manually.

The technical approach here uses CRDTs (Conflict-free Replicated Data Types) to handle concurrent edits to geographic features without a central arbitration server deciding which edit wins. Geometric operations like buffer and intersect are computed locally, in WASM, and their outputs sync to other connected clients as new layers.

## What QGIS contributes

The QGIS compilation is what makes the layer model, the symbology engine, and the rendering pipeline available without reimplementing them. The UI in the screenshot is recognisably QGIS-derived — layer panel on the left, properties on the right — but running entirely in the browser.

This is a different bet than most browser GIS tools make. Most start with a web-native stack (Mapbox GL, Deck.gl, Turf.js) and try to build GIS functionality on top. gisma starts with the GIS functionality and runs it in a web environment. The tradeoff is bundle size and load time for startup; the gain is that you're not rebuilding GEOS in JavaScript.

## Where this is going

The demo uses a world countries GeoJSON as a test dataset — colourful, topologically well-behaved, a good stress test for the rendering pipeline. The real application is in professional GIS workflows where you want to hand someone a URL instead of a QGIS installation.

Water network editing, land parcel review, infrastructure planning — any context where multiple people need to look at and modify geometry together, without a desktop GIS dependency, is a potential fit. The stack is unusual enough that I'm still figuring out the boundaries of what it makes practical.
