---
title: Step-by-step guide
order: 3
---

This tutorial will guide you through the development of a G6 chart from scratch, and along the way, you will learn and understand the main concepts of G6.

## Create Application

We will use Vite to create a simple front-end application.

### Initialization

First, create an empty directory:

```bash
mkdir g6-tutorial

cd g6-tutorial
```

Initialize the project:

```bash
npm init -y
```

Install G6:

```bash
npm install @antv/g6 --save
```

Vite is a new type of front-end build tool that is based on ESModule and can quickly start up projects.

Install Vite:

```bash
npm install vite --save-dev
```

Add a start script to the `package.json`:

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

### Create Files

Create the `index.html` and `main.ts` files with the following content:

**index.html**:

```html
<!doctype html>
<html>
  <head>
    <title>@antv/g6 Tutorial</title>
  </head>
  <body>
    <div id="container"></div>
    <script type="module" src="main.ts"></script>
  </body>
</html>
```

**main.ts**：

```typescript
alert('Hello, G6!');
```

### Start project

```bash
npm run dev
```

Open a web browser and visit the address output in the terminal (typically: http://127.0.0.1:5173/), and you will see a pop-up displaying "Hello, G6!".

## Creating a Simple Graph

Next, we will create a simple chart using G6.

### Preparing the Data

G6 uses JSON-formatted data to describe the graph, which usually includes nodes and edges. We will use the following prepared data:

```js
const data = {
  nodes: [
    { id: 'node-1', style: { x: 50, y: 50 } },
    { id: 'node-2', style: { x: 150, y: 50 } },
  ],
  edges: [{ source: 'node-1', target: 'node-2' }],
};
```

The data includes two nodes and one edge. The `id` attribute for nodes is mandatory, and the position of each node is set in the `style`. The `source` and `target` attributes of the edge represent the `id` of the starting node and the ending node, respectively.

### Creating and Drawing the Graph

Create an instance of the Graph, pass in a configuration object that includes the container and data, and then call the `render` method to draw the Graph:

```typescript
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 150, y: 50 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
  },
});

graph.render();
```

As shown below, you can see that the chart has been successfully drawn:

<embed src="@/common/manual/getting-started/step-by-step/create-chart.md"></embed>

### Element

Next, we will introduce how to configure the style and types of elements in the canvas.

G6 provides various mechanisms to configure element styles, which can be done in the data itself or within the chart instance. In the previous example, we configured the position of the nodes in the data. Next, we will configure the styles of nodes and edges in the graph configuration options:

<!-- TODO -->

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 150, y: 50 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
  },
  node: {
    style: {
      fill: 'pink',
    },
  },
  edge: {
    style: {
      stroke: 'lightgreen',
    },
  },
});

