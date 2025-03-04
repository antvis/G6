---
title: Snapline 对齐线
---

> 如需深入了解插件的使用，请参阅 [API 文档 - 图配置项 - plugins](/api/graph/option#plugins) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

**参考示例**：

- [对齐线](/examples/plugin/snapline/#basic)
- [支持自动吸附](/examples/plugin/snapline/#autoSnap)

## 配置项

### <Badge type="success">Required</Badge> type

> _`snapline` \| string_

此插件已内置，你可以通过 `type: 'snapline'` 来使用它。

### autoSnap

> _boolean_ **Default:** `true`

是否启用自动吸附

### filter

> _(node: Node) => boolean_ **Default:** ``

过滤器，用于过滤不需要作为参考的节点

### horizontalLineStyle

> _BaseStyleProps_ **Default:** ``

水平对齐线样式

### offset

> _number_ **Default:** `20`

对齐线头尾的延伸距离。取值范围：[0, Infinity]

### shape

> _string \| ((node: Node) => DisplayObject)_ **Default:** ``

指定元素上的哪个图形作为参照图形

- 'key' 使用元素的主图形作为参照图形 - 也可以传入一个函数，接收元素对象，返回一个图形

### tolerance

> _number_ **Default:** `5`

对齐精度，即移动节点时与目标位置的距离小于 tolerance 时触发显示对齐线

### verticalLineStyle

> _BaseStyleProps_ **Default:** ``

垂直对齐线样式

## API

### Snapline.destroy()

```typescript
destroy(): void;
```
