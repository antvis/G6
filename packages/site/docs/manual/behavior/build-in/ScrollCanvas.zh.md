---
title: ScrollCanvas 滚动画布
---

<embed src="@/common/api/behaviors/scroll-canvas.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`scroll-canvas` \| string_

此插件已内置，你可以通过 `type: 'scroll-canvas'` 来使用它。

### direction

> _'x' \| 'y'_

允许的滚动方向

- 默认情况下没有限制

- `'x'` : 只允许水平滚动

- `'y'` : 只允许垂直滚动

### enable

> _boolean \| ((event:_ _WheelEvent_ _\|_ [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)_) => boolean)_ **Default:** `true`

是否启用滚动画布的功能

### onFinish

> _() => void_

完成滚动时的回调

### preventDefault

> _boolean_ **Default:** `true`

是否阻止默认事件

### range

> _number \| number[]_ **Default:** `1`

可滚动的视口范围，默认最多可滚动一屏。可以分别设置上、右、下、左四个方向的范围，每个方向的范围在 [0, Infinity] 之间

### sensitivity

> _number_ **Default:** `1`

滚动灵敏度

### trigger

> _{ up:_ _string[]\_\_; down:_ _string[]\_\_; left:_ _string[]\_\_; right:_ _string[]\_\_; }_

触发滚动的方式，默认使用指针滚动

## API

### ScrollCanvas.destroy()

销毁画布滚动

```typescript
destroy(): void;
```
