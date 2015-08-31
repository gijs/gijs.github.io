---
layout: post
title: "Django is just an API"
date: 2013-01-04 08:51
comments: true
#categories: development
---

{% raw %}
<blockquote>
"Historically, <s>Rails</s>Django applications have been an amalgamation of <s>Ruby</s>Python, HTML and snippets of Javascript. Add an API to the mix, include a ton of conditional rendering logic, and you’ve got your classic <s>Rails</s>Django spaghetti"
</blockquote>
{% endraw %}





This is an adapted quote from [Alex MacCaw](http://blog.alexmaccaw.com/rails-is-just-and-api-and-that-s-ok/). Django, in its current incarnation, also makes sense for websites but not for web applications.

I'm writing this up as [we](http://www.nelen-schuurmans.nl/) are currently transitioning to API-based de-coupling of back-end and front-end. In other words: a client-side user interface which talks to an API for data.
This web app should just be one of the api-consuming clients, not privileged in any way compared to an iPhone or Android native client.

*"The caveat in moving state/user interface to the client is that it’s a huge perceptual shift for developers, with a steep learning curve".*

I could not agree more. I'm witnessing this as I speak. When someone has worked on traditional websites using Django, Rails, PHP, Plone or you name it, the paradigm shift to API based application design is incredibly hard to wrap your head around.

In my modest career as a developer, I've seen several examples of a very scary syndrome: 'technnological conservatism'. I don't intend to offend anyone here, it's just my observation most programmers develop some this syndrome to some degree as they age. Perhaps it's natural, and perhaps I'm not immune to this either.

The first time I noticed it was with a colleague who started his programming career using Perl. He was comfortable with Perl, and had built some applications that were important to the company.
Perl, however, was undeniably superseded by more web-geared solutions like PHP. PHP made templating, database querying and deployment a picknick in comparison to Perl. Yet he refused to learn PHP. The company hired additional programmers, and organically transitioned to PHP and Java. Frustration eventually led him to quit programming entirely.

I have two more similar examples, and they've taught me one thing very clearly: As a programmer, either go with the flow or you lose.

That's not to say you should always go for the latest and greatest. Just evaluate the right tool for the job, [be ready to learn new things](http://blog.mobtest.com/2012/12/web-developers-dont-be-lazy-and-learn-a-native-mobile-language/). That's the biggest curse of IT: a paradigm shift will happen at least every ten years. If you're a conservative person, you should have chosen law or history. Those fields never change.

 * *(Largely adapted from and inspired by [Alex MacCaw](http://blog.alexmaccaw.com/rails-is-just-and-api-and-that-s-ok/) - he put the matter in exactly the right words)*

 * *[This](http://alexmaccaw.com/posts/async_ui) is also worth reading*
 
 * *[Dustin Curtis](http://dcurt.is/rails-is-just-an-api) and [Brad Gessler](http://bearsfightingbears.com/do-not-use-rails-as-just-an-api) agree with [Alex MacCaw](http://blog.alexmaccaw.com/rails-is-just-and-api-and-that-s-ok/)*
 
 * What do you think?