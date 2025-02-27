---
title: View Port Operation
order: 4
---

### Graph.fitCenter(animation)

Move the graph to the center of the viewport

```typescript
fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void>;
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

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.fitView(options, animation)

Zoom the graph to fit the viewport and move it to the center of the viewport

```typescript
fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void>;
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

[FitViewOptions](../api/reference/g6.fitviewoptions.en.md)

</td><td>

适配配置

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.getCanvasCenter()

Get the viewport coordinates of the viewport center

```typescript
getCanvasCenter(): Point;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 视口中心的视口坐标

</details>

### Graph.getPosition()

Get the position of the graph

```typescript
getPosition(): Point;
```

That is, the position of the canvas origin in the viewport coordinate system. By default, the position of the graph is [0, 0]

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 图的位置

</details>

### Graph.getRotation()

Get the current rotation angle

```typescript
getRotation(): number;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** number

- **Description:** 旋转角度

</details>

### Graph.getViewportCenter()

Get the canvas coordinates of the viewport center

```typescript
getViewportCenter(): Point;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 视口中心的画布坐标

</details>

### Graph.getZoom()

Get the current zoom ratio

```typescript
getZoom(): number;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** number

- **Description:** 缩放比例

</details>

### Graph.getZoomRange()

Get the zoom range of the current graph

```typescript
getZoomRange(): GraphOptions['zoomRange'];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [GraphOptions](../api/reference/g6.graphoptions.en.md)['zoomRange']

- **Description:** 缩放区间

</details>

### Graph.resize()

Resize the canvas to the size of the graph container

```typescript
resize(): void;
```

### <Badge type="warning">Overload</Badge> Graph.resize(width, height)

Resize the canvas to the specified width and height

```typescript
resize(width: number, height: number): void;
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

宽度

</td></tr>
<tr><td>

height

</td><td>

number

</td><td>

高度

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.rotateBy(angle, animation, origin)

Rotate based on the current rotation angle (relative rotation)

```typescript
rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
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

angle

</td><td>

number

</td><td>

旋转角度

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
<tr><td>

origin

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

旋转中心(视口坐标)

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.rotateTo(angle, animation, origin)

Rotate the canvas to the specified angle (absolute rotation)

```typescript
rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
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

angle

</td><td>

number

</td><td>

目标角度

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
<tr><td>

origin

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

旋转中心(视口坐标)

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.setZoomRange(zoomRange)

Get the zoom range of the current graph

```typescript
setZoomRange(zoomRange: GraphOptions['zoomRange']): void;
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

zoomRange

</td><td>

[GraphOptions](../api/reference/g6.graphoptions.en.md)['zoomRange']

</td><td>

缩放区间

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.translateBy(offset, animation)

Translate the graph by the specified distance (relative translation)

```typescript
translateBy(offset: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
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

offset

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

偏移量

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.translateTo(position, animation)

Translate the graph to the specified position (absolute translation)

```typescript
translateTo(position: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
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

position

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

指定位置

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.zoomBy(ratio, animation, origin)

Zoom based on the current zoom ratio (relative zoom)

```typescript
zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

- ratio &gt; 1 zoom in - ratio &lt; 1 zoom out

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ratio

</td><td>

number

</td><td>

缩放比例

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
<tr><td>

origin

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

缩放中心(视口坐标)

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.zoomTo(zoom, animation, origin)

Zoom the canvas to the specified ratio (absolute zoom)

```typescript
zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

- zoom = 1 default size - zoom &gt; 1 zoom in - zoom &lt; 1 zoom out

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

zoom

</td><td>

number

</td><td>

指定缩放比例

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
<tr><td>

origin

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

缩放中心(视口坐标)

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>
