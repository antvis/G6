---
title: 图元素总览
order: 0
---

图的元素（Item）包含图上的节点 Node 、边 Edge 和 Combo 三大类。每个图元素由一个或多个 [图形（Shape）](/zh/docs/manual/middle/elements/shape/shape-keyshape) 组成，且都会有自己的唯一关键图形（keyShape）。G6 内置了一系列具有不同基本图形样式的节点/边/ Combo，例如，节点可以是圆形、矩形、图片等。G6 中所有内置的元素样式详见 [内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode)，[内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)，[内置 Combo](/zh/docs/manual/middle/elements/combos/defaultCombo)。除了使用内置的节点/边/ Combo 外，G6 还允许用户通过自己搭配和组合 shape 进行节点/边/ Combo 的自定义，详见 [自定义节点](/zh/docs/manual/middle/elements/nodes/custom-node)，[自定义边](/zh/docs/manual/middle/elements/edges/custom-edge)，[自定义 Combo](/zh/docs/manual/middle/elements/combos/custom-combo)。

图元素具有公共的通用属性和通用方法。图元素的属性包括：
- 样式属性，通过 `style` 字段对象进行配置，和元素的关键图形相关，例如 `fill`，`stroke`。可在[元素状态](zh/docs/manual/middle/states/state)改变时被改变。
- 其他属性，例如 `id`、`type`，不能在元素状态改变是进行改变，可通过[graph.updateItem](zh/docs/api/Graph/#updateitemitem-model)进行手动更新。
完整的元素属性列表参考：[元素配置项](/zh/docs/api/nodeEdge/itemProperties)。除了各类元素共有的通用属性外，每种节点/边/ Combo 都有各自的特有属性。

图元素实例上具有对元素进行更新、销毁、获取属性、修改状态等[通用方法](/zh/docs/api/nodeEdge/Item)，同时，对于实例的变更也可以通过调用 [graph](/zh/docs/api/Graph) 上的方法进行。

本章对三大类图元素的通用属性和方法进行了概览性介绍，每种图元素（节点/边/ Combo）各自的属性和使用方法将在后面章节中详述。
