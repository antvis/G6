---
title: ZoomCanvas 缩放画布
---

<embed src="@/common/api/behaviors/zoom-canvas.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`zoom-canvas` \| string_

此插件已内置，你可以通过 `type: 'zoom-canvas'` 来使用它。

### animation

> [ViewportAnimationEffectTiming](/manual/graph/option#viewportanimationeffecttiming) **Default:** `' duration: 200 '`

是否启用缩放动画

### enable

> _boolean \| ((event: Event) => boolean)_ **Default:** `true`

是否启用缩放画布的功能

### onFinish

> _() => void_

完成缩放时的回调

### preventDefault

> _boolean_ **Default:** `true`

是否阻止默认事件

### sensitivity

> _number_ **Default:** `1`

缩放灵敏度

### trigger

> _string[]_ _\| { zoomIn:_ _string[]\_\_; zoomOut:_ _string[]\_\_; reset:_ _string[]\_\_; }_

触发缩放的方式

- ShortcutKey：组合快捷键，\*\*默认使用滚轮缩放\*\*，['Control'] 表示按住 Control 键滚动鼠标滚轮时触发缩放

- CombinationKey：缩放快捷键，例如 { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] }

## API

### ZoomCanvas.destroy()

销毁缩放画布

```typescript
destroy(): void;
```
