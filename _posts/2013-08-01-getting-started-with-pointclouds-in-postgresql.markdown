---
layout: post
title: "Getting Started with Pointclouds in PostgreSQL"
date: 2013-08-01 11:52
comments: true
categories: geo gis lidar postgis
---

This is a walk-through of installing the [pointcloud extension for storing LIDAR data](https://github.com/pramsey/pointcloud) on Ubuntu 12.04 LTS.

The walk-through assumes a basic development setup. At least install at the following packages:

{% highlight bash %}
sudo apt-get update -y
sudo apt-get install python-software-properties git
sudo apt-get install build-essential cmake g++
sudo apt-get install libboost-all-dev
sudo apt-get install cmake-curses-gui
{% endhighlight %}

Add the [Ubuntu GIS](http://trac.osgeo.org/ubuntugis/wiki) PPA to your system and update Aptitude. 
Then, install [GDAL](http://www.gdal.org/), [libgeotiff](http://trac.osgeo.org/geotiff/) [proj4](https://trac.osgeo.org/proj/) and [libgeos](http://trac.osgeo.org/geos/):

{% highlight bash %}
sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
sudo apt-get update -y
sudo apt-get install libgeotiff-dev
sudo apt-get install libgdal libgdal-dev
sudo apt-get install geotiff libgeotiff2
sudo apt-get install libgeos-3.3.3 libgeos-dev proj4
{% endhighlight %}


Next, compile [liblas](http://www.liblas.org/) from source:

{% highlight bash %}
wget http://download.osgeo.org/liblas/libLAS-1.7.0.zip
unzip libLAS-1.7.0.zip
cd libLAS-1.7.0/
mkdir makefiles
cd makefiles
cmake -G "Unix Makefiles" ../
make
sudo make install
ldconfig
{% endhighlight %}

Another requirement is [PDAL](http://www.pointcloud.org/), which is like GDAL for pointclouds. This one is the hardest to get to compile. 

{% highlight bash %}
git clone https://github.com/PDAL/PDAL
mkdir PDAL-build
cd PDAL-build
cmake ../PDAL
ccmake ../PDAL # (set proper paths and files, use enter, c and g)
make
sudo make install
{% endhighlight %}

Make sure to get the paths right in the ccmake step:

{% highlight bash %}
CMAKE_BUILD_TYPE                 RelWithDebInfo
CMAKE_INSTALL_PREFIX             /usr/local
ENABLE_CTEST                     OFF
GDAL_CONFIG                      /usr/bin/gdal-config
GDAL_INCLUDE_DIR                 /usr/include/gdal
GDAL_LIBRARY                     /usr/lib/libgdal.so
GDAL_VERSION_STRING              1.10.0
GEOS_CONFIG                      /usr/local/bin/geos-config
GEOS_CONFIG_PREFER_PATH          /bin
GEOS_INCLUDE_DIR                 /usr/local/include
GEOS_LIBRARY                     /usr/local/lib/libgeos_c.so
GEOS_LIB_NAME_WITH_PREFIX        -lgeos_c
GEOTIFF_INCLUDE_DIR              /usr/include/geotiff
GEOTIFF_LIBRARY                  /usr/lib/libgeotiff.so
ICONV_INCLUDE_DIR                /usr/include
LIBXML2_INCLUDE_DIR              /usr/include/libxml2
LIBXML2_LIBRARIES                /usr/lib/x86_64-linux-gnu/libxml2.so
PDAL_EMBED_BOOST                 ON
PDAL_VERSION_STRING              0.9.8
PG_CONFIG                        /usr/lib/postgresql/9.1/bin/pg_config
POSTGRESQL_INCLUDE_DIR           /usr/include/postgresql
POSTGRESQL_LIBRARIES             /usr/include/postgresql/libpq/libpq-fs.h
TIFF_INCLUDE_DIR                 /usr/lib/x86_64-linux-gnu
TIFF_LIBRARY                     /usr/lib/x86_64-linux-gnu/libtiff.so
{% endhighlight %}


And last but not least, compile the pointcloud extension as such:

{% highlight bash %}
git clone https://github.com/pramsey/pointcloud
cd pointcloud
./configure
make
sudo make install
{% endhighlight %}


Once all is set-up, new pointcloud enabled PostgreSQL databases can be created using:

{% highlight bash %}
CREATE DATABASE mynewdb
CREATE EXTENSION pointcloud
{% endhighlight %}
