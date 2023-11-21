### upsertShape

**类型**：`upsertShape`

<details>

<summary style="color: #873bf4; cursor: pointer">upsertShape</summary>

```typescript
type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse' | 'polygon' | 'image' | 'polyline' | 'line' | 'path' | 'text' | 'group';

type SHAPE_TYPE_3D = 'sphere' | 'cube' | 'plane';

type upsertShape = (
  /** 图形类型，小写形式 */
  type: SHAPE_TYPE | SHAPE_TYPE_3D,
  /** 图形 id */
  id: string,
  /** 图形样式 */
  style: object,
  /** 图形 map，key 为图形 id，value 为图形对象 */
  shapeMap: NodeShapeMap | EdgeShapeMap,
  /** 渲染数据 */
  model: NodeDisplayModel | EdgeDisplayModel,
) => /** 图形对象 */
DisplayObject;
```

其中，相关的数据类型定义参考 [NodeDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md) 和 [ComboDisplayModel 渲染数据](../../data/ComboDisplayModel.zh.md)。

</details>

新增[图形](/apis/shape)，如果已存在则更新图形
