---
title: Fullscreen
---

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### autoFit

> _boolean_ **Default:** `true`

Whether to adapt the canvas size

### onEnter

> _() => void_

Callback after entering full screen

### onExit

> _() => void_

Callback after exiting full screen

### trigger

> _{ request?:_ _string[]\_\_; exit?:_ _string[]\_\_; }_

The way to trigger full screen

- `request`: request full screen

- `exit`: exit full screen

## API

### Fullscreen.destroy()

```typescript
destroy(): void;
```

### Fullscreen.exit()

Exit full screen

```typescript
exit(): void;
```

### Fullscreen.request()

Request full screen

```typescript
request(): void;
```
