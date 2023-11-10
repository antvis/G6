---
title: ComboDisplayModel
order: 12
---

渲染/展示数据的 Combo 类型继承自 [`ComboInnerModel`](./ComboInnerModel.zh.md)，扩展后定义如下：

```typescript
interface ComboDisplayModel {
  id: string | number;
  data: ComboDisplayModelData; // 扩展了 ComboInnerModelData
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

节点的唯一 ID，节点创建后，ID 不可被修改。

## data

DisplayModelData 中的数据已经是 UserInnerModel 通过 Graph 实例上配置的对应 mapper（e.g. 节点为 [specification.node](../graph/Specification.zh.md#node)，边是 [specification.edge](../graph/Specification.zh.md#edge)，combo 是 [specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，这里面应当存储所有 UserInnerModel 的内容，再额外加上许多的图形样式配置。

- **是否必须**: 是；
- **类型**: [`ComboDisplayModelData`](#combodisplaymodeldataxxx)，基于 `ComboInnerModel` 额外扩展内容如下文：

### ComboDisplayModelData.xxx

TODO
