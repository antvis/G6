---
title: Timebar 时间条
---

> 如需深入了解插件的使用，请参阅 [API 文档 - 图配置项 - plugins](/api/graph/option#plugins) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

<embed src="@/common/api/plugins/timebar.md"></embed>

**参考示例**：

- [时间模式](/examples/plugin/timebar/#timer)
- [图表模式](/examples/plugin/timebar/#chart)

## 配置项

### <Badge type="success">Required</Badge> type

> _`timebar` \| string_

此插件已内置，你可以通过 `type: 'timebar'` 来使用它。

### className

> _string_ **Default:** `'g6-timebar'`

给工具栏的 DOM 追加的类名，便于自定义样式

### <Badge type="success">Required</Badge> data

> _number[] \| { time: number; value: number; }[]_

时间数据

`timebarType` 为 `'chart'` 时，需要额外传入 `value` 字段作为图表数据

### elementTypes

> _('node' \| 'edge' \| 'combo')[]_

筛选类型

### getTime

> _(datum:_ _NodeData \| EdgeData \| ComboData) => number_

获取元素时间

### height

> _number_ **Default:** `60`

时间条高度

### labelFormatter

> _(time: number \| Date) => string_

图表模式下自定义时间格式化

### loop

> _boolean_ **Default:** `false`

是否循环播放

### mode

> _'modify' \| 'visibility'_ **Default:** `'modify'`

筛选模式

- `'modify'`: 通过修改图数据进行筛选

- `'visibility'`: 通过修改元素可见性进行筛选

### onBackward

> _() => void_

后退时执行的回调

### onChange

> _(values: number \| [number, number]) => void_

时间区间变化时执行的回调

### onForward

> _() => void_

前进时执行的回调

### onPause

> _() => void_

暂停时执行的回调

### onPlay

> _() => void_

开始播放时执行的回调

### onReset

> _() => void_

重置时执行的回调

### onSpeedChange

> _(speed: number) => void_

播放速度变化时执行的回调

### padding

> _number \| number[]_

边距

### position

> _'bottom' \| 'top'_ **Default:** `'bottom'`

Timebar 的位置

### timebarType

> _'time' \| 'chart'_ **Default:** `'time'`

Timebar 展示类型

- `'time'`: 显示为时间轴
- `'chart'`: 显示为趋势图

### values

> _number \| [number, number] \| Date \| [Date, Date]_

当前时间值

### width

> _number_ **Default:** `450`

时间条宽度

### x

> _number_

X 位置

设置后 `position` 会失效

### y

> _number_

Y 位置

设置后 `position` 会失效

## API

### Timebar.backward()

后退

```typescript
backward(): void;
```

### Timebar.forward()

前进

```typescript
forward(): void;
```

### Timebar.pause()

暂停

```typescript
pause(): void;
```

### Timebar.play()

播放

```typescript
play(): void;
```

### Timebar.reset()

重置

```typescript
reset(): void;
```
