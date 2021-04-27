---
title: Outline
order: 0
---

## Built-in Layout Overview

G6 provides several built-in layout algorithms as listed below. They can be [configured to `layout` when instantiate the Graph](#configure-to-gaph), or be [instantiated independently](#instantiate-independently). If the built-in layouts cannot meet your requirement, you can also [custom a layout](/en/docs/api/registerLayout).

Notice that the layouts for Graph cannot be used on TreeGraph.

- [Random Layout](./random): Randomizes the node postions;
- [GForce Layout](./gforce): Classical force-directed layout supports GPU parallel computing, supported by G6 4.0;
- [Force Layout](./force): Classical force-directed layout;
- [Force Atlas 2 Layout](./forceAtlas2): FA2 is a kind of force directed layout, which performs better on the convergence and compactness;
- [Fruchterman Layout](./fruchterman): A kind of force-directed layout;
- [Circular Layout](./circular): Arranges the nodes on a circle;
- [Radial Layout](./radial): Arranges the nodes around a focus node radially;
- [MDS Layout](./mds): Multidemensional Scaling;
- [Dagre Layout](./dagre): Arranges the nodes hierarchically;
- [Concentric Layout](./concentric): Arranges the nodes on concentric circles;
- [Grid Layout](./grid): Arranges the nodes on grid.
- [Combo Force Layout](./combo-force)：_New feature of V3.5_ Designed for graph with combos.

## Configure to Gaph

Configure the `layout` when instantiating a Graph:

```javascript
const graph = new G6.Graph({
  ...                      // Other configurations
  layout: {                // Object, configuration for layout. random by default
    type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    // workerEnabled: true, // Whether enable webworker
    // gpuEnabled: true // Whether enable GPU version. supported by G6 4.0, and only support gForce and fruchterman layout. If the machine or browser does not support GPU computing, it will be degraded to CPU computing automatically. 
    ...                    // Other layout configurations
  }
});
```

The configurations of each layout algorithms are different. Please refer to corresponding API of each layout in this directory. <br />When `layout` is not assigned on graph:

- If there are `x` and `y` in node data, the graph will render with these information;
- If there is no positions information in node data, the graph will arrange nodes with Random Layout by default.

## Instantiate Independently

The functions in this section should be concerned in these two situation:

- When you want to applay a layout algorithm to your data but not for Graph, you can instantiate the layout independently by calling `const layout = new G6.Layout['layoutName']`.
- When you want to custom a new type of layout by `G6.registerLayout`, some functions you should override.

### Initialize

#### init(data)

Initialize the layout.

**Paramter**

| Name | Type   | Required | Description             |
| ---- | ------ | -------- | ----------------------- |
| data | Object | true     | The data for the layout |

#### getDefaultCfg()

Get the default configurations of the layout.

**Return**

| Name | Type   | Required | Description                |
| ---- | ------ | -------- | -------------------------- |
| cfg  | Object | true     | The default configurations |

### Layout

#### execute()

Execute the layout.

#### layout(data)

Execute layout according to the data.

**Paramter**

| Name | Type   | Required | Description             |
| ---- | ------ | -------- | ----------------------- |
| data | Object | true     | The data to be arranged |

### Update

#### updateCfg(cfg)

Update the configurations for layout.

**Paramter**

| Name | Type   | Required | Description        |
| ---- | ------ | -------- | ------------------ |
| cfg  | Object | true     | New configurations |

### Destroy

### destroy()

Destroy the layout.

## AI Layout Prediction

`markdown:docs/manual/middle/layout/ai-layout.en.md`
