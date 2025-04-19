---
title: Fullscreen 全屏展示
---

## 概述

全屏展示插件允许用户将图可视化内容扩展到整个屏幕，提供更广阔的视图和更好的沉浸式体验。

## 使用场景

全屏展示插件主要适用于以下场景：

- 提供更广阔的视图，便于查看复杂图数据
- 增强沉浸式体验，专注于图可视化内容
- 在演示或报告中展示图数据

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      key: 'my-fullscreen', // 指定唯一标识符，便于后续动态更新
      autoFit: true,
      trigger: {
        request: 'F', // 使用快捷键 F 进入全屏
        exit: 'Esc', // 使用快捷键 Esc 退出全屏
      },
      onEnter: () => {
        console.log('进入全屏模式');
      },
      onExit: () => {
        console.log('退出全屏模式');
      },
    },
  ],
});
```

## 配置项

| 属性    | 描述                                                 | 类型                                 | 默认值       | 必选 |
| ------- | ---------------------------------------------------- | ------------------------------------ | ------------ | ---- |
| type    | 插件类型                                             | string                               | `fullscreen` | ✓    |
| key     | 插件唯一标识符，用于后续更新                         | string                               | -            |      |
| autoFit | 是否自适应画布尺寸，全屏后画布尺寸会自动适应屏幕尺寸 | boolean                              | true         |      |
| trigger | 触发全屏的方式                                       | { request?: string; exit?: string; } | -            |      |
| onEnter | 进入全屏后的回调                                     | () => void                           | -            |      |
| onExit  | 退出全屏后的回调                                     | () => void                           | -            |      |

### trigger

trigger 属性用于控制触发全屏的方式。它支持两种配置方式：

#### 快捷键配置

使用键盘快捷键来触发全屏和退出全屏。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      trigger: {
        request: 'F', // 使用快捷键 F 进入全屏
        exit: 'Esc', // 使用快捷键 Esc 退出全屏
      },
    },
  ],
});
```

#### 自定义触发

通过API方式调用 request 和 exit 方法来控制全屏。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      key: 'my-fullscreen',
    },
  ],
});

// 进入全屏
graph.getPluginInstance('my-fullscreen').request();

// 退出全屏
graph.getPluginInstance('my-fullscreen').exit();
```

### autoFit

> _boolean_ **Default:** true

是否自适应画布尺寸，全屏后画布尺寸会自动适应屏幕尺寸。

- 设置为 true 时，画布会自动调整大小以适应整个屏幕。
- 设置为 false 时，画布大小保持不变。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      autoFit: true,
    },
  ],
});
```

### onEnter

> _() => void_

进入全屏后的回调函数。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      onEnter: () => {
        console.log('进入全屏模式');
      },
    },
  ],
});
```

### onExit

> _() => void_

退出全屏后的回调函数。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fullscreen',
      onExit: () => {
        console.log('退出全屏模式');
      },
    },
  ],
});
```

## 实际案例

<Playground path="plugin/fullscreen/demo/basic.js" rid="fullscreen-basic-rid"></Playground>
