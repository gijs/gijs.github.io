---
layout: post
title: "Playing with Kartograph"
date: 2012-09-19 12:10
comments: true
#categories: cartography maps
---

[![Image](/images/kartograph-experiment.png "Kartograph experiment") ](http://gijs.github.com/kartograph-experiment/ "gijs.github.com")

I've [mentioned](http://gijs.github.com/blog/2012/03/21/kartograph/) [Kartograph](http://kartograph.org/) before. It's a framework for building interactive map applications without Google Maps or any other mapping service. It was created with the needs of designers and data journalists in mind. 

For the past months I've been working on a project involving semi-schematic rendering of rivers on a map, and the logical choice for mapping was to use OpenLayers with WMS sources.
This goes a very long way but has obvious shortcomings:

 * Lots of parts: postgis, geoserver, openlayers, custom code, caching, 3rd party WMS
 * Makes a complicated technical stack
 * Lots of server side configuration
 * Interactivity is hard
 * Styling is possible but limited (graphs via Google Charts is as good as it gets?)
 * Too detailed (not every project needs to be able to zoom in to my backyard)

Kartograph seems to find a nice middle ground here:

 * Works in IE thanks to [Raphael.js](http://raphaeljs.com/)
 * Can work with [PostGIS](http://kartograph.org/docs/kartograph.py/#adding-postgis-layers) and shapefile sources.
 * Allows for easy, client-side, debuggable [graphs and charts on the map](http://kartograph.org/showcase/charts/)


As an experiment, I converted some shapefiles to WGS84 and loaded them using Kartograph.
They need to be configured in config.json as such:
{% highlight javascript %}
{
    "layers": {
        "pkb": {
            "class": "pkb",
            "src": "pkb.wgs.shp"	
        },
        "ivm": {
            "class": "ivm",
            "src": "ivm.wgs.shp"
        },
        "kms": {
            "class": "kms",
            "src": "kms.wgs.shp"
        },
        "nederland": {
            "src": "NLD_adm3.shp"
        }
    },
    "bounds": {
        "mode": "bbox", 
        "data": [3.18,50.7,7.30,53.6]
    }
}
{% endhighlight %}

Next, I wrote a basic stylesheet:

{% highlight css %}
.pkb {
    stroke-width: 2px;
    fill: #1e5799;
}
.kms {
    stroke-width: 4px;
    fill: #ccc;
}
{% endhighlight %}


Then I ran:
{% highlight bash %}
$ kartograph -s style.css config.json -o pkb.svg
{% endhighlight %}

The resulting SVG file can be loaded using kartograph.js [Demo here](http://gijs.github.com/kartograph-experiment/) (not simplified, so takes a while)