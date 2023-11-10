---
title: 数据使用简介
order: 0
---

在 G6 v5 中，为了更好地做好数据隔离，控制数据映射，全新定义规范数据流如下：

【User Data】 - _Transforms_ -> 【Inner Data】 - _Mappers_ -> 【Display Data】

以下介绍各个阶段的数据以及转换阶段。

### User Data 用户输入数据

数据类型为 [`GraphData`](./GraphData.zh.md) 或 [`TreeData`](./TreeData.zh.md)。用户输入数据是由用户提供的原始数据，可以是来自业务的数据。是节点、边、Combo 的集合。这些数据可能来自外部数据源，或者是用户通过交互操作生成的。

用户数据输入的方式有：

1. **图实例化时传入配置**

实例化完成后自动渲染图。

```javascript
const data = {
    nodes: [...],
    edges: [...],
    combos: [...]
  }
const graph = new Graph({
  // ... 其他配置
  data
})
```

2. **调用 API 传入数据**

图实例读取并渲染数据。

```javascript
graph.read(data);
```

3. **调用 API 更新数据**

- 更新全量数据 [changeData](../graph//Graph.zh.md#changedata)

```javascript
graph.changeData(data);
```

- 新增部分数据 [addData](../graph//Graph.zh.md#adddata)

```javascript
graph.addData('node', [
  { id: 'newnode-1', data: {} },
  { id: 'newnode-2', data: {} },
]);
graph.addData('edge', [{ id: 'newedge-1', source: 'newnode-2', target: 'newnode-1', data: {} }]);
```

- 更新部分已有数据 [updateData](../graph//Graph.zh.md#updatedata)

```javascript
const nodes = [
  { id: 'node-1', data: { xx: 1 } },
  { id: 'node-2', data: { xx: 2 } },
];
// 将更新已存在的 node-1 和 node-2 的上述属性
graph.updateData('node', nodes);
```

- 删除部分数据 [removeData](../graph//Graph.zh.md#removedata)

```javascript
graph.removeData('node', ['node-1', 'node-2']);
```

### Transforms 数据转换器

数据转换器是用于对用户输入数据进行转换和处理的功能模块。它们可以执行各种操作，例如属性字段转换、数据过滤、数据聚合等。转换器可以根据实际需求进行自定义配置，以便将输入数据转换为适合后续处理的内部数据格式。

使用图配置中的 `transforms` 字段配置的各种转换器。`transforms` 接受的是转换器配置数组，G6 在读取用户数据时，将按照 `transforms` 中转换器的顺序执行数据转换，前一个转换器的结果将作为下一个转换器的输入 [Transforms DEMO](/en/examples/feature/features/#rendererSwitch).

### Inner Data 内部流转数据

内部流转数据是在 Transforms 转换阶段后生成的数据，它是经过转换器处理和转换后的数据。内部流转数据可以作为后续数据映射的输入，也可以用于其他数据处理和操作。在 G6 读取用户数据后，后续用户获取和修改的都是内部流转数据。

### Mappers 数据映射器

数据映射器是用于将内部流转数据映射到具体的视觉通道上。它们根据预定义的规则和配置，将内部数据映射到特定的节点样式、边样式、标签等可视化属性上。数据映射器支持 JSON 格式的配置，也支持函数式的配置。

使用图配置中的 `node`，`edge`，或 `combo`，类型见：TODO。 [Mappers DEMO](/zh/examples/feature/features/#lodLevels).

### Display Data 渲染数据

渲染数据是经过数据映射器（Mappers）处理后生成的最终用于渲染的数据，您将不会在任何地方读取到这份数据。它包含了节点的位置、各个图形的样式等，用于最终的图形渲染和展示。
