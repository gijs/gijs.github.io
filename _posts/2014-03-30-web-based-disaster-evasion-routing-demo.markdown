---
layout: post
title: "Web-based disaster-evasion routing demo"
date: 2014-03-30 22:21
comments: true
#categories: postgis pgrouting maps geo
---

Below is a short demo of a prototype I've been developing using [open](http://pgrouting.org/) [source](http://nodejs.org/) [software](http://www.postgis.net/) and [open](http://www.openstreetmap.org/) [data](http://www.ndw.nu/).

It's basically [Dijkstra's Shortest Path](http://en.wikipedia.org/wiki/Dijkstra's_algorithm) on OpenStreetMap data. The web interface allows a user to draw polygons to mark areas where traffic is impossible due to an event.

In a future iteration, these polygons can come from [other sources](http://www.3di.nu/) as well.

The routing algorithm will route the shortest path around that area, as you can see in the demo:

{% raw %}
<iframe src="https://player.vimeo.com/video/89597517" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
Watch this on <a href="https://vimeo.com">Vimeo</a>.
{% endraw %}

To make this a bit more interesting, I wrote a Node.js parser for the ['NDW databank'](http://www.ndw.nu/pagina/nl/4/databank/) which provides semi-realtime (5 minute updates) traffic information from over 60,000 sensors in the dutch highways and secondary roads. This data is provided in SOAP format, so imagine the hoops I had to jump through to parse this with Node in a fast way. Code is available on request.

A visualisation of a small portion of the NDW data: (the legend is not related to the dots)

![Routing with NDW data](/images/routing-demo-with-ndw-data.jpg)

The hardest part was developing the 70 line SQL statement to determine the 'routing cost' of a route due to current traffic pressure. The SQL is also available for anyone interested.