---
title: DragElementForce
---

This behavior can only be used with d3-force layout. The layout will be recalculated in real time during dragging.

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

### fixed

> _boolean_

Whether the node remains in a fixed position after dragging ends

- `true`: After dragging ends, the node's position will remain fixed and will not be affected by the layout algorithm

- `false`: After dragging ends, the node's position will continue to be affected by the layout algorithm

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
