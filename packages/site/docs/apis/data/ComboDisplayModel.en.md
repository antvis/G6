---
title: ComboDisplayModel
order: 12
---

ComboDisplayModel（Combo Display/Rendering Data） is the result of mapping the ComboModel (inner model) through the mapper configuration specified on the graph instance ([specification.combo](../graph/Specification.en.md#combo)), and is only consumed for internal rendering. You won't consume it anywhere else. The data type inherits the ComboModel data type [ComboModel](./ComboModel.en.md) from the internal data flow and is extended as follows:

```typescript
interface ComboDisplayModel {
  id: string | number;
  data: ComboDisplayModelData; // extends ComboModelData
}
```

## id <Badge type="error">Required</Badge>

The unique ID of the Combo. The ID cannot be modified once the Combo is created.

**Type**: `string | number`

## data <Badge type="error">Required</Badge>

The data in ComboDisplayModelData is the result of mapping the ComboModel data through the mapper configuration specified on the graph instance ([specification.combo](../graph/Specification.en.md#combo)). It should contain all the contents of ComboModel along with additional shape style configurations.

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/LodLevels.en.md"></embed>

### animates

Configuration of shape animations when the node appears, disappears, shows, hides, or updates. Supports sequential execution of multiple animations (order). [Animation Demo](/en/examples/scatter/changePosition/#itemAnimates).

**Type**: `IAnimates`

<embed src="../../common/IAnimates.en.md"></embed>

### keyShape

The style configuration of the key shape of the Combo. The key shape of the Combo represents its primary form and is also used to calculate the incoming position of edges.

**Type**: `ShapeStyle`, and the configuration options for different key shapes are different. For example, the key shape of `'circle-combo'` is `'circle'` (refer to [Circle Shape Style](/en/apis/shape/circle-style-props)), and the key shape of `'rect-combo'` is `'rect'` (refer to [Rect Shape Style](/en/apis/shape/rect-style-props)).

### haloShape

In the built-in Combo and themes, `haloShape` refers to the halo effect displayed around the key shape (`keyShape`) of the Combo in the `active` state (usually triggered when the mouse hovers) and `selected` state (usually triggered when selected). In the logic of the built-in Combo, the type and color of the `haloShape` follow the key shape (`keyShape`).

**Type**: `ShapeStyle`, where the type of haloShape follows the key shape (keyShape). The configuration options for different key shapes are different. For example, the key shape of `'circle-combo'` is `'circle'` (refer to [Circle Shape Style](/en/apis/shape/circle-style-props)), and the key shape of `'rect-combo'` is `'rect'` (refer to [Rect Shape Style](/en/apis/shape/rect-style-props)).

<embed src="../../common/LabelShape.en.md"></embed>

### labelBackgroundShape

The background shape of the text in the Combo, which is a rectangle. If not set, it will not be displayed. Setting it as `{}` will use the default style in the theme to display the text background shape.

**Type**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle in all directions
};
```

The related shape style can be referred to as RectStyleProps [RectStyleProps](/en/apis/shape/rect-style-props).

<embed src="../../common/BadgeShapes.en.md"></embed>

### anchorShapes

The circular shapes (anchor shapes) at the four sides of the Combo represent the entry points for connections. The anchorShapes configuration specifies multiple anchor shapes.

**Type**:

```typescript
// The outer layer configures the style of all anchor shapes (circles), with lower priority than the individual anchor shape configurations.
CircleStyleProps & {
  // Individual anchor shape configurations, with higher priority than the outer CircleStyleProps.
  [key: number]: CircleStyleProps & {
    // The position of the anchor shape, can be configured as a string or a number array representing the percentage position relative to the bounding box of the key shape (keyShape). For example, [0.5, 1] means it is located at the right center of the key shape.
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

The style of the anchor shapes can be referred to as [CircleStyleProps](/en/apis/shape/circle-style-props).

### otherShapes

The xxShape(s) mentioned above are the predefined shapes in the G6 Combo specification. Other custom shapes in the Combo should be defined and configured in `otherShapes`.

**Type**:

```typescript
{
  // The key is the shape id, in the format of xxShape
  // The value is the shape style configuration (which varies depending on the shape, see the relevant documentation for each shape), as well as the animation of the shape
  [shapeId: string]: ShapeStyleProps;
}
```

The style configurations for different shapes can be referred to in the corresponding documentation under the [Shape Style](/en/apis/shape/overview) directory.
