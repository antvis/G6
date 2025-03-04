---
title: Tooltip 提示框
---

<embed src="@/common/api/plugins/tooltip.md"></embed>

**参考示例**：

- [提示框](/examples/plugin/tooltip/#basic)
- [点击触发 Tooltip](/examples/plugin/tooltip/#click)
- [鼠标移入和点击同一元素时显示不同的提示框](/examples/plugin/tooltip/#dual)

## 配置项

### <Badge type="success">Required</Badge> type

> _`tooltip` \| string_

此插件已内置，你可以通过 `type: 'tooltip'` 来使用它。

### enable

> _boolean \| ((event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => boolean)_ **Default:** `true`

是否启用

### getContent

> _(event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => Promise<HTMLElement \| string>_

自定义内容

### <Badge type="success">Required</Badge> onOpenChange

> _(open: boolean) => void_

显示隐藏的回调

### trigger

> _'hover' \| 'click'_ **Default:** `'hover`

触发行为

- `'hover'`：鼠标移入元素时触发
- `'click'`：鼠标点击元素时触发

## API
