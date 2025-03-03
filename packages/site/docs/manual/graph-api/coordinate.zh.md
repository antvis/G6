---
title: 坐标转换
order: 12
---

## 坐标系概述

在图可视化中，理解不同的坐标系及其转换关系至关重要。G6 中涉及多种坐标系，它们各自用于不同的场景：

- **Client 坐标系**：浏览器视口左上角为原点，单位为像素。通常用于处理浏览器事件。
- **Screen 坐标系**：屏幕左上角为原点，会受页面滚动影响。
- **Page 坐标系**：文档左上角为原点，考虑文档滚动。
- **Canvas 坐标系**：也称为世界坐标系，图形绘制和布局时使用的坐标系，画布元素左上角为原点。
- **Viewport 坐标系**：视口坐标系，当前可见的画布区域，视口左上角为原点。视口通过平移、缩放等操作，可以观察不同的 Canvas 区域。

在这个[示例](https://g.antv.antgroup.com/zh/examples/canvas/canvas-basic#coordinates)中，移动鼠标可以看到鼠标所在位置在各个坐标系下的值：

![坐标系关系图](https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*kPfcTKwZG90AAAAAAAAAAAAAARQnAQ)

当画布没有发生平移和缩放时，Viewport 坐标系与 Canvas 坐标系重合。随着用户的交互（如拖拽画布、缩放），两个坐标系会出现偏移。

G6 提供了一系列 API 用于在不同坐标系之间进行转换，下面将详细介绍这些 API。

## API 参考

### Graph.getCanvasByClient(point)

将浏览器坐标（客户端坐标）转换为画布坐标。

```typescript
getCanvasByClient(point: Point): Point;
```

**参数**

| 参数  | 描述         | 类型                                         | 默认值 | 必选 |
| ----- | ------------ | -------------------------------------------- | ------ | ---- |
| point | 浏览器坐标点 | [number, number] \| [number, number, number] | -      | ✓    |

**返回值**

- **类型**: [number, number] \| [number, number, number]
- **描述**: 画布坐标系下的坐标点

### Graph.getCanvasByViewport(point)

将视口坐标转换为画布坐标。

```typescript
getCanvasByViewport(point: Point): Point;
```

**参数**

| 参数  | 描述       | 类型                                         | 默认值 | 必选 |
| ----- | ---------- | -------------------------------------------- | ------ | ---- |
| point | 视口坐标点 | [number, number] \| [number, number, number] | -      | ✓    |

**返回值**

- **类型**: [number, number] \| [number, number, number]
- **描述**: 画布坐标系下的坐标点

### Graph.getClientByCanvas(point)

将画布坐标转换为浏览器客户端坐标。

```typescript
getClientByCanvas(point: Point): Point;
```

**参数**

| 参数  | 描述       | 类型                                         | 默认值 | 必选 |
| ----- | ---------- | -------------------------------------------- | ------ | ---- |
| point | 画布坐标点 | [number, number] \| [number, number, number] | -      | ✓    |

**返回值**

- **类型**: [number, number] \| [number, number, number]
- **描述**: 浏览器客户端坐标系下的坐标点

### Graph.getViewportByCanvas(point)

将画布坐标转换为视口坐标。

```typescript
getViewportByCanvas(point: Point): Point;
```

**参数**

| 参数  | 描述       | 类型                                         | 默认值 | 必选 |
| ----- | ---------- | -------------------------------------------- | ------ | ---- |
| point | 画布坐标点 | [number, number] \| [number, number, number] | -      | ✓    |

**返回值**

- **类型**: [number, number] \| [number, number, number]
- **描述**: 视口坐标系下的坐标点
