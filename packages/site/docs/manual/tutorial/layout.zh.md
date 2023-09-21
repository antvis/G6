---
title: 使用图布局 Layout
order: 3
---

当数据中没有节点位置信息，或者数据中的位置信息不满足需求时，需要借助一些布局算法对图进行布局。G6 提供了 9 种一般图的布局和 4 种树图的布局。在 v4 中，它们需要分别使用的图结构数据和树图结构数据中。v5 将树图和图进行了融合，现在不论是树图还是图，都可以使用如下布局算法：

<br />**一般图：**

- Random Layout：随机布局；
- **Force Layout：经典力导向布局：**

  > 力导向布局：一个布局网络中，粒子与粒子之间具有引力和斥力，从初始的随机无序的布局不断演变，逐渐趋于平衡稳定的布局方式称之为力导向布局。适用于描述事物间关系，比如人物关系、计算机网络关系等。

- Circular Layout：环形布局；
- Radial Layout：辐射状布局；
- MDS Layout：高维数据降维算法布局；
- Fruchterman Layout：Fruchterman 布局，一种力导布局；
- Dagre Layout：层次布局；
- Concentric Layout：同心圆布局，将重要（默认以度数为度量）的节点放置在布局中心；
- Grid Layout：格子布局，将节点有序（默认是数据顺序）排列在格子上。

**树图布局：**

- Dendrogram Layout：树状布局（叶子节点布局对齐到同一层）；
- CompactBox Layout：紧凑树布局；
- Mindmap Layout：脑图布局；
- Indented Layout：缩进布局。

各种布局方法的具体介绍及其配置参见 [Layout API](https://g6-next.antv.antgroup.com/apis/interfaces/layout/force-layout-options)。本教程中，我们使用的是力导向布局 (Force Layout)。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lJdeTI0qQa8AAAAAAAAAAAAADmJ7AQ/original' width=550 alt='img' />

## 默认布局

当实例化图时没有配置布局时：

- 若数据中节点有位置信息（`x` 和 `y`），则按照数据的位置信息进行绘制；
- 若数据中节点没有位置信息，则默认使用 Grid Layout 进行布局。

## 配置布局

G6 使用布局的方式非常简单，在图实例化的时候，加上 layout 配置即可。下面代码在实例化图时设置了布局方法为 `type: 'force'`，即力导向图布局。同时开启了 `animated: true` 使得在力计算过程中实时渲染图，让用户可以观察到图上节点力相互作用产生的动画效果。并设置了参数 `preventOverlap: true` ，表示希望节点不重叠。力导向布局的更多配置项参见：[Layout API](https://g6-next.antv.antgroup.com/apis/interfaces/layout/force-layout-options)。

```javascript
const graph = new Graph({
  // ...                      // 其他配置项
  // Object，可选，布局的方法及其配置项，默认为 grid 布局。
  layout: {
    type: 'force', // 指定为力导向布局
    preventOverlap: true, // 防止节点重叠
    linkDistance: 50, // 边的理想长度
    // nodeSize: 30     // 节点大小，用于算法中防止节点重叠时的碰撞检测。默认将使用数据中的节点大小。
  },
});
```

结果如下：

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lJdeTI0qQa8AAAAAAAAAAAAADmJ7AQ/original' width=350 alt='img' />

> 不同布局之间、相同布局不同参数允许动态切换和过渡，具体参见：[布局切换](https://g6-next.antv.antgroup.com/examples/net/layoutMechanism/#layoutTranslate)。

提示：若图配置中有 data，则在实例化图后进行布局计算。若使用  `graph.read(data)` API 进行数据读取，则将在调用时执行计算。

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
    <div id="container"></div>
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/5.0.0-beta.10/dist/g6.min.js"></script>
    <script>
      const { Graph: GraphBase, extend, Extensions } = G6;

      // 自定义数据处理器 - 度数计算
      const degreeCalculator = (data, options, userGraphCore) => {
        const { edges, nodes } = data;
        const degreeMap = new Map();
        edges.forEach(({ source, target }) => {
          degreeMap.set(source, (degreeMap.get(source) || 0) + 1);
          degreeMap.set(target, (degreeMap.get(target) || 0) + 1);
        });
        nodes.forEach((node) => {
          node.data.degree = degreeMap.get(node.id) || 0;
        });
        return data;
      };

      // 自定义数据处理器 - 节点聚类
      const clusteringNodes = (data, options = {}, userGraphCore) => {
        if (!Algorithm?.labelPropagation) return;
        const clusteredData = Algorithm.louvain(data, false);
        const clusterMap = new Map();
        clusteredData.clusters.forEach((cluster, i) => {
          cluster.nodes.forEach((node) => {
            clusterMap.set(node.id, `c${i}`);
          });
        });
        data.nodes.forEach((node) => {
          node.data.cluster = clusterMap.get(node.id);
        });
        return data;
      };

      const Graph = extend(BaseGraph, {
        transforms: {
          'degree-calculator': degreeCalculator,
          'node-clustering': clusteringNodes,
        },
        nodes: {
          'triangle-node': Extensions.TriangleNode,
        },
      });

      const graph = new Graph({
        container: 'container',
        width: 1000,
        height: 1000,
        transforms: [
          'transform-v4-data',
          'degree-calculator',
          'node-clustering',
          {
            type: 'map-node-size',
            field: 'degree',
            range: [16, 60],
          },
        ],
        layout: {
          type: 'force',
          animated: true,
          linkDistance: 50,
        },
        theme: {
          type: 'spec',
          base: 'light',
          specification: {
            node: {
              dataTypeField: 'cluster',
            },
          },
        },
        node: (model) => {
          const { id, data } = model;
          let type = 'circle-node';
          if (data.degree === 2) type = 'rect-node';
          else if (data.degree === 1) type = 'triangle-node';

          const badgeShapes = {
            fontSize: 12,
            lod: 0,
          };

          if (data.degree > 10) {
            badgeShapes[0] = {
              color: '#F86254',
              text: 'Important',
              position: 'rightTop',
            };
          }
          if (data.degree > 5) {
            badgeShapes[1] = {
              text: 'A',
              textAlign: 'center',
              color: '#EDB74B',
              position: 'right',
            };
          }

          return {
            id,
            data: {
              ...data,
              type,
              labelShape: {
                position: 'bottom',
                text: id,
              },
              labelBackgroundShape: {},
              iconShape:
                data.degree <= 2
                  ? undefined
                  : {
                      img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                      fill: '#fff',
                      lod: 0,
                      fontSize: data.keyShape.r - 4,
                    },
              badgeShapes,
              animates: {
                update: [
                  {
                    fields: ['opacity'],
                    shapeId: 'haloShape',
                    states: ['selected', 'active'],
                  },
                  {
                    fields: ['lineWidth'],
                    shapeId: 'keyShape',
                    states: ['selected', 'active'],
                  },
                ],
              },
            },
          };
        },
        edge: {
          animates: {
            update: [
              {
                fields: ['opacity'],
                shapeId: 'haloShape',
                states: ['selected', 'active'],
              },
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
                states: ['selected', 'active'],
              },
            ],
          },
        },
      });

      const main = async () => {
        const response = await fetch(
          'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json',
        );
        const remoteData = await response.json();
        graph.read(remoteData);
      };

      main();
    </script>
  </body>
</html>
```

**⚠️ 注意:** <br /> 若需更换数据，请替换  `'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json'`  为新的数据文件地址。
