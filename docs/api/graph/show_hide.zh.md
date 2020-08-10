---
title: 显示/隐藏元素
order: 10
---

### graph.showItem(item, stack)

显示指定的元素。若 item 为节点，则相关边也会随之显示。而 [item.show()](/zh/docs/api/nodeEdge/Item#show) 则将只显示自身。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('nodeId');
graph.showItem(item);

// 等价于
graph.showItem('nodeId');
```

### graph.hideItem(item, stack)

隐藏指定元素。若 item 为节点，则相关边也会随之隐藏。而 [item.hide()](/zh/docs/api/nodeEdge/Item#hide) 则将只隐藏自身。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('nodeId');
graph.hideItem(item);

// 等价于
graph.hideItem('nodeId');
```
