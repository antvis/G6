---
title: 手动创建节点分组 Group
order: 8
---

CustomGroup 为节点分组，支持 Circle 和 Rect 两种类型。用户可通过 CustomGroup 创建节点分组、设置分组的样式、计算分组的坐标及宽高、收起和展开分组。

分组默认是根据数据自动渲染的，当数据中存在 `groups` 时根据 `groups` 字段渲染分组，当不存在 `groups` 时，则根据 `nodes` 数据中是否存在 `groupId` 来渲染分组。

当需要通过手动创建分组时候，可以参考下面的文档。

<a name="MyoG2"></a>
# CustomGroup 实例化
<br />
CustomGroup 实例会在实例化 Graph 的过程中自动创建，不需要用户手动实例化。

<a name="zndgJ"></a>
# 配置项
<br />
在实例化 Graph 的时候，通过配置 `groupType` 和 `groupStyle` 来指定分组的类型及样式。
```javascript
const graph = new G6.Graph({
	container: 'mountNode',
  width: 500,
  height: 500,
  groupType: 'circle',
  groupStyle: {
    default: {},
    hover: {},
    collapse: {} 
  }
})
```

<a name="zR1CD"></a>
## groupType
groupType 属性用于指定分组的类型，默认为 `circle`，支持 `circle` 和 `rect`两种。

**groupType 指定为 **`**circle**`** 时**的效果如下。<br />![group2.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1568080532182-5b70448c-ee95-4fdc-81ca-ffac68535c72.gif#align=left&display=inline&height=533&name=group2.gif&originHeight=533&originWidth=763&search=&size=261828&status=done&width=763)<br />**groupType 指定为 **`**rect**`** 时**的效果如下图。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1568080506714-79dc8f77-1423-4065-9212-918add95d3df.gif#align=left&display=inline&height=415&name=3.gif&originHeight=415&originWidth=514&search=&size=84184&status=done&width=514)

<a name="f283J"></a>
## groupStyle
`groupStyle` 用于指定分组在默认（default）、交互过程中（hover）及收起（collapse）状态下的样式。

<a name="237ES"></a>
### 通用属性
default、hover 和 collapse 支持的所有通用的属性参考[这里](https://www.yuque.com/antv/g6/ffzwfp)。除过这些通用的属性，default 和 collapse 分别还支持以下特有属性。

<a name="xVWVY"></a>
### default
| 属性名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| minDis | 距离右上角最小距离 | number | 不存在嵌套分组时使用该值 |
| maxDis | 距离右上角最大距离 | number | 存在嵌套分组时使用该值 |


<a name="N5L5T"></a>
### collapse
| 属性名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| r | 分组的半径 | number | 当 groupType 为 circle 时有效 |
| width | 分组宽度 | number | 当 groupType 为 rect 时有效 |
| height | 分组高度 | number | 当 groupType 为 rect 时有效 |


<a name="h8q8H"></a>
<br />
# add / addItem
用于生成分组。

| 参数 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| groupId | 分组ID | string |  |
| nodes | 分组中包含的节点或节点ID | array | 节点实例或节点 ID |
| type | 分组类型 | string | 默认 circle ，支持 circle 和 rect |
| zIndex | 分组层级 | number | 默认 0 |
| title | 分组标题配置 | object | string | 为 string 类型时，不能配置其他属性，为 object 时的配置参考[这里](https://www.yuque.com/antv/g6/inxeg8#07gsB) |

```javascript
const nodes = ['node1', 'node2']
graph.addItem('group', {
	groupId: 'xxxx000999',
  nodes,
  type: 'rect',
  zIndex: 2,
  title: '分组标题',
  title: {
  	text: '分组标题',
    stroke: '',
    fill: '',
    offsetX: 10,
    offsetY: 0
  }
})
```

<a name="odCHQ"></a>
<br />
# collapseGroup
收起分组，收起分组后，隐藏分组中的所有节点和边，分组外部与分组内节点有连线的则临时连接到分组上面。

| 参数 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| groupId | 分组ID | string |  |


```javascript
graph.collapseGroup('groupId')
```

<a name="keQCe"></a>
<br />
# expandGroup
展开分组，显示分组中的所有节点和边，恢复收起前的连接情况。

| 参数 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| groupId | 分组ID | string |  |


```javascript
graph.expandGroup('groupId')
```

