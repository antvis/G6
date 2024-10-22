---
title: Design
order: 0
redirect_from:
  - /en/docs/design
---

In the article "Science of Complexity", Warren Weaver divides the history of modern science into three stages: Simple Problems, Disorderly Complex Problems, and Orderly Complex Problems, according to the complexity of the problems. After the middle of the 20th century, the academic community began to face more orderly and complex problems of instability, nonlinearity, and diversity. The industry urgently needed an analysis and exploration tool based on a network model and a way of thinking. Later, with the graph-based topological structure of the [Königsberg Seven Bridges Problem](https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg) being solved as a starting point, graph analysis is playing a role in more fields. In the Internet industry, with the development of big data and AI technology, more and more graph visual analysis has been used in many scenarios, such as community structure analysis, clustering, relationship prediction, graph learning, graph neural network, and network evolution, etc.

<br/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CcutRonFDu0AAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>
> 《Science of Complexity》 - Warren Weaver  1948
<br/>

The demanding for design increases rapidly in various graph visual analysis products. What can designers do in this field? How to design a complex graph visual analysis product? What are the key points where we should pay attention on? The AntV design team summarized all these thinking as "G6 Graph Visual Design System", hoping to bring more thoughts and help more designers who are not familiar with this field.

## 1. Introduction

### 1.1 Common Application Scenarios

In Alibaba and Ant Group, graph analysis is widely used in different scenarios such as cloud security, knowledge graph, enterprise risk control, graph database, etc. In abstract terms, there are two basic types:

- Recording, clarifying, and revealing the fact: such as security monitoring and flow monitoring;
- The expansion and abstraction of the fact (prediction of the future): such as various technologies based on artificial intelligence, the prediction and real-time prevention for graphs. <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*An1bQ5IDAsMAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' /> <br/>

### 1.2 Types of Graph

