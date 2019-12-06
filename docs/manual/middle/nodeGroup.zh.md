---
title: 节点分组 Group
order: 8
---

> New Feature：自 G6 3.1.2 开始支持自定义节点分组的标题了，可以渲染带有标题的分组。


对于熟悉图可视化类库的用户来说，节点分组可能是比较实用的一个功能。自 G6 3.0.5 版本开始，G6 加入了节点分组的功能，详情参考 <a href='/zh/examples/interaction/nodeGroup' target='_blank'>Demo</a>。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G1OBSJf672QAAAAAAAAAAABkARQnAQ' width=400/>

### 数据结构
新增节点分组功能时，尽量保持了 G6 数据结构的稳定性。为了体现分组的特性，我们在 nodes 数据项中加入了 groupId 属性，另外新增了 groups 字段，用于表示数据中所包括的分组及各分组之间的层级关系。

当 groups 中的对象包括 title 属性字段时，表示要渲染带有标题的分组，title 字段的类型可以是 string 或 object：

- title：类型为 string 时，值表示标题名称，不能设置任何样式，也不能调整标题位置；
- title 为 object 时，可以设置标题的样式及位置，title 中各字段含义：
  - text：必选，分组的标题，类型为 string；
  - offsetX：可选，默认为 0，表示 x 方向上的偏移量；
  - offsetY：可选，默认为 0，表示 y 方向上的偏移量；
  - stroke：字体边框颜色，同时也支持 fill、fontSize 等所有的 [节点上的文本样式属性](/zh/docs/manual/middle/elements/nodes/defaultNode/#标签文本-label-及其配置-labelcfg)。



```javascript
{
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      groupId: 'group1',
      x: 100,
      y: 100
    },
    {
      id: 'node2',
      label: 'node2',
      groupId: 'group1',
      x: 150,
      y: 100
    },
    {
      id: 'node3',
      label: 'node3',
      groupId: 'group2',
      x: 300,
      y: 100
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    }
  ],
  groups: [
    {
      id: 'group1',
      title: {
      	text: '第一个分组',
        stroke: '#444',
        offsetX: 0,
        offsetY: 0
      },
      parentId: 'p1'
    },
    {
      id: 'group2',
      parentId: 'p1'
    },
    {
      id: 'p1'
    }
  ]
}
```

### 如何渲染 group
当 nodes 中存在 `groupId` 属性字段时，在渲染过程中，G6 就会自动去渲染分组，当存在 groups 属性时，G6 就会自定去判断各分组之间的层级关系，并渲染出嵌套的分组。但当没有使用任何布局的时候，需要在 nodes 中指定各个阶段的坐标信息，即阶段的 `x` 和 `y` 属性值。

```javascript
const data = {
  nodes: [
    {
      id: 'node6',
      groupId: 'group3',
      label: 'rect',
      x: 100,
      y: 300
    },
    {
      id: 'node1',
      label: 'fck',
      groupId: 'group1',
      x: 100,
      y: 100
    },
    {
      id: 'node9',
      label: 'noGroup1',
      groupId: 'p1',
      x: 300,
      y: 210
    },
    {
      id: 'node2',
      label: 'node2',
      groupId: 'group1',
      x: 150,
      y: 200
    },
    {
      id: 'node3',
      label: 'node3',
      groupId: 'group2',
      x: 300,
      y: 100
    },
    {
      id: 'node7',
      groupId: 'p1',
      label: 'node7-p1',
      x: 200,
      y: 200
    },
    {
      id: 'node10',
      label: 'noGroup',
      groupId: 'p2',
      x: 300,
      y: 210
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    }
  ],
  groups: [
    {
      id: 'group1',
      title: {
      	text: '第一个分组',
        stroke: '#444',
        offsetX: -30,
        offsetY: 30
      },
      parentId: 'p1'
    },
    {
      id: 'group2',
      parentId: 'p1'
    },
    {
      id: 'group3',
      parentId: 'p2'
    },
    {
      id: 'p1'
    },
    {
      id: 'p2'
    }
  ]
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  pixelRatio: 2,
  modes: {
    default: [ 'drag-canvas' ]
  },
  defaultNode: {
    shape: 'circleNode'
  },
  defaultEdge: {
    color: '#bae7ff'
  }
});

graph.data(data);
graph.render();
```

渲染的效果如下图所示：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iftmRrdqR7cAAAAAAAAAAABkARQnAQ' width=400/><br />此时，不能对分组中的节点及分组进行任何操作，接下来，我们介绍可以对分组进行的各种操作。

### 操作分组
只是简单地将分组渲染出来，并没有多大的实用价值，只有支持一系列的交互操作后，才能最大程度地体现分组的价值。

在 G6 中，我们内置了 `drag-group`、`collapse-expand-group` 及  `drag-node-with-group`  三个 [Behavior](/zh/docs/manual/middle/states/defaultBehavior)，共支持以下的交互行为：

- 拖动分组；
- 通过拖拽，动态改变分组中的节点数量及分组大小；
- 将一个分组从父分组中拖拽出来，并取消分组直接的关联关系，动态改变父分组的大小；
- 双击分组，收起和展开分组：
  - 当收起分组后，与分组节点中的连线会自动连到分组上；
  - 展开分组后，恢复之前的连接和位置。
- 拖动节点，所在的分组高亮，当拖到其他分组时，其他分组高亮；
- [暂不支持] ~~将分组拖入到另外个分组，并改变分组层级的所属关系~~。

#### drag-group
`drag-group` Behavior，支持拖动分组，拖动分组过程中，会动态改变分组中节点和边的位置，在拖拽完成以后，保持分组和节点的相对位置不变。

#### collapse-expand-group
`collapse-expand-group` Behavior，支持双击分组收起和展开分组，收起分组以后，隐藏分组中的所有节点，外部节点和分组中节点有连线的情况下，所有连接会连接到分组上面。

优化目前只支持双击交互，正式发布时，会支持用户自定义交互方式，来实现分组的收起和展开。

#### drag-node-with-group
`drag-node-with-group` Behavior 和 `drag-node` 类似，但该 Behavior 仅用于用 group 时 node 的拖拽。拖拽 node 过程中，会动态改变 node 所在的分组。

优化目前暂不支持将多个节点拖出拖入到分组中。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  pixelRatio: 2,
  modes: {
    default: [ 'drag-group', 'collapse-expand-group', 'drag- node-with-group' ]
  },
  defaultNode: {
    shape: 'circleNode'
  },
  defaultEdge: {
    color: '#bae7ff'
  }
});
```

将这三个内置提供的 Behavior 加入到 `modes` 中以后的效果如下图所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VsMbRqOJe2sAAAAAAAAAAABkARQnAQ' width=400/>

### 适用场景

1. 风控、反洗钱、保险骗保、网络诈骗、信用卡诈骗等场景下团伙分析；
2. 特征分析：同一个分组中的节点在某些特征上面比较相似；
3. 整理节点：当类似的节点放到一个分组中，只渲染分组，不渲染节点，减少干扰元素。

