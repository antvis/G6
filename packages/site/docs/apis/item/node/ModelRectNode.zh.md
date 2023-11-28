---
title: ModelRect 模态矩形
order: 9
---

本文展示所有 ModelRect 模态矩形配置项。[ModelRect 模态矩形 DEMO](/zh/examples/item/defaultNodes/#modelRect)。

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*w4kQSYQ9djQAAAAAAAAAAABkARQnAQ" width=600 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 矩形的宽度
   */
  width: number;
  /**
   * 矩形的高度
   */
  height: number;
};
```

其中，相关的图形样式参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "width": 185,
  "height": 70,
  "stroke": "#69c0ff",
  "fill": "#ffffff",
  "lineWidth": 1,
  "radius": 5
}
```

</details>

## otherShapes(extended)

**类型**：`OtherShapesStyle`

```typescript
type OtherShapesStyle = {
  /**
   * left rect
   */
  preRect: RectStyleProps & {
    show?: boolean;
  };
  /**
   * text description
   */
  description: TextStyleProps & {
    show?: boolean;
    offsetX?: number;
    offsetY?: number;
  };
  /**
   * left icon describing the information
   */
  logoIcon: TextStyleProps &
    IconStyleProps & {
      show?: boolean;
      width?: number;
      height?: number;
      offsetX?: number;
      offsetY?: number;
    };
  /**
   * right icon describing the state
   */
  stateIcon: TextStyleProps &
    IconStyleProps & {
      show?: boolean;
      width?: number;
      height?: number;
      offsetX?: number;
      offsetY?: number;
    };
};
```

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "preRect": {
    "show": true,
    "width": 5,
    "fill": "#69c0ff",
    "radius": 5
  },
  "logoIcon": {
    "show": true,
    "width": 16,
    "height": 16,
    "offsetX": 0,
    "offsetY": 0,
    "img": "https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg"
  },
  "stateIcon": {
    "show": true,
    "width": 16,
    "height": 16,
    "offsetX": 0,
    "offsetY": 0,
    "img": "https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg"
  },
  "description": {
    "show": true,
    "maxLines": 1,
    "textOverflow": "ellipsis",
    "fill": "#C2C2C2",
    "textBaseline": "middle",
    "textAlign": "left",
    "offsetX": 0,
    "offsetY": 0
  }
}
```

</details>

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
