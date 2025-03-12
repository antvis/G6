---
title: Background 背景
---

## 概述

支持为图画布设置一个背景图片，让画布更有层次感、叙事性。

## 使用场景

这一插件主要用于：

- 为图表设置统一的品牌背景色或图片
- 通过背景区分不同的功能区域
- 增强图表的视觉层次感和美观度

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'background',
      key: 'my-background', // 为插件指定标识符，方便动态更新
      backgroundColor: '#f0f2f5', // 设置背景色
      backgroundImage: 'url(https://example.com/bg.png)', // 设置背景图
    },
  ],
});
```

## 配置项

Background 插件的配置项继承了所有 CSS 样式属性（[CSSStyleDeclaration](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration)），因此你可以使用任何合法的 CSS 属性来配置背景。以下是一些常用配置：

| 属性               | 描述                         | 类型     | 默认值            | 必选 |
| ------------------ | ---------------------------- | -------- | ----------------- | ---- |
| type               | 插件类型                     | `string` | `background`      | ✓    |
| key                | 插件唯一标识符，用于后续更新 | string   | -                 |      |
| width              | 背景宽度                     | string   | `100%`            |      |
| height             | 背景高度                     | string   | `100%`            |      |
| backgroundColor    | 背景颜色                     | string   | -                 |      |
| backgroundImage    | 背景图片                     | string   | -                 |      |
| backgroundSize     | 背景尺寸                     | string   | `cover`           |      |
| backgroundPosition | 背景位置                     | string   | -                 |      |
| backgroundRepeat   | 背景重复方式                 | string   | -                 |      |
| opacity            | 背景透明度                   | string   | -                 |      |
| transition         | 过渡动画                     | string   | `background 0.5s` |      |
| zIndex             | 层叠顺序                     | string   | -1                |      |

> 注意：`zIndex` 默认为 -1，这是为了避免背景覆盖其他插件的 DOM 元素，如网格线。

## 代码示例

### 基础背景色

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'background',
      backgroundColor: '#f0f2f5',
    },
  ],
});
```

### 使用背景图片

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'background',
      backgroundImage: 'url(https://example.com/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  ],
});
```

### 渐变背景

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'background',
      background: 'linear-gradient(45deg, #1890ff, #722ed1)',
      opacity: '0.8',
    },
  ],
});
```

### 动态更新背景

```js
// 初始化时配置
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'background',
      key: 'my-background',
      backgroundColor: '#f0f2f5',
    },
  ],
});

// 后续更新
graph.updatePlugin({
  key: 'my-background',
  backgroundColor: '#e6f7ff',
  transition: 'background 1s ease',
});
```

## 常见问题

### 1. 背景与其他插件冲突？

默认情况下，背景插件的 `zIndex` 设为 `-1`，以确保它位于其他元素之下。如果仍有冲突，可以调整 `zIndex` 值：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'background',
      zIndex: '-2', // 降低 z-index 避免冲突
    },
  ],
});
```

## 实际案例

<Playground path="plugin/background/demo/background.js" rid="background-basic"></Playground>
