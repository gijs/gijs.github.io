---
layout: post
title: "On building large modern web applications"
date: 2013-01-05 20:36
comments: true
#categories: development
---
*'The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application'*

This is exactly how I envision the product we're building at the company where I work. We started out building the application (let's say it's a web-based GIS viewer) as a giant monolithic codebase per customer.

That wasn't modular at all. Some features were literally commented out for some customers. Then we slowly adopted a [software build tool](http://www.buildout.org/), and we created packages for projects and for the tools used in them. Great. That allowed us to specify that we want module y in project x and in project z. You would think that this solves the above quoted problem of building large applications, since we're building tiny blocks of reusable functionality. 

What didn't change is that **per customer**, we still need to provision (or, most of the time: manually roll) an environment (or multiple: test, staging) for these modules/packages to live. This slows down the process of catering to new customers, but more importantly, it creates an untangible, unmaintainable, unscalable pile of installations. All of which need monitoring, upgrading, et cetera.

One solution to this is to create automation scripts (using the likes of Fabric, Chef, Puppet and Vagrant) to handle the provisioning and installation proces. This involves DNS, source checkouts or tarball downloads, database setup, ubuntu installation and configuration, and everything in between. It also still implies a box-per-customer. I would not call this a good solution or a solution at all.

Another solution is multi-tenancy, which to many is a buzzword and comes in many forms. The version I prefer is vaguely the following:

Small services tied into one product. The product lives on a domain name, imagine [github.com](http://www.github.com/). A customer (tenant) signs up for an account and gets a unique subdomain (think customer.github.com). That customer can be an individual or a company. A company can have individuals linked. Again, just like Github does.

This allows for extreme flexibility regarding the ever returning wishes of customers to manage groups and users.

Another thing Github does right is launching their applications as services: Github Pages and Gists are both excellent examples of succesful services that are used in experiments, [mashups](http://bl.ocks.org/) and 3rd party products. (this blog runs on Github Pages, just saying...)

Google does something similar with their API console. I'm a tenant with Google and here's my dashboard where I can opt in and out of services (and get billed for some):

[![Image](/images/google_api_console.png "Google API console") ](https://code.google.com/apis/console/ "google.com")

Just thinking out loud here. More to come.

(Top quote by [Justin Meyer](https://twitter.com/justinbmeyer))