---
title: 元素及其配置
order: 2
---

图的元素特指图上的**节点** `Node` 和**边** `Edge` 。在上一章节中，我们已经将 **Tutorial 案例**的图绘制了出来，但是各个元素及其 `label`  在视觉上很简陋。本文通过将上一章节中简陋的元素美化成如下效果，介绍元素的属性、配置方法。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*46GdQaNFiVIAAAAAAAAAAABkARQnAQ' width=450 height=450  alt='img'/>

> 图 1  元素属性配置后的 **Tutorial 案例**。

## 基本概念

### 图的元素

图的元素特指图上的**节点** `Node` 和**边** `Edge` 。G6 内置了一系列 [内置的节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 和 [内置的边](/zh/docs/manual/middle/elements/edges/defaultEdge)，供用户自由选择。G6 不同的内置节点或不同的内置边主要区别在于元素的 [图形 Shape](/zh/docs/manual/middle/elements/shape/shape-keyshape)，例如，节点可以是圆形、矩形、图片等。

## 元素的属性

不论是节点还是边，它们的属性分为两种：

- **样式属性 `style`**：对应 Canvas 中的各种样式，在元素[状态 State](/zh/docs/manual/middle/states/state) 发生变化时，可以被改变；
- **其他属性**：例如图形类型（ `type`）、id（`id` ）一类在元素[状态 State](/zh/docs/manual/middle/states/state) 发生变化时不能被改变的属性。

例如，G6 设定 hover 或 click 节点，造成节点状态的改变，只能自动改变节点的**样式属性**（如 `fill`、`stroke` 等**）**，**其他属性**（如 `type`  等）不能被改变。如果需要改变其他属性，要通过  [graph.updateItem](/zh/docs/api/graphFunc/item#graphupdateitemitem-model-stack) 手动配置。**样式属性**是一个名为  `style`  的对象， `style` 字段与其他属性并行。

### 数据结构

以节点元素为例，其属性的数据结构如下：

```javascript
{
	id: 'node0',          // 元素的 id
  type: 'circle',       // 元素的图形
  size: 40,             // 元素的大小
  label: 'node0'        // 标签文字
  visible: true,        // 控制初次渲染显示与隐藏，若为 false，代表隐藏。默认不隐藏
  labelCfg: {           // 标签配置属性
    positions: 'center',// 标签的属性，标签在元素中的位置
    style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
      fontSize: 12      // 标签的样式属性，文字字体大小
      // ...            // 标签的其他样式属性
    }
  }
  // ...,               // 其他属性
  style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
    fill: '#000',       // 样式属性，元素的填充色
    stroke: '#888',     // 样式属性，元素的描边色
    // ...              // 其他样式属性
  }
}
```

边元素的属性数据结构与节点元素相似，只是其他属性中多了 `source` 和 `target` 字段，代表起始和终止节点的 `id`。<br />细化在图 1 中 **Tutorial 案例** 的视觉需求，我们需要完成：

- 视觉效果：
  - R1: 节点的描边和填充色，对应节点样式属性：`fill`，`stroke`；
  - R2: 节点上标签文本的颜色，对应节点其他属性：`labelCfg`；
  - R3: 边的透明度和颜色，对应边样式属性：`opacity`，`stroke`；
  - R4: 边上标签文本的方向和颜色，对应边其他属性：`labelCfg`；
- 数据与视觉映射：
  - R5: 根据数据中节点的 `class` 属性映射节点的形状，对应节点其他属性：`type`；
  - R6: 根据数据中边的 `weight` 属性映射边的粗细，对应边样式属性：`lineWidth`。

## 配置属性

在 G6 中，根据不同的场景需求，有 7 种配置元素属性的方式。这里，我们简单介绍其中的两种：

1. 实例化图时配置元素的全局属性；
2. 在数据中配置。

### 1. 实例化图时全局配置

**适用场景：**所有节点统一的属性配置，所有边统一的属性配置。<br />**使用方式：**使用图的两个配置项：

- `defaultNode`：节点在默认状态下的**样式属性**（`style`）和**其他属性**；
- `defaultEdge`：边在默认状态下的**样式属性**（`style`）和**其他属性**。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 由于是统一的配置，不能根据数据中的属性（如 `class`、`weight`）等值的不同进行个性化设置，因此只能满足 R1、R2、R3、R4 需求。达到如下效果：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bufdS75wcmMAAAAAAAAAAABkARQnAQ' width=450 height=450 alt='img' />

> 图 2  全局配置元素属性后的 **Tutorial 案例**。

<br />通过如下方式在实例化图时  `defaultNode` 和  `defaultEdge` ，可以完成上图效果：

```javascript
const graph = new G6.Graph({
  // ...                   // 图的其他配置
  // 节点在默认状态下的样式配置（style）和其他配置
  defaultNode: {
    size: 30, // 节点大小
    // ...                 // 节点的其他配置
    // 节点样式配置
    style: {
      fill: 'steelblue', // 节点填充色
      stroke: '#666', // 节点描边色
      lineWidth: 1, // 节点描边粗细
    },
    // 节点上的标签文本配置
    labelCfg: {
      // 节点上的标签文本样式配置
      style: {
        fill: '#fff', // 节点标签文字颜色
      },
    },
  },
  // 边在默认状态下的样式配置（style）和其他配置
  defaultEdge: {
    // ...                 // 边的其他配置
    // 边样式配置
    style: {
      opacity: 0.6, // 边透明度
      stroke: 'grey', // 边描边颜色
    },
    // 边上的标签文本配置
    labelCfg: {
      autoRotate: true, // 边上的标签文本根据边的方向旋转
    },
  },
});
```

### 2. 在数据中配置

**适用场景：**不同节点/边可以有不同的个性化配置。<br />因此，这种配置方式可以满足 R5、R6 需求。<br />**使用方式：**可以直接将配置写入数据文件；也可以在读入数据后，通过遍历的方式写入配置。这里展示读入数据后，通过遍历的方式写入配置。下面代码展示了如何遍历数据进行属性的配置：

```javascript
const nodes = remoteData.nodes;
nodes.forEach((node) => {
  if (!node.style) {
    node.style = {};
  }
  switch (
    node.class // 根据节点数据中的 class 属性配置图形
  ) {
    case 'c0': {
      node.type = 'circle'; // class = 'c0' 时节点图形为 circle
      break;
    }
    case 'c1': {
      node.type = 'rect'; // class = 'c1' 时节点图形为 rect
      node.size = [35, 20]; // class = 'c1' 时节点大小
      break;
    }
    case 'c2': {
      node.type = 'ellipse'; // class = 'c2' 时节点图形为 ellipse
      node.size = [35, 20]; // class = 'c2' 时节点大小
      break;
    }
  }
});

graph.data(remoteData);
```

运行结果如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JU6xRZLKCjcAAAAAAAAAAABkARQnAQ' width=450 height=450 alt='img' />

> 图 3

可以看到，图中有一些节点被渲染成了矩形，还有一些被渲染成了椭圆形。除了设置 `type` 属性之外，我们还覆盖了上文全局配置的节点的 `size` 属性，在矩形和椭圆的情况下，`size` 是一个数组；而在默认圆形的情况下，G6 将仍然读取全局配置的 `size` 属性为数字 `30`。也就是说，动态配置属性让我们既可以根据数据的不同配置不同的属性值，也可以有能力覆盖全局静态的属性值。

进一步地，我们尝试根据数据的比重不同，配置不一样边的粗细：

```javascript
// const nodes = ...

// 遍历边数据
const edges = remoteData.edges;
edges.forEach((edge) => {
  if (!edge.style) {
    edge.style = {};
  }
  edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
});

graph.data(remoteData);
```

结果如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*46GdQaNFiVIAAAAAAAAAAABkARQnAQ' width=450 height=450 alt='img' />

如图所示，边的粗细已经按照数据的比重成功渲染了出来，但是边原有的样式（透明度、颜色）却丢失了。这是因为我们提到过动态配置属性会覆盖全局配置属性，这里配置了 `style.lineWidth`，导致覆盖了全局的 `style` 对象。解决办法是将被覆盖的边的样式都移到动态配置里面来：

```javascript
const graph = new G6.Graph({
  // ...
  defaultEdge: {
    // 去掉全局配置的 style
    labelCfg: {
      // 边上的标签文本配置
      autoRotate: true, // 边上的标签文本根据边的方向旋转
    },
  },
});

// 遍历点数据
// const nodes = ...
// nodes.forEach ...

// 遍历边数据
const edges = remoteData.edges;
edges.forEach((edge) => {
  if (!edge.style) {
    edge.style = {};
  }
  edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
  // 移到此处
  edge.style.opacity = 0.6;
  edge.style.stroke = 'grey';
});

graph.data(remoteData);
graph.render();
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
    <div id="mountNode"></div>
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
    <!-- 4.x and later versions -->
    <!-- <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script> -->
    <script>
      const graph = new G6.Graph({
        container: 'mountNode',
        width: 800,
        height: 600,
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
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
      });
      const main = async () => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
        );
        const remoteData = await response.json();
        const nodes = remoteData.nodes;
        const edges = remoteData.edges;
        nodes.forEach((node) => {
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
        edges.forEach((edge) => {
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

**⚠️ 注意:** <br /> 若需更换数据，请替换  `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'`  为新的数据文件地址。
