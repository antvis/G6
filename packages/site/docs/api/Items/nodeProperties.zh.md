---
title: 节点配置项
order: 6
---

节点继承自元素类。除了[元素通用属性](/zh/docs/api/Items/itemProperties.zh.md)外，每种节点拥有一些特有的属性。

## 内置节点的通用属性

### id

<description> _String_ **required** </description>

节点唯一 ID，**必须**是唯一的 string。

### x

<description> _Number_ **optional** </description>

x 坐标。

### y

<description> _Number_ **optional** </description>

y 坐标。

### type

<description> _String_ **optional** _default:_: `'circle'`</description>

指定节点类型，内置节点类型名称或自定义节点的名称。默认为 `'circle'`。

### size

<description> _Number | Array_ **optional** _default:_: `20`</description>

节点的大小。

### anchorPoints

<description> _Array_ **optional** </description>

指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: `[0, 0]`，代表节点左上角的锚点，`[1, 1]`,代表节点右下角的锚点。

### style

<description> _Object_ **optional** </description>

通过 `style` 配置来修改节点关键图形的填充色、边框颜色、阴影等属性，具体配置属性见：[图形样式属性](/zh/docs/api/shapeProperties.zh.md)。

### label

<description> _String_ **optional** </description>

文本文字。

### labelCfg

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| position | false | String | 文本相对于节点的位置，目前支持的位置有：`'center'`，`'top'`，`'left'`，`'right'`，`'bottom'`。默认为 `'center'`。modelRect 节点不支持该属性 |
| offset | false | Number | 文本的偏移，`position` 为 `'bottom'` 时，文本的上方偏移量；`position` 为 `'left'` 时，文本的右方偏移量；以此类推在其他 `position` 时的情况。modelRect 节点的 `offset` 为左边距 |
| style | false | Object | 标签的样式属性，具体配置项参见统一整理在 [图形样式属性 - Text 图形](/zh/docs/api/shapeProperties/#文本-text) |

## 内置节点的特有属性

各个内置节点的特有属性见 [内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 目录下各文档。
