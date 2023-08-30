---
title: README
---

## Modules

- [behaviors](modules/behaviors.en.md)
- [graph](modules/graph.en.md)
- [item](modules/item.en.md)
- [layout](modules/layout.en.md)
- [plugins](modules/plugins.en.md)
- [types](modules/types.en.md)
- [util](modules/util.en.md)

Overview / [Modules](modules.en.md)

```jsx
import { Graph, Util } from '@antv/g6';
const data = Util.mock(6).circle();

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 500,
  data,
  layout: {
    type: 'grid',
  },
  plugins: [
    {
      key: 'minimap',
      type: 'minimap',
      size: [300, 200],
      mode: 'delegate',
      delegateStyle: {
        fill: 'red',
      },
      className: 'g6-minimap-2',
      viewportClassName: 'g6-minimap-viewport-2',
    },
  ],
});

const nodes = graph.getAllNodesData();
const nodes = graph.getAllNodesData();

graph.on('node:click', (e) => {});
```

# Introduce

In the above code snippet, we may want to know more about what G6 has to offer, in which case we will need the G6 API documentation

#### What types, methods and classes are exported in the '@antv/g6' package?

- [Graph](./classes/graph.Graph.en.md)
- [Util](./module/utils.en.md)

#### What is Specification which in `new Graph(Specification)`？

- [Specification](./interfaces/types.Specification.en.md)

#### What are the detailed parameters of the plugins ?

- [Plugins](./modules/plugins.en.md)
