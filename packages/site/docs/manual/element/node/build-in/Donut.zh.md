---
title: Donut 甜甜圈
---

## 概述

甜甜圈节点是一个环形几何形状，由内外两个同心圆组成。

适用场景：

- 用于表示比例数据，如完成进度、占比分析。

- 适合表示多层数据，如嵌套的环形图。

- 常用于数据可视化、仪表盘、进度图等。

## 在线体验

<embed src="@/common/api/elements/nodes/donut.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

| 属性                | 描述                           | 类型                                        | 默认值    | 必选 |
| ------------------- | ------------------------------ | ------------------------------------------- | --------- | ---- |
| donutFill           | 填充色                         | string                                      | `#1783FF` |      |
| donutFillOpacity    | 填充色透明度                   | number \| string                            | 1         |      |
| donutLineCap        | 描边端点样式                   | `round` \| `square` \| `butt`               | `butt`    |      |
| donutLineDash       | 描边虚线样式                   | number[]                                    | -         |      |
| donutLineDashOffset | 描边虚线偏移量                 | number                                      | -         |      |
| donutLineJoin       | 描边连接处样式                 | `round` \| `bevel` \| `miter`               | `miter`   |      |
| donutLineWidth      | 描边宽度                       | number                                      | 1         |      |
| donutOpacity        | 透明度                         | number \| string                            | 1         |      |
| donutPalette        | 颜色或者色板名                 | string &#124; string[]                      | `tableau` |      |
| donuts              | 圆环数据                       | number[] &#124; [DonutRound](#donutround)[] | -         |      |
| donutShadowBlur     | 阴影模糊度                     | number                                      | -         |      |
| donutShadowColor    | 阴影颜色                       | string                                      | -         |      |
| donutShadowOffsetX  | 阴影在 x 轴方向上的偏移量      | number \| string                            | -         |      |
| donutShadowOffsetY  | 阴影在 y 轴方向上的偏移量      | number \| string                            | -         |      |
| donutShadowType     | 阴影类型                       | `inner` \| `outer`                          | `outer`   |      |
| donutStroke         | 描边色                         | string                                      | `#000`    |      |
| donutStrokeOpacity  | 描边色透明度                   | number \| string                            | 1         |      |
| donutVisibility     | 图形是否可见                   | `visible` \| `hidden`                       | `visible` |      |
| innerR              | 内环半径，使用百分比或者像素值 | string &#124; number                        | 50%       |      |

### DonutRound

| 属性           | 描述                      | 类型                          | 默认值    | 必选 |
| -------------- | ------------------------- | ----------------------------- | --------- | ---- |
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
| value          | 数值，用于计算比例        | number                        | -         | ✓    |
| visibility     | 图形是否可见              | `visible` \| `hidden`         | `visible` |      |

## 示例

### 内置甜甜圈节点效果

<Playground path="element/node/demo/donut.js" rid="default-donut-node"></Playground>
