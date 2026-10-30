---
title: "Re-creating Eames Powers of Ten in Three.js"
date: 2026-10-30T10:00:00+02:00
draft: false
---

Do you remember the Eames [Powers of Ten film](https://www.youtube.com/watch?v=0fKBhvDjuy0)? It is a classic short film that explores the relative scale of the universe in factors of ten. I've always loved the way it visualizes the vastness of space and the minuteness of the microscopic world.

The original film was made in 1977 by Charles and Ray Eames, and it has inspired many to think about scale in a new way. Using Three.js, a popular JavaScript library for 3D graphics, I decided to use LLMs to recreate the Powers of Ten experience in a web browser. This allows users to interactively explore the universe from the largest scales down to the smallest.

The 1977 film crosses forty-one orders of magnitude in nine minutes, from a picnic
blanket out to the superclusters and back down into a carbon nucleus. That span is
the entire engineering problem. A `float32` carries about seven decimal digits; no
scene graph holds 10⁴¹ in absolute coordinates.

So the camera is bolted to the origin and never moves. Everything is a function of
one scalar — `s`, the log of how many metres the frame spans. Content is authored
per decade in normalised units and placed into the scene scaled by `10^(level - s)`.
Only about three decades are ever live at once, which keeps that exponent inside
±1.5. Every number the GPU sees is ordinary, whether you are looking at quarks or at
superclusters.

{{< figure src="01-measuring-squares.jpg" alt="The nested measuring squares at one metre, each square one tenth the width of the one outside it." caption="10⁰ m. The nested squares are the film's signature and they fall straight out of the maths: a square denoting 10^L metres occupies 10^(L−s) of the frame. The grid is diagnostic content — one cell of each decade is exactly the next decade's full extent, so if the scaling were wrong by a hair, nothing would nest." >}}

One thing took me three attempts to get right: **the square defines the scale, not
the camera.** My first version drew the square at 46% of a frame it claimed was the
full field of view. The two disagreed by a factor of 2.15, which made the HUD a
decoration rather than an instrument.

Take a look at the demo here: [Powers of Ten in Three.js](https://gijs.github.io/powers-of-ten/)

## Every catalogue draws you its own edge

The star field comes from the HYG catalogue — 108,401 real stars, Sirius where
Sirius actually is. It looks superb at 10¹⁸ m and becomes a lie about two decades
later.

HYG is magnitude-limited, so how deep it is complete depends on how far away you
look. Measured in shells, its apparent stellar density falls by a factor of
**26,000** between the solar neighbourhood and 900 parsecs, while the real galactic
disk is roughly flat over that range. Viewed from a receding camera that reads as a
dense knot of stars around the Sun thinning into nothing: a picture of the survey,
not of the sky.

{{< figure src="02-star-field.jpg" alt="A dense star field with blue, white and orange stars." caption="10¹⁸ m. Real stars, with real colours derived from their B−V indices." >}}

{{< figure src="03-galaxy.jpg" alt="A spiral galaxy with a warm core and blue arms, the Sun marked off-centre." caption="10²¹ m. A raymarched emission-absorption volume. The bulge sits off-centre because the Sun does — every band is heliocentric, since the piece holds its starting point at frame centre." >}}

The same thing happens again two decades up. The galaxy catalogue reaches 3
megaparsecs; by 10²³ m the viewpoint is 9.8 Mpc out, three times past the far edge
of the data, and the galaxies cover 0.01% of the frame. Both bands now stop where
their data stops and hand over to a procedural field.

A subtler version of the same bug nearly got past me. Star brightness is normalised
against the camera's own distance so the field does not fade out as the viewpoint
recedes. But every field here is *bounded* while the viewpoint keeps going — so past
the edge of the content, the exposure was compensating for distance the content no
longer spanned, collapsing what remained into a bright knot and pumping it brighter
the further away it got.

| Star band coverage, 10¹⁸ → 10²⁰ | Result |
| --- | --- |
| Exposure tracking the camera past the data | `0.47 → 39.5` |
| Exposure pinned to the band's own decades | `0.57 → 0.02` |

Coverage of 39.5 means the ink laid down was thirty-nine times the area of the
frame. It was a solid white wash, and I had looked at it several times without
registering that anything was wrong.

## Everything below a micron is free

The journey inward costs nothing to store. Hydrogen-like electron orbitals have a
closed form, so |ψ|² is a two-line expression and the shapes are the real ones.
Cells are a jittered lattice. DNA is a distance function. No textures, no downloads,
no licences.

{{< figure src="04-cells.jpg" alt="Packed cells with visible membranes and nuclei." caption="10⁻⁴ m. Cells on a jittered lattice, each with a membrane shell and an offset nucleus." >}}

{{< figure src="05-dna.jpg" alt="A DNA double helix with coloured base pairs." caption="10⁻⁸ m. B-form DNA: 2 nm across, 3.4 nm per turn, ten base pairs to the turn." >}}

That helix took two tries. First it rendered as pure colour noise: a strand is 0.034
local units thick and the ray marcher was stepping 0.17 at a time, walking straight
past it, with the per-pixel jitter that normally hides banding turning the misses
into static. Then it rendered as a *disc* — because I had run the helix along the z
axis, which is the axis the camera looks down.

## Measure the picture, don't look at it

Nearly every real bug in this project was found by rendering to a buffer and
computing a number, and several of them had survived my looking directly at them.

- A galaxy field at identical coverage looked like porridge. The number that
  explained it was ink per star: 122 px² against the catalogue's 23. Half as many
  stars at four times the area gives the same total and reads as mush.
- A "modest" 12% giant-star fraction made giants **89%** of everything large enough
  to resolve, because luminous stars are only 0.4% of the luminosity function. The
  field came out uniformly orange.
- Twice I was convinced the galaxy was rendering ten times too small. Measuring the
  radial profile showed the frame spanned exactly the predicted 3.5 kpc. My
  expectation was wrong, not the code.
- The audio layer weights summed to 1, which I assumed meant a level mix. Rendered
  offline, it climbed **18 dB** from one end of the journey to the other, because
  shimmer runs eight times quieter than filtered noise.

| Base image brightness, 800px → 200px tall | Result |
| --- | --- |
| Point size with a fixed pixel floor | `30 → 179` |
| Point size scaled against the viewport | `22 → 18` |

That last one I found while preparing to deploy, in a test that simulated serving
the page from a subdirectory. The deployment was fine. The test caught something
else entirely: the image depended on window size, because `gl_PointSize` is in
pixels with a one-pixel floor, so the same 108,401 stars cover a far larger fraction
of a small canvas than a large one.

## Ten layers on the same window function

The score is synthesised — no samples, nothing anyone owns, zero bytes. Ten layers
tile the full range and are mixed through the identical window function the visuals
cross-fade on, so a sound layer fades on exactly the curve its matching picture
does.

A drone tracks `s` directly and falls five octaves, 440 Hz at the quantum end to
13.75 Hz at the cosmic one. Measured across the journey, the spectral centroid drops
from 4,215 Hz to 64 Hz: the piece literally descends in pitch as the frame opens up.

## Twenty-three of forty-one

The whole inward journey is built, and everything from the local stars outward. What
is missing is the stretch from the picnic blanket to the stars — 10⁰ to 10¹⁶ — and
it is missing for an honest reason: it needs photographs, orthoimagery and
ephemerides rather than shaders. That was always the Eameses' real work. Forty
distinct plates, hand-made.

One decade is deliberately left as a diagnostic grid. At 10⁻¹² m you are between the
electron cloud and the nucleus, and there is genuinely nothing there. Faking
something would be worse than admitting it.

---

Star data: [HYG Database](https://github.com/astronexus/HYG-Database) (astronexus),
CC BY-SA 4.0. Galaxy data: McConnachie 2012, AJ 144, 4.
*Powers of Ten* (1977) is © the Eames Office. This is an homage with its own art,
score and text.


