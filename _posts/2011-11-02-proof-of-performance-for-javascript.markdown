---
layout: post
title: "Proof of Performance for Javascript"
date: 2011-11-02 13:45
comments: true
#categories: javascript development
---
Javascript sure has come a long way in terms of performance. Just have a look at [Broadway](https://github.com/mbebenita/Broadway), an H.264 decoder implemented in Javascript. It draws at the pixel level on the HTML Canvas element. Actually, it's the Android decoder compiled/ported to Javascript using [Emscriptem](https://github.com/kripken/emscripten/wiki) which in turn uses the [LLVM](http://llvm.org/).

![](/images/broadway.png)


TL;DR; Watch [the demo](http://mbebenita.github.com/Broadway/broadway.html).
