### upsertShape

Add a [shape](/apis/shape) if it does not exist, or update it if it exists.

```ts
(
  /** Shape type, in lowercase */
  shapeType: string,
  /** Shape id */
  shapeId: string,
  /** Shape style */
  style: object,
  /** Shape map, key is the shape id, value is the shape object */
  shapeMap: NodeShapeMap | EdgeShapeMap,
  /** rendering data */
  model: NodeDisplayModel | EdgeDisplayModel,
) => DisplayObject;
```
