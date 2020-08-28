---
title: 树图布局 Layout
order: 1
---

## 简介

图布局是指图中节点的排布方式，根据图的数据结构不同，布局可以分为两类：一般图布局、树图布局。G6 为这两类图都内置了一些常用的图布局算法。使用内置的图布局可以完成[布局的参数、方法、数据的切换](#布局的切换机制)等。G6 还提供了一般图布局的 [Web-Worker 机制](#使用-web-worker)，在大规模图布局中使用该机制可以使布局计算不阻塞页面。

除了内置布局方法外，一般图布局还支持 [自定义布局](/zh/docs/manual/advanced/custom-layout) 机制。

事实上，G6 的布局是自由的，内置布局算法仅仅是操作了数据中节点的 `x` 和 `y` 值。因此，除了使用内置布局以及自定义的一般图布局外，用户还可以使用外部图布局算法，计算节点位置后赋值到数据中节点的 `x` 和 `y` 字段上，G6 便可以根据该位置信息进行绘制。

由于树图特殊性，G6 扩展出了  TreeGraph ，详细文档请见：[TreeGraph](/zh/docs/api/layout/TreeGraph) API。树布局是一种能很好展示有一定层次结构数据的布局方式。推荐使用 G6.TreeGraph 实现。本文将逐一介绍内置的树图布局算法，及其使用方式。

## 树图 TreeGraph 布局方法总览

- [CompactBox Layout](#compactbox)：紧凑树布局；
- [Dendrogram Layout](#dendrogram)：树状布局（叶子节点布局对齐到同一层）；
- [Intended Layout](#intended)：缩进布局；
- [Mindmap Layout](#mindmap)：脑图布局。

## 配置树图布局

与一般图 Graph 配置方法相似，通过实例化图时配置 `layout` 属性设置树的布局，还可以通过 `modes` 属性为树配置 [展开/收缩行为](/zh/docs/manual/middle/states/defaultBehavior/#collapse-expand)。以下代码声明了一个实例，定义了布局为从左到右结构的基础树图，并且定义了展开收缩行为。

```javascript
const graph = new G6.TreeGraph({
  container: 'mountNode',
  modes: {
    default: [
      {
        // 定义展开/收缩行为
        type: 'collapse-expand',
      },
      'drag-canvas',
    ],
  },
  // 定义布局
  layout: {
    type: 'dendrogram', // 布局类型
    direction: 'LR', // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
    nodeSep: 50, // 节点之间间距
    rankSep: 100, // 每个层级之间的间距
  },
});
```


## 树图布局方法

### compactBox

**描述**：紧凑树布局。从根节点开始，同一深度的节点在同一层，并且布局时会将节点大小考虑进去。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FltbQZAa-nMAAAAAAAAAAABkARQnAQ' width=400 alt='img'/><br />**API**：[CompactBox API](/zh/docs/api/layout/TreeGraph/#compactbox-紧凑树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上，往下布局<br />- BT —— 根节点在下，往上布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SuygR5RZRH0AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iJPBTJkTqssAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />（左）TB。（右）BT。<br />- LR —— 根节点在左，往右布局<br />- RL —— 根节点在右，往左布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YrtaQIKLC4IAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>             <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3fJsTYzHRHcAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> <br />（左）LR。（右）RL。<br />- H —— 根节点在中间，水平对称布局<br />- V —— 根节点在中间，垂直对称布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*812BT4Ep15MAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>          <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GXdZSIBOllsAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />> （左）H。（右）V。 |
| getId | Function | (d) => {<br />  // d 是一个节点<br />  return d.id + 'node';<br />} | undefined | 节点 id 的回调函数 |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d 是一个节点<br />  return 100;<br />} | undefined | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />// d 是一个节点<br />  return 50;<br />} | undefined | 节点横向间距的回调函数 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0plfTrg12FkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

### dendrogram

**描述**：生态树布局。不管数据的深度多少，总是叶节点对齐。不考虑节点大小，布局时将节点视为 1 个像素点。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XehWSKAWdrwAAAAAAAAAAABkARQnAQ' width=300 alt='img'/><br />**API**：[Dendrogram API](/zh/docs/api/layout/TreeGraph/#dendrogram-生态树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'TB' / 'BT' / 'LR' / 'RL' / 'H' / 'V' | 'LR' | layout 的方向。<br />- TB —— 根节点在上，往下布局<br />- BT —— 根节点在下，往上布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CN4JRZ-ws8EAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r0c_ToY56xkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />> （左）TB。（右）BT。<br />- LR —— 根节点在左，往右布局<br />- RL —— 根节点在右，往左布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fvNVS73Mk40AAAAAAAAAAABkARQnAQ' width=70 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZfGGSoyO6UoAAAAAAAAAAABkARQnAQ' width=70 alt='img'/><br />> （左）LR。（右）RL。<br />- H —— 根节点在中间，水平对称布局<br />- V —— 根节点在中间，垂直对称布局<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lVDyTKOI8o4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N_MmT7ZT1PIAAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />> （左）H。（右）V。 |
| nodeSep | Number | 50 | 0 | 节点间距 |
| rankSep | Number | 100 | 0 | 层与层之间的间距 |
| radial | Boolean | true | false | 是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2WUNTb6kp3MAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

### indented

**描述**：缩进树布局。每个元素会占一行/一列。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zuBlR4oBIE0AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

**API**：[Indented API](/zh/docs/api/layout/TreeGraph/#indented-缩进树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'LR' / 'RL' / 'H' | 'LR' | layout 的方向。<br />'LR' —— 根节点在左，往右布局（下图左）<br />'RL' —— 根节点在右，往左布局（下图中）<br />'H' —— 根节点在中间，水平对称布局（下图右）<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Hn9wT6j1tEMAAAAAAAAAAABkARQnAQ' alt='indented1' width='80' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dXx3QrjSsgsAAAAAAAAAAABkARQnAQ' alt='indented2' width='60' /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ULkFQqi04moAAAAAAAAAAABkARQnAQ' alt='indented3' width='120' /> |
| indent | Number | 80 | 20 | 列间间距 |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getSide | Function | (d) => {<br />  // d 是一个节点<br />  return 'left';<br />} | undefined | 节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点 |

### mindmap

**描述**：脑图布局。深度相同的节点将会被放置在同一层，与 compactBox 不同的是，布局不会考虑节点的大小。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sRi6Q6Qrm-oAAAAAAAAAAABkARQnAQ' width=400 alt='img'/><br />**API**：[Mindmap API](/zh/docs/api/layout/TreeGraph/#mindmap-脑图树布局)<br />**参数**：

| 参数名 | 类型 | 示例/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction | String | 'H' / 'V' | 'H' | layout 的方向。<br />- H：horizontal（水平）—— 根节点的子节点分成两部分横向放置在根节点左右两侧<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EXdUT4xCVV4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/><br />- V：vertical （竖直）—— 将根节点的所有孩子纵向排列<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yOpETr8s_-kAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |
| getHeight | Function | (d) => {<br />  // d 是一个节点<br />  return 10;<br />} | undefined | 节点高度的回调函数 |
| getWidth | Function | (d) => {<br />  // d 是一个节点<br />  return 20;<br />} | undefined | 节点宽度的回调函数 |
| getVGap | Function | (d) => {<br />  // d 是一个节点<br />  return 100;<br />} | 18 | 节点纵向间距的回调函数 |
| getHGap | Function | (d) => {<br />  // d 是一个节点<br />  return 50;<br />} | 18 | 节点横向间距的回调函数 |
| getSide | String | Function | (d) => {<br />  // d 是一个节点<br />  return 'left';<br />} / 'right' | 节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧 |
