---
title: Interaction Behavior
order: 4
---

G6 encapsulates a set of interaction behaviors. Now we add simple some behaviors to **Tutorial Demo**: hover node, click node, click edge, drag cavas, zoom canvas. The expected result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dijtQ6nB5Y4AAAAAAAAAAABkARQnAQ' width=500 alt='img' />

<div style="text-align: center;"> Figure 1 **Tutorial Demo** with interaction behaviors</div>

## Basic Concept

### Interaction Behavior

G6 provides several **Built-in** interaction behaviors. You can enable these behaviors conveniently:

- `drag-canvas`: enable the canvas to be dragged;
- `zoom-canvas`: enable the canvas to be zoomed;

Refer to [Interaction Behavior](/en/docs/manual/middle/states/defaultBehavior) document for more information.

### Mode

Mode is a mechanism for state management in G6. One mode is a set of several Behaviors. You can assemble different Behaviors to modes. The concept of mode is too complicated to understand for the beginners of G6. You do not need to know it well in this tutorial. For more information, please refer to [Interaction Mode](/en/docs/manual/middle/states/mode).

### Interaction State

[State](/en/docs/manual/middle/states/state) is a mechanism of item state in G6. You can set different item styles for different states. When the state of an item is changed, the style will be updated automatically. For example, set the state `'click'` of a node as `true` or `false`, and set the node style of the state `'click'` with thicker stroke. This style will take effect when the state `'click'` is switched to `true`, and restore when `'click'` state is switched to `false`. There will be a specific in the Usage part.

## Usage

### Built-in Behaviors: Drag and Zoom

Only assign `modes` when instantiating the graph, the corresponding built-in Behaviors will be enabled:

```javascript
const graph = new G6.Graph({
  // ...                                          // Other configurations
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // Allow users to drag canvas, zoom canvas, and drag nodes
  },
});
```

The code above uses the Behaviors by assigning their types. Besides, you can also configure the parameters for them, e.g. the sensitivity of zooming, max/min zoom ratio. Refer to [Ineteraction Behavior](/en/docs/manual/middle/states/defaultBehavior) document for more detail.

`modes` object above defines a set of interaction modes of the graph, where `default` is the default mode, which includes `'drag-canvas'`, `'zoom-canvas'`, and `'drag-node'`. You can add more modes with their Behaviors into `modes`, e.g. `edit` mode:

```javascript
// Different modes with different Behaviors
modes: {
  default: ['drag-canvas'],
  edit: []
}
```

Refer to [Interaction Mode](/en/docs/manual/middle/states/mode) and [Interaction Behavior](/en/docs/manual/middle/states/defaultBehavior) document for more detail.

### Hover and Click to Change Styles

Sometimes, the styles of the items interacted by users should be updated to make the response. As shown in figure 1, the styles are changed when user hovers the node, clicks the node, and clicks the edge. It is achieved by [State](/en/docs/manual/middle/states/state) mechanism. In other word, whether the item is clicked or hovered can be described as some states. You are able to set the styles for different states by two steps:

- Step 1: Set the styles for different states;
- Step 2: Listen to the relative events and switch the states.

#### Set the State Styles

Set the state styles by `nodeStateStyles` and `edgeStateStyles` for nodes and edges respectively when instantiating a Graph. <br />The relative requirements in **Tutorial Demo** are:

- The color of the node is changed when mouse hover it;
- The stroke of the node gets thicker and darker when user clicks it;
- The edge become blue when user clicks it.

The following code sets the styles for nodes in the state of `hover` and `click`( = `true`), and the styles for edges in the state of `click` ( = `true`):

```javascript
const graph = new G6.Graph({
  // ...                           // Other configurations
  // The set of styles of nodes in different states
  nodeStateStyles: {
    // The node style when the state 'hover' is true
    hover: {
      fill: 'lightsteelblue',
    },
    // The node style when the state 'click' is true
    click: {
      stroke: '#000',
      lineWidth: 3,
    },
  },
  // The edge styles in different states
  edgeStateStyles: {
    // The edge style when the state 'click' is true
    click: {
      stroke: 'steelblue',
    },
  },
});
```

