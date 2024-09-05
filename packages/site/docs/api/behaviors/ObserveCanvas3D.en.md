---
title: ObserveCanvas3D
---

## Options

### enable

> _boolean_

### mode

> _'orbiting' \| 'exploring' \| 'tracking'_

Camera mode

- `orbiting` Fixed viewpoint(`focalPoint`<!-- -->), change camera position. Cannot cross the north and south poles

- `exploring` Fixed viewpoint(`focalPoint`<!-- -->), change camera position. Can cross the north and south poles

- `tracking` First-person mode, fixed camera position, change viewpoint(`focalPoint`<!-- -->) position

### sensitivity

> _number_

Sensitivity

### trigger

> _ShortcutKey_

Press this shortcut key to observe the scene with the pointer

## API

### ObserveCanvas3D.destroy()

```typescript
destroy(): void;
```

### ObserveCanvas3D.update(options)

```typescript
update(options: Partial<ObserveCanvas3DOptions>): void;
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

Partial&lt;[ObserveCanvas3DOptions](../reference/g6-extension-3d.observecanvas3doptions.en.md)<!-- -->&gt;

</td><td>

</td></tr>
</tbody></table>

**Returns**<!-- -->:

- **Type:** void

</details>
