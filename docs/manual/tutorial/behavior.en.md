---
title: Interaction Behavior
order: 4
---

G6 encapsulates a set of interaction behaviors. Now we add simple some behaviors to **Tutorial Demo**: hover node, click node, click edge, drag cavas, zoom canvas. The target effect:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dijtQ6nB5Y4AAAAAAAAAAABkARQnAQ' width=500 />

<div style="text-align: center;"> Figure 1 **Tutorial Demo** with interaction behaviors</div>


## Basic Concept
### Interaction Behavior
G6 **Built-in** provides interaction behaviors. You can enable these behaviors conveniently:

- `drag-canvas`: enable to drag the canvas;
- `zoom-canvas`: enable to zoom the canvas;

Refer to [Behavior](../middle/states/defaultBehavior) for more information.


### Mode
Mode is a mechanism for state management. One mode is a set of several Behaviors. Users can assemble different Behaviors to different modes. The concept of mode is too complicated to understand for the beginners of G6. You do not need to know it well in this tutorial. For more information, please refer to [Mode](../middle/states/mode)。

### Interaction State
[State](../middle/states/state) is a mechanism of item state in G6. You can set different item styles for different states. When the state of an item is changed, the style will be updated automatically.
For example, set the state `'click'` of a node as `true` or `false`, and set the node style of the state `'click'` with thicker stroke. This style will take effect when the state `'click'` is switched to `true`, and restore when `'click'` state is switched to `false`. There will be a specific in the Usage part.

## Usage
### Built-in Behaviors: Drag and Zoom
Only assign `modes` when instantiate the graph, the corresponding built-in Behaviors will be enabled:
```javascript
const graph = new G6.Graph({
  // ...                                          // Other configurations
  modes: {
    default: [ 'drag-canvas', 'zoom-canvas', 'drag-node' ]  // Allow users to drag canvas, zoom canvas, and drag nodes
  }
});
```

The code above use the Behaviors by assigning their types. Besides, you can also configure the parameters for them, e.g. the sensitivity of zooming, max/min zoom ratio. Refer to [内置的交互 Behavior](../middle/states/defaultBehavior) for more detail.

`modes` object above define a set of interation modes of the graph, where `default` is the default mode, which includes `'drag-canvas'`, `'zoom-canvas'`, and `'drag-node'`. You can add more modes with their Behaviors into `modes`, e.g. `edit` mode:

```javascript
// Different modes with different Behaviors
modes: {
  default: ['drag-canvas'],
  edit: []
}
```

Refer to [Mode](/zh/docs/manual/middle/states/mode) and [Behavior](/zh/docs/manual/middle/states/defaultBehavior) for more detail.


### Hover and Click to Change Styles

有时我们希望通过交互可以将元素样式变成特定样式，如我们看到的图 1 中，鼠标 hover 节点、点击节点、点击边时，样式发生了变化。这里涉及到了 G6 中 [状态 State](../middle/states/state) 的概念。简单地说，是否 `hover` 、`click` 、任何操作（可以是自己起的状态名），都可以称为一种状态（state）。用户可以自由设置不同状态下的元素样式。要达到交互更改元素样式，需要两步：

- Step 1: 设置各状态下的元素样式；
- Step 2: 监听事件并切换元素状态

#### 设置各状态下的元素样式
在实例化图时，通过 `nodeStateStyles` 和 `edgeStateStyles` 两个配置项可以配置元素在不同状态下的样式。<br />为达到 **Tutorial案例** 中的效果：

- 鼠标 hover 节点时，该节点颜色变浅；
- 点击节点时，该节点边框加粗变黑；
- 点击边时，该边变成蓝色。

下面代码设置了节点分别在 `hover` 和 `click` 状态为 `true` 时的样式，边在 `click` 状态为 `true` 时的样式：
```javascript
const graph = new G6.Graph({
  // ...                           // 其他配置项
  // 节点不同状态下的样式集合
  nodeStateStyles: {
    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
    hover: {
      fill: 'lightsteelblue'
    },
    // 鼠标点击节点，即 click 状态为 true 时的样式
    click: {
      stroke: '#000',
      lineWidth: 3
    }
  },
  // 节点不同状态下的样式集合
  edgeStateStyles: {
    // 鼠标点击边，即 click 状态为 true 时的样式
    click: {
      stroke: 'steelblue'
    }
  },
});
```

#### 监听事件并切换元素状态
G6 中所有元素监听都挂载在图实例上，如下代码中的 `graph` 对象是 G6.Graph 的实例，`graph.on()` 函数监听了某元素类型（`node` / `edge`）的某种事件（`click` / `mouseenter` / `mouseleave` / ... 所有事件参见：[Event API](../../api/Event)）。
```javascript
// add listener on graph
graph.on('itemType:event', e => {
  // do something
});
```

