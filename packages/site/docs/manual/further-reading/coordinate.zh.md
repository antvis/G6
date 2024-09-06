---
title: 坐标系
order: 2
---

## 概述

在 G6 5.0 中主要会涉及三个坐标系：画布坐标系(Canvas)、视口坐标系(Viewport)和浏览器坐标系(Client)。

### 画布坐标系

G6 元素绘制时所使用的坐标系，其不受相机缩放、平移的影响，要改变一个元素的位置，需要直接修改元素的位置属性(x/y/z)。

画布空间理论上是无限大的，在初始状态下（无平移、缩放倍率为1），画布坐标系的原点位于视口左上角位置。

### 视口坐标系

视口坐标系是相机坐标系的投影，当相机发生平移、缩放时，画布中元素位置在视口坐标系中的位置也会发生变化。

视口的大小即画布 DOM 容器的大小，视口坐标系的原点位于视口左上角位置，x 轴正方向向右，y 轴正方向向下。

![viewport](https://developer.mozilla.org/en-US/Web/API/Canvas_API/Tutorial/Drawing_shapes/canvas_default_grid.png)

### 浏览器坐标系

浏览器坐标系以浏览器左上角为原点，x 轴正方向向右，y 轴正方向向下。

下图描述了视口坐标系和浏览器坐标系之间的关系：

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*HOcfToHFDIYAAAAAAAAAAAAADmJ7AQ/original" />

## 坐标系转换

G6 提供了坐标系转换的方法，可以方便地在不同坐标系之间进行转换。

- 画布坐标系转视口坐标系：[getViewportByCanvas](/api/graph/method#graphgetviewportbycanvaspoint)
- 浏览器坐标系转画布坐标系：[getCanvasByClient](/api/graph/method#graphgetcanvasbyclientpoint)
- 视口坐标系转画布坐标系：[getCanvasByViewport](/api/graph/method#graphgetcanvasbyviewportpoint)
- 画布坐标系转浏览器坐标系：[getClientByCanvas](/api/graph/method#graphgetclientbycanvaspoint)

另外还提供了其他相关 API：

- 获取视口中心的视口坐标：[getCanvasCenter](/api/graph/method#graphgetcanvascenter)
- 获取视口中心的画布坐标：[getViewportCenter](/api/graph/method#graphgetviewportcenter)
- 获取图原点在视口坐标系中的位置：[getPosition](/api/graph/method#graphgetposition)
