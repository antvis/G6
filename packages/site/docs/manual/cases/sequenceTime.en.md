---
title: Dynamic Relationship Analysis Powered by G6
order: 0
---

## Background

With the rapid development of Internet business, the business and application systems, middleware and their relationships and dependencies have become more and more complex. It is hard for the developers, testing personnel, architect, and maintenance personnel to control and maintain the super complex relationships between the applications and middleware. Once a problem occurs online, the entire process from the occurrence of a failure to the organization for emergency requires multiple parties to participate. They use multiple system tools and platforms to query and synchronize information. There are breaks between multiple stages of the process, the impact assessment and change retrospection take a long time, and the requirements for emergency personnel are relatively high. There is no efficient and systematic solution for the overall failure emergency response. For example, after receiving an online alarm, the impact area and source of change cannot be located quickly. It is difficult to make accurate decisions. And it is not possible to quickly minimize online failures.

Based on this background, we try to provide a set of emergency plan visualizations to solve a series of emergency decision-making assistance information and methods such as processes, influence areas, emergency plans, ..., to quickly stop bleeding to reduce and avoid failure upgrades.

## Feature Design

### 1. Demonstration of Emergency

The demonstration of emergency is the main view after users enter the emergency mode. It contains six features: <br />1）Shows the node where the exception occurred on, the nodes that have a calling relationship with the abnormal node, and the calling relationship link; <br />2）Shows the remark information about paths or nodes; <br />3）The interaction abilities: show detail information when mouse hover or click a node; <br />4）Combines with the left panel to display; <br />5）Allows the menu of the node to be extended; <br />6）Time series analysis: time bar with bar chart to show the error counts in different time slots, allows refreshing the graph by clicking a bar.<br />

### 2. Affect Area Panel

The affect area: The impact of each anomaly. On the one hand, it is a bussiness affect area if it happens on bussiness; On the other hand, it is a front-end affect area if it happens on the front-end; If it happens on the specific applications, it will be a application affect area. <br />The affect area is shown in the left panel with the features: <br />1）Open / close the affect area panel; <br />2）Show the list of affect area; <br />3）Swich to bussiness affect area / front-end affect area / application affect area; <br />4）Show the affect trends; <br />5）Show the list of logs; <br />6）The information view is collapsible; <br />7）Basic architecture dependencies.<br />

### 3. Operation Panel

The entrance of the operation panel is the detail link of the list of affect area. <br />The operations include: <br />1）Show and manipulate the summary information; <br />2）The list of emergency assistances and operations with pop-up icons; <br />3）Open / close the affect area panel; <br />4）The information view is collapsible.<br />

### 4. Details Ppanel Extensions

There are some extensions in the detail view of the app: <br />1）Log demonstration; <br />2）Emergency assistances.<br />

### 5. Other Features

1. Share links. The links have timestamps for going back to the abnormal place;
2. Be able to limit the flow;
3. Highlight the key words. Use regular to match some keywords and process the HTML text to be displayed.

## Implementation of Main Technologies

### Demonstration of Emergency

The demonstration of emergency is an architecture graph with states, which aims to visualize and analyze the relationships between systems and showing the abnormal states for operation and maintenance. Users can find the abnormal nodes easily by viewing the demonstration of emergency. <br />We provide two views for the demonstration of emergency: flow and path.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cilcQ7Z1_OYAAAAAAAAAAABkARQnAQ' width=425 height=250 alt='img'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zOJzTL-l89cAAAAAAAAAAABkARQnAQ' width=425 height=250 alt='img'/>

<br />The flow view looks fantastic at first glance, but there are lots of redundant information in actual emergency works. It is not helpful for handling the key problem quickly. Therefore, we use the path view on the emergency workbench to show the graph more clearly. The core data of these two views are the same. The path view bundles the flow paths.<br />

### Time Series Analysis

