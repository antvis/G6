---
title: Combo 配置项
order: 8
---

### id

<description> _String_ **required** </description>

一个 Combo 的唯一标识，**必须是 string 类型，必须唯一**。

### parentId

<description> _String_ **optional** </description>

该 Combo 的父 Combo 的 ID。

### size

<description> _String_ **optional** </description>

Combo 的最小大小，默认 'circle' 类型 Combo 的 size 为 20，'rect' 类型的为 [20, 5]。

### padding

<description> _Number | Number[]_ **optional** </description>

该 Combo 内边距。

### style

<description> _Object_ **optional** </description>

该 Combo 的样式配置项，详见[内置 Combo 配置文档](/zh/docs/manual/middle/elements/combos/defaultCombo#样式属性-style)。

### label

<description> _String_ **optional** </description>

该 Combo 的文本标签。

### labelCfg

<description> _Object_ **optional** </description>

该 Combo 的文本标签样式配置项，详见[内置 Combo 配置文档](/zh/docs/manual/middle/elements/combos/defaultCombo#标签文本-label-及其配置-labelcfg)及各类型 Combo 的文档。

### type

<description> _Object_ **optional** </description>

指定该 Combo 的类型，可以是内置 Combo 的类型名，也可以是自定义 Combo 的类型名。默认是 'circle'。

| 名称 | 描述 | 默认示例 |
| --- | --- | --- |
| circle | 圆形：<br />- `size` 是单个数字，表示直径<br />- 圆心位置对应 Combo 的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在 Combo 正上方<br />- 更多字段见 [Circle](/zh/docs/manual/middle/elements/combos/built-in/circle) Combo 教程<br />- <a href='/zh/examples/item/defaultCombos#circle' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ijeuQoiH0JUAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |
| rect | 矩形：<br />- `size` 是数组，例如：[100, 50]<br />- 矩形的中心位置是 COmbo 的位置，而不是左上角<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在 Combo 左上角<br />- 更多字段见 [Rect](/zh/docs/manual/middle/elements/combos/built-in/rect) Combo 教程<br />- <a href='/zh/examples/item/defaultCombos#rect' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Khp4QpxXVlQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

## 内置 Combo 的特有属性

内置各个内置 Combo 的特有属性见 [内置 Combo](/zh/docs/manual/middle/elements/combos/defaultCombo) 目录下各文档。
