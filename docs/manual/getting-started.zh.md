---
title: 快速上手
order: 1
---

## 第一个示例

<iframe
     src="https://codesandbox.io/embed/compassionate-lalande-5lxm7?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="compassionate-lalande-5lxm7"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## 安装 & 引用

在项目中引入 G6 有以下两种方式：NPM 引入；CDN 引入。

### 1 在项目中使用 NPM 包引入

**Step 1:** 使用命令行在项目目录下执行以下命令：

```bash
 npm install --save @antv/g6
```

**Step 2:** 在需要用的 G6 的 JS 文件中导入：

```javascript
import G6 from '@antv/g6';
```

### 2 在 HTML 中使用  CDN 引入

```html
// version <= 3.2
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-{$version}/build/g6.js"></script>

// version >= 3.3
<script src="https://gw.alipayobjects.com/os/lib/antv/g6/{$version}/dist/g6.min.js"></script>
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span>

- 在  `{$version}` 中填写版本号，例如  `3.7.1`；
- 最新版可以在  <a href='https://www.npmjs.com/package/@antv/g6' target='_blank'>NPM</a>  查看最新版本及版本号；
- 详情参考 Github 分支：<a href='https://github.com/antvis/g6/tree/master' target='_blank'>https://github.com/antvis/g6/tree/master</a>。

## 快速试用

创建一个 G6 的关系图仅需要下面几个步骤：

1. 创建关系图的 HTML 容器；
2. 数据准备；
3. 创建关系图；
4. 配置数据源，渲染。

### Step 1 创建容器

需要在 HTML 中创建一个用于容纳 G6 绘制的图的容器，通常为 `div`  标签。G6 在绘制时会在该容器下追加 `canvas` 标签，然后将图绘制在其中。

```html
<div id="mountNode"></div>
```

### Step 2 数据准备

引入 G6 的数据源为 JSON 格式的对象。该对象中需要有节点（`nodes`）和边（`edges`）字段，分别用数组表示：

```javascript
const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};
```

注意

- `nodes` 数组中包含节点对象。每个节点对象中唯一的、必要的 `id` 以标识不同的节点，`x`、 `y` 指定该节点的位置；
- `edges` 数组中包含边对象。`source` 和 `target` 是每条边的必要属性，分别代表了该边的起始点 `id` 与 目标点 `id`。
- 点和边的其他属性参见链接：[内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 和 [内置边](/en/docs/manual/middle/elements/edges/defaultEdge)。

### Step 3 创建关系图

创建关系图（实例化）时，至少需要为图设置容器、宽和高。

```javascript
const graph = new G6.Graph({
  container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 800, // Number，必须，图的宽度
  height: 500, // Number，必须，图的高度
});
```

### Step 4 配置数据源，渲染

```javascript
graph.data(data); // 读取 Step 2 中的数据源到图上
graph.render(); // 渲染图
```

### 最终的结果

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*srtDT5slbN8AAAAAAAAAAABkARQnAQ' width=400 alt='img' />

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
    <div id="mountNode"></div>

    /* 引入 G6 */
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>

    <script>
      // 定义数据源
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      };

      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500,
      });
      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();
    </script>
  </body>
</html>
```

## React 中使用 G6

如果你想在 React 中使用 G6 ，可以参考我们提供了的 React 中使用 G6 的 <a href='https://github.com/baizn/g6-in-react' target='_blank'>Demo</a>。

更多关于 React 中如何使用 G6，请参考 [React 中使用 G6 的文档](/zh/docs/manual/advanced/g6InReact)。有任何问题都可以通过页面底部的钉钉交流群和我们沟通，也非常欢迎给我们提 issues 或 PR： <a href='https://github.com/antvis/g6/tree/master' target='_blank'>https://github.com/antvis/g6/tree/master</a>。

## 更多

本章仅仅介绍了如何安装以及最简单的场景，在 G6 Tutorial 中其他的章节中我们会教会你：

- 实例化图时的常见配置；
- 设置元素（节点/边）属性、样式；
- 设置布局；
- 增加交互；
- 增加动画；
- 使用辅助组件。

想了解更高阶的功能，请参见 [G6 核心概念](/zh/docs/manual/middle/graph)，[G6 扩展阅读](/zh/docs/manual/advanced/coordinate-system)。
