---
title: Overview
order: 0
---

Combo is a special type of node in G6, which can contain multiple nodes and edges, and can be used to represent a complex node.

## Composition of Combo

In G6, a Combo is usually composed of `keyShape`, `labelShape`, `labelBackgroundShape`, `iconShape`, `badgeShapes`, and `otherShapes`.

- `keyShape`: The main shape of the Combo, usually used to represent the main shape of the Combo, and also used to calculate the incoming position of the Combo.

- `labelShape`: The text label shape of the Combo, usually used to display the name or description of the Combo.

- `labelBackgroundShape`: The text label background shape of the Combo, usually used to provide a background color for the text label.

- `iconShape`: The icon shape of the Combo, usually used to display the icon of the Combo.

- `badgeShapes`: The badge shape of the Combo, usually used to display the badge of the Combo.

- `otherShapes`: Other shapes of the Combo, usually used to display other information or status of the Combo.

Taking the circular Combo as an example, its main shape is a [circle](/en/apis/shape/circle-style-props):

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*foPeQq6rm54AAAAAAAAAAAAADmJ7AQ/original" alt="node sketch" width="400" />

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
