---
title: TimeBar
---

Filter graph elements through the time bar

<img alt="time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RjCKS6xdRWwAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### axisStyle

**Type**: `AxisStyle`

**Default**: `{}`

**Required**: false

**Description**: Axis style

### chartStyle

**Type**: `ChartStyle`

**Default**: `{}`

**Required**: false

**Description**: Chart style

### controllerStyle

**Type**: `ControllerStyle`

**Default**: `{}`

**Required**: false

**Description**: Controller style

### data

**Type**: `Datum[]`

**Default**: `[]`

**Required**: false

**Description**: Time bar data

### filter

**Type**: `type filter = (graph: IGraph, values: Values) => void;`

**Default**: `undefined`

**Required**: false

**Description**: Take over the filtering logic, this callback will be called when the time bar value changes

### filterItemTypes

**Type**: `node` | `edge`

**Default**: `node`

**Required**: false

**Description**: Filter element type

### filterType

**Type**: `'modify'` | `'visibility'`

**Default**: `'modify'`

**Required**: false

**Description**: Filter type

- `modify`: Filter by updating graph data
- `visibility`: Filter by updating graph element visibility

### getTimeFromItem

**Type**: `(model: Model, itemType: ItemType) => number | Date;`

**Default**: Get `timestamp`, `time`, `date`, `datetime` field value in turn

**Required**: false

**Description**: Get time value from graph element item

### getTimeFromData

**Type**: `(data: Datum) => number | Date;`

**Default**: Get `timestamp`, `time`, `date`, `datetime` field value in turn

**Required**: false

**Description**: Get time value from time bar data

### getValueFromData

**Type**: `(data: Datum) => number;`

**Default**: Get `value`, `date` field value in turn

**Required**: false

**Description**: Get value from time bar data, used to draw in chart mode

### interval

**Type**: `Interval`

**Default**: `'day'`

**Required**: false

**Description**: Time interval in chart mode

### labelFormatter

**Type**: `(time: number) => string;`

**Default**: `undefined`

**Required**: false

**Description**: Customize the time value format in chart mode

### loop

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to loop

### padding

**Type**: `Padding`

**Default**: `10`

**Required**: false

**Description**: Padding

### playMode

**Type**: `'acc'` | `'slide'`

**Default**: `'acc'`

**Required**: false

**Description**: Play mode

- `'acc'`: Accumulated play, that is, when playing to the n-th time point, the graph elements from the 1st to the n-th time point will be displayed
- `'slide'`: Slide play, fixed display of the graph elements of the latest n time points

### shouldIgnore

**Type**:

```ts
type shouldIgnore = (
  model: Model,
  itemType: 'node' | 'edge',
  dateRange: number | Date | [number, number] | [Date, Date],
) => boolean;
```

**Default**: `undefined`

**Required**: false

**Description**: Filter the callback of the graph element, return `true` to ignore the graph element

### timebarType

**Type**: `'chart'` | `'time'`

**Default**: `'time'`

**Required**: false

**Description**: Time bar type

- `'chart`: Display as a bar chart

<img alt="chart time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VVvrRaEMeIoAAAAAAAAAAAAADmJ7AQ/original" width='400'/>

- `time`: Display as a time line

<img alt="time bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8_2nTr01-MQAAAAAAAAAAAAADmJ7AQ/original" width='400'/>

### values

**Type**: `Values`

**Default**: The value of the first time point

**Required**: false

**Description**: Time bar value or range

### x

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: x coordinate

### y

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: y coordinate

### width

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: width

### height

**Type**: `number`

**Default**: `0`

**Required**: false

**Description**: height

### position

**Type**: `'top'` | `'bottom'` | `'left'` | `'right'`

**Default**: `'bottom'`

**Required**: false

**Description**: position

> Currently only supports `'bottom'`

### onBackward

**Type**: `() => void;`

**Default**: `undefined`

**Required**: false

**Description**: Backward callback

### onChange

**Type**: `(values: Values) => void;`

**Default**: `undefined`

**Required**: false

**Description**: Value change callback

### onForward

**Type**: `() => void;`

**Default**: `undefined`

**Required**: false

**Description**: Forward callback

### onPlay

**Type**: `() => void;`

**Default**: `undefined`

**Required**: false

**Description**: Play callback

### onPause

**Type**: `() => void;`

**Default**: `undefined`

**Required**: false

**Description**: Pause callback

### onReset

**Type**: `() => void;`

**Default**: `undefined`

**Required**: false

**Description**: Reset callback

### onSelectionTypeChange

**Type**: `(type: 'value' | 'range') => void;`

**Default**: `undefined`

**Required**: false

**Description**: Selection type change callback

### onChartTypeChange

**Type**: `(type: 'line' | 'column') => void;`

**Default**: `undefined`

**Required**: false

**Description**: Chart type change callback

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
