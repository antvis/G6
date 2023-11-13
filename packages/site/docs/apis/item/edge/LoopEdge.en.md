---
title: Loop
order: 7
---

This article presents the configuration options for Loop self-loop edges. [Loop Self-Loop Edge DEMO](/en/examples/item/defaultEdges#loop).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dU0LRoKrqEIAAAAAAAAAAAAADmJ7AQ/original" width=200 />

## KeyShapeStyle

The basic graphic style refers to the [Path Graphic Style](../../shape/PathtyleProps.en.md), with the following extended configurations:

### KeyShapeStyle.loopCfg.position

**Type**: `LoopPosition`

Possible values:

| Name             | Description |
| ---------------- | ----------- |
| `'top'`          | 上方        |
| `'top-right'`    | 右上方      |
| `'right'`        | 右边        |
| `'bottom-right'` | 右下方      |
| `'bottom'`       | 下方        |
| `'bottom-left'`  | 左下方      |
| `'left'`         | 左边        |
| `'top-left'`     | 左上方      |

**Default**: `'top'`

**Required**: No

**Description**: Specifies the relative position of the self-loop to the node.

### KeyShapeStyle.loopCfg.dist

**Type**: `number`

**Default**: `node width and height * 2`

**Required**: No

**Description**: The distance from the edge of the node's keyShape to the topmost point of the self-loop, used to specify the curvature of the self-loop.

### KeyShapeStyle.loopCfg.clockwise

**Type**: `boolean`

**Default**: `true`

**Required**: No

**Description**: Specifies whether to draw the loop in a clockwise direction.

### KeyShapeStyle.loopCfg.pointPadding

**Type**: `number`

**Default**: `1/4 of the minimum of node width and height`

**Required**: No

**Description**: For non-circular nodes, it specifies the offset of the connection point from the node center coordinates (top-right, bottom-right, top-left, bottom-left are special cases, referring to the coordinates of the four corners) in the x or y direction.

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
