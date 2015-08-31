---
layout: post
title: "Lessons learned from building a larger app with React.js"
date: 2015-08-26 12:20
comments: true
#categories: javascript react development
---

I was asked to join the EFCIS project team as a frontend developer. EFCIS aims to be the go-to catalog of ecological, physiological and chemical information in the Netherlands.

![Image](/images/efcis.jpg "EFCIS")

The project had already started and a prototype was produced using vanilla [Django](https://www.djangoproject.com/) and [Bootstrap](http://getbootstrap.com/) templates.

This prototype neatly defined the basic interaction model based on which the client agreed and the functional design document had been written.

My main objective was to take the user interface from there to a more complete application.

My recent tinkering with [React.js](http://facebook.github.io/react/) for some smaller projects left me confident enough to try it on this larger project.


Data fetching
=============

Data fetching wasn't needed for my smaller React projects. I just included the data as Javascript objects.

EFCIS, however, talks to a RESTful API for its data needs.

I decided to just use [jQuery](https://jquery.com/)'s XHR functions to fetch the data from the API endpoints.

A mistake that hit us quite early was fetching data deep down the component tree. For example, getting a list of parameters just before rendering that list in a modal in some component in some other component.

Doing this seemed logical at first but it's best to keep fetching as high up the component tree as possible and pass down (parts of) the data as props.

[Flux](https://facebook.github.io/flux/) could have saved us some time in the end here, but requires writing lots of boilerplate code. Maybe when I could start all over, I would investigate a lightweight Flux variant.

[Transmit](https://github.com/RickWong/react-transmit) looks nice and can talk to REST, but we didn't have time to dive into it.

[Relay.js](http://facebook.github.io/react/blog/2015/08/11/relay-technical-preview.html) looks even nicer, but our back-end is just a REST endpoint. Porting it to [GraphQL](https://github.com/graphql/graphql-js) is way outside this projects budget. Also, it was anounced while our project was halfway done.

Some tips
---------

 - To keep it DRY, we let Django generate the API endpoint URL's in the index.html template, and use those thoughout the Javascript code.

 - For querying measurement locations we used GET with lots of ID's. This quickly hit a limit so we had to resort to abusing POST requests for fetching.


**Lesson learned:** Decide on a robust xhr data-fetching strategy and stick to it.



Keeping state high
==================

Similar to data fetching, keeping application state should be propagated from components back up to the top-level (app.js) component.

So we use keep state in the top-level component for things like date-range, selected parameters and selected locations, and pass this state to all the components that need it.

In sub-components, we only use setState for compont-internal settings, like 'is this modal open or closed?'.

This keeps the flow of data easy to follow, a much touted pro of doing component composition with React-like frameworks.


Componentize but don't exaggerate
=================================

Splitting the project into components greatly helps with reducing the mental bandwidth required for developing on the projects front-end. There is however a balance to be considered: cutting everything into a sub-sub-sub-component misses the point of separation of concerns.

For example, our Chart component consists of three sub-components: LineChart, BoxplotChart and ScatterplotChart. They use [D3](http://d3js.org/) in the componentDidMount() and willReceiveProps() functions and that works great. Taking it to the extreme however, we could wrap everything in D3 as a React component, but who are we kidding then?


Use (the new) React developer tools
===================================

![Image](/images/efcis-react-debugger.jpg "React Developer Tools")

The [old React developer tools](https://facebook.github.io/react/blog/2014/01/02/react-chrome-developer-tools.html) were already great but had some downsides: not automatically reflecting state and prop values (you had to reselect the node manually). The [new version](https://facebook.github.io/react/blog/2015/08/03/new-react-devtools-beta.html) fixes this and makes inspecting and debugging so easy you can't work without it once you've tried them.

You can see your component tree, track the flow of props throughout the application and inspect state.

Also, when you inspect a component using the regular Elements tab in Chrome Developer Tools, and then switch to the React tab, the component will get selected there too. Even better, you can now use `$r` as a reference to the component in the console!

The new version is [also available for Firefox](https://github.com/facebook/react-devtools/releases).



Take Webpack's advice
=====================

Don't blindly copy require() statements from file to file like I did, as this will grow your bundle size and will take a lot of time cleaning up.

Running `$ webpack -cp` will probably give lots of warnings which you can usually ignore. But to get the best filesizes resulting mobile performance, it's good practice to at least clean up your own code.

Webpack will neatly tell you which variables are not used and which require() statements are not needed.

Also, use [Webpack's xhr bundle loading feature](http://webpack.github.io/docs/code-splitting.html) in conjunction with [react-router](https://github.com/rackt/react-router), or go isomorphic for larger multipage apps. This will make the app load faster and also cuts down on Webpack's hot-reloading time during development.

Example:

{% highlight javascript %}
...
var TableAppPage = null;
var TableAppLoader = React.createClass({
  componentDidMount: function() {
    var self = this;
    require.ensure(['./components/TableApp/TableApp'], function() {
      TableAppPage = require('./components/TableApp/TableApp');
      self.setState({});
    });
  },
  render: function() {
    if(TableAppPage) {
      return <TableAppPage {...this.props} />;
    } else {
      return <div>Pagina wordt geladen...<Spinner style={{marginTop:220,marginLeft:'40%',position:'absolute',zIndex:999999999}} spinnerName='cube-grid' noFadeIn /></div>;
    }
  }
});
...
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="table" handler={TableAppLoader}/>
    <Route name="map" handler={MapAppLoader}/>
    <Route name="chart" handler={ChartAppLoader}/>
    <DefaultRoute handler={TableAppLoader}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('efcis-app'));
});
{% endhighlight %}


Future
======

For future projects, I'll definitely consider using React.js again. But I'll try to incorporate the following tools and practices to make it even better:

 - Evaluate react-transmit or [Relay.js](http://facebook.github.io/react/blog/2015/08/11/relay-technical-preview.html)/[GraphQL](http://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html)

 - Local-scoped CSS ([css-loaders](https://github.com/webpack/css-loader)' module-mode)

 - [Write most of the code as ES6 using Babel](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes)

 - Take more advantage of [@flow](https://code.facebook.com/posts/1505962329687926/flow-a-new-static-type-checker-for-javascript/)

 - [Use React.js in Node](http://www.sitepoint.com/creating-isomorphic-apps-node-js-react-express/) to generate the non-interactive components server-side.
