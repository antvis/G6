---
title: Contextmenu
---

Contextmenu, also known as the right-click menu , is a menu that appears when a user clicks on a specific area. Supports triggering custom events before and after clicking.

<embed src="@/common/api/plugins/contextmenu.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### className

> _string_ **Default:** `'g6-contextmenu'`

The class name appended to the menu DOM for custom styles

### enable

> _boolean \| ((event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether the plugin is available, determine whether the right-click menu is supported through parameters, The default is all available

### getContent

> _(event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_) =>_ _HTMLElement_ _\| string \|_ _Promise**&lt;**HTMLElement_ _\| string>_

Return the content of menu, support the `Promise` type return value, you can also use `getItems` for shortcut configuration

### getItems

> _(event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_) =>_ _Item\_\_[] \|_ _Promise**&lt;**Item\_\_[]>_

Return the list of menu items, support the `Promise` type return value. It is a shortcut configuration of `getContent`

### loadingContent

> _HTMLElement_ _\| string_

The menu content when loading is used when getContent returns a Promise

### offset

> _[number, number]_ **Default:** `[4, 4]`

The offset X, y direction of the menu

### onClick

> _(value: string, target:_ _HTMLElement\_\_, current:_ _Node \| Edge \| Combo\_\_) => void_

The callback method triggered when the menu is clicked

### trigger

> _'click' \| 'contextmenu'_ **Default:** `'contextmenu'`

How to trigger the context menu

- `'click'` : Click trigger

- `'contextmenu'` : Right-click trigger

## API

### Contextmenu.hide()

Hide the contextmenu

```typescript
hide(): void;
```
