---
title: NodeInnerModel
order: 6
---

内部流转数据中，每一项节点的类型继承自 [`NodeUserModel`](./NodeUserModel.zh.md)，扩展后定义如下：

```typescript
interface NodeInnerModel {
  id: string | number;
  data: NodeInnerModelData; // 扩展了 NodeUserModelData
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

节点的唯一 ID，节点创建后，ID 不可被修改。

## data

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

- **是否必须**: 是；
- **类型**: [`NodeInnerModelData`](#nodeinnermodeldataxxx)，基于 `NodeUserModel` 额外扩展内容如下文：

### NodeInnerModelData.xxx

TODO
