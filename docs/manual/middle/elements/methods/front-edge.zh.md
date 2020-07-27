---
title: 如何设置 Edge 前置
order: 7
---

## 问题

G6 3.x 中如何设置让某些边前置，即让边显示在最上面，从而不被节点遮挡。

## 解决方案

G6 3.x 中默认所有边是在节点的下面，所有节点属于一个名为 `nodeGroup` 的[图形分组](/zh/docs/manual/advanced/keyconcept/graphics-group)，所有边属于名为 `edgeGroup` 的[图形分组](/zh/docs/manual/advanced/keyconcept/graphics-group)。可以通过修改图形分组的层级以**改变全体节点与全体边的层级**。在改变层级后，**必须调用 `graph.paint()` 以重新绘制图**。

```javascript
document.getElementById('changeView').addEventListener('click', (evt) => {
  const edgeGroup = graph.get('edgeGroup'); // 得到默认的边图形分组
  edgeGroup.toFront(); // 将边图形分组前置
  graph.paint(); // 必须调用以重绘
});
```

如果只想让**单条边前置**，首先需要在实例化图时通过 `groupByTypes: false` 关闭按照元素类型分组。此时，节点和边的绘制顺序与它们的生成顺序相关。然后，在需要改变层级的地方使用 `toFront()` 和 `toBack()` 调整每个元素的层级。在改变层级后，**必须调用 `graph.paint()` 以重新绘制图**。

```javascript
const graph = new G6.Graph({
  // ... 其他实例化图的配置项
  groupByTypes: false, // 关闭按照元素类型进行分组
});
document.getElementById('changeView').addEventListener('click', (evt) => {
  const edge = graph.findById('edge1'); // 根据边的 id 查找边实例
  const node = graph.findById('node1'); // 根据节点的 id 查找节点实例
  edge.toFront(); // 将该边放置在所有图形的最前面
  node.toBack(); // 将该节点放置在所有图形的最后面
  graph.paint(); // 必须调用以重绘
});
```

详见 <a href='https://github.com/antvis/G6/issues/817' target='_blank'>#issues 817</a>。
