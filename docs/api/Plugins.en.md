---
title: Plugins
order: 12
---

There are several plugins in G6 which can be used for G6's graph or other applications.

- [Grid](#grid)
- [Minimap](#minimap)
- [Edge Bundling](#edge-bundling)
- [Menu](#menu)
- [ToolBar](#toolbar)
- [TimeBar](#timebar)
- [Tooltip](#tooltip)

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

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| img | Srting | false | base64 formatted string for the grid image |


## Minimap

Minimap is a tool for quick preview and exploration on large graph.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

It can be configured to adjust the styles and functions.

### Configuration

| Name | Type |  Required | Description |
| --- | --- | --- | --- |
| container | Object | false | The DOM container of Minimap. The plugin will generate a new one if `container` is not defined |
| className | String | false | The className of the DOM element of the Minimap |
| viewportClassName | String | false | The className of the DOM element of the view port on the Minimap |
| type | String | false | Render type. Options: `'default'`: Render all the graphics shapes on the graph; `'keyShape'`: Only render the keyShape of the items on the graph to reach better performance; `'delegate'`: Only render the delegate of the items on the graph to reach better performance. Performance: `'default'` < `'keyShape'` < `'delegate'`. `'default'` by default |
| size | Array | false | The size of the Minimap |
| delegateStyle | Object | false | Takes effect when `type` is `'delegate'`. The style of the delegate of the items on the graph |

The `delegateStyle` has the properties:

| Name        | Type   |  Required | Description             |
| ----------- | ------ | ------ | ----------------------- |
| fill        | String |  false | Filling color           |
| stroke      | String |  false | Stroke color            |
| lineWidth   | Number |  false | The width of the stroke |
| opacity     | Number |  false | Opacity                 |
| fillOpacity | Number |  false | Filling opacity         |

## Edge Bundling

In complex graph with large number of edges, edge bundling helps you to improve the visual clutter.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

> Edge bundling on American airline graph. <a href='http://antv-2018.alipay.com/zh-cn/g6/3.x/demo/case/american-migration-bundling.html' target='_blank'>Demo Link</a>. <a href='https://g6.antv.vision/zh/docs/manual/cases/edgeBundling' target='_blank'>Demo Document</a>.

The edge bundling plugin can be configured to adjust the styles and functions.

### Configuration

| Name | Type |  Required | Default | Description |
| --- | --- | --- | --- | --- |
| K | Number |  false | 0.1 | The strength of the bundling |
| lambda | Number |  false | 0.1 | The initial step length |
| divisions | Number |  false | 1 | The initial number of division on each edge. It will be multipled by `divRate` in each cycle |
| divRate | Number |  false | 2 | The rate of the divisions increasement. Large number means smoother result, but the performance will be worse when the number is too large |
| cycles | Number |  false | 6 | The number of outer interations |
| iterations | Number | false | 90 | The initial number of inner interations. It will be multiplied by `iterRate` in each cycle |
| iterRate | Number | false | 0.6666667 | The rate of the iterations decreasement |
| bundleThreshold | Number | false | 0.6 | The edge similarity threshold for bundling. Large number means the edges in one bundle have smaller similarity, in other words, more edges in one bundle |


## Menu

Menu is used to configure the right-click menu on the node.

### Configuration

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| className | string | null | the class name of the menu dom |
| getContent | (graph?: IGraph) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OtOkS4g-vrkAAAAAAAAAAABkARQnAQ' width=60 alt='img'/> | the menu content，supports DOM or string |
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
  getContent(graph) {
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

ToolBar 集成了以下常见的操作：
- 重做；
- 撤销；
- 放大；
- 缩小；
- 适应屏幕；
- 实际大小。

### Configuration

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| container | HTMLDivElement | null | ToolBar 容器，如果不设置，则默认使用 canvas 的 DOM 容器 |
| className | string | null | ToolBar 内容元素的 class 类名 |
| getContent | (graph?: IGraph) => HTMLDivElement | string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ' width=80 alt='img'/> | ToolBar 内容，支持 DOM 元素或字符串 |
| handleClick | (code: string, graph: IGraph) => void | undefined | 点击 ToolBar 中每个图标的回调函数 |
| position | Point | null | ToolBar 的位置坐标 |

### Usage

#### Default Usage
默认的 ToolBar 提供了撤销、重做、放大等功能。

```
const toolbar = new G6.ToolBar();

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 Menu 插件
});
```

#### String ToolBar

```
const tc = document.createElement('div');
tc.id = 'toolbarContainer';
document.body.appendChild(tc);

const toolbar = new G6.ToolBar({
  container: tc,
  getContent: () => {
    return `
      <ul>
        <li code='add'>测试</li>
        <li code='undo'>撤销</li>
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
  //... 其他配置项
  plugins: [toolbar], // 配置 Menu 插件
});
```

#### DOM ToolBar

```
const toolbar = new G6.ToolBar({
  getContent: () => {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`
    return outDiv
  },
  handleClick: (code, graph) => {
    
  }
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 Menu 插件
});
```

## TimeBar

目前 G6 内置的 TimeBar 主要有以下功能：
- 改变时间范围，过滤图上的数据；
- TimeBar 上展示指定字段随时间推移的变化趋势。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HJjmT7uQwjAAAAAAAAAAAABkARQnAQ' width=700 alt='img'/>

**说明：** 目前的 TimeBar 功能还比较简单，不能用于较为复杂的时序分析。

### Configuration

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| container | HTMLDivElement | null | TimeBar 容器，如果不设置，则默认创建 className 为 g6-component-timebar 的 DOM 容器 |
| width | number | 400 | TimeBar 容器宽度 |
| height | number | 400 | TimeBar 容器高度 |
| timebar | TimeBarOption | {} | TimeBar 样式配置项 |
| rangeChange | (graph: IGraph, min: number, max: number) => void | null | 改变时间范围后的回调函数 |


**TimeBarOption 配置项**

```
interface HandleStyle {
  width: number;
  height: number;
  style: ShapeStyle;
}
```

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| x | number | 0 | TimeBar 起始 x 坐标 |
| y | number | 0 | TimeBar 起始 y 坐标 |
| width | number | 400 | TimeBar 宽度 |
| height | number | 400 | TimeBar 高度 |
| backgroundStyle | ShapeStyle | {} | TimeBar 背景样式配置项 |
| foregroundStyle | ShapeStyle | {} | TimeBar 选中部分样式配置项 |
| handlerStyle | HandleStyle | null | 滑块样式设置 |
| textStyle | ShapeStyle | null | 文本样式 |
| minLimit | number | 0 | 允许滑块最左边（最小）位置，范围 0-1 |
| maxLimit | number | 1 | 允许滑块最右边（最大）位置，范围 0-1 |
| start | number | 0 | 滑块初始开始位置 |
| end | number | 1 | 滑块初始结束位置 |
| minText | string | null | 滑块最小值时显示的文本 |
| maxText | string | null | 滑块最大值时显示的文本 |
| trend | TrendConfig | null | 滑块上趋势图配置 |

**TrendConfig 配置项**

```
interface Data {
  date: string;
  value: number;
}
```

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| data | Data[] | [] | 滑块上的数据源 |
| smooth | boolean | false | 是否是平滑的曲线 |
| isArea | boolean | false | 是否显示面积图 |
| lineStyle | ShapeStyle | null | 折线的样式 |
| areaStyle | ShapeStyle | null | 面积的样式，只有当 isArea 为 true 时生效 |

### 用法

#### 默认用法
G6 内置的默认的 TimeBar 有默认的样式及交互功能。

```
const timebar = new G6.TimeBar();

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [timebar], // 配置 timebar 插件
});
```

##### 配置样式
可以个性化定制 TimeBar 的样式，也可以自己定义时间范围改变后的处理方式。

```
const timebar = new G6.TimeBar({
  width: 600,
  timebar: {
    width: 600,
    backgroundStyle: {
      fill: '#08979c',
      opacity: 0.3
    },
    foregroundStyle: {
      fill: '#40a9ff',
      opacity: 0.4
    },
    trend: {
      data: timeBarData,
      isArea: false,
      smooth: true,
      lineStyle: {
        stroke: '#9254de'
      }
    }
  },
  rangeChange: (graph, min, max) => {
    // 拿到 Graph 实例和 timebar 上范围，自己可以控制图上的渲染逻辑
    console.log(graph, min, max)
  }
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [timebar], // 配置 timebar 插件
});
```


## ToolTip

ToolTip 插件主要用于在节点和边上展示一些辅助信息，G6 4.0 以后，Tooltip 插件将会替换 Behavior 中的 tooltip。

### Configuration

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| className | string | null | tooltip 容器的 class 类名 |
| container | HTMLDivElement | null | Tooltip 容器，如果不设置，则默认使用 canvas 的 DOM 容器 |
| getContent | (graph?: IGraph) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aPPuQquN5Q0AAAAAAAAAAABkARQnAQ' width=80 alt='img'/> | Tooltip 内容，支持 DOM 元素或字符串 |
| offset | number | 6 | tooltip 的偏移值，作用于 x y 两个方向上 |

### 用法

默认的 Tooltip 只展示元素类型和 ID，一般情况下都需要用户自己定义 Tooltip 上面展示的内容。

#### Dom Tooltip
```
const tooltip = new G6.Tooltip({
  offset: 10,
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `
      <h4>自定义tooltip</h4>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`
    return outDiv
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [tooltip], // 配置 Menu 插件
});
```

#### String Tooltip
```
const tooltip = new G6.Tooltip({
  getContent(e) {
    return `<div style='width: 180px;'>
      <ul id='menu'>
        <li title='1'>测试02</li>
        <li title='2'>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
      </ul>
    </div>`;
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [tooltip], // 配置 Menu 插件
});
```
