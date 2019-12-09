---
title: 如何更新文本样式
order: 0
---

在 G6 中，可以通过以下三种方式更新文本样式。

#### 实例化 Graph
实例化 Graph 时，可以通过在 `defaultNode` 或 `defaultEdge` 中指定 `labelCfg` 属性修改文本的样式。

```javascript
const graph = new G6.Graph({
    container: "mountNode",
    width: 1000,
    height: 800,
    defaultNode: {
      shape: "node",
      labelCfg: {
        style: {
          fill: "#fff",
          fontSize: 14
        }
      }
    },
    defaultEdge: {
      shape: "line-with-arrow",
      labelCfg: {
        style: {
          fill: "#fff",
          fontSize: 14
        }
      }
    }
  });
```

#### 数据中指定 labelCfg

```javascript
const data = {
	nodes: [
    {
    	id: 'node1',
      label: 'node1',
      labelCfg: {
      	style: {
        	fill: '#fff',
          fontSize: 12
        }
      }
    }
  ]
}
```

#### 使用 update/updateItem

使用 `update/updateItem` 更新节点或边时，也可以更新节点或边上的文本。

```javascript
graph.updateItem(node, {
  // 节点的样式
  style: {
  	stroke: 'blue'
  },
  // 节点上文本的样式
	labelCfg: {
  	style: {
    	fill: '#fff',
      fontSize: 12
    }
  }
})
```

想知道文本都可以设置哪些属性，请参考 [节点上的文本属性](/zh/docs/manual/middle/elements/nodes/defaultNode/#标签文本-label-及其配置-labelcfg) 或 [边上的文本属性](/zh/docs/manual/middle/elements/edges/defaultEdge/#标签文本-label-及其配置-labelcfg)。
