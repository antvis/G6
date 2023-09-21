---
title: Interaction Behavior
order: 4
---

G6 encapsulates a series of interaction methods for users to use directly. This article will add simple interactions to the **Tutorial example**: clicking on nodes, clicking on edges, selecting nodes by dragging a box, zooming the canvas, and dragging the canvas. The target effect for this section is as follows:

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kgrxQJnxNPoAAAAAAAAAAAAADmJ7AQ/original' width=500 alt='img' />

> Figure 1: Interaction effects of the Tutorial example.

## Basic Concepts

### Interaction Behaviors

The interaction behaviors in G6. G6 provides a series of **built-in** interaction behaviors that users can use directly. Essentially, these behaviors can be activated with a single click:

- `drag-canvas`: Drags the canvas.
- `zoom-canvas`: Zooms the canvas.

For more information, see [Interaction Behaviors](https://g6-next.antv.antgroup.com/apis/interfaces/behaviors/activate-relations-options).

### Interaction Modes

Modes are the management mechanism for interaction behaviors in G6. A mode is a combination of multiple interaction behaviors and allows users to manage these behaviors by switching different modes. Due to the complexity of this concept, readers do not need to understand it in depth in this tutorial. For more information, see [Interaction Modes](https://g6-next.antv.antgroup.com/apis/interfaces/graph/i-graph).

### Interaction States

States are the state machine mechanism in G6. Users can set different states for elements (nodes/edges) in the graph and define different styles for these states. When the state changes, G6 automatically updates the style of the elements. For example, you can set the state `'click'` of a node to `true` or `false`, and set the style of the node in the `'click'` state to have a bold border. When the `'click'` state is switched to `true`, the border of the node becomes bold. When the `'click'` state is switched to `false`, the style of the node returns to the default state. The following usage examples will provide specific illustrations.

## Usage Method

### Dragging and Zooming - Built-in Interaction Behaviors

Using the built-in behaviors in G6 is very simple. You only need to configure `modes` when instantiating the graph. To manage bundle size, some built-in interactions are not registered to the Graph instance in advance, and need to be registered as follows:

```javascript
const { Graph: GraphBase, extend, Extensions } = G6;
const Graph = extend(GraphBase, {
  behaviors: {
    // 'brush-select' is a built-in interaction, it is not registered in advance and needs to be imported from Extensions and registered as follows:
    'brush-select': Extensions.BrushSelect,
  },
});
```

You can view all the built-in interactions in [Interaction Behaviors](https://g6-next.antv.antgroup.com/apis/interfaces/behaviors/activate-relations-options). Apart from the interactions that are registered in advance, other interactions need to be registered using the above method.

```javascript
// Pre-registered interactions
{
  'drag-canvas': DragCanvas, // Drag the canvas
  'zoom-canvas': ZoomCanvas, // Zoom the canvas
  'drag-node': DragNode, // Drag nodes
  'drag-combo': DragCombo, // Drag combos
  'collapse-expand-combo': CollapseExpandCombo, // Expand/collapse combos
  'collapse-expand-tree': CollapseExpandTree, // Expand/collapse subtree
  'click-select': ClickSelect, // Click to select
}
```

```javascript
// Note that the Graph returned by extend is used here
const graph = new G6.Graph({
  // ...Other configurations
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'click-select', 'brush-select'],
    // Allow dragging canvas, zooming canvas, dragging nodes, clicking to select nodes, and brushing to select nodes
  },
});
```

In addition to using the built-in interaction names directly, you can also configure parameters for the behavior, such as the sensitivity of zooming the canvas and the maximum/minimum zoom level. For specific usage, see [Behavior](https://g6-next.antv.antgroup.com/apis/interfaces/behaviors/zoom-canvas-options).

The modes in the above code defines the `modes` of G6. `default` is the default mode, and other modes can also be allowed, such as the `edit` mode edit. Different modes allow different user behaviors. For example, the default mode allows dragging the canvas, while the edit mode does not allow dragging the canvas:

```javascript
// Example explaining different modes
modes: {
  default: ['drag-canvas'],
  edit: []
}
```

### Define the Interaction Styles

Sometimes we want to change the element style to a specific style through interaction. As shown in Figure 1, the style changes when the mouse hovers over a node, clicks a node, or clicks an edge. This involves the concept of states in G6. In simple terms, whether `hover`, `click`, or any operation (can be a self-defined state name), can be called a state. Users can freely set the element style under different states. To achieve interactive style change, two steps are required:

- Step 1: Set the element style under each state;
- Step 2: Listen to events and switch element states.

#### Set the element style under each state

When instantiating the graph, the `nodeState` and `edgeState` configurations can be used to configure the element styles under different states. G6 provides some preset state styles: 'selected', 'highlight', 'active', 'inactive', 'disable'. In the 'click-select' and 'brush-select' interactions, the default triggered state for nodes and edges is 'selected'. Therefore, even if `nodeState` and `edgeState` are not configured, we can see the selected state style response. If you need to customize the state style, you can configure `selectedState` as a custom string for 'click-select' and 'brush-select', and then configure the corresponding styles in the `nodeState` and `edgeState` configurations, for example:

```javascript
const graph = new Graph({
  // ...Other configurations
  // Node state styles
  nodeState: {
    // Custom state name
    customstatename1: {
      // Configure for different shapes
      keyShape: {
        lineWidth: 2,
        stroke: 'red',
      },
      labelShape: {
        fontWeight: 500,
      },
    },
    // Custom state name
    customstatename2: {
      keyShape: {
        lineDash: [2, 2],
        lineWidth: 4,
        stroke: 'blue',
      },
    },
  },
  // Configure edgeState similarly
});
```

#### Listen to events and switch element states

In addition to the built-in interactions, you can also call `graph.setItemState` to set the state of an element whenever needed. For example, when double-clicking a node:

```javascript
graph.on('node:dblclick', (e) => {
  graph.setItemState(e.itemId, 'customstatename1', true);
});
graph.on('canvas:click', (e) => {
  // Find the node IDs in the 'customstatename1' state
  const stateNodeIds = graph.findIdByState('node', 'customstatename1', true);
  // Batch cancel the state
  graph.setItemState(stateNodeIds, 'customstatename1', false);
});
```

All element listeners in G6 are mounted on the `graph` instance. In the code below, the graph object is an instance of G6.Graph, and the `graph.on()` function listens for a specific event (`click`/`mouseenter`/`mouseleave`, etc.) on a certain type of element (node/edge).

```javascript
// Listeners on graph
graph.on('ItemType:EventName', (e) => {
  // do something
});
```

## Complete Code

Here is the complete code:

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
      const { Graph: GraphBase, extend, Extensions } = G6;

      // Custom data processor - degree calculator
      const degreeCalculator = (data, options, userGraphCore) => {
        const { edges, nodes } = data;
        const degreeMap = new Map();
        edges.forEach(({ source, target }) => {
          degreeMap.set(source, (degreeMap.get(source) || 0) + 1);
          degreeMap.set(target, (degreeMap.get(target) || 0) + 1);
        });
        nodes.forEach((node) => {
          node.data.degree = degreeMap.get(node.id) || 0;
        });
        return data;
      };

      // Custom data processor - node clustering
      const clusteringNodes = (data, options = {}, userGraphCore) => {
        if (!Algorithm?.labelPropagation) return;
        const clusteredData = Algorithm.louvain(data, false);
        const clusterMap = new Map();
        clusteredData.clusters.forEach((cluster, i) => {
          cluster.nodes.forEach((node) => {
            clusterMap.set(node.id, `c${i}`);
          });
        });
        data.nodes.forEach((node) => {
          node.data.cluster = clusterMap.get(node.id);
        });
        return data;
      };

      const Graph = extend(BaseGraph, {
        transforms: {
          'degree-calculator': degreeCalculator,
          'node-clustering': clusteringNodes,
        },
        behaviors: {
          'brush-select': Extensions.BrushSelect,
        },
        nodes: {
          'triangle-node': Extensions.TriangleNode,
        },
      });

      const graph = new Graph({
        container: 'container',
        width: 1000,
        height: 1000,
        transforms: [
          'transform-v4-data',
          'degree-calculator',
          'node-clustering',
          {
            type: 'map-node-size',
            field: 'degree',
            range: [16, 60],
          },
        ],
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select', 'brush-select'],
        },
        layout: {
          type: 'force',
          animated: true,
          linkDistance: 50,
        },
        theme: {
          type: 'spec',
          base: 'light',
          specification: {
            node: {
              dataTypeField: 'cluster',
            },
          },
        },
        node: (model) => {
          const { id, data } = model;
          let type = 'circle-node';
          if (data.degree === 2) type = 'rect-node';
          else if (data.degree === 1) type = 'triangle-node';

          const badgeShapes = {
            fontSize: 12,
            lod: 0,
          };

          if (data.degree > 10) {
            badgeShapes[0] = {
              color: '#F86254',
              text: 'Important',
              position: 'rightTop',
            };
          }
          if (data.degree > 5) {
            badgeShapes[1] = {
              text: 'A',
              textAlign: 'center',
              color: '#EDB74B',
              position: 'right',
            };
          }

          return {
            id,
            data: {
              ...data,
              type,
              labelShape: {
                position: 'bottom',
                text: id,
              },
              labelBackgroundShape: {},
              iconShape:
                data.degree <= 2
                  ? undefined
                  : {
                      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                      fill: '#fff',
                      lod: 0,
                      fontSize: data.keyShape.r - 4,
                    },
              badgeShapes,
              animates: {
                update: [
                  {
                    fields: ['opacity'],
                    shapeId: 'haloShape',
                    states: ['selected', 'active'],
                  },
                  {
                    fields: ['lineWidth'],
                    shapeId: 'keyShape',
                    states: ['selected', 'active'],
                  },
                ],
              },
            },
          };
        },
        edge: {
          animates: {
            update: [
              {
                fields: ['opacity'],
                shapeId: 'haloShape',
                states: ['selected', 'active'],
              },
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
                states: ['selected', 'active'],
              },
            ],
          },
        },
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
