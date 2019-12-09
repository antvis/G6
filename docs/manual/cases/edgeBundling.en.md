---
title: Edge Bundling
order: 2
---

## Background
Most graphs are visualized as node-link diagram, which is appropriate for traffic network with geographical information on nodes, e.g. migration graph and ariline network.<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vzp9Q7ZA0rcAAAAAAAAAAABkARQnAQ' width=400 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GRE6SrrAWnoAAAAAAAAAAABkARQnAQ' width=400 />

> (Left) Figure 1. The airlines of France. (Right) Figure 2. The airlines of United States.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rC66Raf7OWwAAAAAAAAAAABkARQnAQ' width=400 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AwQbT7WotYwAAAAAAAAAAABkARQnAQ' width=400 />

> (Left) Figure 3. The world IXP peering network. (Right) Figure 4. The American immigration network.

## Problem
Though the node-link diagram is intuitive, the severe visual clutter problem still exists when the graph has large amount of data. The visual clutter of the node-link diagram mostly moes from the edge crossings and congestion. As shown in Figure 1~4, in the traffic networks, the positions of the node often have well-defined geographical meanings, which means the node positions are usually non-editable for reducing the visual clutter. Lots of research works focus on the methods to improve the visual clustter on edges, where the Edge Bundling is a widely used way to achieve it. The researches about edge bundlings are summarized 「<a href='https://yuque.antfin-inc.com/shiwu.wyy/go1ec6/znmtuw' target='_blank'>HERE</a>」.

Here goes a example with complicated American flights data, where the nodes represent the cities with latitute and longitute; the edges represent the flights:
```json
{
    "nodes": [{
        "x": -922.24444,
        "y": 347.29444,
        "id": "0",
        "lon": -92.224444,
        "lat": 34.729444
    }, {
        "x": -922.24444,
        "y": 347.29444,
        "id": "1",
        "lon": -92.224444,
        "lat": 34.729444
    },
    // ... Other nodes
    ],
    "edges": [
      {
        "source": "0",
        "target": "21",
        "id": "e0"
      }, {
        "source": "2",
        "target": "13",
        "id": "e1"
      },
      // ... Other edges
    ]
}
```

Render the nodes and edges by G6 directly, we will obtain the result:
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zYUrQqDGslMAAAAAAAAAAABkARQnAQ'  width=850 />

> Figure 5. Render the source data by G6.


Figure 5 shows the result with chaotic crossings which is hard for users to figure out the details and global trends.


## Expected Effect
We wish to improve the visual clutter of Figure 5 by edge bundling to show the global trends and structures and highlight the important cities with many flights. These cities might be the important traffic pivots. We also try to illustrate some statistical informations for analysis. Powered by G6, we are able to achive the result with: Bundling the edges, Mapping the edge directions to gradient colors(departure-orange, arrival-cyan) of the edge; Mapping the total number of flights about the cities to the size of the node; Adding interactions of hover; Utilizing the tooltip to show the longitute and latitute.

<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BC4AQbOd6HIAAAAAAAAAAABkARQnAQ' width=850 />

> The expected effect and the tooltip.



## Implement Steps

### Statistics Information
First, we count the total degrees of each node based on the data by simple JavaScript code. The `degree` of a node indicates the total number of the flights arriving and leaving the city; The `outDegree` indicates the leaving flights; The `inDegree` indicates the arriving flights.
```javascript
const nodes = data.nodes;
const edges = data.edges;
nodes.forEach(n => {
  n.y = -n.y;
  n.degree = 0;
  n.inDegree = 0;
  n.outDegree = 0;
});
// Compute the degree of each node
const nodeIdMap = new Map();
nodes.forEach(node => {
  nodeIdMap.set(node.id, node);
});
edges.forEach(e => {
  const source = nodeIdMap.get(e.source);
  const target = nodeIdMap.get(e.target);
  source.outDegree++;
  target.inDegree++;
  source.degree++;
  target.degree++;
});
let maxDegree = -9999, minDegree = 9999;
nodes.forEach(n => {
  if (maxDegree < n.degree) maxDegree = n.degree;
  if (minDegree > n.degree) minDegree = n.degree;
});
const sizeRange = [1, 20];
const degreeDataRange = [minDegree, maxDegree];
// The range of the degree is degreeDataRange, now we map it onto sizeRange and write the 'size' into node data.
scaleNodeProp(nodes, 'size', 'degree', degreeDataRange, sizeRange);
```

