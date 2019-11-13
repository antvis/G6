---
title: 快速上手
order: 1
---

## 什么是 G6
G6 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等基础的图可视化能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

![68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f726d73706f7274616c2f485178596775696e464f4d49587247514f4142592e676966.gif](https://cdn.nlark.com/yuque/0/2019/gif/174835/1553227950879-b04459d7-9961-4a63-82ad-67037b04fb6d.gif#align=left&display=inline&height=320&name=68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f726d73706f7274616c2f485178596775696e464f4d49587247514f4142592e676966.gif&originHeight=320&originWidth=400&search=&size=1333399&status=done&width=400)

## 安装 & 引用
在项目中引入 G6 有以下两种方式：npm 引入，CDN 引入。

### 1 在项目中使用 npm 包引入

**Step 1:** 使用命令行在项目目录下执行以下命令：

```bash
 npm install --save @antv/g6
```

**Step 2:** 在需要用的 G6 的 JS 文件中导入：
```javascript
import G6 from '@antv/g6'
```

### 2 在 HTML 中使用 CDN 引入

```html
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-{$version}/build/g6.js"></script>
```

 注意 

- 在 `{$version}` 中填写版本号，例如 `3.2.0`；
- 最新版为 3.2.0，可以在 [npm](https://www.npmjs.com/package/@antv/g6) 查看最新版本；
- 详情参考 Github 分支：[https://github.com/antvis/g6/tree/master](https://github.com/antvis/g6/tree/master) 。

## 快速试用

创建一个 G6 的关系图仅需要下面几个步骤：

1. 创建关系图的 HTML 容器；
1. 数据准备；
1. 创建关系图；
1. 配置数据源，渲染。


### Step 1 创建容器

需要在 HTML 中创建一个用于容纳 G6 绘制的图的容器，通常为 `div` 标签。G6 在绘制时会在该容器下追加 `canvas` 标签，然后将图绘制在其中。
```html
<div id="mountNode"></div>
```

### Step 2 数据准备

引入 G6 的数据源为 JSON 格式的对象。该对象中需要有节点（`nodes`）和边（`edges`）字段，分别用数组表示：

```javascript
const data = {
  // 点集
  nodes: [{
    id: 'node1', // String，该节点存在则必须，节点的唯一标识
    x: 100,      // Number，可选，节点位置的 x 值
    y: 200       // Number，可选，节点位置的 y 值
  },{
    id: 'node2', // String，该节点存在则必须，节点的唯一标识
    x: 300,      // Number，可选，节点位置的 x 值
    y: 200       // Number，可选，节点位置的 y 值
 }],
  // 边集
  edges: [{
    source: 'node1', // String，必须，起始点 id
    target: 'node2'  // String，必须，目标点 id
  }]
};
```

 注意 

- `nodes` 数组中包含节点对象，唯一的 `id` 是每个节点对象中必要的属性，`x`、 `y` 用于定位；
- `edges` 数组中包含边对象，`source` 和 target 是每条边的必要属性，分别代表了该边的起始点 `id` 与 目标点 `id`。
- 点和边的其他属性参见链接：[图元素配置文档](/zh/docs/api/properties/NodeProperties)。


### Step 3 创建关系图

创建关系图（实例化）时，至少需要为图设置容器、宽和高。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',  // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 800,              // Number，必须，图的宽度
  height: 500              // Number，必须，图的高度
});
```

### Step 4 配置数据源，渲染

```javascript
graph.data(data);  // 读取 Step 2 中的数据源到图上
graph.render();    // 渲染图
```

### 最终的结果
![image.png](https://cdn.nlark.com/yuque/0/2019/png/89796/1547625734035-c211990a-803c-4c6d-87ed-f0096dadb628.png#align=left&display=inline&height=152&name=image.png&originHeight=152&originWidth=337&search=&size=2981&status=done&width=337)

## 完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tutorial Demo</title>
</head>
	<body>
    /* 图的画布容器 */
    <div id="mountNode"></div>
    
    /* 引入 G6 */
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
    
    <script>
      // 定义数据源
      const data = {
        // 点集
        nodes: [{
          id: 'node1',
          x: 100,
          y: 200
        },{
          id: 'node2',
          x: 300,
          y: 200
        }],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2'
          }
        ]
      };
      
      // 创建 G6 图实例
      const graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 800,
        height: 500
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
你是在 React 中使用 G6 吗？我们提供了在 React 中使用 G6 的 [Demo](https://github.com/baizn/g6-in-react)

更多关于 React 中如何使用 G6，请参考[React 中使用 G6 的文档](https://www.yuque.com/antv/g6/zmfur7)，有任何问题都可以通过页面底部的钉钉交流群和我们沟通，也非常欢迎给我们提 [Issues](https://github.com/antvis/g6/issues)。


## 更多
本章仅仅介绍了如何安装以及最简单的场景，在 G6 Tutorial 中其他的章节中我们会教会你：

- 实例化图时的常见配置；
- 设置元素（节点/边）属性、样式；
- 设置布局；
- 增加交互；
- 增加动画；
- 使用辅助组件。

想了解更高阶的功能，请参见 [G6 核心概念](/zh/docs/manual/middle/keyConcept)，[G6 高级指引](/zh/docs/manual/advanced/shape-and-properties)。

## 友情链接
结合前端库的第三方实现：

- [基于 G6 和 React 的可视化流程编辑器](https://github.com/guozhaolong/wfd) - [Workflow Designer](https://github.com/guozhaolong/wfd)；
- [基于 G6 和 Vue 的可视化编辑器](https://github.com/caoyu48/vue-g6-editor)；
- [基于 G6 和 Vue 的可视化图形编辑器](https://github.com/OXOYO/X-Flowchart-Vue) - [A visual graph editor based on G6 and Vue](https://github.com/OXOYO/X-Flowchart-Vue)。


## G6 图可视化交流群
欢迎各界 G6 使用者、图可视化爱好者加入 **G6 图可视化交流群**（钉钉群，使用钉钉扫一扫加入）讨论与交流。
<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1569834117258-cda482fc-d121-4107-9236-1ef1ee1f0758.png#align=left&display=inline&height=495&name=image.png&originHeight=990&originWidth=750&search=&size=185140&status=done&width=375)

 提示 

- 3.2 版本已经放出，会根据我们支持的业务，不断完善 demo；
- 欢迎提出各种建议，同时参与我们的开发；
- 开源不易，关系图开发更不易，敬请互相体谅。
