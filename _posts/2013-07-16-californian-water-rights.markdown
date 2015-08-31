---
layout: post
title: "California Water Rights"
date: 2013-07-16 17:58
comments: true
#categories: gis geo dataviz
---
{% blockquote %}
<a href="http://projects-ca.statewater.org/water-rights">California Water Rights</a> is an interactive map of water rights held in California.
{% endblockquote %}

The design of the project is very 'physical atlas'-like, using old style graphics and the elegant Rosario typeface.

I like this design because it uses the map as part of a project page which tells a certain story, instead of using a fullscreen map viewer with layers and letting the user figure it out themselves.

[![Image](/images/calif-water-rights-1.jpg "California Water Rights") ](http://projects-ca.statewater.org/water-rights)

The map has limited controls: zoom and layers using the [Mapbox.js](http://www.mapbox.com/mapbox.js/api/v1.3.0/) library. A large portion of the screen estate is reserved for the information and legend panel on the right hand side.
The right panel is also used for the 'search' and 'sensors' functionality.

[![Image](/images/calif-water-rights-2.jpg "California Water Rights") ](http://projects-ca.statewater.org/water-rights)

[![Image](/images/calif-water-rights-3.jpg "California Water Rights") ](http://projects-ca.statewater.org/water-rights)

Information about the use of the site and the use of the API is all on the same page. Also, the HTTP API which is directly available is as good as it gets in open data.

[![Image](/images/calif-water-rights-4.jpg "California Water Rights") ](http://projects-ca.statewater.org/water-rights)

Libraries like [Mapbox.js](http://www.mapbox.com/mapbox.js/api/v1.3.0/) and [Cartodb.js](http://cartodb.github.io/cartodb.js/examples/TheHobbitLocations/) make spatial/temporal datavisualization quite easy.

There's a reason they're used by [newspapers](http://www.guardian.co.uk/news/datablog/interactive/2012/aug/02/syria-deaths-map) all the [time](http://project.wnyc.org/transit-time/#40.71044,-73.89121,14,1211).
