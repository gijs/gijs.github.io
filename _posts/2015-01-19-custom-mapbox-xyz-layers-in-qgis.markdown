---
layout: post
title: "Custom Mapbox Layers in QGIS"
date: 2015-01-19 09:51
comments: true
#categories: qgis mapbox geo
---

Ever wanted to include pretty background layers in [QGIS](http://www.qgis.org/en/site/)?

Here's a relatively easy way to show, for example, customized [Mapbox](http://www.mapbox.com/) layers or any kind of XYZ tiles.

 * In a directory of your choice, create a tab-separated file named `mm.tsv`, which should look like this:

 ```
 LizardNXT	Mapbox	http://a.tiles.mapbox.com/v3/yourmap.idhere/{z}/{x}/{y}.png	1	13	17
 ```

 * Find your Map ID on the [Mapbox Projects page](https://www.mapbox.com/projects/) and put it in the place of `yourmap.idhere`.

 * Start QGIS (tested in 2.4.0) and install the [TileLayer](https://plugins.qgis.org/plugins/TileLayerPlugin/) via Plugins > Manage and Install

 * Choose Web > TileLayerPlugin > Add Tile Layer

 * Choose Settings, click on "External layer definition directory" and select the directory where you put the file `mm.tsv`

 * Choose OK


![Image](/images/mapbox-qgis.jpg "Mapbox in QGIS")