---
title: GPU Layout
order: 12
---

Fruchterman Reingold Layout is a kind of force-directed layout in theory. The differences are the definitions of attracitve force and repulsive force.

## Usage

As the demo below, you can deploy it in `layout` while instantiating Graph. it can also be used for [Subgraph Layout](/zh/docs/manual/middle/layout/#%E5%AD%90%E5%9B%BE%E5%B8%83%E5%B1%80). By tuning the parameters, you can adjust the iteration number, layout compactness, layout by clusters, and so on.

- Example 1 : Basic Fruchterman layout.
- Example 2 : Fruchterman clustering layout.
- Example 3 : Translate the layout parameters in dynamic.
- Example 4 : Fruchterman layout with web-worker in case layout calculation takes too long to block page interaction.
