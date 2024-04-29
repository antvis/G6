---
title: 快速开始
order: 0
---

## 在线体验 G6

访问 [图表示例](/examples) 无需任何环境配置即可在线体验 G6。

## 创建一个简单的图

在本例子中，我们将基于 HTML 页面使用 G6 创建一个简单的图。

将下面的代码复制到一个 HTML 文件中，然后在浏览器中打开这个文件：

```html
<!-- 准备一个容器 -->
<div id="container" style="width: 500px; height: 500px"></div>

<!-- 引入 G6 的 JS 文件 -->
<script src="https://unpkg.com/@antv/g6@beta/dist/g6.min.js"></script>

<script>
  fetch('https://assets.antv.antgroup.com/g6/graph.json')
    .then((res) => res.json())
    .then((data) => {
      const graph = new Graph({
        container: 'container',
        autoFit: 'view',
        data,
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3force',
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      });

      graph.render();
    });
</script>
```

会得到如下所示的图：

```js | ob { pin: false }
fetch('https://assets.antv.antgroup.com/g6/graph.json')
  .then((res) => res.json())
  .then((data) =>
    createGraph(
      {
        data,
        autoFit: 'view',
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3force',
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      },
      { width: 500, height: 500 },
    ),
  );
```

下面分析一下这段代码：

1. 首先我们创建一个 `div` 元素作为图的容器：

```html
<div id="container" style="width: 500px; height: 500px"></div>
```

2. 然后引入 G6 的 JS 文件：

```html
<script src="https://unpkg.com/@antv/g6@beta/dist/g6.min.js"></script>
```

3. 使用 `fetch` 方法获取图的数据：

```js
fetch('https://assets.antv.antgroup.com/g6/graph.json').then((res) => res.json());
```

4. 最后创建一个图实例，传入配置对象，并调用 `render` 方法渲染图：

```js
const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data,
  node: {
    style: {
      size: 10,
    },
    palette: {
      field: 'group',
      color: 'tableau',
    },
  },
  layout: {
    type: 'd3force',
    manyBody: {},
    x: {},
    y: {},
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
});

graph.render();
```

如果你使用 React、Vue、Angular 等框架，可以查看：

- [在 React 中使用 G6](./integration/react)
- [在 Vue 中使用 G6](./integration/vue)
- [在 Angular 中使用 G6](./integration/angular)

<!--
## 创建一个简单的图

### 准备

**容器**

G6 需要一个容器来渲染图，可以是一个 `div` 元素或者其他 HTML 元素。

**数据**

G6 使用 JSON 格式的数据来描述图，下面是一个简单的数据示例：

<details>
<summary>数据示例</summary>

```json
{
  "nodes": [
    { "id": "node-1", "style": { "x": 50, "y": 50 } },
    { "id": "node-2", "style": { "x": 150, "y": 50 } }
  ],
  "edges": [{ "source": "node-1", "target": "node-2" }]
}
```

</details>

数据中包括两个节点和一条边，节点的 `id` 属性是必须的，并在 `style` 设置了每个节点的位置。边的 `source` 和 `target` 属性分别表示边的起始节点和结束节点。

### 创建并绘制

直接使用 `new Graph()` 创建一个图实例，传入一个配置对象，包括容器和数据，然后调用 `render` 方法渲染图。

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 150, y: 50 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
  },
});

graph.render();
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 150, y: 50 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
  },
  { width: 200, height: 100 },
);
```

### 配置元素样式

可以直接在数据的 `style` 属性中来配置 `节点` 和 `边` 的样式。

> 将第一个节点的填充颜色设置为粉色：

```json
{ "id": "node-1", "style": { "x": 50, "y": 50, "fill": "pink" }
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, fill: 'pink' } },
        { id: 'node-2', style: { x: 150, y: 50 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
  },
  { width: 200, height: 100 },
);
```

也可以通过样式映射将节点数据中的属性映射到节点的样式上：

> 向节点添加自定义数据

```json
{ "id": "node-2", "style": { "x": 150, "y": 50 }, "data": { "value": 90 } }
```

> 在 Graph 实例化时配置节点样式映射

```js
node: {
  style: {
    fill: (datum) => {
      if (datum.data.value !== undefined) {
        return datum.data.value > 80 ? 'lightgreen' : 'orange';
      }
      return datum.style.fill;
    },
  },
}
```

<details>
<summary>完整代码</summary>

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50, fill: 'pink' } },
      { id: 'node-2', style: { x: 150, y: 50 }, data: { value: 90 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
  },
  node: {
    style: {
      fill: (datum) => {
        if (datum.data.value !== undefined) {
          return datum.data.value > 80 ? 'lightgreen' : 'orange';
        }
        return datum.style.fill;
      },
    },
  },
});

graph.render();
```

