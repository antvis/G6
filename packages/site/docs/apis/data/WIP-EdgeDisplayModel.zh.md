---
title: EdgeDisplayModel
order: 11
---

边的渲染/展示数据类型继承自 [`EdgeInnerModel`](./EdgeInnerModel.zh.md)，扩展后定义如下：

```typescript
interface EdgeDisplayModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeDisplayModelData; // 扩展了 EdgeInnerModelData
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

边的唯一 ID，节点创建后，ID 不可被修改。

## source

- **是否必须**: 是；
- **类型**: `string|number`

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

## target

- **是否必须**: 是；
- **类型**: `string|number`

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

## data

DisplayModelData 中的数据已经是 UserInnerModel 通过 Graph 实例上配置的对应 mapper（e.g. 节点为 [specification.node](../graph/Specification.zh.md#node)，边是 [specification.edge](../graph/Specification.zh.md#edge)，combo 是 [specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，这里面应当存储所有 UserInnerModel 的内容，再额外加上许多的图形样式配置。

- **是否必须**: 是；
- **类型**: [`EdgeDisplayModelData`](#edgedisplaymodeldatatype)

### EdgeDisplayModelData.xxx

TODO
