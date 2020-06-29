---
title: Plugins
order: 11
---

There are several plugins in G6 which can be used inside and ouside G6 freely.

- [Grid](#grid)
- [Minimap](#minimap)
- [Edge Bundling](#edge-bundling)

## Configure to Graph

You only need to instantiate it and configure the minimap onto the instance of Graph:

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

Grid draw grids on the canvas.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

Use the code in [Configure to Graph](#configure-to-graph) to instantiate grid plugin with the following configurations.

### Configuration

| Name | Type | Description |
| --- | --- | --- |
| img | Srting | base64 formatted string for the grid image |


## Minimap

Minimap is a tool for quick preview and exploration on large graph.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

It can be configured to adjust the styles and functions.

### Configuration

| Name | Type | Description |
| --- | --- | --- |
| container | Object | The DOM container of Minimap. The plugin will generate a new one if `container` is not defined |
| className | String | The className of the DOM element of the Minimap |
| viewportClassName | String | The className of the DOM element of the view port on the Minimap |
| type | String | Render type. Options: `'default'`: Render all the graphics shapes on the graph; `'keyShape'`: Only render the keyShape of the items on the graph to reach better performance; `'delegate'`: Only render the delegate of the items on the graph to reach better performance. Performance: `'default'` < `'keyShape'` < `'delegate'`. `'default'` by default |
| size | Array | The size of the Minimap |
| delegateStyle | Object | Takes effect when `type` is `'delegate'`. The style of the delegate of the items on the graph |

The `delegateStyle` has the properties:

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| fill        | String | Filling color           |
| stroke      | String | Stroke color            |
| lineWidth   | Number | The width of the stroke |
| opacity     | Number | Opacity                 |
| fillOpacity | Number | Filling opacity         |

## Edge Bundling

In complex graph with large number of edges, edge bundling can help you to improve the visual clutter.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

> Edge bundling on American airline graph. <a href='http://antv-2018.alipay.com/zh-cn/g6/3.x/demo/case/american-migration-bundling.html' target='_blank'>Demo Link</a>. <a href='https://g6.antv.vision/zh/docs/manual/cases/edgeBundling' target='_blank'>Demo Document</a>.

The edge bundling plugin can be configured to adjust the styles and functions.

### Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| K | Number | 0.1 | The strength of the bundling |
| lambda | Number | 0.1 | The initial step length |
| divisions | Number | 1 | The initial number of division on each edge. It will be multipled by `divRate` in each cycle |
| divRate | Number | 2 | The rate of the divisions increasement. Large number means smoother result, but the performance will be worse when the number is too large |
| cycles | Number | 6 | The number of outer interations |
| iterations | Number | 90 | The initial number of inner interations. It will be multiplied by `iterRate` in each cycle |
| iterRate | Number | 0.6666667 | The rate of the iterations decreasement |
| bundleThreshold | Number | 0.6 | The edge similarity threshold for bundling. Large number means the edges in one bundle have smaller similarity, in other words, more edges in one bundle |
