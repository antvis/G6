---
title: 快速上手
order: 1
---

## 第一个示例

<iframe src="https://codesandbox.io/embed/g6-v5-beta-quick-start-m3yncv?fontsize=14&hidenavigation=1&theme=light"
   style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
   title="g6-v5-beta-quick-start"
   allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
   sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
 ></iframe>

## 安装 & 引用

在项目中引入 G6 有以下两种方式：NPM 引入；CDN 引入。

### 1 在项目中使用 NPM 包引入

**Step 1:** 使用命令行在项目目录下执行以下命令：

```bash
 npm install --save @antv/g6@5.0.0-beta.10
```

**Step 2:** 在需要用的 G6 的 JS 文件中导入：

```javascript
import { Graph } from '@antv/g6';
```

### 2 在 HTML 中使用  CDN 引入

```html
// beta 的版本号为 5.0.0-beta.x
<script src="https://gw.alipayobjects.com/os/lib/antv/g6/{$version}/dist/g6.min.js"></script>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span>

- 在  `{$version}` 中填写版本号，例如  `5.0.0-beta.10`；
- 最新版可以在  <a href='https://www.npmjs.com/package/@antv/g6' target='_blank'>NPM</a>  查看最新版本及版本号；
- 详情参考 Github 分支：<a href='https://github.com/antvis/g6/tree/v5' target='_blank'>https://github.com/antvis/g6/tree/v5</a>。

## 快速试用

创建一个 G6 的关系图仅需要下面几个步骤：

1. 创建关系图的 HTML 容器；
2. 数据准备；
3. 创建关系图及其配置；
4. 配置数据源，渲染。

### Step 1 创建容器

需要在 HTML 中创建一个用于容纳 G6 绘制的图的容器，通常为 `div`  标签。G6 在绘制时会在该容器下追加 `canvas` 标签，然后将图绘制在其中。

```html
<div id="container"></div>
```

### Step 2 数据准备

引入 G6 的数据源为 JSON 格式的对象。该对象中需要有节点（`nodes`）和边（`edges`）字段，分别用数组表示：

```javascript
const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // string | number, 该节点存在则必须，节点的唯一标识
      data: {
        // 存放一些业务属性，或特殊的节点配置
        name: 'Circle1',
      },
    },
    {
      id: 'node2', // string | number, 该节点存在则必须，节点的唯一标识
      data: {
        // 存放一些业务属性，或特殊的节点配置
        name: 'Circle2',
      },
    },
  ],
  // 边集
  edges: [
    {
      id: 'edge1',
      source: 'node1', // string | number, 必须，起始点 id
      target: 'node2', // string | number, 必须，目标点 id
      data: {}, // 存放一些业务属性，或特殊的边配置
    },
  ],
};
```

注意

- `nodes` 数组中包含节点对象。每个节点对象中唯一的、必要的 `id` 以标识不同的节点，`x`、 `y` 指定该节点的位置；
- `edges` 数组中包含边对象。`source` 和 `target` 是每条边的必要属性，分别代表了该边的起始点 `id` 与 目标点 `id`。

### Step 3 创建关系图

创建关系图（实例化）时，至少需要为图设置容器：

```javascript
const graph = new Graph({
  container: 'constainer', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 800, // number，图的宽度，不指定则使用容器宽度
  height: 500, // number，图的高度，不指定则使用容器高度
});
```

### Step 4 配置数据源，渲染

```javascript
graph.read(data); // 读取 Step 2 中的数据源到图上
// 或在 Step 3 中将 data 写入图配置，如下：
// const graph = new Graph({
//  // ... 其他配置
//   data: data
// })
```

### 最终的结果

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DQl8SJmb_6gAAAAAAAAAAAAADmJ7AQ/original' width=400 alt='img' />

## 完整代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    /* 图的画布容器 */
    <div id="container"></div>

    /* 引入 G6 */
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/5.0.0-beta.10/dist/g6.min.js"></script>

    <script>
      // 定义数据源
      const data = {
        nodes: [
          {
            id: 'node1',
            data: {
              name: 'Circle1',
            },
          },
          {
            id: 'node2',
            data: {
              name: 'Circle2',
            },
          },
        ],
        edges: [
          {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'container', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
        // 交互
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select'],
        },
        // 布局
        layout: { type: 'grid' },
        // 读取数据
        data,
      });
      // 或使用 API 读取和渲染数据
      // graph.read(data);
    </script>
  </body>
</html>
```

## 更多

本章仅仅介绍了如何安装以及最简单的场景，在 [G6 Tutorial 入门教程](https://g6-next.antv.antgroup.com/manual/tutorial/preface) 中其他的章节中您将学习到：

- 实例化图时的常见配置；
- 设置元素（节点/边）属性、样式；
- 设置布局；
- 增加交互；
- 增加动画；
- 使用辅助组件。

G6 5.0 的高阶教程正在建设中。您可以查阅 [API 文档](https://g6-next.antv.antgroup.com/apis)辅助开发。
