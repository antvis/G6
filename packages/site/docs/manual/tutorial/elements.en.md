---
title: Configure the Items
order: 2
---

In this chapter, we have already drawn the graph of the **Tutorial example**, but the items and their labels look visually basic. In this article, we will beautify the items from the previous chapter to achieve the following effects and introduce the properties and configuration methods of the items.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K3ADTJct0o4AAAAAAAAAAAAADmJ7AQ/original' width=450 height=450  alt='img'/>

> Figure 1: The **\*Tutorial example** \*after configuring element properties.

## Basic Concepts

### Graph Items

Graph items refer to the **nodes** `Node`, **edges** `Edge`, and _node groups_ `Combo` on the graph. G6 provides a series of [built-in nodes](https://g6-next.antv.antgroup.com/en/examples#item-defaultNodes) for users to choose from.

## Element Properties

Whether it is a node or an edge, their properties can be divided into two types:

- **Graphic style properties**: Correspond to various styles in the canvas and can be changed when the element's state changes.
- **Other properties**: For example, the type (`type`), id (`id`), position (`x`, `y`) properties, which cannot be changed when the element's state changes.

For example, when G6 sets a node to be hovered or clicked, it generally uses the Graph's set state API `graph.setItemState` in the event listener to put the node into a certain state, e.g. the selected state. At this time, the node should make certain style changes to respond to the selected state. This can only automatically change the **graphic style properties** of the node (such as `fill` and `stroke` in `keyShape`), and the other properties (such as `type`) cannot be changed. If you need to change other properties, you need to update the data with `graph.updateData`. The **graphic style properties** are stored in the `xxxShape` object of the node/edge/combo's configuration, corresponding to the styles of different shapes.

### Data Structure

Taking the node element as an example, the data structure of its properties is as follows:

```javascript
{
  id: 'node0',            // The id of the element
  data: {
    x: 100,               // The position of the node. If the graph does not configure a layout and all node data in the data has x and y information, this information will be used to draw the node's position.
    y: 100,
    type: 'circle-node',  // The shape of the element. Compared to v4, it has an extra -node suffix.
    label: 'node0'        // The label text
    keyShape: {           // The style properties of the main shape
      r: 20               // The size of the main shape. If it is a rect-node, it is controlled by width and height.
      fill: '#000',       // The fill color of the main shape
      stroke: '#888',     // The stroke color of the main shape
      // ...              // Other style properties of the main shape
    },
    labelShape: {
      positions: 'center',  // The properties of the label, the position of the label in the element
      text: 'node-xxx-label'// The text of the element's label. If not configured, it will be filled with data.label
      fontSize: 12          // The style properties of the label, the font size of the text
      // ...                // Other style properties of the label
    }
    // ...,               // Other properties
  },
}

```

The data structure of the edge item is similar to that of the node item, except that it has `source` and `target` fields at the same level as `id` and `data`, which represent the ids of the start and end nodes.

Refining the visual requirements of the **Tutorial example** in Figure 1, we need to achieve the following:

- Visual effects:
  - R1: Set different node types, `'circle-node'`, `'rect-node'`, `'triangle-node'`.
  - R2: Draw the icons and badges of the nodes, corresponding properties: `iconShape`, `badgeShapes`.
  - R3: Arrows on the edges, corresponding to the edge property: `keyShape.endArrow`.
- Data and visual mapping:
  - R5: Cluster the nodes and map the colors of the nodes based on categories, corresponding property: `keyShape.fill`.
  - R6: Map the size of the nodes based on their degree, corresponding property: `keyShape.r`.

## Properties Configuration

In G6, there are multiple ways to configure element properties based on different scenario requirements. Here, we introduce the configuration of element properties when instantiating a graph. Compared to v4, where only static global properties can be configured on the graph, v5 supports JSON Spec attribute mapping and function mapping configuration methods:

### 1.JSON Spec Configuration when Instantiating the Graph

**Scenario**: Uniform configuration of properties for all nodes and edges.

**Usage**: Use two configuration options of the graph:

- `node`: The **graphic style properties** and **other properties** of the nodes in the default state.
- `edge`: The **graphic style properties** and **other properties** of the edges in the default state.

```javascript
const graph = new G6.Graph({
  // ...                   // Other configurations of the graph
  // Configuration for the graphic style and other properties of nodes in the default state
  node: {
    type: 'circle-node',
    keyShape: {
      r: 16, // Node size
      fill: '#4089FF', // Node fill color
    },
    // Configuration for the label text on the nodes
    labelShape: {
      // All styles support the following mapping, which means that based on the label field in the data model.data, use the result returned by formatter
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
      fill: '#000', // Node label text color
    },
    // Animation configuration for nodes
    animates: {
      // When data/state updates
      update: [
        {
          shapeId: 'haloShape', // Background halo shape
          states: ['selected', 'active'], // When in the selected and active states change
          fields: ['opacity'], // Animated change in opacity
        },
        {
          shapeId: 'keyShape', // Main shape
          states: ['selected', 'active'], // When in the selected and active states change
          fields: ['lineWidth'], // Animated change in edge thickness
        },
      ],
    },
  },
  // Configuration for the style (style) and other properties of edges in the default state
  edge: {
    // ...                 // Other configurations for edges
    // Edge style configuration
    type: 'line-edge',
    keyShape: {
      opacity: 0.6, // Opacity of the main shape of the edge
      stroke: 'grey', // Stroke color of the main shape of the edge
    },
    // Configuration for the label text on the edges
    labelShape: {
      autoRotate: true, // Rotate the label text on the edge based on the direction of the edge
    },
    // Animation configuration for edges
    animates: {
      // When data/state updates
      update: [
        {
          shapeId: 'haloShape', // Background halo shape
          states: ['selected', 'active'], // When in the selected and active states change
          fields: ['opacity'], // Animated change in opacity
        },
        {
          shapeId: 'keyShape', // Main shape
          states: ['selected', 'active'], // When in the selected and active states change
          fields: ['lineWidth'], // Animated change in edge thickness
        },
      ],
    },
  },
});
```

### 2. Function Mapping Configuration for Instantiating a Graph

**Scenario**: Different nodes/edges can have different personalized configurations. More flexibility.

**Usage:** Before looking at the function mapping code, we know that each node in the original data is relatively simple:

```
 { "id": "0", "data": { "label": "0" } },
 { "id": "1", "data": { "label": "1" } },
```

Generally, the larger the degree (number of one-hop neighbors) of a node in a graph, the more important it is. We can use node size to express this information. At the same time, if the degree is large enough, we can use more additional graphics to highlight its status. We can calculate the degree of the nodes in advance through a data processor:

```javascript
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
```

In addition, we hope to use colors to represent the categories of nodes. If the data contains a field indicating the node category, we can use it directly. In this example, we use the clustering algorithm provided by @antv/algorithm to calculate the node clustering based on the graph structure. We also write it as a data processor:

```javascript
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
```

Then register these data processors to the Graph in G6:

```javascript
import { Graph as GraphBase, extend, Extensions } from '@antv/g6';
const Graph = extend(GraphBase, {
  transforms: {
    'degree-calculator': degreeCalculator,
    'node-clustering': clusteringNodes,
  },
  nodes: {
    // Note that for package size management, G6 only registers circle-node and rect-node by default. Other built-in or custom node types need to be imported from Extensions and registered as follows
    'triangle-node': Extensions.TriangleNode,
  },
});
```

In this way, when instantiating the graph, we can configure this data processor on the graph. When data enters the Graph, it will produce data with the degree information through this data processor:

```javascript
const graph = new Graph({
  // Note that the extended Graph is used here
  // ... Other graph configurations
  transforms: [
    'transform-v4-data', // Built-in converter that converts v4 formatted data to v5 format
    'degree-calculator', // Custom data processor that calculates the degree of nodes and stores it in data.degree
    'node-clustering', // Custom data processor that stores clustering results in the data.cluster field of nodes for the theme module to use later
    {
      // Built-in node size mapper that maps the value of the field (the degree field generated by the previous processor here) specified by field to the node size, and normalizes the node size to between 16 and 60
      type: 'map-node-size',
      field: 'degree',
      range: [16, 60],
    },
  ],
});
```

Now, after the data enters the Graph, it will pass through the data processors specified by `transforms` one by one. Each node of the internal data produced in the internal flow will have some calculated fields, such as:

```
 { "id": "0", "data": { "label": "0", degree: 1, cluster: 'c0' } },
 { "id": "1", "data": { "label": "1", degree: 3, cluster: 'c4' } },
```

Then, in the function mapping configuration of the node, we can use these field values:

```javascript
const graph = new G6.Graph({
  // ... other configurations
  // transforms: ...
  // edge: ...
  // node configuration in the graph configuration
  node: (model) => {
    // model is the user input data for the node, transformed and processed internally by G6
    const { id, data } = model;
    // Use different node types based on the degree field in the data
    let type = 'circle-node';
    if (data.degree === 2) type = 'rect-node';
    else if (data.degree === 1) type = 'triangle-node';
    // Badge shapes
    const badgeShapes = {
      fontSize: 12,
      lod: 0,
    };
    // Add different badges based on the degree field
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
        // Make sure to copy data here, otherwise other properties in the data may be lost
        ...data,
        type,
        // Label shape style
        labelShape: {
          position: 'bottom',
          text: id,
        },
        // Label background style, if not undefined, a background shape will appear when there is text. More styling properties such as fill color, padding can be configured.
        labelBackgroundShape: {},
        // Icon shape, nodes with degree < 2 do not display an icon
        iconShape:
          data.degree <= 2
            ? undefined
            : {
                img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                fill: '#fff',
                lod: 0,
                fontSize: data.keyShape.r - 4,
              },
        // Badge shapes
        badgeShapes,
        // Animation configuration
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
});
```

In the above node mapping function, the degree field is used. Clusters can be used with the new theme module provided by G6 v5. All you need to do is to configure it on the graph:

```typescript
const graph = new Graph({
  // ... other graph configurations
  // transforms: ...
  // node: ...
  // edge: ...
  // Theme configuration
  theme: {
    type: 'spec',
    base: 'light', // Light theme
    specification: {
      node: {
        // Node color mapping based on the data.cluster field
        dataTypeField: 'cluster',
      },
    },
  },
});
```

In the above code, we added four configurations when instantiating the graph: `transform`, `theme`, `node`, and `edge`. The result is shown below:

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K3ADTJct0o4AAAAAAAAAAAAADmJ7AQ/original' width=450 height=450 alt='img' />

> Figure 3

As you can see, the nodes in the graph are rendered as circle, rectangle, and triangle based on their degrees. The sizes of the nodes are mapped to the degrees. The colors of the nodes are mapped to their categories. Similarly, we can also apply various styles mappings to the edges. I won't go into detail here.

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
