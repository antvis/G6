---
title: 🎉 How to Use New Features
order: 3
---

Compared to G6 v4, G6 v5 introduces new capabilities in the following areas:

- 🎞 **Visual and Animation Specification**: Define styles and animations using JSON spec;
- 📂 Information **Level of Details**;
- 🎨 Simple and flexible **Theme Configuration** ability;
- 🤖 Flexible and powerful **Data Processing** capability;
- 🎄 **Fusion of Tree Diagram and Graph** structure;
- 🏀 **3D large graph** support;
- 🚀 **Performance Improvements**, including rendering and layout computations;
- 🌠 **Multiple Renderers** that can be switched at runtime.
- 📦 Reduced package size with support for **TreeShaking**.

And more small and wonderful changes:

- Hull supports text configuration.
- Polyline supports automatic obstacle avoidance.
- Text automatically adapts to width.
- Improved interactive performance by using a temporary layer canvas.
- Legend automatically retrieves styles from the canvas.

The official version is coming soon. If these features are what you have been waiting for, you can now try the G6 5.0 Beta version! If you encounter any upgrade issues, please leave us a message on GitHub.

To support these new capabilities, there are significant Breaking Changes in G6 5.0 compared to v4, which may require some effort to upgrade. We hope that the benefits brought by the new capabilities outweigh the upgrade costs.

## 1️⃣. Visual and Animation Specifications

### JSON Spec Definition

