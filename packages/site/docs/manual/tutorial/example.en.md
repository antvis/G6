---
title: Render the Tutorial Demo
order: 1
---

This article will provide a simple drawing and configuration example for the **Tutorial Example**. Through this article, you will learn about some commonly used configuration options and their functions when creating a general graph.

## Basic Drawing

### Creating a Container

To contain the G6 graph, you need to create a container in HTML, usually a `div` tag. G6 will append a `canvas` tag under this container and draw the graph in it.

```html
<body>
  <div id="container"></div>
  <!-- Import G6 -->
  <!-- ... -->
</body>
```

### Preparing the Data

The data source for G6 is a JSON-formatted object. The data format of v5 is different from v4. For more information, please refer to the [Data Format Change](https://g6-next.antv.antgroup.com/en/manual/upgrade#1%EF%B8%8F%E2%83%A3-%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E5%8F%98%E6%9B%B4) section. v5 also provides a data conversion processor for v4 data, which will be explained in the following graph configuration.

The data needs to include the nodes (`nodes`) and edges (`edges`) fields, represented by arrays:

```javascript
const data = {
  // Nodes
  nodes: [
    {
      id: 'node1', // string | number, required if the node exists, the unique identifier of the node
      data: {
        // Store some business attributes or special node configurations
        name: 'Circle1',
      },
    },
    {
      id: 'node2', // string | number, required if the node exists, the unique identifier of the node
      data: {
        // Store some business attributes or special node configurations
        name: 'Circle2',
      },
    },
  ],
  // Edges
  edges: [
    {
      id: 'edge1',
      source: 'node1', // string | number, required, the id of the starting point
      target: 'node2', // string | number, required, the id of the target point
      data: {}, // Store some business attributes or special edge configurations
    },
  ],
};
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Note:</strong></span>

- The `nodes` array contains node objects. Each node object has a unique and necessary `id` to identify different nodes. `x` and `y` specify the position of the node.
- The `edges` array contains edge objects. `source` and `target` are the required properties of each edge, representing the `id` of the starting point and the `id` of the target point, respectively.

### Graph Instantiation

When instantiating the graph, at least the container needs to be set for the graph. If you are using the graph data format of G6 v4, you can configure `transforms: ['transform-v4-data']` when instantiating the graph. `'transform-v4-data'` is a built-in data converter in G6 v5, which will format the v4 data into the format required by v5 after reading the data.

```javascript
// const data = { ... }
const graph = new G6.Graph({
  container: 'container', // String | HTMLElement, the id of the container created in Step 1 or the container itself
  width: 800, // number, the width of the graph, use the width of the container if not specified
  height: 500, // number, the height of the graph, use the height of the container if not specified
  // transforms: ['transform-v4-data'] //
});
```

### Rendering the Graph

```javascript
// const initData = { ... }
//  const graph = ...
graph.read(data); // Load data
```

### Drawing Result

After calling the `graph.read(data)` method, G6 will draw the graph based on the loaded data. The result is as follows:

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1ejjTYxD94QAAAAAAAAAAAAADmJ7AQ/original' width=400 alt='img' />

## Loading Real Data

In the previous sections, we used data with only two nodes and one edge, and directly defined the data in the code. However, the data in real scenarios is usually loaded from remote interfaces. For convenience, we have prepared a JSON data file for readers. The address is as follows:

<br />`https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json`

### Load Remote Data

Modify index.html to asynchronously load remote data sources using the `fetch` function and pass them into the G6 graph instance:

```javascript
// const graph = ...
const main = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json',
  );
  const remoteData = await response.json();
  // ...
  graph.read(remoteData); // Load remote data
};
main();
```

> The `fetch` function allows us to make network requests and load data, and its asynchronous process can be better controlled using `async`/`await`. Here, for convenience, we put the main logic inside the `main` function. If you have any questions about fetch and `async`/`await`, you can refer to the <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' target='_blank'>async function</a>, <a href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' target='_blank'>Fetch API</a>.

After running the code, we get the following result:

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WmGnQKAbmtsAAAAAAAAAAAAADmJ7AQ/original' width=550 alt='img' />

At first glance, the image looks a bit strange, but the data has actually been correctly loaded. Due to the large amount of data, there are many nodes and edges, and the grid layout, which is the default, does not show the connection between the nodes. Next, we will use more graph configurations to make the data clearer and more visually appealing.

## Common Configurations

The configurations used in this article and the common configurations used in subsequent tutorials are as follows:

| Configuration | Type              | Options / Examples                                                                           | Default | Description                                                                                                                                         |
| ------------- | ----------------- | -------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| transforms    | Array             | ['transform-v4-data', { type: 'map-node-size', field: 'value' }]                             | null    | Data processors. After the original user data enters the Graph, the processors in the transform are executed in order to obtain the processed data. |
|               |
| modes         | Object            | {<br />  default: [ 'drag-node', 'drag-canvas' ]<br />}                                      | null    | The collection of behavior modes on the graph.                                                                                                      |
| node          | Object / Function | {<br />  type: 'circle',<br />  keyShape: {<br />    ......<br />  }<br />}                  | null    | The global attribute mapper of the node, including general attributes and style attributes (style). v5 also supports function mapping.              |
| edge          | Object / Function | {<br />  type: 'polyline',<br />  keyShape: {<br />    ......<br />  }<br />}                | null    | The global attribute mapper of the edge, including general attributes and style attributes (style). v5 also supports function mapping.              |
| nodeState     | Object            | {<br />  hover: {<br />    ......<br />  },<br />  select: {<br />    ......<br />  }<br />} | null    | The style attributes (style) of the node in states other than the default state, such as hover and select.                                          |
|               |
| edgeState     | Object            | {<br />  hover: {<br />    ......<br />  },<br />  select: {<br />    ......<br />  }<br />} | null    | The style attributes (style) of the edge in states other than the default state, such as hover and select.                                          |
|               |
| plugins       | Array             | ['minimap', { type: 'tooltip', itemTypes: ['node'] }]                                        | null    | Plugins                                                                                                                                             |

## Complete Code

The complete code is as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    <div id="container"></div>
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/5.0.0-beta.10/dist/g6.min.js"></script>
    <script>
      const graph = new G6.Graph({
        container: 'container',
        width: 1000,
        height: 600,
      });

      const main = async () => {
        const response = await fetch(
          'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json',
        );
        const remoteData = await response.json();
        graph.read(remoteData);
      };
      main();
    </script>
  </body>
</html>
```

**⚠️ Note:** <br /> If you need to replace the data, please replace  `'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json'` with the new data file address.