`scaleNodeProp()` maps the node property `refPropName` to another property `propName` with the  range `outRange`:
```javascript
/**
 * Mapping properties
 * @param  {array} nodes          The array of nodes
 * @param  {string} propName      The name of the property to be writed
 * @param  {string} refPropName   The name of the property to be normalized
 * @param  {array} dataRange      The range of the property to be normalized, [min, max]
 * @param  {array} outRange       The arange of the property to be writed, [min, max]
 */
function scaleNodeProp(nodes, propName, refPropName, dataRange, outRange) {
  const outLength = outRange[1] - outRange[0];
  const dataLength = dataRange[1] - dataRange[0];
  nodes.forEach(n => {
    n[propName] = (n[refPropName] - dataRange[0]) * outLength / dataLength + outRange[0];
  });
}
```

Now, we have normalized the degrees onto the `size`s of nodes.


### Instantiate the Bundling Plugin
The edge bunlding technique in G6 is implemented according to the paper FEDB (<a href='http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.212.7989&rep=rep1&type=pdf' target='_blank'>Force-Directed Edge Bundling for Graph Visualization</a>). By tuning the configurations, you can adjust the bundling result easily.
```javascript
const edgeBundling = new Bundling({
    bundleThreshold: 0.6, // The tolerance of bundling. Lower number, the higher similarity of the bundled edges is required, the smaller number of edges to be bundled together.
    K: 100 // The strength of the bundling
 });
```


### Custom Pie Node
In the first step, we have mapped the degrees of nodes onto their size. To demonstrate the ratio of leaving and arriving flights, we design a pie-chart node for each city. For example, <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*stNMRLlBLMUAAAAAAAAAAABkARQnAQ' width=60 />, the orange fan represents the number of arriving flights, and the cyan fan represents the number of leaving flights. The built-in nodes in G6 do not meet such requirement. Thus, we now register a custom node by the custom mechanism of G6:
```javascript
const lightBlue = 'rgb(119, 243, 252)';
const lightOrange = 'rgb(230, 100, 64)';

// Register a type of custom node named pie-node
G6.registerNode('pie-node', {
  drawShape: (cfg, group) => {
    const radius = cfg.size / 2; // The radius the of node
    const inPercentage = cfg.inDegree / cfg.degree; // The percentage of the inDegree
    const inAngle = inPercentage * Math.PI * 2; // The angle of the fan of inDegree
    const outAngle = Math.PI * 2 - inAngle; // The angle of the fan of outDegree
    const inArcEnd = [radius * Math.cos(inAngle), radius * Math.sin(inAngle)]; // The end point of the inDegree fan
    let isInBigArc = 1, isOutBigArc = 0;
    if (inAngle > Math.PI) {
      isInBigArc = 0;
      isOutBigArc = 1;
    }
    // The inDegree fan
    const fanIn = group.addShape('path', {
      attrs: {
        path: [
          [ 'M', radius, 0 ],
          [ 'A', radius, radius, 0, isInBigArc, 0, inArcEnd[0], inArcEnd[1] ],
          [ 'L', 0, 0 ],
          [ 'B' ]
        ],
        lineWidth: 0,
        fill: lightOrange
      }
    });
    // The outDegree fan
    const fanOut = group.addShape('path', {
      attrs: {
        path: [
          [ 'M', inArcEnd[0], inArcEnd[1] ],
          [ 'A', radius, radius, 0, isOutBigArc, 0, radius, 0 ],
          [ 'L', 0, 0 ],
          [ 'B' ]
        ],
        lineWidth: 0,
        fill: lightBlue
      }
    });
    // return the keyshape
    return fanIn;
  }
},
"single-shape"
);
```
The code above registers a 'pie-node' type node.


