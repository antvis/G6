---
title: 图形分组 Group
order: 2
---

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️ 注意:</strong></span> <br /> 图形分组 Group 与 [节点分组 Combo](/zh/docs/manual/middle/discard/nodeGroup) 属于不同层次的概念。

- 图形分组针对 [图形 Shape](/zh/docs/manual/middle/elements/shape/shape-keyshape) 层次的分组；
- [节点分组 Combo](/zh/docs/manual/middle/discard/nodeGroup)  是针对 [节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 的分组，与数据结构中的层次、分组对应。

<br />

## 什么是图形分组 Group

图形分组 group 类似于 <a href='https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g' target='_blank'>SVG 中的 `<g>` 标签</a>：元素  `g`  是用来组合图形对象的容器。在 group  上添加变换（例如剪裁、旋转、放缩、平移等）会应用到其所有的子元素上。在 group  上添加属性（例如颜色、位置等）会被其所有的子元素继承。此外， group 可以多层嵌套使用，因此可以用来定义复杂的对象。

在 G6 中，Graph 的一个实例中的所有节点属于同一个变量名为 `nodeGroup` 的 group，所有的边属于同一个变量名为 `edgeGroup` 的 group。节点 group 在视觉上的层级（zIndex）高于边 group，即所有节点会绘制在所有边的上层。<br />如下图（左）三个节点属于  `nodeGroup` ，两条边属于 `edgeGroup` ， `nodeGroup`  层级高于 `edgeGroup` ，三个节点绘制在两条边的上层。下图（右）是（左）图的节点降低透明度后的效果，可以更清晰看到边绘制在节点下方。<br />

![image.png](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oqKUSoRWMrcAAAAAAAAAAABkARQnAQ)![image.png](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cudnTqD-g_4AAAAAAAAAAABkARQnAQ)

> （左）节点和边的图形分组 Group 演示。（右）给左图的节点降低了透明度。

## 何时使用图形分组 Group

[自定义节点](/zh/docs/manual/middle/elements/nodes/custom-node)、[自定义边](/zh/docs/manual/middle/elements/edges/custom-edge)时将会涉及到图形分组 Group 的概念。图形分组 Group 方便了用户对节点或边上元素的组合和管理。<br />例如，如下图中的节点 A 有一个包含节点 A 中所有图形的 group，该 group 中包含了一个 circle 图形和一个文本图形。节点 B 是一个自定义节点，有一个包含节点 B 中所有图形的 group，该 group 包含了 circle 图形、rect 图形、文本图形。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GnVoSIGkXhsAAAAAAAAAAABkARQnAQ' alt='img' width='100'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iQXZTZCX9LEAAAAAAAAAAABkARQnAQ' alt='img' width='100'/>

<br />

## 如何使用图形分组 Group

图形分组一般会在[自定义节点](/zh/docs/manual/middle/elements/nodes/custom-node)、[自定义边](/zh/docs/manual/middle/elements/edges/custom-edge)时用到。Group 的完整实例方法请参考 [Graphics Group API](/zh/docs/api/Group)。

### 获取元素的 group

```javascript
// 获取元素(节点/边/Combo)的图形对象的容器
const group = item.getContainer();

// 等价于
const group = item.get('group');
```

### 实例方法

- addGroup(cfgs)

向分组中添加新的分组。

```javascript
const subGroup = group.addGroup({
  id: 'rect',
});
```

- addShape(type, cfgs)

向分组中添加新的图形。

```javascript
const keyShape = group.addShape('rect', {
  attrs: {
    stroke: 'red',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'rect-shape',
});
```

提示：在分组上添加的 `clip`， `transform` 等会影响到该分组中的所有元素（子分组或图形）。
