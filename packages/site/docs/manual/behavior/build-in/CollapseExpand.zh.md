---
title: CollapseExpand 展开/收起元素
---

通过操作展开/收起元素。

<embed src="@/common/api/behaviors/collapse-expand.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`collapse-expand` \| string_

此插件已内置，你可以通过 `type: 'collapse-expand'` 来使用它。

### align

> _boolean_

是否对准目标元素，避免视图偏移

### animation

> _boolean_ **Default:** `true`

是否启用动画

### enable

> _boolean \| ((event:_ [Event](/api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用展开/收起功能

### onCollapse

> _(id: string) => void_

完成收起时的回调

### onExpand

> _(id: string) => void_

完成展开时的回调

### trigger

> [CommonEvent.CLICK](/api/event#通用事件-commonevent) _\|_ [CommonEvent.DBLCLICK](/api/event#通用事件-commonevent) **Default:** `'dblclick'`

触发方式

## API

### CollapseExpand.destroy()

```typescript
destroy(): void;
```

### CollapseExpand.update(options)

```typescript
update(options: Partial<CollapseExpandOptions>): void;
```

| 参数    | 类型                                      | 描述   | 默认值 | 必选 |
| ------- | ----------------------------------------- | ------ | ------ | ---- |
| options | Partial<[CollapseExpandOptions](#配置项)> | 配置项 | -      | ✓    |
