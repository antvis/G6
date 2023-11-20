---
title: Loop 自环边
order: 7
---

本文展示 Loop 自环边配置项。[Loop 自环边 DEMO](/zh/examples/item/defaultEdges#loop)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dU0LRoKrqEIAAAAAAAAAAAAADmJ7AQ/original" width=200 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type LoopPosition = 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';

type LoopCfg = {
  /**
   * 指定自环与节点的相对位置
   */
  position?: LoopPosition;
  /**
   * 从节点 keyShape 的边缘到自环最顶端的位置，用于指定自环的曲度
   */
  dist?: number;
  /**
   * 指定是否顺时针画环
   */
  clockwise?: boolean;
  /**
   *  对于非圆形节点设置的连接点与节点中心坐标（top-right，bottom-right,top-left,bottom-left 较特殊，为四个角坐标）在 x 轴或 y 轴方向的偏移量
   */
  pointPadding?: number;
};

type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    /**
     * 自环边配置
     */
    loopCfg?: LoopCfg;
  };
```

<embed src="../../../common/ArrowStyle.zh.md"></embed>

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "loopCfg": {
    "position": "top",
    "dist": "[节点宽高中最大值的2倍]",
    "clockwise": true,
    "pointPadding": "[节点宽高中最小值的1/4]"
  }
}
```

</details>

<embed src="../../../common/EdgeShapeStyles.zh.md"></embed>
