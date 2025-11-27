---
title: DragElement
order: 7
---

## Overview

DragElement is a built-in behavior in G6 for implementing **element dragging** functionality. It has the following core features:

1. **Support for multiple element types**: Supports dragging of both nodes and combos simultaneously
2. **Intelligent multi-selection**: Supports dragging multiple selected elements at the same time
3. **Visual feedback**: Provides various visual feedback mechanisms such as ghost nodes, edge visibility, mouse styles, etc.
4. **Flexible drag effects**: Supports various drag operation effects such as move, link, free drag, etc.
5. **Parent-child relationship handling**: Automatically handles element hierarchy during dragging, especially when dealing with combo structures

## Online Experience

<embed src="@/common/api/behaviors/drag-element.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['drag-element'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'drag-element',
      key: 'drag-element-1',
      enableAnimation: true,
      dropEffect: 'move',
      shadow: true, // Enable ghost node
    },
  ],
});
```

## Configuration Options

| Option     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Type                                                     | Default                                        | Required |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------- | -------- |
| type       | Behavior type name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | string                                                   | `drag-element`                                 | ✓        |
| key        | Unique identifier for the behavior, used for subsequent operations                                                                                                                                                                                                                                                                                                                                                                                                                                              | string                                                   | -                                              |          |
| enable     | Whether to enable the drag function, by default nodes and combos can be dragged                                                                                                                                                                                                                                                                                                                                                                                                                                 | boolean \| ((event: IElementDragEvent) => boolean)       | `['node', 'combo'].includes(event.targetType)` |          |
| animation  | Whether to enable drag animation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | boolean                                                  | true                                           |          |
| state      | Identifier for the selected state of nodes, when multi-selection is enabled, it will find the selected nodes based on this state                                                                                                                                                                                                                                                                                                                                                                                | string                                                   | `selected`                                     |          |
| dropEffect | Defines the operation effect after dragging ends, optional values are: <br/>- `link`: Set the dragged element as a child of the target element <br/>- `move`: Move the element and automatically update the size of the parent element (such as combo) <br/>- `none`: Only update the position of the drag target without performing other operations                                                                                                                                                           | `link` \| `move` \| `none`                               | `move`                                         |          |
| hideEdge   | Controls the display state of edges during dragging, optional values are: <br/>- `none`: Do not hide any edges <br/>- `out`: Hide edges with the current node as the source node <br/>- `in`: Hide edges with the current node as the target node <br/>- `both`: Hide all edges related to the current node <br/>- `all`: Hide all edges in the graph <br/>⚠️ Note: When `shadow` (ghost node) is enabled, the `hideEdge` configuration will not take effect.                                                   | `none` \| `all` \| `in` \| `out` \| `both`               | `none`                                         |          |
| shadow     | Whether to enable ghost nodes, which use a shape to follow the mouse movement. [Customize ghost node style](#shadow-style-configuration) ⚠️Note: React nodes do not support enabling                                                                                                                                                                                                                                                                                                                            | boolean                                                  | false                                          |          |
| cursor     | Customize the mouse style during dragging, [configuration options](#cursor)                                                                                                                                                                                                                                                                                                                                                                                                                                     | { default?: Cursor; grab: Cursor; grabbing: Cursor }     | -                                              |          |
| trigger    | Press this shortcut key in combination with mouse perform drag element **Key reference:** _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_. If set to an **empty array**, it means drag element can be performed with mouse without pressing other keys <br/> ⚠️ Note, setting `trigger` to `['drag']` will cause the `drag-canvas` behavior to fail. The two cannot be configured simultaneously. | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[] | [`shift`]                                      |          |

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

### shadow Style Configuration

When `shadow: true` is enabled, you can customize the style of the ghost node with the following properties:

| Option               | Description                       | Type                                | Default                                     |
| -------------------- | --------------------------------- | ----------------------------------- | ------------------------------------------- |
| shadowFill           | Ghost node fill color             | string                              | `#F3F9FF`                                   |
| shadowFillOpacity    | Ghost node fill color opacity     | number                              | 0.5                                         |
| shadowStroke         | Ghost node stroke color           | string                              | `#1890FF`                                   |
| shadowStrokeOpacity  | Ghost node stroke opacity         | number                              | 0.9                                         |
| shadowLineDash       | Ghost node dash configuration     | number[]                            | [5, 5]                                      |
| shadowZIndex         | Ghost node rendering level        | number                              | 100                                         |
| shadowWidth          | Ghost node width                  | number                              | Width of the target element's bounding box  |
| shadowHeight         | Ghost node height                 | number                              | Height of the target element's bounding box |
| shadowOpacity        | Overall opacity of the ghost node | number                              |                                             |
| shadowLineWidth      | Ghost node line width             | number                              |                                             |
| shadowLineCap        | Ghost node line cap style         | `'butt'` \| `'round'` \| `'square'` |                                             |
| shadowLineJoin       | Ghost node line join style        | `'miter'` \| `'round'` \| `'bevel'` |                                             |
| shadowLineDashOffset | Ghost node dash offset            | number                              |                                             |
| shadowCursor         | Ghost node mouse style            | string                              |                                             |
| shadowVisibility     | Ghost node visibility             | `'visible'` \| `'hidden'`           |                                             |

Example configuration:

```javascript
{
  type: 'drag-element',
  shadow: true,
  // Customize ghost node style
  shadowFill: '#E8F3FF',
  shadowFillOpacity: 0.4,
  shadowStroke: '#1890FF',
  shadowStrokeOpacity: 0.8,
  shadowLineDash: [4, 4],
  shadowZIndex: 99
}
```

> Note: The ghost node style inherits from [BaseStyleProps](/en/manual/element/shape/properties#baseshapestyle), the above configuration items are obtained by adding the `shadow` prefix to the property name.

## Code Examples

### Multi-selection Dragging

Need to cooperate with the `click-select` behavior to achieve multi-selection, and then associate the selected state through the `state` parameter:

```javascript
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      multiple: true,
      state: 'selected',
    },
    {
      type: 'drag-element',
      state: 'selected', // All nodes in the selected state will be moved simultaneously during dragging
    },
  ],
});
```
