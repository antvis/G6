---
title: 全局交互
order: 1
---

### 引言

在图可视化分析的实际场景中，往往会发现静态演示不足以满足我们的业务需求，这种情况在海量数据的情况下尤为显著。若将巨量的数据完整地排布到可视化空间中，会发现信息密度远远超过了人的可读范围（图 1.1）。在只需传达给观者大致感知与情绪冲击的场景，这样的方式是适用的，但要解决更具体的问题或获取更深度的洞察时，就变得举步维艰。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mi1QTZ9LC7oAAAAAAAAAAAAAARQnAQ' width='90%' />

> 图 1.1 《人际关系星形图》（ Personal Friendster ） - Jeffrey Heer 2004 <br /> Personal Friendster 是 Vizster 在线社交网络可视化项目的一部分，加利福利亚大学伯克利分校的 Jeffrey 教授采集了自己在社交网络 Friendster 中的三度人际关系数据，通过力导向布局可视化了以自己为中心的 47471 人与 432430 段关系，该图颠覆了人的认知：仅仅三度关系，就能构建出如此庞大的社交网络。这是该项目希望达成的目标，但要在如此庞大的节点与边中去探索具体的人与关系，作为静态图无疑是不可能的。

为了使图能传达具体的信息，而不仅只是模糊的感知，需要将可视化空间中的图元数量限制在人肉眼可识别能力的范围内。并在下一步提供恰当的交互，来使用户渐进式地发现更丰富与多维的信息（图 1.2）。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*scg7QY5DZkEAAAAAAAAAAAAAARQnAQ' width='90%' />

> 图 1.2 GraphStudio - Alibaba Inc. <br /> 通过条件筛选、搜索、双击展开关系等等交互方式探索数据，令用户能够依照自己的分析目标去发现各个颗粒度的数据与关系

交互使被动的"看客"成为主动的"用户"，更好地参与了对数据的理解和分析。可视分析系统的目的往往不仅是向用户传递定制好的知识，而是还能提供一个工具或平台来帮助用户探索数据，得到结论。

## 交互规范

目前在阿里和蚂蚁体系内，G6 广泛应用于金融风控、云安全、知识图谱、企业风控、图数据库等业务，其广泛的应用场景，也决定了其不仅要保证专业性与扩展性，也要保证普适性，无论是新手、中级用户、亦或是专家，都能高效且容易地使用产品。我们提供的交互规范中，通过简单的单击、双击、移动等操作就可以很轻松地对可视化内容进行探索，也支持高级操作，如快捷键等隐性操作，可以让专家用户的工作更加高效，以及可以进行更深维度的探索。

不同的业务场景具有不同的交互，但又有相通的交互部分。G6 依照目前的经验沉淀，将通用的部分作为全局交互以供自由配置，具备业务特性的部分则作为扩展模板以供参照使用。

- 通用交互，剥离了业务属性，是一套适应大部分关系图交互探索的基础工具箱，并将范围圈定在了基础键鼠操作内，令普通电脑用户也能迅速地利用其对数据进行探索
- 扩展交互，不一定适应所有的应用场景与业务属性，但承载了 G6 强大的扩展性与能力，其范围不受限制，既可以是普通的交互行为触发，也能被其他事件触发，亦或由实时的业务数据触发等，用户能通过这些交互对数据进行更深度更定制化的探索。
- 操作对象可以分为画布、节点、Combo、边和其他四部分，所有的交互根据不同的操作对象进行分类。

### 画布 Canvas

#### 通用交互

| **通用交互** | **触发** | **演示** |
| :-- | :-- | --- |
| 缩放画布 | 🖱 鼠标：滚轮向上/向下 <br /> ⌨️ 键盘：「⌘(Ctrl)」+「+/-」 <br /> 💻 触控板：双指展开/合并 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_5oISaHHhcMAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 移动画布 | 🖱 鼠标：拖拽 <br /> 💻 触控板：双指移动 <br /> 🖱 键鼠：Space 键+拖拽（当与框选操作冲突时） | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XqFMQZEHwHEAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 回到概览 | ⌨️ 键盘：「Ctrl/⌘」+「1」 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GmJLSIMnw24AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

#### 扩展交互

| **扩展交互** | **触发** | **演示** |
| --- | --- | --- |
| 鱼眼 | 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FSt4SYyvmZAAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 布局切换 | 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*TzjdTbNDss4AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 时序过滤 | 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sHktSpkzVWkAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 边过滤 | 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BrC_SYkxiK8AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 缩略图 | 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y1NPRZkIFXQAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

### 节点 Node

#### 通用交互

| **通用交互** | **触发** | **演示** |
| :-- | :-- | --- |
| 指向节点 | 🖱 鼠标：悬停 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*49DDTpvSH24AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 选中节点 | 🖱 鼠标：单击 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CiB9SY2GrgYAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 探索节点 | 🖱 鼠标：双击 <br /> ⌨️ 键盘：Enter | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ib3kTpoMtsgAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 取消选中 | 🖱 鼠标：单击空白区域 <br /> ⌨️ 键盘：Esc | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QAD9S6YX3ScAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

