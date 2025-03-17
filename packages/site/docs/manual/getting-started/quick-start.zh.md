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
<script src="https://unpkg.com/@antv/g6@5/dist/g6.min.js"></script>

<script>
  const { Graph } = G6;

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
          type: 'd3-force',
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

<embed src="@/common/manual/getting-started/quick-start/simple-graph.md"></embed>

下面分析一下这段代码：

1. 首先我们创建一个 `div` 元素作为图的容器：

```html
<div id="container" style="width: 500px; height: 500px"></div>
```

2. 然后引入 G6 的 JS 文件：

```html
<script src="https://unpkg.com/@antv/g6@5/dist/g6.min.js"></script>
```

3. 使用 `fetch` 方法获取图的数据：

```js
fetch('https://assets.antv.antgroup.com/g6/graph.json').then((res) => res.json());
```

4. 最后创建一个图实例，传入配置对象，并调用 `render` 方法渲染图：

```js
const { Graph } = G6;

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
    type: 'd3-force',
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
