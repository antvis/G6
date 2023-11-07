---
title: ComboUserModelData
order: 5
---

用户输入数据中，每一项 Combo 数据的 data 部分的类型说明如下。

## 属性

### type

- 是否必须：`否`；
- 类型： `string`；

Combo 的渲染类型，可以是已经注册到图类上的 Combo 类型，内置并默认注册的有 `'circle-node'`，`'rect-node'`，`'image-node'`。

### visible

- 是否必须：`否`；
- 类型： `boolean`；

• `Optional` **visible**: `boolean`

Combo 是否默认展示出来。

### color

- 是否必须：`否`；
- 类型： `string`；

该 Combo 的主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 keyShape 以及各种图形的图形样式。

### label

- 是否必须：`否`；
- 类型： `string`；

Combo labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 labelShape 的 text 值或其他图形样式。

### icon

- 是否必须：`否`；
- 类型：

```typescript
{
  type: 'text' | 'icon',
  img?: string, // type 为 'text' 时需要提供
  text?: string, // type 为 'icon' 时需要提供
}
```

Combo 上的 icon 配置。内置 Combo 的 icon 绘制在文本后方。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的 Combo mapper 中配置 iconShape 的图形样式。

### parentId

- 是否必须：`否`；
- 类型： `string | number`；

在有 Combo 的图上表示该 Combo 所属的父亲 Combo 的 id。
