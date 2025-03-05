---
title: AutoAdaptLabel
---

## Options

### <Badge type="success">Required</Badge> type

> _`auto-adapt-label`_

Behavior type

### enable

> _boolean \| ((event:_ _IGraphLifeCycleEvent \| IAnimateEvent \| IElementLifeCycleEvent \| IViewportEvent \| IPointerEvent \| IWheelEvent \| IKeyboardEvent \| IDragEvent) => boolean)_ **Default:** ``

Whether to enable

### padding

> _number \| number[]_ **Default:** `0`

Set the padding of the label to determine whether the label overlaps to avoid the label being displayed too densely

### sort

> _(elementA:_ _NodeData \| EdgeData \| ComboData, elementB:_ _NodeData \| EdgeData \| ComboData) => -1 \| 0 \| 1_

Sort elements by their importance in descending order; elements with higher importance have higher label display priority; usually combo > node > edge

### sortCombo

> _(comboA:_ [ComboData](/api/graph/option#combodata)_, comboB:_ [ComboData](/api/graph/option#combodata)_) => -1 \| 0 \| 1_

Sort combos by importance in descending order; combos with higher importance have higher label display priority. By default, they are sorted according to the data. It should be noted that if `sort` is set, `sortCombo` will not take effect

### sortEdge

> _(edgeA:_ [EdgeData](/api/graph/option#edgedata)_, edgeB:_ [EdgeData](/api/graph/option#edgedata)_) => -1 \| 0 \| 1_

Sort edges by importance in descending order; edges with higher importance have higher label display priority. By default, they are sorted according to the data. It should be noted that if `sort` is set, `sortEdge` will not take effect

### sortNode

Sort nodes by importance in descending order; nodes with higher importance have higher label display priority. Several centrality algorithms are built in, and custom sorting functions can also be defined. It should be noted that if `sort` is set, `sortNode` will not take effect

### throttle

> _number_ **Default:** `32`

Throttle time

## API

### AutoAdaptLabel.destroy()

```typescript
destroy(): void;
```

### AutoAdaptLabel.update(options)

```typescript
update(options: Partial<AutoAdaptLabelOptions>): void;
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

Partial&lt;[AutoAdaptLabelOptions](#options)>

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
