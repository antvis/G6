---
title: LassoSelect
---

Select a group of elements with an irregular polygon.

<embed src="@/common/api/behaviors/lasso-select.md"></embed>

### animation

> _boolean_ **Default:** `false`

Whether to enable animation.

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether to enable Brush select element function.

### enableElements

> _'node' \| 'edge' \| 'combo'\_\_[]_ **Default:** `['node', 'combo', 'edge']`

Enable Elements type.

### immediately

> _boolean_ **Default:** `false`

Whether to brush select immediately, only valid when the brush select mode is `default`

### mode

> _'union' \| 'intersect' \| 'diff' \| 'default'_ **Default:** `'default'`

Brush select mode

- `'union'`: Keep the current state of the selected elements and add the specified state.

- `'intersect'`: If the selected elements already have the specified state, keep it; otherwise, clearBrush it.

- `'diff'`: Perform a negation operation on the specified state of the selected elements.

- `'default'`: Clear the current state of the selected elements and add the specified state.

### onSelect

> _(states:_ _Record**&lt;**string\_\_,_ _string_ _\|_ _string\_\_[]>) =>_ _Record**&lt;**string\_\_,_ _string_ _\|_ _string\_\_[]>_

Callback when brush select elements.

### state

> _string_ **Default:** `'selected'`

The state to switch to when selected.

### style

> _RectStyleProps_

Timely screening.

### trigger

> _string[]_ **Default:** `['shift']`

Press this shortcut key to apply brush select with mouse click.

Note that setting `trigger` to `['drag']` will cause the `drag-canvas` behavior to fail. The two cannot be configured at the same time.

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
