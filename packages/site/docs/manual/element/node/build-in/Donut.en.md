---
title: Donut
---

## Overview

The donut node is a ring-shaped geometric figure composed of two concentric circles.

Applicable scenarios:

- Used to represent proportional data, such as completion progress and ratio analysis.

- Suitable for representing multi-layered data, such as nested ring charts.

- Commonly used in data visualization, dashboards, progress charts, etc.

## Online Experience

<embed src="@/common/api/elements/nodes/donut.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseNode](/en/manual/element/node/build-in/base-node)

| Attribute           | Description                         | Type                                    | Default   | Required |
| ------------------- | ----------------------------------- | --------------------------------------- | --------- | -------- |
| donutFill           | Fill color                          | string                                  | `#1783FF` |          |
| donutFillOpacity    | Fill color opacity                  | number \| string                        | 1         |          |
| donutLineCap        | Stroke end style                    | `round` \| `square` \| `butt`           | `butt`    |          |
| donutLineDash       | Stroke dash style                   | number[]                                | -         |          |
| donutLineDashOffset | Stroke dash offset                  | number                                  | -         |          |
| donutLineJoin       | Stroke join style                   | `round` \| `bevel` \| `miter`           | `miter`   |          |
| donutLineWidth      | Stroke width                        | number                                  | 1         |          |
| donutOpacity        | Opacity                             | number \| string                        | 1         |          |
| donutPalette        | Color or palette name               | string \| string[]                      | `tableau` |          |
| donuts              | Donut data                          | number[] \| [DonutRound](#donutround)[] | -         |          |
| donutShadowBlur     | Shadow blur                         | number                                  | -         |          |
| donutShadowColor    | Shadow color                        | string                                  | -         |          |
| donutShadowOffsetX  | Shadow offset in x-axis direction   | number \| string                        | -         |          |
| donutShadowOffsetY  | Shadow offset in y-axis direction   | number \| string                        | -         |          |
| donutShadowType     | Shadow type                         | `inner` \| `outer`                      | `outer`   |          |
| donutStroke         | Stroke color                        | string                                  | `#000`    |          |
| donutStrokeOpacity  | Stroke color opacity                | number \| string                        | 1         |          |
| donutVisibility     | Visibility of the shape             | `visible` \| `hidden`                   | `visible` |          |
| innerR              | Inner ring radius, percentage or px | string \| number                        | 50%       |          |

### DonutRound

| Attribute      | Description                       | Type                          | Default   | Required |
| -------------- | --------------------------------- | ----------------------------- | --------- | -------- |
| color          | Color                             | string                        | -         |          |
| fill           | Fill color                        | string                        | `#1783FF` |          |
| fillOpacity    | Fill color opacity                | number \| string              | 1         |          |
| lineCap        | Stroke end style                  | `round` \| `square` \| `butt` | `butt`    |          |
| lineDash       | Stroke dash style                 | number[]                      | -         |          |
| lineDashOffset | Stroke dash offset                | number                        | -         |          |
| lineJoin       | Stroke join style                 | `round` \| `bevel` \| `miter` | `miter`   |          |
| lineWidth      | Stroke width                      | number                        | 1         |          |
| opacity        | Opacity                           | number \| string              | 1         |          |
| shadowBlur     | Shadow blur                       | number                        | -         |          |
| shadowColor    | Shadow color                      | string                        | -         |          |
| shadowOffsetX  | Shadow offset in x-axis direction | number \| string              | -         |          |
| shadowOffsetY  | Shadow offset in y-axis direction | number \| string              | -         |          |
| shadowType     | Shadow type                       | `inner` \| `outer`            | `outer`   |          |
| stroke         | Stroke color                      | string                        | `#000`    |          |
| strokeOpacity  | Stroke color opacity              | number \| string              | 1         |          |
| value          | Value for ratio calculation       | number                        | -         | ✓        |
| visibility     | Visibility of the shape           | `visible` \| `hidden`         | `visible` |          |

## Example

### Built-in Donut Node Effect

<Playground path="element/node/demo/donut.js" rid="default-donut-node"></Playground>
