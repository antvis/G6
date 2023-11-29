---
title: Overview
order: -1
---

## Behavior Development

See [Custom Behavior](/en/manual/customize/behavior-extension) for development.

## Behavior Registration and Use

```ts
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';
import CustomBehavior from './path/to/custom-behavior';

const Graph = extend(BaseGraph, {
  behaviors: {
    'custom-behavior': CustomBehavior, // Register custom behaviors
    'built-in-behavior': Extensions.ActivateRelations, // Register built-in behaviors, such as activate relations
  },
});

const graph = new Graph({
  // ... Other configurations
  modes: {
    default: [
      'custom-behavior', // Use custom behaviors by default configuration items
      {
        type: 'built-in-behavior',
        key: 'activate-relations',
        // ... Behavior configuration items
      },
    ],
  },
});
```
