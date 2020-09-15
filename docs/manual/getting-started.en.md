---
title: Getting Started
order: 1
---

## The First Example

<iframe
     src="https://codesandbox.io/embed/compassionate-lalande-5lxm7?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="compassionate-lalande-5lxm7"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Installation & Import

There are two ways to import G6: by NPM; by CDN.

### 1 Import G6 by NPM

**Step 1:** Run the following command under the your project's directory in terminal:

```bash
 npm install --save @antv/g6
```

**Step 2:** Import the JS file to the file where G6 is going to be used:

```javascript
import G6 from '@antv/g6';
```

### 2 Import by CDN in HTML

```html
// version <= 3.2
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-{$version}/build/g6.js"></script>

// version >= 3.3
<script src="https://gw.alipayobjects.com/os/lib/antv/g6/{$version}/dist/g6.min.js"></script>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span>

- Replace `{$version}` by the version number. e.g. `3.7.1`;
- The last version and its number can be found on <a href='https://www.npmjs.com/package/@antv/g6' target='_blank'>NPM</a>;
- Please refer to the branch in Github: <a href='https://github.com/antvis/g6/tree/master' target='_blank'>https://github.com/antvis/g6/tree/master</a> for more detail.

## Getting Started

The following steps lead to a Graph of G6:

1. Create an HTML container for graph;
2. Prepare the data;
3. Instancialize the Graph;
4. Load the data and render.

### Step 1 Create a HTML Container

Create an HTML container for graph canvas, `div` tag in general. G6 will append a `canvas` tag to it and draw graph on the `canvas`.

```html
<div id="mountNode"></div>
```

### Step 2 Data Preparation

The data for G6 should be JSON format, includes arrays `nodes` and `edges`:

```javascript
const data = {
  // The array of nodes
  nodes: [
    {
      id: 'node1', // String, unique and required
      x: 100, // Number, the x coordinate
      y: 200, // Number, the y coordinate
    },
    {
      id: 'node2', // String, unique and required
      x: 300, // Number, the x coordinate
      y: 200, // Number, the y coordinate
    },
  ],
  // The array of edges
  edges: [
    {
      source: 'node1', // String, required, the id of the source node
      target: 'node2', // String, required, the id of the target node
    },
  ],
};
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span>

- `nodes` is an array of nodes, the `id` is unique and required property; the `x` and `y` are coordinates of the node;
- `edges` is an array of edges, `source` and `target` are required, represent the `id` of the source node and the `id` of the target node respectively;
- The properties of node and edge are described in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode) and [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge).

### Step 3 Instantiate the Graph

The container, width, and height are required configurations when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  container: 'mountNode', // String | HTMLElement, required, the id of DOM element or an HTML node
  width: 800, // Number, required, the width of the graph
  height: 500, // Number, required, the height of the graph
});
```

### Step 4 Load the Data and Render

```javascript
graph.data(data); // Load the data defined in Step 2
graph.render(); // Render the graph
```

### The Final Result

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*srtDT5slbN8AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

## The Complete Code

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

    /* Import G6 by CDN */
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.0/dist/g6.min.js"></script>

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
          // An edge links from node1 to node2
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      // Instantiate a Graph
      const graph = new G6.Graph({
        container: 'mountNode', // The id of the container
        // The width and height of the graph
        width: 800,
        height: 500,
      });
      // Load the data
      graph.data(data);
      // Render the graph
      graph.render();
    </script>
  </body>
</html>
```

## Using G6 with React

We provide a demo about using G6 with React: <a href='https://github.com/baizn/g6-in-react' target='_blank'>Demo</a>.

For more information about it, please refer to [Using G6 with React](/en/docs/manual/advanced/g6InReact). Welcome the <a href='https://github.com/antvis/g6/issues' target='_blank'>Issues</a>.

## More

In this chapter, we only briefly introduce the installation and usage. In G6 Tutorial, you will learn:

- Common configurations of Graph;
- Set the properties and styls for items (node/edge);
- Configure the layout;
- Configure the interaction;
- Configure the animation;
- The usage of components.

For more advanced functions, please refer to [Key Concepts](/en/docs/manual/middle/graph) and [Further Reading](/en/docs/manual/advanced/coordinate-system).
