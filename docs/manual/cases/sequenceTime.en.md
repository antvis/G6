---
title: Dynamic Relationship Analysis Powered by G6
order: 0
---

## Background
With the rapid development of Internet business, the business and application systems, middleware and their relationships and dependencies have become more and more complex. 
It is hard for the developers, testing personnel, architect, and maintenance personnel to control and maintain the super complex relationships between the applications and middleware. 
Once a problem occurs online, the entire process from the occurrence of a failure to the organization for emergency requires multiple parties to participate. They use multiple system tools and platforms to query and synchronize information. 
There are breaks between multiple stages of the process, the impact assessment and change retrospection take a long time, and the requirements for emergency personnel are relatively high. 
There is no efficient and systematic solution for the overall failure emergency response. 
For example, after receiving an online alarm, the impact area and source of change cannot be located quickly. It is difficult to make accurate decisions. And it is not possible to quickly minimize online failures.


Based on this background, we try to provide a set of emergency plan visualizations to solve a series of emergency decision-making assistance information and methods such as processes, influence areas, emergency plans, ..., to quickly stop bleeding to reduce and avoid failure upgrades.



## Feature Design

### 1. Demonstration of Emergency
The demonstration of emergency is the main view after users enter the emergency mode. It contains six features:
<br />1）Shows the node where the exception occurred on, the nodes that have a calling relationship with the abnormal node, and the calling relationship link;
<br />2）Shows the remark information about paths or nodes;
<br />3）The interaction abilities: show detail information when mouse hover or click a node;
<br />4）Combines with the left panel to display;
<br />5）Allows the menu of the node to be extended;
<br />6）Time series analysis: time bar with bar chart to show the error counts in different time slots, allows refreshing the graph by clicking a bar.<br />


### 2. Affect Area Panel
The affect area: The impact of each anomaly. On the one hand, it is a bussiness affect area if it happens on bussiness; On the other hand, it is a front-end affect area if it happens on the front-end; If it happens on the specific applications, it will be a application affect area.
<br />The affect area is shown in the left panel with the features:
<br />1）Open / close the affect area panel;
<br />2）Show the list of affect area;
<br />3）Swich to bussiness affect area / front-end affect area / application affect area;
<br />4）Show the affect trends;
<br />5）Show the list of logs;
<br />6）The information view is collapsible;
<br />7）Basic architecture dependencies.<br />


### 3. Operation Panel
The entrance of the operation panel is the detail link of the list of affect area.
<br />The operations include:
<br />1）Show and manipulate the summary information;
<br />2）The list of emergency assistances and operations with pop-up icons;
<br />3）Open / close the affect area panel;
<br />4）The information view is collapsible.<br />


### 4. Details Ppanel Extensions
There are some extensions in the detail view of the app:
<br />1）Log demonstration;
<br />2）Emergency assistances.<br />


### 5. Other Features

1. Share links. The links have timestamps for going back to the abnormal place;
2. Be able to limit the flow;
3. Highlight the key words. Use regular to match some keywords and process the HTML text to be displayed.


## Implementation of Main Technologies


### 应急大图
应急大图是一幅有状态的架构大图，主要目的是其一展示系统间关系，分析系统或接口间依赖，其二，除架构上的相关信息外，整个系统集群在某时刻的正常或异常状态的展示和分析，从运维的角度看则更具备意义。通过大图用户就能直观看到业务链路上那个节点出了问题。<br />应急大图我们提供了两种模式：流量视角和链路视角。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cilcQ7Z1_OYAAAAAAAAAAABkARQnAQ' width=425 height=250 />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zOJzTL-l89cAAAAAAAAAAABkARQnAQ' width=425 height=250 />

<br />流量视角的大家第一眼看起来会觉得很酷炫，但实际在应急工作中有太多的冗余信息，对快速把握问题的核心原因没有帮助，所以在应急工作台上大图的构建采用了更加清晰的链路视图。二者的核心数据是一致的，只是链路视图是将流量线做了合并。<br />


