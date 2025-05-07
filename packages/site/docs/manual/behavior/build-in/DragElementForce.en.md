---
title: DragElementForce
---

## Overview

DragElementForce is a built-in behavior in G6 for implementing node dragging under `d3-force` and `d3-force-3d` layouts. During dragging, the layout is **recalculated in real-time**, allowing the graph layout to dynamically adjust to accommodate the new position of the nodes.

<img alt="Effect of DragElementForce" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I5uDQZWTzMsAAAAAAAAAAAAADmJ7AQ/original" />

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-element-force'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'drag-element-force',
      key: 'drag-element-force-1',
      fixed: true, // Fix node position after dragging
    },
  ],
});
```

## Configuration Options

| Option                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Type                                                 | Default                                        | Required |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- | -------- |
| type                                       | Behavior type name, set `type: 'drag-element-force'` to enable this behavior                                                                                                                                                                                                                                                                                                                                                                                  | string                                               | `drag-element-force`                           | ✓        |
| key                                        | Unique identifier for the behavior, used for subsequent operations                                                                                                                                                                                                                                                                                                                                                                                            | string                                               | -                                              |          |
| fixed                                      | Whether to keep the node position fixed after dragging ends, boolean values represent: <br/>- true: After dragging ends, the node's position will remain fixed and not be affected by the layout algorithm <br/>- false: After dragging ends, the node's position will continue to be affected by the layout algorithm                                                                                                                                        | boolean                                              | false                                          |          |
| enable                                     | Whether to enable the drag function, by default nodes and combos can be dragged                                                                                                                                                                                                                                                                                                                                                                               | boolean \| ((event: IElementDragEvent) => boolean)   | `['node', 'combo'].includes(event.targetType)` |          |
| state                                      | Identifier for the selected state of nodes, when multi-selection is enabled, it will find the selected nodes based on this state                                                                                                                                                                                                                                                                                                                              | string                                               | `selected`                                     |          |
| hideEdge                                   | Controls the display state of edges during dragging, optional values are: <br/>- `none`: Do not hide any edges <br/>- `out`: Hide edges with the current node as the source node <br/>- `in`: Hide edges with the current node as the target node <br/>- `both`: Hide all edges related to the current node <br/>- `all`: Hide all edges in the graph <br/>⚠️ Note: When `shadow` (ghost node) is enabled, the `hideEdge` configuration will not take effect. |
| `none` \| `all` \| `in` \| `out` \| `both` | `none`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                      |
| cursor                                     | Customize the mouse style during dragging, [example](#cursor)                                                                                                                                                                                                                                                                                                                                                                                                 | { default?: Cursor; grab: Cursor; grabbing: Cursor } | -                                              |          |

### cursor

`cursor` is used to customize the mouse pointer style during dragging:

- `default`: Pointer style in default state
- `grab`: Pointer style when hovering over a draggable element
- `grabbing`: Pointer style when dragging

Optional values are: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

Example configuration:

```js
cursor: {
  default: 'default',    // Use normal pointer by default
  grab: 'grab',         // Show grab pointer when draggable
  grabbing: 'grabbing'  // Show grabbing pointer when dragging
}
```

## FAQ

### 1. What is the difference between DragElementForce and DragElement?

- `DragElementForce` is specifically used for `d3-force` or `d3-force-3d` layouts, and recalculates the layout in real-time during dragging
- `DragElement` is a general drag interaction and does not trigger layout recalculation

## Practical Example

### Mesh Effect

<Playground path="layout/force-directed/demo/mesh.js" rid="drag-element-force-mesh"></Playground>

### Fix Dragged Nodes

<Playground path="layout/force-directed/demo/drag-fixed.js" rid="drag-element-force-fixed"></Playground>

## Shadow Style

### shadow{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>
