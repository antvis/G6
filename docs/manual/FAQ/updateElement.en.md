---
title: Update Item's Style
order: 1
---

G6 提供了三种修改节点样式的方法。

#### 实例化Graph

实例化 Graph 时，可以通过在 `defaultNode` 或 `defaultEdge` 中指定 `**style**` 样式属性。

```javascript
const graph = new G6.Graph({
    container: "mountNode",
    width: 1000,
    height: 800,
    defaultNode: {
      shape: "circle",
      style: {
        fill: "#fff",
        fontSize: 14
      }
    },
    defaultEdge: {
      shape: "line-with-arrow",
      style: {
        fill: "#fff",
        fontSize: 14
      }
    }
  });
```

#### 数据中指定style
```javascript
const data = {
	nodes: [
    {
    	id: 'node1',
      label: 'node1',
      style: {
        fill: '#fff',
        fontSize: 12
      }
    }
  ]
}
```

#### 使用 update / updateItem

使用 `update` / `updateItem` 更新节点或边。

```javascript
graph.updateItem(node, {
  // 节点的样式
  style: {
  	stroke: 'blue'
  }
})
```

想要知道节点都支持哪些属性样式，请👉参数[节点支持的属性](/zh/docs/api/properties/NodeProperties)。
