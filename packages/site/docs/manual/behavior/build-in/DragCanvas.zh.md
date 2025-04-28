---
title: DragCanvas 拖拽画布
---

## 概述

DragCanvas 是 G6 中用于实现画布拖拽功能的内置交互，支持通过鼠标或触摸屏幕拖动来平移整个画布。这是图可视化中最基础且常用的导航交互，让用户能够自由探索超出当前视口的图内容。

## 使用场景

这一交互主要用于：

- 导航和浏览大型图表，查看当前视口外的内容
- 调整视图焦点，将感兴趣的区域移动到视口中心
- 与缩放交互结合，实现完整的画布导航体验

## 在线体验

<embed src="@/common/api/behaviors/drag-canvas.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-canvas'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'drag-canvas',
      key: 'drag-canvas-1',
      direction: 'x', // 只允许水平方向拖拽
      key: 'drag-behavior', // 为交互指定标识符，方便动态更新
    },
  ],
});
```

## 配置项

| 配置项      | 说明                                                 | 类型                                                                                                                                                 | 默认值                                                                                      | 必选 |
| ----------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---- |
| type        | 交互类型名称                                         | string                                                                                                                                               | `drag-canvas`                                                                               | ✓    |
| enable      | 是否启用该交互                                       | boolean \| ((event: [Event](/api/event#事件对象属性) \| [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)) => boolean) | `(event) => 'eventType' in event ? event.targetType === 'canvas': true`(仅在点击画布时启用) |      |
| animation   | 拖拽动画配置，仅在使用按键移动时有效                 | [ViewportAnimationEffectTiming](/api/graph#viewportanimationeffecttiming)                                                                            | -                                                                                           |      |
| direction   | 允许的拖拽方向，[配置项](#direction)                 | `'x'` \| `'y'` \| `'both'`                                                                                                                           | `'both'` (不限制方向)                                                                       |      |
| range       | 可拖拽的视口范围(以视口大小为单位)，[配置项](#range) | number \| number[]                                                                                                                                   | Infinity                                                                                    |      |
| sensitivity | 触发一次按键移动的距离                               | number                                                                                                                                               | 10                                                                                          |      |
| trigger     | 触发拖拽的键盘按键，[配置项](#trigger)               | object                                                                                                                                               | -                                                                                           |      |
| onFinish    | 拖拽完成时的回调函数                                 | () => void                                                                                                                                           | -                                                                                           |      |

### Direction

`direction` 用于限制拖拽的方向：

- 设为 `'both'`（默认）：允许在任意方向拖拽
- 设为 `'x'`：只允许水平方向拖拽
- 设为 `'y'`：只允许垂直方向拖拽

这在特定的可视化场景下很有用，例如在时间轴图表中可能只希望用户水平拖动。

### Range

`range` 用于控制画布可拖拽的范围：

- 设置为单个数字：四个方向使用相同的值
- 设置为数组：分别指定 [上, 右, 下, 左] 四个方向的范围

例如：

```javascript
range: 2; // 在任何方向上都可以拖拽2个视口的距离
range: [1, 2, 1, 2]; // 上下方向可拖拽1个视口，左右方向可拖拽2个视口
```

每个方向的取值范围是 [0, Infinity]，0表示不能拖拽，Infinity表示无限拖拽。

### Trigger

`trigger` 允许你配置键盘按键来控制画布移动：

```javascript
{
  trigger: {
    up: ['ArrowUp'],     // 向上移动的快捷键
    down: ['ArrowDown'], // 向下移动的快捷键
    left: ['ArrowLeft'], // 向左移动的快捷键
    right: ['ArrowRight'] // 向右移动的快捷键
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

### 基础拖拽功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['drag-canvas'],
});
```

### 只允许水平拖拽

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'drag-canvas',
      direction: 'x', // 只允许水平拖拽
    },
  ],
});
```

### 限制拖拽范围

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'drag-canvas',
      range: 1.5, // 限制拖拽范围为1.5个视口大小
    },
  ],
});
```

### 使用键盘方向键控制移动

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'drag-canvas',
      trigger: {
        up: ['ArrowUp'],
        down: ['ArrowDown'],
        left: ['ArrowLeft'],
        right: ['ArrowRight'],
      },
      animation: {
        duration: 100, // 添加平滑动画效果
      },
    },
  ],
});
```

## 常见问题

### 1. DragCanvas与其他交互的区别

- `DragCanvas` 用于拖拽整个画布视图
- `DragElement` 用于拖拽单个图元素（节点/边/组合）
- `ScrollCanvas` 用于滚轮滚动画布，不改变缩放比例

## 实际案例

<Playground path="behavior/canvas/demo/drag.js" rid="default-drag-canvas"></Playground>
