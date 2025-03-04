---
title: OptimizeViewportTransform 操作画布时隐藏元素
---

## 配置项

### <Badge type="success">Required</Badge> type

> _`optimize-viewport-transform` \| string_

此插件已内置，你可以通过 `type: 'optimize-viewport-transform'` 来使用它。

### debounce

> _number_ **Default:** `200`

设置防抖时间

### enable

> _boolean \| ((event: Event) => boolean)_ **Default:** `true`

是否启用画布优化功能

### shapes

> _{ node?: string[]; edge?: string[]; combo?: string[]; } \| ((type: 'node' \| 'edge' \| 'combo', shape: DisplayObject) => boolean)_

指定始终显示的图形元素。应用此交互后，在画布操作过程中，只有通过该属性指定的图形元素会保持可见，其余图形元素将被隐藏，从而提升渲染性能。默认情况下，节点始终可见，而其他图形元素在操作画布过程中会自动隐藏

## API

### OptimizeViewportTransform.destroy()

```typescript
destroy(): void;
```

### OptimizeViewportTransform.update(options)

```typescript
update(options: Partial<OptimizeViewportTransformOptions>): void;
```

| 参数    | 类型                                                 | 描述   | 默认值 | 必选 |
| ------- | ---------------------------------------------------- | ------ | ------ | ---- |
| options | Partial<[OptimizeViewportTransformOptions](#配置项)> | 配置项 | -      | ✓    |
