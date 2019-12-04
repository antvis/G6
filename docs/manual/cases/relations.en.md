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

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rPWURa-ft2QAAAAAAAAAAABkARQnAQ' width=850 />

## Expand the Relationships
Users can query a person by inputing some keywords into the syste, and then do some analysis by expanding the 1-6 degree relationships of the person. The relationships between the person and other organizations can be obtained too.

**Applicable Scene:** The 1-degree relationships indicate the friends of one person in the social network, 2-degree relationships indicate the friends' friend of the person. 

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxQMR5kqVJcAAAAAAAAAAABkARQnAQ' width=850 />

## Relationship Prediction
The types of relationships are various in social network with large data. For example, we suppose that we know that A is a friend of B. We do not know whether C and D belong to og too; How will the graph transform if we add C and D onto the current graph; How will the graph transform if we add a 'prediction' type edge to C and D. Relationship prediction helps us to explore the unknown information.


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4jLkQ7STiIkAAAAAAAAAAABkARQnAQ' width=450 />

**Applicable Scene:** In social network, we want to know how the graph transform when there is a new connection added to two unrelated nodes.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*O22IRIJs4FMAAAAAAAAAAABkARQnAQ' width=850 />


## Relationship Clustering
There might be multiple 'colleague' type relationships betwenn node A and B, e.g. A and B are colleague in company1 and company2. These two 'colleague' relationships have different timestep. We do not render all the similar relationships onto the graph, but render a clustered edge which can be expanded by clicking.

**Applicable Scene:** Cluster relationships with same type into one edge to reduce the visual clutter.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KCx-T7w60J4AAAAAAAAAAABkARQnAQ' width=850 />

## Circle Detection
Suppose that we know a circle of friends: A is a friend of B, B is a friend of C, C is a friend of A. Now we want to figure out if D and E are related to the known circle. Input D and E into circle detection, D and E will show up if they are related to the circle.

**Applicable Scene:** Detect the existence and relationships of a node in a known circle.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z895QL8sBWQAAAAAAAAAAABkARQnAQ' width=850 />

## Circle Query
对于已知的圈，我们可以查询每个圈中包含的节点，以及它们之间的关系。

适用场景：查询指定朋友圈中所有的用户以及用户之间的关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFytR6C3uYIAAAAAAAAAAABkARQnAQ' width=850 />


## Efficient Analysis
图分析应用中，为了提升分析的效率，我们提供了数据过滤、标记重点节点和边、隐藏 / 显示 Label等辅助功能，可帮助用户更快更好地进行分析。


### Data Filtering
当画布上存在大量的节点及边时，想要进行高效分析是件很困难的事情，我们可以通过过滤的功能，将暂时不需要关注的类型的节点和边先隐藏起来，以便我们将精力放在重点的节点和边上面。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MydBT7sgPHIAAAAAAAAAAABkARQnAQ' width=850 />


### Mark the Node and Edge
在分析过程中，将重点需要关注的节点和边进行标记，可以在复杂的网络关系中很清晰地呈现出我们需要重点关注的内容。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7V_-TJv9ZgQAAAAAAAAAAABkARQnAQ' width=850 />

尤其在特别复杂的网络中，该功能特别有用。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cYv4RocCh34AAAAAAAAAAABkARQnAQ' width=850 />


### Hide / Show Node
在分析过程中，对于一些不是很重要的节点，我们可以选择隐藏掉它和与它相关的边，这样就方便我们将注意力集中在重点的节点上面。当分析完以后，我们还可以选择将隐藏的节点全部显示出来。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2L89QI_u16AAAAAAAAAAAABkARQnAQ' width=850 />


### Hide / Show Label
当边特别多时，边上的 label 不仅会重叠在一起，也会影响我们进一步的分析，我们选择将边上的 label 隐藏。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YXxGQIrYgxMAAAAAAAAAAABkARQnAQ' width=850 />

## Conclusion

本应用以模拟的社交网络数据为例，演示了通过使用 [G6](https://github.com/antvis/g6) 构建的一个图分析的应用。在实际的场景中，不仅仅局限于社交网络数据，任何重关系类的数据，都适合使用图分析的技术来进行分析，如风控、反洗钱、信用卡诈骗等金融领域，商品、商家及卖家等电商领域。通过使用图分析技术，我们可以很轻易地具备传统分析方法所欠缺的能力，如分析朋友的朋友这种多度关系的能力。[G6](https://github.com/antvis/g6) 是一款图可视化引擎，专注于图分析领域，非常适合用来构建重型的图分析应用。

## Application Address

<br />
Official website of G6: [https://g6.antv.vision/](https://g6.antv.vision/)
<br />GitHub of G6: [https://github.com/antvis/g6](https://github.com/antvis/g6)
