---
title: Loop 自环边
order: 7
---

本文展示 Loop 自环边配置项。[Loop 自环边 DEMO](/zh/examples/item/defaultEdges#loop)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dU0LRoKrqEIAAAAAAAAAAAAADmJ7AQ/original" width=200 />

## KeyShapeStyle

此处图形样式参考 [Path 图形样式](../../shape/PathtyleProps.zh.md)，扩展配置如下：

### KeyShapeStyle.loopCfg.position

**类型**：`LoopPosition`

可取值：

| 名称             | 说明   |
| ---------------- | ------ |
| `'top'`          | 上方   |
| `'top-right'`    | 右上方 |
| `'right'`        | 右边   |
| `'bottom-right'` | 右下方 |
| `'bottom'`       | 下方   |
| `'bottom-left'`  | 左下方 |
| `'left'`         | 左边   |
| `'top-left'`     | 左上方 |

**默认值**：`'top'`

**是否必须**：否

**说明**：指定自环与节点的相对位置。

### KeyShapeStyle.loopCfg.dist

**类型**：`number`

**默认值**：`节点宽高中最大值的2倍`

**是否必须**：否

**说明**：从节点 keyShape 的边缘到自环最顶端的位置，用于指定自环的曲度。

### KeyShapeStyle.loopCfg.clockwise

**类型**：`boolean`

**默认值**：`true`

**是否必须**：否

**说明**：指定是否顺时针画环。

### KeyShapeStyle.loopCfg.pointPadding

**类型**：`number`

**默认值**：`节点宽高中最小值的1/4`

**是否必须**：否

**说明**：对于非圆形节点设置的连接点与节点中心坐标（top-right，bottom-right,top-left,bottom-left 较特殊，为四个角坐标）在 x 轴或 y 轴方向的偏移量。

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>
