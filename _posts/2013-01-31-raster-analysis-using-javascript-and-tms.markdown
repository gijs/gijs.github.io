---
layout: post
title: "Raster Analysis using Javascript and TMS"
date: 2013-01-31 10:21
comments: true
#categories: javascript gis
---


I've been [playing with the Canvas layer](/blog/2012/12/16/on-using-leaflets-canvaslayer-to-interpolate-a-heightmap/) in Leaflet. That was a nice preview of what is possible using client-side Canvas drawing. 

Now for some next level stuff, [Aaron Togle](https://github.com/atogle) showed off his experiment in client-side raster analysis at [JS.Geo](http://www.jsgeo.org/). ([presentation](https://speakerdeck.com/atogle/leaflet-web-maps-for-better-cities))

It [stitches tiles together](https://github.com/atogle/tile-stitcher.js) to form a screen-size image on the [Canvas element](http://leafletjs.com/reference.html#tilelayer-canvas). Then it performs some [basic](https://github.com/atogle/costdistance.js) [raster](http://webhelp.esri.com/arcgisdesktop/9.3/index.cfm?TopicName=Cost%20Distance%20algorithm) [analysis](http://svn.osgeo.org/grass/grass/trunk/raster/r.cost/r.cost.html) on that image, and draws the result [on the map](http://walkshed.js.s3.amazonaws.com/index.html) at the geographic location.

Imagine the possibilities!


[![Image](/images/clientside_raster_analysis.jpg "walkshed.js") ](http://walkshed.js.s3.amazonaws.com/index.html "walkshed.js demo")




