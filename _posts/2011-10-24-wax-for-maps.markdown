---
layout: post
title: "Wax for Maps"
date: 2011-10-24 13:12
comments: true
#categories: maps gis javascript
---
Wax is a set of tools for adding controls and layers to maps. It works together with a map server (serving tiles) and a Javascript library (basically combining the tiles).

The Wax documentation discourages the use of OpenLayers because it's excessively complex and bloated for most map operations. It warns against the use of Polymaps because its SVG engine is not supported by IE7. So then what are we supposed to use? Apparently, [Modest Maps](https://github.com/stamen/modestmaps-js "Modest Maps") is the [library of choice](http://mapbox.github.com/wax/manual/index.html#comparison-of-mapping-libraries "library of choice"). It was initially written in Actionscript, and ported to Python and Javascript.

Modest Maps features a simple interface with stuff like touch controls for mobile devices, fullscreen mode, a nice point-selector, a zoombox and more.

Unfortunately, Modest Maps can currently show only one layer, unlike OpenLayers. That's why I especially like the combination with [Leaflet](http://weblog.nyholt.nl/post/5890801177/interactivity-in-mapping-apps "Leaflet"). This allows layering and more of the functionality found in OpenLayers. Have a look at the [demo](http://mapbox.github.com/wax/manual/index.html#leaflet "demo"), and try zooming on the map. It's feels as smooth as some of the Silverlight demos I've seen.

So Wax integrates and extends several pieces of mapping software. Highly recommended for use when OpenLayers is deemed too heavy.