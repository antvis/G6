## iconShape

**Type**: `IconShapeType`

<details>

<summary style="color: #873bf4; cursor: pointer">IconShapeType</summary>

```typescript
type IconShapeType = Partial<
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

**Default**: undefined

The icon shape of the edge (built-in edge support, custom edges that inherit these built-in edges also support it without overriding the relevant content). It is located in front of the text. It can be an image or text, and text supports iconfont.

## haloShape

**Type**: `HaloShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">HaloShapeStyle</summary>

`ShapeStyle`. The graphic type of `haloShape` follows the main graphic (`keyShape`). The graphic style configuration varies depending on the main graphic. For example, the main graphic of `'line-edge'` is `'line'`, refer to [Line Graphic Style](../shape/LineStyleProps.en.md); the main graphic of `'cubic-edge'` is `'path'`, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

</details>

**Default**: undefined

In built-in edges and themes, haloShape refers to the halo effect graphic displayed around the main graphic (keyShape) of the edge in active (usually triggered when the mouse hovers) and selected (usually triggered in the selected state) states. In the logic of built-in edges, the graphic type and color of haloShape follow the main graphic (keyShape).

## labelShape

**Type**: `LabelShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelShapeStyle</summary>

```typescript
type LabelShapeStyle = TextStyleProps & {
  /**
   * The position of the text relative to the key shape (keyShape) of the edge, supports above, below, left, right, and center
   */
  position?: 'start' | 'middle' | 'end';
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
   * Specifies whether the text rotates with the edge.
   */
  autoRotate?: boolean;
};
```

For more detailed style configuration, refer to [Text Graphic Style](../shape/TextStyleProps.en.md).

</details>

**Default**: `object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "position": "middle",
  "maxWidth": "200%"
}
```

</details>

The text shape of the edge.

## labelBackgroundShape

The background shape of the text of the edge.

**Type**: `LabelBackgroundShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelBackgroundShapeStyle</summary>

```typescript
type LabelBackgroundShapeStyle = ShapeStyle & {
  /**
   * The padding distance between the text and the background rectangle
   */
  padding?: number | number[];
};
```

The related rectangle style type can be referred to in [`RectStyleProps`](../shape/RectStyleProps.en.md).

</details>

**Default**: undefined

## otherShapes

All the xxShape(s) above are the possible shapes that exist in the G6 defined standard edge. Other shapes in custom nodes should be defined and configured in `otherShapes`.

**Type**: `OtherShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">OtherShapesStyle</summary>

```typescript
type OtherShapesStyle = {
  /**
   *  key is the shape id, in the format of xxShape specified by the specification
   */
  /**
   *  value is the shape style configuration (different shapes have different configurations, see the relevant shape documents), and the animation of the shape
   */
  [shapeId: string]: ShapeStyleProps;
};
```

The different shape styles can be referred to in the corresponding shape type documentation under the [Shape Style](../shape/BaseStyleProps.en.md) directory.

</details>

**Default**: undefined
