---
title: News with Graph
order: 5
---

## News with Graph

Here we show some demos about News with graph visualization.

### Top 100 Words at Christmas

This demo shows the top 100 hot words on Tweeter at Christmas eve and Christmas day. You can drag and click the nodes to explore the context of the top words.

**'Easter Eggs'**: It is might not a real Easter Eggs since it looks like a homework:

After implementing the graph visualization above, we found a Bug: There are lots of context nodes for ‘christmas’. It begins to swing violently as the layout was about to converge after being expanded. Welcome PR on <a href='https://github.com/antvis/G6' target='_blank'>GitHub</a> to solve it!


### Australia Fire

This graph demonstrates the fire affectness and population on different cities of Australia. The data comes from NASA, which includes the fire points of Australia detected by the satellites. [Link of the data](https://firms.modaps.eosdis.nasa.gov/active_fire/#firms-shapefile).

The root node represents Australia. The nodes on the second level are the states of Australia. The leaves of the graph represent the main cities of Australia. The sizes of the leaves indicate the population of the corresponding cities. The bars on the leaves show the number of the fire points in the corresponding city everyday, which is detected by the satellites. The color of a leaf is mapped to the degree of the fire effectiveness in the region, which is the average brightness of the fire points in the region detected by the satellites.


### Animated Metro Map

Metro map with animated edges. The demo below shows the metro map with custom animated edges.


### American Airlines with Bundling

An American airlines graph with edge bundling powered by G6. Edge bundling helps developers to reduce the visual clutter. On large graph, edge bundling helps developers to reduce the visual clutter, and visualizes the graph with clearer trend and structures. To show more statistical information, we draw each node with a pie chart which indicates the ratio of arrival(orange) and leaving(cyan) airlines on the corresponding city. The gradient colors of the edges map the direction of airlines. The tooltip with longitude and latitude information will show up when user hovers on each node.
