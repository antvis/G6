---
title: Node
order: 1
---

Node继承自Item，所以，Item上面的方法在Node实例中都可以调用。

<a name="SLUnO"></a>
## lock()
> 3.1.4 版本新增

锁定当前节点，锁定节点后，该节点不再响应拖动节点的事件。

提示锁定节点后，拖动画布和缩放画布的操作依然对该节点有效，如果想在锁定节点后，不响应拖动画布和缩放的事件，需要自定义拖动画布和缩放的 Behavior，具体可参考锁定节点不响应拖动画布的事件【todo】和锁定节点不响应缩放事件【todo】。

<a name="AfFiy"></a>
### 用法

```javascript
const node = graph.findById('node')
node.lock()
```

<a name="jr5CC"></a>
## unlock()
> 3.1.4 版本新增

解锁锁定的节点。

<a name="8VZm0"></a>
### 用法

```javascript
const node = graph.findById('node')
node.unlock()
```

<a name="Bkrfu"></a>
## hasLocked()
> 3.1.4 版本新增

检测节点是否处于锁定状态。

<a name="XmQxu"></a>
### 返回值

- 返回值类型：boolean；
- 返回 true 表示当前解锁处于锁定状态，否则表示未锁定。

<a name="Ae5cp"></a>
### 用法

```javascript
const node = graph.findById('node')
const hasLocked = node.hasLocked()
```

<a name="lYDEz"></a>
## getEdges()
获取与当前节点有关联的所有边。

<a name="Y14Od"></a>
#### 返回值

- 返回值类型：Edge[]；
- 返回边实例的集合。

<a name="Dy8Xj"></a>
#### 用法
```javascript
// 获取与node关联的所有边
const edges = node.getEdges()
```

<a name="ZJeDd"></a>
## getInEdges()
获取与当前节点关联的所有入边。

<a name="1gPYK"></a>
#### 返回值

- 返回值类型：Edge[]；
- 返回入边实例的集合。

<a name="TJgSX"></a>
#### 用法
```javascript
// 获取与node关联的所有入边
const edges = node.getInEdges()
```

<a name="lxn9E"></a>
## getOutEdges()
获取与当前节点关联的所有出边。

<a name="Tn9nQ"></a>
#### 返回值

- 返回值类型：Edge[]；
- 返回出边实例的集合。

<a name="nvBCT"></a>
#### 用法
```javascript
// 获取与node关联的所有出边
const edges = node.getOutEdges()
```

<a name="I4hME"></a>
## getAnchorPoints()
获取节点上面定义的锚点。

<a name="TnYkR"></a>
#### 返回值

- 返回值类型：array；
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

<a name="a76YH"></a>
#### 用法
```javascript
// 获取定义在节点上的锚点数据
const anchor = node.getAnchorPoints()
```

<a name="mV7aH"></a>
## getLinkPoint(point)
获取距离指定坐标最近的一个锚点。

<a name="81k4C"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| point | object | true | 节点外部的一个点，用于计算交点及最近的锚点 |


<a name="62RfO"></a>
#### 返回值

- 返回值类型：object；
- 返回值表示连接点的坐标(x, y)，如果没有合适的锚点和连接点，则返回中心点。

<a name="8Kui7"></a>
#### 用法
```javascript
const point = {
	x: 100,
  y: 105
}
// 获取连接点
const linkPoint = node.getLinkPoint(point)
```


<a name="aTLid"></a>
## getLinkPointByAnchor(index)
根据锚点索引获取连接点的x、y坐标。

<a name="QZIiH"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| index | number | true | 锚点的索引 |


<a name="QmAwd"></a>
#### 返回值

- 返回值类型：object；
- 返回值表示连接点的坐标(x, y)。

<a name="EVqYi"></a>
#### 用法
```javascript
// 获取定义在节点上的第一个锚点
const anchor = node.getLinkPointByAnchor(0)
```
<a name="G8EsV"></a>
## addEdge(edge)
添加指定的边到当前节点上。

<a name="ZSdxK"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| edge | Edge | true | Edge实例 |


<a name="5hzG1"></a>
#### 用法
```javascript
const edge = new Edge({
	// TODO
})
node.addEdge(edge)
```

<a name="H8oW9"></a>
## removeEdge(edge)
移除与当前节点相关的指定边。

<a name="SOwVJ"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| edge | Edge | true | Edge实例 |


<a name="vUEcM"></a>
#### 用法
```javascript
const edge = // TODO
node.removeEdge(edge)
```
