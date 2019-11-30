---
title: 显示与隐藏
order: 5
---
## 节点与边的显示/隐藏

使用下面四个函数可以实现节点与边的显示/隐藏：
```javascript
// 显示节点实例 nodeItem，该节点的 visible 属性值在该方法调用后被置为 true
nodeItem.show();

// 隐藏节点实例 nodeItem，该节点的 visible 属性值在该方法调用后被置为 false
nodeItem.hide();

// 显示边实例 edgeItem，该边的 visible 属性值在该方法调用后被置为 true
edgeItem.show();

// 隐藏边实例 edgeItem，该边的 visible 属性值在该方法调用后被置为 false
edgeItem.hide();
```

## 示例
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N96mRKpyYZIAAAAAAAAAAABkARQnAQ' width=150/> 

该示例摘取了元素显示/隐藏的相关操作部分，通过鼠标监听对节点、边、画布的点击事件，显示和隐藏元素：
```javascript
// 鼠标点击节点，隐藏该节点
graph.on('node:click', ev => {
  const node = ev.item;
  console.log('before hide(), the nodevisible = ', node.get('visible'));
  node.hide();
  graph.paint();
  console.log('after hide(), the node visible = ', node.get('visible'));
});

// 鼠标点击边，隐藏该边
graph.on('edge:click', ev => {
  const edge = ev.item;
  console.log('before hide(), the edge visible = ', edge.get('visible'));
  edge.hide();
  graph.paint();
  console.log('after hide(), the edge visible = ', edge.get('visible'));
});

// 鼠标点击画布，显示所有节点和边
graph.on('canvas:click', ev => {
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  nodes.forEach(node => {
    node.show();
  });
  edges.forEach(edge => {
    edge.show();
  });
  graph.paint();
});
```
