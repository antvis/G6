---
title: Custom Combo
order: 3
---

In G6, if a built-in Combo does not meet a specific need, you can create a custom Combo by extending an existing Combo Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to Combo. [Custom Circle example DEMO](/zh/examples/item/customCombo#cCircle)。

Custom Combo can be created by inheriting from built-in Combo such as CircleCombo. See [ComboType](/en/manual/customize/extension-cats#3-combos) for a graphical representation of what can be inherited.

```typescript
import { Graph, Extensions, extend } from '@antv/g6';

// Create custom edges, inheriting from CircleCombo
class CustomCombo extends Extensions.CircleCombo {
  // Override member method to customize the drawing logic.
}

// Extend the Graph class with the extend method to register the custom edge.
const ExtGraph = extend(Graph, {
  combos: {
    'custom-combo': CustomCombo,
  },
});

// Create a graph instance using the extended Graph class, specifying ComboType as a custom Combo
const graph = new ExtGraph({
  // Other configuration items
  combo: {
    type: 'custom-combo', //Specify custom Combo
  },
});
```

## Override methods

<embed src="../../../common/BaseNodeOverrideMethod.en.md"></embed>

## Member Methods

`BaseNode` and its subclasses provide some member properties and methods for easily adding or updating shapes.

<embed src="../../../common/PluginMergedStyles.en.md"></embed>

<embed src="../../../common/PluginUpsertShape.en.md"></embed>
