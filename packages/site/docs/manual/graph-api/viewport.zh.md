---
title: 视口操作
order: 4
---

## 视口操作概述

G6 提供了一系列视口操作 API，用于控制画布的缩放、平移和旋转。这些操作可以帮助用户更好地查看和交互图形内容。通过视口操作，你可以实现以下功能：

- 缩放画布以查看细节或全局视图
- 平移画布以查看不同区域
- 旋转画布以获得不同视角
- 自动适配内容到视口

### 视口操作分类

G6 的视口操作主要分为以下几类：

1. **缩放操作**：如 `zoomTo`、`zoomBy`
2. **平移操作**：如 `translateTo`、`translateBy`
3. **旋转操作**：如 `rotateTo`、`rotateBy`
4. **自适应操作**：如 `fitView`、`fitCenter`
5. **视口信息获取**：如 `getZoom`、`getPosition`

## API 参考

### Graph.zoomTo(zoom, animation, origin)

缩放画布至指定比例（绝对缩放）。

```typescript
zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**参数**

| 参数      | 描述                                          | 类型                                                            | 默认值 | 必选 |
| --------- | --------------------------------------------- | --------------------------------------------------------------- | ------ | ---- |
| zoom      | 目标缩放比例 (1 = 原始大小, >1 放大, <1 缩小) | number                                                          | -      | ✓    |
| animation | 动画配置                                      | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |
| origin    | 缩放中心点(视口坐标)                          | [Point](#point)                                                 | -      |      |

**示例**

```typescript
// 放大到2倍
graph.zoomTo(2);

// 带动画效果的缩小到0.5倍
graph.zoomTo(0.5, {
  duration: 500,
  easing: 'ease',
});

// 以视口中心点为原点放大
graph.zoomTo(1.5, false, graph.getCanvasCenter());
```

### Graph.zoomBy(ratio, animation, origin)

基于当前缩放比例进行缩放（相对缩放）。

```typescript
zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**参数**

