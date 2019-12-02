---
title: 如何设置 Edge 前置
order: 6
---

### 问题
G6 3.x 中如何设置让 Edge 前置，即让 Edge 显示到最上面。

### 解决方案
G6 3.x中 edg e默认是在 node 的下面，所有 node 都在 nodeGroup 中，所有 edge 都在 edgeGroup 中，要改层级的话可以通过修改 group 的层级来实现：
```
 document.getElementById('changeView').addEventListener('click', (evt) => {
      const edge=graph.findById('edge1')
      const edgeGroup = graph.get('edgeGroup')
      edgeGroup.toFront()
      graph.paint()
    })
```

如果只想让单条边前置，可以这样：

```
document.getElementById('changeView').addEventListener('click', (evt) => {
      const edge=graph.findById('edge1')
      const nodeGroup = graph.get('nodeGroup')
      const edge1Group = edge.get('group')
      edge1Group.toFront()
      nodeGroup.toBack();
      graph.paint()
    })
```

详见[#issues 817](https://github.com/antvis/G6/issues/817)。
