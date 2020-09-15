---
title: Render with SVG
order: 10
---

If you want to render graph of G6 with SVG, assign `renderer` to `'svg'` for graph instance as below:

```javascript
const graph = new G6.Graph({
  // ... other configurations
  // renderer for the graph
  renderer: 'svg',
});
```

SVG rendering in G6 supports all the functions in Canvas rendering. We all known that the performance of SVG is not good as canvas. So use Canvas rendering in the case of large data instead.

Expect for default nodes and edges and graphics shapes used in custom node and edge as Canvas version, SVG also supports `'dom'` shape when customing node or edge. Detials are in [Custom Node with Dom](/en/docs/manual/advanced/custom-node/#5-custom-node-with-dom).
