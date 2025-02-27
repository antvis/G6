---
title: Donut 甜甜圈
---

> 阅读本节前，请先阅读 [API - 节点配置项](/api/elements/nodes/base-node) 章节。

<embed src="@/common/api/elements/nodes/donut.md"></embed>

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

## donutPalette

> _string \|_ _string[]_ **Default:** `'tableau'`

颜色或者色板名

## donuts

> _number[] \|_ _DonutRound_<!-- -->_[]_

圆环数据

## innerR

> _string \| number_ **Default:** `'50%'`

内环半径，使用百分比或者像素值

## donut{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

<details><summary>形如 icon{TextStyleProps} 的表达式表示在 TextStyleProps 属性名前以小驼峰形式加上 icon 前缀</summary>

TextStyleProps 包含以下属性：

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} 表示你需要使用以下属性名：

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>
