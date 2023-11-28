---
title: ComboDisplayModel
order: 12
---

ComboDisplayModel（Combo Display/Rendering Data） is the result of mapping the ComboModel (inner model) through the mapper configuration specified on the graph instance ([specification.combo](../graph/Specification.en.md#combo)), and is only consumed for internal rendering. You won't consume it anywhere else. The data type inherits the ComboModel data type [`ComboModel`](./ComboModel.en.md) from the internal data flow and is extended as follows:

```typescript
interface ComboDisplayModel {
  id: string | number;
  data: ComboDisplayModelData; // extends ComboModelData
}
```

## id

The unique ID of the Combo. The ID cannot be modified once the Combo is created.

- **Required**: True;
- **Type**: `string|number`

## data

The data in ComboDisplayModelData is the result of mapping the ComboModel data through the mapper configuration specified on the graph instance ([specification.combo](../graph/Specification.en.md#combo)). It should contain all the contents of ComboModel along with additional graphic style configurations.

- **Required**: True;
- **Type**: [`ComboDisplayModelData`](#combodisplaymodeldatalodlevels), extended from [`ComboModel`](./ComboModel.en.md#combomodeldatatype), with additional properties as described below:

### ComboDisplayModelData.lodLevels

Specifies the zoom level divisions for the Combo. It is an array of zoom level range coefficients, representing the division of zoom levels. One of the levels should have `primary: true`, indicating that it has a level index of 0. The level indices decrease for levels with `zoomRange` less than the current level, and increase for levels with `zoomRange` greater than the current level. The level index corresponds to the `lod` value in the graphics configuration below.

- **Required**: False;
- **Type**: `LodLevel`[], where `LodLevel` is defined as follows:

| Name        | Type               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `zoomRange` | `[number, number]` | The zoom level range defined for this level. When the graph zoom level zoom >= zoomRange[0] && zoom < zoomRange[1], it indicates that the node is in this level                                                                                                                                                                                                                                                                             |
| `primary`   | `boolean`          | Whether it is the primary level. If `true`, it means that the level number is 0. Levels with smaller this `zoomRange` values have decreasing level numbers, while levels with larger this `zoomRange` values have increasing level numbers. In the `NodeDisplayModelData.lodLevels` array, there should be only one level with `primary: true`. And the level number corresponds to the `lod` value in the shape style configurations below |

### ComboDisplayModelData.animates

Configuration of graphic animations when the node appears, disappears, shows, hides, or updates. Supports sequential execution of multiple animations (order). [Animation Demo](/en/examples/scatter/changePosition/#itemAnimates).

- **Required**: False;
- **Type**: `IAnimates`, defined as follows:

```typescript
interface IAnimates {
  buildIn?: IAnimate[]; // Animations when certain graphics are created in the combo
  buildOut?: IAnimate[]; // Animations when certain graphics are destroyed in the combo
  show?: IAnimate[]; // Animations when certain graphics transition from hidden to visible in the combo
  hide?: IAnimate[]; // Animations when certain graphics transition from visible to hidden in the combo
  update?: (IAnimate | IStateAnimate)[]; // Animations when certain graphics undergo data or state updates in the combo
}
```

In this, `IAnimate` is defined as follows:

| Name                   | Type       | Default                                      | Description                                                                                                                                                                                  |
| :--------------------- | :--------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IAnimate.fields`      | `string[]` | `undefined`                                  | The names of the graphic style properties related to this animation, for example `['fill', 'lineWidth']`                                                                                     |
| `IAnimate.shapeId`     | `string`   | `group`                                      | The ID of the graphic on which the animation needs to be performed. If not specified, it represents the animation on the entire graphic group                                                |
| `IAnimate.order?`      | `number`   | `0`                                          | The order in which this animation is executed among `IAnimate[]`, allowing for sequential playback of multiple animations during one update                                                  |
| `IAnimate.duration?`   | `number`   | `500`                                        | The duration of this animation, the smaller the value, the faster the animation speed                                                                                                        |
| `IAnimate.iterations?` | `number`   | `1`                                          | The number of times this animation is executed, -1 represents looping execution                                                                                                              |
| `IAnimate.easing?`     | `string`   | `'cubic-bezier(0.250, 0.460, 0.450, 0.940)'` | The easing function of this animation, the possible values can be referred to [MDN easing definition](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#easing) |

`IStateAnimate` is defined as follows, which adds a field `states` specifying the states in which this animation is executed to `IAnimate`:

```typescript
interface IStateAnimate extends IAnimate {
  states: string[];
}
```

### ComboDisplayModelData.keyShape

The style configuration of the key shape of the Combo. The key shape of the Combo represents its primary form and is also used to calculate the incoming position of edges.

- **Required**: False;
- **Type**: `ShapeStyle`, and the configuration options for different key shapes are different. For example, the key shape of `'circle-combo'` is `'circle'` (refer to [Circle Shape Style](../shape/CircleStyleProps.en.md)), and the key shape of `'rect-combo'` is `'rect'` (refer to [Rect Shape Style](../shape/RectStyleProps.en.md)).

### ComboDisplayModelData.haloShape

In the built-in Combo and themes, `haloShape` refers to the halo effect displayed around the key shape (`keyShape`) of the Combo in the `active` state (usually triggered when the mouse hovers) and `selected` state (usually triggered when selected). In the logic of the built-in Combo, the type and color of the `haloShape` follow the key shape (`keyShape`).

- **Required**: False;
- **Type**: `ShapeStyle`, where the type of haloShape follows the key shape (keyShape). The configuration options for different key shapes are different. For example, the key shape of `'circle-combo'` is `'circle'` (refer to [Circle Shape Style](../shape/CircleStyleProps.en.md)), and the key shape of `'rect-combo'` is `'rect'` (refer to [Rect Shape Style](../shape/RectStyleProps.en.md)).

### ComboDisplayModelData.labelShape

The text shape of the Combo, supported by built-in Combo or custom Combo that inherits the built-in Combo (without overriding related content).

- **Required**: False;
- **Type**:

```typescript
  TextStyleProps & {
    /**
     * The position of the text relative to the key shape (keyShape) of the Combo. It can specify the position and whether it is inside or outside the combo.
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'ouside-top'| 'ouside-left' | 'ouside-right' | 'ouside-bottom';
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

### ComboDisplayModelData.labelBackgroundShape

The background shape of the text in the Combo, which is a rectangle. If not set, it will not be displayed. Setting it as `{}` will use the default style in the theme to display the text background shape.

- **Required**: False;
- **Type**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle in all directions
};
```

The related shape style can be referred to as RectStyleProps [`RectStyleProps`](../shape/RectStyleProps.en.md).

### ComboDisplayModelData.badgeShapes

The badges on the four sides of the Combo, where a single badge includes the Combo and background shape. `badgeShapes` configures multiple badges.

- **Required**: False;
- **Type**:

```typescript
  {
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
  }
```

`BadgePosition` can have the following values:

| Value           | Description                                  |
| :-------------- | :------------------------------------------- |
| `'rightTop'`    | Top right corner, recommended                |
| `'right'`       | Middle right, recommended                    |
| `'rightBottom'` | Bottom right corner, recommended             |
| `'leftTop'`     | Top left corner                              |
| `'left'`        | Middle left                                  |
| `'leftBottom'`  | Bottom left corner                           |
| `'bottom'`      | Middle bottom                                |
| `'top'`         | Middle top                                   |
| `'bottomRight'` | Bottom right corner, same as `'rightBottom'` |
| `'bottomLeft'`  | Bottom left corner, same as `'leftBottom'`   |
| `'topRight'`    | Top right corner, same as `'rightTop'`       |
| `'topLeft'`     | Top left corner, same as `'leftTop'`         |

### ComboDisplayModelData.anchorShapes

The circular shapes (anchor shapes) at the four sides of the Combo represent the entry points for connections. The anchorShapes configuration specifies multiple anchor shapes.

- **Required**: False;
- **Type**:

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

The style of the anchor shapes can be referred to as [CircleStyleProps](../shape/CircleStyleProps.en.md).

### ComboDisplayModelData.otherShapes

The xxShape(s) mentioned above are the predefined shapes in the G6 Combo specification. Other custom shapes in the Combo should be defined and configured in `otherShapes`.

- **Required**: False;
- **Type**:

```typescript
{
  // The key is the shape id, in the format of xxShape
  // The value is the shape style configuration (which varies depending on the shape, see the relevant documentation for each shape), as well as the animation of the shape
  [shapeId: string]: ShapeStyleProps;
}
```

The style configurations for different shapes can be referred to in the corresponding documentation under the [Shape Style](../shape/BaseStyleProps.en.md) directory.
