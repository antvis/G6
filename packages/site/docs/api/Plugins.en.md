---
title: Plugins
order: 14
---

There are several plugins in G6 which can be used for G6's graph or other applications.

- [Legend](#legend) _supported by v4.3.0 and later versions_
- [SnapLine](#snapline) _supported by v4.3.0 and later versions_
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

## Legend

Legend is a built-in legend plugin for G6. It is useful for npde/edge type demonstration, and the end-users are able to interact with the legend to highlight and filter the items on the graph. _supported after v4.3.0_.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UmXzQLG65vYAAAAAAAAAAAAAARQnAQ' alt="img" width='500px'>

### Configuration

| Name | Type | Description |
| --- | --- | --- |
| data | GraphData | The data for the legend, not related to the data of the graph. The legend for nodes currently supports `'circle'`, `'rect'`, and `'ellipse'`. The legend for edges currently supports `'line'`, `'cubic'`, and `'quadratic'`. `type` for each data means the type of the legend item, and the `order` could be assigned to each node/edge data for ordering in a legend group |
| position | 'top' / 'top-left' / 'top-right' / 'right' / 'right-top' / 'right-bottom' / 'left' / 'left-top' / 'left-bottom' / 'bottom' / 'bottom-left' / 'bottom-right' | The relative of the position to the canvas. `'top'` by default, which means the legend area is on the top of the canvas |
| padding | number / number[] | The inner distance between the content of the legend to the border of the legend area. Array with four numbers means the padding to the top, right, bottom, and left responsively |
| margin | number / number[] | The outer distance between the legend area to the border of the canvas. Array with four numbers means the distance to the top, right, bottom, and left responsively. Only the top distance takes effect when `position:'top'`, situations for other `position` configurations are similar to it |
| offsetX | number | The x-axis offset for the legend area, it is useful when you want to adjust the position of the lenged slightly |
| offsetY | number | The y-axis offset for the legend area, it is useful when you want to adjust the position of the lenged slightly |
| containerStyle | ShapeStyle | The style for the background rect, the format is similar as [rect shape style](/en/docs/api/shape-properties#rect) |
| horiSep | number | The horizontal seperation of the legend items |
| vertiSep | number | The vertical seperation of the legend items |
| layout | 'vertical' / 'horizontal' | The layout of the legend items. `'horizontal'` by default |
| align | 'center' / 'right' / 'left' | The alignment of the legend items. `'center'` by default |
| title | string | The title string for the legend, the style of the title could be configured by `titleConfig` |
| titleConfig | object | The style of the legend title, detail configurations are shown in following lines |
| titleConfig.position | 'center' / 'right' / 'left' | The alignment of the title to the legend content. `'center'` by default |
| titleConfig.offsetX | number | The x-axis offset for the legend title, it is useful when you want to adjust the position of the title slightly |
| titleConfig.offsetY | number | The y-axis offset for the legend title, it is useful when you want to adjust the position of the title slightly |
| titleConfig[key] | ShapeStyle | Other styles for the text, configurations are same as [text shape style](/en/docs/api/shape-properties#text) |
| filter | object | Configurations for the graph item filtering while the end-user interacting with the legend items. Detials are shown in the following lines |
| filter.enable | boolean | Whether allow filtering the items in the main graph while the end-user interaction with the legend items. `false` by default |
| filter.multiple | boolean | Whether support active multiple types of legend items, `false` by default, which means only one type of legend item will be activated in the same time. If it is `true`, multiple items could be activated only when the `filter.trigger` is `'click'` |
| filter.trigger | 'click' / 'mouseenter' | The interaction way to the legend items. `click` by default, which means while the end-user clicking a legend item, the legend item and corresponding filtered items on the main graph will be activated |
| filter.legendStateStyles | { active?: ShapeStyle, inactive?: ShapeStyle | The state styles for the legend items while filtering, inluding `filter.legendStateStyles.active` and `filter.legendStateStyles.inactive`. The type of each one is `ShapeStyle`. Similar to the `nodeStateStyles` of Graph |
| filter.graphActiveState | string | The activate state name for the items on the main graph. When a lenged item is activated, the corresponding items of the main graph will be set to `filter.graphActiveState`, `'active'` by default. And you should assign the state style for this state name on Graph |
| filter.graphInactiveState | string | The inactivate state name for the items on the main graph. When a lenged item is inactivated, the corresponding items of the main graph will be set to `filter.graphInactiveState`, `'inactive'` by default. And you should assign the state style for this state name on Graph |
| filter.filterFunctions | { [key: string]: (d) => boolean; } | Since the data of the legend is not related to the main graph, you should configure filtering functions for each legend item type. The `key` is corresponding to the `type` of the legend item, and the value is a function. For the function, the parameter is the item data of the main graph, and the return value is a boolean which means whether the item of the main graph should be activated |

## SnapLine

SnapLine is a built-in components in G6. _supported by v4.3.0 and later versions_.

### Configuration

| Name          | Type                                          | Required | Description           |
| ------------- | --------------------------------------------- | -------- | --------------------- |
| line          | ShapeStyle                                    | false    | the style of SnapLine |
| itemAlignType | boolean、'horizontal' 、'vertical'、'center'; | false    | the type of SnapLine  |

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
| hideEdge | Boolean | false | **Supported by v4.7.16** Whether to hide the edges on minimap to enhance the performance |

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

```javascript
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

> Edge bundling on American airline graph. <a href='/en/examples/case/graphDemos#edgeBundling' target='_blank'>Demo Link</a>. <a href='/en/docs/api/plugins#edge-bundling' target='_blank'>Demo Document</a>.

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
| handleMenuClick | (target: HTMLElement, item: Item, graph?: IGraph) => void | undefined | the callback function when click the menu |
| shouldBegin | (evt: G6Event) => boolean | undefined | whether allow the menu show up, you can return `true` or `false` according to the `evt.item` or `evt.target` |
| offsetX | number | 6 | The x offset of the menu to the parent container |
| offsetY | number | 6 | The y offset of the menu to the parent container |
| itemTypes | string[] | ['node', 'edge', 'combo'] | which types of items the menu takes effect on. E.g. if you want the menu shows up only on node, assign `itemTypes` with ['node'] |
| trigger | 'click' / 'contextmenu' | 'contextmenu' | the trigger for the menu, `'contextmenu'` by default, which means the menu will show up when the end user right click on some item. `'click'` means left click. _'click' is supported by v4.3.2 and later versions_ |

### Usage

Use G6 build-in menu by default.

```javascript
// Instantiate Menu plugin
const menu = new G6.Menu();
const graph = new G6.Graph({
  //... other Configuration
  plugins: [menu],
});
```

#### DOM Menu

```javascript
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
      </ul>`;
    return outDiv;
  },
  handleMenuClick(target, item) {
    console.log(target, item);
  },
});

const graph = new G6.Graph({
  //... other Configuration
  plugins: [menu], // the Menu plugin
});
```

#### String Menu

```javascript
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
    console.log(target, item);
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

```javascript
const toolbar = new G6.ToolBar();

const graph = new G6.Graph({
  //... Other configurations
  plugins: [toolbar], // Use the ToolBar plugin
});
```

#### Custom ToolBar by String

```javascript
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
    `;
  },
  handleClick: (code, graph) => {
    if (code === 'add') {
      graph.addItem('node', {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 150,
      });
    } else if (code === 'undo') {
      // redefine undo operator
      toolbar.undo();
      toolbar.autoZoom();
    } else {
      // Other operations remain default
      toolbar.handleDefaultOperator(code);
    }
  },
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [toolbar], // Use the ToolBar plugin
});
```

#### Custom ToolBar by DOM

```javascript
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
      </ul>`;
    return outDiv;
  },
  handleClick: (code, graph) => {},
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [toolbar], // Use the ToolBar plugin
});
```

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
| trigger | 'mouseenter' / 'click' | 'mouseenter' | Supported by v4.2.1. The trigger to show the tooltip. By default, the tooltip shows up when the mouse enter a node/edge/combo, where the trigger is `'mouseebter'`. If the trigger is assigned to `'click'`, the tooltip shows up when the user click a node/edge/combo |
| fixToNode | boolean / [number, number] | false | Supported by v4.2.1. Whether fix the position of the tooltip when mouse moving on the node. By default, the `fixToNode` is `false`, which means the tooltip follows the position of the mouse. If the `fixToNode` is assigned to an array as `[number, number]`, it means fixing the tooltip to a relative position to the target node. e.g. `[1, 0.5]` means the tooltip will be fixed to the right of the node after showing up, and do not follow the mouse when mouse move on the node. The meaning of the array is similar to the [Anchor Point](/en/docs/manual/middle/elements/nodes/anchorpoint). `fixToNode` is only available for tooltip on node |

### Usage

The content of the Tooltip is the type and id of the item by default. Users are free to custom the content of the Tooltip by configuring `getContent`:

#### Dom Tooltip

```javascript
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
      </ul>`;
    return outDiv;
  },
  itemTypes: ['node'],
});

const graph = new G6.Graph({
  //... Other configurations
  plugins: [tooltip], // Use Tooltip plugin
});
```

#### String Tooltip

```javascript
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

### Event Listener

TimeBar Plugin exposes several timing events. They could be listened by `graph.on('eventname', e => {})`.

| Event Name    | Description                          |
| ------------- | ------------------------------------ |
| tooltipchange | Emitted when the Tooltip is changed. |

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

```javascript
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

```javascript
const fisheye = new G6.Fisheye({
  trigger: 'mousemove',
  d: 1.5,
  r: 300,
  delegateStyle: clone(lensDelegateStyle),
  showLabel: false,
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

```javascript
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

```javascript
const filterLens = new G6.EdgeFilterLens({
  trigger: 'mousemove',
  r: 300,
  shouldShow: (d) => {
    return d.size > 10;
  },
});

const graph = new G6.Graph({
  //... Other graph configurations
  plugins: [filterLens], // configuring edge filter lens plugin
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

<br />Refer to the demos [HERE](https://g6-v4.antv.vision/en/examples/tool/timebar#timebar)<br />

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

### Event Listener

TimeBar Plugin exposes several timing events. They could be listened by `graph.on('eventname', e => {})`.

| Event Name       | Description                                            |
| ---------------- | ------------------------------------------------------ |
| valuechange      | Emitted when the value range of the timebar is chaged. |
| timebarstartplay | Emitted when the timeline starts to play.              |
| timebarendplay   | Emitted when the timeline ends playing.                |

### API

#### play

Controll the timebar instance begin to play. e.g. `timebar.play()`.

#### pause

Controll the timebar instance to pause. e.g. `timebar.pause()`.

### Definition of the Interfaces

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

  // when the type is 'tick', it is the configuration for the TimeBar with descrete ticks
  // when the type is 'trend' or 'simpe', it is the configuration for the time tick labels under the timeBar
  readonly tick?: TimeBarSliceOption | TickCfg;

  // the buttons for play, fast forward, and back forward
  readonly controllerCfg?: ControllerCfg;

  // [Supported from v4.5.1] the CSS style for the DOM container of the timebar
  readonly containerCSS?: Object;

  // [Supported from v4.5.1] the item types that will be filtered by the timebar. e.g. ['node', 'edge']. The default value is ['node']
  readonly filterItemTypes?: string[];

  // [Deprecated from v4.5.1, replaced by filterItemTypes] whether to consider the edge filtering. If it is false, only filter the nodes and the edges whose end nodes are filtered out while the selected range of the timeBar is changed. If it is true, there should be `date` properties on the edges data, and the timeBar will filter the edges which is not in the selected range in the same time
  readonly filterEdge?: boolean;

  // [Supported from v4.5.1] whether filter the nodes and edges on the graph by graph.changeData, which means the data of the graph will be changed by the timebar. If it is false, the graph.hideItem and graph.showItem will be called to hide/show the nodes and edges instead of changeData
  readonly changeData?: boolean;

  // the callback function after the time range is changed. When it is not assigned, the graph elements will be filtered after the time range is changed
  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;

  // [Supported from v4.5.1] user returns the date value according to the data of a node or an edge
  getDate?: (d: any) => number;

  // [Supported from v4.5.1] user returns the value according to the data of a node or an edge. The value is used to draw the trend line for timebar with type 'trend'
  getValue?: (d: any) => number;

  // [Supported from v4.5.1] user returns true or false to decide whether to ignore the node or the edge while filtering. If it is true, the item with data model will be ignored. Or the item will be filtered according to the min and max date value
  shouldIgnore?: (itemType: 'node' | 'edge', model: any, dateRage: { min: number, max: number }) => boolean;
}
```

#### The Parameters of the Interfaces

| Name | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| container | HTMLDivElement | null | The DOM container of the TimeBar. By default, the plugin will create a container DOM with 'g6-component-timebar' as className |
| x | number | 0 | The beginning x position of the TimeBar plugin |
| y | number | 0 | The beginning y position of the TimeBar plugin |
| width | number |  | **Requred**, the width of the TimeBar |
| height | number |  | **Requred**, the height of the TimeBar |
| padding | number/number[] | 10 | The padding of the container of the TimeBar |
| type | 'trend' / 'simple' / 'tick' | trend | The type of the TimeBar, 'trend' by default |
| trend | TrendConfig | null | The configuration for the TimeBar with line chart and simple TimeBar, takes effect whtn the type is 'trend' or 'simple' |
| slider | SliderOption | null | The configurations for the two sliders |
| tick | TimeBarSliceOption / TickCfg | null | If the type is 'tick', it is the configuration for the TimeBar with descrete ticks. If it the type is 'trend' or 'simple', it is the configuration for the time tick labels under the timeBar |
| controllerCfg | ControllerCfg | null | The buttons for play, fast forward, and back forward |
| containerCSS | Object | null | [Supported from v4.5.1] The CSS style for the DOM container of the timebar |
| filterItemTypes | string[] | null | [Supported from v4.5.1] The item types that will be filtered by the timebar. e.g. ['node', 'edge']. The default value is ['node'] |
| filterEdge | boolean | false | [Deprecated from v4.5.1, replaced by filterItemTypes] Whether to consider the edge filtering. If it is false, only filter the nodes and the edges whose end nodes are filtered out while the selected range of the timeBar is changed. If it is true, there should be `date` properties on the edges data, and the timeBar will filter the edges which is not in the selected range in the same time |
| changeData | boolean | null | [Supported from v4.5.1] Whether filter the nodes and edges on the graph by graph.changeData, which means the data of the graph will be changed by the timebar. If it is false, the graph.hideItem and graph.showItem will be called to hide/show the nodes and edges instead of changeData |
| rangeChange | Function | null | The callback function after the time range is changed. When it is not assigned, the graph elements will be filtered after the time range is changed |
| getDate | (d: any) => number | null | [Supported from v4.5.1] User returns the date value according to the data of a node or an edge |
| getValue | (d: any) => number | null | [Supported from v4.5.1] User returns the value according to the data of a node or an edge. The value is used to draw the trend line for timebar with type 'trend' |
| shouldIgnore | (itemType: 'node' | 'edge', model: any, dateRage: { min: number, max: number }) => boolean | null | [Supported from v4.5.1] User returns true or false to decide whether to ignore the node or the edge while filtering. If it is true, the item with data model will be ignored. Or the item will be filtered according to the min and max date value |

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
| interval | Interval | null | The configuration for the style of the bars in the chart. When it is assigned, a mixed trend chart will take place. `Interval = { data: number[], style: ShapeStyle }`. Except the configurations in `ShapeStyle` for the style of the shapes in the bar charts, `barWidth` for the width of one bar is also configurable for `style` |

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

#### TickCfg

```javascript
export interface TickCfg {
  // the fomatter for the time tick labels
  readonly tickLabelFormatter?: (d: any) => string | undefined;
  // the shape style for the time tick labels. [Supported from v4.5.1] tickLabelStyle.rotate can be configured to controll the rotate of the tick label to avoid overlappings
  readonly tickLabelStyle?: ShapeStyle;
  // the shape style for the short vertical lines uppon the time tick labels
  readonly tickLineStyle?: ShapeStyle;
}
```

#### Parameters for TickCfg

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| tickLabelFormatter | Function | null | The formatter function for customing the labels of the ticks |
| tickLabelStyle | ShapeStyle | {} | The shape style for the time tick labels. [Supported from v4.5.1] tickLabelStyle.rotate can be configured to controll the rotate of the tick label to avoid overlappings |
| tickLineStyle | ShapeStyle | {} | The shape style for the short vertical lines uppon the time tick labels |

#### Interface of the ControllerCfg

> Does not support for now

> Does not support the style configuration for controller buttons

> Does not support loop play

```javascript
type ControllerCfg = Partial<{
  /** the begining position and the size of the controller, the width and height will not scale the sub-controllers but only affects the positions of them. To change the size of the sub-controllers, try ControllerCfg.scale or the scale in the style of sub-controller */
  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  /** the scale of the whole controller */
  readonly scale?: number;
  /** the fill and stroke color of the background */
  readonly fill?: string;
  readonly stroke?: string;
  /** the font family for the whole controller, whose priority is lower than the fontFamily in the text style of each sub-controller */
  readonly fontFamily?: string;

  /** the play spped, means the playing time for 1 tick */
  readonly speed?: number;
  /** whether play in loop */
  readonly loop?: boolean;
  /** whether hide the 'time type controller' on the right-bottom */
  readonly hideTimeTypeController: boolean;

  /** style of the backward button. scale, offsetX, offsetY are also can be assigned to it to controll the size and position of the backward button */
  readonly preBtnStyle?: ShapeStyle;

  /** style of the forward button. scale, offsetX, offsetY are also can be assigned to it to controll the size and position of the forward button */
  readonly nextBtnStyle?: ShapeStyle;

  /** style of the play button. scale, offsetX, offsetY are also can be assigned to it to controll the size and position of the paly button */
  readonly playBtnStyle?: ShapeStyle;

  /** style of the 'speed controller'. scale, offsetX, offsetY are also can be assigned to it and each sub-styles to controll the size and position of the speed controller and sub-shapes*/
  readonly speedControllerStyle?: {
    offsetX?: number,
    offsetY?: number;
    scale?: number
    pointer?: ShapeStyle,
    scroller?: ShapeStyle,
    text?: ShapeStyle
  };

  /** style of the 'time type controller'. scale, offsetX, offsetY  are also can be assigned to it and each sub-styles to controll the size and position of the speed controller and sub-shapes */
  readonly timeTypeControllerStyle?: {
    offsetX?: number,
    offsetY?: number;
    scale?: number
    check?: ShapeStyle,
    box?: ShapeStyle,
    text?: ShapeStyle
  };
  /** [Supported from v4.5.1] The style of the background rect of the controller */
  readonly containerStyle?: ExtendedShapeStyle;
  /** the text for the right-bottom switch controlling play with single time point or time range */
  readonly timePointControllerText?: string;
  readonly timeRangeControllerText?: string;
  /** [Supported from v4.7.11] the default type of the playing, 'single' means single time point, and 'range' means time range. 'range' by default */
  readonly defaultTimeType?: 'single' | 'range';
}>
```

#### Parameters for ControllerCfg

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| x | number | 0 | The beginning x position for the buttons group of the TimeBar |
| y | number | 0 | The beginning y position for the buttons group of the TimeBar |
| width | number | The width of the TimeBar | The width of the buttons group of the TimeBar, do not scale the sub-controllers but only affects the positions of them |
| height | number | 40 | The width of the buttons group of the TimeBar, do not scale the sub-controllers but only affects the positions of them |
| scale | number | 1 | The scale of the whole controller |
| speed | number | 1 | The play speed |
| loop | boolean | false | _Does not support for now_, whether play in loop |
| hideTimeTypeController | boolean | true | Whther hide the time type controller on the right bottom |
| fill | string |  | The fillling color for the background of the controller |
| stroke | string |  | The stroke color for the background of the buttons group |
| preBtnStyle | ShapeStyle | null | The style of the backward button. `scale`, `offsetX`, `offsetY` are also can be assigned to it to controll the size and position of the backward button |
| nextBtnStyle | ShapeStyle | null | The style of the forward button. `scale`, `offsetX`, `offsetY` are also can be assigned to it to controll the size and position of the forward button |
| playBtnStyle | ShapeStyle | null | The style of the play button. `scale`, `offsetX`, `offsetY` are also can be assigned to it to controll the size and position of the paly button |
| speedControllerStyle | { offsetX?: number, offsetY?: number, scale?: number, pointer?: ShapeStyle, text?: ShapeStyle, scroller?: ShapeStyle} | null | The style of the 'speed controller'. `scale`, `offsetX`, `offsetY` are also can be assigned to it and each sub-styles to controll the size and position of the speed controller and sub-shapes |
| timeTypeControllerStyle | { offsetX?: number, offsetY?: number, scale?: number, box?: ShapeStyle, check?: ShapeStyle, text?: ShapeStyle } | null | The style of the 'time type controller'. `scale`, `offsetX`, `offsetY` are also can be assigned to it and each sub-styles to controll the size and position of the speed controller and sub-shapes |
| containerStyle ｜ ShapeStyle | {} | [Supported from v4.5.1] The style of the background rect of the controller |
| timePointControllerText | string | "单一时间" | The text for the right-bottom switch controlling play with single time point or time range |
| timeRangeControllerText | string | "时间范围" | The text for the right-bottom switch controlling play with single time point or time range |
