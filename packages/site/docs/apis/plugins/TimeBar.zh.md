---
title: TimeBar 时间轴
---

通过时间轴对图元素进行过滤

<img alt="time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RjCKS6xdRWwAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### axisStyle

**类型**：`AxisStyle`

**默认值**：`{}`

**是否必须**：false

**说明**：轴样式

### chartStyle

**类型**：`ChartStyle`

**默认值**：`{}`

**是否必须**：false

**说明**：图表样式

### controllerStyle

**类型**：`ControllerStyle`

**默认值**：`{}`

**是否必须**：false

**说明**：控制器样式

### data

**类型**：`Datum[]`

**默认值**：`[]`

**是否必须**：false

**说明**：时间轴数据

### filter

**类型**：`type filter = (graph: IGraph, values: Values) => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：接管过滤逻辑，当时间轴值变化时，会调用该回调

### filterItemTypes

**类型**：`node` | `edge`

**默认值**：`node`

**是否必须**：false

**说明**：过滤图元素类型

### filterType

**类型**：`'modify'` | `'visibility'`

**默认值**：`'modify'`

**是否必须**：false

**说明**：过滤类型

- `modify`：通过更新图数据的方式进行过滤
- `visibility`：通过更新图元素的可见性进行过滤

### getTimeFromItem

**类型**：`(model: Model, itemType: ItemType) => number | Date;`

**默认值**：依次尝试取 `timestamp`, `time`, `date`, `datetime` 字段属性值

**是否必须**：false

**说明**：从图元素数据中获取时间值

### getTimeFromData

**类型**：`(data: Datum) => number | Date;`

**默认值**：依次尝试取 `timestamp`, `time`, `date`, `datetime` 字段属性值

**是否必须**：false

**说明**：从时间轴数据中获取时间值

### getValueFromData

**类型**：`(data: Datum) => number;`

**默认值**：依次尝试取 `value`, `date` 字段属性值

**是否必须**：false

**说明**：从时间轴数据中获取值，用于在图表模式下进行绘制

### interval

**类型**：`Interval`

**默认值**：`'day'`

**是否必须**：false

**说明**：图表模式下，需要指定时间间隔

### labelFormatter

**类型**：`(time: number) => string;`

**默认值**：`undefined`

**是否必须**：false

**说明**：图表模式下，时间值自定义格式化

### loop

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否循环播放

### padding

**类型**：`Padding`

**默认值**：`10`

**是否必须**：false

**说明**：时间轴内边距

### playMode

**类型**：`'acc'` | `'slide'`

**默认值**：`'acc'`

**是否必须**：false

**说明**：播放模式

- `'acc'`：累加播放，即播放到第 n 个时间点时，会显示第 1 到第 n 个时间点的图元素
- `'slide'`：滑动播放，固定显示最近 n 个时间点的图元素

### shouldIgnore

**类型**：

```ts
type shouldIgnore = (
  model: Model,
  itemType: 'node' | 'edge',
  dateRange: number | Date | [number, number] | [Date, Date],
) => boolean;
```

**默认值**：`undefined`

**是否必须**：false

**说明**：过滤图元素的回调，返回 `true` 表示忽略该图元素

### timebarType

**类型**：`'chart'` | `'time'`

**默认值**：`'time'`

**是否必须**：false

**说明**：时间轴类型

- `chart`：显示为条形图或柱状图

<img alt="chart time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VVvrRaEMeIoAAAAAAAAAAAAADmJ7AQ/original" width='400'/>

- `time`：显示为时间线

<img alt="time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8_2nTr01-MQAAAAAAAAAAAAADmJ7AQ/original" width='400'/>

### values

**类型**：`Values`

**默认值**：第一个时间点的值

**是否必须**：false

**说明**：时间点/时间范围

### x

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：x 坐标

### y

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：y 坐标

### width

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：宽度

### height

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：高度

### position

**类型**：`'top'` | `'bottom'` | `'left'` | `'right'`

**默认值**：`'bottom'`

**是否必须**：false

**说明**：位置

> 目前仅支持 `'bottom'`

### onBackward

**类型**：`() => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：后退回调

### onChange

**类型**：`(values: Values) => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：时间值变化回调

### onForward

**类型**：`() => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：前进回调

### onPlay

**类型**：`() => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：播放回调

### onPause

**类型**：`() => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：暂停回调

### onReset

**类型**：`() => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：重置回调

### onSelectionTypeChange

**类型**：`(type: 'value' | 'range') => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：选择类型变化回调

### onChartTypeChange

**类型**：`(type: 'line' | 'column') => void;`

**默认值**：`undefined`

**是否必须**：false

**说明**：图表类型变化回调

## API

### backward

**类型**：`() => void;`

**说明**：后退

### forward

**类型**：`() => void;`

**说明**：前进

### pause

**类型**：`() => void;`

**说明**：暂停

### play

**类型**：`() => void;`

**说明**：播放

### reset

**类型**：`() => void;`

**说明**：重置

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>

---

```ts
type Datum = {
  time: number | Date;
  value: number;
};

type Interval =
  | 'second'
  | 'minute'
  | 'half-hour'
  | 'hour'
  | 'four-hour'
  | 'day'
  | 'half-day'
  | 'week'
  | 'month'
  | 'season'
  | 'year';

type Padding = number | number[];

type Values = number | [number, number] | Datum | [Datum, Datum];
```