### 大图的时序分析
实际上，一张图上某一时刻只能映射出实际系统某一刻的状态剖面。但问题的发生不是瞬时抖动的，而更像是湖面波澜起伏的湖水时高时低。想要了解任意时刻系统的状态，这个时候我们就需要借助时序分析的能力，这个就是通过下面时序分析的工具来实现的：<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hPxRT6SbgskAAAAAAAAAAABkARQnAQ' width=850 height=200 />

这个工具对时间的控制分为了三个层次 分 -> 小时 -> 天。用户通过日期选择控件在不同日期间切换，通过全天的时间轴分析24小时波动趋势，并选择具体时段确定要进行分析分钟级切面，最终通过选择具体切面来进行分析。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pD71SJOp69YAAAAAAAAAAABkARQnAQ' width=850 height=350 />

时序分析模块就是增加时间轴，默认展示最近一小时每分钟的错误总数柱形图，点击柱形图表示选择某时间点，选择后可触发全部功能请求接口，刷新全部功能。<br />当选择出具体时间点后，页面中所有功能需要重新刷新，所以，选择时间的数据模型层在本页面模块相对全局的位置，而所有需要依据此数据而变化的子模块应该在生命周期中监听该数据。大图数据当然也需要在请求到新的数据后更新。<br />处理好以上细节后，我们的大图就有了一个非常强大的时序分析能力。


### 节点信息扩展
从体验上考虑，当我们处理应急工作时最想做到的是用户能够不依赖其他应用，直接在我们的图上能够找到问题最根本的原因，但是受限于目前图可视化的局限，目前所有的信息都收敛到一个“node”的色块上，能够映射上去的信息非常有限，所以一个自然的思路是对节点表达能力进行扩展。<br />得益于G6底层G的渲染能力，我们可以比较容易的在节点上扩展出我们想要的表达方式，通过下面的示例，可以看到G6的节点扩展能力是非常强悍的。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vV8UR50p1ZIAAAAAAAAAAABkARQnAQ' width=850 height=400/>

<br />我们再来看看扩展后的交互能力：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v3MhT61nn1YAAAAAAAAAAABkARQnAQ' width=850 height=300 />

接下来，我们将使用 G6 实现下面的功能：

<video src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/file/A*A2k9QKpYSswAAAAAAAAAAABkARQnAQ' controls width=350 height=350></video>

<br />有了这样的基础后，节点样式不局限于简单的几何形状，而是把具有代表意义的信息映射到节点上，从而使节点的形状一眼看上就能大致反应某节点的特点。这样在某些多个节点需要对比的场景下也是具有意义的。<br />
<br />本次应急工作台，先选用一小时内的错误量数据来扩展节点信息。具体方案是，将这些时序信息分布到原有节点的圆周上，信息值的大小用放射状的柱状图来映射。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PEFPSZwgqScAAAAAAAAAAABkARQnAQ' width=850 height=550 />

### 完整的应用演示

<video src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/file/A*7W5ZQa3KUKIAAAAAAAAAAABkARQnAQ' width=850 height=400 controls>
  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9NAiSJrAlYMAAAAAAAAAAABkARQnAQ' width=850 height=400 />
</video>


## 总结展望
总体来讲，应急工作台深度聚焦业务场景，提供的功能齐备，逻辑合理 ，流程完整。未来可以深入的事情还有很多：比如，节点信息的扩展可以更加丰富点，有更多更丰富的数据可以映射到节点图形中来；当前布局是基于Dagre的有向图层次布局，在布局复杂链路的时候可能还是存在不够清晰的情况；当前的应急工作台尽管基于此前的星云大图，但是却舍弃了节点在整个域架构中的“位置”信息。这些都是需要我们持续深入优化下去的。


## 应用地址
源码：[https://github.com/scaletimes/g6-flow-demo](https://github.com/scaletimes/g6-flow-demo.git)<br />G6 官网：[https://g6.antv.vision/](https://g6.antv.vision/)
<br />G6 GitHub：[https://github.com/antvis/g6](https://github.com/antvis/g6)
