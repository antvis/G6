---
title: Fisheye 鱼眼放大镜
---

## 概述

鱼眼放大镜插件是为 focus+context 的探索场景设计的，它能够在放大关注区域的同时，保证上下文以及上下文与关注中心的关系不丢失，是一个重要的可视化探索工具。

## 使用场景

- 在演示过程中需要突出展示某些区域内容
- 需要局部放大查看细节时，同时又不想失去整体视图

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'drag', // 通过拖拽移动鱼眼
      d: 1.5, // 设置畸变因子
      r: 120, // 设置鱼眼半径
      showDPercent: true, // 显示畸变程度
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/fisheye.md"></embed>

## 配置项

| 属性           | 描述                               | 类型                                                                           | 默认值                 | 必选 |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------------ | ---------------------- | ---- |
| type           | 插件类型                           | string                                                                         | `fisheye`              | ✓    |
| trigger        | 移动鱼眼放大镜的方式               | `pointermove` \| `drag` \| `click`                                             | `pointermove`          |      |
| r              | 鱼眼放大镜半径                     | number                                                                         | 120                    |      |
| maxR           | 鱼眼放大镜可调整的最大半径         | number                                                                         | 画布宽高的最小值的一半 |      |
| minR           | 鱼眼放大镜可调整的最小半径         | number                                                                         | 0                      |      |
| d              | 畸变因子                           | number                                                                         | 1.5                    |      |
| maxD           | 鱼眼放大镜可调整的最大畸变因子     | number                                                                         | 5                      |      |
| minD           | 鱼眼放大镜可调整的最小畸变因子     | number                                                                         | 0                      |      |
| scaleRBy       | 调整鱼眼放大镜范围半径的方式       | `wheel` \| `drag`                                                              | -                      |      |
| scaleDBy       | 调整鱼眼放大镜畸变因子的方式       | `wheel` \| `drag`                                                              | -                      |      |
| showDPercent   | 是否在鱼眼放大镜中显示畸变因子数值 | boolean                                                                        | true                   |      |
| style          | 鱼眼放大镜样式                     | [CircleStyleProps](https://g.antv.antgroup.com/api/basic/circle)               | -                      |      |
| nodeStyle      | 在鱼眼放大镜中的节点样式           | NodeStyle \| ((datum: [NodeData](/manual/data#节点数据nodedata)) => NodeStyle) | `{ label: true }`      |      |
| preventDefault | 是否阻止默认事件                   | boolean                                                                        | true                   |      |

### trigger

`trigger` 属性用于控制鱼眼放大镜的移动方式，支持以下三种配置：

- `'pointermove'`：鱼眼放大镜始终跟随鼠标移动
- `'click'`：点击画布时移动鱼眼放大镜到点击位置
- `'drag'`：通过拖拽方式移动鱼眼放大镜

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'pointermove', // 跟随鼠标移动
      //   trigger: 'click', // 点击移动
      //   trigger: 'drag', // 拖拽移动
    },
  ],
});
```

### 缩放控制

通过 `scaleRBy` 和 `scaleDBy` 可以分别控制鱼眼放大镜的半径和畸变因子的调整方式：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      // 通过滚轮调整半径
      scaleRBy: 'wheel',
      // 通过拖拽调整畸变因子
      scaleDBy: 'drag',
      // 设置半径和畸变因子的范围
      minR: 50,
      maxR: 200,
      minD: 1,
      maxD: 3,
    },
  ],
});
```

注意：当 `trigger`、`scaleRBy` 和 `scaleDBy` 同时设置为 `'drag'` 时，优先级顺序为 `trigger` > `scaleRBy` > `scaleDBy`，只会为优先级最高的配置项绑定拖拽事件。同理，如果 `scaleRBy` 和 `scaleDBy` 同时设置为 `'wheel'`，只会为 `scaleRBy` 绑定滚轮事件。

## 代码示例

### 基础用法

最简单的配置方式：

```js
const graph = new Graph({
  plugins: ['fisheye'],
});
```

### 自定义样式

可以自定义鱼眼放大镜的外观和行为：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      r: 150,
      d: 2,
      style: {
        fill: '#2f54eb',
        fillOpacity: 0.2,
        stroke: '#1d39c4',
        strokeOpacity: 0.8,
        lineWidth: 1.5,
      },
      nodeStyle: {
        label: true,
        labelFontSize: 14,
      },
    },
  ],
});
```

## 实际案例

<Playground path="plugin/fisheye/demo/basic.js" rid="fisheye-basic"></Playground>

## API

### Fisheye.destroy()

```typescript
destroy(): void;
```

### Fisheye.update(options)

```typescript
update(options: Partial<FisheyeOptions>): void;
```

| 参数    | 类型                               | 描述   | 默认值 | 必选 |
| ------- | ---------------------------------- | ------ | ------ | ---- |
| options | Partial<[FisheyeOptions](#配置项)> | 配置项 | -      | ✓    |
