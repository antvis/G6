---
title: Shape
order: 7
---

Shape API都是在自定义节点（registerNode）或自定义边（registerEdge）的过程中需要部分实现或复写的方法。

**友情提示：**以下属性和API方法，全部用于自定义节点和边时候使用，即作为`G6.registerNode` / `G6.registerEdge`的第二个参数中的方法使用。

## 用法
```
import G6 from '@antv/g6'
G6.registerNode('nodeName', {
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
}, 'circle')
```

## 属性

### itemType
元素类型，目前支持node、edge，后续可能会支持group。

### labelPosition
文本相对于图形的位置，默认值为center。

- 当itemType为node时，labelPosition值包括：top、bottom、left、right和center；
- 当itemType为edge时，labelPos值包括start、end和center。

### labelAutoRotate
> 只有在 registerEdge 时有用。

文本是否跟着线自动旋转，默认值为false。

**提示：edge特有。**

## 绘制
绘制部分四个API的参数完全相同，参数说明部分参考draw()方法。

### draw(cfg, group)
绘制节点和边，包括节点和边上的文本，返回图形的keyShape。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | object | true | 节点或边的配置项 |
| group | G.Group | true | 节点或边的容器 |

### afterDraw(cfg, group)
绘制完成以后的操作，用户可继承现有的节点或边，在afterDraw()方法中扩展图形或添加动画。

## 更新

### update(cfg, item)
更新节点或边，包括节点或边上的文本。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | object | true | 节点或边的配置项 |
| item | G6.Item | true | 节点或边的实例 |

### afterUpdate(cfg, item)
更新完以后的操作，如扩展图形或添加动画。

### shouldUpdate(type)
是否允许更新。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | string | true | 元素类型，node或edge |

**返回值**

- 返回值类型：boolean；
- 返回true，则允许更新，否则不允许更新。

### setState(name, value, item)
设置元素的状态，主要是交互状态，业务状态请在draw()方法中实现。单图形的节点仅考虑selected、active状态，有其他状态需求的用户可以复写该方法。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| name | string | true | 状态名称 |
| value | boolean | true | 状态是否可用，为true时可用，否则不可用 |
| item | G6.Item | true | 节点或边的实例 |
