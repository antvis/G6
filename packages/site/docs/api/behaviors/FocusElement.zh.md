---
title: FocusElement 聚焦元素
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

点击元素时，将元素聚焦到视图中心。

<embed src="@/common/api/behaviors/focus-element.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`focus-element` \| string_

此插件已内置，你可以通过 `type: 'focus-element'` 来使用它。

### animation

> [ViewportAnimationEffectTiming](/api/graph/option#viewportanimationeffecttiming)

是否启用动画以及动画配置

### enable

> _boolean \| ((event:_ [IElementEvent](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用聚焦功能

## API

### FocusElement.destroy()

```typescript
destroy(): void;
```
