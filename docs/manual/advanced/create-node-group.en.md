---
title: Create Node Group
order: 8
---

By default, the Node Groups are rendered according to the data, which means G6 will find the array `groups` in the data for rendering. if the `groups` does not exist, the `groupId` in each element of `nodes` will take effect. No group will be rendered when both the `groups` and `groupId`s do not exist.

CustomGroup is the customized Node Group, which supports Circle and Rect type Group. You can create a Node Group by CustomGroup, and set the group style, calculate the groups, and collapse and extend groups. 

## Instantialize the CustomGroup
The instances of CustomGroup will be created while instantiating the Graph. No manual instantiation is required.

## Configuration
Configure the `groupType` and `groupStyle` to assign the group type and styles respectively when instantiating the Graph.
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

### groupType
groupType is a string indicating the type of the Node Group. Options `'circle'` 和 `'rect'`, and `'circle'` by default.

The reuslt of **groupType: `'circle'`**<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0L2cTJVfPSwAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<br />The reuslt of **groupType: `'rect'`**<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g_ntQK8Oz3cAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

### groupStyle
`groupStyle` indicates the styles of the Node Groups in different states, e.g. the styles in default state, hover state, and collapse state.

#### Common Attribute
The common attributes of the groups in the default, hover and collapse states are simlar to nodes, which are introduced in [Node Properties](/zh/docs/api/properties/NodeProperties). Besides, the group style in default and collapse states have some special attributes below:

#### default
| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| minDis | The padding of the Groups without nested structure | Number | No nested Group is the Group containing no other Groups |
| maxDis | Tha padding of the Groups with nested structure | Number | Nested Group is the Group containing other Groups |

The sketch about the `minDis` and `maxDis` when `groupType` is `'circle'`, where the group1 is the Group without nested structure, and the group2 is a nested Group.
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_q6NSbU4xN0AAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

The sketch about the `minDis` and `maxDis` when `groupType` is `'rect'`, where the group1 is the Group without nested structure, and the group2 is a nested Group.
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hbAgSYRTCOEAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

#### collapse
| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| r | The radius of the circle Group | Number | Takes effect when `groupType` is `'circle'` |
| width | The width of the rect Group | Number | Takes effect when `groupType` is `'rect'` |
| height | The height of the rect Group | Number | Takes effect when `groupType` is `'rect'` |


## add / addItem
Create Group.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| groupId | 分组 ID | String |  |
| nodes | 分组中包含的节点或节点 ID | Array | 节点实例或节点 ID |
| type | 分组类型 | String | 默认 circle ，支持 circle 和 rect |
| zIndex | 分组层级 | Number | 默认 0 |
| title | 分组标题配置 | Object | String | 为 string 类型时，不能配置其他属性，为 object 时的配置参考[这里](https://www.yuque.com/antv/g6/inxeg8#07gsB) |

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
## collapseGroup
收起分组，收起分组后，隐藏分组中的所有节点和边，分组外部与分组内节点有连线的则临时连接到分组上面。

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| groupId | 分组ID | String |  |


```javascript
graph.collapseGroup('groupId')
```

## expandGroup
展开分组，显示分组中的所有节点和边，恢复收起前的连接情况。

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| groupId | 分组ID | String |  |


```javascript
graph.expandGroup('groupId')
```