Now, we add listeners to graph for **Tutorial Demo**, and update the states by `graph.setItemState()`:
```javascript
// Mouse enter a node
graph.on('node:mouseenter', e => {
  const nodeItem = e.item;  // Get the target item
  graph.setItemState(nodeItem, 'hover', true);  // Set the state 'hover' of the item to be true
});

// Mouse leave a node
graph.on('node:mouseleave', e => {
  const nodeItem = e.item;  // Get the target item
  graph.setItemState(nodeItem, 'hover', false); // Set the state 'hover' of the item to be false
});

// Click a node
graph.on('node:click', e => {
  // Swich the 'click' state of the node to be false
  const clickNodes = graph.findAllByState('node', 'click');
  clickNodes.forEach(cn => {
    graph.setItemState(cn, 'click', false);
  });
  const nodeItem = e.item;  // et the clicked item
  graph.setItemState(nodeItem, 'click', true); // Set the state 'click' of the item to be true
});

// Click an edge
graph.on('edge:click', e => {
  // Swich the 'click' state of the edge to be false
  const clickEdges = graph.findAllByState('edge', 'click');
    clickEdges.forEach(ce => {
      graph.setItemState(ce, 'click', false);
    });
    const edgeItem = e.item;  // Get the clicked item
    graph.setItemState(edgeItem, 'click', true); // Set the state 'click' of the item to be true
  });
});
```

## Complete Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tutorial Demo</title>
</head>
<body>
<div id="mountNode"></div>
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
  <script>
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      // Default attributes for all the nodes
      defaultNode: {
        labelCfg: {
          style: {
            fill: '#fff'
          }
        }
      },
      // Default attributes for all the edges
      defaultEdge: {
        labelCfg: {
          autoRotate: true
        }
      },
      // The node styles in different states
      nodeStateStyles: {
        // The node style when the state 'hover' is true
        hover: {
          fill: 'lightsteelblue'
        },
        // The node style when the state 'click' is true
        click: {
          stroke: '#000',
          lineWidth: 3
        }
      },
      // 边在各状态下的样式
      edgeStateStyles: {
        // The edge style when the state 'click' is true
        click: {
          stroke: 'steelblue'
        }
      },
      // Layout
      layout: {
        type: 'force',
        linkDistance: 100,
        preventOverlap: true,
        nodeStrength: -30,
        edgeStrength: 0.1
      },
      // Built-in Behaviors
      modes: {
        default: [ 'drag-canvas', 'zoom-canvas', 'drag-node' ]
      },
    });

    const main = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
      );
      const remoteData = await response.json();
      
      const nodes = remoteData.nodes;
      const edges = remoteData.edges;
      nodes.forEach(node => {
        if (!node.style) {
          node.style = {};
        }
        node.style.lineWidth = 1;
        node.style.stroke = '#666';
        node.style.fill = 'steelblue';
        switch (node.class) {
          case 'c0': {
            node.shape = 'circle';
            node.size = 30;
            break;
          }
          case 'c1': {
            node.shape = 'rect';
            node.size = [ 35, 20 ];
            break;
          }
          case 'c2': {
            node.shape = 'ellipse';
            node.size = [ 35, 20 ];
            break;
          }
        }
      });
      edges.forEach(edge => {
        if (!edge.style) {
          edge.style = {};
        }
        edge.style.lineWidth = edge.weight;
        edge.style.opacity = 0.6;
        edge.style.stroke = 'grey';
      });

      graph.data(remoteData);
      graph.render();

      // 监听鼠标进入节点
      graph.on('node:mouseenter', e => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 为 true
        graph.setItemState(nodeItem, 'hover', true);
      });
      // 监听鼠标离开节点
      graph.on('node:mouseleave', e => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 false
        graph.setItemState(nodeItem, 'hover', false);
      });
      // 监听鼠标点击节点
      graph.on('node:click', e => {
        // 先将所有当前有 click 状态的节点的 click 状态置为 false
        const clickNodes = graph.findAllByState('node', 'click');
        clickNodes.forEach(cn => {
          graph.setItemState(cn, 'click', false);
        });
        const nodeItem = e.item;
        // 设置目标节点的 click 状态 为 true
        graph.setItemState(nodeItem, 'click', true);
      });
      // 监听鼠标点击节点
      graph.on('edge:click', e => {
        // 先将所有当前有 click 状态的边的 click 状态置为 false
        const clickEdges = graph.findAllByState('edge', 'click');
        clickEdges.forEach(ce => {
          graph.setItemState(ce, 'click', false);
        });
        const edgeItem = e.item;
        // 设置目标边的 click 状态 为 true
        graph.setItemState(edgeItem, 'click', true);
      });
    };
    main();
  </script>
</body>
</html>
```

**⚠️Attention**: <br />Replace the url `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` to change the data into yours.
