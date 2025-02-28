---
title: ClickSelect
---

When the mouse clicks on an element, you can activate the state of the element, such as selecting nodes or edges. When the degree is 1, clicking on a node will highlight the current node and its directly adjacent nodes and edges.

## Options

### key

> _string_

Behavior key, that is, the unique identifier

Used to identify the behavior for further operations

```typescript
// Update behavior options
graph.updateBehavior({key: 'key', ...});
```

### <Badge type="success">Required</Badge> type

> _string_

Behavior type

### animation

> _boolean_ **Default:** `true`

Whether to enable animation

### degree

> _number \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => number)_ **Default:** `0`

The degree to determine the scope of influence

For nodes, `0` means only the current node is selected, `1` means the current node and its directly adjacent nodes and edges are selected, etc.

For edges, `0 `means only the current edge is selected,`1` means the current edge and its directly adjacent nodes are selected, etc.

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether to enable the function of clicking the element

Whether to enable can be dynamically controlled by functions, such as only when nodes are selected.

```typescript
{
  enable: (event) => event.targetType === 'node';
}
```

### multiple

> _boolean_ **Default:** `false`

Whether to allow multiple selection

### neighborState

> _string_ **Default:** `'selected'`

The state to be applied to the neighboring elements within n degrees when an element is selected. The value of n is controlled by the degree property, for instance, a degree of 1 indicates direct neighbors

### onClick

> _(event:_ [Event](/manual/graph-api/event#事件对象属性)_) => void_

Callback when the element is clicked

### state

> _string_ **Default:** `'selected'`

The state to be applied when an element is selected

### trigger

> _string[]_ **Default:** `['shift']`

Press this shortcut key to apply multiple selection with mouse click

### unselectedState

> _string_

The state to be applied to all unselected elements when some elements are selected, excluding the selected element and its affected neighbors

## API

### ClickSelect.destroy()

```typescript
destroy(): void;
```
