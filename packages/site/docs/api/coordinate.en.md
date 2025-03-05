---
title: Coordinate Transformation
order: 12
---

### Graph.getCanvasByClient(point)

Convert the given browser coordinates to drawing coordinates on the canvas

```typescript
getCanvasByClient(point: Point): Point;
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

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

浏览器坐标

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 画布上的绘制坐标

</details>

### Graph.getCanvasByViewport(point)

Convert the given viewport DOM coordinates to the drawing coordinates on the canvas

```typescript
getCanvasByViewport(point: Point): Point;
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

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

视窗坐标

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 画布上的绘制坐标

</details>

### Graph.getClientByCanvas(point)

Convert the given drawing coordinates on the canvas to browser coordinates

```typescript
getClientByCanvas(point: Point): Point;
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

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

画布坐标

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 浏览器坐标

</details>

### Graph.getViewportByCanvas(point)

Convert the given drawing coordinates on the canvas to the coordinates of the viewport DOM

```typescript
getViewportByCanvas(point: Point): Point;
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

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

画布坐标

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 视窗 DOM 的坐标

</details>
