---
title: 查找相关
order: 10
---

### graph.find(type, fn)

根据具体规则查找单个元素。

**参数**

| 名称 | 类型     | 是否必选 | 描述                                  |
| ---- | -------- | -------- | ------------------------------------- |
| type | string   | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| fn   | Function | true     | 查找的规则                            |

**返回值**

- 返回值类型：Object；
- 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 `undefined` 。

**用法**

```javascript
const findNode = graph.find('node', (node) => {
  return node.get('model').x === 100;
});
```

### graph.findById(id)

根据 ID，查询对应的元素实例。

**参数**

| 名称 | 类型   | 是否必选 | 描述    |
| ---- | ------ | -------- | ------- |
| id   | string | true     | 元素 ID |

**返回值**

- 返回值类型：Object；
- 如果有符合规则的元素实例，则返回该元素实例，否则返回 `undefined`。

**用法**

```javascript
const node = graph.findById('node');
```

### graph.findAll(type, fn)

查询所有满足规则的元素。

**参数**

| 名称 | 类型     | 是否必选 | 描述                                  |
| ---- | -------- | -------- | ------------------------------------- |
| type | string   | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| fn   | Function | true     | 查找的规则                            |

**返回值**

- 返回值类型：Array；
- 如果有符合规则的元素实例，则返回所有元素实例，否则返回 `undefined`。

**用法**

```javascript
const nodes = graph.findAll('node', (node) => {
  return node.get('model').x;
});
```

### graph.findAllByState(type, state)

查找所有处于指定状态的元素。

**参数**

| 名称  | 类型   | 是否必选 | 描述                                  |
| ----- | ------ | -------- | ------------------------------------- |
| type  | string | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| state | string | true     | 状态名称                              |

**返回值**

- 返回值类型：Array；
- 返回所有指定状态的元素实例。

**用法**

```javascript
// 查询所有选中的元素
const nodes = graph.findAllByState('node', 'selected');
```
