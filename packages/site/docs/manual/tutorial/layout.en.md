---
title: Utilizing Layout
order: 3
---

When there is no node position information in the data, or the location information does not meet the requirements, layouts in G6 will help you to arrange the nodes. There are 9 layouts for general graph and 4 layouts for tree graph in G6:

<br />**Layouts for General Graph:**

- Random Layout: Randomizes the node positions;
- **Force Layout: Classical force-directed layout algorithm:**

  > In force-directed layout, items are simulated as physical particals with attractive forces and repulsive forces. Lead by the forces, the nodes will move to appropriate positions to balance the forces. It is suitable for describing the relationships between objects, e.g. relationships between person, computer networks.

- Circular Layout: Arranges the nodes on a circle;
- Radial Layout: Arranges the nodes radially;
- MDS Layout: Multidimensional scaling;
- Fruchterman Layout: A kind of force-directed layout;
- Dagre Layout: Hierarchical layout;
- Concentric Layout: Arranges the nodes on concentrics, while the more important (measure with degree by default), the more center the node will be；
- Grid Layout: Arranges the nodes on the grid according with order (data order by default).

**Layouts for TreeGraph:**

- Dendrogram Layout;
- CompactBox Layout;
- Mindmap Layout;
- Indented Layout.

For more information about each layout algorithm, please refer to [Graph Layout API](/en/docs/api/graphLayout/guide) or [TreeGraph Layout API](/en/docs/api/treeGraphLayout/guide). We will utilize Force Layout in the tutorial.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qnUwSZVjYOMAAAAAAAAAAABkARQnAQ' width=550  alt='img'/>

## Turnoff the fitView

We used `fitView` to fit the graph to the canvas in the previous Tutorial. From now on, we turn it off by note the line of code below to make further improvements.

```javascript
const graph = new G6.Graph({
  // ...
  // fitView: true,
  // fitViewPadding: [ 20, 40, 50, 20 ]
});
```

## Default Layout

When the `layout` is not assigned to graph instance:

- If there is position information with `x` and `y` in node data, render with these information;
- If there is no position information in node data, arrange the nodes with Random Layout by default.

## Configure the Layout

It is very simple to configure a layout for a graph in G6. Just assign `layout` to the graph when instantiating. The following code configures the layout with `type: 'force'`, which is the classical force-directed layout algorithm. And set `preventOverlap: true` to avoid node overlappings. More configurations are described in: [Graph Layout API](/en/docs/api/graphLayout/guide) or [TreeGraph Layout API](/en/docs/api/treeGraphLayout/guide).

```javascript
const graph = new G6.Graph({
  ...                      // Other configurations
  layout: {                // Object, layout configuration. random by default
    type: 'force',         // Force layout
    preventOverlap: true,  // Prevent node overlappings
    // nodeSize: 30        // The size of nodes for collide detection. Since we have assigned sizes for each node to their data in last chapter, the nodeSize here is not required any more.
  }
});
```

The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*w4ZfRJW3b5YAAAAAAAAAAABkARQnAQ' width=350 alt='img' />

The layout balances the forces by moving the nodes. But the nodes are too crowded to show the label clearly now. `linkDistance` in the configuration of force layout can be used to scale the edge length to keep a distance between two adjacent nodes:

```javascript
const graph = new G6.Graph({
  // ...
  layout: {
    type: 'force',
    preventOverlap: true,
    linkDistance: 100, // The link distance is 100
  },
});
```

The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AXrdQIm3oCIAAAAAAAAAAABkARQnAQ' width=350 alt='img' />
<br />

> Transformation between different layouts and configurations are described in: [Layout Transformation](/en/docs/manual/middle/layout/layout-mechanism).

**Tips:** <br />The layout algorithm will be executed in `graph.render()`.

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
        width: 800,
        height: 600,
        defaultNode: {
          size: 30,
          labelCfg: {
            style: {
              fill: '#fff',
            },
          },
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
          },
        },
        layout: {
          type: 'force', // Force layout
          linkDistance: 100, // The link distance is 100
          preventOverlap: true, // Prevent node overlappings
        },
      });
      const main = async () => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
        );
        const remoteData = await response.json();

        const nodes = remoteData.nodes;
        const edges = remoteData.edges;
        nodes.forEach((node) => {
          if (!node.style) {
            node.style = {};
          }
          node.style.lineWidth = 1;
          node.style.stroke = '#666';
          node.style.fill = 'steelblue';
          switch (node.class) {
            case 'c0': {
              node.type = 'circle';
              break;
            }
            case 'c1': {
              node.type = 'rect';
              node.size = [35, 20];
              break;
            }
            case 'c2': {
              node.type = 'ellipse';
              node.size = [35, 20];
              break;
            }
          }
        });
        edges.forEach((edge) => {
          if (!edge.style) {
            edge.style = {};
          }
          edge.style.lineWidth = edge.weight;
          edge.style.opacity = 0.6;
          edge.style.stroke = 'grey';
        });

        graph.data(remoteData);
        graph.render();
      };
      main();
    </script>
  </body>
</html>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> <br />Replace the url `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` to change the data into yours.
