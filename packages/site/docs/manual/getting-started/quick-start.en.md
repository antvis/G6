---
title: Quick Start
order: 0
---

## Online Experience with G6

Visit [Chart Examples](/en/examples) to experience G6 online without any environment setup.

## Creating a Simple Graph

In this example, we will create a simple graph using G6 based on an HTML page.

Copy the following code into an HTML file and then open this file in a browser:

```html
<!-- Prepare a container -->
<div id="container" style="width: 500px; height: 500px"></div>

<!-- Import G6's JS file -->
<script src="https://unpkg.com/@antv/g6@5/dist/g6.min.js"></script>

<script>
  const { Graph } = G6;

  fetch('https://assets.antv.antgroup.com/g6/graph.json')
    .then((res) => res.json())
    .then((data) => {
      const graph = new Graph({
        container: 'container',
        autoFit: 'view',
        data,
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3-force',
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      });

      graph.render();
    });
</script>
```

You will get a graph as shown below:

<embed src="@/docs/manual/getting-started-common/quick-start/simple-graph.md"></embed>

Let's analyze the following code snippet:

1. First, we create a `div` element to serve as the container for the graph:

```html
<div id="container" style="width: 500px; height: 500px"></div>
```

2. Then, include the G6's JS file:

```html
<script src="https://unpkg.com/@antv/g6@5/dist/g6.min.js"></script>
```

3. Use the `fetch` method to obtain the graph's data:

```js
fetch('https://assets.antv.antgroup.com/g6/graph.json').then((res) => res.json());
```

4. Finally, create an instance of the graph, pass in the configuration object, and call the `render` method to render the graph:

```js
const { Graph } = G6;

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data,
  node: {
    style: {
      size: 10,
    },
    palette: {
      field: 'group',
      color: 'tableau',
    },
  },
  layout: {
    type: 'd3-force',
    manyBody: {},
    x: {},
    y: {},
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});

graph.render();
```

If you are using frameworks such as React, Vue, Angular, etc., you can refer to:

- [Using G6 in React](./integration/react)
- [Using G6 in Vue](./integration/vue)
- [Using G6 in Angular](./integration/angular)
