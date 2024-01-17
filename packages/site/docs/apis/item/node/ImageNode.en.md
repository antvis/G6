---
title: Image
order: 4
---

This section details the configuration options for Image nodes, as demonstrated in the [Image Node DEMO](/en/examples/item/defaultNodes/#image).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NPG3SL_n-CYAAAAAAAAAAAAADmJ7AQ/original" width=500 />

## keyShape

**Type**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The source address of the image. Can be a URL or a base64 encoded image data.
   */
  src?: string;
  /**
   * The width of the image.
   */
  width?: number;
  /**
   * The height of the image.
   */
  height?: number;
  /**
   * Configuration for clipping the image.
   */
  clipCfg?: ClipCfg;
};
```

For more detailed style configuration, refer to [Image Graphic Style](../shape/ImageStyleProps.en.md).

`ClipCfg` Definition:

```typescript
type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse';

type ClipCfg = {
  type: SHAPE_TYPE;
  show: boolean;
} & CircleStyleProps &
  RectStyleProps &
  EllipseStyleProps;
```

This allows specifying the shape type for image clipping and its style. Depending on the target clipping shape type, style configurations vary. For example, for type as `'circle'`, refer to [Circle Graphic Style](../shape/CircleStyleProps.en.md); for `'rect'`, refer to [Rect Graphic Style](../shape/RectStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "width": "32",
  "height": "32
}

```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
