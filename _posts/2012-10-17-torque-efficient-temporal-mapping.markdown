---
layout: post
title: "Torque: Efficient temporal mapping"
date: 2012-10-17 13:25
comments: true
#categories: dataviz cartography maps
---
[Torque](https://github.com/CartoDB/torque) is a library for rendering large amounts timeseries data in the client (browser). It's tied to [CartoDB](http://cartodb.com/) and uses a [datacube](http://en.wikipedia.org/wiki/Data_cube) format. For a brief introduction to the format and methods, see [this presentation](/images/cartodb_datacubes.pdf) and [this Wikipedia article](http://en.wikipedia.org/wiki/OLAP_cube).

Have a look at [the demo](http://cartodb.github.com/torque/).

[![Image](/images/torque_demo.png "Torque demo") ](http://cartodb.github.com/torque/ "github.com")

As you can see, it uses the brilliant [DAT.gui](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) controller for interaction, something I've been doing in a pet project as well, after seeing it in several WebGL demos.

For a more complete experience, have a look at [this demo](http://www.guardian.co.uk/news/datablog/interactive/2012/oct/01/first-world-war-royal-navy-ships-mapped) from [The Guardian](http://www.guardian.co.uk/).

[![Image](/images/datacube_schematic.png "Datacube") ](http://en.wikipedia.org/wiki/OLAP_cube "wikipedia.org")

This seems like a perfect match for the [3Di](http://www.3di.nu/) [web client](http://test.3di.lizard.net/) we're building at [Nelen & Schuurmans](http://www.nelen-schuurmans.nl/).