#### Listen to the Events and Switch the States

The listeners in G6 are mounted on the instance of Graph. `graph` is the instance of G6.Graph in the following code. `graph.on()` listens some event (`click` / `mouseenter` / `mouseleave` / ... all the events are collected in: [Event API](/en/docs/api/Event)）of some type of item（`node` / `edge`）

```javascript
// add listener on graph
graph.on('itemType:event', (e) => {
  // do something
});
```

Now, we add listeners to graph for **Tutorial Demo**, and update the states by `graph.setItemState()`:

```javascript
// Mouse enter a node
graph.on('node:mouseenter', (e) => {
  const nodeItem = e.item; // Get the target item
  graph.setItemState(nodeItem, 'hover', true); // Set the state 'hover' of the item to be true
});

// Mouse leave a node
graph.on('node:mouseleave', (e) => {
  const nodeItem = e.item; // Get the target item
  graph.setItemState(nodeItem, 'hover', false); // Set the state 'hover' of the item to be false
});

// Click a node
graph.on('node:click', (e) => {
  // Swich the 'click' state of the node to be false
  const clickNodes = graph.findAllByState('node', 'click');
  clickNodes.forEach((cn) => {
    graph.setItemState(cn, 'click', false);
  });
  const nodeItem = e.item; // et the clicked item
  graph.setItemState(nodeItem, 'click', true); // Set the state 'click' of the item to be true
});

// Click an edge
graph.on('edge:click', (e) => {
  // Swich the 'click' state of the edge to be false
  const clickEdges = graph.findAllByState('edge', 'click');
  clickEdges.forEach((ce) => {
    graph.setItemState(ce, 'click', false);
  });
  const edgeItem = e.item; // Get the clicked item
  graph.setItemState(edgeItem, 'click', true); // Set the state 'click' of the item to be true
});
```

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
    <script>
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 800,
        height: 600,
        // Default properties for all the nodes
        defaultNode: {
          labelCfg: {
            style: {
              fill: '#fff',
            },
          },
        },
        // Default properties for all the edges
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
          },
        },
        // The node styles in different states
        nodeStateStyles: {
          // The node style when the state 'hover' is true
          hover: {
            fill: 'lightsteelblue',
          },
          // The node style when the state 'click' is true
          click: {
            stroke: '#000',
            lineWidth: 3,
          },
        },
        // The edge styles in different states
        edgeStateStyles: {
          // The edge style when the state 'click' is true
          click: {
            stroke: 'steelblue',
          },
        },
        // Layout
        layout: {
          type: 'force',
          linkDistance: 100,
          preventOverlap: true,
          nodeStrength: -30,
          edgeStrength: 0.1,
        },
        // Built-in Behaviors
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
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
              node.size = 30;
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

        // Mouse enter a node
        graph.on('node:mouseenter', (e) => {
          const nodeItem = e.item; // Get the target item
          graph.setItemState(nodeItem, 'hover', true); // Set the state 'hover' of the item to be true
        });

        // Mouse leave a node
        graph.on('node:mouseleave', (e) => {
          const nodeItem = e.item; // Get the target item
          graph.setItemState(nodeItem, 'hover', false); // Set the state 'hover' of the item to be false
        });

        // Click a node
        graph.on('node:click', (e) => {
          // Swich the 'click' state of the node to be false
          const clickNodes = graph.findAllByState('node', 'click');
          clickNodes.forEach((cn) => {
            graph.setItemState(cn, 'click', false);
          });
          const nodeItem = e.item; // et the clicked item
          graph.setItemState(nodeItem, 'click', true); // Set the state 'click' of the item to be true
        });

        // Click an edge
        graph.on('edge:click', (e) => {
          // Swich the 'click' state of the edge to be false
          const clickEdges = graph.findAllByState('edge', 'click');
          clickEdges.forEach((ce) => {
            graph.setItemState(ce, 'click', false);
          });
          const edgeItem = e.item; // Get the clicked item
          graph.setItemState(edgeItem, 'click', true); // Set the state 'click' of the item to be true
        });
      };
      main();
    </script>
  </body>
</html>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> <br />Replace the url `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` to change the data into yours.
