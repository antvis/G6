---
title: Overview
order: -1
---

## Plugin Development

See [Custom Plugin](/en/manual/customize/plugin-extension) for development.

## Plugin Registration and Use

```ts
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';
import CustomPlugin from './path/to/custom-plugin';

const Graph = extend(BaseGraph, {
  plugins: {
    'custom-plugin': CustomPlugin, // Register custom plugins
    'built-in-plugin': Extensions.Minimap, // Register built-in plugins, such as minimap
  },
});

const graph = new Graph({
  // ... Other configurations
  plugins: [
    'custom-plugin', // Use custom plugins by default configuration items
    {
      type: 'built-in-plugin',
      key: 'minimap',
      // ... Plugin configuration items
    },
  ],
});
```