[Specification Doc](https://g6-next.antv.antgroup.com/apis/interfaces/graph/specification)

In v5, we standardize the graphics of all nodes/edges/combos. Each type of element has several standardized graphic names. This standard should also be followed for custom elements. If there are additional graphics, they should be placed in otherShapes.

- node: keyShape (main graphic), labelShape (text graphic), haloShape (background halo that appears in certain states), labelBackgroundShape (text background graphic), iconShape (icon graphic in the center of the node), badgeShapes (badge graphics around the node), anchorShapes (circle graphics representing anchor points):

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sTTnRbd3kZ4AAAAAAAAAAAAADmJ7AQ/original" width=350 />

- edge: keyShape (main graphic), labelShape (text graphic), haloShape (background halo that appears in certain states), labelBackgroundShape (text background graphic):

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z5K6R4PEDw0AAAAAAAAAAAAADmJ7AQ/original" width=250 />

Therefore, no matter what type of node or edge, you can configure the graphics inside it using the following method:

```typescript
const graph = new Graph({
  node: {
    keyShape: {
      fill: "#f00',
      r: {
        fields: ['size'],
        formatter: model => Math.max(model.data.size[0], model.data.size[1]) / 2
      }
      // ...other styles for keyShape
    },
    labelShape: {
      // You can specify a fixed string, or use the mapping method below to map to a field in the data. Other properties can also use this mapping.
      text: {
        fields: ['name'],
        formatter: model => model.data.name
      },
      // ...other styles for labelShape
    },
    labelBackgroundShape: {
      padding: [2,2,2,2],
      fill: '#0f0'
      // ...other styles for the background graphic of labelShape
    },
    iconShape: {
      // Content can be text or an image, image takes priority
      // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      text: 'label',
      // ...more configurations for iconShape
    },
    anchorShapes: [
      {
        position: [0, 0.5],
        r: 2,
        fill: 'red',
      },
      {
        position: [1, 0.5],
        r: 2,
        fill: 'green',
      },
      // More anchor point graphics (drawings)
    ],
    badgeShapes: [
      {
        text: 'running',
        position: 'rightTop',
        color: 'blue',
      },
      {
        text: 'error',
        position: 'right',
        color: 'blue',
      },
      // ...more badge graphics
    ],
    otherShapes: {
      xShape: {...},
      yShape: {...},
      zShape: {...},
      // ...more additional graphics
    }
  }
})
```

### Function Mapping Configuration

Sometimes, we need to return different style configurations based on different data. In such cases, function configuration is more flexible compared to the field+formatter method:

```typescript
const graph = new Graph({
  node: (model) => {
    const { id, data } = model;
    const { size, showLabel } = data;
    // Note that the returned data structure is the complete node data type
    return {
      id,
      data: {
        ...data, // Make sure to return the original data in the original data, otherwise these data will be lost
        keyShape: {
          r: Math.max(size[0], size[1]) / 2,
          // ...
        },
        labelShape: showLabel
          ? {
              // Decide whether to display text based on a business field
              text: id,
              // ... other configurations for the text graphic
            }
          : undefined,
      },
    };
  },
});
```

### Animation Configuration

[Animation Configuration Demo](https://g6-next.antv.antgroup.com/en/examples/scatter/changePosition/#itemAnimates)

In v4, to set animations for nodes, you had to use custom nodes and configure them with the animation API of the graphics. It was also difficult to control when the animation starts and ends. In v5, animations can be defined using JSON spec. You can specify the animates field in the node / edge / combo field of the graph configuration as mentioned above:

```typescript
const graph = new Graph({
  node: {
    animates: {
      buildIn: [...],
      buildOut: [...],
      update: [...],
      show: [...],
      hide: [...],
    }
  }
});
```

Or in the functional mapping way of `node` / `edge` / `combo`:

```typescript
const graph = new Graph({
  node: model => {
    const { id, data } = model
    return {
      id,
      data: {
        ...data,
        // ... other style configurations
        animates: {
          buildIn: [...],
          buildOut: [...],
          update: [...],
          show: [...],
          hide: [...],
        }
      }
    }
  }
});
```

We have standardized five animation scenarios that occur at different times for each graphic: buildIn, buildOut, update (data/state update), show (appearance, compared to hide), hide. For each scenario, animations can be specified for different graphics, different fields, and the animation configuration and execution order can be specified. For example, the following expresses the animation of various graphics during different types of updates:

```typescript
update: [
  {
    // The entire node (shapeId: 'group') animates when x and y change
    fields: ['x', 'y'],
    shapeId: 'group',
    duration: 500,
  },
  {
    // The opacity of haloShape animates with a duration of 500 when selected and active states change
    fields: ['opacity'],
    shapeId: 'haloShape',
    states: ['selected', 'active'],
    duration: 500,
  },
  // When fill and r of keyShape change at the same time, they are animated in the order specified by order, which can achieve a sequential animation effect
  {
    fields: ['fill'],
    shapeId: 'keyShape',
    order: 0,
  },
  {
    fields: ['r'],
    shapeId: 'keyShape',
    order: 1,
  },
];
```

## 2️⃣. Infomation Level of Detail

[Info Level of Detail DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#lodStrategy)

Information layering can reduce visual distractions for complex graphs and display detailed information after zooming in. You can specify the lodStrategy field in the `node` / `edge` / `combo` fields of the graph configuration introduced above, as shown in the code snippet below. The `levels` define the zoom levels at which information layering responds, and the `animateCfg` configuration specifies the animation method for the graph changes caused by information layering. Then, you need to configure the `lod` field in different graphic style configurations to specify at which level the graphic should be displayed in `levels`.

```typescript
const graph = new Graph({
  node: {
    lodStrategy: {
      levels: [
        { zoomRange: [0, 0.5] }, // -1
        { zoomRange: [0.5, 1], primary: true }, // 0
        { zoomRange: [1, 1.5] }, // 1
        { zoomRange: [1.5, 1] }, // 2
        { zoomRange: [2, Infinity] }, // 3
      ],
      animateCfg: {
        duration: 500,
      },
    },
    labelShape: {
      lod: 1, // Show when the zoom of the graph is greater than zoomRange[0] defined in the first level of levels, and hide when it is smaller
    },
  },
});
```

Or use the mapping method of `node` / `edge` / `combo` functions to configure:

```typescript
const graph = new Graph({
  node: (model) => {
    const { id, data } = model;
    const { isImportant } = data;
    return {
      id,
      data: {
        ...data,
        // ... Other configurations
        lodStrategy: {
          levels: [
            { zoomRange: [0, 0.5] }, // -1
            { zoomRange: [0.5, 1], primary: true }, // 0
            { zoomRange: [1, 1.5] }, // 1
            { zoomRange: [1.5, 1] }, // 2
            { zoomRange: [2, Infinity] }, // 3
          ],
          animateCfg: {
            duration: 500,
          },
        },
        labelShape: {
          lod: isImportant ? -1 : 2, // You can determine in which level to display the label based on the business attribute. For example, if it is an important node, display the text in all levels; otherwise, display it after zooming in to a certain extent
        },
      },
    };
  },
});
```

## 3️⃣. Theme Configuration

[Theme Config DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#themeSwitch)

G6 comes with built-in light and dark themes, and you can also customize them. The usage is as follows:

```typescript
const graph = new Graph({
  theme: {
    type: 'spec', // Built-in theme parser
    base: 'light', // Use the light theme, set base to 'dark' for the dark theme configuration
    specification: {
      node: {
        dataTypeField: 'cluster', // Specify the field name for mapping node color
        // palette: ['#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66'], // Custom color palette
        // palette: { a: '#f00', b: '#0f0', c: '#00f' }, // You can specify colors for special field values
        // getStyleSets: (palette) => {
        //   // More flexible configuration, return different styles for different states
        //   const styleSetsMap = {};
        //   Object.keys(palette).forEach((dataType) => {
        //     const color = palette[dataType];
        //     styleSetsMap[dataType] = {
        //       default: {
        //         keyShape: { fill: color },
        //         labelShape: { fill: color },
        //       },
        //       state1: {
        //         keyShape: { fill: '#000' },
        //       },
        //       state2: {
        //         keyShape: { stroke: '#f00' },
        //       },
        //       state3: {
        //         keyShape: { fill: '#ff0' },
        //       },
        //     };
        //   });
        //   return styleSetsMap;
        // },
      },
      edge: {
        dataTypeField: 'cluster', // Specify the field for mapping edge color
        // ... Other configurations
      },
    },
  },
});
```

## 4️⃣. Data Processing

The format of business data varies and may not conform to the data format of G6. Sometimes, it may be necessary to calculate some fields for the data in advance, such as the degree of nodes. In this case, the data processing module of G6 v5 can be used. It is one of the eight extensions of G6 v5 and is executed before user data flows into the Graph. Multiple data processing modules can be configured and they will be executed linearly. The configuration method is as follows:

```typescript
const graph = new Graph({
  // ... other graph configurations
  transforms: [
    'transform-v4-data', // built-in data processor, converts v4 data format to v5
    {
      // built-in data processor, maps the size of nodes to the 'value' field of node data, normalizes the size range to [4, 28]
      type: 'map-node-size',
      field: 'value',
      range: [4, 28],
    },
  ],
});
```

You can customize data processors based on your own business data format and register them with the Graph for use:

```typescript
import { Graph, extend } from '@antv/g6';
const CustomDataTransform = (data, options, userGraphCore) => {
  data.nodes.forEach((node) => (node.data.cluster = node.data.bussinessState === '0' ? 'cluster1' : 'cluster2'));
  data.edges.forEach((edge) => (edge.data.keyShape = { lineWidth: edge.data.weight / 2 }));
  return data;
};
const ExtGraph = extend(Graph, {
  transforms: {
    'custom-data-transform': CustomDataTransform,
  },
});
const graph = new ExtGraph({
  // ... other graph configurations
  transforms: [
    'transform-v4-data', // built-in data processor, converts v4 data format to v5
    'custom-data-transform', // use custom data processor
  ],
});
```

## 5️⃣. Fusion of Tree Graph and Graph

[Graph Data in Tree Layout DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#treeAndGraph)

v5 introduces new features related to tree graphs:

- The layout is compatible with Graph. Graph can specify the root node and use the minimum spanning tree to establish a tree structure before using the tree layout algorithm.
- The interaction is compatible with Graph. Graph can also expand and collapse "subtrees", which are downstream nodes without backtracking edges.
- Supports backtrack edges and loops.
- Supports forests (multiple trees).

If you need to use TreeGraphData, you just need to provide a data type tag when configuring the Graph:

```typescript
const graph = new Graph({
  // ... other configurations
  data: {
    type: 'treeData', // type can be 'graphData', 'treeData', 'fetch', where 'fetch' will be supported in the official version
    value: data, // when type is 'treeData', value can be TreeGraphData or TreeGraphData[] to support the drawing of forests
  },
});
```

The `data` field can provide data of type GraphData, so G6 will treat it as a normal graph and generate a tree graph structure when necessary (such as using tree layout or interaction). It is also possible to specify the type as 'treeData' and pass TreeGraphData type data to the value, in which case G6 will store the tree graph structure and convert it to normal graph data for storage.

## 6️⃣. 3D Large Graph

[3D DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#webgl3d)

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*31L_T5ERnzIAAAAAAAAAAAAADmJ7AQ/original" width=500 />

G6 v5 provides the ability to render and interact with 3D large graphs. To use this feature, you need to configure `renderer: 'webgl-3d'` on the Graph and configure the corresponding 3D node type (currently only supports sphere-node) and 3D interactions:

```typescript
import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'sphere-node': Extensions.SphereNode,
  },
  behaviors: {
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});
const graph = new ExtGraph({
  renderer: 'webgl-3d', // can be 'canvas', 'svg', 'webgl', 'webgl-3d'
  node: {
    type: 'sphere-node',
  },
  modes: {
    defaualt: ['orbit-canvas-3d', 'zoom-canvas-3d'],
  },
  // ... other graph configurations
});
```

## 7️⃣. Performance Leap & Multiple Renderers

G6 supports 2D and 3D rendering using WebGL, which greatly improves rendering performance. Different renderers can be switched at runtime by configuring the renderer on the Graph [Renderer DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#lodStrategy).

```typescript
const graph = new Graph({
  // ... other graph configurations
  renderer: 'canvas', // 'canvas', 'svg', 'webgl', 'webgl-3d'
});
```

In addition, the layout package of G6, @antv/layout, supports WASM computation. To use this feature, you need to import the specific layout algorithm from the @antv/layout-wasm package and register it with Graph using extend, and then you can use it. [WASM Layout DEMO](https://g6-next.antv.antgroup.com/en/examples/feature/features/#wasmLayouts).

```typescript
import { ForceLayout as ForceLayoutWASM, supportsThreads, initThreads } from '@antv/layout-wasm';
const ExtGraph = extend(Graph, {
  layouts: {
    'force-wasm': ForceLayoutWASM,
  },
});
const supported = await supportsThreads();
const threads = await initThreads(supported);
const graph = new ExtGraph({
  layout: {
    type: 'force-wasm',
    threads,
    maxIteration: 200,
  },
  // ... other graph configurations
});
```

## 8️⃣. Reduce Package Size

In G6 v5, only the most commonly used features are registered on the Graph by default. Other features need to be imported from @antv/g6 or other packages and registered on the Graph before they can be configured.

```typescript
import { Graph, extend, Extensions } from '@antv/g6';
// External imported features
import { ForceLayout as ForceLayoutWASM, supportsThreads, initThreads } from '@antv/layout-wasm';
// Class CustomBehaviorClass...
// Class CustomEdge...
const ExtGraph = extend(Graph, {
  behaviors: {
    'activate-relations': Extensions.ActivateRelations, // Built-in interaction, not registered in advance
    'some-custom-behavior': CustomBehaviorClass, // Custom interaction
  },
  nodes: {
    'modelRect-node': Extensions.ModelRectNode, // Built-in modelRect node, not registered in advance
  },
  edges: {
    'custom-edge': CustomEdge, // Custom edge
  },
  layouts: {
    'force-wasm': ForceLayoutWASM,
  },
});

const supported = await supportsThreads();
const threads = await initThreads(supported);

// Instantiate the extended graph
const graph = new ExtGraph({
  // ... other configurations
  modes: {
    default: [
      'drag-node', // Default registered interaction
      'activate-relations', // Built-in interaction that was imported and registered just now
      'some-custom-behavior', // Custom interaction that was imported and registered
    ],
  },
  defaultNode: {
    type: 'modelRect-node', // Built-in node type that was imported and registered just now
  },
  defaultEdge: {
    type: 'custom-edge', // Custom edge type that was imported and registered
  },
  layout: {
    type: 'force-wasm', // Layout algorithm that was imported and registered just now
    threads,
    maxIteration: 200,
  },
});
```

The default registered features include:

```typescript
const stdLib = {
  transforms: {
    'validate-data': ValidateData, // Data validator, executed internally by G6
    'transform-v4-data': TransformV4Data, // Transform v4 data
    'map-node-size': MapNodeSize, // Map node size to a specified field of the node
  },
  themes: {
    light: LightTheme, // Light theme
    dark: DarkTheme, // Dark theme
  },
  themeSolvers: {
    spec: SpecThemeSolver, // Default theme solver
  },
  layouts: {
    force: ForceLayout, // Force-directed layout
    grid: GridLayout, // Grid layout
    circular: CircularLayout, // Circular layout
    concentric: ConcentricLayout, // Concentric layout
    ...Hierarchy, // All tree layouts, including Dendrogram, Indented, Mindmap, CompactBox
  },
  behaviors: {
    'drag-canvas': DragCanvas, // Drag canvas
    'zoom-canvas': ZoomCanvas, // Zoom canvas
    'drag-node': DragNode, // Drag node
    'drag-combo': DragCombo, // Drag combo
    'collapse-expand-combo': CollapseExpandCombo, // Collapse/expand combo
    'collapse-expand-tree': CollapseExpandTree, // Collapse/expand subtree
    'click-select': ClickSelect, // Click to select
  },
  plugins: {
    history: History, // History stack
  },
  nodes: {
    'circle-node': CircleNode, // Circle node
    'rect-node': RectNode, // Rectangular node
  },
  edges: {
    'line-edge': LineEdge, // Straight edge
  },
  combos: {
    'circle-combo': CircleCombo, // Circle combo
    'rect-combo': RectCombo, // Rectangular combo
  },
  markers: {
    // Some commonly used icons
    collapse: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x + r - 4, y],
      ];
    },
    expand: (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x - r + 2 * r - 4, y],
        ['M', x - r + r, y - r + 4],
        ['L', x, y + r - 4],
      ];
    },
    upTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [['M', x - l1, y + l2], ['L', x + l1, y + l2], ['L', x, y - r], ['Z']];
    },
    downTriangle: (x, y, r) => {
      const l1 = r * Math.cos(Math.PI / 6);
      const l2 = r * Math.sin(Math.PI / 6);
      return [['M', x - l1, y - l2], ['L', x + l1, y - l2], ['L', x, y + r], ['Z']];
    },
  },
};
```
