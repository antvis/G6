---
title: Donut
---

> Before reading this section, please first read the [API - Node Configuration chapter](/api/elements/nodes/base-node).

<embed src="@/common/api/elements/nodes/donut.md"></embed>

> If the element has its specific properties, we will list them below. For all generic style attributes, see[BaseNode](./BaseNode.en.md)

## style.donutPalette

> _string \|_ _string[]_ **Default:** `'tableau'`

Color or palette.

## style.donuts

> _number[] \|_ _DonutRound\_\_[]_

Donut data.

## style.innerR

> _string \| number_ **Default:** `'50%'`

Inner ring radius, using percentage or pixel value.

## style.donut{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>
