---
title: OptimizeViewportTransform
---

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

### debounce

> _number_ **Default:** `200`

Set debounce time

### enable

> _boolean \| ((event: IViewportEvent) => boolean)_ **Default:** `true`

Whether to enable canvas optimization function

### shapes

> _{ node?: string[]; edge?: string[]; combo?: string[]; } \| ((type: 'node' \| 'edge' \| 'combo', shape: DisplayObject) => boolean)_

Specify the shapes that are always visible. After applying this interaction, only the shapes specified by this property will remain visible during the canvas operation, and the rest of the shapes will be hidden to improve rendering performance. By default, nodes are always visible, while other shapes are automatically hidden during canvas operations

## API

### OptimizeViewportTransform.destroy()

```typescript
destroy(): void;
```

### OptimizeViewportTransform.update(options)

```typescript
update(options: Partial<OptimizeViewportTransformOptions>): void;
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

OptimizeViewportTransformOptions

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
