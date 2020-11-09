---
title: G6 3.3 升级指南
order: 1
---

## 构建产物

G6 3.3.0 支持三种构建产物：

- lib：commonjs；
- es：esm；
- dist：umd。

`import G6 from '@antv/g6'` 默认引用的是 lib 文件夹下的产物。

**其中 esm 及 commonjs 构建产物不支持 webworker 布局。**

如果要支持 webworker 布局，请引用 [CDN](https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js) 上的文件。

## Util

- 不再在 G6 中 import @antv/util  后，又 export 一次，直接使用 @antv/util  相关方法；
- 移除了 util/layout 文件；
  - 将 util/layout 中的 `scaleMatrix`、`floydWarshall`、`getAdjMatrix` 方法移到了 util/math 文件中；
  - util/layout 中的 `getEDistance` 方法与 util/math 中的 `distance` 重复，统一使用 math 中的 `distance` 方法；
  - 删除了 util/layout 中的 `mix`、`augment`、`isString` 三个方法，统一使用 @antv/util  中相关方法；
- `groupData` 改名为 `group`；
- util/group 中删除了 `flatToTree` 和 `addNodesToParentNode` 两个方法；
- util/base 文件中删除了对 @antv/util 的依赖。

## 插件 Plugins

使用 G6 内置插件时不再需要引入其他包，引入 G6 后直接通过 `G6.PluginName` 的方式获得。例如：

```javascript
// <= G6 3.2
// CDN 引入 G6 以及需要使用的插件
<script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/minimap.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/grid.js"></script>
// 或 NPM 引入，需要引入 G6 及需要使用的插件
import G6, { Minimap, Grid } from '@antv/G6'

const minimap = new Minimap({
	//... configurations
})
const grid = new Grid({
	//... configurations
})


// G6 3.5
// CDN 引入，只需要引入 G6
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.5.10/dist/g6.min.js"></script>
// 或 NPM 引入，只需要引入 G6
import G6 from '@antv/G6'

const minimap = new G6.Minimap({
	//... configurations
})

const grid = new G6.Grid({
	//... configurations
})

const graph = new G6.Graph({
	//... other configurations
  plugins: [ minimap, grid ]
});
```

## Tree-Graph 兼容问题

G6 3.3 中，TreeGraph 的布局相关方法与 Graph 统一：

1. `changeLayout` 修改为 `updateLayout`；
1. `refreshLayout` 修改为 `layout`。

## 动画

G6 3.2.x 及以下版本中动画的使用方式：

```javascript
G6.registerEdge(
  'loop-growth',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = shape.getTotalLength();
      shape.animate(
        {
          onFrame(ratio) {
            const startLen = ratio * length;
            // 计算线的lineDash
            const cfg = {
              lineDash: [startLen, length - startLen],
            };
            return cfg;
          },
          repeat: true,
        },
        2000,
      );
    },
  },
  'loop',
);
```

G6 3.3 版本中动画：

- 我们不再建议使用 3.2 中的调用方式，即包含复写 `onFrame`。这一种调用方式将会被移除；
- 提供两种使用 `animate` 的方式：
  - 方式一：`animate(toAttrs, animateCfg)`。其中 `toAttrs` 为动画的目标参数，`animateCfg` 为动画的配置。例如：

```javascript
G6.registerEdge(
  'widen-line',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = shape.getTotalLength();
      shape.animate(
        {
          lineWidth: 10,
        },
        {
          repeat: false,
          duration: 500,
        },
      );
    },
  },
  'single-edge',
);
```

- 方式二：`animate(onFrame, animateCfg)`。其中 `onFrame` 为每一帧的回调函数，`animateCfg` 为动画的配置。例如：

```javascript
G6.registerEdge(
  'loop-growth',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = shape.getTotalLength();
      shape.animate(
        (ratio) => {
          const startLen = ratio * length;
          // 计算线的lineDash
          const cfg = {
            lineDash: [startLen, length - startLen],
          };
          return cfg;
        },
        {
          repeat: true,
          duration: 2000,
        },
      );
    },
  },
  'loop',
);
```

## 元素类型指定

G6 3.2.x 及以下版本中指定节点或边的图形类型时，可以通过在数据中单个配置、实例化图时全局配置、更新时动态配置等。例如：

```javascript
// 在数据中单个配置
const data = {
  nodes: [
    {
      id: 'node0',
      type: 'circle',
    },
    {
      id: 'node1',
      type: 'rect',
    },
  ],
  edges: [
    {
      id: 'edge0',
      source: 'node0',
      target: 'node1',
      type: 'polyline',
    },
  ],
};
// 或在实例化图时全局配置
```

G6 3.3 将会使用 **`type` 字段替代 `shape` 字段**（同时兼容 `shape`，但 `shape` 在以后的版本中将会被舍弃）。

## fontSize

G6 3.3 与 G6 3.2.x 的节点/边的 label 在相同的 fontSize 时，视觉上会有差别，但若二者都使用了默认字号（12），则二者视觉上相同。这是由于在 G6 3.2.x 及之前的版本中，底层渲染引擎在文字上做了额外的矩阵变换，这是不合理的。新版本修复了这一问题，目前的字号对应视觉样式是更合理、准确的。