Nowadays, there is no unified graph classificationin both the industry and the academia. Based on AntV's business, we have summarized several common types of graphs: common network, flow chart, DAG diagram, architecture diagram, ER diagram, tree graph. Each graph type has specific usage scenarios and key points for designing. We provide a detailed introduction from the basic introduction, characteristics, applicable business scenarios, and design guidelines for graphs. <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eAFrS5-H_IgAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' /> <br/> [Intro and Guidelines for Different Graph Type >](https://g6-v4.antv.vision/en/design/template) <br/>

## 2. Objects to be Designed

With the design requirements of a graph, designers not only design the exterior of the graph, but also consider the following five layers for experience design. Starting from understanding business and product goals, we should know the user requirements, and then define the fuctional boundaries of the graph product cooperating with the product managers. And then, we build task processes, information frameworks and interface layout of the product based on scenarios. In the final stage, we polish the product interface, and most importantly the visual and micro-interaction design of the graph. <br/> Five layers: <br/> | Layers | Description | | ---- | ---- | | Surface | Visual perception layer: the visual design of the basic product interface, and the graph items such as nodes and edges | | Skeleton | Interface layout: such as canvas, components' layout and interaction logic | | Structure | Architecture of process and information: determine how to integrate multiple graph analysis modes in the product, the combination of various functional modules, and the construction of information framework | | Scope | Function/content requirement: define the boundary of graph analysis product | | Strategy | User requirmens, business goals, product goals |

<br/>

### 2.1 General Design Process

From the perspective of graph analysis, the product usually goes through the following stages in order to transform the data source into valuable information to end users. <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8rt0QJjat3kAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' /> <br/>

> Quoted from "Graph Analysis and Visualization" <br/>

### 2.2 General Graph Analysis Modes

> Corresponds to the scope layer in the "five layers"

Have explored the characteristics of the analysis scene, we divide the graph analysis mode of a product or an application into three types: with clear purpose, no clear purpose, and in special scenario. The interfaces for different analysis modes will not be the same, as well as the user's using process. For a full-featured graph analysis product, the three analysis modes may be available at the same time, resulting in an exponential increase in interface complexity.

#### 2.2.1 With Clear Purpose

This type of analysis mode has clear analysis or query conditions. The presentation of the condition may be a regular expression, a query statement, or a clear starting node and ending node, even directly viewing the defail info of an certain graph item. There are several common query modes: rule query, statement query, association analysis, filter/search on canvas, view details, etc. With clear purpose, it is usually necessary for end users to input clear conditional information by some input panels to expore and analyze the graph. <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hZi_TLLYIiIAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' /> <br/>

#### 2.2.2 Without Clear Purpose

So as to exploration without clear purpose, in order to explore the characteristics of the data and discover valuable infomation, some basic analysis interaction such as N-degree expansion, drill-down analysis, sub-graph exploration, and undo rollback based on the existing data will be helpful.

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hZi_TLLYIiIAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>

#### 2.2.3 In Special Scenarios

##### A. Analysis Scenarios with built-in AI algorithm

In the scenarios with built-in AI algorithm, algorithms or rule reasoning capabilities are necessary to quickly mine target nodes and relationships from massive data, such as: guarantee loop in financial scenes, shortest path, etc.

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wV31SKJ2gFgAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>

##### B. Scenarios with Time-series or Geographic Information

When there is itme-series or geographic infomation in the source data, the graph visualization is usually cmbined with timebar or a map.

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WCYRT4rG8IYAAAAAAAAAAAAAARQnAQ' width='90%'>
<br/>

### 2.3 Common Components

> Corresponds to the frame layer in the "five layers"

The styles of nodes and edges are the basic design for graph visualization. To form a complete graph analysis product, there are various components undertaking different functions. From the perspective of experience design, common components can be categorized as:

- Basic components: legend, toolbar, right-click context menu, view control bar, system log, etc.;
- Condition input: query panel, filte panelr, search bar, canvas settings, etc.;
- Information output: details panel, tooltip, canvas info panel, etc.;
- Advanced functions: timeline, snapshot gallery, analysis report, etc.

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EtfPTrmY5joAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>
[The Buit-in Components of AntV >](https://g6-v4.antv.vision/en/design/component/component-overview)
<br/>

In some special scenarios, it is also necessary to upgrade and optimize basic components based on the actual business requirements, or even design new components based on the unique capabilities of the product. When optimizing a basic component or designing a brand-new component, it is necessary to combine the actual functional requirements and get a full picture of several perspectives such as usage scenarios, constituent elements, common types, and interactive instructions. Take the two newly designed components of AntV as examples:

- [TimeBar](https://g6-v4.antv.vision/en/design/component/timebar)
- [View Control ToolBar](https://g6-v4.antv.vision/en/design/component/view-toolbar)

### 2.4 Intereaction Design

A complete interaction design usually consists of triggers, rules, and feedback. Usually, in a graph analysis product, the common triggers of the interaction behaviors are mouse, keyboard, and touchpad. The rules includes common ones such as expanding a node when double-clicking and highlighting the node when clicking. The feedback is the result presented by the system to end users according to different 'rules', it is indicated by the changes of the items' visual styles in most cases. The Guideline for Intereaction Design >

#### 2.4.1 General Interaction & Extended Interaction

According to whether the interaction event is a global common behavior, the interaction in G6 is categorized as: "universal" and "extended":

- Universal interaction: not related to any bussiness attributes, it is a set of basic toolboxes that adapt to most of the interactive exploration of graphs, and the scope is delineated within the basic keyboard and mouse operations, so that most computer users are able to quickly explore data with it;
- Extended interaction: not necessarily suitable for all scenarios and business attributes. With the powerful scalability and capabilities of G6, the interactions are not limited to the universal ones. It can be triggered by ordinary triggers, other events, or real-time business data. Users of G6 are able to custom the exploration path for their own scenarios freely.

#### 2.4.2 Object to be Interacted

"Interaction" enables users to change from passive "watchers" to active "exploratory analysts" and better participate in the process of data understanding and analysis. The purpose of analysis products is not only to deliver knowledge to users, but to provide a tool to help users explore and analyze the large data, and finally get the desired conclusions. A complete graph analysis product consists of multiple basic interactions which might be combined together according purposes and usages. The objects to be interacted inlude canvas, node, edge, combo, and others. <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*usIZT678zBYAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' /> <br/>

### 2.5 Visual Design

> Corresponds to the performance layer in the "five layers" <br/> Aside from the product interface, the visual design of the graph is essentially a process of establishing mapping channels between visual attributes and data characteristics to form a specific semantic association. A good visual design can greatly improve the information transmission efficiency of the graph. The main items of a graph are nodes and edges. On a node or an edge, there might be text labels and other auxiliary shapes. Consider to the visual design of the graph, the elements should to be disassembled and designed separately, and different interaction events and data attributes should be considered globally. Data properties should be mapped to corresponding visual attributes. In the same time, and final effect of integated visual attributes is also important. Common visual attributes in design are: shape, color, size, direction, material, brightness, position, etc. The design for most basic attributes: shape and color, will be introduced in detail. <br/> [The Visual Design Guidelines >](https://g6-v4.antv.vision/en/design/global/style) <br/>

#### 2.5.1 Shape

The nodes of the graph can be customized according to the actual requirements of the business scenario. In order to present specific information, the nodes can be customized into a special style, or combined with statistical charts (such as donut chart, line chart, etc.).

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6qBAS7RGhqYAAAAAAAAAAAAAARQnAQ' width='90%'/>
<br/>

Regardless of nodes or edges, the visual feedbacks with different mouse events should be considered in the same time: <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QyikQKVGtTgAAAAAAAAAAAAAARQnAQ' width='90%'/> <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fIYATIKMK24AAAAAAAAAAAAAARQnAQ' width='90%'/> <br/>

#### 2.5.2 Color

Based on AntV's color system, and combined with the characteristics of the graph visualization, we fine-tuned the color measurement and linear perception in the data dimension, and built-in a series of beautiful, harmonious and barrier-free design principles for G6, including: classification palette, adjacent palette, divergent palette, and semantic palette. By default, blue is the case color of the basic style.#

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9syXR6FP5AIAAAAAAAAAAAAAARQnAQ'  width='90%' alt='img' />
<br/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SMVEQIxHhLAAAAAAAAAAAAAAARQnAQ' width='90%' />
<br/>

Meanwhile, we also provide dark and light theme styles to meet different application scenarios: <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*epAwRJqUBf0AAAAAAAAAAAAAARQnAQ' width='90%' /> <br/>

#### 2.5.3 Others

The visual design of a graph is not as simple as stacking multiple visual attributes. Generally, the dimensions for design inludes mouse events, data characteristics, and business semantics. In the most complicated case, all three dimensions above need to be considered comprehensively. For example, the node with "Type B" in the following table should meet the condition A, and the visual effect with various mouse events should be taken into consider meanwhile. It is true that not all businesses will encounter such complex situations. In specific business scenarios, the three elements "triggers + rules + feedback" of user scenarios and interactive events can be combined to comprehensively find the most appropriate visual expression.

| Information Dimension | Explanation | Style Example |
| --- | --- | --- |
| Mouse Event | Common mouse events: Default, Active, Selected, Disable, etc. | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GDOeTabF9aIAAAAAAAAAAAAAARQnAQ' width='100' /> |
| Data Characteristics | The inherent characteristics of graph data, such as the data type of nodes or edges | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HUgGSapUuQEAAAAAAAAAAAAAARQnAQ' width='100' /> |
| Business Semantics | Nodes that meet certain rules need special styles to emphasize highlighting | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_bP8S4NU8qwAAAAAAAAAAAAAARQnAQ' width='100' /> |

## 3. Design Guidelines

### 3.1 Start with Questions

It is reasonable for a graph product project to start from the problem to be solved and lead to in-depth exploration gradually. Designing a complete graph analysis product is actually a process of continuously answering the problems encountered in the process of exploration. In other words, the first step in a good graph analysis scenario is to "ask the right questions."

### 3.2 Switch Perspectice

Under different perspectives and layouts, unique patterns of the graph will be highlighted.

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pveSTqcSXv0AAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2rCeR4DvTtAAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>

### 3.3 Details Exploration

The amount of information that people can receive at a time is limited. Considering this limit, the graph visualization should express the detailed information with restraint, and express moderate content in the appropriate scene. It is recommended to follow the principle of "gradual presentation": overview first, zoom and filter, then details on demand. Common methods for details exploration are:

- Pan and zoom: Similar to the zoom effect of the map software, present focus area at different scales, while the context might be out of the screen;
- Global + details: A common tool is minimap. When the user focus on the details, the global context is in the minimap;
- Focus + context: A typical focus+context tool is fisheye, which magnifies the interested area while the context area is deformed to provide more room. It makes sure the context and the relationships between focus and context are not lost.

### 3.4 Time-series Graph Vis

In time-series graph data, event s or objects occur or disappear at certain time points. A helpful tool TimeBar can help the visualization effectively display time-series data. The TimeBar component has been provided in the G6. <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q-bUS6zNzBIAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' /> <br/>

### 3.5 Reversible Operation

The interactions are very important in graph analysis products. Users usually perform a set of analysis actions on the canvas to obtain results. In order to ensure the important information is not missed and prevent wrong operations, the product should provide a reversible operation mechanism to allow the end users to go back or repeat the previous operation.

### 3.6 End with Action

The ultimate goal of graph analysis products is to allow the end users to get the 'answers' they want, and obtain valuable information. Based on that, user could perform the next actions. To achieve that, download/share analysis results, publish analysis rules for online service or precipitation as a template for exploratory analysis, or directly input the analysis results as a part into the complete production chain are neccesary as the end action. In short, a well-experienced graph analysis product must be able to establish a complete closed loop for experience from "questioning" to "action".

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sPpfQpuUua4AAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />
<br/>

## 4. Reference

- [The Aesthetics of Graph Visualization - Chris Bennett, Jody Ryall, Leo Spalteholz and Amy Gooch1](https://www.researchgate.net/publication/220795329_The_Aesthetics_of_Graph_Visualization)
- [Graph Analysis and Visualization - Richard Brath/David Jonker](https://www.wiley.com/en-us/Graph+Analysis+and+Visualization%3A+Discovering+Business+Opportunity+in+Linked+Data-p-9781118845844)
- [Visual Complexity_Mapping Patterns of Information - Manuel Lima](http://goodreads.com/en/book/show/10327296)
- [Data Visualization - Wei Chen / Zeqian Shen](https://book.douban.com/subject/25760272/)
