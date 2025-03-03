---
title: Timebar
---

<embed src="@/common/api/plugins/timebar.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### className

> _string_ **Default:** `'g6-timebar'`

The class name appended to the menu DOM for custom styles

### <Badge type="success">Required</Badge> data

> _number[] \| { time: number; value: number; }[]_

Time data

When `timebarType` is `'chart'`, you need to pass in the `value` field as chart data

### elementTypes

> _'node' \| 'edge' \| 'combo'\_\_[]_

Filter element types

### getTime

> _(datum:_ _NodeData \| EdgeData \| ComboData\_\_) => number_

Get element time

### height

> _number_ **Default:** `60`

Timebar height

### labelFormatter

> _(time: number \|_ _Date\_\_) => string_

Custom time formatting in chart mode

### loop

> _boolean_ **Default:** `false`

Whether to loop

### mode

> _'modify' \| 'visibility'_ **Default:** `'modify'`

Filter mode

- `'modify'`: Filter by modifying the graph data.

- `'visibility'`: Filter by modifying element visibility

### onBackward

> _() => void_

Callback executed when backward

### onChange

> _(values: number \| [number, number]) => void_

Callback executed when the time interval changes

### onForward

> _() => void_

Callback executed when forward

### onPause

> _() => void_

Callback executed when paused

### onPlay

> _() => void_

Callback executed when playback starts

### onReset

> _() => void_

Callback executed when reset

### onSpeedChange

> _(speed: number) => void_

Callback executed when the playback speed changes

### padding

> _number \| number[]_

Padding

### position

> _'bottom' \| 'top'_ **Default:** `'bottom'`

Timebar location

### timebarType

> _'time' \| 'chart'_ **Default:** `'time'`

Timebar Displays the type

- `'time'`: Display as a timeline

- `'chart'`: Display as a trend chart

### values

> _number \| [number, number] \|_ _Date_ _\| [**Date**,_ _Date\_\_]_

Current time value

### width

> _number_ **Default:** `450`

Timebar width

### x

> _number_

X position

`position` will be invalidated after setting `x`

### y

> _number_

Y position

`position` will be invalidated after setting `y`

## API

### Timebar.backward()

Backward

```typescript
backward(): void;
```

### Timebar.forward()

Forward

```typescript
forward(): void;
```

### Timebar.pause()

Pause

```typescript
pause(): void;
```

### Timebar.play()

Play

```typescript
play(): void;
```

### Timebar.reset()

Reset

```typescript
reset(): void;
```
