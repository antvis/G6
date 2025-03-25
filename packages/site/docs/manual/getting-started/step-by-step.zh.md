---
title: 详细教程
order: 3
---

本教程将引导你从头开始完成一个 G6 图表开发，并在过程中了解和学习 G6 的主要概念。

## 创建应用

我们将使用 Vite 来创建一个简单的前端应用。

### 初始化

首先创建一个空目录：

```bash
mkdir g6-tutorial

cd g6-tutorial
```

初始化项目：

```bash
npm init -y
```

安装 G6：

```bash
npm install @antv/g6 --save
```

Vite 是一个新型的前端构建工具，它基于 ESModule，可以快速启动项目。

安装 Vite：

```bash
npm install vite --save-dev
```

在 `package.json` 中添加启动脚本：

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

### 创建文件

创建 `index.html` 和 `main.ts` 文件，内容如下：

**index.html**：

```html
<!doctype html>
<html>
  <head>
    <title>@antv/g6 Tutorial</title>
  </head>
  <body>
    <div id="container"></div>
    <script type="module" src="main.ts"></script>
  </body>
</html>
```

**main.ts**：

```typescript
alert('Hello, G6!');
```

### 启动项目

```bash
npm run dev
```

打开浏览器访问终端中输出的地址（通常为：http://127.0.0.1:5173/ ），你将看到一个弹窗显示 "Hello, G6!"。

## 创建一个简单的图表

接下来，我们将使用 G6 创建一个简单的图表。

### 准备数据

G6 使用 JSON 格式的数据来描述图，通常包括节点和边。我们将使用下面准备的数据：

```js
const data = {
  nodes: [
    { id: 'node-1', style: { x: 50, y: 50 } },
    { id: 'node-2', style: { x: 150, y: 50 } },
  ],
  edges: [{ source: 'node-1', target: 'node-2' }],
};
```

数据中包括两个节点和一条边，节点的 `id` 属性是必须的，并在 `style` 设置了每个节点的位置。边的 `source` 和 `target` 属性分别表示边的起始节点 `id` 和结束节点 `id`。

### 创建并绘制图表

创建一个图表实例，传入一个配置对象，包括容器和数据，然后调用 `render` 方法渲染图表：

```typescript
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

如下所示，可以看到图表已经顺利绘制出来：

<embed src="@/common/manual/getting-started/step-by-step/create-chart.md"></embed>

### 元素

接下来将介绍如何配置画布中的元素样式和种类。

G6 提供了多种机制来配置元素样式，可以在数据中进行配置，也可以在图表实例中进行配置。前面的示例中，我们在数据中配置了节点的位置，接下来我们在图配置项中配置节点和边的样式：

<!-- TODO -->

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
  node: {
    style: {
      fill: 'pink',
    },
  },
  edge: {
    style: {
      stroke: 'lightgreen',
    },
  },
});

graph.render();
```

正如代码所示，我们在图表实例中配置了节点的填充颜色为粉色，边的描边颜色为浅绿色。你可以在下面的示例中看到效果：

<embed src="@/common/manual/getting-started/step-by-step/elements-1.md"></embed>

其中的关键部分是 `node.style` 和 `edge.style` 配置项，分别用来配置节点和边的样式。

