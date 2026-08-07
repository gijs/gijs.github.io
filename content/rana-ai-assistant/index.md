---
title: "Building a Claude-powered AI assistant into Rana Water Intelligence"
date: 2026-08-07T10:00:00+02:00
draft: false
---

As part of our UX discovery process, I've built a spike to find out what is possible regarding a built-in AI assistant. This is my writeup of that process. The Rana AI assistant lives in a collapsible panel on the right side of every page, knows what you're looking at, can query your live project data, and streams answers back in real time. Here's how it was built and what it can actually do.

## The panel

The assistant opens as a 380px panel fixed to the right edge of the screen — present on every authenticated page, absent from public ones. A drag handle lets you resize it. Closed, it collapses to a 48px strip. The header uses Rana's `brand.clear_creek` background colour with a "Rana AI" title and buttons for starting a new conversation or closing the panel.

When you open it for the first time in a session, you get a welcome screen: the Rana logo, a greeting with your first name, and four prompt chips — "List my projects", "Analyse data", "What can you do?", and "Where am I?". That last one is worth explaining: it sends a context-aware message to Claude describing the current page — project detail, projects list, catalogue, dashboard — so the conversation is grounded from the start without you having to explain anything.

Responses are streamed over SSE with a blinking cursor while Claude is thinking. The rendering handles markdown fully: tables, code blocks, lists, headers. While Claude is calling the Rana API on your behalf, a spinner shows the tool name so you know what's happening. Claude can also end a response with a `<choices>` tag, which the UI turns into clickable option buttons — useful for branching workflows where the next step is one of a small set of options.

Conversation history is loaded from the server when the panel opens, scoped per project or dashboard session, so you can pick up where you left off.

## What it can do

The assistant has access to the Rana API through a local Node.js proxy server. That proxy handles the Anthropic API integration, tool execution, prompt caching, and a RAG module over the Rana documentation. Claude can query your projects, inspect simulation results, fetch publication data, and reason over what it finds.

Two examples worth showing in full.

**Document and permit analysis.** One of the things water authorities spend a lot of time on is checking whether building proposals, zoning requests, and environmental permit applications comply with local and national water regulations. It's detailed work — referencing specific articles, cross-checking against spatial planning rules, accounting for flood risk zones. The demo below shows what that workflow can look like when the assistant handles the document reading and rule matching:

{{< rawhtml >}}
<video controls playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <source src="plantoetsing.mp4" type="video/mp4">
</video>
{{< /rawhtml >}}

The assistant reads the submitted documents, identifies the relevant regulatory requirements, and produces a structured assessment — flagging what complies, what doesn't, and what needs clarification. This is a genuine time sink for water authority staff, and having a first-pass analysis that can be reviewed and corrected is meaningfully useful even when it isn't perfect.

**Running simulations.** The assistant can also trigger real operations. In this demo, a user asks the assistant to run a rain simulation on a project. Claude calls the Rana API, submits the simulation with the right parameters, monitors its status, and reports back when it completes:

{{< rawhtml >}}
<video controls playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <source src="rana-ai-rain-simulation.mp4" type="video/mp4">
</video>
{{< /rawhtml >}}

This is what makes a tool-using AI assistant genuinely different from a chatbot. It doesn't just explain how to run a simulation — it runs it.

## The backend

The proxy server is a local Node.js process. It sits between the Rana frontend and the Anthropic API, handling a few things that shouldn't happen in the browser:

- **Authentication and key management.** API keys stay server-side.
- **Tool execution.** When Claude calls a Rana API tool, the proxy makes the actual HTTP request and returns the result.
- **Prompt caching.** System prompts and documentation context are cached with Anthropic's prompt caching API, keeping latency low on follow-up messages.
- **RAG over the Rana docs.** The proxy maintains a retrieval index over Rana's documentation. Relevant passages are injected into the context window based on the current conversation, so Claude can answer product questions accurately without hallucinating.

## The AI Workspace

Beyond the panel, there's a dedicated full-screen workspace page accessible from the sidebar — a `MessageIcon` that navigates to `/:tenant/ai-workspace/:sessionId`.

The layout is master-detail: a 320px session list on the left, a full chat view on the right. The session list has search, relative timestamps, last-message previews, and skeleton loaders while sessions are fetching. Sessions are browsable across all your projects. The URL is bookmarkable and shareable — if you want to send a colleague a link to a specific conversation, the link works.

The chat detail view loads the full history and lets you continue the conversation. A clear session button resets it. The same streaming infrastructure that powers the panel works here.

## Why this matters

Water management involves a lot of work that is structured but labour-intensive: checking permit applications against regulations, running sensitivity analyses, comparing simulation results across scenarios. These are tasks where the bottleneck is not understanding — experienced professionals know what to look for — but time and interface friction. A conversational assistant that can read documents, query live data, and run simulations reduces that friction directly.

The RAG module and the tool-call architecture together mean Claude can be useful without needing to be prompted carefully. It knows what Rana can do, it can look up what your projects contain, and it can take action when you ask it to. That's the combination that makes this something other than a demo.

The next step is expanding the tool set: more simulation controls, result comparison, export workflows, and tighter integration with the permit analysis pipeline.
