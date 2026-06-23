---
title: "Querying 42,815 simulations with a single command"
date: 2026-03-15T14:00:00+02:00
draft: false
---

We built a Claude skill for the HCC API, and the first time I used it in a real conversation I got back a list of 42,815 simulations. That number is both impressive and slightly alarming — the platform has accumulated a lot of compute history.

The HCC (Hydrology Computation Cloud) is the backend that runs 3Di water simulations. It's a REST API that most users interact with through the 3Di modeller plugin for QGIS, or through the web interface. But there's a long tail of tasks — auditing what's been run, checking simulation durations, looking at which templates are in heavy use — that are tedious to do through a GUI and usually end up as one-off Python scripts.

## Building the skill

A Claude skill is essentially a wrapper around an API that you register with Claude Code, giving it a set of typed tools it can call. For the HCC API the interesting ones are: listing simulations with filters, getting simulation status, fetching result metadata, and listing available templates.

The authentication step was the first thing I had to figure out. The HCC API uses personal API keys, and I wanted the skill to work without hardcoding credentials. The solution was to have the skill prompt for the API key on first use and store it in the session context — which you can see in the screenshot, where Claude asks whether I want to use an API key or username/password.

## What it's useful for

The most immediate use case is auditing. With a single `/hcc-api list simulations` command I can see who ran what, when, and how long it took. The screenshot shows some patterns immediately: there's a "droge som" (dry sum) simulation that runs for 7 days and 1 hour, which is unusually long. There are also several identical "SSW Harderwijk Ermelo WQ template" simulations run by the same user within hours of each other, which usually means something went wrong on the first attempt.

Being able to ask "which simulations took more than 24 hours last month" in plain language and get a filtered, sorted answer is the kind of thing that used to require writing a script. It takes about thirty seconds now.

## What's next

The skill currently covers read operations. The interesting extension is write operations — submitting a simulation, stopping one that's running too long — but those carry more risk and need more careful guardrails before I'd use them in a conversational context.