> 在后续的代码示例中，我们仅展示配置项的部分代码，本项目的完整代码请查看 [完整示例](https://codesandbox.io/s/g6-tutorial)。

下面我们将通过设置节点的类型来展示更多的节点种类：

```js
{
  node: {
    type: (datum) => datum.id === 'node-1' ? 'circle' : 'rect',
    style: {
      fill: 'pink',
      size: 20
    }
  }
}
```

上面的代码中，我们设置了节点的 `type` 属性，其值可以是一个字符串，也可以是一个函数。当 `type` 是一个函数时，函数的参数是当前节点的数据对象，函数的返回值是节点的类型。

> 同样的，元素中 `style` 样式下的每个属性都可以是一个函数，函数的参数是当前元素的数据对象。

> 你甚至可以将整个 `style` 属性设置为一个函数，这样你可以根据数据对象动态设置元素的样式。

圆形节点(`circle`)是 G6 的默认节点类型，这里我们将第一个节点的类型设置为圆形，第二个节点的类型设置为矩形。

同时我们还将节点的大小设置为 20，因此第一个节点是一个半径为 10 的圆形，第二个节点是一个边长为 20 的正方形。

> 如果你想将矩形节点的大小设置为 20x10，可以将 `size` 设置为一个数组 `[20, 10]`。

你可以在下面的示例中看到效果：

<embed src="@/common/manual/getting-started/step-by-step/elements-2.md"></embed>

### 交互

在上面的例子中提供的图表是静态的，接下来我们将添加一些交互行为。

G6 提供了多种交互行为，我们添加几个常用的交互，使得用户可以拖拽、缩放画布，拖拽节点。

```js
{
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'];
}
```

尝试在下面的示例中拖拽节点和画布，并使用滚轮缩放画布：

<embed src="@/common/manual/getting-started/step-by-step/behaviors.md"></embed>

### 布局

在上面的示例中，我们手动设置了节点的位置。但当节点数量较多时，这会变得非常困难。

布局算法可以基于一定的规则自动调整节点的位置，G6 提供了多种布局算法，例如树形布局、力导向布局等。

首先生成一组不包括位置信息的数据：

```js
const data = {
  nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
  edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
};
```

默认情况下，如果节点没有位置信息，G6 会将节点放置在左上角，即 `(0, 0)`。

接下来我们使用 `d3-force` 布局算法，它是一种力导向布局算法，可以模拟节点之间的引力和斥力，使得节点自动调整到合适的位置。

```js
{
  layout: {
    type: 'd3-force',
  },
}
```

查看下面的示例，可以看到节点已经自动调整到合适的位置：

<details>
<summary>完整代码</summary>

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
    edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
  },
  node: {
    style: {
      size: 20,
      fill: 'pink',
    },
  },
  edge: {
    style: {
      stroke: 'lightgreen',
    },
  },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  layout: {
    type: 'd3-force',
  },
});

graph.render();
```

</details>

<embed src="@/common/manual/getting-started/step-by-step/layout.md"></embed>

### 色板

同样的，当节点数量较多时，手动设置节点的颜色也会变得困难。G6 提供了色板机制，可以便捷地为元素设置颜色。

色板通常会基于数据的某个字段为元素设置颜色，例如节点的类型、边的权重等。

下面我们在数据中的添加 `category` 字段：

```js
const data = {
  nodes: Array.from({ length: 10 }).map((_, i) => ({
    id: `node-${i}`,
    data: { category: i === 0 ? 'central' : 'around' },
  })),
  edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
};
```

然后使用 `tableau` 色板为节点设置颜色，`field` 属性指定了数据中的字段，`color` 属性指定了色板的名称。

```js
{
  node: {
    palette: {
      field: 'category',
      color: 'tableau',
    }
  }
}
```

> 需要注意将 `node.style` 中的 `fill` 样式移除，因为其优先级高于色板分配的颜色。

<embed src="@/common/manual/getting-started/step-by-step/palette.md"></embed>

### 插件

插件机制是 G6 的一个重要特性，可以通过插件扩展 G6 的功能。G6 提供了丰富的内置插件，例如 `tooltip`、`legend` 等，也支持用户自定义插件。

下面我们将使用 `grid-line` 插件为画布添加网格线：

```js
{
  plugins: ['grid-line'],
}
```

可以看到画布已经添加了网格线：

<embed src="@/common/manual/getting-started/step-by-step/plugins-1.md"></embed>

上面的插件配置项中使用了简写形式，大部分的插件都支持传递额外的参数，例如 `grid-line` 插件可以配置 `follow` 属性来指定拖拽画布时网格线是否跟随画布移动。

```js
{
  plugins: [{ type: 'grid-line', follow: true }];
}
```

尝试在下面的示例中拖拽画布，可以看到网格线跟随画布移动：

<embed src="@/common/manual/getting-started/step-by-step/plugins-2.md"></embed>

## 小结

在本教程中，我们从头开始创建了一个 G6 图表，并了解了 G6 的主要概念。我们学习了如何创建一个简单的图表，如何配置元素的样式和种类，如何添加交互行为，如何使用布局算法，如何使用色板，如何使用插件。

关于 G6 更加详细的概念介绍可以在 [核心概念](/manual/graph/graph) 中查看。

图的 API 详细说明可以在 [API](/api/graph) 中查看。
