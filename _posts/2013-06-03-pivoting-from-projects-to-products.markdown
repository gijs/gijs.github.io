---
layout: post
title: "Pivoting from projects to products"
date: 2013-06-03 17:21
comments: true
#categories: misc
---


Project-based
-------------
Say, a company generates revenue by selling knowledge through consultancy services. 
To aid that process, it's developed some software tools. This has the obvious upside of providing a steady income. But steady also means not growing as rapidly as could be.

The downside of 'project-based' is that customers decide what's to be built. Not exactly 'product leadership' but 'spec-driven development'.

Also, working like this often implies building stuff from scratch over and over again. Instead of offering a generic, robust and flexible set of services that satisfies 90% of our customers' wishes. Ofcourse, for those 10% of high maintenance clients, you'd still build custom products. 
(although this'll be easier if you have an ecosystem of services in place)

Google remains a great example of this ecosystem. One of their services is the Docs suite. Oh and they also have auth. Now for a 3rd party it's easy to build upon that and [build a custom app](http://googlemaps.github.io/galley/#). (this was demoed in [this talk](http://www.youtube.com/watch?feature=player_detailpage&v=yMnJDOmYvEg#t=969s) at [Google IO 2013](https://developers.google.com/events/io/)).


Product-based
-------------

Another approach would be to build something that 95% of the customers absolutely want, because it solves their biggest problems in an elegant way: a product.

A product allows to focus and create something that not only solves actual problems, but defines the next level. A technically and aesthetically well-designed product enables to lead by example.

The way I'd like to approach this is to build some sort of ecosystem in the spirit of Bezos' "If it doesnt have an API, it doesn't exist".

I'm convinced that most of our products can be captured into services which do what they do. Take a rainfall/precipitation app for example. Instead of a bunch of Python scripts, I'd like to see something more like building blocks, something like the DarkSky forecasting API [https://developer.forecast.io/docs][1]. In turn, that API should be able to communicate with some 'is-that-a-paying-customer-and-has-he-got-the-right-to-use-this'-service et cetera.

In my opinion, a well-designed HTTP/RESTful service that does one thing very well creates value over raw code or mammoth codebases. A but UNIX like, but online between systems.

 - It's more resilient: if it crashes, only that piece of the ecosystem needs fixing.
 - It acts as a facade for complex code: we have a computation core in Fortran. No need to bother the iOS developers with that if it's clearly available over HTTP.
 - It can be tested in isolation.
 - It can be scaled/load balanced in isolation.
 - It offers not just code but also data - in essence an API is 'alive' on the web.
 - And a good service/API documents itself from the endpoint on.

A good service/API [simplifies a hard problem](https://blog.apigee.com/detail/the_api_facade_overview). 
Let's stop pretending that just because data is more complex than the 140 character tweet, it is justified to build super [complex 'enterprise' software](https://www.scriptrock.com/blog/it-systems-cars-environment-configuration/).

Something like [CartoDB](http://www.cartodb.com/) by [Vizzuality](http://vizzuality.com/), [Marinexplore](http://marinexplore.org/), [Mapbox](http://www.mapbox.com/), [Stormpath](http://www.stormpath.com/), [Dark Sky](https://developer.forecast.io/), [GeoTrellis](http://www.azavea.com/products/geotrellis/features/deployment-strategies/managed-api/) and [Fusion Tables](http://www.google.com/drive/apps.html#fusiontables) are doing, but for water.

As with the Docs example, Fusion Tables is not 'installed' or rolled-out for every customer, it's ready now, waiting for new people to use it. And it uses several services of Google's infrastructure such as authentication and Google Docs importing.

But it's not easy to do this for a company that's already grown fairly big doing things differently. 

A product should:

 * Solve the hard problems of most the existing and potential customers 
 * Look good both technically (long term sales) and aesthetically (short term sales)
 * Be a basis to build upon internally and externally


  [1]: https://developer.forecast.io/docs