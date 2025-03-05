---
title: Minimap 小地图
---

**参考示例**：

- [小地图](/examples/plugin/minimap/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`minimap` \| string_

此插件已内置，你可以通过 `type: 'minimap'` 来使用它。

### className

> _string_

缩略图画布类名，传入外置容器时不生效

### container

> _HTMLElement_ _\| string_

缩略图挂载的容器，无则挂载到 Graph 所在容器

### containerStyle

> _Partial<CSSStyleDeclaration>_

缩略图的容器样式，传入外置容器时不生效

### delay

> _number_ **Default:** `128`

延迟更新时间(毫秒)，用于性能优化

### filter

> _(id: string, elementType: 'node' \| 'edge' \| 'combo') => boolean_

过滤器，用于过滤不必显示的元素

### maskStyle

> _Partial<CSSStyleDeclaration>_

遮罩的样式

### padding

> _number \| number[]_ **Default:** `10`

内边距

### position

> _[number, number] \| 'left' \| 'right' \| 'top' \| 'bottom' \| 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center'_ **Default:** `'right-bottom'`

缩略图相对于画布的位置

### renderer

> _IRenderer_

渲染器，默认使用 Canvas 渲染器

### shape

> _'key' \| ((id: string, elementType: 'node' \| 'edge' \| 'combo') => DisplayObject)_ **Default:** `'key'`

元素缩略图形的生成方法

- 'key' 使用元素的主图形作为缩略图形 - 也可以传入一个函数，接收元素的 id 和类型，返回一个图形

### size

> _[number, number]_ **Default:** `[240, 160]`

宽度和高度

## API

### Minimap.destroy()

```typescript
destroy(): void;
```

### Minimap.update(options)

```typescript
update(options: Partial<MinimapOptions>): void;
```

| 参数    | 类型                               | 描述   | 默认值 | 必选 |
| ------- | ---------------------------------- | ------ | ------ | ---- |
| options | Partial<[MinimapOptions](#配置项)> | 配置项 | -      | ✓    |
