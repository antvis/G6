---
title: 组合总览
order: 1
---

## 什么是组合

组合(Combo) 全称为 Combination，是 G6 中的一种特殊的图元素，它可以包含节点和子组合，类似“群组”或“容器”的概念。它通常用于表示集合关系，例如一个部门包含多个员工，一个城市包含多个区域等。

<image width="450" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" />

:::warning{title=注意}
不推荐在**树图**中使用 Combo。因为树图的布局与 Combo 的布局机制不兼容，容易导致节点错位或样式混乱。
:::

G6 的内置 Combo 包括 `circle`（圆形组合）和 `rect` (矩形组合) 两种类型，分别如下图所示：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kbk1S5pzSY0AAAAAAAAAAAAADmJ7AQ/original" width="200" />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PKtgSZzmb3YAAAAAAAAAAAAADmJ7AQ/original" width="200" />

## 数据结构

定义 Combo 时，需要在图的数据对象中添加 `combos` 字段，每个 Combo 是一个对象，结构如下：

| 属性   | 描述                                                                    | 类型           | 默认值 | 必选 |
| ------ | ----------------------------------------------------------------------- | -------------- | ------ | ---- |
| id     | 组合的唯一标识符                                                        | string         | -      | ✓    |
| type   | 组合类型，内置组合类型名称或者自定义组合名称，比如 `circle` 或者 `rect` | string         | -      |      |
| data   | 组合数据，用于存储组合的自定义数据，可以在样式映射中通过回调函数获取    | object         | -      |      |
| style  | 组合样式                                                                | object         | -      |      |
| states | 组合初始状态                                                            | string[]       | -      |      |
| combo  | 组合的父组合 ID。如果没有父组合，则为 null                              | string \| null | -      |      |

`combos` 数组中一个数据项的示例：

```json
{
  "id": "combo1",
  "type": "circle",
  "data": { "groupName": "Group A" },
  "style": { "fill": "lightblue", "stroke": "blue", "collapsed": true },
  "states": [],
  "combo": null
}
```

要将节点归属到某个 Combo，可以在节点数据中添加 `combo` 字段：

```json
{
  "nodes": [{ "id": "node1", "combo": "comboA" }], // node1 属于 comboA
  "combos": [{ "id": "comboA" }] // 定义 comboA
}
```

## 配置方法

配置 Combo 的方式有三种，按优先级从高到低如下：

- 使用 `graph.setCombo()` 动态配置
- 实例化图时全局配置
- 在数据中动态属性

这几个配置方法可以同时使用。有相同的配置项时，优先级高的方式将会覆盖优先级低的。

### 使用 `graph.setCombo()`

可在图实例创建后，使用 `graph.setCombo()` 动态设置 Combo 的样式映射逻辑。

该方法需要在 `graph.render()` 之前调用才会生效，并拥有最高优先级。

```js
graph.setCombo({
  style: {
    type: 'circle',
    style: { fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});

graph.render();
```

### 实例化图时全局配置

在实例化图时可以通过 `combo` 配置 Combo 样式映射，这里的配置是全局的配置，将会在所有 Combo 上生效。

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  // 在组合配置中指定组合类型以及组合样式类型
  combo: {
    type: 'circle',
    style: { fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 },
  },
});
```

### 在数据中动态配置

如果需要为不同 Combo 进行不同的配置，可以将配置写入到 Combo 数据中。这种配置方式可以通过下面代码的形式直接写入数据：

```typescript
// 在数据中指定组合类型以及组合样式类型
const data = {
  combos: [
    {
      id: 'combo-1',
      type: 'circle',
      style: { size: 100, stroke: 'orange' },
    },
  ],
};
```

### 调整优先级

如果你想让数据中配置的优先级高于全局配置，你可以采取以下方式：

```js
const data = {
  combos: [
    {
      id: 'combo-1',
      type: 'circle',
      style: { size: 100, stroke: 'orange' },
    },
  ],
};

const graph = new Graph({
  combo: {
    type: (d) => d.type || 'rect',
    style: {
      stroke: (d) => d.style.stroke || 'blue',
    },
  },
});
```

## 示例

```js | ob
(() => {
  const { Graph, register, Rect, ExtensionCategory } = g6;

  const container = createContainer({ height: 450 });

  const data = {
    nodes: [
      {
        id: 'node1',
        combo: 'combo1',
        style: { x: 245, y: 200 },
      },
      {
        id: 'node2',
        combo: 'combo1',
        style: { x: 210, y: 250 },
      },
      {
        id: 'node3',
        combo: 'combo1',
        style: { x: 280, y: 245 },
      },
      {
        id: 'node4',
        combo: 'combo2',
        style: { x: 400, y: 165 },
      },
      {
        id: 'node5',
        combo: 'combo2',
        style: { x: 450, y: 162 },
      },
      {
        id: 'node6',
        combo: 'combo3',
        style: { x: 425, y: 300 },
      },
      {
        id: 'node7',
        combo: 'combo3',
        style: { x: 360, y: 332 },
      },
    ],
    edges: [],
    combos: [
      {
        id: 'combo1',
        combo: 'combo3',
        data: { label: 'Combo A' },
      },
      {
        id: 'combo2',
        combo: 'combo3',
        data: { label: 'Combo B' },
      },
      {
        id: 'combo3',
        data: { label: 'Combo C' },
      },
      {
        id: 'combo4',
        data: { label: 'Combo D' },
        style: { x: 58, y: 248 },
      },
    ],
  };

  const graph = new Graph({
    container,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'center',
        labelFill: '#fff',
        labelFontSize: 10,
      },
    },
    combo: {
      type: 'circle',
      style: {
        padding: 2,
        labelText: (d) => d.data.label,
        labelPlacement: 'top',
      },
    },
    behaviors: [
      'collapse-expand',
      {
        type: 'drag-element',
        dropEffect: 'link',
      },
    ],
  });

  graph.render();

  return container;
})();
```

## Combo 交互

只是简单地将 Combo 渲染出来，并没有多大的实用价值，只有支持一系列的交互操作后，才能最大程度地体现 Combo 的价值。

在 G6 中，我们内置了 `drag-element`、`collapse-expand` 三个交互。

#### drag-element

支持拖动节点和 Combo。拖动 Combo 过程中，会动态改变 Combo 中节点和边的位置，在拖拽完成以后，保持 Combo 和节点的相对位置不变。还可以通过设置 `dropEffect: 'link'` 在拖拽时改变 Combo 的从属关系。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rJiHQahxgj4AAAAAAAAAAAAAemJ7AQ/original" width="400" />

#### collapse-expand

支持双击 Combo 收起和展开 Combo ，收起 Combo 以后，隐藏 Combo 中的所有节点，外部节点和 Combo 中节点有连线的情况下，所有连接会连接到 Combo 上面。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PfnsSZSkRagAAAAAAAAAAAAAemJ7AQ/original" width="400" />

## 自定义组合

当内置组合无法满足需求时，G6 提供了强大的自定义能力：

- 继承内置组合进行扩展
- 创建全新的组合类型

与组合不同，自定义组合需要先注册后使用。详细教程请参考 [自定义组合](/manual/element/combo/custom-combo) 文档。
