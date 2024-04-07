---
title: Outline
order: 0
---

## Overview

Similar to [Graph Layout](/en/docs/api/graph-layout/guide), G6 provides several built-in TreeGraph layouts, which can be [configured to Graph](#Usage) by `layout`. The differences between TreeGraph and Graph:

- When instantiating a TreeGraph, the `layout` is required, but it is not required for Graph;
- TreeGaph layouts does not support being instantiated and used independently;
- You can not custom a new type of TreeGraph Layout by `G6.registerLayout`.

Notice that the layouts for TreeGraph cannot be used on Graph.

There are four built-in layouts for TreeGraph:

- [CompactBox](/en/docs/api/treegraphlayout/compact-box)
- [Dendrogram](/en/docs/api/treegraphlayout/dendrogram)
- [Indented](/en/docs/api/treegraphlayout/indented)
- [Mindmap](/en/docs/api/treegraphlayout/mindmap)

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
| type | String | dendrogram | The type of layout. Options: `'dendrogram'`, `'compactBox'`, `'mindmap'`, and `'indented'`. |
| excludeInvisibles | Boolean | false | *Supported by v4.8.8.* Whether to exclude the hidden nodes. Assign it to true to exclude. |
| direction | String | LR | The direction of layout. Options: `'LR'` , `'RL'` , `'TB'` , `'BT'` , `'H'` , and `'V'`.<br />L: Left; R: right; T: top; B: bottom; H: horizontal; V: vertical. |
| getChildren | Function |  | Return all the children nodes of the current node. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When`type='indented'`, `direction` can only be `'LR'`, `'RL'`, and `'H'`.
