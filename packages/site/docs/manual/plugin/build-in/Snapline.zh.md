---
title: Snapline 对齐线
---

## 概述

对齐线插件为画布提供智能对齐参考线，在移动节点时自动显示辅助线并支持自动吸附，帮助用户实现精确对齐，是图形编辑中提升效率和精确度的重要工具。

## 使用场景

对齐线插件主要适用于以下场景：

- 需要精确对齐多个节点时
- 制作规范的图形布局时
- 需要快速实现节点的水平或垂直对齐
- 希望通过自动吸附提高排版效率

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

| 属性                | 描述                                                                                                                    | 类型                                      | 默认值                  | 必选 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------- | ---- |
| type                | 插件类型                                                                                                                | string                                    | `'snapline'`            | ✓    |
| key                 | 插件唯一标识符                                                                                                          | string                                    | -                       |      |
| tolerance           | 对齐精度，即触发对齐的距离阈值                                                                                          | number                                    | 5                       |      |
| offset              | 对齐线头尾的延伸距离                                                                                                    | number                                    | 20                      |      |
| autoSnap            | 是否启用自动吸附                                                                                                        | boolean                                   | true                    |      |
| shape               | 指定元素的参照图形：<br/>- `'key'`: 使用元素的主图形作为参照图形<br/>- `Function`: 传入函数时接收元素对象，返回一个图形 | string \| ((node: Node) => DisplayObject) | `'key'`                 |      |
| verticalLineStyle   | 垂直对齐线样式                                                                                                          | BaseStyleProps                            | `{ stroke: '#1783FF' }` |      |
| horizontalLineStyle | 水平对齐线样式                                                                                                          | BaseStyleProps                            | `{ stroke: '#1783FF' }` |      |
| filter              | 过滤不需要参与对齐的节点                                                                                                | (node: Node) => boolean                   | `() => true`            |      |

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

### 对齐线样式

可以分别自定义水平和垂直对齐线的样式：

```js
{
  type: 'snapline',
  horizontalLineStyle: {
    stroke: '#1890ff',
    lineWidth: 1,
  },
  verticalLineStyle: {
    stroke: '#1890ff',
    lineWidth: 1,
  }
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
