---
title: 自定义元素 G6.registerX
order: 7
---

本文介绍的相关方法是在自定义节点（registerNode）或自定义边（registerEdge）的过程中需要部分实现或复写的方法。

**友情提示：**以下属性和 API 方法，全部用于自定义节点和边时候使用，即作为 `G6.registerNode` / `G6.registerEdge` 的第二个参数中的方法。

本文介绍 G6 的自定义机制，包括自定义节点、自定义边、自定义 combo、自定义交互行为、自定义布局的相关方法。它们都被挂载在 G6 全局上，通过 `G6.registerXXX` 进行调用。

## G6.registerNode(nodeName, options, extendedNodeName)

当内置节点不满足需求时，可以通过 `G6.registerNode(nodeName, options, extendedNodeName)` 方法自定义节点。

### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| nodeName | String | true | 自定义节点名称，需保持唯一性。 |
| options | Object | true | 自定义节点时的配置项，配置项中包括完整的生命周期方法，具体请参考：[Shape Doc](/zh/docs/manual/middle/elements/shape/shape-keyshape) 和 [自定义节点与边 API](/zh/docs/api/registerItem)。 |
| extendNodeName | String | false | 自定义节点时可基于内置节点进行定义，该字段表示内置节点名称，所有内置节点请参考：[内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 教程。 |

### 用法

```javascript
G6.registerNode(
  'nodeName',
  {
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) {},
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    getAnchorPoints(cfg) {},
  },
  'extendedNodeName',
);
```

## G6.registerEdge(edgeName, options, extendedEdgeName)

当内置的边不能满足需求时，可以通过 `registerEdge(edgeName, options, extendedEdgeName)` 方法注册自定义的边。

### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| edgeName | String | true | 自定义边的名称 |
| options | Object | true | 自定义边时的配置项，配置项中包括完整的生命周期方法，具体请参考：[Shape Doc](/zh/docs/manual/middle/elements/shape/shape-keyshape) 和 [自定义节点与边 API](/zh/docs/api/registerItem)。 |
| extendedEdgeName | String | false | 自定义边时可基于内置边进行定义，该字段表示内置边的名称，所有内置边请参考：[内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 教程。 |

### 用法

```javascript
G6.registerEdge(
  'edgeName',
  {
    /**
     * 绘制边，包含文本
     * @param  {Object} cfg 边的配置项
     * @param  {G.Group} group 图形分组，边中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 边的配置项
     * @param  {G.Group} group 图形分组，边中的图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新边，包含文本
     * @override
     * @param  {Object} cfg 边的配置项
     * @param  {Edge} edge 边
     */
    update(cfg, edge) {},
    /**
     * 更新边后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 边的配置项
     * @param  {Edge} edge 边
     */
    afterUpdate(cfg, edge) {},
    /**
     * 设置边的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的边仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Edge} edge 边
     */
    setState(name, value, edge) {},
  },
  'extendedEdgeName',
);
```

## G6.registerCombo(comboName, options, extendedComboName)

当内置 Combo 不满足需求时，可以通过 `G6.registerCombo(comboName, options, extendedComboName)` 方法自定义 Combo。

### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| comboName | String | true | 自定义 combo 的名称，需保持唯一性。 |
| options | Object | true | 自定义 combo 时的配置项，配置项中包括完整的生命周期方法，具体请参考：[Shape Doc](/zh/docs/manual/middle/elements/shape/shape-keyshape) 和 [自定义节点与边 API](/zh/docs/api/registerItem)。 |
| extendedComboName | String | false | 自定义节点时可基于内置 combo 进行定义，该字段表示内置 combo 名称，所有内置 Combo 请参考：[内置 Combo](/zh/docs/manual/middle/elements/combos/defaultCombo) 教程。 |

### 用法

```javascript
G6.registerCombo(
  'comboName',
  {
    /**
     * 绘制 combo，包含文本
     * @param  {Object} cfg combo 的配置项
     * @param  {G.Group} group 图形分组，combo 中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 combo.get('keyShape') 可以获取到
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg combo 的配置项
     * @param  {G.Group} group 图形分组，combo 中的图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新 combo ，combo 文本
     * @override
     * @param  {Object} cfg combo 的配置项
     * @param  {Combo} combo combo item
     */
    update(cfg, combo) {},
    /**
     * 更新 combo 后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg combo 的配置项
     * @param  {Combo} combo combo item
     */
    afterUpdate(cfg, combo) {},
    /**
     * 设置 combo 的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的 combo 仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Combo} combo combo item
     */
    setState(name, value, combo) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg combo 的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    getAnchorPoints(cfg) {},
  },
  'extendedComboName',
);
```

## 用法

下面以注册边为例：

```javascript
import G6 from '@antv/g6';
G6.registerEdge(
  'edgeName',
  {
    labelPosition: 'center',
    labelAutoRotate: true,
    draw(cfg, group) {
      // 定义的其他方法，都可以在draw里面调用， 如 drawShape、drawLabel 等。
      this.drawShape();
      const labelStyle = this.getLabelStyle(cfg);
      // ...
    },
    drawShape(cfg, group) {
      //
    },
    getLabelStyle(cfg) {
      // 根据业务返回 label 的样式
      return {};
    },
    update(cfg, item) {
      // 更新绘制的元素
    },
  },
  'line',
);
```

## 属性

### labelPosition

文本相对于图形的位置，默认值为 `'center'`。

- 当使用 `registerNode` 注册节点时，`labelPosition` 可选值包括：`'top'`、`'bottom'`、`'left'`、`'right'` 和 `'center'`；
- 当使用 `registerEdge` 注册边时，`labelPosition` 可选值包括：`'start'`、`'end'` 和 `'center'`。

### labelAutoRotate

> 只有在 `registerEdge` 时生效。

文本是否跟着线自动旋转，默认值为 `false`。

**提示：edge 特有。**

## 绘制函数

绘制部分四个 API 的参数完全相同，参数说明部分参考 `draw()` 方法。

### draw(cfg, group)

绘制节点和边，包括节点和边上的文本，返回图形的 `keyShape`。

**参数**

| 名称  | 类型    | 是否必选 | 描述             |
| ----- | ------- | -------- | ---------------- |
| cfg   | Object  | true     | 节点或边的配置项 |
| group | G.Group | true     | 节点或边的容器   |

### afterDraw(cfg, group)

绘制完成以后的操作，用户可继承现有的节点或边，在 `afterDraw()` 方法中扩展图形或添加动画。可参考在 afterDraw 中添加动画的 [demo](/zh/examples/scatter/edge)。图形动画 API 详见 G6 的渲染引擎 [G 的动画相关 API](https://g.antv.vision/zh/docs/api/general/element/#%E5%8A%A8%E7%94%BB%E6%96%B9%E6%B3%95)。

## 更新函数

### update(cfg, item)

更新节点或边，包括节点或边上的文本。

**参数**

| 名称 | 类型    | 是否必选 | 描述             |
| ---- | ------- | -------- | ---------------- |
| cfg  | Object  | true     | 节点或边的配置项 |
| item | G6.Item | true     | 节点或边的实例   |

### afterUpdate(cfg, item)

更新完以后的操作，如扩展图形或添加动画。可参考添加动画的 [demo](/zh/examples/scatter/edge)。图形动画 API 详见 G6 的渲染引擎 [G 的动画相关 API](https://g.antv.vision/zh/docs/api/general/element/#%E5%8A%A8%E7%94%BB%E6%96%B9%E6%B3%95)。

### shouldUpdate(type)

是否允许更新。

**参数**

| 名称 | 类型   | 是否必选 | 描述                           |
| ---- | ------ | -------- | ------------------------------ |
| type | String | true     | 元素类型，`'node'` 或 `'edge'` |

**返回值**

- 返回值类型：Boolean；
- 返回 `true`，则允许更新，否则不允许更新。

### setState(name, value, item)

用于响应外部对元素状态的改变。当外部调用 [`graph.setItemState(item, state, value)`](/zh/docs/api/graphFunc/state#graphsetitemstateitem-state-value) 时，该函数作出相关响应。主要是交互状态，业务状态请在 `draw()` 方法中实现。单图形的节点仅考虑 `'selected'` 、`'active'` 状态，有其他状态需求的用户可以复写该方法。

**参数**

| 名称  | 类型    | 是否必选 | 描述                                       |
| ----- | ------- | -------- | ------------------------------------------ |
| name  | String  | true     | 状态名称                                   |
| value | Boolean | true     | 状态是否可用，为 `true` 时可用，否则不可用 |
| item  | G6.Item | true     | 节点或边的实例                             |
