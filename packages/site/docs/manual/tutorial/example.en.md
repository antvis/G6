---
title: Render the Tutorial Demo
order: 1
---

In this chapter, we preliminary configure and render the **Tutorial Demo**. You will learn the common configurations of Graph.

## Basic Rendering

### Create a HTML Container

Create an HTML container for graph canvas, `div` tag in general. G6 will append a `canvas` tag to it and draw graph on the `canvas`.

```html
<body>
  <div id="mountNode"></div>

  <!-- Import G6 -->
  <!-- ... -->
</body>
```

### Data Preparation

The data for G6 should be JSON format, includes array properties `nodes` and `edges`:

```html
<script>
  // console.log(G6.Global.version);
  const initData = {
    // The array of nodes
    nodes: [
      {
        id: 'node1', // String, unique and required
        x: 100, // Number, the x coordinate
        y: 200, // Number, the y coordinate
        label: 'Source', // The label of the node
      },
      {
        id: 'node2',
        x: 300,
        y: 200,
        label: 'Target',
      },
    ],
    // The array of edges
    edges: [
      // An edge links from node1 to node2
      {
        source: 'node1', // String, required, the id of the source node
        target: 'node2', // String, required, the id of the target node
        label: 'I am an edge', // The label of the edge
      },
    ],
  };
</script>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span>

- `nodes` is an array of nodes, the `id` is an unique and required property; the `x` and `y` are the coordinates of the node;
- `edges` is an array of edges, `source` and `target` are required, represent the `id` of the source node and the `id` of the target node respectively.
- The properties of node and edge are described in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) and [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge) document.

### Instantiate the Graph

The container, width, and height are required configurations when instantiating a Graph:

```html
<script>
  // const initData = { ... }
  const graph = new G6.Graph({
    container: 'mountNode', // String | HTMLElement, required, the id of DOM element or an HTML node
    width: 800, // Number, required, the width of the graph
    height: 500, // Number, required, the height of the graph
  });
</script>
```

### Load the Data and Render

Load data and render are two separated steps.

```html
<script>
  // const initData = { ... }
  //  const graph = ...
  graph.data(data); // Load the data defined in Step 2
  graph.render(); // Render the graph
</script>
```

### The Result

After calling `graph.render()` , G6 will render the graph according to the data.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YTfpQYVGhuEAAAAAAAAAAABkARQnAQ' width=400 alt='img' />

## Load the Real Data

In the above demo, we render a graph with two nodes and one edge defined in the code directly. For real scenario, the data might be loaded remotely. We prepare the JSON data for **Tutorial Demo** with the address: <br />`https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json`

### Load the Remote Data

Modify index.html to load remote data asynchronously by `fetch`, and pass it to the instance of G6 Graph:

```html
<script>
  //  const graph = ...
  const main = async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
    );
    const remoteData = await response.json();

    // ...
    graph.data(remoteData); // Load the remote data
    graph.render(); // Render the graph
  };
  main();
</script>
```

> `fetch` allows us to fetch the remote data asynchronously, and controll the process by `async`/`await`. If you are curious about `fetch` and `async`/`await`, please refer to: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

We will get the following result with the code above:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KzQaSZKIsQoAAAAAAAAAAABkARQnAQ' width=550 height=350 alt='img' />

The data has been loaded correctly. But the result is a little bit strange due to the large amount of nodes and edges. Limited by the size of canvas, part of the graph is arranged out of the view. We are going to solve all these problems now.

Here goes a part of tutorial-data.json. There are `x` and `y` in node data, and some of them are not in the range of `width: 800, height: 600`.

```json
{
  "nodes": [
    { "id": "0", "label": "n0", "class": "c0", "x": 1000, "y": -100 },
    { "id": "1", "label": "n1", "class": "c0", "x": 300, "y": -10 }
    //...
  ],
  "edges": [
    //...
  ]
}
```

G6 will render the graph according to the position information in the data once G6 finds `x` and `y` in the data. This mechanism satisfies the requirement that rendering the source data. To solve the problem of the graph out of the view port partially, two configurations are provided:

- `fitView`: Whether to fit the graph to the canvas;
- `fitViewPadding`: The padding between the content of the graph and the borders of the canvas.

We modify the code about instantiating Graph as shown below:

```javascript
const graph = new G6.Graph({
  // ...
  fitView: true,
  fitViewPadding: [20, 40, 50, 20],
});
```

The result from this code shows that the graph has been fitted to the canvas: <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAXzRJaNTXUAAAAAAAAAAABkARQnAQ' width=850 alt='img' />

## Common Configuration

The configurations below will be used in the following Tutorial:

| Name | Type | Options / Example | Default | Description |
| --- | --- | --- | --- | --- |
| fitView | Boolean | true / false | false | Whether to fit the graph to the canvas. |
| fitViewPadding | Number / Array | 20 / [ 20, 40, 50, 20 ] | 0 | The padding between the content of the graph and the borders of the canvas. |
| animate | Boolean | true / false | false | Whether to activate the global animation. |
| modes | Object | {<br />  default: [ 'drag-node', 'drag-canvas' ]<br />} | null | The set of graph interaction modes. This is a complicated concept, refer to [Mode](/en/docs/manual/middle/states/mode) for more detial. |
| defaultNode | Object | {<br />  type: 'circle',<br />  color: '#000',<br />  style: {<br />    ......<br />  }<br />} | null | The default global properties for nodes, includes styles properties and other properties. |
| defaultEdge | Object | {<br />  type: 'polyline',<br />  color: '#000',<br />  style: {<br />    ......<br />  }<br />} | null | The default global properties for edges, includes styles properties and other properties. |
| nodeStateStyles | Object | {<br />  hover: {<br />    ......<br />  },<br />  select: {<br />    ......<br />  }<br />} | null | The style properties of nodes in different states except for default state. Such as hover, select. |
| edgeStateStyles | Object | {<br />  hover: {<br />    ......<br />  },<br />  select: {<br />    ......<br />  }<br />} | null | The style properties of edges in different states except for default state. Such as hover, select. |

## Complete Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    <div id="mountNode"></div>
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
    <!-- 4.x and later versions -->
    <!-- <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script> -->
    <script>
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 1000,
        height: 600,
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
      });

      const main = async () => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
        );
        const remoteData = await response.json();
        graph.data(remoteData);
        graph.render();
      };
      main();
    </script>
  </body>
</html>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span><br /> Replace the url `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` to change the data into yours.
