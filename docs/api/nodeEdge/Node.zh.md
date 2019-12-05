---
title: Node
order: 1
---

Node 继承自 Item。所以 Item 上面的方法在 Node 实例中都可以调用。


## lock()
> 3.1.4 版本新增

锁定当前节点，锁定节点后，该节点不再响应拖动节点的事件。

提示：锁定节点后，拖动画布和缩放画布的操作依然对该节点有效。如果想在锁定节点后，不响应拖动画布和缩放的事件，需要自定义拖动画布和缩放的 Behavior，具体可参考 [锁定节点不响应拖动画布的事件](/zh/docs/manual/advanced/lock-node#拖动画布时候不处理锁定的节点) 和 [锁定节点不响应缩放事件](/zh/docs/manual/advanced/lock-node#拖动画布时候不处理锁定的节点)。


**用法**

```javascript
const node = graph.findById('node');
node.lock();
```


## unlock()
> 3.1.4 版本新增

解锁锁定的节点。


**用法**

```javascript
const node = graph.findById('node');
node.unlock();
```


## hasLocked()
> 3.1.4 版本新增

检测节点是否处于锁定状态。


**返回值**

- 返回值类型：Boolean；
- 返回 true 表示当前解锁处于锁定状态，否则表示未锁定。


**用法**

```javascript
const node = graph.findById('node');
const hasLocked = node.hasLocked();
```


## getEdges()
获取与当前节点有关联的所有边。


**返回值**

- 返回值类型：Edge[]；
- 返回边实例的集合。


**用法**
```javascript
// 获取与 node 关联的所有边
const edges = node.getEdges();
```


## getInEdges()
获取与当前节点关联的所有入边。


**返回值**

- 返回值类型：Edge[]；
- 返回入边实例的集合。


**用法**
```javascript
// 获取与 node 关联的所有入边
const edges = node.getInEdges();
```


## getOutEdges()
获取与当前节点关联的所有出边。


**返回值**

- 返回值类型：Edge[]；
- 返回出边实例的集合。


**用法**
```javascript
// 获取与 node 关联的所有出边
const edges = node.getOutEdges();
```


## getAnchorPoints()
获取节点上面定义的锚点。


**返回值**

- 返回值类型：Array；
- 返回值的数据结构：
```javascript
[
      0: {
        x: 100, 
        y: 105,
        index: 0
      },
      1: {
        x: 200, 
        y: 105,
        index: 1
      }
]
```


**用法**
```javascript
// 获取定义在节点上的锚点数据
const anchor = node.getAnchorPoints();
```


## getLinkPoint(point)
获取距离指定坐标最近的一个锚点。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| point | Object | true | 节点外部的一个点，用于计算交点及最近的锚点 |



**返回值**

- 返回值类型：Object；
- 返回值表示连接点的坐标 (x, y)，如果没有合适的锚点和连接点，则返回中心点。


**用法**
```javascript
const point = {
	x: 100,
  y: 105
};
// 获取连接点
const linkPoint = node.getLinkPoint(point);
```



## getLinkPointByAnchor(index)
根据锚点索引获取连接点的 x、y 坐标。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| index | Number | true | 锚点的索引 |



**返回值**

- 返回值类型：Object；
- 返回值表示连接点的坐标 (x, y)。


**用法**
```javascript
// 获取定义在节点上的第一个锚点
const anchor = node.getLinkPointByAnchor(0);
```

## addEdge(edge)
添加指定的边到当前节点上。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| edge | Edge | true | Edge 实例 |



**用法**
```javascript
const edge = new Edge({
	// TODO
});
node.addEdge(edge);
```


## removeEdge(edge)
移除与当前节点相关的指定边。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| edge | Edge | true | Edge 实例 |



**用法**
```javascript
const edge = graph.findById('edge1'); 
node.removeEdge(edge);
```
