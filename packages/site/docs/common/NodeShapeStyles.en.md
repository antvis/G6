## iconShape

**Type**: `IconShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">IconShapeStyle</summary>

```typescript
type IconShapeStyle = type Partial<
  TextStyleProps &
    ImageStyleProps &
    ShapeStyle & {
      offsetX?: number;
      offsetY?: number;
      lod?: number;
    }
>;
```

Where the relevant graphic styles refer to [`TextStyleProps` Text Shape Style](../shape/TextStyleProps.en.md) and [`ImageStyleProps` Image Shape Style](../shape/ImageStyleProps.en.md).

</details>

**Default**: `undefined`

The icon graphic at the center of the node (except for the built-in node type `'modelRect-node'`, which is supported by other built-in nodes and custom nodes that inherit from them without overriding the relevant content). It can be an image or text, with text supporting iconfont (assign `fontFamily: 'iconfont'`).

## haloShape

**Type**: `HaloShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">HaloShapeStyle</summary>

The graphic type of `haloShape` follows the main graphic (`keyShape`). The graphic style configuration varies depending on the main graphic. For example, the main graphic of `'circle-node'` is `'circle'`, refer to [Circle Shape Style](../shape/CircleStyleProps.en.md); the main graphic of `'image-node'` is `'image'`, refer to [Image Shape Style](../shape/ImageStyleProps.en.md).

</details>

**Default**: `undefined`

In built-in nodes and themes, `haloShape` refers to the halo effect graphic displayed around the main graphic (keyShape) of a node when it is in the `active` state (usually triggered when the mouse hovers) or `selected` state (usually triggered when it is selected). In the logic of built-in nodes, the graphic type and color of `haloShape` follow the main graphic (`keyShape`).

## labelShape

**Type**: `LabelShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelShapeStyle</summary>

```typescript
type LabelShapeStyle = TextStyleProps & {
  /**
   * The position of the text relative to the key shape (keyShape) of the node, supports above, below, left, right, and center
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /**
   * The x offset of the text shape relative to the key shape (keyShape)
   */
  offsetX?: number;
  /**
   * The y offset of the text shape relative to the key shape (keyShape)
   */
  offsetY?: number;
  /**
   * The z offset of the text shape relative to the key shape (keyShape)
   */
  offsetZ?: number;
  /**
   * The maximum width allowed for the text.
   * If specified as a number, it represents the pixel value.
   * If specified as a text with '%', it represents a percentage of the key shape (keyShape) bounding box size.
   * The default value is '200%', which means the maximum width of the text shape cannot exceed twice the width of the key shape.
   * If it exceeds, it will be automatically truncated and an ellipsis '...' will be added at the end.
   */
  maxWidth?: string | number;
  /**
   * The rotation angle of the text (in radians)
   */
  angle?: number;
};
```

For more detailed style configuration, refer to [Text Graphic Style](../shape/TextStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary><span style="color: #873bf4; cursor: pointer">object</span></summary>

```json
{
  "position": "center",
  "maxWidth": "200%"
}
```

</details>

The text shape of the node.

## labelBackgroundShape

**Type**: `LabelBackgroundShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelBackgroundShapeStyle</summary>

```typescript
type LabelBackgroundShapeStyle = ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle
};
```

The related rectangle style type can be referred to in [`RectStyleProps`](../shape/RectStyleProps.en.md).

</details>

**Default**: `undefined`

The background shape of the text of the node.

## badgeShapes

**Type**: `BadgeShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">BadgeShapesStyle</summary>

```typescript
type IBadgePosition =
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop'
  | 'topLeft'
  | 'top'
  | 'topRight';
type BadgeShapesStyle = {
  /**
   * The background color of the badge
   * (works for all badges, lower priority than the color setting of individual badges)
   */
  color?: string;
  /**
   * 徽标背景颜色的色板，意味着下面各个徽标将自动取用该色板中的颜色。
   * 优先级低于下面单个徽标的 color 设置
   */
  palette?: string[];
  /**
   * The color palette for the badge background color,
   * which means the individual badges below will automatically use the colors in the palette.
   * Lower priority than the color setting of individual badges
   */
  textColor?: string;
  /**
   * The text color of the badge (works for all badges,
   * lower priority than the textColor setting of individual badges)
   */
  [key: number]: ShapeStyle & {
    /**
     * The position of this badge, supporting the values below
     */
    position?: IBadgePosition;
    /**
     * The background color of this badge
     */
    color?: string;
    /**
     * The text color of this badge
     */
    textColor?: string;
  };
};
```

Graphic Style Reference refer to [Rect](../shape/RectStyleProps.en.md).

</details>

**Default**: `undefined`

The badges around the node. A single badge includes text and background shape. The badgeShapes configuration is for multiple badges. [Node Badge Example](/en/examples/item/defaultNodes/#circle).

## anchorShapes

**类型**：`AnchorShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
// The outer circleStyleProps can be used to configure the style of all anchor shapes (circles),
// with lower priority than the individual anchor shape configuration
type AnchorShapesStyle = CircleStyleProps & {
  // Individual anchor shape configuration,
  // with higher priority than the outer circleStyleProps
  [key: number]: CircleStyleProps & {
    // The position of this anchor shape, can be configured as a string or number array representing the percentage position relative to the key shape (keyShape) bounding box,
    // for example, [0.5, 1] means it is located in the middle right of the key shape
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

The related circle style can be referred to in [`CircleStyleProps`](../shape/CircleStyleProps.en.md).

</details>

**Default**: `undefined`

The circular shapes (anchor shapes) of the edges entering each side of the node. The anchorShapes configuration is for multiple anchor shapes. [Node Anchor Example](/en/examples/item/defaultNodes/#circle).

## otherShapes

**Type**: `OtherShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type OtherShapesStyle = {
  // key is the shape id, in the format of xxShape specified by the specification
  // value is the shape style configuration (different shapes have different configurations, see the relevant shape documents), and the animation of the shape
  [shapeId: string]: ShapeStyleProps;
};
```

The different shape styles can be referred to in the corresponding shape type documentation under the [Shape Style](../shape/BaseStyleProps.en.md) directory.

</details>

**Default**: `undefined`

All the xxShape(s) above are the possible shapes that exist in the G6 defined standard node. Other shapes in custom nodes should be defined and configured in `otherShapes`.
