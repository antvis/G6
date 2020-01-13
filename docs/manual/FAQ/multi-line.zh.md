---
title: 两节点间存在多条边
order: 4
---

## 问题
有如下的一份数据，如何使用 <a href='https://github.com/antvis/g6' target=''>G6</a> 让两个节点之间连多条边？

```javascript
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 150,
    label: 'node1',
  }, {
    id: 'node2',
    x: 300,
    y: 150,
    label: 'node2'
  }],
  edges: [{
    	source: 'node1',
    	target: 'node2'
  	},
   {
   	 source: 'node2',
     target: 'node1'
  	}
  ]
};

```

接到上面这个问题后，我们马上就开始动手，二话不说先撸出了下面这段代码。

```javascript
const graph = new G6.Graph({
  container: GRAPH_CONTAINER,
  width: 500,
  height: 500,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    },
    labelCfg: {
      style: {
        fontSize: 12
      }
    }
  },
  defaultEdge: {
    shape: 'quadratic',
    style: {
      stroke: '#e2e2e2'
    }
  }
});

graph.data(data);
graph.render();
```

So Easy!

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9u0BTpCAn-4AAAAAAAAAAABkARQnAQ' width=345 />


如果两个节点之间需要显示 3 条、4 条甚至更多条边，该怎么做呢？

我们把数据改成下面这样试试：

```javascript
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 150,
    label: 'node1',
  }, {
    id: 'node2',
    x: 300,
    y: 150,
    label: 'node2'
  }],
  edges: [{
    	source: 'node1',
    	target: 'node2'
  	},
   {
   	 source: 'node2',
    	target: 'node1'
  	},
    {
   	 source: 'node2',
    	target: 'node1'
  	}
  ]
};
```

结果发现并不对。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9u0BTpCAn-4AAAAAAAAAAABkARQnAQ' width=345 />

## 解决方案

这个时候，需要借助 G6 的 [自定义边](/zh/docs/manual/advanced/custom-edge) 功能。

有了这个黑科技，什么样的需求，那还不是分分钟的事。

在使用「自定义边」前，需要明确两件事：

- **需要有个标识来区分两个节点之间是否超过一条同方向边**；
- **需要有一个值控制边的弯曲度，以防边重叠**。

因此，我们在每条边的数据中添加一个 `edgeType` 属性以区分不同的边。有了这个约定以后，就可以开始动手撸码了。

完善的自定义边的代码如下。

<iframe
     src="https://codesandbox.io/embed/restless-breeze-fhief?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="restless-breeze-fhief"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

至此，我们实现了让两个节点之间展示多条边的功能。
