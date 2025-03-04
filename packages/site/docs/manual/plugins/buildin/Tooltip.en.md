---
title: Tooltip
---

<embed src="@/common/api/plugins/tooltip.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### enable

> _boolean \| ((event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_, items:_ _NodeData \| EdgeData \| ComboData\_\_[]) => boolean)_ **Default:** `true`

Is enable

### getContent

> _(event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_, items:_ _NodeData \| EdgeData \| ComboData\_\_[]) =>_ _Promise**&lt;**HTMLElement_ _\| string>_

Function for getting tooltip content

### <Badge type="success">Required</Badge> onOpenChange

> _(open: boolean) => void_

Callback executed when visibility of the tooltip card is changed

### trigger

> _'hover' \| 'click'_ **Default:** `'hover`

Trigger behavior, optional hover \| click

- `'hover'`：mouse hover element

- `'click'`：mouse click element

## API
