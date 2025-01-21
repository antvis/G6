---
title: 视口操作
order: 4
---

### Graph.fitCenter(animation)

将图平移至视口中心

```typescript
fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void>;
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

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.fitView(options, animation)

将图缩放至合适大小并平移至视口中心

```typescript
fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void>;
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

options

</td><td>

[FitViewOptions](../api/reference/g6.fitviewoptions.zh.md)

</td><td>

适配配置

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.getCanvasCenter()

获取视口中心的视口坐标

```typescript
getCanvasCenter(): Point;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 视口中心的视口坐标

</details>

### Graph.getPosition()

获取图的位置

```typescript
getPosition(): Point;
```

即画布原点在视口坐标系下的位置。默认状态下，图的位置为 [0, 0]

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 图的位置

</details>

### Graph.getRotation()

获取当前旋转角度

```typescript
getRotation(): number;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** number

- **描述：** 旋转角度

</details>

### Graph.getViewportCenter()

获取视口中心的画布坐标

```typescript
getViewportCenter(): Point;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 视口中心的画布坐标

</details>

### Graph.getZoom()

获取当前缩放比例

```typescript
getZoom(): number;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** number

- **描述：** 缩放比例

</details>

### Graph.getZoomRange()

获取当前图的缩放区间

```typescript
getZoomRange(): GraphOptions['zoomRange'];
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [GraphOptions](../api/reference/g6.graphoptions.zh.md)['zoomRange']

- **描述：** 缩放区间

</details>

### Graph.resize()

调整画布大小为图容器大小

```typescript
resize(): void;
```

### <Badge type="warning">Overload</Badge> Graph.resize(width, height)

调整画布大小为指定宽高

```typescript
resize(width: number, height: number): void;
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

**返回值**：

- **类型：** void

</details>

### Graph.rotateBy(angle, animation, origin)

基于当前旋转角度进行旋转（相对旋转）

```typescript
rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
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

angle

</td><td>

number

</td><td>

旋转角度

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.rotateTo(angle, animation, origin)

旋转画布至指定角度 (绝对旋转)

```typescript
rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
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

angle

</td><td>

number

</td><td>

目标角度

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.setZoomRange(zoomRange)

设置当前图的缩放区间

```typescript
setZoomRange(zoomRange: GraphOptions['zoomRange']): void;
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

zoomRange

</td><td>

[GraphOptions](../api/reference/g6.graphoptions.zh.md)['zoomRange']

</td><td>

缩放区间

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.translateBy(offset, animation)

将图平移指定距离 (相对平移)

```typescript
translateBy(offset: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
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

offset

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

偏移量

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.translateTo(position, animation)

将图平移至指定位置 (绝对平移)

```typescript
translateTo(position: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
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

position

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

指定位置

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.zoomBy(ratio, animation, origin)

基于当前缩放比例进行缩放（相对缩放）

```typescript
zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

- ratio &gt; 1 放大 - ratio &lt; 1 缩小

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.zoomTo(zoom, animation, origin)

缩放画布至指定比例（绝对缩放）

```typescript
zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

- zoom = 1 默认大小 - zoom &gt; 1 放大 - zoom &lt; 1 缩小

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>
