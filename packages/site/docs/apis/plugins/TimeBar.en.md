---
title: TimeBar
order: 8
---

Filter graph elements through the time bar

- [Timebar](/en/examples/tool/timebar/#timebar-time)
- [Chart Timebar](/en/examples/tool/timebar/#timebar-chart)

<img alt="time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RjCKS6xdRWwAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### axisStyle

**Type**: `AxisStyle`

**Default**: `{}`

Axis style

### chartStyle

**Type**: `ChartStyle`

**Default**: `{}`

Chart style

### controllerStyle

**Type**: `ControllerStyle`

**Default**: `{}`

Controller style

### data

**Type**: `Datum[]`

**Default**: `[]`

Time bar data

### filter

**Type**: `type filter = (graph: IGraph, values: Values) => void;`

**Default**: `undefined`

Take over the filtering logic, this callback will be called when the time bar value changes

### filterItemTypes

**Type**: `node | edge`

**Default**: `node`

Filter element type

### filterType

**Type**: `'modify' | 'visibility'`

**Default**: `'modify'`

Filter type

- `modify`: Filter by updating graph data
- `visibility`: Filter by updating graph element visibility

### getTimeFromItem

**Type**: `(model: Model, itemType: ItemType) => number | Date;`

**Default**: Get `timestamp`, `time`, `date`, `datetime` field value in turn

Get time value from graph element item

### getTimeFromData

**Type**: `(data: Datum) => number | Date;`

**Default**: Get `timestamp`, `time`, `date`, `datetime` field value in turn

Get time value from time bar data

### getValueFromData

**Type**: `(data: Datum) => number;`

**Default**: Get `value`, `date` field value in turn

Get value from time bar data, used to draw in chart mode

### interval

**Type**: `Interval`

**Default**: `'day'`

Time interval in chart mode

### labelFormatter

**Type**: `(time: number) => string;`

**Default**: `undefined`

Customize the time value format in chart mode

### loop

**Type**: `boolean`

**Default**: `false`

Whether to loop

### padding

**Type**: `Padding`

**Default**: `10`

Padding

### playMode

**Type**: `'acc' | 'slide'`

**Default**: `'acc'`

Play mode

- `'acc'`: Accumulated play, that is, when playing to the n-th time point, the graph elements from the 1st to the n-th time point will be displayed
- `'slide'`: Slide play, fixed display of the graph elements of the latest n time points

### shouldIgnore

**Type**: `shouldIgnore`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    shouldIgnore
  </summary>
  
```ts
type shouldIgnore = (
  model: Model,
  itemType: 'node' | 'edge',
  dateRange: number | Date | [number, number] | [Date, Date],
) => boolean;
```
</details>

**Default**: `undefined`

**Required**: false

**Description**: Filter the callback of the graph element, return `true` to ignore the graph element

### timebarType

**Type**: `'chart' | 'time'`

**Default**: `'time'`

Time bar type

- `'chart`: Display as a bar chart

<img alt="chart time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VVvrRaEMeIoAAAAAAAAAAAAADmJ7AQ/original" width='400'/>

- `time`: Display as a time line

<img alt="time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8_2nTr01-MQAAAAAAAAAAAAADmJ7AQ/original" width='400'/>

### values

**Type**: `Values`

**Default**: The value of the first time point

Time bar value or range

### x

**Type**: `number`

**Default**: `0`

x coordinate

### y

**Type**: `number`

**Default**: `0`

y coordinate

<embed src="../../common/PluginSize.en.md"></embed>

### position

**Type**: `'top' | 'bottom' | 'left' | 'right'`

**Default**: `'bottom'`

position

> Currently only supports `'bottom'`

### onBackward

**Type**: `() => void;`

**Default**: `undefined`

Backward callback

### onChange

**Type**: `(values: Values) => void;`

**Default**: `undefined`

Value change callback

### onForward

**Type**: `() => void;`

**Default**: `undefined`

Forward callback

### onPlay

**Type**: `() => void;`

**Default**: `undefined`

Play callback

### onPause

**Type**: `() => void;`

**Default**: `undefined`

Pause callback

### onReset

**Type**: `() => void;`

**Default**: `undefined`

Reset callback

### onSelectionTypeChange

**Type**: `(type: 'value' | 'range') => void;`

**Default**: `undefined`

Selection type change callback

### onChartTypeChange

**Type**: `(type: 'line' | 'column') => void;`

**Default**: `undefined`

Chart type change callback

## API

### backward

**Type**: `() => void;`

**Description**: Backward

### forward

**Type**: `() => void;`

**Description**: Forward

### pause

**Type**: `() => void;`

**Description**: Pause

### play

**Type**: `() => void;`

**Description**: Play

### reset

**Type**: `() => void;`

**Description**: Reset

<embed src="../../common/PluginAPIDestroy.en.md"></embed>

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
