---
title: Edge
order: 1
---

Edge继承自Item，所以，Item上面的方法在Edge实例中都可以使用。

<a name="SrXEa"></a>
## setSource(source)
设置边的起始节点。

<a name="uZU6l"></a>
#### 参数
| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| source | Node | true | 起始节点实例 |

<a name="27mQm"></a>
#### 用法
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

<a name="E5wKH"></a>
## setTarget(target)
设置边的终止节点。

<a name="Xixut"></a>
#### 参数
| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| target | Node | true | 终止节点实例 |

<a name="U6Lw1"></a>
#### 用法
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

<a name="HsImC"></a>
## getSource()
获取当前边的起始节点。

<a name="20oZg"></a>
#### 返回值

- 返回值类型：Node；
- 返回值为起始节点的实例。

<a name="1PzgJ"></a>
#### 用法
```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = edge.getSource()
```

<a name="OO4X1"></a>
## getTarget()
获取当前边的终止节点。

<a name="dYdvv"></a>
#### 返回值

- 返回值类型：Node；
- 返回值为终止节点的实例。

<a name="nXuJ1"></a>
#### 用法
```javascript
const edge = new Edge(
  {
    // TODO
	}
)

const node = edge.getTarget()
```
