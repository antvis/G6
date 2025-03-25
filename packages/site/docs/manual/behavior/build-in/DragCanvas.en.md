---
title: DragCanvas
---

<embed src="@/common/api/behaviors/drag-canvas.md"></embed>

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

Whether to enable the animation of dragging, only valid when using key movement

### direction

> _'x' \| 'y' \| 'both'_ **Default:** ``

Allowed drag direction

- `'x'`: Only allow horizontal drag

- `'y'`: Only allow vertical drag

- `'both'`: Allow horizontal and vertical drag

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性) _\|_ [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)_) => boolean)_ **Default:** `true`

Whether to enable the function of dragging the canvas

### onFinish

> _() => void_

Callback when dragging is completed

### range

> _number \| number[]_ **Default:** `Infinity`

The draggable viewport range allows you to drag up to one screen by default. You can set the range for each direction (top, right, bottom, left) individually, with each direction's range between [0, Infinity]

### sensitivity

> _number_ **Default:** `10`

The distance of a single key movement

### trigger

> _{ up:_ _string[]\_\_; down:_ _string[]\_\_; left:_ _string[]\_\_; right:_ _string[]\_\_; }_

The way to trigger dragging, default to dragging with the pointer pressed

## API

### DragCanvas.destroy()

```typescript
destroy(): void;
```
