---
title: Overview
order: 0
---

## Registration and Usage of Combos

This directory lists all the built-in Combos in G6. G6 registers `circle-combo` and `rect-combo` by default. Additionally, to use a custom Combo, it needs to be registered:

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  combos: {
    'custom-combo': CustomCombo,
  },
});

/**
 * After registration, it can be used in instantiation or subsequent API calls
 */
const graph = new Graph({
  /**
   * ...other configuration items
   */
  combo: {
    /**
     * The type is consistent with the key name used during registration
     */
    type: 'custom-combo',
    /**
     * ... other configuration items of the combo
     */
  },
});
```

## 导航

- [Circle Combo](./CircleCombo.en.md): Circle Combo；
- [Rect Combo](./RectCombo.en.md): Rect Combo；
- [Custom Combo](./CustomCombo.en.md): Custom Combo
