---
title: State
order: 6
---

## What is State
The **State** in G6 is the state of an item (node/edge), including **Interaction State** and **Bussiness State**.

### Interaction State
The interaction state is closely related to specific interaction actions, such as the user using a mouse to select a node, or hover an edge.

G6 handles interactive states by default.

### Bussiness State
Business state refers to the states customized according to the user's business needs. Business state is not related to interaction actions, and is strongly related to specific business logic. It can also be understood as being strongly data-driven. Such as the execution status of a task, the approval state of an application, etc., different data values ​​represent different business states. Business state has nothing to do with user interaction, but it is handled in the same way as interaction state in G6.

## When to Use State
The principle of judging whether or not to use state comes from the perspective of interaction and business:

- Interaction State: Some interactions need to change the style and attributes of nodes or edges;
- Bussiness State: The content presented to the user will change based on the data (eg 1 for success, 0 for failure).

满足上述条件其一，则应该使用 state。

## Configure Styles for State
在 G6 中，配置交互状态和业务状态的方式是相同的。对于部分只使用 G6 来完成某个需求的开发，而不想深入理解G6的用户，其实不用区分交互状态和业务状态的区别，使用相同的方式定义状态，使用相同的方式使用状态，完全没有理解成本。

在 G6 中，定义 state 时，我们有两种选择：

- 在实例化 Graph 时，通过 `nodeStateStyles` 和 `edgeStateStyles` 来定义；
- 在自定义节点时，在 options 配置项的 `stateStyles` 中定义状态。

### Configure When instantiating a Graph
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'diamond',
    style: {                // Node style on default state
      fill: 'blue'
    }
  },
  nodeStateStyles: {
    hover: {                // The node style when it is on the its hover state is true
      fill: '#d3adf7'
    },
    running: {              // The node style when it is on the its running state is true
    	stroke: 'steelblue'
    }
  }
})
```

上面的实例代码中，我们在实例化 Graph 时候，通过 `nodeStateStyles` 定义了交互状态 `hover` 和业务状态`running`，当用户操作过程中，鼠标 `hover` 到某个节点上时，节点的填充色就会变为指定的颜色，当某个任务状态变为正在执行时，节点的边框就会变为 `running` 状态定义的颜色。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Beu6QY_ETOgAAAAAAAAAAABkARQnAQ' width=150/>

同理，defaultEdge 中的 style 属性定义了默认状态下边的样式，使用 `edgeStateStyles` 可以定义不同状态下边的样式。

### Configure Styles When Customizing Node
下面代码是在自定义节点时候通过 `stateStyles` 定义的交互状态 `hover` 和 `selected`。用户在操作过程中，如果hover到某个节点，则节点的透明度会变为 0.8，如果选中某个节点，选中节点的边框宽度变为 3。
```javascript
G6.registerNode('customShape', {
  // 自定义节点时的配置
  options: {
    size: 60,
    style: {
      lineWidth: 1
    },
    stateStyles: {
      // 鼠标hover状态下的配置
      hover: {
        fillOpacity: 0.8
      },
      // 选中节点状态下的配置
      selected: {
        lineWidth: 3
      }
    }
  }
}
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1DFnTKfmfLcAAAAAAAAAAABkARQnAQ' width=150/>

## Using state
不管使用哪种方式，当我们定义好了 state 以后，**使用 `graph.setItemState` 来使定义的状态生效**。

那么，我们该在什么地方使用 **`graph.setItemState`** 来使 state 生效呢？一种是直接使用 `graph.on` 监听事件，在回调中使 state 生效，另一种是在自定义 Behavior 中使 state 生效。

### graph.on
在回调函数中使定义的交互状态 hover 生效。
```javascript
graph.on('node:mouseenter', evt => {
  const { item } = evt
  graph.setItemState(item, 'hover', true)
})

graph.on('node:mouseleave', evt => {
  const { item } = evt
  graph.setItemState(item, 'hover', false)
})
```

### Behavior
在自定义 Behavior 中使定义的交互状态 selected 生效。
```javascript
G6.registerBehavior('nodeClick', {
  getEvents() {
    return {
      'node:click': 'onClick'
    };
  },
  onClick(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const { item } = e;
    const graph = this.graph;
    graph.setItemState(item, 'selected', true)
  }
})
```

## Conclusion
G6 底层提供了状态管理的能力，通过使用 state，简化了状态管理，降低了用户的认知成本。更多关于 G6 中状态的内容请参考 [The Thinking of State in G6](https://www.yuque.com/antv/g6/xiux28)。
