---
title: Edge
order: 1
---

Edge 继承自 Item。所以 Item 的方法在 Edge 实例中都可以使用。


## setSource(source)
设置边的起始节点。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| source | Node | true | 起始节点实例 |


**用法**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = new Node({
  // TODO
})

edge.setSource(node)
```


## setTarget(target)
设置边的终止节点。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| target | Node | true | 终止节点实例 |


**用法**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = new Node({
  // TODO
})

edge.setTarget(node)
```


## getSource()
获取当前边的起始节点。


**返回值**

- 返回值类型：Node；
- 返回值为起始节点的实例。


**用法**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = edge.getSource()
```


## getTarget()
获取当前边的终止节点。


**返回值**

- 返回值类型：Node；
- 返回值为终止节点的实例。


**用法**

```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = edge.getTarget()
```
