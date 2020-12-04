---
title: 自定义边
order: 3
---

G6 除了提供丰富的 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)  外，还提供了自定义边的机制，方便用户开发更加定制化的边，包括含有复杂图形的边、复杂交互的边、带有动画的边等。

用户可以通过 `G6.registerEdge(typeName: string, edgeDefinition: object, extendedTypeName?: string)` 注册一个新的边类型，其中：
- `typeName`：该新边类型名称；
- `extendedTypeName`：被继承的边类型，可以是内置边类型名，也可以是其他自定义边的类型名。`extendedTypeName` 未指定时代表不继承其他类型的边；
- `edgeDefinition`：该新边类型的定义，其中必要函数详见 [自定义机制 API](/zh/docs/api/registerItem#g6registeredgeedgename-options-extendededgename)。当有 `extendedTypeName` 时，没被复写的函数将会继承 `extendedTypeName` 的定义。

**需要注意的是**，自定义边/节点时，若给定了 `extendedTypeName`，如 `draw`，`update`，`setState` 等必要的函数若不在 `edgeDefinition` 中进行复写，将会继承 `extendedTypeName` 中的相关定义。常见问题：
- Q：边/节点更新时，没有按照在 `edgeDefinition` 中自定义实现的 `draw` 或 `drawShape` 逻辑更新。例如，有些图形没有被更新，增加了没有在 `draw` 或 `drawShape` 方法中定义的图形等。
- A：由于继承了 `extendedTypeName`，且在 `edgeDefinition` 中没有复写 `update` 方法，导致边/节点更新时执行了 `extendedTypeName` 中的 `update` 方法，从而与自定义的 `draw` 或 `drawShape` 有出入。可以通过复写 `update` 方法为 `undefined` 解决。当 `update` 方法为 `undefined` 时，边/节点的更新将会执行 `draw` 或 `drawShape` 进行重绘。

在本章中我们会通过四个案例，从简单到复杂讲解边的自定义：<br />1. 从无到有的定义边；<br />2. 扩展现有边；<br />3. 增加额外图形；<br />4. 边的交互样式；<br />5. 自定义带箭头的边。

## 1. 从无到有定义边

我们来实现垂直的折线：<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxY-TJ2vJFMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ijy4QpaB-fgAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gz09R5fM-HMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>

> （左）直线边。（中）默认的折线边。（右）调整了节点的锚点（连入点）后的折线边。

### 自定义边

```javascript
G6.registerEdge('hvh', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#333',
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
          ['L', endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return shape;
  },
});
```

- 上面自定义边中的 `startPoint` 和 `endPoint` 分别是是边两端与起始节点和结束节点的交点；
- 可以通过修改节点的锚点（边连入点）来改变 `startPoint` 和 `endPoint` 的位置。

### 在数据中修改 anchorPoints

通过以下的数据，使用自定义的 hvh 边，就可以实现上图最右边的效果。

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node2',
      x: 200,
      y: 100,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node3',
      x: 200,
      y: 300,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
  edges: [
    {
      id: 'edge1',
      target: 'node2',
      source: 'node1',
      type: 'hvh',
    },
    {
      id: 'edge2',
      target: 'node3',
      source: 'node1',
      type: 'hvh',
    },
  ],
};
```

## 2. 扩展现有边

通过 `afterDraw` 接口给现有的曲线增加动画。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

```javascript
G6.registerEdge(
  'line-growth',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = shape.getTotalLength();
      shape.animate(
        (ratio) => {
          const startLen = ratio * length;
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
  'cubic',
);
```

<br />

## 3. 增加额外图形

通过实现 `afterDraw` 增加额外图形，为找到边的主要图形 `path` 上的某个点，可以使用 `shape.getPoint(ratio)` 获得。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aOlcQbx2ux4AAAAAAAAAAAAAARQnAQ' alt='img' width='250'/>

```javascript
G6.registerEdge(
  'mid-point-edge',
  {
    afterDraw(cfg, group) {
      // 获取图形组中的第一个图形，在这里就是边的路径图形
      const shape = group.get('children')[0];
      // 获取路径图形的中点坐标
      const midPoint = shape.getPoint(0.5);
      // 在中点增加一个矩形，注意矩形的原点在其左上角
      group.addShape('rect', {
        attrs: {
          width: 10,
          height: 10,
          fill: '#f00',
          // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
          x: midPoint.x - 5,
          y: midPoint.y - 5
        }
      });
    },
    update: undefined
  },
  'cubic',
);
```

<br />

## 4. 边的交互样式

以点击选中、鼠标 hover 到边为示例，实现如下需求：

- 点击边时边变粗，再点击变成细；
- 鼠标移动上去变成红色，离开变成 `'#333'` 。

效果如下图所示。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IWLxRZomOfMAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>
<br />
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️注意:</strong></span>

边过细时点击很难被击中，可以设置  `lineAppendWidth`  来提升击中范围。

```javascript
// 基于 line 扩展出新的边
G6.registerEdge(
  'custom-edge',
  {
    // 响应状态变化
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // 顺序根据 draw 时确定
      if (name === 'active') {
        if (value) {
          shape.attr('stroke', 'red');
        } else {
          shape.attr('stroke', '#333');
        }
      }
      if (name === 'selected') {
        if (value) {
          shape.attr('lineWidth', 3);
        } else {
          shape.attr('lineWidth', 2);
        }
      }
    },
  },
  'line',
);

// 点击时选中，再点击时取消
graph.on('edge:click', (ev) => {
  const edge = ev.item;
  graph.setItemState(edge, 'selected', !edge.hasState('selected')); // 切换选中
});

graph.on('edge:mouseenter', (ev) => {
  const edge = ev.item;
  graph.setItemState(edge, 'active', true);
});

graph.on('edge:mouseleave', (ev) => {
  const edge = ev.item;
  graph.setItemState(edge, 'active', false);
});
```

<br />

## 5. 自定义箭头

G6（v3.5.8 及后续版本）为内置边、自定义边提供了[默认箭头和内置箭头](/zh/docs/manual/middle/elements/edges/arrow)。很多时候，G6 提供的箭头并不能满足业务上的需求，这个时候，就需要我们自定义箭头。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*f1G9RJ5dE2oAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

> （左）G6 内置箭头。（右）自定义边带有自定义箭头。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> G6 3.4.1 后的自定义箭头坐标系有所变化。如下图所示，左图为 G6 3.4.1 之前版本的演示，右图为 G6 3.4.1 及之后版本的演示。箭头由指向 x 轴负方向更正为指向 x 轴正方向。同时，偏移量 `d` 的方向也发生响应变化。不变的是，自定义箭头本身坐标系的原点都与相应边 / path 的端点重合，且自定义箭头的斜率与相应边 / path 端点处的微分斜率相同。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gN_NSqjLRo0AAAAAAAAAAABkARQnAQ' width=565 alt='img'/>

> （左）v3.4.1 之前的自定义箭头坐标系演示。（右）v3.4.1 及之后版本的自定义箭头坐标系演示。

G6 中有三种途径在边上配置自定义箭头：

- 配置自定义箭头到边的全局配置中；
- 在数据中为单条边配置；
- 在自定义边中配置。

### 方法 1: 全局配置

```javascript
const graph = new Graph({
  // ... 图的其他配置项
  defaultEdge: {
    style: {
      endArrow: {
        // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
        path: 'M 0,0 L 20,10 L 20,-10 Z',
        // 箭头的偏移量，负值代表向 x 轴正方向移动
        // d: -10,
        // v3.4.1 后支持各样式属性
        fill: '#333',
        stroke: '#666',
        opacity: 0.8,
        // ...
      },
    },
  },
});
```

### 方法 2: 在数据中配置

```javascript
const data = {
  nodes: [
    { id: 'node1' },
    { id: 'node2' },
    // ... 其他节点
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      style: {
        endArrow: {
          // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          path: 'M 0,0 L 20,10 L 20,-10 Z',
          // 箭头的偏移量，负值代表向 x 轴正方向移动
          // d: -10,
          // v3.4.1 后支持各样式属性
          fill: '#333',
          stroke: '#666',
          opacity: 0.8,
          // ...
        },
      },
    },
    //... 其他边
  ],
};
```

### 方法 3: 自定义边中配置

```javascript
// 使用方法二：自定义边，并带有自定义箭头
G6.registerEdge('line-arrow', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg;
    const keyShape = group.addShape('path', {
      attrs: {
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ],
        stroke: 'steelblue',
        lineWidth: 3,
        startArrow: {
          // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          path: 'M 0,0 L 20,10 L 20,-10 Z',
          // 箭头的偏移量，负值代表向 x 轴正方向移动
          // d: -10,
          // v3.4.1 后支持各样式属性
          fill: '#333',
          stroke: '#666',
          opacity: 0.8,
          // ...
        },
        endArrow: {
          // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
          path: 'M 0,0 L 20,10 L 20,-10 Z',
          // 箭头的偏移量，负值代表向 x 轴正方向移动
          // d: -10,
          // v3.4.1 后支持各样式属性
          fill: '#333',
          stroke: '#666',
          opacity: 0.8,
          // ...
        },
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return keyShape;
  },
});
```
