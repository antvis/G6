---
title: DragElement
---

<embed src="@/common/api/behaviors/drag-element.md"></embed>

## Options

### key

> _string_

Behavior key, that is, the unique identifier

Used to identify the behavior for further operations

```typescript
// Update behavior options
graph.updateBehavior({key: 'key', ...});
```

### <Badge type="success">Required</Badge> type

> _string_

Behavior type

### animation

> _boolean_ **Default:** `true`

Whether to enable drag animation

### cursor

> _{ default?:_ _Cursor\_\_; grab:_ _Cursor\_\_; grabbing:_ _Cursor\_\_; }_

Cursor style

### dropEffect

> _'link' \| 'move' \| 'none'_ **Default:** `'move'`

Drag operation effect

- `'link'`: Place the drag element as a child element of the target element

- `'move'`: Move the element and update the parent element size

- `'none'`: Only update the drag target position, no additional operations

The combo element can be placed as an element container into the node or combo element

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `['node', 'combo'].includes(event.targetType)`

Whether to enable the function of dragging the node，default can drag node and combo

### hideEdge

> _'none' \| 'all' \|_ _'in' \| 'out' \| 'both'_ **Default:** `'none'`

Edges hidden during dragging

- `'none'`: do not hide

- `'out'`: hide the edges with the node as the source node

- `'in'`: hide the edges with the node as the target node

- `'both'`: hide all edges related to the node

- `'all'`: hide all edges in the graph

Edges will not be hidden when using the drag shadow

### onFinish

> _(ids:_ _string\_\_[]) => void_

Callback when dragging is completed

### shadow

> _boolean_

Whether to enable the drag shadow, that is, use a shape to replace the node to follow the mouse movement

### state

> _string_ **Default:** `'selected'`

The state name of the selected node, when multi-selection is enabled, the selected nodes will be found based on this state

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

## API

### DragElement.destroy()

```typescript
destroy(): void;
```
