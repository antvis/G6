---
title: Polyline
order: 2
---

This article presents the configuration options for Polyline edges. [Polyline Edge DEMO](/zh/examples/item/defaultEdges/#polyline1).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*snNhSbjzg9EAAAAAAAAAAAAADmJ7AQ/original" width=300 />

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mxXeT7xiFVQAAAAAAAAAAAAADmJ7AQ/original" width=300>

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gIZGQ4PokaMAAAAAAAAAAAAADmJ7AQ/original" width=300>

## KeyShapeStyle

Basic graphic style refers to [Path Graphic Style](../../shape/PathStyleProps.en.md), with the following extended configurations:

### KeyShapeStyle.radius

**Type**: `number`

**Default**: undefined

**Required**: No

**Description**: The radius of the corners at turns. Default is right angles.

### KeyShapeStyle.offset

**Type**: `number`

**Default**: `2`

**Required**: No

**Description**: The minimum distance from the node at the turn.

### KeyShapeStyle.controlPoints

**Type**: `Point[]`

**Default**: undefined

**Required**: No

**Description**: Array of control points. If not specified, polyline control points are automatically generated based on the [A\* algorithm](https://www.yuque.com/antv/blog/eyi70n). If specified, the polyline will bend at the locations specified by controlPoints.

### KeyShapeStyle.routeCfg

**Type**: `RouteCfg`

**Required**: No

**Description**: Routing parameters, effective when there are no controlPoints in the data. In this case, the polyline will automatically calculate the path. Supports automatic obstacle avoidance [DEMO](/en/examples/item/defaultEdges#polyline3)

| Props                     | Type               | Default   | Required | Description                                                                                                                                                   |
| ------------------------- | ------------------ | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                      | `'orth'` \| `'er'` | `'orth'`  | No       | Currently, two built-in routing methods `orth` and `er` are supported                                                                                         |
| offset                    | `number`           | undefined | No       | The minimum distance from the node at the turn                                                                                                                |
| gridSize                  | `number`           | `10`      | No       | The grid size for calculating the polyline, smaller values lead to higher performance consumption                                                             |
| maxAllowedDirectionChange | `number`           | undefined | No       | The maximum allowed angle of direction change, in radians. For example, `Math.PI / 2` for orthogonal routing `orth`, and `Math.PI / 4` for metro routing `er` |
| enableObstacleAvoidance   | `boolean`          | `false`   | No       | Whether to enable automatic obstacle avoidance                                                                                                                |

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