#### 扩展交互

| **扩展交互** | **触发** | **演示** |
| --- | --- | --- |
| 多选节点 | ⌨️🖱 键鼠：Shift + 长按移动 <br /> ⌨️🖱 键鼠：Shift + 单击 <br /> 🖱 鼠标：长按移动（当与拖拽画布操作不冲突时） <br /> 🎚 控件：套索 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*R_gRS7We1OsAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*U-3RTZYZGuoAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wRPnQYcQZeIAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 移动节点 | 🖱 鼠标：拖拽 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7vPdS6r6rOsAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 改变节点层级 | 🖱 鼠标：拖拽 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*nZFwQ5ZyRtcAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*nYw8Rab5f9wAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 高亮相邻节点 | 📃 事件：选中节点 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UD-YTJdWc6oAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 高亮最短路径 | 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*c18tRIO5DhAAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

### 边 Edge

#### 通用交互

| **通用交互** | **触发** | **演示** |
| :-- | :-- | --- |
| 指向边 | 🖱 鼠标：悬停 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M_JRSpYs41UAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 选中边 | 🖱 鼠标：单击 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XWf4QY3T1-UAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 取消选中 | 🖱 鼠标：单击空白区域 <br /> 键盘：Esc | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZpPCTIEv_P0AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

#### 扩展交互

| **扩展交互** | **触发** | **演示** |
| :-- | :-- | --- |
| 多选边 | ⌨️🖱 键鼠：Shift + 单击 <br /> ⌨️🖱 键鼠：Shift + 长按移动 <br /> 🖱 鼠标：长按移动（当与拖拽画布操作不冲突时） | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0sbEQ4MwGaEAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

### 组 Combo

#### 通用交互

| **通用交互** | **触发** | **演示** |
| :-- | :-- | --- |
| 指向 Combo | 🖱 鼠标：悬停 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*38e4S7Es9HQAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 选中 Combo | 🖱 鼠标：单击 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XYQNTa7-VP8AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 展开/收起 Combo | 🖱 鼠标：双击 <br /> 键盘：Enter <br /> 🎚 专用控件 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ONVySZjGT0wAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 取消选中 Combo | 🖱 鼠标：单击空白区域 <br /> 键盘：Esc | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EjPSR7zXdwsAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

#### 扩展交互

| **扩展交互** | **触发** | **演示** |
| --- | --- | --- |
| 多选 Combo | ⌨️🖱 键鼠：Shift + 单击 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*283LT65gBx8AAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 移动 Combo | 🖱 鼠标：拖拽 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KJ_1SIVlGQMAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 改变 Combo 层级 | 🖱 鼠标：拖拽 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DpQSQpHc8EUAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

## 快捷操作

由于图可视化信息密度很大，设计者要在短时间内完成某个关系图的配置，或者阅读者需要在短时间内探索出数据关系的症结。这时操作效率就显得尤为重要，G6 现已内置如下常用快捷操作，如果不满足，你还可以定制自己的快捷键盘操作。

| **通用交互** | **触发** | **演示** |
| :-- | :-- | --- |
| 撤销 | ⌨️ 键盘：「Ctrl/⌘」+「z」 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QeZmS69JMAkAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 重做 | ⌨️ 键盘：「Ctrl/⌘」+「Shift」+「z」 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0EEjQaOylVIAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |
| 右键菜单 | 🖱 鼠标：右键单击 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9z8MTqE_xTEAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dhWPSLIBwhgAAAAAAAAAAAAAARQnAQ' width='200'  style='max-height: 200px' /> |

## 交互模式

交互在数据可视化系统中解决的核心问题是**有限的可视化空间与数据过载之间的矛盾**，交互帮助拓展了可视化中信息表达的空间，并给用户提供在空间中探索数据的路径，这条路径如何修筑才能确保探索过程的通畅？通过对经典方法的发掘与在实际业务中的提炼，总结了两类交互模式以供参考：由表及里、以点及面。

### 由表及里

Ben Shneiderman 于 1996 年提出可视化信息检索的箴言 **Overview First, Zoom and Filter, Then Details-on-Demand**，它符合人类寻求信息的基本逻辑：先概览，然后局部，最后聚焦兴趣点进行探索，这是一个由表及里的过程。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xS7mS5I3AxgAAAAAAAAAAAAAARQnAQ' width='90%' />

### 以点及面

得益于搜索等技术的成熟，可视分析系统已经能够快速定位到用户所关注的对象，特别是已经有明确的分析目标时，这类场景就不必要由整体顺着数据结构向下慢慢地探索，而更多的是基于所关注的对象去延伸与发现它周边的关系与详细信息。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XZadQYEyu3UAAAAAAAAAAAAAARQnAQ' width='90%' />
