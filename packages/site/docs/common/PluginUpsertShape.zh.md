### upsertShape

新增[图形](/apis/shape)，如果已存在则更新图形

```ts
(
  /** 图形类型，小写形式 */
  shapeType: string,
  /** 图形 id */
  shapeId: string,
  /** 图形样式 */
  style: object,
  /** 图形 map，key 为图形 id，value 为图形对象 */
  shapeMap: NodeShapeMap | EdgeShapeMap,
  /** 渲染数据 */
  model: NodeDisplayModel | EdgeDisplayModel,
) =>
  /** 图形对象 */
  DisplayObject;
```
