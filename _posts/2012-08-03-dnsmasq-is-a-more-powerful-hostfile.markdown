---
layout: post
title: "dnsmasq is a more powerful hostfile"
date: 2012-08-03 15:54
comments: true
#categories: devops, development
---
If you're a developer who frequently updates his hostfile to try out new sites or services locally, you might want to try [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html).

I'm running OS X Mountain Lion. All development takes place in a couple of Vagrant-managed Virtualboxes running on 33.33.33.x.

I don't like having to wait for sysadmins to get DNS stuff and its paperwork in place, so I just configure some rules in dnsmasq and point these domains to my virtual server.

To get started:

 * Install [Homebrew](http://mxcl.github.com/homebrew/) (instructions found over there)

 * Install dnsmasq

{% highlight bash %}
$ brew install dnsmasq
{% endhighlight %}

 * Copy the plist file over:

{% highlight bash %}
$ sudo cp /usr/local/Cellar/dnsmasq/2.61/homebrew.mxcl.dnsmasq.plist /Library/LaunchDaemons/
{% endhighlight %}

 * Copy the example config over:

{% highlight bash %}
$ cp /usr/local/Cellar/dnsmasq/2.61/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf
{% endhighlight %}

 * Add 127.0.0.1 as the first entry in OS X > System Preferences > Your connection > Advanced > DNS

 * Edit /usr/local/etc/dnsmasq.conf, adding some address= entries as you please:

{% highlight bash %}
# This entry redirects every domain ending in .dev to the Vagrant box on 33.33.33.20
address=/.dev/33.33.33.20
{% endhighlight %}

 * Launch the dnsmasq daemon:

{% highlight bash %}
$ sudo launchctl start homebrew.mxcl.dnsmasq
{% endhighlight %}

 * Flush your dns:

{% highlight bash %}
$ sudo dscacheutil -flushcache
{% endhighlight %}

 * Test if it worked:

{% highlight bash %}
$ dig www.someproject.dev
{% endhighlight %}

 * Should answer with:

{% highlight bash %}
...
;; ANSWER SECTION:
www.someproject.dev.		0	IN	A	33.33.33.20
...
{% endhighlight %}

I'm also considering setting up an SSH tunnel from my VPS to my Laptop, like [showoff.io](https://showoff.io/), but DIY.