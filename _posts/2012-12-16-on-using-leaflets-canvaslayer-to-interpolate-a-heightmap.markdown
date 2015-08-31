---
layout: post
title: "On using Leaflets CanvasLayer to interpolate a heightmap"
date: 2012-12-16 22:45
comments: true
#categories: gis
---

{% raw %}<iframe width="420" height="315" src="http://www.youtube.com/embed/sCxUXGMuYm4" frameborder="0" allowfullscreen></iframe>{% endraw %}

I've been tinkering with several pieces of web technology for the last couple of days. At my [company](http://www.nelen-schuurmans.nl/), we're doing a lot of water/hydrology related GIS analysis, and we build tools to facilitate this. 

For one such project, we're working with very expensive yet very high resolution LIDAR raster data of The Netherlands, the AHN2, which stands for 'Actual Heightmap of the Netherlands'. This data set runs in the hundreds of gigs worth of storage, and it's not yet preprocessed as tiles for me as a tinkerer to consume.

In the meantime however, the Dutch government has [opened up a lot of data](https://www.pdok.nl/en) for which we, the public, have paid. One of these is [the AHN25m](https://www.pdok.nl/en/node/151). It's a [25 meter grid](http://www.ahn.nl/bestellen/keuze_ahn_1_of_ahn_2) which is not very precise, but good enough for my proof of concept.

For the purpose of research and development, I've set up a [VirtualBox](https://www.virtualbox.org/) managed with [Vagrant](http://vagrantup.com/), like most of my experimental projects these days. See [my Vagrantfile](https://gist.github.com/4313624) for details or a quick up and running.

Next, I manually installed [Mapproxy](http://mapproxy.org/), which is a Swiss army knife for anything tile/wms related.

Quite some time went into figuring out the exact configuration for consuming the WMS of the AHN25m on one side, and caching the TMS version on my system in the proper directory structure. This is what I ended up with:

```
services:
  demo:
  tms:
  # wmts:
  # wms:
    # srs: ['EPSG:4326', 'EPSG:900913', 'EPSG:28992']

layers:
   - name: ahn25m
     title: ahn25m
     sources: [ahn_cache]

caches:
  ahn_cache:
    format: image/png
    grids: [ahn_grid]
    sources: [ahn]
    meta_buffer: 0
    cache:
      type: file
      use_grid_names: true
      directory_layout: tms


grids:
  ahn_grid:
    tile_size: [256, 256]
    srs: 'EPSG:900913'
    # bbox: [-20037508.342789, -20037508.342789, 20037508.342789, 20037508.342789]
    # bbox_srs: 'EPSG:900913'

sources:
  ahn:
    type: wms
    req:
      url: http://geodata.nationaalgeoregister.nl/ahn25m/wms
      layers: ahn25m

```

Then, I installed nginx and Gunicorn/Eventlet using aptitude, and configured nginx to proxy to both Mapproxy and Node.js, where I'm running an evented API against PostGIS/PGRouting.

This is the nginx config:
```
upstream routing_app {
    server 127.0.0.1:3000;
}

server {
        listen   0.0.0.0:80; 

        root /vagrant/hoogtekaart;
        index index.html index.htm;

        server_name 33.33.33.26;

        location /mapproxy {
            proxy_pass http://localhost:8080;
            proxy_set_header Host $http_host;
            proxy_set_header X-Script-Name /mapproxy;
        }
        location /routing/ {
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header Host $http_host;
              proxy_set_header X-NginX-Proxy true;

              proxy_pass http://routing_app/;
              proxy_redirect off;
        }
        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to index.html
                try_files $uri $uri/ /index.html;
                # Uncomment to enable naxsi on this location
                # include /etc/nginx/naxsi.rules
        }

}
```

Next, I ran Mapproxy on 8080 using Gunicorn:

``` bash
$ gunicorn -k eventlet -w 4 -b :8080 config:application
```

And then node.js on port 3000:

``` bash
$ node app.js
```

Important snippets of javascript:

``` javascript
...
canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
  // :::::::::: CANVAS :::::::::::


  var ctx = canvas.getContext('2d');
  var img = new Image();
  var url = 'http://33.33.33.26/mapproxy/tiles/ahn25m_EPSG900913/'+zoom+'/'+tilePoint.x+'/'+tilePoint.y+'.png?origin=nw';
...
```

The code is available for anyone interested. Drop by on Twitter or e-mail.