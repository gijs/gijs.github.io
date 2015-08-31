---
layout: post
title: "Spatial Elastic Search with a PostgreSQL river"
date: 2014-03-24 09:59
comments: true
#categories: geo elasticsearch postgis
---

I've been using [Elastic Search](http://www.elasticsearch.org/) to build a searchable index of our [PostgreSQL](http://www.postgresql.org/) database. The [PostGIS](http://postgis.net/)-enabled database contains timeseries and spatial objects.

Spatial functionality in ES requires objects to have a mapping. When adding objects via a [river](http://www.elasticsearch.org/guide/en/elasticsearch/rivers/current/), the trick is to first create the index, then create the mapping and only then create the river.

This is a 'for-future-reference' article on how to get this all up and running.

Assumptions:

 * Ubuntu (I've tested this on 12.04 LTS)
 * Java installed (tested using Java version 1.6.0_27)
 * A running PostGIS enabled PostgreSQL database server with some tables containing actual data


Installing Elastic Search
-------------------------

Head over to the [Elastic Search downloads page](http://www.elasticsearch.org/overview/elkdownloads/) and download the [tarball](https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.0.1.tar.gz)

```
$ wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.0.1.tar.gz
$ tar zxvf elasticsearch-1.0.1.tar.gz
$ cd elasticsearch-1.0.1
```
Running ES is as easy as:

```
$ bin/elasticsearch
```

JDBC river plugin installation
------------------------------

In the ES directory, run the following installation command:

```
./bin/plugin --install river-jdbc --url http://bit.ly/1jyXrR9
```

This will install the [Elastic Search JDBC River](https://github.com/jprante/elasticsearch-river-jdbc) by [Jörg Prante](https://github.com/jprante). It requires a driver to work.

Head over to the [PostgreSQL JDBC drivers](http://jdbc.postgresql.org/download.html) page to see which version of the JDBC driver you'll need for your system. I've picked [this one](http://jdbc.postgresql.org/download/postgresql-9.3-1101.jdbc4.jar).

Download it to the `plugins/river-jdbc` directory:

```
$ cd plugins/river-jdbc
$ wget http://jdbc.postgresql.org/download/postgresql-9.3-1101.jdbc4.jar
```

Restart or run ES:

```
$ bin/elasticsearch
```

Configuring Postgres River
--------------------------

Delete the indices if you already created them:

```
$ curl -XDELETE 'localhost:9200/pumpstations/'; curl -XDELETE 'localhost:9200/_river/'
```

It's important create the index first:

```
$ curl -XPUT 'localhost:9200/pumpstations/'
```

Then, create the geo mapping:

{% highlight bash %}
$ curl -XPUT 'localhost:9200/pumpstations/pumpstation/_mapping' -d '{
    	"pumpstation": {
			"properties": {
				"location": {
					"type": "geo_point"
				}
			}
		}
	}'

{% endhighlight %}


Time to create the JDBC river. Specify the index in 'index' (should be 'pumpstations' in this case) and the mapping in 'type' (should be 'pumpstation', obviously).

{% highlight bash %}
$ curl -XPUT 'localhost:9200/_river/pumpstations/_meta' -d '{
        "type" : "jdbc",
        "jdbc" : {
            "url" : "jdbc:postgresql://localhost:5432/yourdatabase",
            "user" : "yourusername",
            "password" : "yourpassword",
            "sql" : "select *, ST_X(ST_SetSRID(the_geom::geometry,4326)) AS \"location.lat\", ST_Y(ST_SetSRID(the_geom::geometry,4326)) AS \"location.lon\" from pumpstations",
            "index": "pumpstations", 
            "type": "pumpstation"
        }}'
{% endhighlight %}


This will cause the River to start bulk indexing your data.

When it's done, run the following query to see if it worked:

{% highlight bash %}
$ curl -XPOST 'localhost:9200/_search' -d '{
   "query": {
      "match_all": {}
   },
   "filter": {
      "geo_distance": {
         "distance": "1km",
         "location": [
            52.498870423917296,
            4.9591159314365125
         ]
      }
   }
}'
{% endhighlight %}


This should return documents with a `location` within 1 kilometer of `52.498, 4.959` (WGS84).

If no documents are returned, try increasing the distance and/or check your lat/lon values.


Troubleshooting
---------------

If data gets indexed but is not geo-searchable, check your mapping:

{% highlight bash %}
$ curl -XPOST 'localhost:9200/pumpstations/_mapping'
{% endhighlight %}


This should return a JSON object. Look for the `location` field. It must look like this:

{% highlight bash %}
   ...
   "location": {
      "type": "geo_point"
   },
   ...
{% endhighlight %}

And **not** like a lat/lon pair.

That's it. Have fun with your PostGIS-to-ES river!