---
title: Polyline
order: 2
---

This article presents the configuration options for Polyline edges. [Polyline Edge DEMO](/en/examples/item/defaultEdges/#polyline1). [Polyline obstacle avoidance DEMO](/en/examples/item/defaultEdges#polyline3).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*snNhSbjzg9EAAAAAAAAAAAAADmJ7AQ/original" width=300 />

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mxXeT7xiFVQAAAAAAAAAAAAADmJ7AQ/original" width=300>

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gIZGQ4PokaMAAAAAAAAAAAAADmJ7AQ/original" width=300>

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    /**
     * The radius of the corners at turns. Default is right angles.
     */
    radius?: number;
    /**
     * The minimum distance from the node at the turn.
     */
    offset?: number;
    /**
     * Array of control points.
     */
    controlPoints?: Point[];
    /**
     * 路由参数,在数据中不存在 controlPoints 时生效，此时 polyline 将自动计算路径
     */
    routeCfg?: RouteCfg;
  };
```

`RouteCfg` 如下:

<embed src="../../../common/ArrowStyle.en.md"></embed>

For more detailed style configuration, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "offset": 2
}
```

</details>

| Props                     | Type               | Default   | Required | Description                                                                                                                                                   |
| ------------------------- | ------------------ | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                      | `'orth'` \| `'er'` | `'orth'`  | No       | Currently, two built-in routing methods `orth` and `er` are supported                                                                                         |
| offset                    | `number`           | undefined | No       | The minimum distance from the node at the turn                                                                                                                |
| gridSize                  | `number`           | `10`      | No       | The grid size for calculating the polyline, smaller values lead to higher performance consumption                                                             |
| maxAllowedDirectionChange | `number`           | undefined | No       | The maximum allowed angle of direction change, in radians. For example, `Math.PI / 2` for orthogonal routing `orth`, and `Math.PI / 4` for metro routing `er` |
| enableObstacleAvoidance   | `boolean`          | `false`   | No       | Whether to enable automatic obstacle avoidance                                                                                                                |

Note that, if not specified `controlPoints`, polyline control points are automatically generated based on the [A\* algorithm](https://www.yuque.com/antv/blog/eyi70n). If specified, the polyline will bend at the locations specified by `controlPoints`.

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
