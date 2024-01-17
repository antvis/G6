### otherShapes

**Type**: `OtherShapes`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    OtherShapes
  </summary>
 
```ts
type OtherShapes = {
  // key is the shape id, with the format of xxShape
  // value is the shape style configuration and animation configuration
  [shapeId: string]: ShapeStyleProps;
}
```
</details>

- [ShapeStyle](/en/apis/shape/overview)

Shapes that may exist in custom nodes but not in the G6 defined standard node. Other shapes in custom nodes should be defined and configured in `otherShapes`.
