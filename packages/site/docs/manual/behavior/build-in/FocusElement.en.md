---
title: FocusElement
---

When an element is clicked, the element is focused to the center of the view.

<embed src="@/common/api/behaviors/focus-element.md"></embed>

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

> [ViewportAnimationEffectTiming](/api/graph#viewportanimationeffecttiming)

Whether to enable animation

### enable

> _boolean \| ((event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether to enable the function of focusing on the element

## API

### FocusElement.destroy()

```typescript
destroy(): void;
```
