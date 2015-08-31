---
layout: post
title: "Dynamic tiles and grids"
date: 2014-03-29 13:06
comments: true
#categories: maps geo nodejs windshaft javascript sql postgis
---

I've been researching hybrids of modern web mapping technologies for a product we're currently developing.

So we can't use the Google Maps *protocolbuffer-vector-tiles-rendered-by-webgl* approach yet. [OpenLayers3](http://twpayne.github.io/ol3/remote-vector/examples/tile-vector.html) and [OpenScienceMap](opensciencemap.org/map/) hint at a bright future in this regard, but for now we're stuck with bitmap tiles.

But we want some interactivity and on-demand rendering with authentication, dynamic filtering and on-the-fly styling. So I made a little proof of concept demo using our PostGIS database, node.js and a modified version of [Windshaft](https://github.com/CartoDB/Windshaft).

{% raw %}
<iframe src="https://player.vimeo.com/video/90395905" width="500" height="344" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> Watch this on <a href="https://vimeo.com">Vimeo</a>.</p>
{% endraw %}

Summary of this technology:

 * Tiles are served by Node.js/Windshaft using four evented workers
 * Pre- and post render hooks allow for custom authentication
 * Styling can be updated using a JSON post containing [CartoCSS](https://www.mapbox.com/tilemill/docs/manual/carto/) rules (using [Millstone](https://www.npmjs.org/package/millstone) and [Grainstore](https://github.com/CartoDB/grainstore))
 * Caching of tiles can be enabled and disabled by specifying it in the GET request in Leaflet/OL
 * Two layers (UTFGrid and the orange dots) are requested using an SQL query which can be modified by the [DAT.gui](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) controller

