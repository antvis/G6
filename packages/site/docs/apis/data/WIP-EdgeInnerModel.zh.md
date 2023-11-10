---
title: EdgeInnerModel
order: 8
---

内部流转数据中，每一项边的类型继承自 [`EdgeUserModel`](./EdgeUserModel.zh.md)，扩展后定义如下：

```typescript
interface EdgeInnerModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeInnerModelData; // 扩展了 EdgeUserModelData
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

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

- **是否必须**: 是；
- **类型**: [`EdgeInnerModelData`](#edgeinnermodeldatatype)

### EdgeInnerModelData.xxx

TODO
