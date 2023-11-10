---
title: ComboModel 内部数据
order: 8
---

ComboModel 为内部流转的 combo 数据，由 ComboUserModel 经过皮质在图实例上的 transforms 计算而得。后续您在任意地方消费的都是这一份数据。每一项 Combo 的类型继承自 [`ComboUserModel`](./ComboUserModel.zh.md)，扩展后定义如下：

```typescript
interface ComboModel {
  id: string | number;
  data: ComboModelData; // = ComboModelData
}
```

## id

节点的唯一 ID，节点创建后，ID 不可被修改。

- **是否必须**: 是；
- **类型**: `string|number`

## data

InnerModelData 中的数据已经是 UserModelData 通过 Graph 实例的一系列 transform 函数生成的结果，业务数据可能已经被转换、过滤、合并。

- **是否必须**: 是；
- **类型**: `ComboModelData`，同 [`ComboUserModel`](./ComboUserModel.zh.md#ComboModelDatatype) 定义如下：

### ComboModelData.type

Combo 的渲染类型，可以是已经注册到图类上的 Combo 类型，内置并默认注册的有 `'circle-combo'`，`'rect-combo'`。默认为 `'circle-combo'`。

- **是否必须**：否;
- **类型**： `string`；

### ComboModelData.visible

Combo 是否默认展示出来。

- **是否必须**：否;
- **类型**： `boolean`；

### ComboModelData.color

该 Combo 的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 keyShape 以及各种图形的图形样式。

- **是否必须**：否;
- **类型**： `string`；

### ComboModelData.label

Combo `labelShape` 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 `labelShape` 的 `text` 值或其他图形样式。

- **是否必须**：否;
- **类型**： `string`；

### ComboModelData.icon

Combo 上的 icon 配置。内置 Combo 的 icon 绘制在文本后方。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 iconShape 的图形样式。

- **是否必须**：否;
- **类型**：

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

### ComboModelData.parentId

在有 Combo 的图上表示该 Combo 所属的父亲 Combo 的 id。`undefined` 表示当前 Combo 是一个根。

- **是否必须**：否;
- **类型**： `string | number`；
