---
title: Interaction Mode
order: 7
---

In this chapter, we will introduce the interactions in G6 by adding nodes and edges. You nee to be familiar with the following before reading this chapter:

- [Custom Behavior](/en/docs/manual/advanced/custom-behavior)；
- [Mode](/en/docs/manual/middle/states/mode)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zwgcTYCrr6sAAAAAAAAAAABkARQnAQ' width=400 />

<br />The final result in shown above. The complete code: [Adding Items](https://codepen.io/Yanyan-Wang/pen/qBBNaye). <br />There are three mode options in the drop-down menu on the upper left.

- Switch to the default interactive mode when the "Default" button is selected: The dragged node will move with the mouse; The node will be selected by clicking;
- Switch to the addNode interactive mode when the "Add Node" button is selected: Add a node by clicking canvas; Select a node by clicking node;
- Switch to the addEdge interactive mode when the "Add Edge" button is selected: Add an edge by clicking the end nodes in order.

**The reason for using multiple modes:**<br /> 
The same mouse operation has different meanings in different scenarios. For example:

- Canceling the selected state by clicking the canvas V.S. Adding new node on the clicked position on the canvas. Both these two requirements are binded to the event of clicking the canvas;
- Selecting a node by clicking it V.S. Adding an edge by clicking two end nodes. Both these two requirements are binded to the event of clicking the node.

To distinguish the meanings of these operations, we utilize the interaction modes on a graph for different scenarios .<br />


## Prerequisite Code
Here goes the basic HTML code for this chapter. We will add new codes incrementally to enable new functions. This prerequisite code defines the drop-down menu and the source `data`.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Interactively Add</title>
</head>
<body>
  <!-- The drop-down menu on the upper left -->
  <select id="selector">
    <option value="default">Default</option>
    <option value="addNode">Add Node</option>
    <option value="addEdge">Add Edge</option>
  </select>
  <div id="mountNode"></div>
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
  <script>
    // Source data
  	const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200
     },{
        id: 'node2',
        x: 300,
        y: 200
     },{
        id: 'node3',
        x: 300,
        y: 300
     }],
      edges: [{
        id: 'edge1',
        target: 'node2',
        source: 'node1'
     }]
    };
  </script>
</body>
</html>
```


## Configure the Interaction Mode
The following code instantiates the Graph, and configure the interaction `modes`, including `default` Mode, `addNode` Mode, and `addEdge` Mode. There are several interaction Behaviors inside each Mode, where `'drag-node'` and `'click-select'` are the built-in Behaviors of G6. `'click-add-node'` and `'click-add-edge'` are the custom Behavior to be defined.
```javascript
// const data = ...
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  // The set of interaction Modes
  modes: {
    // Default mode
    default: ['drag-node', 'click-select'],
    // The Mode of adding nodes
    addNode: ['click-add-node', 'click-select'],
    // The Mode of adding edges
    addEdge: ['click-add-edge', 'click-select']
  }
 });

graph.data(data);
graph.render();

// Listen to the change of the drop-down menu to swith the interaction Mode
document.getElementById('selector').addEventListener('change', e => {
  const value = e.target.value;
  // Switch the interaction Mode
  graph.setMode(value);
});
```


#### Add a Node
When user select the 'Add Node' button in the menu, the Mode will be switched to the addNode, which includes two Behaviors: `'click-add-node'` and `'click-select'`. The `'click-add-node'` is registered by `G6.registerBehavior`. P.S. the name of `'click-add-node'` can be assigned to any one you like.

```javascript
// Register the custom Behavior of adding a node by clicking
G6.registerBehavior('click-add-node', {
  // Bind the events and response functions for this custom Behavior
  getEvents() {
    // The event to be listned is cnavas:click. The response function is onClick
   return {
     'canvas:click': 'onClick'
   };
 	},
  // 点击事件
  onClick(ev) {
    const graph = this.graph;
    // 在图上新增一个节点
    const node = graph.addItem('node', {
      x: ev.x,
      y: ev.y,
      id: G6.Util.uniqueId()  // 生成唯一的 id
    });
  }
});
```

#### 添加边
在上面的案例中，当需要在两个节点之间连线时，要先切换到添加边的 Mode 上。下面代码自定义了名为 `'click-add-edge'`（名字可以自由设定）的 Behavior 实现两个节点之间连线。
```javascript
// 封装点击添加边的交互
G6.registerBehavior('click-add-edge', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
   return {
     'node:click': 'onClick' ,   // 监听事件 node:click，响应函数时 onClick
     mousemove: 'onMousemove',   // 监听事件 mousemove，响应函数时 onMousemove
     'edge:click': 'onEdgeClick' // 监听事件 edge:click，响应函数时 onEdgeClick
   };
 	},
  // getEvents 中定义的 'node:click' 的响应函数
  onClick(ev) {
    const node = ev.item;
    const graph = this.graph;
    // 鼠标当前点击的节点的位置
    const point = {x: ev.x, y: ev.y};
    const model = node.getModel();
    if (this.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: model.id
      });
      
      this.edge = null;
      this.addingEdge = false;
    } else {
      // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
      this.edge = graph.addItem('edge', {
        source: model.id,
        target: point
      });
      this.addingEdge = true;
    }
  },
  // getEvents 中定义的 mousemove 的响应函数
  onMousemove(ev) {
    // 鼠标的当前位置
  	const point = {x: ev.x, y: ev.y};
    if (this.addingEdge && this.edge) {
      // 更新边的结束点位置为当前鼠标位置
      this.graph.updateItem(this.edge, {
        target: point
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
  }
});
```

## 完整代码
完整 demo 代码参见：[动态添加元素](https://codepen.io/Yanyan-Wang/pen/qBBNaye)。
