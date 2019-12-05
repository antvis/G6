---
title: Shape
order: 7
---

本文介绍的 Shape 相关方法是在自定义节点（registerNode）或自定义边（registerEdge）的过程中需要部分实现或复写的方法。

**友情提示：**以下属性和 API 方法，全部用于自定义节点和边时候使用，即作为 `G6.registerNode` / `G6.registerEdge` 的第二个参数中的方法。

## 用法
下面以注册边为例：
```javascript
import G6 from '@antv/g6'
G6.registerEdge('edgeName', {
  labelPosition: 'center',
  labelAutoRotate: true,
  draw(cfg, group) {
    // 定义的其他方法，都可以在draw里面调用， 如 drawShape、drawLabel 等。
    this.drawShape()
    const labelStyle = this.getLabelStyle(cfg)
    // ...
  },
  drawShape(cfg, group) {
    // 
  },
  getLabelStyle(cfg) {
    // 根据业务返回 label 的样式
    return {}
  },
  update(cfg, item) {
    // 更新绘制的元素

  }
}, 'line')
```

## 属性

### labelPosition
文本相对于图形的位置，默认值为 `'center'`。

- 当使用 `registerNode` 注册节点时，`labelPosition` 可选值包括：`'top'`、`'bottom'`、`'left'`、`'right'` 和 `'center'`；
- 当使用 `registerEdge` 注册边时，`labelPosition` 可选值包括：`'start'`、`'end'` 和 `'center'`。

### labelAutoRotate
> 只有在 `registerEdge` 时有用。

文本是否跟着线自动旋转，默认值为 `false`。

**提示：edge 特有。**

## 绘制函数
绘制部分四个 API 的参数完全相同，参数说明部分参考 `draw()` 方法。

### draw(cfg, group)
绘制节点和边，包括节点和边上的文本，返回图形的 `keyShape`。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | Object | true | 节点或边的配置项 |
| group | G.Group | true | 节点或边的容器 |

### afterDraw(cfg, group)
绘制完成以后的操作，用户可继承现有的节点或边，在 `afterDraw()` 方法中扩展图形或添加动画。

## 更新函数

### update(cfg, item)
更新节点或边，包括节点或边上的文本。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | Object | true | 节点或边的配置项 |
| item | G6.Item | true | 节点或边的实例 |

### afterUpdate(cfg, item)
更新完以后的操作，如扩展图形或添加动画。

### shouldUpdate(type)
是否允许更新。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | String | true | 元素类型，`'node'` 或 `'edge'` |

**返回值**

- 返回值类型：Boolean；
- 返回 `true`，则允许更新，否则不允许更新。

### setState(name, value, item)
用于响应外部对元素状态的改变。当外部调用 [`graph.setItemState(item, state, value)`](/zh/docs/api/Graph/#setitemstateitem-state-enabled) 时，该函数作出相关响应。主要是交互状态，业务状态请在 `draw()` 方法中实现。单图形的节点仅考虑 `'selected'` 、`'active'` 状态，有其他状态需求的用户可以复写该方法。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| name | String | true | 状态名称 |
| value | Boolean | true | 状态是否可用，为 `true` 时可用，否则不可用 |
| item | G6.Item | true | 节点或边的实例 |
