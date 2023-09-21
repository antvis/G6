---
title: 图的交互 Behavior
order: 4
---

G6 封装了一系列交互方法，方便用户直接使用。本文将为 **Tutorial 案例** 增加简单的交互：点击节点、点击边、框选节点、放缩画布、拖拽画布。本节目标效果如下：

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kgrxQJnxNPoAAAAAAAAAAAAADmJ7AQ/original' width=500 alt='img' />

> 图 1 Tutorial 案例的交互效果。

## 基本概念

### 交互行为 Behavior

G6 中的交互行为。G6 **内置**了一系列交互行为，用户可以直接使用。简单地理解，就是可以一键开启这些交互行为：

- `drag-canvas`：拖拽画布；
- `zoom-canvas`：缩放画布。

更多详见：[交互行为 Behavior](https://g6-next.antv.antgroup.com/apis/interfaces/behaviors/activate-relations-options)

### 交互管理 Mode

Mode 是 G6 交互行为的管理机制，一个 mode 是多种行为 Behavior 的组合，允许用户通过切换不同的模式进行交互行为的管理。由于该概念较为复杂，在本入门教程中，读者不需要对该机制深入理解。如有需求，参见 [交互模式 Mode](https://g6-next.antv.antgroup.com/apis/interfaces/graph/i-graph)。

### 交互状态 State

状态是 G6 中的状态机制。用户可以为图中的元素（节点/边）设置不同的状态及不同状态下的样式。在状态发生变化时，G6 自动更新元素的样式。例如，可以为节点设置状态 `'click'` 为 `true` 或 `false`，并为节点设置 `'click'` 的样式为加粗节点边框。当 `'click'` 状态被切换为 `true` 时，节点的边框将会被加粗，`'click'` 状态被切换为 `false` 时，节点的样式恢复到默认。在下面的使用方法中，将会有具体例子。

## 使用方法

### 拖拽、缩放 —— 内置的交互行为

在 G6 中使用内置 Behavior 的方式非常简单，只需要在图实例化时配置 `modes`。为了包体积管理，部分内置交互没有提前注册到 Graph 上，需要如下注册方式：

```javascript
const { Graph: GraphBase, extend, Extensions } = G6;

const Graph = extend(GraphBase, {
  behaviors: {
    // 框选节点事内置交互，未提前注册，需要从 Extensions 中引入后如下注册：
    'brush-select': Extensions.BrushSelect,
  },
});
```

所有的内置交互可以在 [交互行为 Behavior](https://g6-next.antv.antgroup.com/apis/interfaces/behaviors/activate-relations-options) 查看，除了下面这戏鹅已经提前注册的交互，其他需要使用上面方式进行注册。

```javascript
// 已提前注册的交互
{
  'drag-canvas': DragCanvas, // 拖拽画布
  'zoom-canvas': ZoomCanvas, // 缩放画布
  'drag-node': DragNode, // 拖拽节点
  'drag-combo': DragCombo, // 拖拽 Combo
  'collapse-expand-combo': CollapseExpandCombo, // 展开/收起 Combo
  'collapse-expand-tree': CollapseExpandTree, // 展开/收起子树
  'click-select': ClickSelect, // 点击选择
}
```

```javascript
// 注意此处使用的是 exnted 返回的 Graph
const graph = new G6.Graph({
  // ...其他配置项
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'click-select', 'brush-select'], // 允许拖拽画布、放缩画布、拖拽节点、点选节点、框选节点
  },
});
```

除了直接使用内置交互名称外，也可以为 Behavior 配置参数，例如放缩画布的敏感度、最大/最小放缩程度等，具体用法参见  [交互行为 Behavior](https://g6-next.antv.antgroup.com/apis/interfaces/behaviors/zoom-canvas-options)。

上面代码中的 `modes` 定义了 G6 的模式，`default` 是默认的模式，还可以允许有其他的模式，比如：编辑模式 `edit` 等。不同的模式，用户能进行的行为可以不同，比如默认模式能拖拽画布，编辑模式不允许拖拽画布：

```javascript
// 举例解释不同模式
modes: {
  default: ['drag-canvas'],
  edit: []
}
```

### 定义交互状态样式

有时我们希望通过交互可以将元素样式变成特定样式，如我们看到的图 1 中，鼠标 hover 节点、点击节点、点击边时，样式发生了变化。这里涉及到了 G6 中状态的概念。简单地说，是否 `hover` 、`click` 、任何操作（可以是自己起的状态名），都可以称为一种状态（state）。用户可以自由设置不同状态下的元素样式。要达到交互更改元素样式，需要两步：

- Step 1: 设置各状态下的元素样式；
- Step 2: 监听事件并切换元素状态。

#### 设置各状态下的元素样式

在实例化图时，通过 `nodeState` 和 `edgeState` 两个配置项可以配置元素在不同状态下的样式。G6 预置了一些状态样式：'selected', 'highlight', 'active', 'inactive', 'disable'。在 'click-select' 和 'brush-select' 交互中默认触发的是节点和边的 'selected' 状态，因此在没有配置 `nodeState` 和 `edgeState` 的情况下，我们也可以看到有选中的状态样式响应。如果需要自定义状态样式，可以为 'click-select' 和 'brush-select' 配置 `selectedState` 为自定义的字符串，然后在图配置的 `nodeState` 和 `edgeState` 中配置对应的样式，例如：

```javascript
const graph = new Graph({
  // ...其他配置项
  // 节点状态样式
  nodeState: {
    // 自定义的状态名称
    customstatename1: {
      // 针对不同的图形进行配置
      keyShape: {
        lineWidth: 2,
        stroke: 'red',
      },
      labelShape: {
        fontWeight: 500,
      },
    },
    // 自定义的状态名称
    customstatename2: {
      keyShape: {
        lineDash: [2, 2],
        lineWidth: 4,
        stroke: 'blue',
      },
    },
  },
  // edgeState 同理
});
```

#### 监听事件并切换元素状态

除了内置的交互，您也可以在任意需要的使用调用 `graph.setItemState` 来设置元素的状态，例如在双击节点时：

```javascript
graph.on('node:dblclick', (e) => {
  graph.setItemState(e.itemId, 'customstatename1', true);
});
graph.on('canvas:click', (e) => {
  // 找到所有 customstatename1 状态下的节点 id
  const stateNodeIds = graph.findIdByState('node', 'customstatename1', true);
  // 批量取消状态
  graph.setItemState(stateNodeIds, 'customstatename1', false);
});
```

G6 中所有元素监听都挂载在图实例上，如下代码中的 `graph` 对象是 G6.Graph 的实例，`graph.on()`  函数监听了某元素类型（`node` / `edge`）的某种事件（`click` / `mouseenter` / `mouseleave` / ...。

```javascript
// 在图实例 graph 上监听
graph.on('元素类型:事件名', (e) => {
  // do something
});
```

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
        behaviors: {
          'brush-select': Extensions.BrushSelect,
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
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select', 'brush-select'],
        },
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
