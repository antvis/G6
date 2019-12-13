---
title: 状态 State
order: 6
---

## 什么是 state
G6 中的 **state**，指的是状态，包括**交互状态**和**业务状态**两种。

在 G6 中，配置交互状态和业务状态的方式是相同的。对于部分只使用 G6 来完成某个需求的开发，而不想深入理解G6的用户，其实不用区分交互状态和业务状态的区别，使用相同的方式定义状态，使用相同的方式使用状态，完全没有理解成本。

### 交互状态
交互状态是与具体的交互动作密切相关的，如用户使用鼠标选中某个节点，hover 到某条边。

G6 中默认处理的是交互状态。

### 业务状态
指根据用户业务需求自定义的状态。业务状态是与交互动作无关的，与具体业务逻辑强相关的，也可理解为是强数据驱动的。如某个任务的执行状态、某条申请的审批状态等，不同的数据值代表不同的业务状态。业务状态与用户交互动作无关，但在 G6 中的处理方式同交互状态一致。

## 何时使用 state
判断是否该使用 state 的原则很简单，从交互和业务两个层面来看：

- 某个交互动作要改变节点或边的样式及属性；
- 呈现给用户的内容会根据数据改变（如 1 代表成功，0 代表失败）。

满足上述条件其一，则应该使用 state。


## 使用 state
**使用 `graph.setItemState` 来使定义的状态生效**。该函数可以在监听函数 `graph.on` 中被调用吗，也可以在另一种是在自定义 Behavior 中调用，或在其他任意地方用于响应交互/业务的变化。

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

## 配置不同 state 的样式
上小节使用 `graph.setItemState` 使某些状态在元素上生效/失效，仅仅是为该元素做了某些状态的标识。为了将这些状态反应到终端用户所见的视觉空间中，我们需要为不同的状态设置不同的元素样式，以响应元素状态的变化。

在 G6 中，有两种方式配置不同状态的样式：

- 在实例化 Graph 时，通过 `nodeStateStyles` 和 `edgeStateStyles` 定义；
- 在自定义节点时，在 options 配置项的 `stateStyles` 中定义状态。

### 实例化 Graph 时定义 state 样式
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'diamond',
    style: {                // 默认状态样式
      fill: 'blue'
    }
  },
  nodeStateStyles: {
    hover: {                // hover 状态为 true 时的样式
      fill: '#d3adf7'
    },
    running: {              // running 状态为 true 时的样式
    	stroke: 'steelblue'
    }
  }
})
```

上面的实例代码中，我们在实例化 Graph 时候，通过 `nodeStateStyles` 定义了交互状态 `hover` 和业务状态 `running` 的样式，当用户操作过程中，鼠标 `hover` 到某个节点上时，节点的填充色就会变为指定的颜色，当某个任务状态变为正在执行时，节点的边框就会变为 `running` 状态定义的颜色。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Beu6QY_ETOgAAAAAAAAAAABkARQnAQ' width=150/>

同理，`defaultEdge` 中的 `style` 属性定义了默认状态下边的样式，使用 `edgeStateStyles` 可以定义不同状态下边的样式。

### 自定义节点和边时定义 state 样式
下面代码是在自定义节点时候通过 `stateStyles` 定义的交互状态 `hover` 和 `selected` 时该类型节点的样式。用户在操作过程中，如果 hover 到某个节点，则节点的透明度会变为 0.8。如果选中某个节点，选中节点的边框宽度变为 3。
```javascript
G6.registerNode('customShape', {
  // 自定义节点时的配置
  options: {
    size: 60,
    style: {
      lineWidth: 1
    },
    stateStyles: {
      // 鼠标 hover 状态下的配置
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

## 小结
G6 底层提供了状态管理的能力，通过使用 state，简化了状态管理，降低了用户的认知成本。更多关于 G6 中状态的内容请参考 <a href='https://www.yuque.com/antv/g6/xiux28' target='_blank'>G6 状态量思考</a>。