| 参数      | 描述                        | 类型                                                            | 默认值 | 必选 |
| --------- | --------------------------- | --------------------------------------------------------------- | ------ | ---- |
| ratio     | 缩放比例 (>1 放大, <1 缩小) | number                                                          | -      | ✓    |
| animation | 动画配置                    | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |
| origin    | 缩放中心点(视口坐标)        | [Point](#point)                                                 | -      |      |

**示例**

```typescript
// 在当前比例基础上放大1.2倍
graph.zoomBy(1.2);

// 在当前比例基础上缩小到0.8倍，带动画
graph.zoomBy(0.8, {
  duration: 300,
});
```

### Graph.translateTo(position, animation)

将图平移至指定位置（绝对平移）。

```typescript
translateTo(position: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**参数**

| 参数      | 描述         | 类型                                                            | 默认值 | 必选 |
| --------- | ------------ | --------------------------------------------------------------- | ------ | ---- |
| position  | 目标位置坐标 | [Point](#point)                                                 | -      | ✓    |
| animation | 动画配置     | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |

**示例**

```typescript
// 平移到指定位置
graph.translateTo([100, 100]);

// 带动画效果的平移
graph.translateTo([200, 200], {
  duration: 1000,
  easing: 'ease-in-out',
});
```

### Graph.translateBy(offset, animation)

将图相对当前位置平移指定距离（相对平移）。

```typescript
translateBy(offset: Point, animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**参数**

| 参数      | 描述       | 类型                                                            | 默认值 | 必选 |
| --------- | ---------- | --------------------------------------------------------------- | ------ | ---- |
| offset    | 平移偏移量 | [Point](#point)                                                 | -      | ✓    |
| animation | 动画配置   | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |

**示例**

```typescript
// 向右平移100像素，向下平移50像素
graph.translateBy([100, 50]);

// 带动画效果的相对平移
graph.translateBy([-50, -50], {
  duration: 500,
});
```

### Graph.rotateTo(angle, animation, origin)

旋转画布至指定角度（绝对旋转）。

```typescript
rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**参数**

| 参数      | 描述                 | 类型                                                            | 默认值 | 必选 |
| --------- | -------------------- | --------------------------------------------------------------- | ------ | ---- |
| angle     | 目标旋转角度(弧度制) | number                                                          | -      | ✓    |
| animation | 动画配置             | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |
| origin    | 旋转中心点(视口坐标) | [Point](#point)                                                 | -      |      |

**示例**

```typescript
// 旋转到45度
graph.rotateTo(Math.PI / 4);

// 带动画效果的旋转到90度
graph.rotateTo(Math.PI / 2, {
  duration: 1000,
});
```

### Graph.rotateBy(angle, animation, origin)

基于当前角度进行旋转（相对旋转）。

```typescript
rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void>;
```

**参数**

| 参数      | 描述                 | 类型                                                            | 默认值 | 必选 |
| --------- | -------------------- | --------------------------------------------------------------- | ------ | ---- |
| angle     | 旋转角度增量(弧度制) | number                                                          | -      | ✓    |
| animation | 动画配置             | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |
| origin    | 旋转中心点(视口坐标) | [Point](#point)                                                 | -      |      |

**示例**

```typescript
// 相对当前角度顺时针旋转30度
graph.rotateBy(Math.PI / 6);

// 带动画效果的相对旋转
graph.rotateBy(-Math.PI / 4, {
  duration: 500,
  easing: 'ease-out',
});
```

### Graph.fitView(options, animation)

将图缩放至合适大小并平移至视口中心。

```typescript
fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**参数**

| 参数      | 描述     | 类型                                                            | 默认值 | 必选 |
| --------- | -------- | --------------------------------------------------------------- | ------ | ---- |
| options   | 适配选项 | FitViewOptions                                                  | -      |      |
| animation | 动画配置 | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |

**FitViewOptions 类型说明**

| 属性      | 类型                   | 默认值     | 描述                         |
| --------- | ---------------------- | ---------- | ---------------------------- |
| when      | 'overflow' \| 'always' | 'overflow' | 适配时机：仅溢出时或始终适配 |
| direction | 'x' \| 'y' \| 'both'   | 'both'     | 适配方向：x轴、y轴或两个方向 |

**示例**

```typescript
// 基本使用
graph.fitView();

// 配置适配选项
graph.fitView(
  {
    when: 'always', // 始终进行适配
    direction: 'both', // 在两个方向上适配
  },
  {
    duration: 1000, // 带动画效果
  },
);

// 仅在内容溢出时适配x方向
graph.fitView({
  when: 'overflow',
  direction: 'x',
});
```

### Graph.fitCenter(animation)

将图平移至视口中心。

```typescript
fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**参数**

| 参数      | 描述     | 类型                                                            | 默认值 | 必选 |
| --------- | -------- | --------------------------------------------------------------- | ------ | ---- |
| animation | 动画配置 | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |

**示例**

```typescript
// 居中显示
graph.fitCenter();

// 带动画效果的居中
graph.fitCenter({
  duration: 500,
  easing: 'ease-in',
});
```

### Graph.getZoom()

获取当前缩放比例。

```typescript
getZoom(): number;
```

**示例**

```typescript
const currentZoom = graph.getZoom();
console.log('当前缩放比例:', currentZoom);
```

### Graph.getPosition()

获取图的位置（画布原点在视口坐标系下的位置）。

```typescript
getPosition(): Point;
```

**示例**

```typescript
const position = graph.getPosition();
console.log('当前位置:', position);
```

### Graph.getRotation()

获取当前旋转角度。

```typescript
getRotation(): number;
```

**示例**

```typescript
const rotation = graph.getRotation();
console.log('当前旋转角度(弧度):', rotation);
console.log('当前旋转角度(度):', (rotation * 180) / Math.PI);
```

### Graph.getCanvasCenter()

获取视口中心的视口坐标。

```typescript
getCanvasCenter(): Point;
```

**示例**

```typescript
const center = graph.getCanvasCenter();
console.log('视口中心坐标:', center);
```

### Graph.getViewportCenter()

获取视口中心的画布坐标。

```typescript
getViewportCenter(): Point;
```

**示例**

```typescript
const viewportCenter = graph.getViewportCenter();
console.log('视口中心的画布坐标:', viewportCenter);
```

### Graph.setZoomRange(zoomRange)

设置当前图的缩放区间。

```typescript
setZoomRange(zoomRange: [number, number]): void;
```

**参数**

| 参数      | 描述     | 类型                          | 默认值 | 必选 |
| --------- | -------- | ----------------------------- | ------ | ---- |
| zoomRange | 缩放区间 | [number, number] \| undefined | -      | ✓    |

**示例**

```typescript
// 限制缩放范围在0.5到2倍之间
graph.setZoomRange([0.5, 2]);

// 移除缩放限制
graph.setZoomRange(undefined);
```

### Graph.getZoomRange()

获取当前图的缩放区间。

```typescript
getZoomRange(): GraphOptions['zoomRange'];
```

**示例**

```typescript
const range = graph.getZoomRange();
console.log('当前缩放区间:', range);
```

### Graph.resize()

调整画布大小为图容器大小。

```typescript
resize(): void;
```

### Graph.resize(width, height)

调整画布大小为指定宽高。

```typescript
resize(width: number, height: number): void;
```

**参数**

| 参数   | 描述     | 类型   | 默认值 | 必选 |
| ------ | -------- | ------ | ------ | ---- |
| width  | 目标宽度 | number | -      | ✓    |
| height | 目标高度 | number | -      | ✓    |

**示例**

```typescript
// 设置画布大小为800x600
graph.resize(800, 600);
```

## 类型定义

### ViewportAnimationEffectTiming

视口动画配置类型。

```typescript
type ViewportAnimationEffectTiming =
  | boolean // 是否启用动画
  | {
      easing?: string; // 缓动函数
      duration?: number; // 动画持续时间(ms)
    };
```

### Point

坐标点类型。

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

### FitViewOptions

视图适配选项。

```typescript
interface FitViewOptions {
  when?: 'overflow' | 'always'; // 适配时机
  direction?: 'x' | 'y' | 'both'; // 适配方向
}
```