graph.render();
```

As the code shows, we have configured the fill color of the nodes to be pink and the stroke color of the edges to be light green within the chart instance. You can see the effect in the example below:

<embed src="@/common/manual/getting-started/step-by-step/elements-1.md"></embed>

The key parts are the `node.style` and `edge.style` options, which are used to configure the styles of nodes and edges, respectively.

> In the subsequent code examples, we will only display the parts of the options. For the complete code of this project, please refer to the [Complete Example](https://codesandbox.io/s/g6-tutorial).

Next, we will demonstrate more types of nodes by setting the node type:

```js
{
  node: {
    type: (datum) => datum.id === 'node-1' ? 'circle' : 'rect',
    style: {
      fill: 'pink',
      size: 20
    }
  }
}
```

In the code above, we set the `type` attribute of the node, which can be a string or a function. When `type` is a function, the argument of the function is the current node's data object, and the return value is the type of the node.

> Similarly, each attribute under the `style` style of an element can also be a function, with the argument being the current element's data object.

> You can even set the entire `style` property as a function, allowing you to dynamically set the element's style based on the data object.

The circular node (`circle`) is the default node type in G6. Here, we set the type of the first node to a circle and the type of the second node to a rectangle.

At the same time, we also set the size of the nodes to 20, so the first node is a circle with a radius of 10, and the second node is a square with a side length of 20.

> If you want to set the size of the rectangular node to 20x10, you can set `size` to an array `[20, 10]`.

You can see the effect in the example below:

<embed src="@/common/manual/getting-started/step-by-step/elements-2.md"></embed>

### Behaviors

The chart provided in the previous example is static. Next, we will add some interactive behaviors.

G6 offers a variety of interactive behaviors. We will add a few commonly used Behaviors to allow users to drag, zoom the canvas, and drag nodes.

```js
{
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'];
}
```

Try dragging nodes and the canvas in the example below, and use the scroll wheel to zoom in and out on the canvas:

<embed src="@/common/manual/getting-started/step-by-step/behaviors.md"></embed>

### Layout

In the previous example, we manually set the positions of the nodes. However, this can become very difficult when there are many nodes.

Layout algorithms can automatically adjust the positions of nodes based on certain rules. G6 provides a variety of layout algorithms, such as tree layout, force-directed layout, and so on.

First, generate a set of data that does not include position information:

```js
const data = {
  nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
  edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
};
```

By default, if a node does not have position information, G6 will place the node at the top-left corner, that is, at the coordinates `(0, 0)`.

Next, we will use the `d3-force` layout algorithm, which is a force-directed layout algorithm that can simulate the forces of attraction and repulsion between nodes, allowing the nodes to automatically adjust to suitable positions.

```js
{
  layout: {
    type: 'd3-force',
  },
}
```

View the example below, and you can see that the nodes have automatically adjusted to suitable positions:

<details>
<summary>Complete Code</summary>

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
    edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
  },
  node: {
    style: {
      size: 20,
      fill: 'pink',
    },
  },
  edge: {
    style: {
      stroke: 'lightgreen',
    },
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  layout: {
    type: 'd3-force',
  },
});

graph.render();
```

</details>

<embed src="@/common/manual/getting-started/step-by-step/layout.md"></embed>

### Palette

Similarly, when there are many nodes, manually setting the color of each node can become difficult. G6 provides a palette mechanism that makes it easy to assign colors to elements.

Palettes typically assign colors to elements based on a specific field in the data, such as the type of node, the weight of an edge, etc.

Below, we add a `category` field in the data:

```js
const data = {
  nodes: Array.from({ length: 10 }).map((_, i) => ({
    id: `node-${i}`,
    data: { category: i === 0 ? 'central' : 'around' },
  })),
  edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
};
```

Then, use the `tableau` palette to set the colors for the nodes, where the `field` attribute specifies the field in the data, and the `color` attribute specifies the name of the palette.

```js
{
  node: {
    palette: {
      field: 'category',
      color: 'tableau',
    }
  }
}
```

> It is important to note that the `fill` style in `node.style` should be removed, as its priority is higher than the colors assigned by the palette.

<embed src="@/common/manual/getting-started/step-by-step/palette.md"></embed>

### Plugins

The plugin mechanism is an important feature of G6, which allows you to extend the functionality of G6 through plugins. G6 provides a wealth of built-in plugins, such as `tooltip`, `legend`, etc., and also supports user-defined plugins.

Below, we will use the `grid-line` plugin to add grid lines to the canvas:

```js
{
  plugins: ['grid-line'],
}
```

You can see that grid lines have been added to the canvas:

<embed src="@/common/manual/getting-started/step-by-step/plugins-1.md"></embed>

The plugin configuration mentioned above used a shorthand form. Most plugins support the passing of additional parameters. For example, the `grid-line` plugin allows you to configure the `follow` property to specify whether the grid lines should follow the canvas when it is dragged.

```js
{
  plugins: [{ type: 'grid-line', follow: true }];
}
```

Try dragging the canvas in the example below, and you will see that the grid lines move along with the canvas:

<embed src="@/common/manual/getting-started/step-by-step/plugins-2.md"></embed>

## Summary

In this tutorial, we created a G6 chart from scratch and became acquainted with the main concepts of G6. We learned how to create a simple chart, how to configure the style and types of elements, how to add interactive behaviors, how to use layout algorithms, how to use palettes, and how to use plugins.

For a more detailed introduction to the concepts of G6, you can refer to [Core Concepts](/en/manual/core-concept/graph).

Detailed explanations of options such as elements, layouts, and plugins can be found in the [API](/en/api).
