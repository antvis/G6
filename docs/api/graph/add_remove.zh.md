---
title: 增删元素
order: 1
---

新增元素（节点，边，或节点分组）。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意: </strong></span>将会直接使用 `model` 对象作为新增元素的数据模型，G6 内部可能会对其增加或修改一些必要的字段。若不希望原始参数被修改，建议在使用深拷贝后的 `model`。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | string | true | 元素类型，可选值为 `'node'`、`'edge'` 和 `'group'` |
| model | Object | true | 元素的数据模型，具体内容参见[元素配置项](/zh/docs/api/nodeEdge/itemProperties)。`type: 'group'` 时，参看 [手动创建节点分组文档](/zh/docs/manual/advanced/create-node-group) |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

graph.addItem('node', model);

// 当 type 为 'group' 时候，model 的数据结构如下：
const model = {
  groupId: 'xxx000999',
  nodes: ['123', '23'],
  type: 'rect',
  zIndex: 0,
  title: {
    text: '名称',
  },
};

graph.addItem('group', model);
```

### graph.add(type, model, stack)

同 addItem(type, model, stack)。

### graph.remove(item, stack)

The same as removeItem(item)。

### graph.removeItem(item, stack)

删除元素，当 item 为 group ID 时候，则删除分组。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.removeItem(item);

// 该操作不会进入到 undo & redo 栈，即 redo & undo 操作会忽略该操作
graph.removeItem(item, false);
```

### graph.remove(item, stack)

同 removeItem(item, stack)。