### Instantiate the Graph
Now, we are going to register a graph and assign the Edge Bundling plugin, node type ('pie-node'), and item styles for it.
```javascript
  const edgeBundling = new Bundling({
    bundleThreshold: 0.6, // The tolerance of bundling. Lower number, the higher similarity of the bundled edges is required, the smaller number of edges to be bundled together.
    K: 100 // The strength of the bundling
  });
  const graph = new G6.Graph({
   container: 'mountNode',
   width: 1000,
   height: 800,
   plugins: [ edgeBundling ], // Add the plugin
   fitView: true,
   defaultNode: {
     size: 3,
     color: 'steelblue',
     fill: 'steelblue'
   },
   nodeStyle: {
     default: {
       lineWidth: 0,
       fill: 'steelblue'
     }
   },
   edgeStyle: {
    default: {
      lineWidth: 0.7,
      strokeOpacity: 0.1, // The opacity of the edge. The transparency of the gathered edges will be superimposed, which has the effect of highlighting high-density areas
      stroke: 'l(0) 0:' + llightBlue16 + ' 1:' + llightOrange16
    }
  }
 });
```

The edge begin with `llightBlue16` color and end with `llightOrange16` color:
```javascript
const llightBlue16 = '#C8FDFC';
const llightOrange16 = '#FFAA86';
```

Set the background of the body to be black to reach a better visual effect:
```html
<style>
  body{
    background: rgb(0, 0, 0);
  }
</style>
```

### Execute the Bundling and Render
The Graph and the Edge Bundling Plugin have been instantiated to `graph` and `edgeBundling`. The following code executes the bundling and load the data, render the graph:
```javascript
edgeBundling.bundling(data); // Execute the bundling
graph.data(data);
graph.render();
```


#### Configure Tooltip and Interactions
Tooltip shows the detail information when the mouse hovers on a node. We first configure the style for the tooltip in HTML:
```html
<style>
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
```

Then, we add a configuration `modes` onto the graph in the code about instantiating the Graph. As shown below, the `drag-canvas`, `zoom-canvas`, and `tooltip` are activated. The content of the `tooltip` is defined in `formatText`:
```javascript
 modes: {
   default: [ 'drag-canvas', 'zoom-canvas', {
     type: 'tooltip',
     formatText(model) {
       const text = 'Longitude: ' + model.lon + '\n Latitude: ' + model.lat;
       return text;
     },
     shouldUpdate: e => {
       return true;
     }
   }]
 }
```

After these configurations, the `tooltip` with longitude and latitude will show up when mouse hovers a node:<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*d3mSS6mETf8AAAAAAAAAAABkARQnAQ' width=850 />

> tooltip


In the same time, the canvas is draggable and zoomable:
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5h5tR5eDM6UAAAAAAAAAAABkARQnAQ' width=550 height=350 />

> Drag and zoom the canvas


## Analysis

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ePUIQZaDVecAAAAAAAAAAABkARQnAQ' width=850 />

> The final result. The size of the node indicates the total flights about the city. The pie node indicates the ratio of leaving flights and arriving flights (orange for arriving, cyan for leaving). The gradient color of an edge indicates its direction (cyan for start, orange for end).


Now, let's analyze the final result:

- Large nodes are mainly concentrated in the east-central region. According to the positions, It can be speculated that these cities are: Atlanta, New York, Chicago, Houston, Kansas, etc. All these cities are important transportation hubs in the United States;
- There are lots of orange edges in the east American, which means there are more arriving flights in east American;
- In contrast, there are more leaving flights from western cities;
- Flight directions are start from east and end in west overall;
- The eastern flights are also denser and more frequent than the western ones;
- There are more flights on the west coast from Seattle and Portland to Los Angeles.

The above findings can be easily explained: The eastern United States is the economic and political concentration region of the United States.

