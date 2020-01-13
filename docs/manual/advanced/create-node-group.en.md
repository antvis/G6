---
title: Create Node Group
order: 8
---

By default, the Node Groups are rendered according to the data, which means G6 will find the array `groups` in the data for rendering. if the `groups` does not exist, the `groupId` in each element of `nodes` will take effect. No group will be rendered when both the `groups` and `groupId`s do not exist.

CustomGroup is the customized Node Group, which supports Circle and Rect type Group. You can create a Node Group by CustomGroup, and set the group style, calculate the groups, and collapse / extend groups. 

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
groupType is a string indicating the type of the Node Group. Options `'circle'` and `'rect'`. `'circle'` by default.

The reuslt of **groupType: `'circle'`**<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0L2cTJVfPSwAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

<br />The reuslt of **groupType: `'rect'`**<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g_ntQK8Oz3cAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

### groupStyle
`groupStyle` indicates the styles of the Node Groups in different states, e.g. default state, hover state, and collapse state.

#### Common Property
The common propertoes of the groups in the default, hover and collapse states are similar to nodes, which are introduced in [Shape Properties](/en/docs/api/shapeProperties). Besides, the group style in default and collapse states have some special properties below:

#### default
| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| minDis | The padding of the Groups without nested structure | Number | No nested Group is the Group containing no other Groups |
| maxDis | Tha padding of the Groups with nested structure | Number | Nested Group is the Group containing other Groups |

The sketch about the `minDis` and `maxDis` when `groupType` is `'circle'`, where the group1 is the Group without nested structure, and the group2 is a nested Group.
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_hgTTaIPc8IAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>


The sketch about the `minDis` and `maxDis` when `groupType` is `'rect'`, where the group1 is the Group without nested structure, and the group2 is a nested Group.
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_IrBQqB0K2oAAAAAAAAAAABkARQnAQ' alt='download' width='600'/>

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
| groupId | The id of the Group | String |  |
| nodes | The nodes or the id of the ndoes in the Group | Array | The array of node objects or ids |
| type | The type of the Group | String | Options: `'circle'`, `'rect'`. `'circle'` by default |
| zIndex | The zIndex of the Group | Number | `0` by default |
| title | The title text or the configurations | Object / String | When it is a string, the styles of it is uneditable. When it is an object, the configurations can be found in [Node Group](/en/docs/manual/middle/nodeGroup/#data-structure) |

```javascript
const nodes = ['node1', 'node2']
graph.addItem('group', {
	groupId: 'xxxx000999',
  nodes,
  type: 'rect',
  zIndex: 2,
  title: 'The title text',
  title: {
  	text: 'The title text',
    stroke: '',
    fill: '',
    offsetX: 10,
    offsetY: 0
  }
})
```
## collapseGroup
Hide the nodes and the edges when the Group is collapsed. The edges linked to the inner nodes will link to the group;

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| groupId | The id of the Group | String |  |


```javascript
graph.collapseGroup('groupId')
```

## expandGroup
The nodes and the edges will be restored when the Group is expand.

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| groupId | The id of the Group | String |  |


```javascript
graph.expandGroup('groupId')
```

