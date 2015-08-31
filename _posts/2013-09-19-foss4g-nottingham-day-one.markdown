---
layout: post
title: "FOSS4G Nottingham"
date: 2013-09-19 11:14
comments: true
categories: gis conference geo
---

We thought Nottingham was good for drinking some pints and playing some darts, but [it turns out there was more to this city than meets the eye](http://www.gizmodo.in/news/Laser-Scanning-Hundreds-of-Artificial-Caves-Beneath-Nottingham/articleshow/24501064.cms).

[![Image](/images/gizmodo-nottingham.jpg "Laser scanning hundreds of artificial caves beneath Nottingham") ](http://www.gizmodo.in/news/Laser-Scanning-Hundreds-of-Artificial-Caves-Beneath-Nottingham/articleshow/24501064.cms)


Plenary session
---------------
Lots of well-deserved thank-you's. The take-home was simple: buy beer for everyone who helped make the [Foss4g conference](http://2013.foss4g.org/) possible!


Keynote: MapStory
-----------------
The most interesting part was the keynote by [Chris Tucker](https://twitter.com/mapstory) about [MapStory](http://mapstory.org/). It's basically a spatiotemporal storytelling tool, built using several infamous Open Source tools like [Mediawiki](http://www.mediawiki.org/), [OpenLayers](http://openlayers.org/), [GeoNode](http://geonode.org/). Take a look at [this map of new prisons built in the US from 1811-2004](http://mapstory.org/maps/933/). It's like Wikipedia for maps. Note to self: check this out tonight.
  
 
 
Shortest Path Search For Real Road Networks With pgRouting
----------------------------------------------------------
A talk by [Hal Seki](https://twitter.com/hal_sk) of [Georepublic Japan](http://georepublic.co.jp/) about the curreny state and the possibilities of PGRouting. PGRouting is (just) a PostGIS extension and library which implements routing algorithms like [Dijkstra](http://en.wikipedia.org/wiki/Dijkstra's_algorithm) (the only one in the beginning), [Traveling Salesperson](http://en.wikipedia.org/wiki/Travelling_salesman_problem) (TSP) and [Shortest Path](http://en.wikipedia.org/wiki/Shortest_path_problem). 

The project is now at v2.0, and this release features a new [All Pairs Shortest Path](http://docs.pgrouting.org/dev/src/apsp_johnson/doc/index.html) [algorithm](http://en.wikipedia.org/wiki/Johnson's_algorithm). It also implements the Bi-directional A* Shortest Path and the One-to-Many Shortest Path algorithm and a new TSP resolver.

Other release highlights are:

* Modular library design
* Unit tests + TravisCI setup
* Compatibility with PostgreSQL 9.1+ and PostGIS 2.0+
* And as such (finally) installs as an extension to PostGIS
* Better documentation

Most users use it for road networks (shows pictures of junctions, flyovers and country roads) but PGRouting isn't limited to any type of network. Canals and rivers, for example, can also be routed! Any kind of node/graph network can be traversed and it need not be planar per-se.

The true power of PGRouting is that the 'costs' of anything on your network, like accidents, traffic lights, disasters et cetera, is totally dynamic. It's just SQL after all, so all of its declarative power applies here as well.
So for example not only road types but also conditions (rain, flooding) can matter for the 'costs'. All costs are dynamic! This is the opposite of pre-calculated. It's a matter of flexibility vs speed. 
Certain binary precalculated routing engines are faster by definition, but they don't provide the flexibility of changing the cost of anything at anytime.
So PGRouting is not competing with highly optimized binary solutions, but instead focuses on flexibility. 

Your choice should depend on the use-case.

More information at [github.com/pgRouting](http://github.com/pgRouting/)


Linear Referencing And Dynamic Segmentation For Modelling (linear) Assets: An Application For A Road Network
------------------------------------------------------------------------------------------------------------
Presented by Andrés Maneiro of [iCarto](http://iCarto.es/), a talk about [Linear Referencing](http://en.wikipedia.org/wiki/Linear_referencing) (LRS), a method of spatial referencing, in which the locations of features are described in terms of measurements along a linear element, from a defined starting point, for example a milestone along a road. (thank Wikipedia for that).

He basically showed how they implemented it at iCarto using gvSig, using [this plugin](github.com/iCarto/road-network-catalog) he wrote.
I was expecting more information and examples about how it can be useful in the real world as with roads, water and sanitation networks, rivers or electrical grids. But still, good to hear about how he used LRS to good effect.


GDAL/OGR Project Status
-----------------------
Then I rushed to the next college hall for Frank Warmerdam and Even Rouault. There was room for maybe 30 people but it was already filled to the max when I arrived. Luckily the FOSS4G quickly opened another huge room.

I asked what had happened to the GSoC GPU enhancement project. Frank explained that he now works with that student again at the [Planet Labs](http://planet-labs.com/) so there may be some progress on that front. But at the same time he doesn't really seem to believe in GPU acceleration for GDAL except perhaps for warping operations. Well, as long as it's fast we're all happy I guess.


(This post may be updated later on.)