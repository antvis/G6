---
title: G6 in React
order: 9
---

### Introduction
G6 is a JavaScript library without any coupling to other framewroks. That means, G6 can be combined to any front-end framework, such as React, Vue, and Angular. In this document, we provide a demo about using G6 in React.

The main difference between using G6 in React and HTML is that you need to guarantee the DOM container of graph has been rendered and it is available before instantiating a Graph.

In this demo, we will implement a simple flow diagram as the figure below:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*L8pRS5HCPXUAAAAAAAAAAABkARQnAQ' width=800/>

### Implementation
The demo includes these functions:

- Register a custom node;
- Register a custom edge;
- Utilize node tooltip;
- Utilize edge tooltip;
- Utilize the context menu on node;
- Render the custom React components of tooltip and ContextMenu.

In React, you can fetch the DOM element by `ReactDOM.findDOMNode(ref.current)`.

```javascript
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { data } from './data';
import G6 from '@antv/g6';

export default function() {
  const ref = React.useRef(null)
  let graph = null

  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas']
        },
        layout: {
        	type: 'dagre',
          direction: 'LR'
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },
        defaultEdge: {
          shape: 'polyline'
        }
      })
    }
    graph.data(data)
    graph.render()
  }, [])

  return (
    <div ref={ref}></div>
  );
}

```

### Render the React Components
The styles of the built-in tooltips on nodes/edges and thecontext menu on nodes are too simple to satisfy the complex requirements. Now we show how to customize React components for these tools, then the styles of them can be controlled by users. During the interaction, G6 defines the render timing and position of these components. When the timing and the position are available, they can be managed by React state.
```javascript
// The coordinate of node tooltip
const [showNodeTooltip, setShowNodeTooltip] = useState(false)
const [nodeTooltipX, setNodeToolTipX] = useState(0)
const [nodeTooltipY, setNodeToolTipY] = useState(0)

// Listen to the mouse event on node
graph.on('node:mouseenter', evt => {
  const { item } = evt
  const model = item.getModel()
  const { x, y } = model
  const point = graph.getCanvasByPoint(x, y)

  setNodeToolTipX(point.x - 75)
  setNodeToolTipY(point.y + 15)
  setShowNodeTooltip(true)
})

// Hide the tooltip and the contextMenu when the mouseleave event is activated on the node
graph.on('node:mouseleave', () => {
  setShowNodeTooltip(false)
})

return (
  <div ref={ref}>
  { showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} /> }
 </div>
);
```

The complete code of this demo 「<a href='https://github.com/baizn/g6-in-react' target='_blank'>HERE</a>」.

You are welcome to provide the usages of G6 in Vue and Angular. Thank you!
