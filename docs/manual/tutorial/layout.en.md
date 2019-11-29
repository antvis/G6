---
title: Utilize Layout
order: 3
---

When there is no node position information in the data, or the location information does not meet the requirements, layouts in G6 will help you to arrange the nodes. There are 9 layouts for general graph and 4 layouts for tree graph in G6:

<br />**Layouts for General Graph:**

- Random Layout: Randomize the node positions;
- **Force Layout: Classical force-directed layout algorithm:** 
> In force-directed layout, items are simulated as physical particals with attractive force and repulsive force. Lead by the forces, the nodes will move to appropriate positions to balance the forces. It is suitable to describe the relationships between objects, e.g. relationships between person, computer networks.

- Circular Layout: Arrange the nodes on a circle;
- Radial Layout: Arrange the nodes radially;
- MDS Layout: Multidimensional scaling;
- Fruchterman Layout: A kind of force-directed layout;
- Dagre Layout: Hierarchical layout.

**Layouts for TreeGraph:**

- Dendrogram Layout;
- CompactBox Layout;
- Mindmap Layout;
- Intended Layout.

For more information about each layout algorithm, please refer to [Layout API](/en/docs/api/Layout). We will utilize Force Layout in the tutorial.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qnUwSZVjYOMAAAAAAAAAAABkARQnAQ' width=550 />

## Enable the fitView
我们在之前的教程里面，为了能够将超出画布的图适配到视野中，在实例化图时使用了 `fitView` 配置项。这节开始我们将会去掉这个特性。因为复杂的布局系统会打破适配的规则，反而会造成更多的困扰。让我们将相关的适配代码变为注释：
```javascript
const graph = new G6.Graph({
  // ...
  // fitView: true,
  // fitViewPadding: [ 20, 40, 50, 20 ]
});
```

## 默认布局
当实例化图时没有配置布局时：

- 若数据中节点有位置信息（`x` 和 `y`），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。

## 配置布局
G6 使用布局的方式非常简单，在图实例化的时候，加上 layout 配置即可。下面代码在实例化图时设置了布局方法为 `type: 'force'`，即经典力导向图布局。并设置了参数 `preventOverlap: true` ，表示希望节点不重叠。力导向布局的更多配置项参见：[Layout API](/zh/docs/api/Layout)。
```javascript
const graph = new G6.Graph({
  ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'force',         // 指定为力导向布局
    preventOverlap: true,  // 防止节点重叠
    // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
  }
});
```

结果如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*w4ZfRJW3b5YAAAAAAAAAAABkARQnAQ' width=350 />

如图所示，节点按照力导向布局自动平衡。但是图中的节点过于拥挤，边上的文字信息被挤占，无法看清。我们希望布局计算边的距离可以更长一些。G6 的力导向布局提供了 `linkDistance` 属性用来指定布局的时候边的距离长度：
```javascript
const graph = new G6.Graph({
  // ...
  layout: {
    type: 'force',
    preventOverlap: true,
    linkDistance: 100 // 指定边距离为100
  }
});
```

结果如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AXrdQIm3oCIAAAAAAAAAAABkARQnAQ' width=350 />
<br />![image.png]

> 不同布局之间、相同布局不同参数允许动态切换和过渡，具体参见：[布局切换](../middle/layout)。


 提示 <br />布局将在调用 `graph.render()` 时执行计算。

## 完整代码
至此，完整代码如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tutorial Demo</title>
</head>
<body>
<div id="mountNode"></div>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
<script>
  const graph = new G6.Graph({
    container: 'mountNode',
    width: 800,
    height: 600,
    defaultNode: {
      size: 30,
      labelCfg: {
        style: {
          fill: '#fff'
        }
      }
    },
    defaultEdge: {
      labelCfg: {
        autoRotate: true
      }
    },
    layout: {
      type: 'force',            // 设置布局算法为 force
      linkDistance: 100,        // 设置边长为 100
      preventOverlap: true,     // 设置防止重叠
    }
  });
  const main = async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
    );
    const remoteData = await response.json();
    
    const nodes = remoteData.nodes;
    const edges = remoteData.edges;
    nodes.forEach(node => {
      if (!node.style) {
        node.style = {};
      }
      node.style.lineWidth = 1;
      node.style.stroke = '#666';
      node.style.fill = 'steelblue';
      switch (node.class) {
        case 'c0': {
          node.shape = 'circle';
          break;
        }
        case 'c1': {
          node.shape = 'rect';
          node.size = [ 35, 20 ];
          break;
        }
        case 'c2': {
          node.shape = 'ellipse';
          node.size = [ 35, 20 ];
          break;
        }
      }
    });
    edges.forEach(edge => {
      if (!edge.style) {
        edge.style = {};
      }
      edge.style.lineWidth = edge.weight;
      edge.style.opacity = 0.6;
      edge.style.stroke = 'grey';
    });

    graph.data(remoteData);
    graph.render();
  };
  main();
</script>
</body>
</html>
```

**⚠️注意** <br />若需更换数据，请替换 `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` 为新的数据文件地址。

