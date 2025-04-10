---
title: 自定义边
order: 10
---

G6 提供了多种[内置边](/manual/element/edge/build-in/base-edge)类型，例如直线边、折线边、贝塞尔曲线边等。但在实际项目中，你可能需要创建具有特定样式或交互效果的自定义边。

## 开始之前：了解边的基本构成

在 G6 中，一条完整的边通常由以下几个部分组成：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：边的主图形，表示边的主要形状，例如直线、折线等；
- `label` ：文本标签，通常用于展示边的名称或描述；
- `arrow` ：箭头，用于表示边的方向；
- `halo` ：主图形周围展示的光晕效果的图形。

:::info{title=边的主要功能}
边在图中承担着连接节点的重要角色，不仅提供视觉上的连接，还可以通过样式和交互传达关系的属性和状态。
:::

## 自定义边的方式 <Badge type="warning">选择合适的方式</Badge>

创建自定义边的方式与自定义节点类似，主要有两种途径：

1. 继承现有边类型 <Badge type="success">推荐</Badge>

   这是最常用的方式，你可以选择继承以下类型之一：

   - `BaseEdge` - 最基础的边类，提供边的核心功能
   - `Line` - 直线边
   - `Polyline` - 折线边
   - `Quadratic` - 二次贝塞尔曲线边
   - `Cubic` - 三次贝塞尔曲线边
   - `CubicVertical` - 垂直三次贝塞尔曲线边
   - `CubicHorizontal` - 水平三次贝塞尔曲线边

2. 基于 G 图形系统从零开发 <Badge>高级用法</Badge>

如果现有边类型都不满足需求，你可以基于 G 的底层图形系统从零创建边。你需要自行处理所有细节，包括路径计算、事件响应、状态变化等。这种方式灵活性最高，但复杂度也较大。这里可以直接参考 [源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) 进行实现

## 三步创建你的第一个自定义边

让我们从最基础的 `BaseEdge` 开始，实现一个自定义直线边：

```js | ob {pin:false}
(() => {
  const { Graph, register, BaseEdge, ExtensionCategory } = g6;

  class MyLineEdge extends BaseEdge {
    getKeyStyle(attributes) {
      return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
    }

    getKeyPath(attributes) {
      const { sourceNode, targetNode } = this;
      const [x1, y1] = sourceNode.getPosition();
      const [x2, y2] = targetNode.getPosition();

      return [
        ['M', x1, y1],
        ['L', x2, y2],
      ];
    }
  }

  register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);

  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        { id: 'node1', style: { x: 100, y: 50 } },
        { id: 'node2', style: { x: 300, y: 120 } },
      ],
      edges: [{ source: 'node1', target: 'node2' }],
    },
    node: {
      style: {
        fill: '#7FFFD4',
        stroke: '#5CACEE',
        lineWidth: 2,
      },
    },
    edge: {
      type: 'my-line-edge',
      style: {
        zIndex: 3,
      },
    },
  });

  graph.render();

  return container;
})();
```

### 第一步：编写自定义边类

```typescript
import { BaseEdge } from '@antv/g6';
import type { BaseEdgeStyleProps } from '@antv/g6';

class MyLineEdge extends BaseEdge {
  // 定义边的样式，可以添加或覆盖默认样式
  protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    // 调用父类方法获取基础样式，然后添加自定义样式
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  // 实现抽象方法：定义边的路径
  // 这是 BaseEdge 的抽象方法，所有子类必须实现
  protected getKeyPath(attributes) {
    // 获取源节点和目标节点
    const { sourceNode, targetNode } = this;

    // 获取节点的位置坐标
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    // 返回SVG路径数组，定义从起点到终点的直线
    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}
```

:::success{title=关键方法解析}

- `getKeyStyle`: 定义边的基本样式，如线宽、颜色等
- `getKeyPath`: 是 `BaseEdge` 中的抽象方法，**必须实现**，它定义了边的路径形状
  :::

### 第二步：注册自定义边

使用 `register` 方法注册边类型，这样 G6 才能识别你的自定义边：

```js
import { ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);
```

`register` 方法需要三个参数：

- 扩展类别：`ExtensionCategory.EDGE` 表示这是一个边类型
- 类型名称：`my-line-edge` 是我们给这个自定义边起的名字，后续会在配置中使用
- 类定义：`MyLineEdge` 是我们刚刚创建的边类

### 第三步：应用自定义边

在图的配置中，通过设置 `edge.type` 来使用我们的自定义边：

```js
const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 100 } },
      { id: 'node2', style: { x: 300, y: 150 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
    },
  },
  edge: {
    type: 'my-line-edge',
    style: {
      zIndex: 3,
    },
  },
});

graph.render();
```

🎉 恭喜！你已经创建了第一个自定义边。

## 深入理解自定义边

