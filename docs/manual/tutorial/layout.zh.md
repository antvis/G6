---
title: 使用图布局 Layout
order: 3
---

当数据中没有节点位置信息，或者数据中的位置信息不满足需求时，需要借助一些布局算法对图进行布局。G6 提供了 9 种一般图的布局和 4 种树图的布局：<br />**一般图：**

- Random Layout：随机布局；
- **Force Layout：经典力导向布局：**

  > 力导向布局：一个布局网络中，粒子与粒子之间具有引力和斥力，从初始的随机无序的布局不断演变，逐渐趋于平衡稳定的布局方式称之为力导向布局。适用于描述事物间关系，比如人物关系、计算机网络关系等。

- Circular Layout：环形布局；
- Radial Layout：辐射状布局；
- MDS Layout：高维数据降维算法布局；
- Fruchterman Layout：Fruchterman 布局，一种力导布局；
- Dagre Layout：层次布局。

**树图布局：**

- Dendrogram Layout：树状布局（叶子节点布局对齐到同一层）；
- CompactBox Layout：紧凑树布局；
- Mindmap Layout：脑图布局；
- Intended Layout：缩进布局。

各种布局方法的具体介绍及其配置参见 [Layout API](/zh/docs/api/layout/Layout)。本教程中，我们使用的是力导向布局 (Force Layout)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qnUwSZVjYOMAAAAAAAAAAABkARQnAQ' width=550 />

## 取消自动适配画布

我们在之前的教程里面，为了能够将超出画布的图适配到视野中，在实例化图时使用了 `fitView`  配置项。这节开始我们将会去掉这个特性。因为复杂的布局系统会打破适配的规则，反而会造成更多的困扰。让我们将相关的适配代码变为注释：

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

G6 使用布局的方式非常简单，在图实例化的时候，加上 layout 配置即可。下面代码在实例化图时设置了布局方法为 `type: 'force'`，即经典力导向图布局。并设置了参数 `preventOverlap: true` ，表示希望节点不重叠。力导向布局的更多配置项参见：[Layout API](/zh/docs/api/layout/Layout)。

```javascript
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'force',         // 指定为力导向布局
    preventOverlap: true,  // 防止节点重叠
    // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
  }
});
```

结果如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*w4ZfRJW3b5YAAAAAAAAAAABkARQnAQ' width=350 />

如图所示，节点按照力导向布局自动平衡。但是图中的节点过于拥挤，边上的文字信息被挤占，无法看清。我们希望布局计算边的距离可以更长一些。G6 的力导向布局提供了  `linkDistance` 属性用来指定布局的时候边的距离长度：

```javascript
const graph = new G6.Graph({
  // ...
  layout: {
    type: 'force',
    preventOverlap: true,
    linkDistance: 100, // 指定边距离为100
  },
});
```

结果如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AXrdQIm3oCIAAAAAAAAAAABkARQnAQ' width=350 />
<br />

> 不同布局之间、相同布局不同参数允许动态切换和过渡，具体参见：[布局切换](/zh/docs/manual/middle/layout/#布局的切换机制)。

提示：布局将在调用  `graph.render()` 时执行计算。

## 完整代码

至此，完整代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
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
              fill: '#fff',
            },
          },
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
          },
        },
        layout: {
          type: 'force', // 设置布局算法为 force
          linkDistance: 100, // 设置边长为 100
          preventOverlap: true, // 设置防止重叠
        },
      });
      const main = async () => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
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
              node.type = 'circle';
              break;
            }
            case 'c1': {
              node.type = 'rect';
              node.size = [35, 20];
              break;
            }
            case 'c2': {
              node.type = 'ellipse';
              node.size = [35, 20];
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

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span><br />若需更换数据，请替换  `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'`  为新的数据文件地址。
