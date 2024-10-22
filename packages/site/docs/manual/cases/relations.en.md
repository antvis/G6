---
title: Relationship Analysis Powered by G6
order: 1
---

## Background

Social network is an important scenario of graph visualization. The relationships between people and people, people and organization are getting complicated. It is hard to meet the analyzing requirements by the classical methods. Therefore, graph visualization and analysis become important.

## Functional Overview

It is a graph analysis application powered by G6. It simulates a relation analysis scenario with mock data, and demonstrates the analyzing abilities of G6:

- Expand the Relationships;
- Relationship Prediction;
- Relationship Clustering;
- Circle Detection;
- Circle Query;
- Efficient Analysis:
  - Data Filtering;
  - Mark the Node and Edge;
  - Hide / Show Node;
  - Hide / Show Label.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rPWURa-ft2QAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## Expand the Relationships

Users can query a person by inputing some keywords into the syste, and then do some analysis by expanding the 1-6 degree relationships of the person. The relationships between the person and other organizations can be obtained too.

**Applicable Scene:** The 1-degree relationships indicate the friends of one person in the social network, 2-degree relationships indicate the friends' friend of the person.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxQMR5kqVJcAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## Relationship Prediction

The types of relationships are various in social network with large data. For example, we suppose that we know that A is a friend of B. We do not know whether C and D belong to og too; How will the graph transform if we add C and D onto the current graph; How will the graph transform if we add a 'prediction' type edge to C and D. Relationship prediction helps us to explore the unknown information.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4jLkQ7STiIkAAAAAAAAAAABkARQnAQ' width=450 alt='img'/>

**Applicable Scene:** In social network, we want to know how the graph transform when there is a new connection added to two unrelated nodes.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*O22IRIJs4FMAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## Relationship Clustering

There might be multiple 'colleague' type relationships betwenn node A and B, e.g. A and B are colleague in company1 and company2. These two 'colleague' relationships have different timestamp. We do not render all the similar relationships onto the graph, but render a clustered edge which can be expanded by clicking.

**Applicable Scene:** Cluster relationships with same type into one edge to reduce the visual clutter.

## Circle Detection

Suppose that we know a circle of friends: A is a friend of B, B is a friend of C, C is a friend of A. Now we want to figure out if D and E are related to the known circle. Input D and E into circle detection, D and E will show up if they are related to the circle.

**Applicable Scene:** Detect the existence and relationships of a node in a known circle.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z895QL8sBWQAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## Circle Query

For the known circles, we are able to query to nodes and relationships about them.

**Applicable Scene:** Query the person and relationships in the circles of friends.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFytR6C3uYIAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## Efficient Analysis

To improve the efficiency of analyzing, we provides data filtering, node/edge marking, node/edge hiding/showing, label hiding/showing, etc.

### Data Filtering

It is hard for users to explore a graph with large amount of nodes and edges. By utilizing data filtering, the unconcerned items will be hided.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MydBT7sgPHIAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### Mark the Node and Edge

Marking the important nodes and edges helps users analyze the information about the focus items.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7V_-TJv9ZgQAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

This function is appropriate for the exploration on complex network.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cYv4RocCh34AAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### Hide / Show Node

During the analysis process, we can selectively hide unimportant nodes and their related edges, so that we can focus on the important nodes. When the analysis is completed, we can choose to display all hidden items.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2L89QI_u16AAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### Hide / Show Label

When the number of edges is particularly large, the labels on the edges overlap each other, affecting our further analysis. At this point, you can choose to hide the labels on the edges.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YXxGQIrYgxMAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## Conclusion

This application uses simulated social network data as an example to demonstrate a graph analysis application powered by <a href='https://github.com/antvis/g6' target='_blank'>G6</a>. In actual scenarios, it is not limited to social network data. Any relational data can be analyzed using graph analysis techniques, such as risk control, anti-money laundering, credit card fraud, and other business fields. <a href='https://github.com/antvis/g6' target='_blank'>G6</a> is an open source graph visualization engine that focuses on the demonstration and the analysis of relational data, and it is appropriate for building graph analysis applications.

## Application Address

<br />Official website of G6: <a href='https://g6-v4.antv.vision/' target='_blank'>https://g6-v4.antv.vision/</a> <br />GitHub of G6: <a href='https://github.com/antvis/g6' target='_blank'>https://github.com/antvis/g6</a>
