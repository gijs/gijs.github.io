---
layout: post
title: "Interactivity in Mapping Apps"
date: 2011-10-24 13:15
comments: true
#categories: maps wms gis cartography javascript
---
At [Nelen & Schuurmans](http://www.nelen-schuurmans.nl/ "Nelen & Schuurmans"), we currently build our GIS/mapping webapplications using [Mapnik](http://www.mapnik.org/ "Mapnik") and [GDAL](http://www.gdal.org/ "GDAL") to render overlays, rasters, WMS sources, polygons/shapefiles et cetera. We then let [OpenLayers](http://www.openlayers.org/ "OpenLayers") handle the clientside drawing and layering using the supported mapping APIs (Google, Bing, [OSM](http://www.openstreetmap.org/ "OpenStreetMap")).

This works well, and Mapnik/GDAL is a powerful combination of mature software projects. There's one obvious downside though: interactivity. The serverside rendered images are static in itself. OpenLayers handles a lot of stuff, like custom tile loading, markers and boxes, but there's a trend in other frameworks to do a lot more in terms of clientside interactivity:

Leaflet
-------
[Leaflet](http://leaflet.cloudmade.com/features.html "Leaflet") by [CloudMade](http://cloudmade.com/ "CloudMade") is one of them, supporting tile layers, polylines, polygons, circles, markers, popups, image overlays, WMS layers and GeoJSON. Interactive features include 'drag panning', 'scroll wheel zoom', 'double click zoom', 'shift-drag zoom to bounding box' on the Desktop, and 'Touch-drag panning', 'Multi-touch zoom (iOS only)', 'Double tap zoom' and 'Panning inertia' on mobile browsers (iOS, Android). Another interesting feature is CSS3 styling of popups.

The code is on Github: [https://github.com/CloudMade/Leaflet](https://github.com/CloudMade/Leaflet "https://github.com/CloudMade/Leaflet").

Rotary Maps
-----------
Another interesting clientside Javascript/SVG mapping library is [Rotary Maps](http://thumbtack.github.com/rotarymaps/ "Rotary Maps"). It combines [RaphaelJS](http://raphaeljs.com/ "RaphaelJS") with the [V3 Google Maps API](http://code.google.com/apis/maps/documentation/javascript/ "V3 Google Maps API") to layer vector graphics on top of the map.

Code also on Github: [https://github.com/thumbtack/rotarymaps](https://github.com/thumbtack/rotarymaps "https://github.com/thumbtack/rotarymaps")
