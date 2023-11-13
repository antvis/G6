---
title: Polyline 折线
order: 2
---

本文展示 Polyline 折线配置项。[Polyline 折线边 DEMO](/zh/examples/item/defaultEdges/#polyline1)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*snNhSbjzg9EAAAAAAAAAAAAADmJ7AQ/original" width=300 />

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mxXeT7xiFVQAAAAAAAAAAAAADmJ7AQ/original" width=300>

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gIZGQ4PokaMAAAAAAAAAAAAADmJ7AQ/original" width=300>

## KeyShapeStyle

此处图形样式参考 [Path 图形样式](../../shape/PathStyleProps.zh.md)，扩展配置如下：

### KeyShapeStyle.radius

**类型**：`number`

**默认值**：undefined

**是否必须**：否

**说明**：拐弯处的圆角弧度，默认为直角。

### KeyShapeStyle.offset

**类型**：`number`

**默认值**：`2`

**是否必须**：否

**说明**：拐弯处距离节点最小距离。

### KeyShapeStyle.controlPoints

**类型**：`Point[]`

**默认值**：undefined

**是否必须**：否

**说明**：控制点数组，不指定时根据 [A\* 算法](https://www.yuque.com/antv/blog/eyi70n)自动生成折线。若指定了，则按照 controlPoints 指定的位置进行弯折

### KeyShapeStyle.routeCfg

**类型**：`RouteCfg`

**是否必须**：否

**说明**：路由参数，在数据中不存在 controlPoints 时生效，此时 polyline 将自动计算路径。支持自动避障[体验 DEMO](/zh/examples/item/defaultEdges#polyline3)

| 属性                      | 类型               | 默认值    | 是否必须 | 说明                                                                                               |
| ------------------------- | ------------------ | --------- | -------- | -------------------------------------------------------------------------------------------------- |
| name                      | `'orth'` \| `'er'` | `'orth'`      | 否       | 目前内置两种路由方式 `orth` 和 `er`                                                                |
| offset                    | `number`           | undefined | 否       | 拐弯处距离节点最小距离                                                                             |
| gridSize                  | `number`           | `10`      | 否       | 计算折线的网格大小，值越小性能消耗越高                                                             |
| maxAllowedDirectionChange | `number`           | undefined | 否       | 允许的最大转角角度，弧度制。例如，正交路由 `orth` 为 `Math.PI / 2`, 地铁路由 `er` 为 `Math.PI / 4` |
| enableObstacleAvoidance   | `boolean`          | `false`   | 否       | 是否开启自动避障                                                                                   |

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>
