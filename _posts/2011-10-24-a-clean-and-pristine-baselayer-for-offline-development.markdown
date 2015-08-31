---
layout: post
title: "A Clean &amp; Pristine Baselayer for Offline Development"
date: 2011-10-24 13:20
comments: true
#categories: maps
---
When using online services to provide the baselayer for your app, you depend on an Internet connection to be able to see and develop anything. I was looking for a clean baselayer that I could serve locally on my laptop.


![](/images/baselayer_mapbox.png)


I found [World Light](http://mapbox.com/#/tileset/world-light "World Light") ([world-light.mbtiles, 1220MB](http://a.tiles.mapbox.com/mapbox/download/world-light.mbtiles "world-light.mbtiles, 1220MB")) from the great folks at [MapBox](http://mapbox.com/ "MapBox").

It's in [MBTiles](http://mbtiles.org/ "MBTiles") format ([full spec](https://github.com/mapbox/mbtiles-spec "full spec"), based on SQLite, for easy offline use).

Recommended tileservers are [Tilestache](http://tilestache.org/ Tilestache) (Python) and [tilelive.js](https://github.com/mapbox/tilelive.js/ "tilelive.js") / [TileStream](https://github.com/mapbox/TileStream "TileStream") (both for Node.js)