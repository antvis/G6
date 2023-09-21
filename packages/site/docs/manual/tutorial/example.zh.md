---
title: 绘制 Tutorial 案例
order: 1
---

本文将进行 **Tutorial 案例**的简单绘制和配置。通过本文，你将知道创建一般图时一些常用的配置项及其作用。

## 基础绘制

### 创建容器

需要在 HTML 中创建一个用于容纳 G6 绘制的图的容器，通常为 `div`  标签。G6 在绘制时会在该容器下追加 `canvas` 标签，然后将图绘制在其中。

```html
<body>
  <div id="container"></div>

  <!-- 引入 G6 -->
  <!-- ... -->
</body>
```

### 数据准备

引入 G6 的数据源为 JSON 格式的对象。v5 的数据格式与 v4 有所不同，详见[如何升级-数据格式变更](https://g6-next.antv.antgroup.com/manual/upgrade#1%EF%B8%8F%E2%83%A3-%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E5%8F%98%E6%9B%B4)。v5 也提供了 v4 数据的转换处理器，在下面图配置中将进行讲解。

数据中需要有节点（`nodes`）和边（`edges`）字段，分别用数组表示：

```javascript
const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // string | number, 该节点存在则必须，节点的唯一标识
      data: {
        // 存放一些业务属性，或特殊的节点配置
        name: 'Circle1',
      },
    },
    {
      id: 'node2', // string | number, 该节点存在则必须，节点的唯一标识
      data: {
        // 存放一些业务属性，或特殊的节点配置
        name: 'Circle2',
      },
    },
  ],
  // 边集
  edges: [
    {
      id: 'edge1',
      source: 'node1', // string | number, 必须，起始点 id
      target: 'node2', // string | number, 必须，目标点 id
      data: {}, // 存放一些业务属性，或特殊的边配置
    },
  ],
};
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span>

- `nodes` 数组中包含节点对象。每个节点对象中唯一的、必要的 `id` 以标识不同的节点，`x`、 `y` 指定该节点的位置；
- `edges` 数组中包含边对象。`source` 和 `target` 是每条边的必要属性，分别代表了该边的起始点 `id` 与 目标点 `id`。

### 图实例化

图实例化时，至少需要为图设置容器。若您使用的是 G6 v4 的图数据格式，可以在实例化图时配置 `transforms: ['transform-v4-data']`，`'transform-v4-data'` 是 G6 v5 的内置数据转换器，G6 将在读取数据后，将 v4 数据格式化 v5 要求的格式

```javascript
// const data = { ... }
const graph = new G6.Graph({
  container: 'constainer', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 800, // number，图的宽度，不指定则使用容器宽度
  height: 500, // number，图的高度，不指定则使用容器高度
  // transforms: ['transform-v4-data'] //
});
```

### 图的渲染

```javascript
// const initData = { ... }
//  const graph = ...
graph.read(data); // 加载数据
```

### 绘制结果

调用 `graph.read(data)` 方法之后，G6 会根据加载的数据进行图的绘制。结果如下：

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1ejjTYxD94QAAAAAAAAAAAAADmJ7AQ/original' width=400 alt='img' />

## 真实数据加载

上文中，我们使用了仅含有两个节点和一条边的数据，直接将数据定义放在了代码中。而真实场景的数据通常是远程接口请求加载的。为了方便，我们已经给读者准备好了一份 JSON 数据文件，地址如下：<br />`https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json`

### 加载远程数据

修改 index.html，通过 `fetch` 函数异步加载远程的数据源，并传入 G6 的图实例中：

```javascript
<script>
  //  const graph = ...
  const main = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json',
    );
    const remoteData = await response.json();

    // ...
    graph.read(remoteData); // 加载远程数据
  };
  main();
</script>
```

> `fetch` 函数允许我们发起网络请求，加载数据，而其异步的过程可以通过 async/await 进行更合理的控制。这里我们为了方便起见，将主要逻辑放在了 `main` 函数里面。如果读者对 `fetch` 和 `async`/`await` 的知识有疑问，可以参考：<a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' target='_blank'>async function</a>，<a href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' target='_blank'>Fetch API</a>

运行后，我们得到了下图结果：

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WmGnQKAbmtsAAAAAAAAAAAAADmJ7AQ/original' width=550 alt='img' />

乍看之下，图像有点奇怪，实际上数据已经正确的加载了进来。由于数据量比较大，节点和边都非常的多，默认使用了网格布局看不出节点的连接关系。接下来，我们将使用更多图的配置项使数据更清晰好看。

## 常用配置

本文使用到的配置以及后续 Tutorial 将会使用到到常用配置如下：

| 配置项     | 类型              | 选项 / 示例                                                                                  | 默认 | 说明                                                                                             |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------ |
| transforms | Array             | ['transform-v4-data', { type: 'map-node-size', field: 'value' }]                             | null | 数据处理器。在原始用户数据进入 Graph 后将依次执行 transform 中的处理器，得到处理后的数据。       |
| modes      | Object            | {<br />  default: [ 'drag-node', 'drag-canvas' ]<br />}                                      | null | 图上行为模式的集合。                                                                             |
| node       | Object / Function | {<br />  type: 'circle',<br />  keyShape: {<br />    ......<br />  }<br />}                  | null | 节点全局的属性映射器，包括一般属性和样式属性（style）。v5 支持了函数映射。                       |
| edge       | Object / Function | {<br />  type: 'polyline',<br />  keyShape: {<br />    ......<br />  }<br />}                | null | 边全局的属性映射器，包括一般属性和样式属性（style）。v5 支持了函数映射。                         |
| nodeState  | Object            | {<br />  hover: {<br />    ......<br />  },<br />  select: {<br />    ......<br />  }<br />} | null | 节点在除默认状态外，其他状态下的样式属性（style）。例如鼠标放置（hover）、选中（select）等状态。 |
| edgeState  | Object            | {<br />  hover: {<br />    ......<br />  },<br />  select: {<br />    ......<br />  }<br />} | null | 边在除默认状态外，其他状态下的样式属性（style）。例如鼠标放置（hover）、选中（select）等状态。   |
| plugins    | Array             | ['minimap', { type: 'tooltip', itemTypes: ['node'] }]                                        | null | 插件                                                                                             |

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
      const graph = new G6.Graph({
        container: 'container',
        width: 1000,
        height: 600,
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

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span><br />若需更换数据，请替换  `'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json'`  为新的数据文件地址。
