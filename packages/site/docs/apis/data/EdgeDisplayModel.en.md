---
title: EdgeDisplayModel
order: 11
---

EdgeDisplayModel (edge rendering/display data) is the result of mapping the EdgeModel (internal flow data) configured on the graph instance using the mapper ([specification.edge](../graph/Specification.en.md#edge)). It is only consumed internally for rendering and will not be consumed anywhere else. The data type inherits from the [EdgeModel](./EdgeModel.en.md) data type [EdgeModel](./EdgeModel.en.md) and is extended as follows:

```typescript
interface EdgeDisplayModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeDisplayModelData; // extends EdgeModelData
}
```

## id <Badge type="error">Required</Badge>

The unique ID of the edge. Once the edge is created, the ID cannot be modified.

**Type**: `string | number`

## source <Badge type="error">Required</Badge>

The ID of the source node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

**Type**: `string | number`

## target <Badge type="error">Required</Badge>

The ID of the target node of the edge. It should correspond to an item in `nodes`, otherwise the edge data will not be added to the graph.

**Type**: `string | number`

## data <Badge type="error">Required</Badge>

The data in EdgeDisplayModelData is the result of the EdgeModel being mapped through the mapper ([specification.edge](../graph/Specification.en.md#edge)) configured on the Graph instance. It should store all the contents of the EdgeModel, as well as many shape style configurations.

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.en.md"></embed>

### animates

Animations for the appearance, disappearance, display, hiding, and updating of various shapes in the edge. Supports sequential execution of multiple animations in one update (order). [Animation Demo](/en/examples/scatter/changePosition/#itemAnimates).

**Type**: `IAnimates`

<embed src="../../common/IAnimates.en.md"></embed>

### keyShape

The style configuration of the key shape of the edge. The key shape of the edge is the overall path shape of the edge.

**Type**: `ShapeStyle`, the shape style configuration of the key shape depends on the different main shapes. For example, the key shape of `'line-edge'` is `'line'`, please refer to [LineStyleProps](/en/apis/shape/line-style-props); the key shape of `'cubic-edge'` is `'path'`, please refer to [PathStyleProps](/en/apis/shape/path-style-props).

### iconShape

The icon shape of the edge (built-in edge support, custom edges that inherit these built-in edges also support it without overriding the relevant content). It is located in front of the text. It can be an image or text, and text supports iconfont.

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

Among them, the related shapes styles refer to [TextStyleProps](/en/apis/shape/text-style-props) and [ImageStyleProps](/en/apis/shape/image-style-props).

### haloShape

In built-in edges and themes, `haloShape` refers to the halo effect displayed around the key shape (`keyShape`) of the edge in the `active` state (usually triggered when the mouse hovers over) and the `selected` state (usually triggered in the selected state). In the logic of built-in edges, the shape type and color of `haloShape` follow the key shape (`keyShape`).

**Type**: `ShapeStyle`, the shape type of haloShape follows the key shape (`keyShape`). The shape style configuration is different for different main shapes. For example, the key shape of `'line-edge'` is `'line'`, please refer to [LineStyleProps](/en/apis/shape/line-style-props); the key shape of `'cubic-edge'` is `'path'`, please refer to [PathStyleProps](/en/apis/shape/path-style-props).

<embed src="../../common/LabelShape.en.md"></embed>

### labelBackgroundShape

The background shape of the text of the edge, which is a rectangle. If not set, it will not be displayed. Setting it to `{}` will use the default style in the theme to display the background shape of the text.

**Type**:

```typescript
ShapeStyle & {
  padding?: number | number[]; // The padding distance between the text and the background rectangle
};
```

Among them, please refer to the rectangle style type [RectStyleProps](/en/apis/shape/rect-style-props).

###

The badge of the edge, including text and background shape. Unlike nodes that support multiple badges, the built-in edge only supports one badge, which is located behind the text.

**Type**:

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

### otherShapes

上面所有的 xxShape(s) 均为 G6 All the xxShape(s) mentioned above are possible shapes in the standard edge defined by G6. Other shapes in custom edges should be defined and configured in `otherShapes`.

**Type**:

```typescript
{
  // The key is the shape id, the format specified by the specification is xxShape
  // The value is the shape style configuration (different shapes have different configurations, see the relevant shapes documentation) and the animation of the shape
  [shapeId: string]: ShapeStyleProps;
}
```

Among them, different shape styles refer to the corresponding shape type documents under the [ShapeStyleProps](/en/apis/shape/overview) directory.
