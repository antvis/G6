---
title: 数据
order: 0
---

设置图初始化数据。

### graph.data(_data_)

<description> _Object_ **required** </description>

初始化的图数据，是一个包括 nodes 数组和 edges 数组的对象。

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph 是 Graph 的实例
graph.data(data);
```

### graph.save()

获取图数据。

该方法无参数。

**返回值**

- 返回值类型：Object；
- 返回值包括所有节点和边，数据结构如下下所示：

```javascript
{
	nodes: [],
  edges: [],
  groups: [],
}
```

**用法**

```javascript
graph.save();
```

### graph.read(data)

接收数据，并进行渲染，read 方法的功能相当于 data 和 render 方法的结合。

**参数**

| 名称 | 类型   | 是否必选 | 描述                                             |
| ---- | ------ | -------- | ------------------------------------------------ |
| data | Object | true     | 初始化的图数据，是一个包括 nodes 和 edges 的对象 |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph是Graph的实例
graph.read(data);
```

### graph.changeData(data, stack)

更新数据源，根据新的数据重新渲染视图。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| data | Object | false | 图数据，是一个包括 nodes 和 edges 的对象。若不指定该参数，则使用当前数据重新渲染 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph是Graph的实例
graph.changeData(data);
// 若不指定该参数，则使用当前图上的数据重新渲染
graph.changeData();
```
