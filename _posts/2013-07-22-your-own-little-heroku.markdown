---
layout: post
title: "Your own little Heroku"
date: 2013-07-22 13:55
comments: true
#categories: devops development
---

Last week, we had a bit of a discussion about the [Definition of Done](http://www.scrum.org/Resources/Scrum-Glossary/Definition-of-Done).
In the case of web development, part of this definition is the online presence of the software. In other words, if there's no online demo, it does not exist.

We arranged a demo server, but quickly ran into problems with versions: virtualenv versions, PostGIS versions, Python versions, et cetera.

Locally, most of us use [Vagrant](/blog/2011/10/24/adding-vagrant-to-my-dev-stack/) nowadays, which provides excellent isolation from the host OS. For project X, I can run PostGIS 1.x, while for project Y, I can run PostGIS 2.x.

But Vagrant is not really suited for deployment. So I started thinking, how does Heroku implement their beautifully easy git-push-deploy mechanism?

[![Image](/images/heroku-easy-deployment.png "Heroku") ](https://www.heroku.com/)

Then, [a Hacker News post](https://news.ycombinator.com/item?id=6058662) about a project named [Flynn](https://flynn.io/) caught my attention. 
It's exactly what we want, a self-hosted git-push-deploy Platform-as-a-Service like Heroku. But... it's not yet available.

Fortunately, something similarly lightweight exists, and it's called [Dokku](https://github.com/progrium/dokku). As the name implies, it's also built on the Linux Container engine [Docker](http://www.docker.io/).

Installation on Ubuntu 12.04 was easy. Literally one command:

{% highlight bash %}
$ wget -qO- https://raw.github.com/progrium/dokku/master/bootstrap.sh | sudo bash
{% endhighlight %}

Then it needs your public SSH key:

{% highlight bash %}
$ cat ~/.ssh/id_rsa.pub | ssh d-sandboxlinux-d2 "sudo gitreceive upload-key gijs"
{% endhighlight %}

Next, I downloaded the actual Heroku [node-js-sample](https://github.com/heroku/node-js-sample) repository, which is the Hello World for Heroku. (I removed the .git/ directory)
And then added a remote called 'demoserver' to that repository.

{% highlight bash %}
$ git init
$ git add .
$ git commit -m "Initial commit"
$ git remote add demoserver git@d-sandboxlinux-d2:node-js-app
{% endhighlight %}

Upon pushing the repository to it, you'll see the automatic deployment take place:

{% highlight bash %}
$ git push demoserver master

Counting objects: 8, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (8/8), 1.02 KiB, done.
Total 8 (delta 1), reused 0 (delta 0)
remote: -----> Building node-js-app ...
remote:        Node.js app detected
remote: -----> Resolving engine versions
remote:        Using Node.js version: 0.10.13
remote:        Using npm version: 1.3.2
remote: -----> Fetching Node.js binaries
remote: -----> Vendoring node into slug
remote: -----> Installing dependencies with npm
remote:        npm http GET https://registry.npmjs.org/express
remote:        npm http 200 https://registry.npmjs.org/express
remote:        npm http GET https://registry.npmjs.org/express/-/express-3.3.4.tgz
remote:        npm http 200 https://registry.npmjs.org/express/-/express-3.3.4.tgz
remote:        npm http GET https://registry.npmjs.org/range-parser/0.0.4
remote:        npm http GET https://registry.npmjs.org/mkdirp/0.3.5
remote:        npm http GET https://registry.npmjs.org/cookie/0.1.0
remote:        npm http GET https://registry.npmjs.org/buffer-crc32/0.2.1
remote:        npm http GET https://registry.npmjs.org/fresh/0.1.0
remote:        npm http GET https://registry.npmjs.org/methods/0.0.1
remote:        npm http GET https://registry.npmjs.org/send/0.1.3
remote:        npm http GET https://registry.npmjs.org/cookie-signature/1.0.1
remote:        npm http GET https://registry.npmjs.org/debug
remote:        npm http GET https://registry.npmjs.org/connect/2.8.4
remote:        npm http GET https://registry.npmjs.org/commander/1.2.0
remote:        npm http 200 https://registry.npmjs.org/range-parser/0.0.4
remote:        npm http GET https://registry.npmjs.org/range-parser/-/range-parser-0.0.4.tgz
remote:        npm http 200 https://registry.npmjs.org/fresh/0.1.0
remote:        npm http GET https://registry.npmjs.org/fresh/-/fresh-0.1.0.tgz
remote:        npm http 200 https://registry.npmjs.org/methods/0.0.1
remote:        npm http 200 https://registry.npmjs.org/buffer-crc32/0.2.1
remote:        npm http 200 https://registry.npmjs.org/cookie/0.1.0
remote:        npm http GET https://registry.npmjs.org/methods/-/methods-0.0.1.tgz
remote:        npm http GET https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.1.tgz
remote:        npm http 200 https://registry.npmjs.org/mkdirp/0.3.5
remote:        npm http GET https://registry.npmjs.org/cookie/-/cookie-0.1.0.tgz
remote:        npm http GET https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.5.tgz
remote:        npm http 200 https://registry.npmjs.org/send/0.1.3
remote:        npm http GET https://registry.npmjs.org/send/-/send-0.1.3.tgz
remote:        npm http 200 https://registry.npmjs.org/cookie-signature/1.0.1
remote:        npm http 200 https://registry.npmjs.org/debug
remote:        npm http GET https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.1.tgz
remote:        npm http 200 https://registry.npmjs.org/connect/2.8.4
remote:        npm http GET https://registry.npmjs.org/debug/-/debug-0.7.2.tgz
remote:        npm http 200 https://registry.npmjs.org/commander/1.2.0
remote:        npm http GET https://registry.npmjs.org/connect/-/connect-2.8.4.tgz
remote:        npm http GET https://registry.npmjs.org/commander/-/commander-1.2.0.tgz
remote:        npm http 200 https://registry.npmjs.org/range-parser/-/range-parser-0.0.4.tgz
remote:        npm http 200 https://registry.npmjs.org/fresh/-/fresh-0.1.0.tgz
remote:        npm http 200 https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.5.tgz
remote:        npm http 200 https://registry.npmjs.org/methods/-/methods-0.0.1.tgz
remote:        npm http 200 https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.1.tgz
remote:        npm http 200 https://registry.npmjs.org/cookie/-/cookie-0.1.0.tgz
remote:        npm http 200 https://registry.npmjs.org/send/-/send-0.1.3.tgz
remote:        npm http 200 https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.1.tgz
remote:        npm http 200 https://registry.npmjs.org/debug/-/debug-0.7.2.tgz
remote:        npm http 200 https://registry.npmjs.org/connect/-/connect-2.8.4.tgz
remote:        npm http 200 https://registry.npmjs.org/commander/-/commander-1.2.0.tgz
remote:        npm http GET https://registry.npmjs.org/mime
remote:        npm http GET https://registry.npmjs.org/keypress
remote:        npm http GET https://registry.npmjs.org/qs/0.6.5
remote:        npm http GET https://registry.npmjs.org/formidable/1.0.14
remote:        npm http GET https://registry.npmjs.org/bytes/0.2.0
remote:        npm http GET https://registry.npmjs.org/pause/0.0.1
remote:        npm http GET https://registry.npmjs.org/uid2/0.0.2
remote:        npm http 200 https://registry.npmjs.org/keypress
remote:        npm http 200 https://registry.npmjs.org/mime
remote:        npm http GET https://registry.npmjs.org/keypress/-/keypress-0.1.0.tgz
remote:        npm http GET https://registry.npmjs.org/mime/-/mime-1.2.9.tgz
remote:        npm http 200 https://registry.npmjs.org/pause/0.0.1
remote:        npm http GET https://registry.npmjs.org/pause/-/pause-0.0.1.tgz
remote:        npm http 200 https://registry.npmjs.org/uid2/0.0.2
remote:        npm http GET https://registry.npmjs.org/uid2/-/uid2-0.0.2.tgz
remote:        npm http 200 https://registry.npmjs.org/formidable/1.0.14
remote:        npm http 200 https://registry.npmjs.org/qs/0.6.5
remote:        npm http GET https://registry.npmjs.org/formidable/-/formidable-1.0.14.tgz
remote:        npm http 200 https://registry.npmjs.org/bytes/0.2.0
remote:        npm http GET https://registry.npmjs.org/qs/-/qs-0.6.5.tgz
remote:        npm http GET https://registry.npmjs.org/bytes/-/bytes-0.2.0.tgz
remote:        npm http 200 https://registry.npmjs.org/keypress/-/keypress-0.1.0.tgz
remote:        npm http 200 https://registry.npmjs.org/mime/-/mime-1.2.9.tgz
remote:        npm http 200 https://registry.npmjs.org/pause/-/pause-0.0.1.tgz
remote:        npm http 200 https://registry.npmjs.org/uid2/-/uid2-0.0.2.tgz
remote:        npm http 200 https://registry.npmjs.org/formidable/-/formidable-1.0.14.tgz
remote:        npm http 200 https://registry.npmjs.org/qs/-/qs-0.6.5.tgz
remote:        npm http 200 https://registry.npmjs.org/bytes/-/bytes-0.2.0.tgz
remote:        express@3.3.4 node_modules/express
remote:        ├── methods@0.0.1
remote:        ├── fresh@0.1.0
remote:        ├── range-parser@0.0.4
remote:        ├── cookie-signature@1.0.1
remote:        ├── buffer-crc32@0.2.1
remote:        ├── cookie@0.1.0
remote:        ├── debug@0.7.2
remote:        ├── mkdirp@0.3.5
remote:        ├── commander@1.2.0 (keypress@0.1.0)
remote:        ├── send@0.1.3 (mime@1.2.9)
remote:        └── connect@2.8.4 (uid2@0.0.2, pause@0.0.1, qs@0.6.5, bytes@0.2.0, formidable@1.0.14)
remote:        express@3.3.4 /build/app/node_modules/express
remote:        connect@2.8.4 /build/app/node_modules/express/node_modules/connect
remote:        qs@0.6.5 /build/app/node_modules/express/node_modules/connect/node_modules/qs
remote:        formidable@1.0.14 /build/app/node_modules/express/node_modules/connect/node_modules/formidable
remote:        cookie-signature@1.0.1 /build/app/node_modules/express/node_modules/cookie-signature
remote:        buffer-crc32@0.2.1 /build/app/node_modules/express/node_modules/buffer-crc32
remote:        cookie@0.1.0 /build/app/node_modules/express/node_modules/cookie
remote:        send@0.1.3 /build/app/node_modules/express/node_modules/send
remote:        debug@0.7.2 /build/app/node_modules/express/node_modules/debug
remote:        mime@1.2.9 /build/app/node_modules/express/node_modules/send/node_modules/mime
remote:        fresh@0.1.0 /build/app/node_modules/express/node_modules/fresh
remote:        range-parser@0.0.4 /build/app/node_modules/express/node_modules/range-parser
remote:        bytes@0.2.0 /build/app/node_modules/express/node_modules/connect/node_modules/bytes
remote:        pause@0.0.1 /build/app/node_modules/express/node_modules/connect/node_modules/pause
remote:        uid2@0.0.2 /build/app/node_modules/express/node_modules/connect/node_modules/uid2
remote:        methods@0.0.1 /build/app/node_modules/express/node_modules/methods
remote:        commander@1.2.0 /build/app/node_modules/express/node_modules/commander
remote:        keypress@0.1.0 /build/app/node_modules/express/node_modules/commander/node_modules/keypress
remote:        mkdirp@0.3.5 /build/app/node_modules/express/node_modules/mkdirp
remote:        Dependencies installed
remote: -----> Building runtime environment
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote: -----> Build complete!
remote: -----> Releasing node-js-app ...
remote: -----> Release complete!
remote: -----> Deploying node-js-app ...
remote: =====> Application deployed:
remote:        http://d-sandboxlinux-d2:49153
remote:
To git@d-sandboxlinux-d2:node-js-app
 * [new branch]      master -> master
{% endhighlight %}

And that's it. Hello World!

![Image](/images/hello-world-dokku.png "Hello World")
