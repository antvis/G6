---
title: EdgeFilterLens
---

EdgeFilterLens can keep the focused edges within the lens range, while other edges will not be displayed within that range.

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### edgeStyle

> _EdgeStyle_ _\| ((datum:_ [EdgeData](/api/graph/option#edgedata)_) =>_ _EdgeStyle\_\_)_

The style of the edges displayed in the lens

### filter

> _(id:_ _string\_\_, elementType:_ _'node' \| 'edge' \| 'combo'\_\_) => boolean_

Filter elements that are never displayed in the lens

### maxR

> _number_ **Default:** `canvas 宽高最小值的一半`

The maximum radius of the lens. Only valid when `scaleRBy` is `wheel`

### minR

> _number_ **Default:** `0`

The minimum radius of the lens. Only valid when `scaleRBy` is `wheel`

### nodeStyle

> _NodeStyle_ _\| ((datum:_ [NodeData](/api/graph/option#nodedata)_) =>_ _NodeStyle\_\_)_

The style of the nodes displayed in the lens

### nodeType

> _'both' \| 'source' \| 'target' \| 'either'_ **Default:** `'both'`

The condition for displaying the edge

- `'both'`: The edge is displayed only when both the source node and the target node are in the lens

- `'source'`: The edge is displayed only when the source node is in the lens

- `'target'`: The edge is displayed only when the target node is in the lens

- `'either'`: The edge is displayed when either the source node or the target node is in the lens

### preventDefault

> _boolean_ **Default:** `true`

Whether to prevent the default event

### r

> _number_ **Default:** `60`

The radius of the lens

### scaleRBy

> _'wheel'_ **Default:** ``

The way to scale the radius of the lens

- `'wheel'`: scale the radius of the lens by the wheel

### style

> _BaseStyleProps_

The style of the lens

### trigger

> _'pointermove' \| 'click' \| 'drag'_ **Default:** `'pointermove'`

The way to move the lens

- `'pointermove'`: always follow the mouse movement

- `'click'`: move the lens when the mouse clicks

- `'drag'`: drag the lens

## API

### EdgeFilterLens.destroy()

```typescript
destroy(): void;
```

### EdgeFilterLens.update(options)

```typescript
update(options: Partial<EdgeFilterLensOptions>): void;
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

options

</td><td>

Partial&lt;[EdgeFilterLensOptions](#options)>

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
