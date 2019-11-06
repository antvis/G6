---
title: 状态 State
order: 6
---

## 什么是 state
G6 中的 **state**，指的是状态，包括**交互状态**和**业务状态**两种。

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

## 配置不同 state 的样式
在 G6 中，配置交互状态和业务状态的方式是相同的。对于部分只使用 G6 来完成某个需求的开发，而不想深入理解G6的用户，其实不用区分交互状态和业务状态的区别，使用相同的方式定义状态，使用相同的方式使用状态，完全没有理解成本。

在 G6 中，定义 state 时，我们有两种选择：

- 在实例化 Graph 时，通过 `nodeStateStyles` 和 `edgeStateStyles` 来定义；
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

上面的实例代码中，我们在实例化 Graph 时候，通过 `nodeStateStyles` 定义了交互状态 `hover` 和业务状态`running`，当用户操作过程中，鼠标 `hover` 到某个节点上时，节点的填充色就会变为指定的颜色，当某个任务状态变为正在执行时，节点的边框就会变为 `running` 状态定义的颜色。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570584254138-c2ef66cc-0067-41bf-8235-63798c65a3c1.gif#align=left&display=inline&height=181&name=3.gif&originHeight=181&originWidth=247&search=&size=8886&status=done&width=247)

同理，defaultEdge 中的 style 属性定义了默认状态下边的样式，使用 `edgeStateStyles` 可以定义不同状态下边的样式。

### 自定义节点和边时定义 state 样式
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
![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570584254137-65f129dd-45fc-430d-9485-991ee1d2dbba.gif#align=left&display=inline&height=181&name=3.gif&originHeight=181&originWidth=247&search=&size=8385&status=done&width=247)

## 使用 state
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

## 小结
G6 底层提供了状态管理的能力，通过使用 state，简化了状态管理，降低了用户的认知成本。更多关于 G6 中状态的内容请参考 [G6 状态量思考](https://www.yuque.com/antv/g6/xiux28)。
