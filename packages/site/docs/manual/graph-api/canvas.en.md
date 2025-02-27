---
title: Canvas
order: 1
---

### Graph.clear()

Clear canvas elements

```typescript
clear(): Promise<void>;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.getCanvas()

Get canvas instance

```typescript
getCanvas(): Canvas;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [Canvas](../api/reference/g6.canvas.en.md)

- **Description:** 画布实例

</details>

### Graph.getSize()

Get the size of the current canvas container

```typescript
getSize(): [number, number];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [number, number]

- **Description:** 画布尺寸

</details>

### Graph.setSize(width, height)

Set the size of the current canvas container

```typescript
setSize(width: number, height: number): void;
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

width

</td><td>

number

</td><td>

画布宽度

</td></tr>
<tr><td>

height

</td><td>

number

</td><td>

画布高度

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
