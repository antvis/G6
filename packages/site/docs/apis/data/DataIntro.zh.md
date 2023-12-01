---
title: 数据使用简介
order: 0
---

在 G6 5.0 中，为了更好地做好数据隔离，控制数据映射，全新定义规范数据流如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H5HyRKpMaUAAAAAAAAAAAAAADmJ7AQ/original" width="500" alt="data process" />

### User Data 用户输入数据

用户输入的原始数据，是节点、边、群组的集合，可以是图数据[GraphData](./GraphData.zh.md)或树数据[TreeData](./TreeData.zh.md)。

数据输入的方式有：

1. **图实例化时传入**

实例化完成后自动渲染图。

```js
const data = {
  nodes: [], // 节点集
  edges: [], // 边集
  combos: [], // 群组集
};
const graph = new Graph({
  // ... 其他配置
  data,
});
```

2. **调用 API 传入数据**

图实例读取并渲染数据。

```js
graph.read(data);
```

3. **调用 API 更新数据**

- 更新全量数据 [changeData](../graph//Graph.zh.md#changedata)

```js
graph.changeData(data);
```

- 新增数据 [addData](../graph//Graph.zh.md#adddata)

```js
graph.addData('node', [
  { id: 'node-1', data: {} },
  { id: 'node-2', data: {} },
]);
graph.addData('edge', [{ id: 'edge-1', source: 'node-2', target: 'node-1', data: {} }]);
```

- 更新部分已有数据 [updateData](../graph/Graph.zh.md#updatedata)

```js
const nodes = [
  { id: 'node-1', data: { xx: 1 } },
  { id: 'node-2', data: { xx: 2 } },
];
// 将更新已存在的 node-1 和 node-2 的上述属性
graph.updateData('node', nodes);
```

- 删除部分数据 [removeData](../graph/Graph.zh.md#removedata)

```js
graph.removeData('node', ['node-1', 'node-2']);
```

### Transforms 数据转换

对用户数据进行转换和处理，例如属性字段转换、数据过滤、数据聚合等。转换器可以根据实际需求进行自定义配置，以便将输入数据转换为适合后续处理的内部数据格式。

使用图配置中的 `transforms` 字段来配置转换器。`transforms` 接受转换器数组，G6 在读取用户数据时，将按照 `transforms` 中转换器的顺序执行数据转换，前一个转换器的结果将作为下一个转换器的输入。[Transforms DEMO](/examples/feature/features/#rendererSwitch).

### Inner Data 内部数据

内部数据是在**数据转换**后得到的数据，用作后续数据映射的输入，也用于其他数据处理和操作。

:::warning{title=注意}
在 G6 读取用户数据后，后续用户获取和修改的都是内部数据
:::

### Mappers 数据映射

Mappers 用于将内部数据映射到视觉通道。它们根据预定义的规则和配置，将内部数据映射到特定的节点样式、边样式、标签等可视化属性上。Mappers 支持 JSON 格式的配置，也支持函数式的配置。

用户通过图配置中的 [node](../graph/Specification.zh.md#node)、[edge](../graph/Specification.zh.md#edge)、[combo](../graph/Specification.zh.md#combo) 属性来配置节点、边、群组的映射规则。[Mappers DEMO](/zh/examples/feature/features/#lodLevels)

### Display Data 渲染数据

经过 Mappers 映射生成的最终用于渲染的数据，它包含了节点的位置、各个图形的样式等，用于最终的图形渲染和展示。

:::warning{title=注意}
只有 G6 可以访问渲染数据，用户无法直接获取和修改渲染数据
:::
