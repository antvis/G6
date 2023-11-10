---
title: NodeDisplayModel
order: 10
---

渲染/展示数据的节点类型继承自 [`NodeInnerModel`](./NodeInnerModel.zh.md)，扩展后定义如下：

```typescript
interface NodeDisplayModel {
  id: string | number;
  data: NodeDisplayModelData; // 扩展了 NodeInnerModelData
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

节点的唯一 ID，节点创建后，ID 不可被修改。

## data

DisplayModelData 中的数据已经是 UserInnerModel 通过 Graph 实例上配置的对应 mapper（e.g. 节点为 [specification.node](../graph/Specification.zh.md#node)，边是 [specification.edge](../graph/Specification.zh.md#edge)，combo 是 [specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，这里面应当存储所有 UserInnerModel 的内容，再额外加上许多的图形样式配置。

- **是否必须**: 是；
- **类型**: [`NodeDisplayModelData`](#nodedisplaymodeldataxxx)，基于 `NodeInnerModel` 额外扩展内容如下文：

### NodeDisplayModelData.xxx

TODO
