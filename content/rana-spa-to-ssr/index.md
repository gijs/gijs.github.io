---
title: "From SPA to Django + HTMX: How Far Can You Push It?"
date: 2026-08-19T10:00:00+02:00
draft: false
---

> This HTMX rewrite is part of Rana's internal engineering/UX exploration. If you are facing similar architecture questions, we are happy to talk about what we found.


I had a feeling we were overengineering our frontend. Not dramatically — the code worked, the product shipped — but there was a persistent sense that things were more complex than they needed to be. Our React SPA had grown steadily: more state management, a larger bundle, custom link handling that broke browser expectations, and an increasing gap between what the product needed and what the framework demanded. So we ran an experiment: rewrite the entire frontend in Django and HTMX, and see how far it could go before it broke down.

It hasn't broken down yet.

## What We're Building
Rana Water Intelligence is a platform for hydrological data: managing, processing, publishing, and visualising geospatial data for water professionals. Think version-controlled datasets, automated processing pipelines, interactive map publications, and collaborative review workflows. The kind of product where you might expect a React SPA to be the obvious choice.

That's partly why the experiment felt worth running.

## The Problem With Our SPA
Nothing catastrophic. No single moment where things fell apart. Just a steady accumulation of complexity that made the codebase harder to work in than it should have been.

**The bundle kept growing.** Every new feature pulled in dependencies. Load times crept up. Tree-shaking helped, but it was a treadmill.

**Links stopped being links.** In a client-side router, navigation is JavaScript. That means the browser's back button, bookmarks, cmd-click to open in a new tab, and page refresh are all things you have to handle manually and correctly. Sometimes you do. Sometimes you introduce a subtle regression. Standard browser behaviour becomes something you re-implement, imperfectly.

**State management became its own domain.** Server state, UI state, URL state, cache invalidation — each deserves its own solution, and composing those solutions together is a full-time job. We had good engineers spending meaningful time on problems that were artefacts of our architecture, not our product.

**The cognitive overhead was high.** A new engineer joining the codebase had to understand React, our state management approach, our routing conventions, our API client abstraction, and the build toolchain before they could make a meaningful change. That's a lot of ramp-up for what is, at its core, a data management tool.

## The Hypothesis
HTMX is boring technology in the best sense. The server renders HTML. The browser displays it. When something changes, the server renders updated HTML and HTMX swaps it in. Links are links. Pages are pages. The back button works. Refresh works. The browser does what browsers are designed to do.

The question was whether this approach could handle a product like Rana, which includes geospatial map rendering, real-time collaboration, AI chat, file management, and data processing workflows. Things that feel like they demand JavaScript-heavy solutions.

## What We Built
The rewrite covers the full product surface. Here's what ended up in the stack:

**Core: Django + HTMX.** Server-rendered templates with Tailwind CSS. HTMX handles partial page updates — things like infinite scroll on event history, file browser navigation, and form submissions that update fragments of the page. The dual-render pattern works cleanly: a Django view checks `request.htmx` and returns either a full page or just the partial template, depending on how it was called.

**Geospatial maps: MapLibre GL JS as an ES module island.** The map component is loaded as a `<script type="module">` from a CDN (esm.sh), without a build step. It watches for elements with a `data-map-config-url` attribute and initialises a map inside them. The map configuration — layer types, tile URLs, auth tokens, bounding boxes — is served as JSON from a Django view. Raster layers go through a WMS proxy on the Django side (to handle auth). Vector layers use PMTiles served directly from the API, with auth headers injected via a `transformRequest` hook. The map island wakes up when HTMX settles new content into the page, so it composes naturally with the rest of the HTML-first approach.

**Real-time collaboration: Yjs + Django Channels.** We wanted cursor presence — not just "who is online" badges, but geographic cursors on the map. When you hover over a location on the map, collaborators see your cursor at that same geographic coordinate, reprojected to their current viewport and zoom level. The browser side uses the Yjs CRDT library with a WebSocket provider. The Django side implements the y-websocket relay protocol in pure Python, without ypy-websocket, using lib0 varint encoding directly. It buffers document state per room and replays awareness to joining clients. Geographic coordinates (longitude and latitude) are broadcast rather than screen pixels, so cursors stay anchored to the map regardless of zoom or pan.

**AI panel: SSE streaming proxy.** The AI chat panel streams responses from the Rana AI backend through Django using `StreamingHttpResponse` and `httpx.stream()`. The panel itself is a small vanilla JS class that parses server-sent events and renders incrementally. State — open or closed, panel width — is persisted in localStorage.

**Map comments: pinned threads.** Publications (our versioned, shareable data packages) support comment threads pinned to geographic locations. Comment markers are rendered as MapLibre markers projected from longitude and latitude coordinates. The sidebar switches between a layer list and a comment thread list. Comments are posted through a Django proxy that forwards to the Rana API with the session Bearer token. Threads support replies and resolve states, and the client polls every thirty seconds for new comments from other users.

## What Surprised Us
How little we missed.

The assumption going in was that we would hit a wall somewhere — some interaction pattern that required React's component model, or a state synchronisation problem that HTMX could not handle cleanly. That wall did not appear. Every feature that felt like it might require a SPA solution turned out to have a straightforward server-first equivalent.

The map component was the most obvious candidate for friction. Geospatial rendering, auth-aware tile fetching, PMTiles protocol support, real-time cursor presence — none of that lives naturally in HTML. But treating the map as an island worked well. HTMX owns the page structure and navigation. The map module is loaded once, registers itself against a global callback, and coexists with HTMX without conflict. The two worlds do not interfere with each other.

State management largely disappeared as a concern. Most of what we were managing in the SPA — loading states, error states, navigation state, form state — is now handled by the browser and the server doing what they were always designed to do. A page load gives you the current state. A form submission changes it. HTMX gives you partial updates where a full reload would be jarring. That is almost always enough.

The developer experience improved. A view is a Python function that returns HTML. A template is an HTML file. The data flow is explicit and linear. There is no abstraction layer between the server and what the browser receives.

## What This Means for the Architecture Debate
This is not an argument that HTMX is always the right choice, or that React SPAs are always the wrong one. There are product shapes where a SPA is genuinely the better fit — highly interactive editors, offline-first applications, products where the client-side state is the primary source of truth.

But we think the SPA has become a default choice rather than a deliberate one. Teams reach for it because it is what they know, or because it feels like the serious option, or because the initial setup is fast and the complexity cost accrues slowly. By the time the complexity is obviously too high, the codebase is too large to easily change course.

The HTMX version of Rana is simpler, faster to load, easier to onboard into, and behaviorally more correct — links work like links, pages work like pages — than the version it replaced. It handles real-time collaboration, streaming AI responses, and interactive geospatial maps without a build step or a client-side router.

We are not finished. But so far, the most important finding of the experiment is that it was easier than expected. And that is worth saying out loud.


## Demo time

{{< rawhtml >}}
<video controls playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <source src="demo.mp4" type="video/mp4">
</video>
{{< /rawhtml >}}