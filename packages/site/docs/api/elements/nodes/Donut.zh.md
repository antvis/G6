---
title: Donut 甜甜圈
---

> 阅读本节前，请先阅读 [API - 节点配置项](/api/elements/nodes/base-node) 章节。

<embed src="@/common/api/elements/nodes/donut.md"></embed>

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

## style.donutPalette

> _string \|_ _string[]_ **Default:** `'tableau'`

颜色或者色板名

## style.donuts

> _number[] \|_ _[DonutRound](#donutround)_<!-- -->_[]_

圆环数据

#### DonutRound

| 属性           | 描述                      | 类型                          | 默认值    | 必选 |
| -------------- | ------------------------- | ----------------------------- | --------- | ---- |
| value          | 数值，用于计算比例        | number                        | -         | ✓    |
| color          | 颜色                      | string                        | -         |      |
| fill           | 填充色                    | string                        | `#1783FF` |      |
| fillOpacity    | 填充色透明度              | number \| string              | 1         |      |
| lineCap        | 描边端点样式              | `round` \| `square` \| `butt` | `butt`    |      |
| lineDash       | 描边虚线样式              | number[]                      | -         |      |
| lineDashOffset | 描边虚线偏移量            | number                        | -         |      |
| lineJoin       | 描边连接处样式            | `round` \| `bevel` \| `miter` | `miter`   |      |
| lineWidth      | 描边宽度                  | number                        | 1         |      |
| opacity        | 透明度                    | number \| string              | 1         |      |
| shadowBlur     | 阴影模糊度                | number                        | -         |      |
| shadowColor    | 阴影颜色                  | string                        | -         |      |
| shadowOffsetX  | 阴影在 x 轴方向上的偏移量 | number \| string              | -         |      |
| shadowOffsetY  | 阴影在 y 轴方向上的偏移量 | number \| string              | -         |      |
| shadowType     | 阴影类型                  | `inner` \| `outer`            | `outer`   |      |
| stroke         | 描边色                    | string                        | `#000`    |      |
| strokeOpacity  | 描边色透明度              | number \| string              | 1         |      |
| visibility     | 图形是否可见              | `visible` \| `hidden`         | `visible` |      |

## style.innerR

> _string \| number_ **Default:** `'50%'`

内环半径，使用百分比或者像素值

## style.donut{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

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

| 属性                | 描述                      | 类型                          | 默认值    | 必选 |
| ------------------- | ------------------------- | ----------------------------- | --------- | ---- |
| donutFill           | 填充色                    | string                        | `#1783FF` |      |
| donutFillOpacity    | 填充色透明度              | number \| string              | 1         |      |
| donutLineCap        | 描边端点样式              | `round` \| `square` \| `butt` | `butt`    |      |
| donutLineDash       | 描边虚线样式              | number[]                      | -         |      |
| donutLineDashOffset | 描边虚线偏移量            | number                        | -         |      |
| donutLineJoin       | 描边连接处样式            | `round` \| `bevel` \| `miter` | `miter`   |      |
| donutLineWidth      | 描边宽度                  | number                        | 1         |      |
| donutOpacity        | 透明度                    | number \| string              | 1         |      |
| donutShadowBlur     | 阴影模糊度                | number                        | -         |      |
| donutShadowColor    | 阴影颜色                  | string                        | -         |      |
| donutShadowOffsetX  | 阴影在 x 轴方向上的偏移量 | number \| string              | -         |      |
| donutShadowOffsetY  | 阴影在 y 轴方向上的偏移量 | number \| string              | -         |      |
| donutShadowType     | 阴影类型                  | `inner` \| `outer`            | `outer`   |      |
| donutStroke         | 描边色                    | string                        | `#000`    |      |
| donutStrokeOpacity  | 描边色透明度              | number \| string              | 1         |      |
| donutVisibility     | 图形是否可见              | `visible` \| `hidden`         | `visible` |      |
