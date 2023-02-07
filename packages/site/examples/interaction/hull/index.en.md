---
title: Hull
order: 5
---

Use a smooth contour to wrap a specified set of nodes.

## Usage

Hull is used for wrapping a set of nodes, to emphasize the sets or groups in the graph and do not affect the original node positions and the layout. There are three types of hull: `round-convex`, `smooth-convex` and `bubble`. The `round-convex` type generates a rounded polygon, the `smooth-convex` configuration generates a closed spline contour and the `bubble` type generates a smooth concave hull that could avoids `nonMembers`. The hulls could be updated interactively. In the first example below, the blue one is of bubble type and green is a rounded convex hull. The two hulls listen for node changes and then be updated, so that they always wrap the nodes. In the second example, the red bubble allows its members to be dragged in and out, and its members could be added by right clicking on the canvas. The blue bubble is updated according to node changes. For the complete configuration, please refer to the API documentation: [createHull](/en/docs/api/graph-func/hull#createhullcfg-hullcfg).
