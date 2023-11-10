---
title: EdgeDisplayModel
order: 11
---

EdgeDisplayModel (edge rendering/display data) is the result of mapping the EdgeModel (internal flow data) configured on the graph instance using the mapper ([specification.edge](../graph/Specification.en.md#edge)). It is only consumed internally for rendering and will not be consumed anywhere else. The data type inherits from the [`EdgeModel`](./EdgeModel.en.md) data type [`EdgeModel`](./EdgeModel.en.md) and is extended as follows:

```typescript
interface EdgeDisplayModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeDisplayModelData; // extends EdgeModelData
}
```

## id

The unique ID of the edge. Once the edge is created, the ID cannot be modified.

- **Required**: True;
- **Type**: `string|number`

## source

The ID of the source node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

- **Required**: True;
- **Type**: `string|number`

## target

The ID of the target node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

- **Required**: True;
- **Type**: `string|number`

## data

The data in EdgeDisplayModelData is the result of the EdgeModel being mapped through the mapper ([specification.edge](../graph/Specification.en.md#edge)) configured on the Graph instance. It should store all the contents of the EdgeModel, as well as many graphic style configurations.

- **Required**: True;
- **Type**: [`EdgeDisplayModelData`](#EdgeDisplayModelDatalodlevels)，extended from [`EdgeModel`](./EdgeModel.en.md#edgemodeldatatype) with additional content as described below:

### EdgeDisplayModelData.lodLevels

Specifies how the graph zoom levels are divided for this edge. It is an array of zoom level ranges, representing the division of zoom levels. One of them should have `primary` set to `true`, indicating that the index of this level is 0. lodLevels with `zoomRange` smaller than the current zoom level should have decreasing indices, while those with `zoomRange` larger than the current zoom level should have increasing indices. The index corresponds to the value of `lod` in the graphic configuration below.

- **Required**: False;
- **Type**: `LodLevel`[], where `LodLevel` is as follows:

| Name        | Type               | Description                                                                                                                                                                                                                                                                                                                                                                   |
| :---------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zoomRange` | `[number, number]` | The range of zoom levels defined for this level. When the graph zoom level zoom >= zoomRange[0] && zoom < zoomRange[1], it means it is at this level                                                                                                                                                                                                                          |
| `primary`   | `boolean`          | Whether it is the primary level. If `true`, it means the index of this level is 0. The indices of levels smaller than the current level decrease, while those larger than the current level increase. There should be only one level with `primary: true` in `EdgeDisplayModelData.lodLevels`. The index corresponds to the value of `lod` in the graphic configuration below |

### EdgeDisplayModelData.animates

Animations for the appearance, disappearance, display, hiding, and updating of various graphics in the edge. Supports sequential execution of multiple animations in one update (order). [Animation Demo](/en/examples/scatter/changePosition/#itemAnimates).

- **Required**: False;
- **Type**: `IAnimates`, defined as follows:

```typescript
interface IAnimates {
  buildIn?: IAnimate[]; // Animation when certain graphics in the edge are created
  buildOut?: IAnimate[]; // Animation when certain graphics in the edge are destroyed
  show?: IAnimate[]; // Animation when certain graphics in the edge transition from hidden to visible
  hide?: IAnimate[]; // Animation when certain graphics in the edge transition from visible to hidden
  update?: (IAnimate | IStateAnimate)[]; // Animation when certain graphics in the edge are updated based on related data or states
}
```

Among them, `IAnimate` is defined as follows:

| Name                   | Type       | Default                                      | Description                                                                                                                                                                                  |
| :--------------------- | :--------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IAnimate.fields`      | `string[]` | `undefined`                                  | The names of the graphic style properties related to this animation, for example, `['fill', 'lineWidth']`                                                                                    |
| `IAnimate.shapeId`     | `string`   | `group`                                      | The ID of the graphic on which this animation is to be performed. If not specified, it means the animation is performed on the entire graphic group                                          |
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

### EdgeDisplayModelData.keyShape

The style configuration of the key shape of the edge. The key shape of the edge is the overall path shape of the edge.

- **Required**: False;
- **Type**: `ShapeStyle`, the shape style configuration of the key shape depends on the different main shapes. For example, the key shape of `'line-edge'` is `'line'`, please refer to [Line shape style](../shape/LineStyleProps.en.md); the key shape of `'cubic-edge'` is `'path'`, please refer to [Path shape style](../shape/PathStyleProps.en.md).

### EdgeDisplayModelData.iconShape

The icon shape of the edge (built-in edge support, custom edges that inherit these built-in edges also support it without overriding the relevant content). It is located in front of the text. It can be an image or text, and text supports iconfont.

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

Among them, the related graphics styles refer to [`TextStyleProps`text shape style](../shape/TextStyleProps.en.md) and [`ImageStyleProps` image shape style](../shape/ImageStyleProps.en.md).

### EdgeDisplayModelData.haloShape

In built-in edges and themes, `haloShape` refers to the halo effect displayed around the key shape (`keyShape`) of the edge in the `active` state (usually triggered when the mouse hovers over) and the `selected` state (usually triggered in the selected state). In the logic of built-in edges, the graphic type and color of `haloShape` follow the key shape (`keyShape`).

- **Required**: False;
- **Type**: `ShapeStyle`, the graphic type of haloShape follows the key shape (`keyShape`). The shape style configuration is different for different main shapes. For example, the key shape of `'line-edge'` is `'line'`, please refer to [Line shape style](../shape/LineStyleProps.en.md); the key shape of `'cubic-edge'` is `'path'`, please refer to [Path shape style](../shape/PathStyleProps.en.md).

### EdgeDisplayModelData.labelShape

The text shape of the edge, both built-in edges and custom edges that inherit the built-in edges (without overriding the relevant content) support it.

- **Required**: False;
- **Type**:

```typescript
  TextStyleProps & {
    /**
     * The position of the text relative to the key shape (keyShape) of the edge, which supports the start, middle, and end of the edge
     */
    position?: 'start' | 'middle' | 'end';
    /**
     * The offset of the text shape relative to the key shape (keyShape) of the edge in the x direction
     */
    offsetX?: number;
    /**
     * The offset of the text shape relative to the key shape (keyShape) of the edge in the y direction
     */
    offsetY?: number;
    /**
     * The offset of the text shape relative to the key shape (keyShape) of the edge in the z direction
     */
    offsetZ?: number;
    /**
     * The maximum width allowed for the text, if specified as a number, it represents the pixel value, if specified as text with '%', it represents the percentage of the size of the key shape (keyShape). The default value is '60%', which means that the maximum width of the text shape cannot exceed twice the width of the key shape. If it exceeds, it will be automatically truncated and an ellipsis '...' will be added at the end.
     */
    maxWidth?: string | number;
    /**
     * Whether the text rotates with the edge
     */
    autoRotate?: boolean;
  };
```

Among them, the related graphic styles refer to [TextStyleProps text shape style](../shape/TextStyleProps.en.md).

### EdgeDisplayModelData.labelBackgroundShape

The background shape of the text of the edge, which is a rectangle. If not set, it will not be displayed. Setting it to `{}` will use the default style in the theme to display the background shape of the text.

- **Required**: False;
- **Type**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle
};
```

Among them, please refer to the rectangle style type [`RectStyleProps`](../shape/RectStyleProps.en.md).

### EdgeDisplayModelData.

The badge of the edge, including text and background shape. Unlike nodes that support multiple badges, the built-in edge only supports one badge, which is located behind the text.

- **Required**: False;
- **Type**:

```typescript
  ShapeStyleProps & {
    /**
     * The background color of the badge
     */
    color?: string;
    /**
     * The color of the text on the badge
     */
    textColor?: string;
  }
```

### EdgeDisplayModelData.otherShapes

上面所有的 xxShape(s) 均为 G6 All the xxShape(s) mentioned above are possible graphics in the standard edge defined by G6. Other graphics in custom edges should be defined and configured in `otherShapes`.

- **Required**: False;
- **Type**:

```typescript
{
  // The key is the graphic id, the format specified by the specification is xxShape
  // The value is the graphic style configuration (different graphics have different configurations, see the relevant graphics documentation) and the animation of the graphic
  [shapeId: string]: ShapeStyleProps;
}
```

Among them, different graphic styles refer to the corresponding graphic type documents under the [Shape Style](../shape/BaseStyleProps.en.md) directory.
