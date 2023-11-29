---
title: ComboModel 内部数据
order: 8
---

ComboModel 为内部流转的 combo 数据，由 ComboUserModel 经过皮质在图实例上的 transforms 计算而得。后续您在任意地方消费的都是这一份数据。每一项 Combo 的类型继承自 [ComboUserModel](./ComboUserModel.zh.md)，扩展后定义如下：

```typescript
interface ComboModel {
  id: string | number;
  data: ComboModelData; // = ComboModelData
}
```

## id <Badge type="error">必须</Badge>

节点的唯一 ID，节点创建后，ID 不可被修改。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

<embed src="../../common/DataAttrTips.zh.md"></embed>

### type

Combo 的渲染类型，可以是已经注册到图类上的 Combo 类型，内置并默认注册的有 `'circle-combo'`，`'rect-combo'`。默认为 `'circle-combo'`。

**类型**： `string`

### visible

Combo 是否默认展示出来。

**类型**： `boolean`

### color

该 Combo 的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 keyShape 以及各种图形的图形样式。

**类型**： `string`

### label

Combo `labelShape` 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 `labelShape` 的 `text` 值或其他图形样式。

**类型**： `string`

<embed src="../../common/DataIcon.en.md"></embed>

### parentId

在有 Combo 的图上表示该 Combo 所属的父亲 Combo 的 id。`undefined` 表示当前 Combo 是一个根。

**类型**： `string | number`
