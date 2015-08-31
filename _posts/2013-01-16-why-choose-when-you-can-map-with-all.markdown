---
layout: post
title: "Why choose when you can map with all?"
date: 2013-01-16 12:09
comments: true
#categories: gis development
---

When we started building [Lizard](http://lizard.org/), there weren't much mapping libraries to choose from. So we built it around [OpenLayers](http://www.openlayers.org/), which is still a very powerful web mapping toolkit.

Then came [Leaflet](http://www.leafletjs.com/), which I used for several quick experiments such as a split screen feature (not publicly demo-able).

[![Image](/images/splitscreen_leaflet.png "Leaflet splitscreen") ](http://www.deltaportaal.nl/)

I opted for Leaflet because of the [simple API](http://leafletjs.com/reference.html), which is comprehensive and complete, especially compared to the [OpenLayers documentation](http://trac.osgeo.org/openlayers/wiki/Documentation).

Our Lizard software is quite closely-coupled (as opposed to [loosely-coupled](http://en.wikipedia.org/wiki/Loose_coupling)) to it's mapping solution, so we had major problems shifting to Leaflet.

I've been thinking about an abstraction layer, but it seemed like a lot of work and maintenance. Fortunately, I just ran across [Mapstraction](http://mapstraction.com), which does exactly that: an interface above Leaflet, Google, OpenLayers and many more. Have a look at [their sandbox](http://mapstraction.appspot.com) or at [mapstraction/mxn](https://github.com/mapstraction/mxn) at [Github](http://github.com).