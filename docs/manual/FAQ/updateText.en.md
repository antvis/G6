---
title: Update Label
order: 0
---

在 G6 中，可以通过以下三种方式更新文本样式。

#### 实例化Graph
实例化Graph时，可以通过在defaultNode或defaultEdge中指定**labelCfg**属性修改文本的样式。

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

#### 数据中指定labelCfg

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

#### 使用update/updateItem

使用update/updateItem更新节点或边时，也可以更新节点或边上的文本。

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

想知道文本都可以设置哪些属性，请👉参考[文本属性样式](/zh/docs/api/properties/TextProperties)。
