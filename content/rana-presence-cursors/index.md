---
title: "Building Real-Time Presence Without a Real-Time Backend"
date: 2026-08-19T14:00:00+02:00
draft: false
---

One of the more surprising things I built during the Rana HTMX rewrite was collaborative cursor presence. The kind of feature where you can see other people's cursors moving around on a map in real time. It felt like exactly the sort of thing that would require dedicated real-time infrastructure. It turned out not to.

{{< rawhtml >}}
<video controls playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <source src="presence-cursors.mp4" type="video/mp4">
</video>
{{< /rawhtml >}}

## What I wanted

The goal was simple to describe and felt hard to build: when two people have the same map publication open, they should see each other. Not just a "who's online" badge, but actual geographic cursors. If I hover over a specific location in Amsterdam, my colleague sees my cursor at that exact spot on their map, correctly positioned even if they are zoomed in further or panned to a different area.

The geographic part was important. Screen coordinates are meaningless across different viewports. If I send you `(x: 420, y: 310)`, that means nothing unless we have the exact same zoom level, pan position, and window size. What I actually wanted to send was a longitude and latitude — a real-world coordinate — and let each client reproject it to their own screen.

## The technology choices

I chose **Yjs** for the shared state layer. Yjs is a CRDT library for collaborative applications, best known for powering collaborative text editing. But underneath the editor integrations it has a simple and excellent awareness protocol — a lightweight pub/sub system for ephemeral, non-document state like cursor positions, user presence, and viewport information. It is exactly what I needed.

Yjs has a companion library called y-websocket that handles the WebSocket transport. Normally you would run a dedicated y-websocket server (a Node.js process). I did not want to do that. I wanted the relay to live inside the Django application, alongside everything else.

**Django Channels** provides async WebSocket support for Django over ASGI. Combined with Daphne as the ASGI server, it gave me a native WebSocket endpoint without leaving the Python stack. The question was whether I could implement the y-websocket relay protocol in pure Python, without ypy-websocket (the Python Yjs binding, which has a complex installation story and does not integrate cleanly with Django Channels). The answer was yes, though it took some careful reading.

## Implementing the protocol in Python

The y-websocket wire protocol is binary. Messages are encoded using lib0, a compact encoding library that represents variable-length integers (varints) in a format similar to Protocol Buffers. There are two message types I needed to handle:

**Sync messages** (type 0) carry Yjs document state. A new client sends a "sync step 1" with its state vector, the server replies with a "sync step 2" carrying any missing document updates, and then incremental updates are relayed as they arrive.

**Awareness messages** (type 1) carry ephemeral client state — cursor positions and user names. These are not part of the Yjs document and do not need to be merged with CRDT logic. They just need to be relayed to all other connected clients, and replayed to new clients when they join.

I wrote the varint encoder and decoder in about 20 lines of Python, then built message constructors for each message type. The Django Channels consumer stores document state and awareness state in a per-room in-memory dict, relays sync and awareness messages to the channel group, and on disconnect sends an awareness removal message to let peers know the client is gone.

The awareness removal deserves a specific note. When a client disconnects, I synthesize a removal message and send it to all remaining peers. The removal has to include the client's last known clock value plus one — Yjs uses a clock-based ordering and will silently ignore a removal if the clock does not exceed the stored value. Getting this wrong meant ghost avatars accumulating on every page reload, which was the first bug I had to debug after getting presence working.

## Geographic cursors

On the browser side, I used Yjs and y-websocket as ES modules loaded directly from a CDN, with no build step. The collab module connects when the URL matches a project page, derives a room name from the tenant and project slug, and sets up awareness with the user's name and colour.

The cursor broadcasting happens on the map's `mousemove` event. Rather than broadcasting screen pixels, I call `map.unproject(e.point)` to convert the cursor position to geographic coordinates, and broadcast those. On the receiving side, each peer's longitude and latitude is projected back to screen pixels using `map.project([lng, lat])`, then converted to viewport-relative fixed coordinates using the map container's `getBoundingClientRect()`. The result is that cursors stay geographically anchored regardless of zoom, pan, or window size.

I also skip rendering cursors that fall outside the map container bounds — if a peer is looking at Rotterdam and I am looking at Amsterdam, their cursor simply does not appear on my map rather than rendering at a nonsensical position.

## Identity

I wanted cursors to show the logged-in user's real name rather than a generated random name. The user's name comes from the Django session (populated during the OAuth2 PKCE login flow from Cognito). I pass it to the browser as a small JSON blob in the page HTML, which the collab module reads on startup. Anonymous sessions fall back to a persistent random name stored in localStorage — something like "calm-owl" or "eager-fox" — so the feature still works without authentication.

Colours are deterministic from the name, so the same person always gets the same colour across sessions.

## What surprised me

The hardest part was not the protocol implementation or the geographic projection. It was the awareness cleanup.

When a page reloads, a new Yjs document is created with a new random client ID. The old connection closes. I had initially stored awareness messages keyed by client ID, but stored the raw bytes of the combined message — which could contain multiple clients' states in a single blob. When client A disconnected and I removed key A from the stored awareness, client B's key still pointed to bytes that contained A's state. New joiners received the stale state and rendered the ghost.

The fix was to parse each awareness message into per-client entries and store individual single-client messages per key. Combined with sending the correct clock value on removal, ghost avatars disappeared.

The protocol work was dense but finite. The geographic projection was a few lines once I understood the MapLibre API. The cleanup bugs were the part that required the most careful thinking, because they were invisible until you had two browser windows open and started reloading.

The end result is collaborative presence built entirely within a Django monolith, with no additional services, no Redis (for a single-worker deployment), and no Node.js. The browser loads Yjs from a CDN as an ES module. The server is a Python class. The whole thing is about 300 lines of code across two files.
