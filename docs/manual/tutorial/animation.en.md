---
title: Animation*
order: 6
---

The animation mechanism is too complicated to understand by beginners and out of the scope of the tutorial. In this chapter, we only introduce the animation in G6 briefly. For more information, please refer to [Basic Animation](/en/docs/manual/middle/animation).

There are two levels of animation in G6:

- GLobal animation: Transform the graph animatively when the changes are global;
- Item animation: The animation on a node or an edge.

## Global Animation

The global animation is controlled by Graph instance. It takes effect when some global changes happen, such as:

- `graph.updateLayout(cfg)`

Configure `animate: true` when instantiating a graph to achieve it.

**Example**

```javascript
const graph = new G6.Graph({
  // ...                      // Other configurations
  animate: true, // Boolean, whether to activate the animation when global changes happen
});
```

## Item Animation

G6 allows user to customize animation for item when register a type of custom item. <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hYJSQaneVmgAAAAAAAAAAABkARQnAQ' width=330  alt='img'/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-90pSrm4hkUAAAAAAAAAAABkARQnAQ' width=330 alt='img' />

For more cases, please refer to [Animation Case](/en/examples/scatter/node).
