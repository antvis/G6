### upsertShape

**Type**: `upsertShape`

<details>

<summary style="color: #873bf4; cursor: pointer">upsertShape</summary>

```typescript
type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse' | 'polygon' | 'image' | 'polyline' | 'line' | 'path' | 'text' | 'group';

type SHAPE_TYPE_3D = 'sphere' | 'cube' | 'plane';

type upsertShape = (
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

</details>

Add a [shape](/apis/shape) if it does not exist, or update it if it exists.
