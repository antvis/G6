## labelShape

**Type**: `LabelShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelShapeStyle</summary>

```typescript
type LabelShapeStyle = TextStyleProps & {
  /**
   * The position of the text relative to the key shape (keyShape) of the Combo. It can specify the position and whether it is inside or outside the combo.
   */
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'left-top'
    | 'ouside-top'
    | 'ouside-left'
    | 'ouside-right'
    | 'ouside-bottom';
  /**
   * The offset of the text shape from the key shape (keyShape) in the x-direction.
   */
  offsetX?: number;
  /**
   * The offset of the text shape from the key shape (keyShape) in the y-direction.
   */
  offsetY?: number;
  /**
   * The offset of the text shape from the key shape (keyShape) in the z-direction.
   */
  offsetZ?: number;
  /**
   * The maximum width allowed for the text. If specified as a number, it represents the pixel value. If specified as text with '%', it represents the percentage relative to the size of the key shape (keyShape). The default value is '200%', which means that the maximum width of the text shape cannot exceed twice the width of the key shape. If it exceeds, it will be automatically truncated and ellipsis '...' will be added at the end.
   */
  maxWidth?: string | number;
  /**
   * The rotation angle of the text (in radians).
   */
  angle?: number;
};
```

The related shape style can be referred to as [`TextStyleProps` Text Shape Style](../shape/TextStyleProps.en.md)。

</details>

**Default**: `object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "position": "bottom",
  "maxWidth": "200%"
}
```

</details>

The text shape of the Combo.

## labelBackgroundShape

**Type**: `LabelBackgroundShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">LabelBackgroundShapeStyle</summary>

```typescript
type LabelBackgroundShapeStyle = ShapeStyle & {
  /**
   * The padding distance between the text and the background rectangle in all directions
   */
  padding?: number | number[];
};
```

The related shape style can be referred to as RectStyleProps [`RectStyleProps`](../shape/RectStyleProps.en.md).

</details>

**Default**: undefined

The background shape of the text in the Combo, which is a rectangle. If not set, it will not be displayed. Setting it as `{}` will use the default style in the theme to display the text background shape.

## haloShape

**Type**: `HaloShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">HaloShapeStyle</summary>

```typescript
type HaloShapeStyle = ShapeStyle;
```

`ShapeStyle`, where the type of haloShape follows the key shape (keyShape). The configuration options for different key shapes are different. For example, the key shape of `'circle-combo'` is `'circle'` (refer to [Circle Shape Style](../shape/CircleStyleProps.en.md)), and the key shape of `'rect-combo'` is `'rect'` (refer to [Rect Shape Style](../shape/RectStyleProps.en.md)).

</details>

**Default**: undefined

In the built-in Combo and themes, `haloShape` refers to the halo effect displayed around the key shape (`keyShape`) of the Combo in the `active` state (usually triggered when the mouse hovers) and `selected` state (usually triggered when selected). In the logic of the built-in Combo, the type and color of the `haloShape` follow the key shape (`keyShape`).

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
   * The background color of the badge (applies to all badges, lower priority than the color setting of individual badges below)
   */
  color?: string;
  /**
   * The color palette of the badge background, which means that the badges below will automatically take colors from this palette.
   * Lower priority than the color setting of individual badges below.
   */
  palette?: string[];
  /**
   * The text color of the badge (applies to all badges, lower priority than the textColor setting of individual badges below)
   */
  textColor?: string;
  /**
   * The style configuration of individual badges, which overrides the above configurations.
   */
  [key: number]: ShapeStyle & {
    /**
     * The position of the badge, supported values are described below
     */
    position?: IBadgePosition;
    /**
     * The background color of the badge
     */
    color?: string;
    /**
     * The text color of the badge
     */
    textColor?: string;
  };
};
```

</details>

**Default**: undefined

The badges on the four sides of the Combo, where a single badge includes the Combo and background shape. `badgeShapes` configures multiple badges.

## anchorShapes

**Type**: `AnchorShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">AnchorShapesStyle</summary>

```typescript
/**
 *  The outer layer configures the style of all anchor shapes (circles), with lower priority than the individual anchor shape configurations.
 */
type AnchorShapesStyle = StyleProps & {
  /**
   * Individual anchor shape configurations, with higher priority than the outer CircleStyleProps.
   */
  [key: number]: CircleStyleProps & {
    /**
     * The position of the anchor shape, can be configured as a string or a number array representing the percentage position relative to the bounding box of the key shape (keyShape). For example, [0.5, 1] means it is located at the right center of the key shape.
     */
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

The style of the anchor shapes can be referred to as [CircleStyleProps](../shape/CircleStyleProps.en.md).

</details>

**Default**: undefined

The circular shapes (anchor shapes) at the four sides of the Combo represent the entry points for connections. The anchorShapes configuration specifies multiple anchor shapes.

## otherShapes

**Type**: `OtherShapesStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">OtherShapesStyle</summary>

```typescript
type OtherShapesStyle = {
  /**
   * The key is the shape id, in the format of xxShape.
   * The value is the shape style configuration (which varies depending on the shape, see the relevant documentation for each shape), as well as the animation of the shape.
   */
  [shapeId: string]: ShapeStyleProps;
};
```

The style configurations for different shapes can be referred to in the corresponding documentation under the [Shape Style](../shape/BaseStyleProps.en.md) directory.

</details>

**Default**: undefined

The xxShape(s) mentioned above are the predefined shapes in the G6 Combo specification. Other custom shapes in the Combo should be defined and configured in `otherShapes`.
