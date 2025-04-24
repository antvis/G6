---
title: ZoomCanvas 缩放画布
---

## 概述

ZoomCanvas 是 G6 中用于实现画布缩放功能的内置交互，支持通过鼠标滚轮或键盘快捷键调整画布缩放比例。这是图可视化中最常用的交互之一，能帮助用户查看图的整体结构和局部细节。

## 使用场景

这一交互主要用于：

- 浏览大规模图数据，在整体与细节之间自由切换
- 聚焦到特定区域进行详细分析

## 在线体验

<embed src="@/common/api/behaviors/zoom-canvas.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['zoom-canvas'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'zoom-canvas',
      key: 'zoom-canvas-1', // 为交互指定标识符，方便动态更新
      sensitivity: 1.5, // 设置灵敏度
    },
  ],
});
```

## 配置项

| 配置项         | 说明                                                     | 类型                                                                                | 默认值              | 必选 |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------- | ---- |
| type           | 交互类型名称                                             | string                                                                              | `zoom-canvas`       | ✓    |
| animation      | 缩放动画效果设置                                         | [ViewportAnimationEffectTiming](/manual/graph/option#viewportanimationeffecttiming) | `{ duration: 200 }` |      |
| enable         | 是否启用该交互                                           | boolean \| ((event: Event) => boolean)                                              | true                |      |
| origin         | 缩放中心点(视口坐标)                                        | [Point](/api/viewport#point) | -                   |      |
| onFinish       | 缩放完成时的回调函数                                     | () => void                                                                          | -                   |      |
| preventDefault | 是否阻止浏览器默认事件                                   | boolean                                                                             | true                |      |
| sensitivity    | 缩放灵敏度，值越大缩放速度越快                           | number                                                                              | 1                   |      |
| trigger        | 触发缩放的方式，支持滚轮和键盘快捷键，[配置项](#trigger) | object                                                                              | -                   |      |

### Trigger

`trigger`有两种使用方式，分别适用于不同场景：

#### 方式一：与滚轮结合的修饰键

当你希望只有在按下某些键的同时滚动滚轮才触发缩放时，可以这样配置：

```javascript
{
  trigger: ['Control']; // 按住 Control 键同时滚动鼠标滚轮才能缩放
}
```

常见的修饰键有：

- `Control`
- `Shift`
- `Alt`

> 不知道键盘按键对应什么值？请参考 [MDN Key Values](https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values)。

#### 方式二：纯键盘快捷键

当你希望完全使用键盘控制缩放操作时，可以设置组合键：

```javascript
{
  trigger: {
    zoomIn: ['Control', '+'],  // 放大快捷键
    zoomOut: ['Control', '-'], // 缩小快捷键
    reset: ['Control', '0']    // 重置缩放比例快捷键
  }
}
```

## 代码示例

### 基础缩放功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['zoom-canvas'],
});
```

### 自定义缩放中心

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'zoom-canvas',
      origin: graph.getCanvasCenter(), // 以视口中心为原点进行缩放
    },
  ],
});
```

### 自定义缩放灵敏度

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'zoom-canvas',
      sensitivity: 0.8, // 降低灵敏度，缩放变化更平缓
    },
  ],
});
```

### 使用Shift+滚轮进行缩放

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'zoom-canvas',
      trigger: ['Shift'], // 按住 Shift 键同时滚动才能缩放
    },
  ],
});
```

### 使用键盘快捷键控制缩放

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'zoom-canvas',
      trigger: {
        zoomIn: ['Control', '='], // Ctrl + = 放大
        zoomOut: ['Control', '-'], // Ctrl + - 缩小
        reset: ['Control', '0'], // Ctrl + 0 重置
      },
    },
  ],
});
```

## 常见问题

### 1. 画布缩放超出了预期范围怎么办？

为避免缩放过大或过小，可以设置缩放限制：

```javascript
const graph = new Graph({
  // 其他配置...
  zoomRange: [0.5, 3], // 允许缩小到50%和放大到300%
  behaviors: ['zoom-canvas'],
});
```

### 2. 如何与其他交互结合使用？

缩放与拖拽是常见的组合，实现完整的导航体验：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-canvas', 'zoom-canvas'],
});
```

## 实际案例

<Playground path="behavior/canvas/demo/zoom.js" rid="default-zoom-canvas"></Playground>
