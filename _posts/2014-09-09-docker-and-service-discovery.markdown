---
layout: post
title: "Docker and Service Discovery (on OS X)"
date: 2014-09-09 10:40
comments: true
#categories: devops docker
---

Much has changed since I started using [Vagrant](https://www.vagrantup.com/) for development in 2011. Linux containers became popular and mature. Then [Docker](https://www.docker.com/) made it even more appealing to use containers in a dev-ops workflow.

VM's solve a different problem than containers though. A VM allows me to run a foreign OS on top of my favorite OS _and_ allows sharing of the underlying hardware in a controlled manner.

But a VM is just a virtual server which still has to be provisioned and configured. Docker offers a way to put the environment into the state I want, in a reproducible way.

So while with just Virtualbox and Vagrant, I had to spin up and entire virtual OS per project, with Linux containers this is no longer needed.

After some research I got Docker to work reasonably well on OS X using [CoreOS](https://coreos.com/). After some struggling with [boot2docker](https://github.com/boot2docker/boot2docker), CoreOS seemed to get a couple of things right other setups didn't.

I wrote down most of the setup process and I'm sharing it here for future reference. Feel free to send improvements or rectifications.


Setup
-----

 - Install XCode + commandline tools (using the App Store)

 - Install [Homebrew](http://brew.sh/) using `$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"`

 - Install [Cask](http://caskroom.io/) using `$ brew install caskroom/cask/brew-cask`

 - Install git and docker: `$ brew install git docker`

 - Export the $DOCKER_HOST variable in OS X (add this to ~/.zshrc or ~/.bashrc): `$ export DOCKER_HOST=tcp://127.0.0.1:2375`

 - Install [Virtualbox](https://www.virtualbox.org/) via Cask: `$ brew cask install virtualbox`

 - Install [Vagrant](http://www.vagrantup.com/about.html) using [the installer for OS X](http://www.vagrantup.com/downloads.html)

 - Clone the [coreos-vagrant](https://github.com/coreos/coreos-vagrant) box: `$ git clone https://github.com/coreos/coreos-vagrant.git` and `cd coreos-vagrant`

 - I used this [Vagrantfile](https://gist.github.com/gijs/d0976c2630b996659330) which sets up shared folders through NFS and adds an extra network adapter for which a route will be added in the next steps.

 - You can also edit settings in the file `config.rb` (copy it from config.rb.sample) such as which CoreOS channel to use (alpha, beta, production).

 - Spin up CoreOS using `$ vagrant up` and ssh into the box using `$ vagrant ssh`

 - In CoreOS, setup [Skydock](https://github.com/crosbymichael/skydock) and [SkyDNS](https://github.com/skynetservices/skydns1), which are tools for service discovery using DNS:

	```
	$ docker run -d -p 172.17.42.1:53:53/udp --name skydns crosbymichael/skydns -nameserver 8.8.8.8:53 -domain docker.dev
	```

	```
	$ docker run -d -v /var/run/docker.sock:/docker.sock --name skydock crosbymichael/skydock -ttl 30 -environment dev -s /docker.sock -domain docker -name skydns
	```

 - In OS X terminal, add a route to the CoreOS VM: `$ sudo route -n add -net 172.17.0.0 10.2.0.10`

 - SkyDNS is running and should be reachable, so add its IP (probably `172.17.42.1`) and search domains to the OS X Network Settings.

 [![Image](/images/osx-adding-dns.png "Adding extra DNS in OS X") ]()



Testing
-------

With CoreOS up and the SkyDNS and SkyDock containers running, we can inspect them using OS X's terminal by typing `$ docker ps`:

```
CONTAINER ID        IMAGE                          COMMAND                CREATED             STATUS              PORTS                                              NAMES
8e04b49ff891        crosbymichael/skydock:latest   /go/bin/skydock -ttl   3 days ago          Up 18 hours                                                            skydock
3b24e7971024        crosbymichael/skydns:latest    skydns -http 0.0.0.0   3 days ago          Up 18 hours         8080/tcp, 172.17.42.1:53->53/udp                   skydns
```

To get log output for SkyDNS and SkyDock, type `$ docker logs -f 8e0` and `$ docker logs -f 3b2`



Running a container
-------------------

The whole point of this is to get services and projects up and running and getting them to 'see' without the need for hardcoding IP addresses etc.

One notoriously hard-to-install piece of software I use frequently is PostGIS. Fortunately, some PostGIS experts have created a very complete and up-to-date installation using Docker called [PG GIS](https://github.com/vpicavet/docker-pggis). 

The latest version contains PostgreSQL 9.4, PostGIS 2.1.3 with SFCGAL, PgRouting and Pointcloud extensions and PDAL.

Getting all of this running involves nothing more than just `$ docker run -P -d --name pggis oslandia/pggis /sbin/my_init`

Let the command finish and you should have it up and running: `$ docker ps`

```
CONTAINER ID        IMAGE                          COMMAND                CREATED             STATUS              PORTS                                              NAMES
8e04b49ff891        crosbymichael/skydock:latest   /go/bin/skydock -ttl   3 days ago          Up 18 hours                                                            skydock
3b24e7971024        crosbymichael/skydns:latest    skydns -http 0.0.0.0   3 days ago          Up 18 hours         8080/tcp, 172.17.42.1:53->53/udp                   skydns
08707bf3656c        oslandia/pggis:latest          /sbin/my_init          3 days ago          Up 18 hours         0.0.0.0:49161->5432/tcp                            pggis
```

This means I can use the hostname `pggis.dev.docker.dev` in my code and in for example QGIS and get connected to the PGGIS container running PostGIS!


Listing SkyDNS services
-----------------------

SkyDNS provides a REST API for service listing and management:

`$ curl -XGET http://172.17.0.10:8080/skydns/services/`

```
[
  {
    "UUID": "8e04b49ff8",
    "Name": "skydock",
    "Version": "skydock",
    "Environment": "dev",
    "Region": "",
    "Host": "172.17.0.11",
    "Port": 80,
    "TTL": 17,
    "Expires": "2014-09-08T10:09:10.25317173Z"
  },
  {
    "UUID": "3b24e79710",
    "Name": "skydns",
    "Version": "skydns",
    "Environment": "dev",
    "Region": "",
    "Host": "172.17.0.10",
    "Port": 53,
    "TTL": 17,
    "Expires": "2014-09-08T10:09:10.255220068Z"
  },
  {
    "UUID": "08707bf365",
    "Name": "pggis",
    "Version": "pggis",
    "Environment": "dev",
    "Region": "",
    "Host": "172.17.0.12",
    "Port": 49156,
    "TTL": 27,
    "Expires": "2014-09-08T10:09:20.148702535Z"
  }
]
```
This is a read/write API (GET/POST/PUT/DELETE). For more information on this check out the [SkyDNS readme](https://github.com/skynetservices/skydns1).




Auto-starting SkyDock and SkyDNS in CoreOS
------------------------------------------

Copy the docker service file from the read-only filesystem to the writable fs: `$ sudo cp /usr/lib64/systemd/system/docker.service /etc/systemd/system/`

Then add `skydns.service` to `/etc/systemd/system`:

```
[Unit]
Description=skydns
After=docker.service
Requires=docker.service

[Service]
ExecStartPre=/bin/sh -c '/home/core/docker rm skydns || ls > /dev/null'
ExecStart=/home/core/docker start skydns
ExecStop=/home/core/docker stop skydns

[Install]
WantedBy=local.target
```


And add `skydock.service` to `/etc/systemd/system`:

```
[Unit]
Description=skydock
After=docker.service
Requires=docker.service

[Service]
ExecStartPre=/bin/sh -c '/home/core/docker rm skydock || ls > /dev/null'
ExecStart=/home/core/docker start skydock
ExecStop=/home/core/docker stop skydock

[Install]
WantedBy=local.target
```




Checking using DNS tools
------------------------

To be sure it works you can use tools like `dig` and `nslookup` to query SkyDNS for services:

```
$ dig @172.17.42.1 +short pggis.dev.docker.dev
172.17.0.12
```


Tips and tricks
---------------

Tools to use for debugging this setup:

- `$ cat /etc/resolv.conf` should show the DNS server added automatically by OS X

- `$ scutil --dns` should show the DNS settings in OS X

- `$ docker version` should show matching versions for the Docker client (OS X via Homebrew) and the Docker server (in CoreOS):

```
Client version: 1.1.1
Client API version: 1.13
Go version (client): go1.3
Git commit (client): dc62f3c
Server version: 1.2.0
Server API version: 1.14
Go version (server): go1.3.1
Git commit (server): fa7b24f
```



Sources and references
----------------------

- [Vagrant skydocking](http://www.asbjornenge.com/wwc/vagrant_skydocking.html)
- [initialize a CoreOS vm with the latest docker and DNS service discovery via skydock](https://gist.github.com/cameron/8999280)
- [https://github.com/skynetservices/skydns1](https://github.com/skynetservices/skydns1)
- [https://coreos.com/docs/running-coreos/platforms/vagrant/](https://coreos.com/docs/running-coreos/platforms/vagrant/)
