---
title: Edge
order: 2
---

Edge 继承自 Item。所以 Item 的方法在 Edge 实例中都可以使用。本文仅介绍 Edge 类的通用方法，内置节点见 [内置节点文档](/zh/docs/manual/middle/elements/edges/defaultEdge) 和 [demo](/zh/examples/item/defaultEdges)，自定义节点见 [自定义节点文档](/zh/docs/manual/advanced/custom-edge) 和 [demo](/zh/examples/item/customEdge)。

## setSource(source)

设置边的起始节点。

**参数**

| 名称   | 类型 | 是否必选 | 描述         |
| ------ | ---- | -------- | ------------ |
| source | Node | true     | 起始节点实例 |

**用法**

```javascript
const edge = new Edge({
  // TODO
});

const node = new Node({
  // TODO
});

edge.setSource(node);
```

## setTarget(target)

设置边的终止节点。

**参数**

| 名称   | 类型 | 是否必选 | 描述         |
| ------ | ---- | -------- | ------------ |
| target | Node | true     | 终止节点实例 |

**用法**

```javascript
const edge = new Edge({
  // TODO
});

const node = new Node({
  // TODO
});

edge.setTarget(node);
```

## getSource()

获取当前边的起始节点。

**返回值**

- 返回值类型：Node；
- 返回值为起始节点的实例。

**用法**

```javascript
const edge = new Edge({
  // TODO
});

const node = edge.getSource();
```

## getTarget()

获取当前边的终止节点。

**返回值**

- 返回值类型：Node；
- 返回值为终止节点的实例。

**用法**

```javascript
const edge = new Edge({
  // TODO
});

const node = edge.getTarget();
```
