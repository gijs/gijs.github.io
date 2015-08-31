---
layout: post
title: "TopoJSON vector layers with rotated text labels in OL3"
date: 2014-04-08 08:44
comments: true
#categories: geo maps ol3js tilestache javascript
---

![OpenLayers 3 Canvas Vector tiles](/images/ol3vectortiles.gif)

Open Layers 3 now has support for vector tiles rendered on the HTML5 canvas. I wrote this as a reference for getting it up and running. *(Tip: Do this in a clean VM/container)*

First load OpenStreetMap into a PostGIS database using osm2pgsql.

When the import is done, add an SQL function (from [Mapbox](https://www.mapbox.com/tilemill/docs/guides/labels-advanced/)):

```sql
create or replace function poi_ldir(geometry)
    returns double precision as
$$
    select degrees(st_azimuth(st_closestpoint(way, $1),$1)) as angle
    from osm_netherlands
    where way && st_expand($1, 100)
        and highway in ('motorway', 'trunk', 'primary', 'secondary', 'tertiary',
            'unclassified', 'residential', 'living_street', 'pedestrian')
    order by st_distance(way, $1) asc
    limit 1
$$
language 'sql'
stable;
```

Then clone [TileStache](http://www.tilestache.org/) (I used version 1.49.8) and install it globally using `sudo python setup.py install`.

Edit `tilestache.cfg` to look like this:

```
{ 
  "cache": {
    "name": "Disk",
    "path": "/tmp/stache",
    "umask": "0000",
    "dirs": "quadtile",
    "gzip": ["txt", "text", "json", "xml", "topojson", "geojson", "mvt"]
  },
  "layers": {
    "osm": {
      "provider": {
        "class": "TileStache.Goodies.VecTiles:Provider",
        "kwargs": {
          "dbinfo": {
            "host": "localhost",
            "user": "yourpostgisusername",
            "password": "yourpostgispassword",
            "database": "osm_netherlands"
          },
          "queries": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "SELECT way AS __geometry__, poi_ldir(st_centroid(way)) AS angle, highway, name FROM nl_line -- zoom 10+",
            "SELECT way AS __geometry__, poi_ldir(st_centroid(way)) AS angle, highway, name FROM nl_line -- zoom 11+",
            "SELECT way AS __geometry__, poi_ldir(st_centroid(way)) AS angle, highway, name FROM nl_line -- zoom 12+"
          ]
        }
      },
      "allowed_origin": "*"
    }
  }
}
```


Install `gunicorn` and `gevent`, then run TileStache as such:

```bash
$ gunicorn --bind 127.0.0.1:8080 "TileStache:WSGITileServer('tilestache.cfg')" -w4 -kgevent --preload
```

Install `nginx` if you don't have it already, and configure a website with it. My nginx config looks like this:

```
upstream tilestache {
   server 127.0.0.1:8080;
}

server {
    listen 80;
    server_name vectortiles;
    location /tiles {
        proxy_pass http://tilestache/;
    }
    location / {
        root /vagrant/vectortiles/website;
        index index.html;
    }
}
```

Clone [OL3js](http://github.com/openlayers/ol3/) master branch into `/vagrant/vectortiles/website/js` and create `index.html` in `/vagrant/vectortiles/website`:

`index.html` should include OL3 and have at least a map div and reference ol3:

```html
<!doctype html>
  <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="css/ol.css" type="text/css">
    <link rel="stylesheet" href="css/style.css" type="text/css">
	</head>
	<body>
		<div id="map" class="map" style="background: white;"></div>		
	</body>
    <script src="js/ol3/ol-whitespace.js" type="text/javascript"></script>
    <script src="app.js" type="text/javascript"></script>
  </html>
```

`app.js` looks like this:

```javascript
var roadStyleCache = {};
var roadLayer = new ol.layer.Vector({
  source: new ol.source.TileVector({
    format: new ol.format.TopoJSON({
      defaultProjection: 'EPSG:4326'
    }),
    projection: 'EPSG:3857',
    tileGrid: new ol.tilegrid.XYZ({
      minZoom: 15,
      maxZoom: 19
    }),
    url: '/tiles/osm/{z}/{x}/{y}.topojson'
  }),
  style: function(feature, resolution) {

    var styleKey = 0;
    var styleArray = roadStyleCache[styleKey];

      styleArray = [new ol.style.Style({
        text: createTextStyle(feature, resolution),
        stroke: new ol.style.Stroke({
          color: "#776",
          width: 1
        }),
        zIndex: 1
      })];
      roadStyleCache[styleKey] = styleArray;
    
    return styleArray;
  }
});


var map = new ol.Map({
  layers: [roadLayer],
  renderer: 'canvas',
  target: document.getElementById('map'),
  view: new ol.View2D({
    center: ol.proj.transform([4.9392, 52.4948], 'EPSG:4326', 'EPSG:3857'),
    maxZoom: 19,
    zoom: 17
  })
});


var displayFeatureInfo = function(pixel) {

  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    return feature;
  });
  if(feature) {
    alert(feature.get('name') || 'Naamloos');
  }

};


map.on('singleclick', function(evt) {
  displayFeatureInfo(evt.pixel);
});


var getText = function(feature, resolution) {

  var type = 'wrap';
  var maxResolution = 2.3;

  var text = feature.get('name') || '';

  if (resolution > maxResolution) {
    text = '';
  } else if (type == 'hide') {
    text = '';
  } else if (type == 'shorten') {
    text = text.trunc(12);
  } else if (type == 'wrap') {
    text = stringDivider(text, 16, '\n');
  }

  return text;
};

var createTextStyle = function(feature, resolution) {
  var align = 'center';
  var baseline = 'middle';
  var size = '10px';
  var offsetX = 0;
  var offsetY = 0;
  var weight = 'light';
  var ldir = feature.get('angle') || 0;
  // var rotation = 0;
  var font = weight + ' ' + size + ' ' + 'Arial';
  var fillColor = '#aa3300';
  var outlineColor = '#ffffff';
  var outlineWidth = 3;

  if(ldir >= 45 && ldir < 60) { var rotation = 45; }
  if(ldir >= 135 && ldir < 225) { var rotation = 0; }
  if(ldir >= 300 && ldir < 315) { var rotation = -45; }

  return new ol.style.Text({
    textAlign: align,
    textBaseline: baseline,
    font: font,
    text: getText(feature, resolution),
    fill: new ol.style.Fill({color: fillColor}),
    stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
    offsetX: offsetX,
    offsetY: offsetY,
    rotation: rotation
  });
};

String.prototype.trunc = String.prototype.trunc ||
    function(n) {
      return this.length > n ? this.substr(0, n - 1) + '...' : this.substr(0);
    };

// http://stackoverflow.com/questions/14484787/wrap-text-in-javascript
function stringDivider(str, width, spaceReplacer) {
  if (str.length > width) {
    var p = width;
    for (; p > 0 && (str[p] != ' ' && str[p] != '-'); p--) {
    }
    if (p > 0) {
      var left;
      if (str.substring(p, p + 1) == '-') {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      var right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}

```


And finally add some style (`style.css`):

```css
/*@import url(http://fonts.googleapis.com/css?family=Quattrocento+Sans:400,400italic,700);*/

.map {
  height: 1000px;
  width: 100%;
  background: url(textured_paper.jpeg) repeat;
}
.ol-attribution {
  max-width: 50%;
}
#tags {
  display: none;
}

body, h1, h2, h3, h4, p, li, td, th {
  font-family: Quattrocento Sans;
}
.navbar-inverse .navbar-inner {
  background: #1F6B75;
}
.navbar-inverse .brand {
  color: white;
  padding: 5px;
}

```