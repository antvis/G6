---
title: ComboUserModel 输入数据
order: 5
---

用户输入数据中，每一项 Combo 数据类型说明如下。

```typescript
interface ComboUserModel {
  id: string | number;
  data: NodeUserModelData;
}
```

## id <Badge type="error">必须</Badge>

Combo 的唯一 ID，Combo 创建后，ID 不可被修改。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

**类型**：[ComboUserModelData](#combousermodeldatatype)

Combo 除 ID 以外的的数据，建议存放业务数据。若需要进行数据转换，可通过 Graph 实例的 transform 配置转换函数，见 [Specification.transforms](../graph/Specification.zh.md#transforms)转换后的数据成为内部流通的数据 Inner Data，后续所有地方获取的都是这份内部数据。与渲染有关的可以通过 Graph 实例的 combo mapper 进行映射，见 [Specification.combo](../graph/Specification.zh.md#combo)，该 mapper 的输入是 Inner Data，生成的结果 Display Data 只交给渲染器消费，用户不会在任何地方获得。

<embed src="../../common/DataAttrTips.zh.md"></embed>

### type

Combo 的渲染类型，可以是已经注册到图类上的 Combo 类型，内置并默认注册的有 `'circle-combo'`，`'rect-combo'`。

**类型**： `string`

### visible

Combo 是否默认展示出来。

**类型**： `boolean`

### color

该 Combo 的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 keyShape 以及各种图形的图形样式。

**类型**： `string`

### label

Combo labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 labelShape 的 text 值或其他图形样式。

**类型**： `string`

<embed src="../../common/DataIcon.zh.md"></embed>

### parentId

在有 Combo 的图上表示该 Combo 所属的父亲 Combo 的 id。

**类型**： `string | number`
