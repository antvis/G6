---
title: Toolbar 工具栏
---

<embed src="@/common/api/plugins/toolbar.md"></embed>

**参考示例**：

- [工具栏](/examples/plugin/toolbar/#basic)
- [自定义工具栏](/examples/plugin/toolbar/#custom)

## 配置项

### <Badge type="success">Required</Badge> type

> _`toolbar` \| string_

此插件已内置，你可以通过 `type: 'toolbar'` 来使用它。

### className

> _string_

给工具栏的 DOM 追加的 classname，便于自定义样式。默认是包含 `g6-toolbar`

### <Badge type="success">Required</Badge> getItems

> _() => ToolbarItem[] \| Promise<ToolbarItem[]>_

返回工具栏的项目列表，支持 `Promise` 类型的返回值

### onClick

> _(value: string, target: Element) => void_

当工具栏被点击后，触发的回调方法

### position

> _'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'_ **Default:** `'top-left'`

Toolbar 的位置，相对于画布，会影响 DOM 的 style 样式

### style

> _CSSStyleDeclaration_

工具栏显式的 style 样式，可以用来设置它相对于画布的位置、背景容器样式等

## API
