---
title: ScrollCanvas 滚动画布
---

## 概述

ScrollCanvas 是 G6 中用于实现画布滚动功能的内置交互，支持通过鼠标滚轮或键盘方向键平移画布。这种交互方式对于浏览较大的图表特别有用，能让用户在不改变缩放比例的情况下探索图表的不同区域。

## 使用场景

这一交互主要用于：

- 浏览超出可视区域的大型图表内容
- 在保持当前缩放比例的情况下探索图的不同部分
- 精确调整查看位置，尤其是在一维方向上需要精确滚动时

## 在线体验

<embed src="@/common/api/behaviors/scroll-canvas.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['scroll-canvas'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'scroll-canvas',
      key: 'scroll-canvas-1', // 为交互指定标识符，方便动态更新
      sensitivity: 1.5, // 设置灵敏度
      direction: 'y', // 只允许垂直方向滚动
    },
  ],
});
```

## 配置项

| 配置项         | 说明                                                 | 类型                                                                                                                                                                                          | 默认值                   | 必选 |
| -------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---- |
| type           | 交互类型名称                                         | string                                                                                                                                                                                        | `scroll-canvas`          | ✓    |
| enable         | 是否启用该交互                                       | boolean \| ((event: [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent) \| [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)) => boolean) | true                     |      |
| direction      | 允许的滚动方向，[配置项](#direction)                 | `'x'` \| `'y'` \| `undefined`                                                                                                                                                                 | `undefined` (不限制方向) |      |
| range          | 可滚动的视口范围(以视口大小为单位)，[配置项](#range) | number \| number[]                                                                                                                                                                            | 1                        |      |
| sensitivity    | 滚动灵敏度，值越大滚动速度越快                       | number                                                                                                                                                                                        | 1                        |      |
| trigger        | 触发滚动的键盘快捷键，[配置项](#trigger)             | object                                                                                                                                                                                        | -                        |      |
| onFinish       | 滚动完成时的回调函数                                 | () => void                                                                                                                                                                                    | -                        |      |
| preventDefault | 是否阻止浏览器默认事件                               | boolean                                                                                                                                                                                       | true                     |      |

### Direction

`direction` 用于限制滚动的方向：

- 不设置或设为 `undefined`：允许在任意方向滚动
- 设为 `'x'`：只允许水平方向滚动
- 设为 `'y'`：只允许垂直方向滚动

这在特定的可视化场景下很有用，例如在时间轴图表中可能只需要水平滚动。

### Range

`range` 用于控制画布可滚动的范围：

- 设置为单个数字：四个方向使用相同的值
- 设置为数组：分别指定 [上, 右, 下, 左] 四个方向的范围

例如：

```javascript
range: 2; // 在任何方向上都可以滚动2个视口的距离
range: [1, 2, 1, 2]; // 上下方向可滚动1个视口，左右方向可滚动2个视口
```

每个方向的取值范围是 [0, Infinity]，0表示不能滚动，Infinity表示无限滚动。

### Trigger

`trigger` 允许你配置键盘方向键来控制画布滚动：

```javascript
{
  trigger: {
    up: ['ArrowUp'],     // 向上滚动的快捷键
    down: ['ArrowDown'], // 向下滚动的快捷键
    left: ['ArrowLeft'], // 向左滚动的快捷键
    right: ['ArrowRight'] // 向右滚动的快捷键
  }
}
```

你也可以配置组合键：

```javascript
{
  trigger: {
    up: ['Control', 'ArrowUp'],     // Ctrl + 上箭头
    down: ['Control', 'ArrowDown'], // Ctrl + 下箭头
    left: ['Control', 'ArrowLeft'], // Ctrl + 左箭头
    right: ['Control', 'ArrowRight'] // Ctrl + 右箭头
  }
}
```

## 代码示例

### 基础滚动功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['scroll-canvas'],
});
```

### 只允许水平滚动

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'scroll-canvas',
      direction: 'x', // 只允许水平滚动
    },
  ],
});
```

### 自定义滚动灵敏度和范围

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'scroll-canvas',
      sensitivity: 1.8, // 提高滚动灵敏度
      range: [0.5, 2, 0.5, 2], // 上下方向限制较小，左右方向限制较大
    },
  ],
});
```

### 使用键盘方向键控制滚动

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'scroll-canvas',
      trigger: {
        up: ['ArrowUp'],
        down: ['ArrowDown'],
        left: ['ArrowLeft'],
        right: ['ArrowRight'],
      },
    },
  ],
});
```

## 常见问题

### 1. ScrollCanvas 和 ZoomCanvas 有什么区别？

- `ScrollCanvas` 用于平移画布，不改变缩放比例
- `ZoomCanvas` 用于缩放画布，改变视图的缩放比例

两者常结合使用，提供完整的画布导航功能：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-canvas', 'zoom-canvas', 'scroll-canvas'],
});
```

### 实际案例

<Playground path="behavior/canvas/demo/scroll-xy.js" rid="default-scroll-canvas"></Playground>
