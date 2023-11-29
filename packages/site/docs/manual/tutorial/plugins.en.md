---
title: Plugins and Tools
order: 5
---

This article will add the Minimap plugin and tooltip node prompt box to the **Tutorial Example**.
When using plugins, there are three steps:

- Step 1: Import the plugin;
- Step 2: Register the plugin;
- Step 3: Configure the plugin instance on the graph when instantiating the graph.

## Minimap

The Minimap is a common tool used for quick preview and exploration of graphs. It can serve as a navigation aid for users to explore large-scale graphs.

Now, let's configure a Minimap for the **Tutorial Example**:

**Expected Result**

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9VQjTp0Ipi8AAAAAAAAAAAAADmJ7AQ/original' width=350 alt='img' />

**Usage**

The Minimap is one of the plugins provided by G6, but it is not registered in advance. It needs to be imported from Extensions and registered before being configured on the graph:

```javascript
const { Graph as BaseGraph, extend, Extensions } = G6;
const ExtGraph = extend(BaseGraph, {
  // ... Other extension registrations
  // Plugin registration
  plugins: {
    minimap: Extensions.Minimap,
  }
});
// Instantiate the graph, note that the extended Graph is used here
const graph = new ExtGraph({
  // ... Other configurations
  plugins: [
    // If using default configurations, you can simply write a string 'minimap'
    {
      type: 'minimap',
      // ... Other configurations
    }
  ],
});
```

## Tooltip

The tooltip node prompt box can be used to display detailed information about nodes. When the mouse hovers over a node, a floating layer is displayed to provide detailed information about the node. For more configurations, see [Tooltip Plugin](/en/apis/plugins/tooltip-config).

**Expected Result**

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9VQjTp0Ipi8AAAAAAAAAAAAADmJ7AQ/original' width=300 alt='img' />

**Usage**

The Tooltip is one of the plugins provided by G6, but it is not registered in advance. It needs to be imported from Extensions and registered before being configured on the graph:

```javascript
const { Graph as BaseGraph, extend, Extensions } = G6;
const ExtGraph = extend(BaseGraph, {
  // ... Other extension registrations
  // Plugin registration
  plugins: {
    minimap: Extensions.Minimap,
    tooltip: Extensions.Tooltip,
  }
});
// Instantiate the graph, note that the extended Graph is used here
const graph = new ExtGraph({
  // ... Other configurations
  plugins: [
    // If using default configurations, you can simply write a string 'minimap'
    'minimap',
    // If using default configurations, you can simply write a string 'tooltip'
    {
      type: "tooltip",
      key: "my-tooltip", // Unique identifier
      itemTypes: ["node"], // Only effective for nodes, can be configured as ['node', 'edge'] to make it effective for both nodes and edges
      getContent: (e) => { // Custom content
        const model = graph.getNodeData(e.itemId);
        return `ID: ${e.itemId}<br/>Degree: ${model.data.degree}`;
      }
      // ... Other configurations
    },
  ],
});

```

## Complete Code

With this, the Tutorial Example is complete. The complete code can be found here: a href='https://codesandbox.io/s/g6-v5-tutorial-j67vnm?file=/index.js' target='\_blank'>Tutorial Example Code</a>.

**⚠️ Note:** <br /> If you need to replace the data, please replace  `'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json'` with the new data file address.

<iframe src="https://codesandbox.io/embed/g6-v5-tutorial-j67vnm?fontsize=14&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="g6-v5-tutorial"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
