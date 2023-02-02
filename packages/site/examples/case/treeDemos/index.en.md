---
title: Tree Graph Demos
order: 1
---

## Tree Graph Demos

The data of tree graph is a hierarchical data, which has no cycles. Each node expect root node has only one parent node, the root node has no parent node. The differences between general graph and tree graph can be refered to [Introduction to General Graph and Tree Graph](/en/docs/manual/middle/layout/graph-layout#introduction)

### Decision Tree

#### Definition

Decision tree, supports default levels, supports expand, collapse, hover, click, etc.

This demo shows a decision tree that organize event items. It is useful for project risk assessment, feasibility decision analysis, and other decision cases. It supports collapse, expand, hover the title to show tooltip, etc. And with the zoom ratio changing, the node will automatically switch between detail mode and brief mode.

#### When to Usage

It is generally used in decision analysis scenarios. In the financial field, it is used to display capital flow, month-on-month, year-on-year, etc., to help executives make decisions and explore opportunities. Each branch displays the current node status through different forms, and can provide early warning and early warning of key indicators. Monitoring and other operations. It is also often used in cost-reduction and revenue-increasing scenarios. The indicators show various cost-reduction channels and operating channels. Channel decisions are made by analyzing the relationship between the channels and the actual cost-reduction amount.


### Indented File Graph

#### Definition

This demo combines file system view and node-link graph visualization. It demonstrates the hierarchy and and affiliation well. It supports branch draging, child node adding, branch collapsing or expanding, etc.

### Knowledge Tree Graph

#### Definition

Tree Graph is popular graph visualization method to represent hierarchical realtional data. Because of its efficient space utilization and good interactivity when presenting data, it has received a lot of attention and in-depth research, and has been widely used in science, sociology, engineering, business and other fields. Tree diagrams can decompose things or phenomena into branches, also known as tree diagrams or system diagrams. The tree diagram is to systematically expand the purpose to be achieved and the measures or means that need to be taken, and draw it into a diagram to clarify the focus of the problem and find the best means or measures.

#### When to Usage

- When the subject is known and given in general, it needs to be transformed into specific details;
- When seeking reasonable steps to achieve a goal;
- When planning to implement specific actions of a plan or other plan;
- When performing a detailed analysis of the process;
- When exploring the root cause of the problem;
- When evaluating several possible solutions to the problem;
- When the affinity diagram or correlation diagram cannot reveal key issues;
- When used as a communication tool to explain specific details to others.

#### Custom flow graph

As the demo below, to satisfy such a highly customized requirments, users can custom nodes and edges by themself.

#### Mindmap

A mind map is a diagram used to visually organize information. A mind map is hierarchical and shows relationships among pieces of the whole.

This case contains a series of interaction of mind map, including adding, removing, changing title.

#### Australia Fire

This graph demonstrates the fire affectness and population on different cities of Australia. The data comes from NASA, which includes the fire points of Australia detected by the satellites. [Link of the data](https://firms.modaps.eosdis.nasa.gov/active_fire/#firms-shapefile).

The root node represents Australia. The nodes on the second level are the states of Australia. The leaves of the graph represent the main cities of Australia. The sizes of the leaves indicate the population of the corresponding cities. The bars on the leaves show the number of the fire points in the corresponding city everyday, which is detected by the satellites. The color of a leaf is mapped to the degree of the fire effectiveness in the region, which is the average brightness of the fire points in the region detected by the satellites.

