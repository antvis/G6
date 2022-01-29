---
title: 边配置项
order: 7
---

## 边通用属性

### id

<description> _String_ **required** </description>

边唯一 ID，**必须**是唯一的 string。

### source

<description> _String | Number_ **optional** </description>

起始点 id 。

### target

<description> _String | Number_ **optional** </description>

结束点 id 。

### type

<description> _String_ **optional** _default:_ `'line'`</description>

指定边的类型，可以是内置边的类型名称，也可以是自定义边的名称。默认为 `'line'`。

### sourceAnchor

<description> _Number_ **optional** </description>

边的起始节点上的锚点的索引值。

### targetAnchor

<description> _Number_ **optional** </description>

边的终止节点上的锚点的索引值。

### style

<description> _Object_ **optional** </description>

通过 `style` 配置来修改边的填充色、边框颜色、阴影等属性，具体配置属性见：[图形样式属性](/zh/docs/api/shapeProperties)。

### label

<description> _String_ **optional** </description>

文本文字，如果没有则不会显示。

### labelCfg

`label` String 类型。标签文本的文字内容。<br />`labelCfg` Object 类型。配置标签文本。下面是 `labelCfg` 对象中的常用配置项：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| refX | false | Number | 标签在 x 方向的偏移量 |
| refY | false | Number | 标签在 y 方向的偏移量 |
| position | false | String | 文本相对于边的位置，目前支持的位置有：`'start'`，`'middle'`，`'end'`。默认为`'middle'`。 |
| autoRotate | false | Boolean | 标签文字是否跟随边旋转，默认 `false` |
| style | false | Object | 标签的样式属性，具体配置项参见统一整理在 [图形样式属性 - Text 图形](/zh/docs/api/shapeProperties/#文本-text) |

## 内置边的特有属性

各个内置节点的特有属性见 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 目录下各文档。
