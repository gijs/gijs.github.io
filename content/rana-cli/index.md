---
title: "A Commandline Interface for Rana"
date: 2026-10-01T10:00:00+02:00
draft: false
---

Although we are designing and building Rana to lower the barrier to entry for hydrological analysis, we also want to make it easy to use Rana for power users. (This does not need to be an either/or situation)

An unofficial Python-based CLI is now available on [github.com/gijs/rana-cli](https://github.com/gijs/rana-cli).


## What it can do

Synchronize a Rana project to your local disk, including all data and metadata. This allows you to work with the data locally, and then sync changes back to the Rana server.

Programmatically access processes, publications, comments, and other Rana resources. This allows you to automate tasks, such as running a process on a schedule, or generating reports.

It can even run digests on your projects and post them to Slack, so you can keep your team up to date on the latest changes.

Imagine the possibilities if you put this together with a CI/CD pipeline, or a cron job. You could have your Rana project automatically updated every night, and have the results posted to Slack.

## Authentication
Auth is OAuth2 + PKCE, handled once. Tokens cached to disk and they refresh themselves. From there, every common resource on the platform gets a real subcommand, not a raw URL to remember. For more info see the Github repo.


## Demo
A video to demonstrate the CLI. This shows how to use the CLI sync a Rana project to your local disk.
{{< rawhtml >}}
<video controls playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <source src="cli.mp4" type="video/mp4">
</video>
{{< /rawhtml >}}
