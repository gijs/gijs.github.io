---
layout: post
title: "One last linkdump in 2011"
date: 2011-12-30 10:03
comments: true
#categories: linkdump
---

Waterunderground
----------------
[Waterunderground][7] is an interactive visualization of global ground-water fluctuations on a monthly basis from 2002 to present. 

[![Screenshot of waterunderground.info][2]][1]

It was built with the infamous [Three.js][6].

Navigation is located in the footer.

The data used is from NASA's Gravity Recovery and Climate Experiment (GRACE), [freely available here][5] and courtesy of the UC Center for Hydrologic Modeling. 


Flood Map 3D Simulation 
----------------------- 
A web-based flood simulation is developed for navigating over the flood inundation map of Cedar Rapids, Iowa. [More here][9].

{% raw %}<iframe width="420" height="315" src="http://www.youtube.com/embed/DacnztjhSsQ" frameborder="0" allowfullscreen></iframe>{% endraw %}
 

Flood Game
----------
A [flood game][3] in HTML5 ([Youtube][4])

[![Floodgame screenshot][8]][3]

[More videos][10] from Ibrahim Demir of the Iowa Flood Center


OpenScalesGL
------------
[OpenScalesGL][11] is the HTML5/WebGL version of the ActionScript-based "rich mapping" framework. The video below is a preview of what's coming in summer 2012.

{% raw %}<iframe width="560" height="315" src="http://www.youtube.com/embed/ZBeUdYrLQK8" frameborder="0" allowfullscreen></iframe>{% endraw %}

Another video, [Desktop Firefox][12] (Youtube).



ReadyMap Web SDK
----------------
[ReadyMap][13] is a free Javascript library for 3D/2D web mapping. It works with TMS/WMS and WebGL. ([Github repo][14]).

If your video card and webbrowser are recent enough, check out [the demos][15]. Especially [this one][16] which renders layers from an ESRI ArcGIS Server.


Nokia Maps 3D WebGL Beta
------------------------
[100% 3D maps, 0% plug-in][17], currently in beta. 

{% raw %}<iframe width="560" height="315" src="http://www.youtube.com/embed/qsHZrELLUIc" frameborder="0" allowfullscreen></iframe>{% endraw %}

Tip: Try zooming in a bit to Cape Town or New York and click on the label. It beautifully zooms in and goes into more detail. Very nice.



USGS Texture Blending demo
--------------------------
A [visualization][18] of the [USGS][21] elevation data using Three.js/WebGL. Technical background information [here][19].
More WebGL from [Chandler Prall][20].


WebGL Nature Scene
------------------
[![Screenshot of  WebGL nature scene][23]][22]

A [WebGL nature scene][22] based upon NVIDIA's Nature demo project.

[Live demo][24].

This is an effort to integrate some interesting shader based rendering techniques to present realistic-looking nature scene on web using Javascript and WebGL ([SpiderGL to be precise][25]). The techniques applied in this demo include:

 * Multi-layered Terrain
 * Waving Grass with Countless Blades
 * Realistic Water Simulation with Reflection and Refraction
 * Dynamic Cloudy Sky Dome
 * Flying Birds with Flocking Behaviour


Earthquake Visualization
------------------------
[![Screenshot of Nine Point Five][28]][26]

[Nine Point Five][26] is a WebGL visualization exploring earthquakes over the past 30 years. ([More information][27])
Built by [Dean McNamee][29] who also seems to do nice physical world experiments.



World Flights
-------------
[World Flights][30] is a WebGL visualization of major airline flights, built using [Sencha's][32] [PhiloGL Framework][31] by [Nicolas Garcia Belmonte][33].


Miscellaneous Links
-------------------
 * [GPU-accelerated heightmap generation in WebGL](http://www.klocatelli.name/2011/11/10/gpu-accelerated-heightmap-webgl/)
 
 * [libnoise.js](https://github.com/jmcneese/libnoise.js)
 
 * [Streaming Level of Detail Terrain using SpiderGL](http://spidergl.org/example.php?id=8)
 
 * [OpenWebGlobe beta](http://www.openwebglobe.org/beta/) from the University of Applied Sciences Northwestern Switzerland.

 * [SceneJS](http://scenejs.org/), a JSON-based scene graph API on WebGL. [2.0 release](http://blog.xeolabs.com/scenejs-20-release)
 





[1]: http://www.waterunderground.info/
[2]: /images/waterunderground.jpg
[3]: http://myweb.uiowa.edu/demir/lab_floodgame.asp
[4]: http://www.youtube.com/watch?v=TZOeux99vJI
[5]: http://www.visualizing.org/datasets/global-water-mass-grace-satellite-monthly-data-2002-11
[6]: https://github.com/mrdoob/three.js/
[7]: http://www.waterunderground.info/
[8]: http://myweb.uiowa.edu/demir/lab/floodgame/s0.png
[9]: http://myweb.uiowa.edu/demir/lab_floodwebgl.asp
[10]: http://www.youtube.com/user/idemiriowa?feature=watch
[11]: http://openscales.org/news/openscalesgl-announce.html
[12]: http://www.youtube.com/watch?v=kV_oHYGyCj0
[13]: http://readymap.com/websdk.html
[14]: https://github.com/gwaldron/godzi-webgl
[15]: http://demo.pelicanmapping.com/rmweb/webgl/tests/index.html
[16]: http://demo.pelicanmapping.com/rmweb/webgl/tests/arcgis.html
[17]: http://maps3d.svc.nokia.com/webgl/
[18]: http://chandler.prallfamily.com/webgl/blending/
[19]: http://chandler.prallfamily.com/2011/06/blending-webgl-textures/
[20]: http://chandler.prallfamily.com/webgl/
[21]: http://seamless.usgs.gov/
[22]: http://code.google.com/p/webgl-nature-scene/
[23]: http://webgl-nature-scene.googlecode.com/svn/screenshots/small10.jpg
[24]: http://webgl-nature-scene.googlecode.com/svn/trunk/nature.html
[25]: http://spidergl.org/index.php
[26]: http://www.chromeexperiments.com/detail/nine-point-five/?f=
[27]: http://www.ninepointfive.org/about.html
[28]: http://www.ninepointfive.org/static/assets/ninefive.jpg
[29]: http://www.deanmcnamee.com/
[30]: http://senchalabs.github.com/philogl/PhiloGL/examples/worldFlights2/index.html
[31]: http://senchalabs.github.com/philogl/
[32]: http://www.sencha.com/
[33]: http://philogb.github.com/