---
title: Outline
order: 0
---

## Overview

Similar to [Graph Layout](/en/docs/api/graphLayout/guide), G6 provides several built-in TreeGraph layouts, which can be [configured to Graph](#Usage) by `layout`. The differences between TreeGraph and Graph:

- When instantiating a TreeGraph, the `layout` is required, but it is not required for Graph;
- TreeGaph layouts does not support being instantiated and used independently;
- You can not custom a new type of TreeGraph Layout by `G6.registerLayout`.

Notice that the layouts for TreeGraph cannot be used on Graph.

There are four built-in layouts for TreeGraph:

- [CompactBox](./compactBox)
- [Dendrogram](./dendrogram)
- [Indented](./indented)
- [Mindmap](./mindmap)

## Usage

```javascript
const graph = new G6.TreeGraph({
  // ...                      // Other configurations
  layout: {                // Object，required for TreeGraph
    type: 'dendrogram',
    ...                    // Other configurations for the layout
  }
});
```

## Common Configurations

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | String | dendrogram | The type of layout. Options: `'dendrogram'`, `'compactBox'`, `'mindmap'`, and `'indeted'`. |
| direction | String | LR | The direction of layout. Options: `'LR'` , `'RL'` , `'TB'` , `'BT'` , `'H'` , and `'V'`.<br />L: Left; R: right; T: top; B: bottom; H: horizontal; V: vertical. |
| getChildren | Function |  | Return all the children nodes of the current node. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When`type='indeted'`, `direction` can only be `'LR'`, `'RL'`, and `'H'`.
