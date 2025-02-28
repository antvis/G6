---
title: Contextmenu 上下文菜单
---

> 如需深入了解插件的使用，请参阅 [API 文档 - 图配置项 - plugins](/api/graph/option#plugins) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

上下文菜单，也被称为右键菜单，是当用户在某个特定区域上点击后出现的一个菜单。支持在点击前后，触发自定义事件。

<embed src="@/common/api/plugins/contextmenu.md"></embed>

**参考示例**：

- [上下文菜单](/examples/plugin/contextMenu/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`contextmenu` \| string_

此插件已内置，你可以通过 `type: 'contextmenu'` 来使用它。

### className

> _string_ **Default:** `'g6-contextmenu'`

给菜单的 DOM 追加的类名

### enable

> _boolean \| ((event: [IElementEvent](/manual/graph-api/event#事件对象属性)) => boolean)_ **Default:** `true`

是否可用，通过参数判断是否支持右键菜单，默认是全部可用

### getContent

> _(event: [IElementEvent](/manual/graph-api/event#事件对象属性) ) => HTMLElement \| string \| Promise<HTMLElement \| string>_

返回菜单的内容，支持 `Promise` 类型的返回值，也可以使用 `getItems` 进行快捷配置

### getItems

> _(event: [IElementEvent](/manual/graph-api/event#事件对象属性)) => Item[] \| Promise<Item[]>_

返回菜单的项目列表，支持 `Promise` 类型的返回值。是 `getContent` 的快捷配置

### loadingContent

> _HTMLElement \| string_

当 `getContent` 返回一个 `Promise` 时，使用的菜单内容

### offset

> _[number, number]_ **Default:** `[4, 4]`

菜单显式 X、Y 方向的偏移量

### onClick

> _(value: string, target: HTMLElement, current: Node \| Edge \| Combo) => void_

当菜单被点击后，触发的回调方法

### trigger

> _'click' \| 'contextmenu'_ **Default:** `'contextmenu'`

如何触发右键菜单

- `'click'` : 点击触发

- `'contextmenu'` : 右键触发

## API

### Contextmenu.hide()

隐藏上下文菜单

```typescript
hide(): void;
```
