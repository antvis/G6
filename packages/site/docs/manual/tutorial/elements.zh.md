---
title: 元素及其配置
order: 2
---

图的元素特指图上的**节点** `Node` 、**边** `Edge` 和**节点分组** `Combo`。在上一章节中，我们已经将 **Tutorial 案例**的图绘制了出来，但是各个元素及其 `label`  在视觉上很简陋。本文通过将上一章节中简陋的元素美化成如下效果，介绍元素的属性、配置方法。

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K3ADTJct0o4AAAAAAAAAAAAADmJ7AQ/original' width=450 height=450  alt='img'/>

> 图 1  元素属性配置后的 **Tutorial 案例**。

## 基本概念

### 图的元素

图的元素特指图上的**节点** `Node` 、**边** `Edge` 和**节点分组** `Combo`。G6 内置了一系列 [内置的节点](https://g6-next.antv.antgroup.com/examples#item-defaultNodes)，供用户自由选择。

## 元素的属性

不论是节点还是边，它们的属性分为两种：

- **图形样式属性**：对应 Canvas 中的各种样式，在元素状态发生变化时，可以被改变；
- **其他属性**：例如图形类型（`type`）、id（`id`）、位置（`x`，`y`）一类在元素状态发生变化时不能被改变的属性。

例如，G6 设定 hover 或 click 节点时，一般会通过在事件监听中调用 Graph 的设置状态 API `graph.setItemState` 来使节点进入某个状态，e.g. 选中状态。此时节点应当让上一定的样式变化来让响应选中状态。这只能自动改变节点的**图形样式属性**（如 `keyShape` 中的 `fill`、`stroke` 等**）**，**其他属性**（如 `type`  等）不能被改变。如果需要改变其他属性，需要更新数据 `graph.updateData`。**图形样式属性**存储在节点/边/ combo 的配置的 `xxxShape` 对象中，对应了不同图形的样式。

### 数据结构

以节点元素为例，其属性的数据结构如下：

```javascript
{
	id: 'node0',            // 元素的 id
  data: {
    x: 100,               // 节点位置，若 graph 未配置 layout，且数据中所有的节点数据都有 x y 信息，则使用该信息绘制节点位置
    y: 100,
    type: 'circle-node',  // 元素的图形。相比于 v4 多了 -node 后缀
    label: 'node0'        // 标签文字
    keyShape: {           // 主图形的样式属性
      r: 20               // 主图形的大小，如果是 rect-node 则是 width、height 控制
      fill: '#000',       // 主图形的填充色
      stroke: '#888',     // 主图形的描边色
      // ...              // 主图形的其他样式属性
    },
    labelShape: {
      positions: 'center',  // 标签的属性，标签在元素中的位置
      text: 'node-xxx-label'// 元素标签的文本，若不配置则使用 data.label 填充
      fontSize: 12          // 标签的样式属性，文字字体大小
      // ...                // 标签的其他样式属性
    }
    // ...,               // 其他属性
  },
}
```

边元素的属性数据结构与节点元素相似，只是和 `id` 及 `data` 同级的还有 `source` 和 `target` 字段，代表起始和终止节点的 `id`。<br />细化在图 1 中 **Tutorial 案例** 的视觉需求，我们需要完成：

- 视觉效果：
  - R1: 设置不同的节点类型，`'circle-node'`，`'rect-node'`，`'triangle-node'`；
  - R2: 绘制节点的 icon 和徽标，对应属性：`iconShape`，`badgeShapes`；
  - R3: 边上的箭头，对应边属性：`keyShape.endArrow`；
- 数据与视觉映射：
  - R5: 将节点进行聚类，并根据类别映射节点的颜色，对应属性：`keyShape.fill`；
  - R6: 根据节点的度树，映射到节点的大小上，对应属性：`keyShape.r`

## 配置属性

在 G6 中，根据不同的场景需求，有多种配置元素属性的方式。这里，我们介绍在实例化图时进行元素的配置，相比于 v4 graph 上只能配置静态的全局属性，v5 支持了 JSON Spec 属性映射和函数映射的配置方式：

### 1. 实例化图时的 JSON Spec 配置方式

**适用场景：**所有节点统一的属性配置，所有边统一的属性配置。<br />**使用方式：**使用图的两个配置项：

- `node`：节点在默认状态下的**图形样式属性**和**其他属性**；
- `edge`：边在默认状态下的**图形样式属性**和**其他属性**。

```javascript
const graph = new G6.Graph({
  // ...                   // 图的其他配置
  // 节点在默认状态下的图形样式配置和其他配置
  node: {
    type: 'circle-node',
    keyShape: {
      r: 16, // 节点大小
      fill: '#4089FF', // 节点填充色
    }
    // 节点上的标签文本配置
    labelShape: {
      // 所有样式都支持如下的映射，表示根据数据 model.data 中的 label 字段，使用 formatter 返回的结果
      text: {
        fields: ['label'],
        formatter: model => model.data.label
      }
      fill: '#000', // 节点标签文字颜色
    },
    // 节点的动画配置
    animates: {
      // 数据/状态更新时
      update: [{
        shapeId: 'haloShape', // 背景光晕图形
        states: ['selected', 'active'] // 在 selected 和 active 状态变更时
        fields: ['opacity'],  // 在透明度变化时，带动画地变化
      }, {
        shapeId: 'keyShape', // 主图形
        states: ['selected', 'active'] // 在 selected 和 active 状态变更时
        fields: ['lineWidth'], // 在描述边粗细变化时，带动画地变化
      }]
    }
  },
  // 边在默认状态下的样式配置（style）和其他配置
  edge: {
    // ...                 // 边的其他配置
    // 边样式配置
    type: 'line-edge',
    keyShape: {
      opacity: 0.6, // 边主图形的透明度
      stroke: 'grey', // 边主图形描边颜色
    },
    // 边上的标签文本配置
    labelShape: {
      autoRotate: true, // 边上的标签文本根据边的方向旋转
    },
    // 边的动画配置
    animates: {
      // 数据/状态更新时
      update: [{
        shapeId: 'haloShape', // 背景光晕图形
        states: ['selected', 'active'] // 在 selected 和 active 状态变更时
        fields: ['opacity'],  // 在透明度变化时，带动画地变化
      }, {
        shapeId: 'keyShape', // 主图形
        states: ['selected', 'active'] // 在 selected 和 active 状态变更时
        fields: ['lineWidth'], // 在描述边粗细变化时，带动画地变化
      }]
    }
  },
});
```

### 2. 实例化图时的函数映射配置方式

**适用场景：**不同节点/边可以有不同的个性化配置。更加灵活。<br />**使用方式：**

在看函数映射代码之前，我们知道原始数据的每个节点比较简单：

```
 { "id": "0", "data": { "label": "0" } },
 { "id": "1", "data": { "label": "1" } },
```

一般图中度数（一跳邻居数量）越大的节点，越重要。我们可以用节点大小来表达这个信息。同时，若度数大到一定程度，还可以用更多额外的图形凸显其地位。我们可以通过数据处理器，提前计算节点的度数，

```javascript
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
```

另外，我们希望可以用颜色表示节点的类别，如果数据中有表示节点类别的字段，后续可以直击诶使用。在这个例子中，我们利用 @antv/algorithm 提供的聚类算法，根据图结构计算节点聚类。同样把它写成一个数据处理器：

```javascript
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
```

然后这些数据处理器注册到 G6 的 Graph 中：

```javascript
import { Graph as GraphBase, extend, Extensions } from '@antv/g6';
const Graph = extend(GraphBase, {
  transforms: {
    'degree-calculator': degreeCalculator,
    'node-clustering': clusteringNodes,
  },
  nodes: {
    // 需要注意，为包体积管理，G6 只默认注册了 circle-node 和 rect-node，其他内置或自定义节点类型需要从 Extensions 引入并通过如下方式注册
    'triangle-node': Extensions.TriangleNode,
  },
});
```

这样，我们就可以在实例化图的时候，将这个数据处理器配置到图上。当数据进入 Graph 时，将会通过该数据处理器产出带有 degree 信息的数据：

```javascript
const graph = new Graph({
  // 注意这里使用的是 extend 返回的 Graph
  // ... 其他 graph 配置
  transforms: [
    'transform-v4-data', // 内置提供的转换器，将 v4 格式数据转换为 v5 格式
    'degree-calculator', // 自定义的数据处理器，计算节点的度数存储到 data.degree 中
    'node-clustering', // 自定义的数据处理器，将聚类结果存储到节点的 data.cluster 字段上，方便后续主题模块使用
    {
      // 内置提供的节点大小映射器，将 field 指定的字段（这里指定了上一个处理器产生的 degree 字段）的值，映射到节点大小上，节点大小归一化到 16 ～ 60
      type: 'map-node-size',
      field: 'degree',
      range: [16, 60],
    },
  ],
});
```

现在，数据进入 Graph 后，将依次经过 `transform` 指定的数据处理器，产出的内部流转数据的每一个节点都会存在一些计算得出的字段，例如：

```
 { "id": "0", "data": { "label": "0", degree: 1, cluster: 'c0' } },
 { "id": "1", "data": { "label": "1", degree: 3, cluster: 'c4' } },
```

然后我们在节点的函数映射配置中，可以使用这些字段值：

```javascript
const graph = new G6.Graph({
  // ...其他配置项
  // transforms: ...
  // edge: ...
  // graph 配置项中的 node
  node: (model) => {
    // model 是该节点用户输入数据，在 transform 作用后的、在 G6 内部流转的数据
    const { id, data } = model;
    // 根据数据中的 degree 字段，使用不同的节点类型
    let type = 'circle-node';
    if (data.degree === 2) type = 'rect-node';
    else if (data.degree === 1) type = 'triangle-node';

    // 徽标图形
    const badgeShapes = {
      fontSize: 12,
      lod: 0,
    };
    // 根据 degree 字段，增加不同的徽标
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
        // 注意必须复制 data 到此处，否则可能丢失数据中的其他属性
        ...data,
        type,
        // 文本图形样式
        labelShape: {
          position: 'bottom',
          text: id,
        },
        // 文本背景样式，不为 undefined 就代表在有文本时，出现背景图形。其中还可以配置更多的样式属性，例如 fill 填充色、padding 等
        labelBackgroundShape: {},
        // icon 图形，degree < 2 的节点不展示 icon
        iconShape:
          data.degree <= 2
            ? undefined
            : {
                img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                fill: '#fff',
                lod: 0,
                fontSize: data.keyShape.r - 4,
              },
        // 徽标图形
        badgeShapes,
        // 动画配置
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
});
```

在上面的函数映射中，使用了 degree。cluster 可以被使用的 v5 全新提供的主题模块 theme 中，只需要在 graph 上简单配置：

```typescript
const graph = new Graph({
  // ... 其他图配置
  // transforms: ...
  // node: ...
  // edge: ...
  // 主题配置
  theme: {
    type: 'spec',
    base: 'light', // 白色主题
    specification: {
      node: {
        // 节点颜色映射 data.cluster 字段
        dataTypeField: 'cluster',
      },
    },
  },
});
```

以上，我们在图实例化时增加了四个配置：`transform`，`theme`，`node`，`edge`。运行结果如下：

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K3ADTJct0o4AAAAAAAAAAAAADmJ7AQ/original' width=450 height=450 alt='img' />

> 图 3

可以看到，图中节点根据度数不同，被渲染成了圆形、矩形、三角形。且度数被映射到了节点大小上。颜色映射到了节点类别上。同理，我们也可以对边做各种样式映射的处理。这里不一一赘述。

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
