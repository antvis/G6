---
title: Custom node
order: 13
---

In G6, if a built-in node does not meet a specific need, you can create a custom node by extending an existing node Type. This allows you to take advantage of G6's powerful built-in functionality while adding your own logic and style to the node.

Custom nodes can be created by inheriting from built-in nodes such as CircleNode. See [NodeType](/manual/customize/extension-cats#1-%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8Bnodes) for a graphical representation of what can be inherited.

## Example

```js
import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

// Custom node type, inherit an existing node type or node base class Extensions.BaseNode
class CustomNode extends Extensions.CircleNode {
  // Override methods, see the following section for methods that can be overridden
}

const Graph = extend(BaseGraph, {
  // Register custom node
  nodes: {
    'custom-node': CustomNode,
  },
});

const graph = new Graph({
  // ... Other configurations
  node: {
    type: 'custom-node', // Use the registered node
  },
});
```

## Override methods

<embed src="../../../common/BaseNodeOverrideMethod.en.md"></embed>

## Member Methods

`BaseNode` and its subclasses provide some member properties and methods for easily adding or updating shapes.

<embed src="../../../common/PluginMergedStyles.en.md"></embed>

<embed src="../../../common/PluginUpsertShape.en.md"></embed>
