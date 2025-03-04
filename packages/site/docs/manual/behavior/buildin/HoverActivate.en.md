---
title: HoverActivate
---

When the mouse hovers over an element, you can activate the state of the element, such as highlighting nodes or edges.

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

Whether to enable animation

### degree

> _number \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => number)_ **Default:** `0`

N-degree relationship of the hovered element

- default to `0`, which means only the current node is activated

- `1` means the current node and its directly adjacent nodes and edges are activated, etc

### direction

> _'in' \| 'out' \| 'both'_ **Default:** `'both'`

Specify the direction of the edge

- `'both'`: Activate all relationships of the current node

- `'in'`: Activate the incoming edges and nodes of the current node

- `'out'`: Activate the outgoing edges and nodes of the current node

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether to enable hover element function

### inactiveState

> _string_

Inactive element state, default to no change

### onHover

> _(event:_ [Event](/manual/graph-api/event#事件对象属性)_) => void_

Callback when the element is hovered

### onHoverEnd

> _(event:_ [Event](/manual/graph-api/event#事件对象属性)_) => void_

Callback when the hover ends

### state

> _string_ **Default:** `'active'`

Active element state, default to`active`

## API

### HoverActivate.destroy()

```typescript
destroy(): void;
```

### HoverActivate.getActiveIds(event)

```typescript
protected getActiveIds(event: IPointerEvent<Element>): string[];
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

event

</td><td>

[Event](/manual/graph-api/event#事件对象属性)&lt;Node \| Edge \| Combo>

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** string[]

</details>
