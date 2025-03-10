---
title: 节点总览
order: 1
---

## 什么是节点

节点通常用来表示图中的实体或者抽象概念，例如一个人、一个地点、一个组织等，节点可以包含一些属性，例如节点的 ID、名称、类型等。

## 节点体系

G6 的节点体系包括三大类：内置节点、扩展节点和自定义节点。**大多数场景下，内置节点即可满足需求**。

## 内置节点

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

## 扩展节点

除了内置节点，G6 生态还提供了更多扩展节点，需要安装额外的包：

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

`@antv/g6-extension-react` 提供了 React 节点，支持使用 React 组件作为节点的主体。

- `ReactNode` - React节点

## 自定义节点

当内置节点和扩展节点无法满足需求时，G6提供了强大的自定义能力：

- 继承内置节点进行扩展
- 创建全新的节点类型

与内置节点不同，**自定义节点需要先注册后使用**。详细教程请参考 [自定义节点](/manual/element/node/custom-node) 文档。

## 配置和使用

### 基本配置

你可以通过以下方式配置节点类型及其样式：

#### 1. 在数据中配置

```typescript
const data = {
  nodes: [
    {
      id: 'node-1',
      type: 'circle',
      style: {
        size: 60,
        fill: '#1890ff',
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
  ],
};
```

#### 2. 在节点样式映射中配置

```typescript
const graph = new Graph({
  // 其他配置...
  node: {
    type: 'circle',
    style: {
      size: 40,
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
      // 其他样式...
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

// 设置节点状态
graph.setElementState('node-1', ['selected']);
```

:::warning{title=注意}
更新节点时，只有指定的属性会被更新，未指定的属性保持不变。
:::

更多与节点相关的 API 请参考[API - 元素操作](/api/element)。

## 节点与状态

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
