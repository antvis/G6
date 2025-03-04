---
title: GridLine 网格线
---

网格线插件，多用于辅助绘图

<embed src="@/common/api/plugins/grid-line.md"></embed>

**参考示例**：

- [网格线](/examples/plugin/grid-line/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`grid-line` \| string_

此插件已内置，你可以通过 `type: 'grid-line'` 来使用它。

### border

> _boolean_ **Default:** `true`

是否显示边框

### borderLineWidth

> _number_ **Default:** `1`

边框线宽

### borderStroke

> _string_ **Default:** `'#0001'`

边框颜色

完整属性定义参考 [CSS border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)

### borderStyle

> _string_ **Default:** `'solid'`

边框样式

完整属性定义参考 [CSS border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)

### follow

> _boolean_ **Default:** `false`

是否跟随图移动

### lineWidth

> _number \| string_ **Default:** `1`

网格线宽

### size

> _number_ **Default:** `20`

单个网格的大小

### stroke

> _string_ **Default:** `'#0001'`

网格线颜色

## API