</details>

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, fill: 'pink' } },
        { id: 'node-2', style: { x: 150, y: 50 }, data: { value: 90 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
    node: {
      style: {
        fill: (datum) => {
          if (datum.data.value !== undefined) {
            return datum.data.value > 80 ? 'lightgreen' : 'orange';
          }
          return datum.style.fill;
        },
      },
    },
  },
  { width: 200, height: 100 },
);
```

### 交互

G6 提供了丰富的交互功能，例如拖拽、缩放、框选等。可以通过配置 `behaviors` 来启用需要的交互。

> 启用拖拽画布、缩放画布和拖拽元素交互

```js
behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'];
```

> 在下面的 Demo 中尝试拖拽节点和画布，并使用滚轮缩放画布

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, fill: 'pink' } },
        { id: 'node-2', style: { x: 150, y: 50 }, data: { value: 90 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
    node: {
      style: {
        fill: (datum) => {
          if (datum.data.value !== undefined) {
            return datum.data.value > 80 ? 'lightgreen' : 'orange';
          }
          return datum.style.fill;
        },
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  },
  { width: 300, height: 200 },
);
```

### 布局

在上面的示例中，我们手动设置了节点的位置，但是在实际应用中，节点的位置可能是动态的，这时候可以使用布局算法来自动计算节点的位置。

> 使用一组不含坐标的节点数据

```json
{
  "nodes": [{ "id": "node-1" }, { "id": "node-2" }, { "id": "node-3" }, { "id": "node-4" }, { "id": "node-5" }]
}
```

> 使用 `grid` 布局算法将节点排列成网格

```js
layout: {
  type: 'grid',
}
```

<details>
<summary>完整代码</summary>

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }, { id: 'node-6' }],
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

</details>

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
        { id: 'node-6' },
      ],
    },
    layout: {
      type: 'grid',
    },
  },
  { width: 300, height: 200 },
);
```

### 色板

当图中的元素数量较多时，手动设置每个节点和边的样式可能会变得繁琐。G6 提供了色板功能，可以通过配置色板来自动为元素设置样式。

> 为节点进行分组

```json
{
  "nodes": [
    { "id": "node-1", "data": { "type": "A" } },
    { "id": "node-2", "data": { "type": "B" } },
    { "id": "node-3", "data": { "type": "C" } },
    { "id": "node-4", "data": { "type": "A" } },
    { "id": "node-5", "data": { "type": "B" } },
    { "id": "node-6", "data": { "type": "C" } }
  ]
}
```

> 使用色板为节点设置默认样式

```js
node: {
  palette: {
    field: 'type',
  },
}

```

> 在下面的 Demo 中尝试将节点按照 `type` 属性分组，并使用色板为节点设置默认样式

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', data: { type: 'A' } },
        { id: 'node-2', data: { type: 'B' } },
        { id: 'node-3', data: { type: 'C' } },
        { id: 'node-4', data: { type: 'A' } },
        { id: 'node-5', data: { type: 'B' } },
        { id: 'node-6', data: { type: 'C' } },
      ],
    },
    node: {
      palette: {
        field: 'type',
      },
    },
    layout: {
      type: 'grid',
    },
  },
  { width: 300, height: 200 },
);
```

### 插件

插件机制是 G6 的一个重要特性，可以通过插件扩展 G6 的功能。G6 提供了一些内置插件，例如 `tooltip`、`context-menu` 等，也支持用户自定义插件。

> 使用 `grid-line` 插件显示网格线

```js
plugins: ['grid-line'];
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', data: { type: 'A' } },
        { id: 'node-2', data: { type: 'B' } },
        { id: 'node-3', data: { type: 'C' } },
        { id: 'node-4', data: { type: 'A' } },
        { id: 'node-5', data: { type: 'B' } },
        { id: 'node-6', data: { type: 'C' } },
      ],
    },
    node: {
      palette: {
        field: 'type',
      },
    },
    layout: {
      type: 'grid',
    },
    plugins: ['grid-line'],
  },
  { width: 300, height: 200 },
);
```

### 小结

通过上面的示例，我们了解了如何使用 G6 创建一个简单的图，包括：

- 准备容器和数据
- 创建并绘制图
- 配置元素样式
- 启用交互
- 使用布局
- 使用色板
- 使用插件

## 在前端框架中使用 G6 -->