## 自定义节点/边

#### 继承内置节点/边

G6 3.3 中，自定义节点/边时若不希望继承任何节点/边，则不需要为 `registerNode` 或 `registerEdge` 函数的第三个参数传递任何值。且**必须**重写 `draw` 方法。

```javascript
G6.registerEdge('customNode', {
  draw(cfg, group) {
    // ...
    return keyShape;
  },
});
```

希望继承时，节点的基类为 `'single-node'`，边的基类为 `'single-edge'`。除了继承基类外，还可以继承其他内置节点或边。而在 G6 3.2 及之前的版本中节点和边的基类统一为 `'single-shape'`。

#### 增加图形

G6 3.2 及之前的版本中，自定义节点/边时增加图形可以通过下面代码，不需要指定 `name` 及 `draggable` 属性：

```javascript
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const keyShape = group.addShape('rect', {
      attrs: {
        // ... 图形属性
      },
    });
    const circle = group.addShape('circle', {
      attrs: {
        // ... 图形属性
      },
    });
    return keyShape;
  },
});
```

G6 3.3 中，新增图形时建议指定 `name` 与 `draggable`。若不添加，可能导致节点/边上的非 keyShape 图形不能响应部分事件。添加方式如下：

```javascript
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const keyShape = group.addShape('rect', {
      attrs: {
        // ... 图形属性
      },
      draggable: true, // Allow this shape to be dragged
      name: 'key-shape', // Not unique, you can assign any string value to it
    });
    const circle = group.addShape('circle', {
      attrs: {
        // ... 图形属性
      },
      draggable: true, // Allow this shape to be dragged
      name: 'circle-shape', // Not unique, you can assign any string value to it
    });
    return keyShape;
  },
});
```

#### marker 图形

G6 3.2 及之前版本中，marker 图形的半径是通过 `r` 或 `radius` 指定。

G6 3.3 中，marker 的图形半径只能通过 `r` 指定。

例如：

```javascript
// <= G6 3.2.x
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const marker = group.addShape('marker', {
      attrs: {
        // ... 其他图形属性
        radius: cfg.size[0],
      },
      draggable: true,
      name: 'marker-shape',
    });
    return keyShape;
  },
});

// <= G6 3.3
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const marker = group.addShape('marker', {
      attrs: {
        // ... 其他图形属性
        r: cfg.size[0],
      },
      draggable: true,
      name: 'marker-shape',
    });
    return keyShape;
  },
});
```

#### fan 图形

G6 3.2.x 及之前的版本支持 fan 图形（使用方法如下），G6 3.3 不再支持。

```javascript
// 如下图形 G6 3.3 不再支持
group.addShape('fan', {
  attrs: {
    x: 50,
    y: 50,
    re: 40,
    rs: 30,
    startAngle: (1 / 2) * Math.PI,
    endAngle: Math.PI,
    clockwise: false,
    fill: '#b7eb8f',
  },
});
```

## pixelRatio

在 G6 3.2 及之前的版本中，需要用户根据当前分辨率在实例化图时指定 `pixelRatio`。

G6 3.3 中，`pixelRatio` 将被自动计算，不需要再由用户传递。

## click-select 与 brush-select 时机事件

G6 3.2 中 `brush-select` 与 `click-select` 每次选取发生变化时，将会触发 `nodeselectchange`。`brush-select` 的 `nodeselectchange` 事件的回调参数含有两个字段：

- `targets`：当前被选中的所有节点与边。`{nodes: [...], edges: [...]}`
- `select`：当前操作是选中还是取消。`true` | `false`

`click-select`  的 `nodeselectchange` 事件的回调参数含有两个字段：

- `target`：当前被操作的一个节点，可能是被选中，或取消选中
- `select`：当前操作是选中还是取消。`true` | `false`

G6 3.3 统一了这两个 behavior 的 `nodeselectchange` 事件。使用  `selectedItems` 替代 `targets` 字段，表示当前被选中的所有元素。防止 `targets` 的含义与 `target` （当前被操作的节点，可能是被选中或被取消选中）混淆。<br />`brush-select` 有两个字段：

- `selectedItems`：当前被选中的所有节点与边。`{nodes: [...], edges: [...]}`
- `select`：当前操作是选中还是取消。true | false

`click-select` 有两个字段：

- `target`：当前被操作的一个节点，可能是被选中，或取消选中
- `selectedItems`：当前被选中的所有节点与边。`{nodes: [...], edges: [...]}`
- `select`：当前操作是选中还是取消。`true` | `false`

## SVG 渲染

在 G6 3.2 及之前的版本中，可以在实例化图时为图指定渲染器，`renderer` 可选为 `'canvas'` 或 `'svg'`。

在 G6 3.3 中，我们致力于更好的 Canvas 版本，暂时不支持 SVG 方式渲染。`renderer` 参数不再起效。SVG 渲染在以后的版本中提供支持。
