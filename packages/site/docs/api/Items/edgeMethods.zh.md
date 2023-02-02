---
title: edge 实例方法
order: 2
---

Edge 继承自 Item。所以 Item 的方法在 Edge 实例中都可以使用。本文仅介绍 Edge 类的通用方法，内置边见 [内置边文档](/zh/docs/manual/middle/elements/edges/defaultEdge) 和 [demo](/zh/examples/item/defaultEdges)，自定义节点见 [自定义边文档](/zh/docs/manual/middle/elements/edges/custom-edge) 和 [demo](/zh/examples/item/customEdge)。

### edge.setSource(source)

设置边的起始节点。

**参数**

| 名称   | 类型 | 是否必选 | 描述         |
| ------ | ---- | -------- | ------------ |
| source | Node | true     | 起始节点实例 |

**用法**

```javascript
const edge = new Edge({
  // ...
});

const node = new Node({
  // ..
});

edge.setSource(node);
```

### edge.setTarget(target)

设置边的终止节点。

**参数**

| 名称   | 类型 | 是否必选 | 描述         |
| ------ | ---- | -------- | ------------ |
| target | Node | true     | 终止节点实例 |

**用法**

```javascript
edge.setTarget(node);
```

### edge.getSource()

获取当前边的起始节点。

**返回值**

- 返回值类型：Node；
- 返回值为起始节点的实例。

**用法**

```javascript
const node = edge.getSource();
```

### edge.getTarget()

获取当前边的终止节点。

**返回值**

- 返回值类型：Node；
- 返回值为终止节点的实例。

**用法**

```javascript
const node = edge.getTarget();
```
