---
title: Graph
order: 1
---

## What is Graph

"Graph" means graphics, images, figures in the traditional cognitive. The "Graph" in graph theory and visuzliation has specific definition: it is make up of objects and their relationships. It might not a visual graph, but a relational data.<br />

Graph is the carrier of G6. All the operations about events, behaviors, items are mounted on the instance of Graph.

The life cycle of an instance of Graph is:

Initialize -> Load data -> Render -> Update -> Destroy.

In [Getting Started](/en/docs/manual/getting-started), we introduce the process of initialization, data loading, graph rendering. In this document, we will introduce the initialization/instantiating process in detail.

## Prerequisite Code

The code for interpretation of this chapter will base on the following JavaScript code embedded in HTML. By defining the data, instantiating the graph, loading the data, and rendering the graph, the code below results in the graph in the figure:<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Lo6lT7SrhB8AAAAAAAAAAABkARQnAQ' width='200' alt='img'/>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    /* The container of the graph */
    <div id="mountNode"></div>
    /* Import G6 */
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script>
    <script>
      // Define the source data
      const data = {
        // The array of nodes
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
        ],
        // The array of edges
        edges: [
          // It is an edge link node1 to node2
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      // Create an instance of G6.Graph
      const graph = new G6.Graph({
        container: 'mountNode', // Assign the id of the graph container
        // The width and the height of the graph
        width: 800,
        height: 500,
      });
      // Load data
      graph.data(data);
      // Render the graph
      graph.render();
    </script>
  </body>
</html>
```

## Initialize/Instantiate a Graph

Instantiate a Graph by `new G6.Graph(config)`, where the parameter `config` is an object of graph configurations. Most global configurations are assigned here. As shown in [Prerequisite Code](#Prerequisite Code), we instantiate a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode', // Assign the id of the graph container
  // The width and the height of the graph
  width: 800,
  height: 500,
});
```

### Required Configuration

There are three required configurations when instantiating a Graph:

- `container`

Type: String | Object. The DOM container of the graph. It can be a string for the `id` of the DOM container, or an object for the DOM object.

- `width` and `height`

Type: Number. THe width and the height of the graph.

### Commonly used Configuration

There are some commonly used configurations. For complete configurations, please refer to [Graph API](/en/docs/api/Graph).

#### Rendering

- `renderer`

Type: String; Default: 'canvas', the value could be 'canvas' or 'svg'. Render the graph with Canvas or SVG. _It is supported expecting V3.3.x._ SVG rendering in G6 supports all the functions in Canvas rendering. We all known that the performance of SVG is not good as canvas. So use Canvas rendering in the case of large data instead. Expect for default nodes and edges and graphics shapes used in custom node and edge as Canvas version, SVG also supports `'dom'` shape when customing node or edge. Detials are in [Custom Node with Dom](/en/docs/manual/middle/elements/nodes/custom-node#5-custom-node-with-dom).

#### Auto Fit

- `fitView`

Type: Boolean; Default: 'false'. Whether to fit the canvas to the view port automatically.

- `fitViewPadding`

Type: Number | Array; Default: 0. It is the padding between canvas and the border of view port. Takes effect only when `fitView: true`.

- `fitCenter`

Type: Boolean; Default: 'false'. Whether to translate the graph to align its center with the canvas. _Supported by v3.5.1._

#### Global Item Configuration

- `defaultNode`

Type: Object. The global configuration for all the nodes in the graph in default state. It includes the style properties and other properties of nodes. Refer to [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode).

- `defaultEdge`

Type: Object. The global configuration for all the edges in the graph in default state. It includes the style properties and other properties of edges. Refer to [Built-in Edges](/en/docs/manual/middle/elements/nodes/defaultEdge).

- `nodeStateStyles`

Type: Object. The style properties of nodes in different states expect for default state. Refer to [State](/en/docs/manual/middle/states/state).

- `edgeStateStyles`

Type: Object. The style properties of edges in different states expect for default state. Refer to [State](/en/docs/manual/middle/states/state).

#### Layout

- `layout`

Type: Object. If there is no position information in data, Random Layout will take effect by default. The layout options and their configurations can be found in [Layout](/en/docs/manual/middle/layout/graph-layout)，[Graph Layout API](/en/docs/api/graphLayout/guide) or [TreeGraph Layout API](/en/docs/api/treeGraphLayout/guide).

#### Interaction

- `modes`

Type: Array. It is the set of interactions modes. One mode is made up of one or more interaction events. Refer to [Mode](/en/docs/manual/middle/states/mode).

#### Animation

- `animate`

Type: Boolean; Default: 'false'. Whether to activate the global animation. If it is `true`, the positions of nodes will be changed animatively when the layout is changed.

- `animateCfg`

Type: Object. The configurations for global animation, includes easing functions, duration, and so on. Refer to [Animation](/en/docs/manual/middle/animation).

#### Plugin

- `plugins`

Type: Array. The plugins to assist the anaysis. Refer to [Plugins and Tools](/en/docs/manual/tutorial/plugins).

## Commonly Used Functions

There are two required functions in the code of [Prerequisite Code](#Prerequisite Code):

```javascript
// Load the data
graph.data(data);
// Render the graph
graph.render();
```

- `data(data)`: Load the source `data` to the instance `graph`.
- render(): render the graph.

For complete functions for Graph, refer to [Graph API](/en/docs/api/Graph).
