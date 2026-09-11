---
title: "Click-to-simulate"
date: 2026-09-11T09:25:57+02:00
draft: false
---

Hydrodynamic simulation is a complex process. There are so many parameters to consider, and the results are often difficult to interpret. As a UX designer, I'm always looking for ways to make complex processes more accessible. One of the ideas I've had for a long time was to create a "click-to-simulate" app, where users can click on a point on the map, and see the results of the simulation at that location.

The idea is simple: 
- On click (or on search), the app will fetch elevation data from [PDOK](https://www.pdok.nl/)
- On 'simulate', a very basic 2D hydrodynamic simulation runs using the elevation data and pre-set rainfall and boundary conditions
- The results are immediately plotted on the map, showing the water depth of each cell in a hover tooltip
- Sewer is completely ignored, so the results are not realistic. However, they give a basic and playful indication of where water will accumulate and how deep it will be.

Disclaimer: This is a personal project, for the purpose of exploring UX and interaction design. It is not a product, and it is not intended for use in any real-world applications. 


## Demo

{{< rawhtml >}}
<video controls playsinline style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <source src="demo.mp4" type="video/mp4">
</video>
{{< /rawhtml >}}