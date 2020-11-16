---
title: 布局
order: 10
---

G6 3.1 内置了丰富的布局。关于如何使用 G6 中内置的布局，请参考  [图布局 API](/zh/docs/api/graphLayout/guide) 或 [树图布局 API](/zh/docs/api/treeGraphLayout/guide)。

### graph.layout()

重新以当前配置的属性进行一次布局。

**用法**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
  },
  modes: {
    default: ['drag-node'],
  },
});

graph.data({
  nodes: data.nodes,
  edges: data.edges.map((edge, i) => {
    edge.id = 'edge' + i;
    return Object.assign({}, edge);
  }),
});

graph.render();

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

graph.on('node:dragstart', (e) => {
  // 拖动节点时重新布局
  graph.layout();
  refreshDragedNodePosition(e);
});

graph.on('node:drag', (e) => {
  refreshDragedNodePosition(e);
});

graph.on('node:dragend', (e) => {
  e.item.get('model').fx = null;
  e.item.get('model').fy = null;
});
```

### graph.updateLayout(cfg)

更新布局配置项。

1. 如果参数 `cfg` 中含有 `type` 字段，`type` 字段类型为 String，且与现有布局方法不同，则更换布局；
1. 如果参数 `cfg` 中不包含 `type` 字段，则保持原有布局，仅更新布局配置项。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| cfg  | Object | true     | 新布局配置项 |

**用法**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
    center: [500, 300],
  },
  animate: true,
});
graph.data(data);
graph.render();

// 实例化时通过 layout 指定布局，在合适的时候通过 updateLayout 更新布局配置
graph.updateLayout({
  radius: 200,
  startAngle: Math.PI / 4,
  endAngle: Math.PI,
  divisions: 5,
  ordering: 'degree',
});
```

### destroyLayout()

销毁布局方法，在此之后调用 `changeData` 等方法将不会按照原有的布局算法进行布局。

**用法**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
    center: [500, 300],
  },
  animate: true,
});
graph.data(data);
graph.render();
graph.destroyLayout();
// 此时 changeData，若 data2 中的节点没有位置信息，将按照初始化计算方法被放置；若有位置信息，则按照该信息被放置
graph.changeData(data2);
```
