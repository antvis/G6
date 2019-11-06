---
title: 自定义布局 Layout
order: 4
---

G6 提供了一般图和树图的一些常用布局，使用方式参见：中级教程 [使用布局 Layout](https://www.yuque.com/antv/g6/qopkkg)，[Layout API](https://www.yuque.com/antv/g6/agbmu2)。当这些内置布局无法满足需求时，G6 还提供了一般图的自定义布局的机制，方便用户进行更定制化的扩展。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;注意：</span>
树图暂时不支持自定义布局。

本文将会通过自定义 Bigraph 布局的例子讲解自定义布局。


## 自定义布局 API
G6 中自定义布局的 API 如下：
```javascript
/**
 * 注册布局的方法
 * @param {string} type 布局类型，外部引用指定必须，不要与已有布局类型重名
 * @param {object} layout 布局方法
 */
Layout.registerLayout = function(type, {
  /**
   * 定义自定义行为的默认参数，会与用户传入的参数进行合并
   */
  getDefaultCfg() {
    return {};
  },
  /**
   * 初始化
   * @param {object} data 数据
   */
  init(data) {},
  /**
   * 执行布局
   */
  execute() {},
  /**
   * 根据传入的数据进行布局
   * @param {object} data 数据
   */
  layout(data) {},
  /**
   * 更新布局配置，但不执行布局
   * @param {object} cfg 需要更新的配置项
   */
  updateCfg(cfg) {},
  /**
   * 销毁
   */
  destroy() {},
});
```


## 自定义布局
下面，我们将讲解如何自定义布局如下图的二分图 Bigraph。二分图只存在两部分节点之间的边，同属于一个部分的节点之间没有边。我们希望布局能够对两部分节点分别进行排序，减少边的交叉。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FksvTrdkqXgAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

该二分图数据如下，节点根据 `cluster` 字段分为 了 `'part1'` 和 `'part2'`，代表二分图的两部分。
```javascript
const data = {
  nodes: [
    { id: '0', label: 'A', cluster: 'part1' },
    { id: '1', label: 'B', cluster: 'part1'},
    { id: '2', label: 'C', cluster: 'part1' },
    { id: '3', label: 'D', cluster: 'part1' },
    { id: '4', label: 'E', cluster: 'part1' },
    { id: '5', label: 'F', cluster: 'part1' },
    { id: '6', label: 'a', cluster: 'part2'},
    { id: '7', label: 'b', cluster: 'part2' }, 
    { id: '8', label: 'c', cluster: 'part2' },
    { id: '9', label: 'd', cluster: 'part2' }
  ],
  edges: [
    { source: '0', target: '6' }, 
    { source: '0', target: '7' }, 
    { source: '0', target: '9' },
    { source: '1', target: '6' },
    { source: '1', target: '9' },
    { source: '1', target: '7' },
    { source: '2', target: '8' }, 
    { source: '2', target: '9' },
    { source: '2', target: '6' },
    { source: '3', target: '8' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '5', target: '9' }
  ]
};
```

### 需求分析
为了减少边的交叉，可以通过排序，将 `'part1'` 的节点 A 对齐到所有与 A 相连的 `'part2'` 中的节点的平均中心；同样将 `'part2'` 中的节点 a 对齐到所有与 a 相连的 `'part1'` 中的节点的平均中心。可以描述成如下过程：

- Step 1：为 `'part1'` 和 `'part2'` 的节点初始化随机序号 index，都分别从 0 开始；
- Step 2：遍历 `'part1'` 的节点，对每一个节点 A：
  - 找到与 A 相连的属于 `'part2'` 的节点的集合 ![](https://cdn.nlark.com/yuque/__latex/f6dc1bad88be668c4ac817b367ec9bbf.svg#card=math&code=set_A%0A&height=16&width=32)，加和 ![](https://cdn.nlark.com/yuque/__latex/f6dc1bad88be668c4ac817b367ec9bbf.svg#card=math&code=set_A%0A&height=16&width=32) 中所有节点的 index，并除以 ![](https://cdn.nlark.com/yuque/__latex/f6dc1bad88be668c4ac817b367ec9bbf.svg#card=math&code=set_A%0A&height=16&width=32) 的元素个数，得数覆盖 A 的 index 值：![](https://cdn.nlark.com/yuque/__latex/b2acdd6a9423b18105b6909ef4124618.svg#card=math&code=A.index%20%3D%20%5Cfrac%7B1%7D%7B%7Cset_A%7C%7D%5Csum_%7Ba%20%5Cin%20set_A%7D%7Ba.index%7D&height=48&width=234)
- Step 3：遍历 `'part1'` 的节点，对每一个节点 B（与 Step 2 相似）：
  - 找到与 B 相连的属于 `'part2'` 的节点的集合 ![](https://cdn.nlark.com/yuque/__latex/dc5ec10db72d3f1928fb51c6da59707a.svg#card=math&code=set_B%0A&height=16&width=32)，加和 ![](https://cdn.nlark.com/yuque/__latex/dc5ec10db72d3f1928fb51c6da59707a.svg#card=math&code=set_B%0A&height=16&width=32) 中所有节点的 index，并除以 ![](https://cdn.nlark.com/yuque/__latex/dc5ec10db72d3f1928fb51c6da59707a.svg#card=math&code=set_B%0A&height=16&width=32) 的元素个数，得数覆盖 B 的 index 值：![](https://cdn.nlark.com/yuque/__latex/2eb533abba4f4502e1bd524e1fb792e6.svg#card=math&code=B.index%20%3D%20%5Cfrac%7B1%7D%7B%7Cset_B%7C%7D%5Csum_%7Bb%20%5Cin%20set_B%7D%7Bb.index%7D&height=48&width=232)
- Step 4：两部分节点分别按照节点的序号 index 进行排序，最终按照节点顺序安排节点位置。

## 实现
下面代码展示了自定义名为 `'bigraph-layout'` 的二分图布局，完整代码参见：[自定义布局-二分图](https://antv.alipay.com/zh-cn/g6/3.x/demo/net/layout-custom-bigraph.html)。使用该布局的方式与使用内置布局方式相同，都是在实例化图时将其配置到 `layout` 配置项中，详见：[使用布局 Layout](https://www.yuque.com/antv/g6/qopkkg)。
```javascript
G6.registerLayout('bigraph-layout', {
  // 默认参数
  getDefaultCfg: function getDefaultCfg() {
    return {
      center: [0, 0],          // 布局的中心
      biSep: 100,              // 两部分的间距
      nodeSep: 20,             // 同一部分的节点艰巨
      direction: 'horizontal', // 两部分的分布方向
      nodeSize: 20             // 节点大小
    };
  },
  // 执行布局
  execute: function execute() {
    var self = this;
    var center = self.center;
    var biSep = self.biSep;
    var nodeSep = self.nodeSep;
    var nodeSize = self.nodeSize;
    var part1Pos = 0,
        part2Pos = 0;
    // 若指定为横向分布
    if (self.direction === 'horizontal') {
      part1Pos = center[0] - biSep / 2;
      part2Pos = center[0] + biSep / 2;
    }
    var nodes = self.nodes;
    var edges = self.edges;
    var part1Nodes = [];
    var part2Nodes = [];
    var part1NodeMap = new Map();
    var part2NodeMap = new Map();
    // separate the nodes and init the positions
    nodes.forEach(function(node, i) {
      if (node.cluster === 'part1') {
        part1Nodes.push(node);
        part1NodeMap.set(node.id, i);
      } else {
        part2Nodes.push(node);
        part2NodeMap.set(node.id, i);
      }
    });

    // 对 part1 的节点进行排序
    part1Nodes.forEach(function(p1n) {
      var index = 0;
      var adjCount = 0;
      edges.forEach(function(edge) {
        var sourceId = edge.source;
        var targetId = edge.target;
        if (sourceId === p1n.id) {
          index += part2NodeMap.get(targetId);
          adjCount++;
        } else if (targetId === p1n.id) {
          index += part2NodeMap.get(sourceId);
          adjCount++;
        }
      });
      index /= adjCount;
      p1n.index = index;
    });
    part1Nodes.sort(function(a, b) {
      return a.index - b.index;
    });
    
    // 对 part2 的节点进行排序
    part2Nodes.forEach(function(p2n) {
      var index = 0;
      var adjCount = 0;
      edges.forEach(function(edge) {
        var sourceId = edge.source;
        var targetId = edge.target;
        if (sourceId === p2n.id) {
          index += part1NodeMap.get(targetId);
          adjCount++;
        } else if (targetId === p2n.id) {
          index += part1NodeMap.get(sourceId);
          adjCount++;
        }
      });
      index /= adjCount;
      p2n.index = index;
    });
    part2Nodes.sort(function(a, b) {
      return a.index - b.index;
    });

    // 放置节点
    var hLength = part1Nodes.length > part2Nodes.length ? part1Nodes.length : part2Nodes.length;
    var height = hLength * (nodeSep + nodeSize);
    var begin = center[1] - height / 2;
    if (self.direction === 'vertical') {
      begin = center[0] - height / 2;
    }
    part1Nodes.forEach(function(p1n, i) {
      if (self.direction === 'horizontal') {
        p1n.x = part1Pos;
        p1n.y = begin + i * (nodeSep + nodeSize);
      } else {
        p1n.x = begin + i * (nodeSep + nodeSize);
        p1n.y = part1Pos;
      }
    });
    part2Nodes.forEach(function(p2n, i) {
      if (self.direction === 'horizontal') {
        p2n.x = part2Pos;
        p2n.y = begin + i * (nodeSep + nodeSize);
      } else {
        p2n.x = begin + i * (nodeSep + nodeSize);
        p2n.y = part2Pos;
      }
    });
  }
});
```

