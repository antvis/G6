---
title: 坐标转换
order: 12
---

### Graph.getCanvasByClient(point)

给定的浏览器坐标，转换为画布上的绘制坐标

```typescript
getCanvasByClient(point: Point): Point;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

浏览器坐标

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 画布上的绘制坐标

</details>

### Graph.getCanvasByViewport(point)

给定的视窗 DOM 坐标，转换为画布上的绘制坐标

```typescript
getCanvasByViewport(point: Point): Point;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

视窗坐标

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 画布上的绘制坐标

</details>

### Graph.getClientByCanvas(point)

给定画布上的绘制坐标，转换为浏览器坐标

```typescript
getClientByCanvas(point: Point): Point;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

画布坐标

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 浏览器坐标

</details>

### Graph.getViewportByCanvas(point)

给定画布上的绘制坐标，转换为视窗 DOM 的坐标

```typescript
getViewportByCanvas(point: Point): Point;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

point

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

画布坐标

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 视窗 DOM 的坐标

</details>
