---
title: 基于 G6 的关系时序分析应用
order: 0
---

## 背景分析

随着互联网业务不断快速发展，业务和应用系统、中间件及其之间的关系、依赖变得越来越复杂。不论是研发、测试还是架构、运维人员，对公司线上的应用、中间件等超级复杂关系的整体把控越来越无力维护。一旦线上出现问题，从故障发生到组织应急和应急的整个过程需要多方参与并使用多个系统工具和平台来回查询、不停同步信息。过程的多个阶段之间有断裂，影响面评估和变更追溯耗时较长，且对应急人员的要求有较高的门槛。整体故障应急缺乏高效的、系统的解决方案。例如，线上告警后不能快速定位影响面和变更源，很难准确进行决策，不能迅速最小化的处理线上故障。

基于这样的背景，我们尝试提一套应急方案可视化，解决应急过程中流程、影响面、应急预案等一系列应急决策辅助信息和手段，快速止血以减少和避免故障升级。

## 功能设计

### 1. 应急模式大图展示

应急模式大图是应急模式进入后的主页面，大图应该包括的功能点有： <br />1）本次发生异常的节点、与异常节点的有调用关系的其他节点，以及其调用关系链路展示； <br />2）链路或者节点的一些备注信息展示； <br />3）节点上有交互能力：比如 hover 或者 click 之后有详细信息展示； <br />4）与左侧影响面中选择项联动展示大图； <br />5）节点的展开菜单扩展； <br />6）时序分析功能，时间轴，展示最近一小时每分钟的错误总数柱形图，点击柱形图表示选择某时间点，选择后可触发全部功能请求接口，刷新全部功能。<br />

### 2. 影响面面板功能

影响面的概念是指：每一次发生异常产生的影响。这个影响一方面体现在业务层面，是业务影响面；另一方面体现在更具体的前端页面上，叫前端影响面；体现在具体应用，是应用影响面。<br />影响面以悬浮面板的形式吸附在页面边缘（左侧），应该具有的功能有：<br />1）打开 / 收起影响面面板；<br />2）展示影响面列表信息；<br />3）切换业务影响面/前端影响面/应用影响面；<br />4）影响趋势图；<br />5）日志查看列表；<br />6）信息模块可折叠；<br />7）基础架构依赖。<br />

### 3. 执行操作面板功能

执行操作面板的入口是：点击查看影响面列表中的详情。<br />执行操作含的功能有：<br />1）概要信息列表展示和操作功能；<br />2）应急辅助的列表展示以及操作功能（有弹出展示图标）；<br />3）打开 / 收起影响面面板；<br />4）信息模块可折叠。<br />

### 4. APP 详情面板扩展功能

在原有的 APP 详情页上有添加一些扩展功能：<br />1）日志展示；<br />2）应急辅助。<br />

### 5. 其他功能

1. 链接分享，分享的链接中带有时间参数，用以回到异常现场；
2. 可以限流；
3. 关键字高亮，使用正则去匹配部分关键字并处理待显示的 HTML 文本。

## 主要技术实现

### 应急大图

应急大图是一幅有状态的架构大图，主要目的是其一展示系统间关系，分析系统或接口间依赖，其二，除架构上的相关信息外，整个系统集群在某时刻的正常或异常状态的展示和分析，从运维的角度看则更具备意义。通过大图用户就能直观看到业务链路上那个节点出了问题。 <br />我们提供了两种模式的应急大图：流量视角和链路视角。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cilcQ7Z1_OYAAAAAAAAAAABkARQnAQ' width=425 height=250 alt='img'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zOJzTL-l89cAAAAAAAAAAABkARQnAQ' width=425 height=250 alt='img'/>

<br />流量视角的大家第一眼看起来会觉得很酷炫，但实际在应急工作中有太多的冗余信息，对快速把握问题的核心原因没有帮助，所以在应急工作台上大图的构建采用了更加清晰的链路视图。二者的核心数据是一致的，只是链路视图是将流量线做了合并。<br />

### 大图的时序分析

