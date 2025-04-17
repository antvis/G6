---
title: 节点总览
order: 1
---

## 什么是节点

节点（Node）是图中的基本元素之一，表示图中的实体或者抽象概念，例如一个人、一个地点、一个组织等，节点可以包含一些属性，例如节点的 ID、名称、类型等。在 G6 中，节点可以具有多种形状和样式，并支持丰富的交互和自定义功能。

你可以在图中创建任意数量的节点，并通过边连接它们以表示关系。

## 节点体系

G6 的节点体系包括三大类：内置节点、扩展节点和自定义节点。**大多数场景下，内置节点即可满足需求**。

### 内置节点

G6 提供了丰富的内置节点类型，**无需注册，直接配置即可使用**：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

| 节点类型   | 注册名称   | 描述                     |
| ---------- | ---------- | ------------------------ |
| 圆形节点   | `circle`   | 常用于表示普通实体       |
| 矩形节点   | `rect`     | 适合展示更多文本和细节   |
| 椭圆节点   | `ellipse`  | 类似圆形的变体           |
| 菱形节点   | `diamond`  | 常用于决策点或特殊节点   |
| 三角形节点 | `triangle` | 可用于指示方向或特殊标记 |
| 六边形节点 | `hexagon`  | 适合网格布局和蜂窝图     |
| 星形节点   | `star`     | 突出显示重要节点         |
| 甜甜圈节点 | `donut`    | 可展示比例或进度信息     |
| 图片节点   | `image`    | 使用图片作为节点主体     |
| HTML节点   | `html`     | 支持自定义HTML内容       |

### 3D 节点

<image width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ShNXTp0u3vkAAAAAAAAAAAAADmJ7AQ/original" />

`@antv/g6-extension-3d` 提供了 3D 节点：

- `Capsule` - 胶囊型节点
- `Cone` - 圆锥型节点
- `Cube` - 立方体节点
- `Cylinder` - 圆柱型节点
- `Plane` - 平面节点
- `Sphere` - 球体节点
- `Torus` - 圆环节点

### React 节点

<image width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7jypQbkp00wAAAAAAAAAAAAADmJ7AQ/original" />

`@antv/g6-extension-react` 提供了 React 节点，支持使用 React 组件作为节点的主体，详细教程请查看 [使用 React 定义节点](/manual/element/node/react-node) 文档。

### 自定义节点

当内置节点和扩展节点无法满足需求时，G6提供了强大的自定义能力：

- 继承内置节点进行扩展
- 创建全新的节点类型

与内置节点不同，**自定义节点需要先注册后使用**。详细教程请参考 [自定义节点](/manual/element/node/custom-node) 文档。

## 数据结构

定义节点时，需要在图的数据对象中添加 `nodes` 字段。每个节点是一个对象，结构如下：

| 属性     | 描述                                                                                         | 类型           | 默认值 | 必选 |
| -------- | -------------------------------------------------------------------------------------------- | -------------- | ------ | ---- |
| id       | 节点的唯一标识符，用于区分不同的节点                                                         | string         | -      | ✓    |
| type     | 节点类型，内置节点类型名称或者自定义节点的名称                                               | string         | -      |      |
| data     | 节点数据，用于存储节点的自定义数据，例如节点的名称、描述等。可以在样式映射中通过回调函数获取 | object         | -      |      |
| style    | 节点样式，包括位置、大小、颜色等视觉属性                                                     | object         | -      |      |
| states   | 节点初始状态，如选中、激活、悬停等                                                           | string[]       | -      |      |
| combo    | 所属的组合 ID，用于组织节点的层级关系，如果没有则为 null                                     | string \| null | -      |      |
| children | 子节点 ID 集合，仅在树图场景下使用                                                           | string[]       | -      |      |

`nodes` 数组中一个数据项的示例：

```json
{
  "id": "node-1",
  "type": "circle",
  "data": { "name": "alice", "role": "Admin" },
  "style": { "x": 100, "y": 200, "size": 32, "fill": "violet" },
  "states": ["selected"],
  "combo": null
}
```

## 配置方法

配置节点的方式有三种，按优先级从高到低如下：

- 使用 `graph.setNode()` 动态配置
- 实例化图时全局配置
- 在数据中动态属性

这几个配置方法可以同时使用。有相同的配置项时，优先级高的方式将会覆盖优先级低的。

### 使用 `graph.setNode()`

可在图实例创建后，使用 `graph.setNode()` 动态设置节点的样式映射逻辑。

该方法需要在 `graph.render()` 之前调用才会生效，并拥有最高优先级。

```js
graph.setNode({
  style: {
    type: 'circle',
    style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});

graph.render();
```

### 实例化图时全局配置

在实例化图时可以通过 `edge` 配置边样式映射，这里的配置是全局的配置，将会在所有边上生效。

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  node: {
    type: 'circle',
    style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});
```

### 在数据中动态配置

如果需要为不同边进行不同的配置，可以将配置写入到边数据中。这种配置方式可以通过下面代码的形式直接写入数据：

```typescript
const data = {
  nodes: [
    {
      id: 'node-1',
      type: 'circle',
      style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
    },
  ],
};
```

### 调整优先级

如果你想让数据中配置的优先级高于全局配置，你可以采取以下方式：

```js
const data = {
  nodes: [
    {
      id: 'node-1',
      type: 'circle',
      style: { size: 60, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
    },
  ],
};

const graph = new Graph({
  node: {
    type: 'circle',
    style: {
      stroke: (d) => d.style.stroke || '#5CACEE',
      lineWidth: 2,
    },
  },
});
```

### 动态更新节点

G6 支持在运行时动态更新节点的样式和状态：

```typescript
// 更新单个节点样式
graph.updateNodeData([
  {
    id: 'node-1',
    style: {
      fill: 'red',
      size: 80,
    },
  },
]);
graph.draw();

// 设置节点状态
graph.setElementState('node-1', ['selected']);
```

:::warning{title=注意}
更新节点时，只有指定的属性会被更新，未指定的属性保持不变。
:::

更多与节点相关的 API 请参考 [API - 元素操作](/api/element)。

## 节点状态

节点可以拥有不同的状态，例如选中、高亮、禁用等。可以通过配置状态样式来定义节点在不同状态下的显示效果：

```typescript
const graph = new Graph({
  node: {
    style: {
      // 默认样式
      fill: '#C6E5FF',
    },
    // 状态样式
    state: {
      selected: {
        fill: '#ffa940',
        stroke: '#ff7a00',
        haloStroke: '#ff7a00',
      },
      highlight: {
        stroke: '#1890ff',
        lineWidth: 3,
      },
    },
  },
});
```

状态系统是实现节点交互效果的基础，更多状态的介绍，请参考 [元素状态](/manual/element/state)。
