---
title: Plugins and Tools
order: 5
---

To assist user to exploration a graph, G6 provides some tools, including plugins and interaction tools.


Now, we are going to add minimap, grid, node tooltip, and edge tooltip to **Tutorial Demo**.

## Plugin
Apply plugins with three steps:<br />  Step 1: Import the plugin;<br />  Step 2: Instantiate the plugin;<br />  Step 3: Configure plugin onto the instance of Graph.

### Minimap
Minimap is a tool for quick preview and exploration on large graph.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kGesRLgy1CsAAAAAAAAAAABkARQnAQ' width=520  />

Now, we are goint to configure a minimap to **Tutorial Demo**.

**Expected Effect**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SI8ZSpcqecgAAAAAAAAAAABkARQnAQ' width=350 />

**Usage**

In G6, Minimap is a plugin, which is packed as independent package. It should be imported as:
```html
<body>
  <!-- Import G6 -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/g6.js"></script>
  
  <!-- Import Minimap -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/minimap.js"></script>
  
  <script>
    // ...
  </script>
</body>
```

You only need to instantiate it and configure the minimap onto the instance of Graph:
```javascript
// Instantiate the Minimap
const minimap = new Minimap({
  size: [ 100, 100 ],
  className: "minimap",
  type: 'delegate'
});

// Instantiate the Graph
const graph = new G6.Graph({
  // ...                           // Other configurations
  plugins: [ minimap ]             // Configure minimap to the graph
});
```

### Grid
Grid helps to align the node while user drags it.

**Expected Effect**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 />

**Usage**

Import the plugin:

```html
<body>
  <!-- Import G6 -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/g6.js"></script>
  
  <!-- Import Minimap -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/minimap.js"></script>
  
  <!-- Import Grid -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/grid.js"></script>
  
  <script>
    // ...
  </script>
</body>
```

Configure it onto the graph:
```javascript
// const minimap = ...

// Instantiate grid
const grid = new Grid();

// Instantiate the Graph
const graph = new G6.Graph({
  // ...                        // Other configurations
  plugins: [ minimap, grid ]    // Configure grid onto the graph
});
```

## Interaction Tool
Interaction tools assist user interact a graph. Two steps are required:
<br />  Step 1: Configure `modes` when instantiating a graph;
<br />  Step 2: Define the styles for the tools.

### Tooltip for Node
Node tooltip shows the detail information when mouse enters a node.

**Expected Effect**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 />

**Usage**

Configure `'tooltip'` to `modes` when instantiating the Graph:
```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // ...
      {
        type: 'tooltip', // Tooltip
        formatText(model) {
          // The content of tooltip
          const text =
                'label: ' + model.label + '<br/> class: ' + model.class;
          return text;
        }
      }
    ]
  },
});
```

Actually, tooltip is a floating `<div>` tag of HTML. Thus, you can define the CSS style for it in `<style>` tag:
```html
<head>
  <meta charset="UTF-8" />
  <title>Tutorial Demo</title>

  <style>
    /* The style of the tooltip */
    .g6-tooltip {
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      font-size: 12px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 8px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
  </style>
</head>
```

### Tooltip for Edge
Edge tooltip shows the detail information when mouse enters a edge.

**Expected Effect**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Uk10SYFNNi8AAAAAAAAAAABkARQnAQ' width=300 />

**Usage**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // ...
      {
        type: 'tooltip', // Node tooltip
        // ...
      },
      {
        type: 'edge-tooltip',       // Edge tooltip
        formatText(model) {         // The content of the edge tooltip
          const text = 'source: ' + model.source
            + '<br/> target: ' + model.target
            + '<br/> weight: ' + model.weight;
          return text;
        }
    }]
  }
});
```

The same as node tooltip, edge-tooltip is a floating `<div>` tag in HTML. Thus, you can define the CSS style for it in `<style>` tag:

## Complete Code
**Tutorial Demo** is done now. For complete code, see: [Code of Tutorial Demo](https://codepen.io/Yanyan-Wang/pen/mdbYZvZ).

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> <br />Replace the url `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` to change the data into yours.
