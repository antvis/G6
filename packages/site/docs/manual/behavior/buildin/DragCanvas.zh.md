---
title: DragCanvas 拖拽画布
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

<embed src="@/common/api/behaviors/drag-canvas.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`drag-canvas` \| string_

此插件已内置，你可以通过 `type: 'drag-canvas'` 来使用它。

### animation

> [ViewportAnimationEffectTiming](/api/graph/option#viewportanimationeffecttiming)

是否启用拖拽动画，仅在使用按键移动时有效

### direction

> _'x' \| 'y' \| 'both'_ **Default:** ``

允许拖拽方向

- `'x'`: 只允许水平拖拽

- `'y'`: 只允许垂直拖拽

- `'both'`: 不受限制，允许水平和垂直拖拽

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性) _\|_ [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)_) => boolean)_ **Default:** `true`

是否启用拖拽画布的功能

### onFinish

> _() => void_

完成拖拽时的回调

### range

> _number \| number[]_ **Default:** `Infinity`

可拖拽的视口范围，默认最多可拖拽一屏。可以分别设置上、右、下、左四个方向的范围，每个方向的范围在 [0, Infinity] 之间

### sensitivity

> _number_ **Default:** `10`

触发一次按键移动的距离

### trigger

> _{ up:_ _string[]\_\_; down:_ _string[]\_\_; left:_ _string[]\_\_; right:_ _string[]\_\_; }_

触发拖拽的方式，默认使用指针按下拖拽

## API

### DragCanvas.destroy()

```typescript
destroy(): void;
```