实际上，一张图上某一时刻只能映射出实际系统某一刻的状态剖面。但问题的发生不是瞬时抖动的，而更像是湖面波澜起伏的湖水时高时低。想要了解任意时刻系统的状态，这个时候我们就需要借助时序分析的能力，这个就是通过下面时序分析的工具来实现的：<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hPxRT6SbgskAAAAAAAAAAABkARQnAQ' width=850 height=200 alt='img'/>

这个工具对时间的控制分为了三个层次：分 -> 小时 -> 天。用户通过日期选择控件在不同日期间切换，通过全天的时间轴分析 24 小时波动趋势，并选择具体时段确定要进行分析分钟级切面，最终通过选择具体切面来进行分析。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pD71SJOp69YAAAAAAAAAAABkARQnAQ' width=850 height=350 alt='img'/>

时序分析模块增加了时间轴，默认展示最近一小时每分钟的错误总数柱形图，点击柱形图表示选择某时间点，选择后可触发全部功能请求接口，刷新全部功能。<br />当选择出具体时间点后，页面中所有功能需要重新刷新。所以，选择时间的数据模型层在本页面模块相对全局的位置，而所有需要依据此数据而变化的子模块应该在生命周期中监听该数据。大图数据当然也需要在请求到新的数据后更新。<br />处理好以上细节后，我们的大图就有了一个非常强大的时序分析能力。

### 节点信息扩展

从体验上考虑，当我们处理应急工作时最想做到的是用户能够不依赖其他应用，直接在我们的图上能够找到问题最根本的原因。但是受限于目前图可视化的局限，目前所有的信息都收敛到一个“node”的色块上，能够映射上去的信息非常有限。所以，一个自然的思路是对节点表达能力进行扩展。<br />得益于 G6 的渲染能力，我们可以比较容易的在节点上扩展出我们想要的表达方式。通过下面的示例，可以看到 G6 的节点扩展能力是非常强悍的。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vV8UR50p1ZIAAAAAAAAAAABkARQnAQ' width=850 height=400 alt='img'/>

<br />我们再来看看扩展后的交互能力：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v3MhT61nn1YAAAAAAAAAAABkARQnAQ' width=850 height=300 alt='img'/>

接下来，我们将使用 G6 实现下面的功能：

<video src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/file/A*A2k9QKpYSswAAAAAAAAAAABkARQnAQ' controls width=350 height=350></video>

<br />有了这样的基础后，节点样式不局限于简单的几何形状，而是把具有代表意义的信息映射到节点上，从而使节点的形状一眼看上就能大致反应某节点的特点。这样在某些多个节点需要对比的场景下也是具有意义的。<br /> <br />本次应急工作台，先选用一小时内的错误量数据来扩展节点信息。具体方案是，将这些时序信息分布到原有节点的圆周上，信息值的大小用放射状的柱状图来映射。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PEFPSZwgqScAAAAAAAAAAABkARQnAQ' width=850 height=550 alt='img'/>

### 完整的应用演示

<video src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/file/A*7W5ZQa3KUKIAAAAAAAAAAABkARQnAQ' width=850 height=400 controls>
  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9NAiSJrAlYMAAAAAAAAAAABkARQnAQ' width=850 height=400 alt='img'/>
</video>

## 总结展望

总体来讲，应急工作台深度聚焦业务场景，提供的功能齐备、逻辑合理、流程完整。未来可以深入的事情还有很多，比如，节点信息的扩展可以更加丰富，有更多更丰富的数据属性可以被映射到节点图形中；当前布局是基于 Dagre 的有向图层次布局，在布局复杂链路的时候可能还是存在不够清晰的情况；当前的应急工作台尽管基于此前的星云大图，但是却舍弃了节点在整个域架构中的“位置”信息。我们将持续深入优化这些问题。

## 应用地址

源码：<a href='https://github.com/scaletimes/g6-flow-demo.git' target='_blank'>https://github.com/scaletimes/g6-flow-demo</a> <br />G6 官网：<a href='https://g6-v4.antv.vision/' target='_blank'>https://g6-v4.antv.vision/</a> <br />G6 GitHub：<a href='https://github.com/antvis/g6' target='_blank'>https://github.com/antvis/g6</a>
