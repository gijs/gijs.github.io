---
title: "Can we edit water schematisations in the browser?"
date: 2026-02-20T09:00:00+02:00
draft: false
---

We ran a spike to find out whether we could build a usable schematisation editor inside Rana — in the browser, without QGIS. The answer is a qualified yes, with meaningful caveats.

A schematisation in 3Di is the model of a water network: channels, weirs, culverts, pumps, their geometry, and all the hydraulic parameters attached to each object. Today, editing a schematisation means opening QGIS, loading the 3Di plugin, making changes to the underlying GeoPackage, and uploading the result. That workflow works fine for modellers who live in QGIS. It's a significant barrier for water authority staff who want to make small corrections — updating a pump's capacity, adjusting a weir crest level — without spinning up a desktop GIS session.

## What we looked at

The spike was primarily inspired by [Placemark](https://placemark.io), an open-source web-based geospatial editor. Placemark's approach to editing geographic features in the browser is well-thought-out: it handles coordinate precision, projection management, and complex geometry edits in ways that most web map editors get wrong.

The screenshot shows an early proof of concept: Rana Water Intelligence running with a schematisation loaded, feature selection working, and a property panel on the right showing the full attribute set for a selected channel section. The data shown — `ME_A026`, `ME_A027_NE_2Y-T100` and so on — are real schematisation identifiers from a test dataset. Everything in the panel is currently read-only. The spike question was whether we could make it editable.

## The technical picture

Editing geometry is manageable. The hard part is attribute editing. A schematisation object can have forty or more fields, many of which have interdependencies — if you change a culvert's shape, the cross-sectional area fields need to update accordingly. Enforcing those constraints in the browser, with real-time validation, is solvable but not trivial.

The bigger question is write-back. Making edits in the browser is one thing. Committing those edits back to the schematisation in a way that preserves version history, integrates with the existing revision model, and can be reviewed by a modeller before being used in a simulation — that's the real engineering problem.

## Conclusion

The spike confirmed that a read-only schematisation browser is achievable and valuable on its own. Adding attribute editing for simple fields (name, description, numeric parameters without interdependencies) is a reasonable first step. Full geometry editing and constrained field editing is a V2 problem at minimum.

We're going to move this into the discovery board as a candidate for a phased feature development.
