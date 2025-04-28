---
title: ZoomCanvas
---

<embed src="@/common/api/behaviors/zoom-canvas.md"></embed>

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

> [ViewportAnimationEffectTiming](/api/graph#viewportanimationeffecttiming) **Default:** `' duration: 200 '`

Whether to enable the animation of zooming

### enable

> _boolean \| ((event: [Event](/manual/graph-api/event#事件对象属性)_) => boolean)\_ **Default:** `true`

Whether to enable the function of zooming the canvas

### origin

> [Point](/api/viewport#point)

Zoom center point (viewport coordinates)

### onFinish

> _() => void_

Callback when zooming is completed

### preventDefault

> _boolean_ **Default:** `true`

Whether to prevent the default event

### sensitivity

> _number_ **Default:** `1`

Zoom sensitivity

### trigger

> _string[]_ _\| { zoomIn:_ _string[]; zoomOut:_ _string[]; reset:_ _string[]; }_

The way to trigger zoom

- ShortcutKey: Combination shortcut key, \*\*default to zoom with the mouse wheel\*\*, ['Control'] means zooming when holding down the Control key and scrolling the mouse wheel

- CombinationKey: Zoom shortcut key, such as { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] }

## API

### ZoomCanvas.destroy()

Destroy zoom canvas

```typescript
destroy(): void;
```
