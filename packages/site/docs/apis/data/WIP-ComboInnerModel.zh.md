---
title: ComboInnerModel
order: 8
---

内部流转数据中，每一项 Combo 的类型继承自 [`ComboUserModel`](./ComboUserModel.zh.md)，扩展后定义如下：

```typescript
interface ComboInnerModel {
  id: string | number;
  data: ComboInnerModelData; // 扩展了 ComboUserModelData
}
```

## id

- **是否必须**: 是；
- **类型**: `string|number`

节点的唯一 ID，节点创建后，ID 不可被修改。

## data

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

- **是否必须**: 是；
- **类型**: [`ComboInnerModelData`](#comboinnermodeldataxxx)，基于 `ComboUserModel` 额外扩展内容如下文：

### ComboInnerModelData.xxx

TODO
