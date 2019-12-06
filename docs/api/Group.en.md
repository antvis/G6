---
title: Graphics Group
order: 8
---

Graphics Group (hereinafter referred to as Group) in G6 is similar to <a href='https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g' target='_blank'> `<g>` tag in SVG </a>: Group a container of a group of graphics. The transformations on a Group such as clipping, rotating, zooming, and translating will be applied to all the children of the Group. The properties like color and position will also be inherited by its children. Besides, Group can be nested for complicated objects. For more information about Group, please refer to [Graphics Group](/en/docs/manual/advanced/keyconcept/graphics-group) document.


## Instance Declaration 
```javascript
const group = new Group(cfgs);
```


## Functions


### addGroup(param, cfg)
Add a new group to the group.


**Parameters**

| Name | Type |
| --- | --- |
| param | Function / Object / undefined |
| cfg | Object |



**Usage**

```javascript
group.addGroup({
	id: 'groupId'
})
```



### addShape(type, cfgs)
Add a new shape into the group<br /><span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> the clip and transform operations will affect all the shapes in the group. The graphics and their properties are introduced in [Shape API](/en/docs/api/Shape)。


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| type | String | The type of the shape. Options: `'rect'`, `'circle'`, `'fan'`, `'ellipse'`, `'marker'`, `'image'`, and so on. Please refer to [Graphics Shape Properties](/en/docs/manual/advanced/keyconcept/shape-and-properties) document |
| cfg | Object | The configurations of the shape. |


**Usage**

```javascript
group.addShape('rect', {
	attrs: {
  	fill: 'red',
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10,
    opacity: 0.8
  }
})
```


### contain(child)
Whether the group contains the child.<br />The type of the return value: Boolean.


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| child | Group / Shape | A sub group or an instance of shape. |



**Usage**

```javascript
const has = group.contain(child)
```


### find(fn)
Find **the first** element that matches the rule.


**Parameters**


| Name | Type | Description |
| --- | --- | --- |
| fn | Function | Customized callback function. |



**Usage**

```javascript
const child = group.find(function(item) {
	return item.attr('fill') === 'red';    // Find the first graphics filled with red
});
```


### findById(id)
Find the element by its id. <br />The type of the return value: Object。


**Parameters**


| Name | Type | Description |
| --- | --- | --- |
| id | String | The id of the group. |



**Usage**

```javascript
const group1 = group.findById('group1');
```



### findAll(fn)
Find all the elements that match the rule.<br />The type of the return value: [ Object ]


**Parameters**


| Name | Type | Description |
| --- | --- | --- |
| fn | Function | Customized callback function. |



**Usage**

```javascript
const children = group.findAll(function(item) {
    return item.get('id') < 10;       // get all the elements with the id smaller than 10
});
```


### getShape(x,y)
Get the top shape which is on (x, y). <br />The type of the return value: Object


**Parameters**


| Name | Type | Description |
| --- | --- | --- |
| x | number | x coordinate |
| y | number | y coordinate |



**Usage**

```javascript
// Get the top element on (10, 30)
const element = group.getShape(10, 30)
```


### getFirst()
Get **the first** element of the group. <br />The type of the return value: Object


**Usage**

```javascript
const child = group.getFirst()

// Equal to
const childrens = group.get('children')
const child = childrens[0]
```


### getLast()
Get the last element of the group. <br />The type of the return value: Object


**Usage**

```javascript
const child = group.getLast()

// Equal to
const childrens = group.get('children')
const child = childrens[childrens.length - 1]
```


### getChildByIndex(index）
Get the `index`-th child of the group started from `0`.<br />The type of the return value: Object


**Parameters**


| Name | Type | Description |
| --- | --- | --- |
| index | number | The index of the child. 0 by default. |



**Usage**

```javascript
const child = group.getChildByIndex(2)
```


### removeChild(child)
Remove a group or a graphics from the group.


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| child | Group / Shape | A sub group or an instance of Shape. |



**Usage**

```javascript
group.removeChild(child)
```


### sort()
Sort method. <br />In general, it is called for ordering the children of the group.

Typical scenerio: we set index for each `shape` when add `shape` by `group.addShape()`. After adding, sort the shapes by calling `group.sort()`.


**Usage**

```javascript
group.sort()
```


### clear()
Clear all the children in the group.


**Usage**

```javascript
group.clear()
```
