---
title: Plugins
order: 14
---

There are several plugins in G6 which can be used for G6's graph or other applications.

- [Grid](#grid)
- [Minimap](#minimap)
- [Edge Bundling](#edge-bundling)
- [Menu](#menu)
- [ToolBar](#toolbar)
- [TimeBar](#timebar)
- [Tooltip](#tooltip)
- [Fisheye](#fisheye-lens)
- [EdgeFilterLens](#edge-filter-lens)

## Configure to Graph

Instantiate the plugin and configure the minimap onto the instance of Graph:

```javascript
// Instantialize the Grid plugin
const grid = new G6.Grid();
// Instantialize the Minimap plugin
const minimap = new G6.Minimap();
const graph = new G6.Graph({
  //... Other configurations
  plugins: [grid, minimap], // Configure Grid and Minimap to the graph
});
```

## Grid

Grid plugin draws grids on the canvas.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

Use the code in [Configure to Graph](#configure-to-graph) to instantiate grid plugin with the following configurations.

### Configuration

| Name | Type   | Required | Description                                |
| ---- | ------ | -------- | ------------------------------------------ |
| img  | Srting | false    | base64 formatted string for the grid image |

## Minimap

Minimap is a tool for quick preview and exploration on large graph.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

It can be configured to adjust the styles and functions.

### Configuration

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| container | Object | false | The DOM container of Minimap. The plugin will generate a new one if `container` is not defined |
| className | String | false | The className of the DOM element of the Minimap |
| viewportClassName | String | false | The className of the DOM element of the view port on the Minimap |
| type | String | false | Render type. Options: `'default'`: Render all the graphics shapes on the graph; `'keyShape'`: Only render the keyShape of the items on the graph to reach better performance; `'delegate'`: Only render the delegate of the items on the graph to reach better performance. Performance: `'default'` < `'keyShape'` < `'delegate'`. `'default'` by default |
| size | Array | false | The size of the Minimap |
| delegateStyle | Object | false | Takes effect when `type` is `'delegate'`. The style of the delegate of the items on the graph |

The `delegateStyle` has the properties:

| Name        | Type   | Required | Description             |
| ----------- | ------ | -------- | ----------------------- |
| fill        | String | false    | Filling color           |
| stroke      | String | false    | Stroke color            |
| lineWidth   | Number | false    | The width of the stroke |
| opacity     | Number | false    | Opacity                 |
| fillOpacity | Number | false    | Filling opacity         |

## Image Minimap

The theory of the [Minimap](#minimap) is copy the graphics from the main graph onto the canvas of the minimap, which will lead to double rendering cost. To alleviate this problem, G6 provides another Image Minimap which is drawn by one `<img />` instead of canvas. But you have to provide the `graphImg` which is the url or base64 string of the main graph's screenshot image, and the image is controlled by yourself totally, which means you might need to update the image by calling `minimap.updateGraphImg` manually when the content of the main graph is changed.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

Configure the Image Minimap when instantiating the minimap.

### Configuration

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| graphImg | String | true | The src or base64 string of the minimap |
| width | Number | false | The width of the minimap. The aspect ratio of the minimap will always be the same as the main graph. The `width`'s priority is higher than `height`, that is, if the `width`is assigned, the `height` will be adjusted to meet the aspect ratio |
| height | Number | false | The height of the minimap. The aspect ratio of the minimap will always be the same as the main graph. If the `width` is not assigned while the `height` is assigned, the `width` will be equal to `height` \* aspect ratio |
| container | Object | false | The DOM container of Minimap. The plugin will generate a new one if `container` is not defined |
| className | String | false | The className of the DOM element of the Minimap |
| viewportClassName | String | false | The className of the DOM element of the view port on the Minimap |
| delegateStyle | Object | false | Takes effect when `type` is `'delegate'`. The style of the delegate of the items on the graph |

The `delegateStyle` has the properties:

| Name        | Type   | Required | Description             |
| ----------- | ------ | -------- | ----------------------- |
| fill        | String | false    | Filling color           |
| stroke      | String | false    | Stroke color            |
| lineWidth   | Number | false    | The width of the stroke |
| opacity     | Number | false    | Opacity                 |
| fillOpacity | Number | false    | Filling opacity         |

### API

#### updateGraphImg(img)

Update the `graphImg` for the minimap. We recommand you to update the graphImg when the main graph is updated.

Parameters:

| Name | Type   | Required | Description                      |
| ---- | ------ | -------- | -------------------------------- |
| img  | String | true     | minimap 的图片地址或 base64 文本 |

### Usage

`graphImg` is required when instantiating the Image Minimap.

```
// Instantiating the Image Minimap
const imageMinimap = new G6.ImageMinimap({
  width: 200,
  graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
});
const graph = new G6.Graph({
  //... Other configurations
  plugins: [imageMinimap], // configure the imageMinimap
});

graph.data(data);
graph.render()

... // Some operations which update the main graph
imageMinimap.updateGraphImg(img); // Update the minimap's image (generated by yourself)

```

## Edge Bundling

In complex graph with large number of edges, edge bundling helps you to improve the visual clutter.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

> Edge bundling on American airline graph. <a href='http://g6.antv.vision/zh/examples/case/edgeBundling' target='_blank'>Demo Link</a>. <a href='https://g6.antv.vision/zh/docs/manual/cases/edgeBundling' target='_blank'>Demo Document</a>.

The edge bundling plugin can be configured to adjust the styles and functions.

### Configuration

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| K | Number | false | 0.1 | The strength of the bundling |
| lambda | Number | false | 0.1 | The initial step length |
| divisions | Number | false | 1 | The initial number of division on each edge. It will be multipled by `divRate` in each cycle |
| divRate | Number | false | 2 | The rate of the divisions increasement. Large number means smoother result, but the performance will be worse when the number is too large |
| cycles | Number | false | 6 | The number of outer interations |
| iterations | Number | false | 90 | The initial number of inner interations. It will be multiplied by `iterRate` in each cycle |
| iterRate | Number | false | 0.6666667 | The rate of the iterations decreasement |
| bundleThreshold | Number | false | 0.6 | The edge similarity threshold for bundling. Large number means the edges in one bundle have smaller similarity, in other words, more edges in one bundle |

## Menu

Menu is used to configure the right-click menu on the node.

### Configuration

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| className | string | null | the class name of the menu dom |
| getContent | (evt?: IG6GraphEvent) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OtOkS4g-vrkAAAAAAAAAAABkARQnAQ' width=60 alt='img'/> | the menu content，supports DOM or string |
| handleMenuClick | (target: HTMLElement, item: Item) => void | undefined | the callback function when click the menu |

### Usage

Use G6 build-in menu by default.

```
// Instantiate Menu plugin
const menu = new G6.Menu();
const graph = new G6.Graph({
  //... other Configuration
  plugins: [menu],
});
```

#### DOM Menu

```
const menu = new G6.Menu({
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>menu01</li>
        <li>menu01</li>
        <li>menu01</li>
        <li>menu01</li>
        <li>menu01</li>
      </ul>`
    return outDiv
  },
  handleMenuClick(target, item) {
    console.log(target, item)
  },
});

const graph = new G6.Graph({
  //... other Configuration
  plugins: [menu], // the Menu plugin
});
```

#### String Menu

```
const menu = new G6.Menu({
  getContent(evt) {
    return `<ul>
      <li title='1'>menu02</li>
      <li title='2'>menu02</li>
      <li>menu02</li>
      <li>menu02</li>
      <li>menu02</li>
    </ul>`;
  },
  handleMenuClick(target, item) {
    console.log(target, item)
  },
});

const graph = new G6.Graph({
  //... other Configuration
  plugins: [menu], // The Menu plugin
});
```

## ToolBar

ToolBar has the following operations by default:

- Undo;
- Redo;
- Zoom-in;
- Zoom-out;
- Fit the View;
- Actual Size.

### Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container | HTMLDivElement | null | The container of the ToolBar. It will take use the DOM of the canvas by default |
| className | string | null | The class name of the sub DOM nodes of the ToolBar |
| getContent | (graph?: IGraph) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ' width=80 alt='img'/> | The content of the ToolBar |
| handleClick | (code: string, graph: IGraph) => void | undefined | The callback functions for the icons of the ToolBar |
| position | Point | null | The position of the ToolBar |

### Usage

#### Default Usage

ToolBar provides some default operations above.

```
const toolbar = new G6.ToolBar();

const graph = new G6.Graph({
  //... Other configurations
  plugins: [toolbar], // Use the ToolBar plugin
});
```

#### Custom ToolBar by String

```
const tc = document.createElement('div');
tc.id = 'toolbarContainer';
document.body.appendChild(tc);

const toolbar = new G6.ToolBar({
  container: tc,
  getContent: () => {
    return `
      <ul>
        <li code='add'>Add Node</li>
        <li code='undo'>Undo</li>
      </ul>
    `
  },
  handleClick: (code, graph) => {
    if (code === 'add') {
      graph.addItem('node', {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 150
      })
    } else if (code === 'undo') {
      toolbar.undo()
    }
  }
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [toolbar], // Use the ToolBar plugin
});
```

#### Custom ToolBar by DOM

```
const toolbar = new G6.ToolBar({
  getContent: () => {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>example 01</li>
        <li>example 02</li>
        <li>example 03</li>
        <li>example 04</li>
        <li>example 05</li>
      </ul>`
    return outDiv
  },
  handleClick: (code, graph) => {

  }
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [toolbar], // Use the ToolBar plugin
});
```

## TimeBar

There are three types of built-in TimeBar in G6:

- Time bar with a line chart as background;
- Simple time bar;
- Time bar with descrete ticks.

All the three types of timebar supports play, fast forward, and fast backward.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DOo6QpfFfMUAAAAAAAAAAAAAARQnAQ' width='500' />
<br />Time bar with a line chart as background<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bzGBQKkewZMAAAAAAAAAAAAAARQnAQ' width='500' />
<br />Simple time bar<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kHRkQpnvBmwAAAAAAAAAAAAAARQnAQ' width='500' />
<br />Time bar with descrete ticks<br />

<br />Refer to the demos [HERE](https://g6.antv.vision/en/examples/tool/timebar#timebar)<br />

### Common Usage

Same to other plugins of G6, the users can initiate the TimeBar and assign it to the graph as:

```javascript
import G6 from '@antv/g6';

const timebar = new G6.TimeBar({
  width: 500,
  height: 150,
  padding: 10,
  type: 'trend',
  trend: {
    data: timeBarData,
  },
});

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [timebar],
});
```

<br />If you want to use the TimeBar with line chart, assign the `type` to be `trend` when instantiating the TimeBar, which results in:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lfvIQJYbs7oAAAAAAAAAAAAAARQnAQ' width='600' />

<br />Assigning the `type` to be `simple` results in:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g2zhQqP6ruYAAAAAAAAAAAAAARQnAQ' width='600' />

<br />And assigning the `type` to be `tick` results in a TimeBar with descrete ticks. Note that it is different from the above two types of TimeBar, \*\*The TimeBar with decrete ticks is configured with the `tick` object but not the `trend` object.

```javascript
const timebar = new G6.TimeBar({
  width,
  height: 150,
  type: 'tick',
  tick: {
    data: timeBarData,
    width,
    height: 42,
    tickLabelFormatter: (d) => {
      const dateStr = `${d.date}`;
      if ((count - 1) % 10 === 0) {
        return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
      }
      return false;
    },
    tooltipFomatter: (d) => {
      const dateStr = `${d}`;
      return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
    },
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*n6ECQ7Jn5pQAAAAAAAAAAAAAARQnAQ' width='600' />

### Definition of the Configurations

#### Definition of the Interfaces

The complete interfaces for the TimeBar is shown below:

```javascript
interface TimeBarConfig extends IPluginBaseConfig {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  readonly type?: 'trend' | 'simple' | 'tick';
  // the configuration for the TimeBar with line chart and simple TimeBar, takes effect whtn the type is 'trend' or 'simple'
  readonly trend?: TrendConfig;

  // the configurations for the two sliders
  readonly slider?: SliderOption;

  // the configuration for the TimeBar with descrete ticks, takes effect whtn the type is 'tick'
  readonly tick?: TimeBarSliceOption;

  // the buttons for play, fast forward, and back forward
  readonly controllerCfg?: ControllerCfg;

  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;
  valueChange?: (graph: IGraph, value: string) => void;
}
```

#### The Parameters of the Interfaces

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| container | HTMLDivElement | null | The DOM container of the TimeBar. By default, the plugin will create a container DOM with 'g6-component-timebar' as className |
| x | number | 0 | The beginning x position of the TimeBar plugin |
| y | number | 0 | The beginning y position of the TimeBar plugin |
| width | number |  | **Requred**, the width of the TimBar |
| height | number |  | **Requred**, the height of the TimBar |
| padding | number/number[] | 10 | The padding of the container of the TimeBar |
| type | 'trend' / 'simple' / 'tick' | trend | The type of the TimeBar, 'trend' by default |
| trend | TrendConfig | null | The configuration for the TimeBar with line chart and simple TimeBar, takes effect whtn the type is 'trend' or 'simple' |
| slider | SliderOption | null | The configurations for the two sliders |
| tick | TimeBarSliceOption | null | The configuration for the TimeBar with descrete ticks, takes effect whtn the type is 'tick' |
| controllerCfg | ControllerCfg | null | The buttons for play, fast forward, and back forward |
| rangeChange | Function | null | The callback function after the time range is changed. When it is not assigned, the graph elements will be filtered after the time range is changed |

#### Interface for TrendConfig

> Does not support the configurations for the style of the tick labels.

```javascript
interface TrendConfig {
  // The data
  readonly data: {
    date: string;
    value: string;
  }[];
  // The position and size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  // The styles
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly lineStyle?: ShapeStyle;
  readonly areaStyle?: ShapeStyle;
  readonly interval?: Interval;
}
```

#### Parameters of the TrendConfig

| Name | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| x | number | 0 | The beginning x position of the trend line chart |
| y | number | 0 | The beginning y position of the trend line chart |
| width | number | The width of the TimeBar | The width of the trend line chart of the TimeBar, we suggest to use the default value. If you wanna custom it, please assign the `width` of the slider in the same time |
| height | number | 28 when type='trend'<br />8 when type='simple' | The height of the TimeBar | The width of the trend line chart of the TimeBar, we suggest to use the default value. If you wanna custom it, please assign the `height` of the slider in the same time |
| smooth | boolean | false | Whether to show a smooth line on the trend line chart |
| isArea | boolean | false | Whether to show a area chart instead |
| lineStyle | ShapeStyle | null | The configurations for the style of the line in the line chart |
| areaStyle | ShapeStyle | null | The configuration for the style of the area in the chart when `isArea` is `true` |
| interval | Interval | null | The configuration for the style of the bars in the chart. When it is assigned, a mixed trend chart will take place |

#### Interfaces of SliderOption

```javascript
export type SliderOption = Partial<{
  readonly width?: number;
  readonly height?: number;
  readonly backgroundStyle?: ShapeStyle;
  readonly foregroundStyle?: ShapeStyle;
  // The style of the sliders
  readonly handlerStyle?: {
    width?: number;
    height?: number;
    style?: ShapeStyle;
  };
  readonly textStyle?: ShapeStyle;
  // The start and end position for the sliders, which indicate the data range for the filtering. Ranges from 0 to 1
  readonly start: number;
  readonly end: number;
  // The labels for the sliders
  readonly minText: string;
  readonly maxText: string;
}>;
```

#### Parameters for the SliderOption

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| width | number | The width of the container of the TimeBar - 2 \* padding | The width of the background trend chart. We suggest to use the default value. If you wanna custom it, assign it the the `width` in the `trend` in the same time |
| height | number | 28 when type='trend'<br />8 when type='simple' | The height of the background trend chart. We suggest to use the default value. If you wanna custom it, assign it the the `height` in the `trend` in the same time |
| backgroundStyle | ShapeStyle | null | The configuration for the style of the background |
| foregroundStyle | ShapeStyle | null | The configuration for the style of the forground |
| handlerStyle | ShapeStyle | null | The configuration for the style of the two sliders |
| textStyle | ShapeStyle | null | The configuration for the style of the labels on the two sliders |
| start | number | 0.1 | The start position for the sliders, which indicate the start of the data range for the filtering. Ranges from 0 to `end` |
| end | number | 0.9 | The end position for the sliders, which indicate the end of the data range for the filtering. Ranges from `start` to 1 |
| minText | string | min | The label for the left slider |
| maxText | string | max | The label for the right slider |

#### TimeBarSliceOption

```javascript
export interface TimeBarSliceOption {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  // styles
  readonly selectedTickStyle?: TickStyle;
  readonly unselectedTickStyle?: TickStyle
  readonly tooltipBackgroundColor?: string;

  readonly start?: number;
  readonly end?: number;

  // data
  readonly data: {
    date: string;
    value: string;
  }[];

  // custom the formatter function for the tick labels
  readonly tickLabelFormatter?: (d: any) => string | boolean;
  // custom the formatter function for the tooltip
  readonly tooltipFomatter?: (d: any) => string;
}
```

#### Parameters for the TimeBarSliceOption

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| x | number | 0 | The beginning x position for the TimeBar |
| y | number | 0 | The beginning y position for the TimeBar |
| width | number |  | **Requred**, the width of the TimeBar |
| height | number |  | **Requred**, the height of the TimeBar |
| padding | number / number[] | 0 | The padding of the container of the TimeBar |
| selectedTickStyle | ShapeStyle | null | The style of the tick(s) which is(are) selected |
| unselectedTickStyle | ShapeStyle | null | The style of the tick(s) which is(are) unselected |
| tooltipBackgroundColor | ShapeStyle | null | The background style for the tooltip |
| start | number | 0.1 | The start position for the sliders, which indicate the start of the data range for the filtering. Ranges from 0 to `end` |
| end | number | 0.9 | The end position for the sliders, which indicate the end of the data range for the filtering. Ranges from `start` to 1 |
| data | any[] | [] | **Requred**, the data for the ticks |
| tickLabelFormatter | Function | null | The formatter function for customing the labels of the ticks |
| tooltipFomatter | Function | null | The formatter function for customing the tooltip |

#### Interface of the ControllerCfg

> Does not support for now

> Does not support the style configuration for controller buttons

> Does not support loop play

```javascript
type ControllerCfg = Partial<{
  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  /** the play spped, means the playing time for 1 tick */
  readonly speed?: number;
  /** whether play in loop */
  readonly loop?: boolean;
  readonly hiddleToggle: boolean;
  readonly fill?: string;
  readonly stroke?: string;
  /** style of the back forward button */
  readonly preBtnStyle?: ShapeStyle;
  /** style of the fast forward button */
  readonly nextBtnStyle?: ShapeStyle;
  /** style of the play button */
  readonly playBtnStyle?: ShapeStyle;
  /** the text for the right-botton switch controlling play with single time point or time range */
  readonly timePointControllerText?: string;
  readonly timeRangeControllerText?: string
}>
```

#### Parameters for ControllerCfg

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| x | number | 0 | The beginning x position for the buttons group of the TimeBar |
| y | number | 0 | The beginning y position for the buttons group of the TimeBar |
| width | number | The width of the TimeBar | The width of the buttons group of the TimeBar |
| height | number | 40 | The width of the buttons group of the TimeBar |
| speed | number | 1 | The play speed |
| loop | boolean | false | _Does not support for now_, whether play in loop |
| hiddleToggle | boolean | true | Whther hide the switch of the time range type |
| fill | string |  | The fillling color for the buttons group |
| stroke | string |  | The stroke color for the buttons group |
| preBtnStyle | ShapeStyle | null | The style configuration for the backward button |
| nextBtnStyle | ShapeStyle | null | The style configuration for the forward button |
| playBtnStyle | ShapeStyle | null | The style configuration for the play button |
| timePointControllerText | string | "单一时间"         | The text for the right-botton switch controlling play with single time point or time range     |
| timeRangeControllerText | string | "时间范围"         | The text for the right-botton switch controlling play with single time point or time range     |
## ToolTip

ToolTip helps user to explore detail infomations on the node and edge. Do note that, This Tooltip Plugins will replace the tooltip in the built-in behavior after G6 4.0.

### Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | null | Tge class name of the tooltip's container |
| container | HTMLDivElement | null | The container of the Tooltip. The canvas DOM will be used by default |
| getContent | (evt?: IG6GraphEvent) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aPPuQquN5Q0AAAAAAAAAAABkARQnAQ' width=80 alt='img'/> | The content of the Tooltip |
| shouldBegin | (evt: G6Event) => boolean | undefined | Whether allow the tooltip show up. You can return true or false according to the content of the `evt.item` (current item of the event) or `evt.target` (current shape of the event) |
| offsetX | number | 6 | the offset of tooltip along x axis, the padding of the parent container should be take into consider |
| offsetY | number | 6 | the offset of tooltip along y axis, the padding of the parent container should be take into consider |
| itemTypes | string[] | ['node', 'edge', 'combo'] | the item types that allow the tooltip show up. e.g. if you only want the node tooltip, set the `itemTypes` to be ['node'] |

### Usage

The content of the Tooltip is the type and id of the item by default. Users are free to custom the content of the Tooltip by configuring `getContent`:

#### Dom Tooltip

```
const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 20,
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `
      <h4>Custom Tooltip</h4>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`
    return outDiv
  },
  itemTypes: ['node']
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [tooltip], // Use Tooltip plugin
});
```

#### String Tooltip

```
const tooltip = new G6.Tooltip({
  getContent(e) {
    return `<div style='width: 180px;'>
      <ul id='menu'>
        <li title='1'>example 01</li>
        <li title='2'>example 02</li>
        <li>example 03</li>
        <li>example 04</li>
        <li>example 05</li>
      </ul>
    </div>`;
  },
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [tooltip], // Use Tooltip plugin
});
```

## Fisheye Lens

Fisheye is designed for focus_context exploration, it keeps the context and the relationships between context and the focus while magnifing the focus area.

### Configuration

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| trigger | 'mousemove' / 'click' | false | 'mousemove' | The trigger for the lens |
| d | Number | false | 1.5 | Magnify coefficient. Larger the value, larger the focus area will be magnified |
| r | Number | false | 300 | The radius of the focus area |
| delegateStyle | Object | false | { stroke: '#000', strokeOpacity: 0.8, lineWidth: 2, fillOpacity: 0.1, fill: '#ccc' } | The style of the lens's delegate |
| showLabel | Boolean | false | false | If the label is hidden, whether to show the label of nodes inside the focus area |
| maxR | Number | The height of the graph | The maximum radius scaled by the wheel |
| minR | Number | 0.05 \* The height of the graph | The minimum radius scaled by the wheel |
| maxD | Number | 5 | when `trigger` is `'mousemove'` or `'click'`, minimap allow users to adjust the magnifying coefficient `d` by dragging left / right on the lens. `maxD` is the maximum magnifying coefficient that limits this interaction. The suggested range for `maxD` is [0, 5]. Note that updating the configurations by `minimap.updateParam` will not be limited by `maxD` |
| minD | Number | 0 | when `trigger` is `'mousemove'` or `'click'`, minimap allow users to adjust the magnifying coefficient `d` by dragging left / right on the lens. `minD` is the minimum magnifying coefficient that limits this interaction. The suggested range for `minD` is [0, 5]. Note that updating the configurations by `minimap.updateParam` will not be limited by `minD` |
| scaleRBy | 'wheel'/'drag'/'unset'/undefined | false | 'unset' | The trigger for end users to scale the range of the lens |
| scaleDBy | 'wheel'/'drag'/'unset'/undefined | false | 'unset' | The trigger for end users to scale the magnification factor of the lens |
| showDPercent | Boolean | false | true | Whether show the percent of current magnification factor on the bottom of the lens, where the percent is about the D, minD, and maxD |

### Member Function

#### updateParams(cfg)

Update partial of the configurations of the FishEye instance, including `trigger`, `d`, `r`, `maxR`, `minR`, `maxD`, `minD`, `scaleRBy`, and `scaleDBy`. E.g.

```
const fisheye = new G6.Fisheye({
  trigger: 'mousemove'
});

... // Other operations

fisheye.updateParams({
  d: 2,
  r: 500,
  // ...
})
```

### Usage

```
const fisheye = new G6.Fisheye({
  trigger: 'mousemove',
  d: 1.5,
  r: 300,
  delegateStyle: clone(lensDelegateStyle),
  showLabel: false
});

const graph = new G6.Graph({
  //... Other graph configurations
  plugins: [fisheye], // configuring fisheye plugin
});
```

## Edge Filter Lens

Edge Filter Lens is designed for edge filtering, the desired edges will be kept inside the lens while the others will be hidden.

### Configuration

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| trigger | 'drag' / 'mousemove' / 'click' | false | 'mousemove' | The trigger for the lens |
| type | 'one' / 'both' / 'only-source' / 'only-target' | false | 'both' | Simple filtering conditions related to the end nodes. `'one'`: show the edge whose one or more end nodes are inside the filter lens; `'both'`: show the edge whose both end nodes are inside the lens; `'only-source'`: show the edge whose source node is inside the lens and target node is not; `'only-target'`: show the edge whose target node is inside the lens and source node is not. More complicated conditions can be defined by the `shouldShow` |
| shouldShow | (d?: unknown) => boolean | false | undefined | The custom conditions for filtering. The parameter `d` is the data of each edge, you can return boolean value according to the data, where `true` means show. |
| r | Number | false | 60 | The radius of the filter area |
| delegateStyle | Object | false | { stroke: '#000', strokeOpacity: 0.8, lineWidth: 2, fillOpacity: 0.1, fill: '#ccc' } | The style of the lens's delegate |
| showLabel | 'edge' / 'node' / 'both' | false | 'edge' | If the label is hidden, whether to show the label of nodes inside the focus area |
| maxR | Number | The height of the graph | The maximum radius scaled by the wheel |
| minR | Number | 0.05 \* The height of the graph | The minimum radius scaled by the wheel |
| scaleRBy | 'wheel'/'drag'/'unset'/undefined | false | 'unset' | The trigger for end users to scale the range of the lens |

### Member Function

#### updateParams(cfg)

Update partial of the configurations of the filter lens instance, including `trigger`, `type`, `r`, `maxR`, `minR`, `shouldShow`, `showLabel`, and `scaleRBy`. E.g.

```
const filterLens = new G6.EdgeFilterLens({
  trigger: 'drag'
});

... // Other operations

filterLens.updateParams({
  r: 500,
  // ...
})
```

### Usage

```
const filterLens = new G6.EdgeFilterLens({
  trigger: 'mousemove',
  r: 300,
  shouldShow: d => {
    return d.size > 10;
  }
});

const graph = new G6.Graph({
  //... Other graph configurations
  plugins: [filterLens], // configuring edge filter lens plugin
});
```
