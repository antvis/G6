---
title: Loop
order: 7
---

This article presents the configuration options for Loop self-loop edges. [Loop Self-Loop Edge DEMO](/en/examples/item/defaultEdges#loop).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dU0LRoKrqEIAAAAAAAAAAAAADmJ7AQ/original" width=200 />

## keyShape

- **Type**: `KeyShapeStyle`

```typescript
type LoopPosition = 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';

type LoopCfg = {
  /**
   * Specifies the relative position of the self-loop to the node.
   */
  position?: LoopPosition;
  /**
   * The distance from the edge of the node's keyShape to the topmost point of the self-loop.
   * Used to specify the curvature of the self-loop.
   **/
  dist?: number;
  /**
   * Specifies whether to draw the loop in a clockwise direction.
   */
  clockwise?: boolean;
  /**
   * For non-circular nodes, it specifies the offset of the connection point from the node center coordinates
   * (top-right, bottom-right, top-left, bottom-left are special cases
   * referring to the coordinates of the four corners) in the x or y direction.
   **/
  pointPadding?: number;
};

type KeyShapeStyle = PathStyleProps &
  ArrowProps & {
    loopCfg?: LoopCfg;
  };
```

<embed src="../../../common/ArrowStyle.en.md"></embed>

For more detailed style configuration, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

- **Default**:

```json
{
  "loopCfg": {
    "position": "top",
    "dist": "[2 * node width and height]",
    "clockwise": true,
    "pointPadding": "[1/4 * the minimum of node width and height]"
  }
}
```

- **Required**: No

<embed src="../../../common/EdgeShapeStyles.en.md"></embed>
