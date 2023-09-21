---
title: 使用图布局 Layout
order: 3
---

When there is no node position information in the data, or when the position information in the data does not meet the requirements, some layout algorithms need to be used to layout the graph. G6 provides 9 general graph layouts and 4 tree graph layouts. In v4, they need to be used separately in graph data and tree data structures. In v5, tree and graph layouts are merged, and now both tree and graph can use the following layout algorithms:

<br />
**General graph layouts:**

- Random Layout: random layout;
- **Force Layout**: classic force-directed layout:

  > Force-directed layout: In a layout network, particles have attractive and repulsive forces between them. From the initial random and unordered layout, it gradually evolves to a balanced and stable layout, which is called force-directed layout. It is suitable for describing relationships between things, such as interpersonal relationships, computer network relationships, etc.

- Circular Layout;
- Radial Layout;
- MDS Layout: dimensionality reduction algorithm layout for high-dimensional data;
- Fruchterman Layout: a type of force-directed layout;
- Dagre Layout: hierarchical layout;
- Concentric Layout: placing important (default measured by degree) nodes in the layout center;
- Grid Layout: arranging nodes in order (default is data order).

**Tree graph layouts:**

- Dendrogram Layout: tree layout (leaf node layout aligned to the same layer);
- CompactBox Layout: compact tree layout;
- Mindmap Layout: mind map layout;
- Indented Layout: indented layout.
  F
  or detailed introductions and configuration of these layouts, please refer to the [Layout API](https://g6-next.antv.antgroup.com/en/apis/interfaces/layout/force-layout-options). In this tutorial, we use the Force Layout.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lJdeTI0qQa8AAAAAAAAAAAAADmJ7AQ/original' width=550 alt='img' />

## Default Layout

When instantiating the graph without configuring the layout:

- If the nodes in the data have position information (`x` and `y`), the graph will be drawn according to the position information in the data.

- If the nodes in the data do not have position information, the default Grid Layout will be used.

## Configuring the Layout

Configuring the layout in G6 is very simple. When instantiating the graph, just add the layout configuration. The code below sets the layout method to `type: 'force'`, which is the force-directed graph layout. At the same time,` animated: true` is enabled to render the graph in real-time during the force calculation process, allowing users to observe the animation effects produced by the interaction between nodes. The parameter `preventOverlap: true` is set to prevent node overlap. For more configuration options of the force-directed layout, please refer to the [Layout API](https://g6-next.antv.antgroup.com/en/apis/interfaces/layout/force-layout-options).

```javascript
const graph = new Graph({
  // ...                      // Other configurations
  // Object, optional, the layout method and its configuration, defaulting to the grid layout.
  layout: {
    type: 'force', // Specify the force-directed layout
    preventOverlap: true, // Prevent node overlap
    linkDistance: 50, // Ideal length of edges
    // nodeSize: 30     // Node size, used for collision detection in the algorithm to prevent node overlap. By default, the node size in the data will be used.
  },
});
```

The result is as follows:

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lJdeTI0qQa8AAAAAAAAAAAAADmJ7AQ/original' width=350 alt='img' />

> Different layouts and different parameters of the same layout can be dynamically switched and transitioned. For more information, please refer to: [Layout Switching](https://g6-next.antv.antgroup.com/en/examples/net/layoutMechanism/#layoutTranslate).

Note: If there is data in the graph configuration, the layout calculation will be performed after instantiating the graph. If the graph.read(data) API is used to read the data, the layout will be calculated when it is called.

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

      // Custom data processor - degree calculation
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
