---
title: 画布操作
order: 1
---

## 画布操作概述

G6 提供了一系列画布操作 API，用于控制和获取画布的基本信息。通过这些 API，你可以：

- 获取画布实例
- 获取和设置画布尺寸
- 操作画布渲染器和图层

## API 参考

### Graph.getCanvas()

获取画布实例，返回的实例可用于进行底层的画布操作。

```typescript
getCanvas(): Canvas;
```

**返回值类型说明**

Canvas 实例包含以下主要功能：

- `getLayer(name?: string)`: 获取指定图层
- `getLayers()`: 获取所有图层
- `getCamera()`: 获取相机实例
- `getRoot()`: 获取根节点
- `setCursor(cursor: string)`: 设置鼠标样式

**示例**

```typescript
// 获取画布实例
const canvas = graph.getCanvas();

// 获取主图层
const mainLayer = canvas.getLayer('main');

// 设置鼠标样式
canvas.setCursor('pointer');

// 获取画布根节点
const root = canvas.getRoot();
```

### Graph.getSize()

获取当前画布容器的尺寸。返回一个包含宽度和高度的数组。

```typescript
getSize(): [number, number];
```

**示例**

```typescript
// 获取画布尺寸
const [width, height] = graph.getSize();
console.log('画布宽度:', width);
console.log('画布高度:', height);

// 使用尺寸信息进行计算
const centerX = width / 2;
const centerY = height / 2;
```

### Graph.setSize(width, height)

设置画布容器的尺寸。这个方法会同时更新画布和容器的大小。

```typescript
setSize(width: number, height: number): void;
```

**参数**

| 参数   | 描述             | 类型   | 默认值 | 必选 |
| ------ | ---------------- | ------ | ------ | ---- |
| width  | 画布宽度（像素） | number | -      | ✓    |
| height | 画布高度（像素） | number | -      | ✓    |

**示例**

```typescript
// 设置固定尺寸
graph.setSize(800, 600);
```
