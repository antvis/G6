---
title: NodeDisplayModel
order: 10
---

NodeDisplayModel is the result of NodeModel (internal data) through [data mapping](/en/apis/data/data-intro#mappers-data-mapping), which can only be accessed by G6.

## id <Badge type="error">Required</Badge>

**Type**: `string | number`

The unique ID of the node. Once the node is created, the ID cannot be modified.

## data <Badge type="error">Required</Badge>

NodeDisplayModelData adds graphic style configuration on the basis of [NodeModel](./NodeModel.en.md).

<embed src="../../common/DataAttrTips.en.md"></embed>

<embed src="../../common/LodLevels.en.md"></embed>

### animates

Configuration of shape animations when the node appears, disappears, shows, hides, or updates. Supports sequential execution of multiple animations (order). [Animation Demo](/en/examples/scatter/changePosition/#itemAnimates).

**Type**: `IAnimates`

<embed src="../../common/IAnimates.en.md"></embed>

### keyShape

Configuration of the main shape style of the node. The main shape of a node represents the primary shape of the node and is also used to calculate the position where edges connect.

**Type**: `ShapeStyle`, which varies depending on the main shape. For example, the main shape of `'circle-node'` is `'circle'`, refer to [Circle Graphic Style](/en/apis/shape/circle-style-props); the main shape of `'image-node'` is `'image'`, refer to [Image Graphic Style](/en/apis/shape/image-style-props).

### iconShape

The icon shape at the center of the node (except for the built-in node type `'modelRect-node'`, which is supported by other built-in nodes and custom nodes that inherit from them without overriding the relevant content). It can be an image or text, with text supporting iconfont (assign `fontFamily: 'iconfont'`).

**Type**:

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

Where the relevant shape styles refer to [TextStyleProps](/en/apis/shape/text-style-props) and [ImageStyleProps](/en/apis/shape/image-style-props).

### haloShape

In built-in nodes and themes, `haloShape` refers to the halo effect shape displayed around the main shape (keyShape) of a node when it is in the `active` state (usually triggered when the mouse hovers) or `selected` state (usually triggered when it is selected). In the logic of built-in nodes, the shape type and color of `haloShape` follow the main shape (`keyShape`).

**Type**: `ShapeStyle`, the shape type of `haloShape` follows the main shape (`keyShape`). The shape style configuration varies depending on the main shape.

<embed src="../../common/LabelShape.en.md"></embed>

### labelBackgroundShape

The background shape of the text of the node, which is a rectangle. If not set, it will not be displayed. Setting it to `{}` will use the default style in the theme to display the background shape of the text.

**Type**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle
};
```

The related rectangle style type can be referred to in [RectStyleProps](/en/apis/shape/rect-style-props).

<embed src="../../common/BadgeShapes.en.md"></embed>

### anchorShapes

The circular shapes (anchor shapes) of the edges entering each side of the node. The anchorShapes configuration is for multiple anchor shapes. [Node Anchor Example](/en/examples/item/defaultNodes/#circle).

**Type**:

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

The related circle style can be referred to in [CircleStyleProps](/en/apis/shape/circle-style-props).

### otherShapes

All the xxShape(s) above are the possible shapes that exist in the G6 defined standard node. Other shapes in custom nodes should be defined and configured in `otherShapes`.

**Type**:

```typescript
{
  // key is the shape id, in the format of xxShape specified by the specification
  // value is the shape style configuration (different shapes have different configurations, see the relevant shape documents), and the animation of the shape
  [shapeId: string]: ShapeStyleProps;
}
```

The different shape styles can be referred to in the corresponding shape type documentation under the [Shape Style](/en/apis/shape/overview) directory.
