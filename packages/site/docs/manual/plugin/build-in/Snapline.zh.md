---
title: Snapline 对齐线
---

## 概述

对齐线插件为画布提供智能对齐参考线，在移动节点时自动显示辅助线并支持自动吸附，帮助用户实现精确对齐，是图形编辑中提升效率和精确度的重要工具。

## 使用场景

对齐线插件主要适用于以下场景：

- 手动调整节点位置时,需要与其他节点精确对齐
- 拖拽移动多个节点时,保持它们之间的对齐关系
- 制作规范的图形布局时,确保节点间距和位置的一致性
- 通过自动吸附功能提高节点排版效率

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'snapline',
      key: 'my-snapline', // 指定唯一标识符
      tolerance: 5, // 对齐吸附阈值
      offset: 20, // 对齐线延伸距离
      autoSnap: true, // 启用自动吸附
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/snapline.md"></embed>

## 配置项

| 属性                | 描述                                                                                                                    | 类型                                                                                                                            | 默认值                  | 必选 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---- |
| type                | 插件类型                                                                                                                | string                                                                                                                          | `'snapline'`            | ✓    |
| key                 | 插件唯一标识符                                                                                                          | string                                                                                                                          | -                       |      |
| tolerance           | 对齐精度，即触发对齐的距离阈值                                                                                          | number                                                                                                                          | 5                       |      |
| offset              | 对齐线头尾的延伸距离                                                                                                    | number                                                                                                                          | 20                      |      |
| autoSnap            | 是否启用自动吸附                                                                                                        | boolean                                                                                                                         | true                    |      |
| shape               | 指定元素的参照图形：<br/>- `'key'`: 使用元素的主图形作为参照图形<br/>- `Function`: 传入函数时接收元素对象，返回一个图形 | string \| ((node: Node) => DisplayObject)                                                                                       | `'key'`                 |      |
| verticalLineStyle   | 垂直对齐线样式                                                                                                          | 支持[BaseStyleProps](/manual/element/shape/properties#baseshapestyle) 下的部分配置，详见[「对齐线样式配置项」](#对齐线样式配置) | `{ stroke: '#1783FF' }` |      |
| horizontalLineStyle | 水平对齐线样式                                                                                                          | 支持[BaseStyleProps](/manual/element/shape/properties#baseshapestyle) 下的部分配置，详见[「对齐线样式配置项」](#对齐线样式配置) | `{ stroke: '#1783FF' }` |      |
| filter              | 过滤不需要参与对齐的节点                                                                                                | (node: Node) => boolean                                                                                                         | `() => true`            |      |

### shape

`shape` 属性用于指定元素的参照图形，支持以下配置方式：

```js
// 使用主图形作为参照
{
  type: 'snapline',
  shape: 'key'
}

// 使用自定义函数返回参照图形
{
  type: 'snapline',
  shape: (node) => {
    return node.getShape('custom-shape');
  }
}
```

### 对齐线样式配置

| 配置项         | 说明            | 类型                                     | 默认值      |
| -------------- | --------------- | ---------------------------------------- | ----------- |
| stroke         | 线条颜色        | string \| Pattern \| null                | `'#1783FF'` |
| opacity        | 整体透明度      | number \| string                         | 1           |
| strokeOpacity  | 描边透明度      | number \| string                         | 1           |
| lineWidth      | 线宽度          | number \| string                         | 1           |
| lineCap        | 线段端点样式    | `'butt'` \| `'round'` \| `'square'`      | `'butt'`    |
| lineJoin       | 线段连接处样式  | `'miter'` \| `'round'` \| `'bevel'`      | `'miter'`   |
| lineDash       | 虚线配置        | number \| string \| (string \| number)[] | -           |
| lineDashOffset | 虚线偏移量      | number                                   | 0           |
| shadowBlur     | 阴影模糊程度    | number                                   | 0           |
| shadowColor    | 阴影颜色        | string                                   | -           |
| shadowOffsetX  | 阴影 X 方向偏移 | number                                   | 0           |
| shadowOffsetY  | 阴影 Y 方向偏移 | number                                   | 0           |
| cursor         | 鼠标样式        | string                                   | `'default'` |
| zIndex         | 渲染层级        | number                                   | 0           |

示例配置

```js
{
  type: 'snapline',
  horizontalLineStyle: {
    stroke: '#F08F56',
    strokeOpacity: 0.8,
    lineWidth: 2,
    lineDash: [4, 4],
    lineDashOffset: 0,
    opacity: 1,
    cursor: 'move',
  },
  verticalLineStyle: {
    stroke: '#17C76F',
    strokeOpacity: 0.8,
    lineWidth: 2,
    lineDash: [4, 4],
    lineDashOffset: 0,
    opacity: 1,
    cursor: 'move',
  },
}
```

## 代码示例

### 基础对齐线

最简单的使用方式：

```js
const graph = new Graph({
  plugins: ['snapline'],
});
```

### 自定义配置

可以根据需要自定义对齐线的行为：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'snapline',
      tolerance: 8, // 更大的吸附范围
      offset: 30, // 更长的延伸线
      horizontalLineStyle: {
        stroke: '#1890ff',
        lineWidth: 2,
      },
      filter: (node) => node.id !== 'node-0', // 根据id过滤节点，不参与对齐
    },
  ],
});
```

## 实际案例

<Playground path="plugin/snapline/demo/basic.js" rid="snapline-basic"></Playground>
