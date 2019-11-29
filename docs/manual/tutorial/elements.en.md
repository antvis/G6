---
title: Configure the Items
order: 2
---

The items on the graph include `Node` and `Edge`. In the last chapter, we rendered the **Tutorial Demo** with items with rough styles. Now, we are going to beautify the items while introducing the attributes of the items.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*46GdQaNFiVIAAAAAAAAAAABkARQnAQ' width=450 height=450 />

> Figure 1  The **Tutorial Demo** with cofigured items.


## Basic Concept
### Graph Item
The items on the graph include `Node` and `Edge`. There are several [Built-in Nodes](../middle/elements/defaultNode) and [Built-in Edges](../middle/elements/defaultEdge) in G6. The main difference between different types of items is their [Graphics Shape](../middle/keyConcept). For example, a node's graphics shape can be a circle, a rect, an image, or others.

## Attributes of Item
The attributes can be categorized into two kinds for nodes or edges:

- **Style Attribute `style`**: Corresponds to the style in Canvas. When the [State](../middle/states/state) of an item is changed, the style can be updated;
- **Other Attribute**: Such as graphics `shape`, `id`, they are a kind of attributes that will not be changed when the [State](../middle/states/state) of the item is changed.

For example, When you change the state `'hover'` or `'click'` to true for a node A, only the **style attributes** of A can be updated, e.g. `fill`, `stroke`, and so on. The **other attributes** such as `shape` can not be changed. To update the other attributes, configure A by [graph.updateItem](../../api/Graph) manually. **style attributes** is an object named `style`.

### Data Structure
The data structure of a node:
```javascript
{
	id: 'node0',          // Unique id of the node
  shape: 'circle',      // The graphics shape of the node
  size: 40,             // The size
  label: 'node0'        // The label
  labelCfg: {           // The configurations for the label
    positions: 'center',// The relative position of the label
    style: {            // The style attributes of the label
      fontSize: 12,     // The font size of the label
      // ...            // Other style attributes of the label
    }
  }
  // ...,               // Other attributes of the node
  style: {              // The object of style attributes of the node
    fill: '#000',       // The filling color
    stroke: '#888',     // The stroke color
    // ...              // Other styleattribtues of the node
  }
}
```

The data structure of an edge is similar to node, but two more attributes `source` and `target` in addition, representing the `id` of the source node and the `id` of the target node respectively.

<br />Refine the visual requirments in figure 1 of **Tutorial Demo**:

- Visual Effect:
  - R1: Set the color for stroke and fill for nodes with `fill` and `stroke`;
  - R2: Set the color for the label with `labelCfg`;
  - R3: Set the opacity and color for edges with `opacity`，`stroke`;
  - R4: Set the direction of the label with `labelCfg`;
- Map the data to visual channel:
  - R5: Configure the shape of nodes with `shape` according to `class` in node data;
  - R6: Configure the line widht of edges with `lineWidth` according to the `weight` in edge data.

## Configure the Attributes
To satisfy different scenario, G6 provides 7 ways to configure the attributes for items. Here we will introduce two of them:

1. Configure the global attributes when instantiate a Graph;
2. Configure the attributes for different items in their data.

### 1. Configure the Global Attributes When Instantiate a Graph
**Applicable Scene:** Unify the configurations for all the nodes or edges. <br />**Usage:** Configure it with two configurations of graph:

- `defaultNode`: The **Style Attribute** `style` in the default state and **Other Attributes**;
- `defaultEdge`: The **Style Attribute**`style` in the default state and **Other Attributes**.

⚠️**Attention:** It is a way of unified global configuration, which does not distinguish the nodes with different properties (e.g. `class` and`weight`) in their data. That is to say, only R1, R2, R3, and R4 can be satisfied:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bufdS75wcmMAAAAAAAAAAABkARQnAQ' width=450 height=450 />

> Figure 2  **Tutorial Demo** with items configured by global configurations.


<br />Configuer the `defaultNode` and `defaultEdge` for graph to achieve the effect: 
```javascript
const graph = new G6.Graph({
  // ...                   // Other configurations of the graph
  // The style attributes and other attributes for all the nodes in the default state
  defaultNode:{
    size: 30,              // The size of nodes
    // ...                 // The other attributes
    // The style attributes of nodes
    style: {               
      fill: 'steelblue',   // The filling color of nodes
      stroke: '#666',      // The stroke color of nodes
      lineWidth: 1         // The line width of the stroke of nodes
    },
    // The attributes for label of nodes
    labelCfg: {       
      // The style attributes for the label
      style: {             
        fill: '#fff'       // The color of the text
      }
    }
  },
  // The style attributes and other attributes for all the edges in the default state
  defaultEdge: {
    // ...                 // The other attributes
    // The style attributes of edges
    style: {               
      opacity: 0.6,        // The opacity of edges
      stroke: 'grey'       // The color of the edges
    },
    // The attributes for label of edges
    labelCfg: {            
      autoRotate: true     // Whether rotate the label according to the edges
    }
  },
});
```

