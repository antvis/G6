---
title: ScrollCanvas
---

<embed src="@/common/api/behaviors/scroll-canvas.md"></embed>

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

### direction

> _'x' \| 'y'_

The allowed rolling direction

- by default, there is no restriction

- `'x'`: only allow horizontal scrolling

- `'y'`: only allow vertical scrolling

### enable

> _boolean \| ((event:_ _WheelEvent_ _\|_ [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)_) => boolean)_ **Default:** `true`

Whether to enable the function of scrolling the canvas

### onFinish

> _() => void_

Callback when scrolling is completed

### preventDefault

> _boolean_ **Default:** `true`

Whether to prevent the default event

### range

> _number \| number[]_ **Default:** `1`

The scrollable viewport range allows you to scroll up to one screen by default. You can set the range for each direction (top, right, bottom, left) individually, with each direction's range between [0, Infinity]

### sensitivity

> _number_ **Default:** `1`

Scroll sensitivity

### trigger

> _{ up:_ _string[]\_\_; down:_ _string[]\_\_; left:_ _string[]\_\_; right:_ _string[]\_\_; }_

The way to trigger scrolling, default to scrolling with the pointer pressed

## API

### ScrollCanvas.destroy()

Destroy the canvas scrolling

```typescript
destroy(): void;
```
