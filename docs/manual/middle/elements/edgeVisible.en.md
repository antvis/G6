---
title: The Visibility
order: 5
---
## Show/Hide a Node or an Edge

Show and hide the node or the edge by the following four functions:
```javascript
// Show the instance of the node nodeItem. The property `visible` of the node will be true after calling the following code
nodeItem.show();

// Hide the instance of the node nodeItem. The property `visible` of the node will be false after calling the following code
nodeItem.hide();

// Show the instance of the edge edgeItem. The property `visible` of the node will be true after calling the following code
edgeItem.show();

// Hide the instance of the edge edgeItem. The property `visible` of the node will be false after calling the following code
edgeItem.hide();
```

## Example
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N96mRKpyYZIAAAAAAAAAAABkARQnAQ' width=150/> 

In this example, we bind the listeners to node clicking, edge clicking, and canvas clicking. And show/hide items in the inside the listeners:

```javascript
// Hide the node when the mouse clicks on it
graph.on('node:click', ev => {
  const node = ev.item;
  console.log('before hide(), the nodevisible = ', node.get('visible'));
  node.hide();
  graph.paint();
  console.log('after hide(), the node visible = ', node.get('visible'));
});

// Hide the edge when the mouse clicks on it
graph.on('edge:click', ev => {
  const edge = ev.item;
  console.log('before hide(), the edge visible = ', edge.get('visible'));
  edge.hide();
  graph.paint();
  console.log('after hide(), the edge visible = ', edge.get('visible'));
});

// Show all the nodes and edges when the mouse clicks the canvas
graph.on('canvas:click', ev => {
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  nodes.forEach(node => {
    node.show();
  });
  edges.forEach(edge => {
    edge.show();
  });
  graph.paint();
});
```