Actually, a graph can only map the state profile of the actual system at a moment. The problem does not occur instantaneously, but more like the undulating waters of a lake. To understand the state of the system at any time, we need to use the ability of timing analysis. It can be achieved by the time series analysis tool:<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hPxRT6SbgskAAAAAAAAAAABkARQnAQ' width=850 height=200 alt='img'/>

This tool has three levels of time control: minutes -> hour -> day. The user switches between different days through the date selection control, analyzes the 24-hour fluctuation trend through the time axis throughout the day, and selects the specific time period to determine the minute-level analysis to be performed. Finally, the analysis is performed by selecting the specific aspect.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pD71SJOp69YAAAAAAAAAAABkARQnAQ' width=850 height=350 alt='img'/>

The timing analysis module has added a time axis. By default, a bar chart of the total number of errors per hour in the last hour is displayed. Clicking the bar chart indicates that a certain time point is selected. After selection, all function request interfaces are triggered to refresh all functions.<br />After selecting a specific time point, all functions in the page need to be refreshed again. Therefore, the data model layer of the selection time is relatively global in this page module, and all submodules that need to be changed based on this data should listen to this data during the life cycle. The demonstration also needs to be updated after new data is requested. After handling the above details, our demonstration has a very powerful timing analysis capability.

### Node Information Extensions

From the perspective of experience, when we deal with emergency work, what we want to do most is that users do not rely on other applications, and can directly find the most fundamental cause of the problem on our demonstation. However, due to the limitations of the current graph visualization, all the information currently converges to a "node" color block, and the information that can be mapped is very limited. Therefore, a natural idea is to expand the node expression ability.<br />Thanks to G6's rendering capabilities, we can easily expand the expressions we want on the nodes. Through the following example, you can see that the node extension capability of G6 is very powerful.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vV8UR50p1ZIAAAAAAAAAAABkARQnAQ' width=850 height=400 alt='img'/>

<br />The abilities after extend:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v3MhT61nn1YAAAAAAAAAAABkARQnAQ' width=850 height=300 alt='img'/>

We achieve these features by G6:

<video src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/file/A*A2k9QKpYSswAAAAAAAAAAABkARQnAQ' controls width=350 height=350></video>

<br />With such a foundation, node styles are not limited to simple geometric shapes, but instead map representative information to nodes so that the shape of a node can roughly reflect the characteristics of a node at a glance. This is also meaningful in some scenarios where multiple nodes need to be compared.<br /> <br /> In this emergency workbench, the error data within one hour is selected to expand the node information. The specific solution is to distribute these time series information on the circumference of the original node, and the size of the information value is mapped with a radial histogram.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PEFPSZwgqScAAAAAAAAAAABkARQnAQ' width=850 height=550 alt='img'/>

### Complete Demo

<video src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/file/A*7W5ZQa3KUKIAAAAAAAAAAABkARQnAQ' width=850 height=400 controls>
  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9NAiSJrAlYMAAAAAAAAAAABkARQnAQ' width=850 height=400 alt='img'/>
</video>

## Conclusion & Future Work

In general, the emergency workbench is deeply focused on business scenarios, providing complete functions, reasonable logic, and complete processes. There are many things that can be deepened in the future. For example, the extension of node information can be more abundant, and richer data properties can be mapped into the node shapes; The current layout is based on the hierarchical layout: Dagre, some complex paths are not clear enough; Although the current emergency workbench is based on the previous Nebula demonstration, it has discarded the 'location' information of nodes in the entire domain architecture. All these problems should be optimized continually in the future.

## Demo Address

Code: <a href='https://github.com/scaletimes/g6-flow-demo.git' target='_blank'>https://github.com/scaletimes/g6-flow-demo</a> <br />Official website of G6: <a href='https://g6-v4.antv.vision/' target='_blank'>https://g6-v4.antv.vision/</a> <br />GitHub of G6: <a href='https://github.com/antvis/g6' target='_blank'>https://github.com/antvis/g6</a>
