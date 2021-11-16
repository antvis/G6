---
title: General Graph Demos
order: 0
---

## General Graph Demos

The data of general graph is not a hierarchical tree data, there might be cycles in general graph data. The differences between general graph and tree graph can be refered to [Introduction to General Graph and Tree Graph](/en/docs/manual/middle/layout/graph-layout#introduction)

### Top 100 Words at Christmas

This demo shows the top 100 hot words on Tweeter at Christmas eve and Christmas day. You can drag and click the nodes to explore the context of the top words.

**'Easter Eggs'**: It is might not a real Easter Eggs since it looks like a homework:

After implementing the graph visualization above, we found a Bug: There are lots of context nodes for ‘christmas’. It begins to swing violently as the layout was about to converge after being expanded. Welcome PR on <a href='https://github.com/antvis/G6' target='_blank'>GitHub</a> to solve it!


### American Airlines with Bundling

An American airlines graph with edge bundling powered by G6. Edge bundling helps developers to reduce the visual clutter. On large graph, edge bundling helps developers to reduce the visual clutter, and visualizes the graph with clearer trend and structures. To show more statistical information, we draw each node with a pie chart which indicates the ratio of arrival(orange) and leaving(cyan) airlines on the corresponding city. The gradient colors of the edges map the direction of airlines. The tooltip with longitude and latitude information will show up when user hovers on each node.






### Visualization Decision

This is a interactive graph visualization which asisits users to find out an appropriate visualization method for their usage. The demo is combined with lots of features of G6, including custom node, custom edge, force directed layout, data change, interactions, and so on. It is applied on homepage of AntV.

### Collapse/Expand Cluster

This demo shows interactively collapse and expand clusters with Fruchterman layout.

Try to click a node to collapse and expand the corresponding cluster.


### Large Graph Exploration

<a className='description' href='https://github.com/antvis/G6/blob/master/packages/site/site/pages/largegraph.zh.tsx' target='_blanck'>Source Code</a>

Some research has found that the graph visulization is readable and interactable for end users under 500 nodes. To reach this principle for large graph, we clustering the source data by LOUVAIN algorithm, and visualize the aggregated graph first. Then, end users are able to do drilling down exploration. If the number of nodes still large on aggregated graph, we can do multi-level aggregation. To control the number of rendering nodes, the earliest expanded cluster will be collapsed automatically. These rules also help us to avoid overloaded computation and rendering on front-end.

#### Definition

This Demo shows the main stream of a large graph visualization solution, including demonstration, interaction, analysis. And it has a user interface, data processing set, analysis process recall, and algorithm algorithm analysis.

#### When to Use

In the senario of large graph visualization, the rendering and computing abilities of front-end are limit. It is hard to ensure smooth real-time interaction and analysis in large data. This solution will be a good way to handle these problem.

#### Legend

- Aggregated Node: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50  style='min-width: 10px' />A aggregated node indicates a cluster calculated by LOUVAIN, it contains several real nodes. The number on the node indicates the real nodes number of this cluster <br />

- Real Node: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' />It is a real node of source data. The Color indicates its cluster. <br />

- Nodes with Green Dot: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EdtxSYsEeeQAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' /> The green dot on the right-top of the node indicates that the node is newly added compared to last result. <br />

- Aggregated Edge: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WG4sQaSj00QAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' />At least one end node is an aggregated node. <br />

- Real Edge: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sIHZRZSh_jAAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' /> Both end nodes are real nodes.

#### Graph Interaction

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IgoxQ7wfjCcAAAAAAAAAAAAAARQnAQ' width=150 style='min-width: 10px' />
&nbsp; &nbsp; <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cCk4SrHVfDsAAAAAAAAAAAAAARQnAQ' width=180 style='min-width: 10px' />

<br /><br /> Each 'Aggregated Node' <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50  style='min-width: 10px' /> represents a cluster generated by LOUVAIN, it contains several 'Real Node' <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' />。

**「Right Click」** any node or edge on the graph, a corresponding contextmenu will show up.

Right click<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50 style='min-width: 10px' /> and select 'Collapse the Cluster' to collapse it, or select 'Find k-Degree Neighbor', A neighbor graph of the selected node will be merged into the current graph.

You can also right click <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' /> and select 'Collapse the Cluster' to collapse it, or select 'Find k-Degree Neighbor', A neighbor graph of the selected node will be merged into the current graph.

#### Canavs Menu

_It is only shown in [Full Screen Mode](/en/largegraph)_ <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FKbFRIzj34EAAAAAAAAAAAAAARQnAQ' width=250 style='min-width: 10px' /> <br /> There is a set of assistant tools on the canvas menu, which is on the left top of the canvas. From left to right, they are: <br />

- Show/Hide Edge Labels;
- Fisheye Lens;
- Lasso Select Mode;
- Find the Shortest Path (by clicking select two end nodes);
- Zoom-out;
- Fit the Graph to the View Port;
- Zoom-in;
- Search a Node(by typing the id).

#### Notice

The demo shows a small mocked dataset just for demonstration. Besides the functions introduced above, there are lots of other functions. We hope it is helpful for you. Explore it and have fun!
