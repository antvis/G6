---
title: Toolbar
---

<embed src="@/common/api/plugins/toolbar.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### className

> _string_

The classname appended to the menu DOM for custom styles. The default is `g6-toolbar`

### <Badge type="success">Required</Badge> getItems

> _() =>_ _ToolbarItem\_\_[] \|_ _Promise**&lt;**ToolbarItem\_\_[]>_

Return the list of toolbar items, support return a `Promise` as items

### onClick

> _(value: string, target:_ _Element\_\_) => void_

The callback method triggered when the toolbar item is clicked

### position

> _'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'_ **Default:** `'top-left'`

The position of the Toolbar relative to the canvas, which will affect the style of the DOM

### style

> _Partial**&lt;**CSSStyleDeclaration\_\_>_

The style style of the Toolbar, which can be used to set its position relative to the canvas

## API
