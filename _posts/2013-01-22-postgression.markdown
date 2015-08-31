---
layout: post
title: "Postgression"
date: 2013-01-22 08:36
comments: true
#categories: development
---
{% raw %}
<blockquote>
"I think what annoys me about this is that setting up a database isn't hard, I just think it's stupid to have to remember to do it for each new project. It feels like I'm repeating the same thing over and over again, and each time I do it, I become slightly more annoyed."
</blockquote>
{% endraw %}

That's exactly my frustration when developing back-end applications. It's for a reason someone gave [this talk](http://reinout.vanrees.org/weblog/2012/06/04/djangocon-postgres.html) on DjangoCon 2012.

So, Randall and Alven [set out to build](http://rdegges.com/postgression-a-postgresql-database-for-every) [Postgression](http://www.postgression.com/), which basically boils down to:

{% highlight bash %}
    $ curl http://api.postgression.com
    postgres://user:password@host/db
{% endhighlight %}

And that database will auto-destruct in 30 minutes. More than enough time for your average testsuite to complete.

 * [Python](https://github.com/postgression/python-postgression), [Node](https://github.com/postgression/node-postgression) and [Ruby](https://github.com/postgression/ruby-postgression) client libraries.