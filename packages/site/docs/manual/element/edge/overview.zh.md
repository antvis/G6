---
title: 边总览
order: 1
---

## 什么是边

边（Edge）是图中的基本元素之一，用于连接两个节点或组合，表示它们之间的关系。在 G6 中，边具有方向性，从 `source` 指向 `target`，也可以通过配置隐藏箭头以表示无方向连接。

你可以在任意两个节点、组合，或节点与组合之间创建边，还可以通过创建多条边来表达不同的关系类型。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

G6 提供了以下内置边：

- `line` 直线边
- `polyline` 折线边
- `quadratic` 二次贝塞尔曲线边
- `cubic` 三次贝塞尔曲线边
- `cubicVertical` 垂直三次贝塞尔曲线边
- `cubicHorizontal` 水平三次贝塞尔曲线边

### 数据结构

定义边时，需要在图的数据对象中添加 `edges` 字段。每条边是一个对象，结构如下：

| 属性   | 描述                                                                  | 类型     | 默认值 | 必选 |
| ------ | --------------------------------------------------------------------- | -------- | ------ | ---- |
| source | 边起始节点 ID                                                         | string   | -      | ✓    |
| target | 边目标节点 ID                                                         | string   | -      | ✓    |
| id     | 边的唯一标识符                                                        | string   | -      |      |
| type   | 边类型，内置边类型名称或者自定义边的名称，比如 `line` 或者 `polyline` | string   | -      |      |
| data   | 边数据，用于存储边的自定义数据，可以在样式映射中通过回调函数获取      | object   | -      |      |
| style  | 边样式，包括线条颜色、宽度、箭头等视觉属性                            | object   | -      |      |
| states | 边初始状态                                                            | string[] | -      |      |

`edges` 数组中一个数据项的示例：

```json
{
  "source": "alice",
  "target": "bob",
  "type": "line",
  "data": { "relationship": "friend", "strength": 5 },
  "style": { "stroke": "green", "lineWidth": 2 },
  "states": ["hover"]
}
```

### 配置方法

配置边的方式有三种，按优先级从高到低如下：

- 使用 `graph.setEdge()` 动态配置
- 实例化图时全局配置
- 在数据中动态属性

这几个配置方法可以同时使用。有相同的配置项时，优先级高的方式将会覆盖优先级低的。

### 使用 `graph.setEdge()`

可在图实例创建后，使用 `graph.setEdge()` 动态设置边的样式映射逻辑。

该方法需要在 `graph.render()` 之前调用才会生效，并拥有最高优先级。

```js
graph.setEdge({
  style: {
    type: 'line',
    style: { stroke: '#5CACEE', lineWidth: 2 },
  },
});

graph.render();
```

### 实例化图时全局配置

在实例化图时可以通过 `edge` 配置边样式映射，这里的配置是全局的配置，将会在所有边上生效。

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line',
    style: { stroke: '#5CACEE', lineWidth: 2 },
  },
});
```

### 在数据中动态配置

如果需要为不同边进行不同的配置，可以将配置写入到边数据中。这种配置方式可以通过下面代码的形式直接写入数据：

```typescript
const data = {
  edges: [
    {
      source: 'node-1',
      target: 'node-2',
      type: 'line',
      style: { stroke: 'orange' },
    },
  ],
};
```

### 调整优先级

如果你想让数据中配置的优先级高于全局配置，你可以采取以下方式：

```js
const data = {
  edges: [
    {
      source: 'node-1',
      target: 'node-2',
      type: 'line',
      style: { stroke: 'orange' },
    },
  ],
};

const graph = new Graph({
  edge: {
    type: 'line',
    style: {
      stroke: (d) => d.style.stroke || '#5CACEE',
      lineWidth: 2,
    },
  },
});
```

## 自定义边

当内置边无法满足需求时，G6 提供了强大的自定义能力：

- 继承内置边进行扩展
- 创建全新的边类型

与组合不同，自定义边需要先注册后使用。详细教程请参考 [自定义边](/manual/element/edge/custom-edge) 文档。
