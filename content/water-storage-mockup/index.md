---
title: "Designing an automatic water storage tool"
date: 2026-03-05T15:00:00+02:00
draft: false
---

After the morning empathy mapping session we had energy left, so we stayed in the room and did a quick design sprint on one of the ideas that had surfaced repeatedly: automatic water storage management. By the end of the afternoon we had three screens and a rough interaction model.

The core problem is this: water authorities need to actively manage storage capacity across their area, but the relationship between physical water level and usable storage volume is non-linear and varies by location. Right now, figuring out how much storage you have available at any given moment requires running a simulation, waiting for it to complete, and then doing manual calculations. We want to make that near-real-time and visual.

## The three screens

The first screen is a project overview — a familiar Rana pattern with a side panel listing the relevant parameters. What's new here is a section specifically for storage configuration: target levels, trigger thresholds, and the time window over which the system should be optimising.

The second screen is the map view. This is where the work gets interesting. The blue areas show current storage zones, colour-graded by their available headroom. A zone that's approaching capacity shows up darker. A zone that has significant buffer shows lighter. You can click any zone to see its current level and its capacity curve.

The third screen is a time-series view, showing how storage levels have moved over the past period and projecting forward based on the current forecast. The dialog in the mockup shows a specific zone's storage curve with a highlighted action point where the system would recommend opening a sluice.

## What "automatic" means

The word "automatic" in the tool name generated the most discussion. True automation — the system making level control decisions without human sign-off — isn't something water authorities are comfortable with yet, and for good reason. What we're actually designing is something closer to a decision support tool with strong defaults: the system recommends actions, shows its reasoning, and lets a professional approve or override.

The sticky notes in the lower half of the mockup capture this negotiation: there are notes about approval flows, about the "Fijn!" confirmation moment (the Dutch word for "great", which we use as a placeholder for the satisfaction state when everything is in good order), and about edge cases like what happens when two adjacent authorities have conflicting storage interests.

## Next steps

The mockup needs a round of review with actual users before it moves forward. The map view in particular makes assumptions about how storage zones map to the geometries in their existing data that we need to validate.
