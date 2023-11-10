---
title: NodeDisplayModel
order: 10
---

NodeDisplayModel (Node rendering/display data) is the result of mapping the NodeModel (internal data) through the mapper you configured on the graph instance ([specification.node](../graph/Specification.en.md#node)). It is only consumed internally for rendering purposes and will not be consumed anywhere else. The data type inherits from the internal node data type [`NodeModel`](./NodeModel.en.md) and is defined as follows after extension:

```typescript
interface NodeDisplayModel {
  id: string | number;
  data: NodeDisplayModelData; // extends NodeModelData
}
```

## id

- **Required**: True;
- **Type**: `string|number`

The unique ID of the node. Once the node is created, the ID cannot be modified.

## data

The data in NodeDisplayModelData is the result of mapping NodeModel through the mapper configured on the graph instance ([specification.node](../graph/Specification.en.md#node)). It should store all the contents of NodeModel, along with additional graphical style configurations.

- **Required**: True;
- **Type**: [`NodeDisplayModelData`](#nodedisplaymodeldatalodlevels), which extends [`NodeModel`](./NodeModel.en.md#nodemodeldatatype) with additional content as described below:，

```typescript
type NodeModelData = NodeModelData & NodeShapeStyles & { lodLevels?: LodLevel[] };
```

### NodeDisplayModelData.lodLevels

Specifies how the graph is divided into zoom levels for this node. It is an array of zoom level ranges, where each range is represented by a `zoomRange` range. One of the ranges should have `primary: true`, indicating that its level number is 0. Levels with smaller `zoomRange` values have decreasing level numbers, while levels with larger `zoomRange` values have increasing level numbers. The level number corresponds to the lod value in the shape configuration below.

- **Required**: False;
- **Type**: `LodLevel`[]，where `LodLevel` has the following properties:

| Name        | Type               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `zoomRange` | `[number, number]` | The zoom level range defined for this level. When the graph zoom level zoom >= zoomRange[0] && zoom < zoomRange[1], it indicates that the node is in this level                                                                                                                                                                                                                                                                             |
| `primary`   | `boolean`          | Whether it is the primary level. If `true`, it means that the level number is 0. Levels with smaller this `zoomRange` values have decreasing level numbers, while levels with larger this `zoomRange` values have increasing level numbers. In the `NodeDisplayModelData.lodLevels` array, there should be only one level with `primary: true`. And the level number corresponds to the `lod` value in the shape style configurations below |

### NodeDisplayModelData.animates

Configuration of graphic animations when the node appears, disappears, shows, hides, or updates. Supports sequential execution of multiple animations (order). [Animation Demo](/en/examples/scatter/changePosition/#itemAnimates).

- **Required**: False;
- **Type**: `IAnimates`, defined as follows:

```typescript
interface IAnimates {
  buildIn?: IAnimate[]; // Animations when certain graphics are created in the node
  buildOut?: IAnimate[]; // Animations when certain graphics are destroyed in the node
  show?: IAnimate[]; // Animations when certain graphics transition from hidden to visible in the node
  hide?: IAnimate[]; // Animations when certain graphics transition from visible to hidden in the node
  update?: (IAnimate | IStateAnimate)[]; // Animations when certain graphics undergo data or state updates in the node
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

### NodeDisplayModelData.keyShape

Configuration of the main graphic style of the node. The main graphic of a node represents the primary shape of the node and is also used to calculate the position where edges connect.

- **Required**: False;
- **Type**: `ShapeStyle`, which varies depending on the main graphic. For example, the main graphic of `'circle-node'` is `'circle'`, refer to [Circle Graphic Style](../shape/CircleStyleProps.en.md); the main graphic of `'image-node'` is `'image'`, refer to [Image Graphic Style](../shape/ImageStyleProps.en.md).

### NodeDisplayModelData.iconShape

The icon graphic at the center of the node (except for the built-in node type `'modelRect-node'`, which is supported by other built-in nodes and custom nodes that inherit from them without overriding the relevant content). It can be an image or text, with text supporting iconfont (assign `fontFamily: 'iconfont'`).

- **Required**: False;
- **Type**:

```typescript
Partial<
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

### NodeDisplayModelData.haloShape

In built-in nodes and themes, `haloShape` refers to the halo effect graphic displayed around the main graphic (keyShape) of a node when it is in the `active` state (usually triggered when the mouse hovers) or `selected` state (usually triggered when it is selected). In the logic of built-in nodes, the graphic type and color of `haloShape` follow the main graphic (`keyShape`).

- **Required**: False;
- **Type**: `ShapeStyle`, the graphic type of `haloShape` follows the main graphic (`keyShape`). The graphic style configuration varies depending on the main graphic. For example, the main graphic of `'circle-node'` is `'circle'`, refer to [Circle Shape Style](../shape/CircleStyleProps.en.md); the main graphic of `'image-node'` is `'image'`, refer to [Image Shape Style](../shape/ImageStyleProps.en.md).

### NodeDisplayModelData.labelShape

The text shape of the node, both built-in nodes and custom nodes that inherit from built-in nodes (without overriding related content) are supported.

- **Required**: False;
- **Type**:

```typescript
  TextStyleProps & {
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

The related shape style can be referred to in [TextStyleProps](../shape/TextStyleProps.en.md).

### NodeDisplayModelData.labelBackgroundShape

The background shape of the text of the node, which is a rectangle. If not set, it will not be displayed. Setting it to `{}` will use the default style in the theme to display the background shape of the text.

- **Required**: False;
- **Type**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle
};
```

The related rectangle style type can be referred to in [`RectStyleProps`](../shape/RectStyleProps.en.md).

### NodeDisplayModelData.badgeShapes

The badges around the node. A single badge includes text and background shape. The badgeShapes configuration is for multiple badges. [Node Badge Example](/en/examples/item/defaultNodes/#circle).

- **Required**: False;
- **Type**:

```typescript
  {
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
  }
```

The `BadgePosition` values are as follows:

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

### NodeDisplayModelData.anchorShapes

The circular shapes (anchor shapes) of the edges entering each side of the node. The anchorShapes configuration is for multiple anchor shapes. [Node Anchor Example](/en/examples/item/defaultNodes/#circle).

- **Required**: False;
- **Type**:

```typescript
// The outer circleStyleProps can be used to configure the style of all anchor shapes (circles),
// with lower priority than the individual anchor shape configuration
CircleStyleProps & {
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

### NodeDisplayModelData.otherShapes

All the xxShape(s) above are the possible shapes that exist in the G6 defined standard node. Other shapes in custom nodes should be defined and configured in `otherShapes`.

- **Required**: False;
- **Type**:

```typescript
{
  // key is the shape id, in the format of xxShape specified by the specification
  // value is the shape style configuration (different shapes have different configurations, see the relevant shape documents), and the animation of the shape
  [shapeId: string]: ShapeStyleProps;
}
```

The different shape styles can be referred to in the corresponding shape type documentation under the [Shape Style](../shape/BaseStyleProps.en.md) directory.