### 2. Configure the Attributes in Data
**Applicable Scene:** Configure different items according to their data.
<br />Thus, the R5 and R6 can be satisfied now.
<br />**Usage:** Write the attributes into each item data, or traverse the data to write the attributes. Here we show writing the attrbiutes into data by traversing:

```javascript
const nodes = remoteData.nodes;
nodes.forEach(node => {
  if (!node.style) {
    node.style = {};
  }
  switch (node.class) {         // Configure the graphics shape of nodes according to their class
    case 'c0': {
      node.shape = 'circle';    // The graphics shape is circle when class = 'c0'
      break;
    }
    case 'c1': {
      node.shape = 'rect';       // The graphics shape is rect when class = 'c1'
      node.size = [ 35, 20 ];    // The node size when class = 'c1'
      break;
    }
    case 'c2': {
      node.shape = 'ellipse';    // The graphics shape is ellipse when class = 'c2'
      node.size = [ 35, 20 ];    // The node size when class = 'c2'
      break;
    }
  }
});

graph.data(remoteData);
```

The result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JU6xRZLKCjcAAAAAAAAAAABkARQnAQ' width=450 height=450 />

> Figure 3


From figure 3, we find some nodes are rendered as rects, some are ellipses. We also set the size to cover the size in global configuration. The size is an array when the node is a rect or an ellipse. We did not set the size for circle node, so `size: 30` in global configuration will take effect. That is to say, configuring items by writing into data has higher priority than global configurations.

We further set the line widths for edges according to their weight:
```javascript
// const nodes = ...

// Traverse the egdes data
const edges = remoteData.edges;
edges.forEach(edge => {
  if (!edge.style) {
    edge.style = {};
  }
  edge.style.lineWidth = edge.weight;  // Mapping the weight in data to lineWidth
});

graph.data(remoteData);
```

The result: 

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*46GdQaNFiVIAAAAAAAAAAABkARQnAQ' width=450 height=450 />

The line width of the edges take effect in the figure above. But the opacity and color setted in the global configuration are lost. The reason is the global `style` object in graph instance is overrided by the second configure method. The solution is move all the style to the data:
```javascript
const graph = new G6.Graph({
  // ...
  defaultEdge: {
    // Remove the style here
    labelCfg: {        // The attributes for label of edges
      autoRotate: true // Whether rotate the label according to the edges
    }
  }
});

// Traverse the nodes data
// const nodes = ...
// nodes.forEach ...

// Traverse the egdes data
const edges = remoteData.edges;
edges.forEach(edge => {
  if (!edge.style) {
    edge.style = {};
  }
  edge.style.lineWidth = edge.weight;  // Mapping the weight in data to lineWidth
  // The styles are moved to here
  opt.style.opacity = 0.6;
  opt.style.stroke = 'grey';
});

graph.data(remoteData);
graph.render()
```

## Complete Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tutorial Demo</title>
</head>
<body>
  <div id="mountNode"></div>
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
  <script>
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      fitView: true,
      fitViewPadding: [ 20, 40, 50, 20 ],
      defaultNode: {
        size: 30,
        labelCfg: {
          style: {
            fill: '#fff'
          }
        }
      },
      defaultEdge: {
        labelCfg: {
          autoRotate: true
        }
      },
    });
		const main = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
      );
      const remoteData = await response.json();
      const nodes = remoteData.nodes;
      const edges = remoteData.edges;
      nodes.forEach(node => {
        if (!node.style) {
          node.style = {};
        }
        node.style.lineWidth = 1;
        node.style.stroke = '#666';
        node.style.fill = 'steelblue';
        switch (node.class) {
          case 'c0': {
            node.shape = 'circle';
            break;
          }
          case 'c1': {
            node.shape = 'rect';
            node.size = [ 35, 20 ];
            break;
          }
          case 'c2': {
            node.shape = 'ellipse';
            node.size = [ 35, 20 ];
            break;
          }
        }
      });
      edges.forEach(edge => {
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

**⚠️Attention**: <br />Replace the url `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` to change the data into yours.
