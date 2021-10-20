---
title: 使用多种交互模式
order: 7
---

本章以添加节点及在两个节点之间连线为例进行介绍 G6 中的交互。在阅读本章之前，需要先熟悉以下内容：

- [自定义交互行为 Behavior](/zh/docs/manual/middle/states/custom-behavior)；
- [交互模式 Mode](/zh/docs/manual/middle/states/mode)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y1qkTKqhQXkAAAAAAAAAAABkARQnAQ' alt='setmode' width=400 />

<br />上图是本文要实现的最终效果。完整 demo 代码参见：<a href='https://codepen.io/Yanyan-Wang/pen/qBBNaye' target='_blank'>动态添加元素</a>。<br />左上方的下拉菜单中有三个选项，用于切换交互模式 mode：

- 选择 “Default” 按钮时，切换到 default 交互模式：拖拽节点时节点跟随鼠标移动；点击节点时选中该节点；
- 选择 “Add Node” 按钮时，切换到  addNode 交互模式：点击空白区域在点击处增加一个节点；点击节点时选中该节点；
- 选择 “Add Edge” 按钮时，切换到 addEdge 交互模式：依次点击两个节点将会在这两个节点之间添加一条边。

**使用多个 mode 的原因**<br />  相同的鼠标操作，在不同场景下有不同的含义。例如：

- 点击空白画布取消目前图上所有节点的选中状态、点击空白画布在响应位置添加节点，这两种需求都对应了用户点击画布空白处的操作；
- 点击选中、点击两个节点添加边都涉及到了鼠标在节点上的点击操作。

为了区分这些操作的含义，我们使用交互模式 mode 划分不同的场景。<br />

## 前提代码

下面 HTML 代码是本文的基础代码，后续功能将在这份代码中增量添加。下面代码定义了左上方的下拉菜单，以及后面将会用到图上的初始数据 `data`。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Interactively Add</title>
  </head>
  <body>
    <!-- 左上方的下拉菜单 -->
    <select id="selector">
      <option value="default">默认</option>
      <option value="addNode">添加节点</option>
      <option value="addEdge">添加边</option>
    </select>
    <div id="mountNode"></div>
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script>
    <script>
      // 初始数据
      const data = {
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
          {
            id: 'node3',
            x: 300,
            y: 300,
          },
        ],
        edges: [
          {
            id: 'edge1',
            target: 'node2',
            source: 'node1',
          },
        ],
      };
    </script>
  </body>
</html>
```

## 配置交互模式

下面代码实例化了图，并配置了交互模式的集合 `modes`，其中包括 `default` 默认交互模式、`addNode` 增加节点交互模式、`addEdge` 增加边交互模式。每种交互模式中都包含了各自的交互行为，其中  `'drag-node'`（拖拽节点） 和  `'click-select'`（点击选中） 是 G6 内置的交互行为，`'click-add-node'`（点击空白画布添加节点） 和  `'click-add-edge'`（点击两个节点添加边） 需要我们在后面进行自定义。

```javascript
// const data = ...
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  // 交互模式集合
  modes: {
    // 默认交互模式
    default: ['drag-node', 'click-select'],
    // 增加节点交互模式
    addNode: ['click-add-node', 'click-select'],
    // 增加边交互模式
    addEdge: ['click-add-edge', 'click-select'],
  },
  // 节点在不同状态下的样式集合
  nodeStateStyles: {
    // 节点在 selected 状态下的样式，对应内置的 click-select 行为
    selected: {
      stroke: '#666',
      lineWidth: 2,
      fill: 'steelblue'
    }
});

graph.data(data);
graph.render();

// 监听左上角下拉菜单的变化，根据其变化切换图的交互模式
document.getElementById('selector').addEventListener('change', e => {
  const value = e.target.value;
  // 切换交互模式
  graph.setMode(value);
});
```

#### 添加节点

在上面的例子中，当选中添加节点按钮时，会切换到 `addNode` 的 Mode 上。`addNode` Mode 包含了 `'click-add-node'`, `'click-select'` 两个 Behavior。`'click-add-node'` 实现了在点击空白画布时，在点击位置添加节点。这是通过使用 `G6.registerBehavior` 自定义一个名为 `'click-add-node'`（名字可以自由设定） 的 Behavior 实现的。

```javascript
// 添加的节点数量，用于生成唯一 id
let addedNodeCount = 0;

// 封装点击添加节点的交互
G6.registerBehavior('click-add-node', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    // 监听的事件为 canvas:click，响应函数是 onClick
    return {
      'canvas:click': 'onClick',
    };
  },
  // 点击事件
  onClick(ev) {
    const graph = this.graph;
    // 在图上新增一个节点
    const node = this.graph.addItem('node', {
      x: ev.canvasX,
      y: ev.canvasY,
      id: `node-${addedNodeCount}`, // 生成唯一的 id
    });
    addedNodeCount++;
  },
});
```

#### 添加边

在上面的例子中，当需要在两个节点之间连线时，要先切换到添加边的 Mode 上。下面代码自定义了名为  `'click-add-edge'`（名字可以自由设定）的 Behavior 实现两个节点之间连线。

```javascript
// 封装点击添加边的交互
G6.registerBehavior('click-add-edge', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    return {
      'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
      mousemove: 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
      'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数是 onEdgeClick
    };
  },
  // getEvents 中定义的 'node:click' 的响应函数
  onClick(ev) {
    const node = ev.item;
    const graph = this.graph;
    // 鼠标当前点击的节点的位置
    const point = { x: ev.x, y: ev.y };
    const model = node.getModel();
    if (this.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: model.id,
      });

      this.edge = null;
      this.addingEdge = false;
    } else {
      // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
      this.edge = graph.addItem('edge', {
        source: model.id,
        target: point,
      });
      this.addingEdge = true;
    }
  },
  // getEvents 中定义的 mousemove 的响应函数
  onMousemove(ev) {
    // 鼠标的当前位置
    const point = { x: ev.x, y: ev.y };
    if (this.addingEdge && this.edge) {
      // 更新边的结束点位置为当前鼠标位置
      this.graph.updateItem(this.edge, {
        target: point,
      });
    }
  },
  // getEvents 中定义的 'edge:click' 的响应函数
  onEdgeClick(ev) {
    const currentEdge = ev.item;
    // 拖拽过程中，点击会点击到新增的边上
    if (this.addingEdge && this.edge == currentEdge) {
      graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
    }
  },
});
```

## 完整代码

完整 demo 代码参见：<a href='https://codepen.io/Yanyan-Wang/pen/qBBNaye' target='_blank'>动态添加元素</a>。