### 常用方法

#### `upsert(name, Ctor, style, container, hooks)`

在创建自定义边时，你会频繁用到 `upsert` 方法。它是 "update or insert" 的缩写，负责添加或更新边中的图形元素：

```js | pure
// 添加或更新一个文本标签
this.upsert(
  'custom-label', // 元素的唯一标识
  'text', // 图形类型，如 'path', 'text', 'circle' 等
  {
    // 样式配置对象
    x: 100,
    y: 100,
    text: '标签文本',
    fill: '#a975f3',
  },
  container, // 父容器
);
```

为什么要使用 `upsert` 而不直接通过 `container.appendChild()` 创建图形？因为：

1. **性能更好**：当边状态变化或数据更新时，会智能地复用已有图形，而不是删除再重建，大大提高了渲染性能
2. **代码更简洁**：不需要手动判断元素是否存在 ⚠️ 区别于 v4
3. **便于管理**：所有通过 `upsert` 创建的图形都会被记录在边的 `shapeMap` 中，你可以通过 `this.getShape(key)` 轻松获取

<br/>

#### 获取边的关键信息

```js
// 获取边的起点和终点（简单模式 - 不考虑节点形状，直接返回节点中心点或最近连接桩中心˝位置）
const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);

// 获取边的起点和终点（优化模式 - 默认为 true，考虑节点形状，返回节点边界上的连接点）
const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
```

<br/>

#### `getShape(name)`

通过此方法可以获取之前通过 `upsert` 创建的任何图形元素：

```js
// 获取边的主体图形
const keyShape = this.getShape('key');

// 获取自定义标签
const labelShape = this.getShape('custom-label');

// 检查图形是否存在，然后修改其属性
const badge = this.getShape('badge');
if (badge) {
  badge.attr('fill', '#ff0000');
}
```

:::info{title=图形顺序}
图形的创建顺序很重要。如果图形 B 依赖图形 A 的位置，必须确保 A 先创建。在边的默认渲染流程中，已经按照合理的顺序安排了各部分的绘制。
:::

## 从简单到复杂

### 自定义路径的折线边

```js | ob
(() => {
  const { Graph, register, BaseEdge, ExtensionCategory } = g6;

  class MyPolylineEdge extends BaseEdge {
    getKeyPath(attributes) {
      const [sourcePoint, targetPoint] = this.getEndpoints(attributes);

      return [
        ['M', sourcePoint[0], sourcePoint[1]],
        ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
        ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
        ['L', targetPoint[0], targetPoint[1]],
      ];
    }
  }

  register(ExtensionCategory.EDGE, 'my-polyline-edge', MyPolylineEdge);

  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        { id: 'node-0', style: { x: 100, y: 50, ports: [{ key: 'right', placement: [1, 0.5] }] } },
        { id: 'node-1', style: { x: 250, y: 150, ports: [{ key: 'left', placement: [0, 0.5] }] } },
      ],
      edges: [{ source: 'node-0', target: 'node-1' }],
    },
    edge: {
      type: 'my-polyline-edge',
      style: {
        startArrow: true,
        endArrow: true,
        stroke: '#F6BD16',
      },
    },
    behaviors: ['drag-element'],
  });

  graph.render();

  return container;
})();
```

### 额外标签

```js | ob
(() => {
  const { Graph, Line, register, BaseEdge, ExtensionCategory, subStyleProps } = g6;

  class LabelEdge extends Line {
    render(attributes, container) {
      super.render(attributes);
      this.drawEndLabel(attributes, container, 'start');
      this.drawEndLabel(attributes, container, 'end');
    }

    drawEndLabel(attributes, container, type) {
      const key = type === 'start' ? 'startLabel' : 'endLabel';
      const [x, y] = this.getEndpoints(attributes)[type === 'start' ? 0 : 1];

      const fontStyle = {
        x,
        y,
        dx: type === 'start' ? 15 : -15,
        fontSize: 16,
        fill: 'gray',
        textBaseline: 'middle',
        textAlign: type,
      };
      const style = subStyleProps(attributes, key);
      const text = style.text;
      this.upsert(`label-${type}`, 'text', text ? { ...fontStyle, ...style } : false, container);
    }
  }

  register(ExtensionCategory.EDGE, 'extra-label-edge', LabelEdge);

  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        { id: 'node-0', style: { x: 100, y: 100 } },
        { id: 'node-1', style: { x: 300, y: 100 } },
      ],
      edges: [{ source: 'node-0', target: 'node-1' }],
    },
    edge: {
      type: 'extra-label-edge',
      style: {
        startArrow: true,
        endArrow: true,
        stroke: '#F6BD16',
        startLabelText: 'start',
        endLabelText: 'end',
      },
    },
    behaviors: ['drag-element'],
  });

  graph.render();

  return container;
})();
```
