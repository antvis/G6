---
title: FocusElement 聚焦元素
---

点击元素时，将元素聚焦到视图中心。

<embed src="@/common/api/behaviors/focus-element.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`focus-element` \| string_

此插件已内置，你可以通过 `type: 'focus-element'` 来使用它。

### animation

> [ViewportAnimationEffectTiming](/manual/graph/option#viewportanimationeffecttiming)

是否启用动画以及动画配置

### enable

> _boolean \| ((event:_ [IElementEvent](/api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用聚焦功能

## API

### FocusElement.destroy()

```typescript
destroy(): void;
```
