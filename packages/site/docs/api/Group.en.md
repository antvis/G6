---
title: Graphics Group
order: 10
---

Graphics Group (hereinafter referred to as Group) in G6 is similar to <a href='https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g' target='_blank'> `<g>` tag in SVG </a>: Group a container of a group of graphics. The transformations on a Group such as clipping, rotating, zooming, and translating will be applied to all the children of the Group. The properties like color and position will also be inherited by its children. Besides, Group can be nested for complicated objects. For more information about Group, please refer to [Graphics Group](/en/docs/manual/middle/elements/shape/graphics-group) document.

## Get group of item

```javascript
// Find the graphics group of the item
const group = item.getContainer();

// equal to
const group = item.get('group');
```

## Methods

### group.addGroup(cfg)

Add a new group to the group.

**Parameters**

| Name | Type   | Description                                         |
| ---- | ------ | --------------------------------------------------- |
| cfg  | Object | Not required. It is the configurations of the group |

The `cfg` above is not required, and it contains:

| Name | Type | Description |
| --- | --- | --- |
| id | String | The unique id of this group |
| name | String | The name of the shape which can be not unique. It is required for each shape in G6 3.3. Besides, `name` can be used for searching this shape, e.g. `const shape = group.find(element => element.get('name') === 'shape-name')`. The usage of find can be found at [find(fn)](#findfn) |
| visible | Boolean | Whether the group is visible |
| capture | Boolean | Whether the group is capturable |
| draggable | Boolean | Whether the group is allowed to response `dragstart`, `drag`, and `dragend` events. E.g. when user add a group into a custom node with `draggable: true`, the group will response the dragging events on the node, and the `'drag-node'` in the `modes` of the graph instance will take effect on the group |
| zIndex | Number | The visual index of the shape, similar to z-index of DOM. It is not required. `group.sort()` will sort the visual index of the shapes inside the group according to their zIndex |

**Usage**

```javascript
// No configurations
group.addGroup();

// Configured
group.addGroup({
  id: 'groupId',
  draggable: true,
  // other configurations
});
```

### group.addShape(type, cfgs)

Add a new shape into the group<br /><span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> the clip and transform operations will affect all the shapes in the group. The graphics and their properties are introduced in [Shape Doc](/en/docs/manual/middle/elements/shape/shape-keyshape).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| type | String | The type of the shape. Options: `'rect'`, `'circle'`, `'fan'`, `'ellipse'`, `'marker'`, `'image'`, and so on. Please refer to [Graphics Shape Properties](/en/docs/manual/middle/elements/shape/shape-and-properties) document |
| cfg | Object | The configurations of the shape. |

The `cfg` above contains:

| Name | Type | Description |
| --- | --- | --- |
| attrs | Object | The style configurations for the shape. e.g. `{x: 0, y: 10, fill: '#0f0'}` |
| name | String | The name of the shape which can be not unique. It is required for each shape in G6 3.3. Besides, `name` can be used for searching this shape, e.g. `const shape = group.find(element => element.get('name') === 'shape-name')`. The usage of find can be found at [find(fn)](#findfn) |
| visible | Boolean | Whether the shape is visible |
| capture | Boolean | Whether the shape is capturable by mouse events |
| draggable | Boolean | Whether the shape is allowed to response `dragstart`, `drag`, and `dragend` events. E.g. when user add a shape into a custom node with `draggable: true`, the shape will response the dragging events on the node, and the `'drag-node'` in the `modes` of the graph instance will take effect |
| zIndex | Number | The visual index of the shape, similar to z-index of DOM. It is not required. `group.sort()` will sort the visual index of the shapes inside the group according to their zIndex |

**Usage**

```javascript
group.addShape('rect', {
  attrs: {
    x: 0, // required
    y: 0, // required
    fill: 'red',
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10,
    opacity: 0.8,
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'rect-shape',
  zIndex: 1,
});
```

### group.contain(child)

Whether the group contains the child.<br />The type of the return value: Boolean.

**Parameters**

| Name  | Type          | Description                          |
| ----- | ------------- | ------------------------------------ |
| child | Group / Shape | A sub group or an instance of shape. |

**Usage**

```javascript
const has = group.contain(child);
```

### group.find(fn)

Find **the first** element that matches the rule.

**Parameters**

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| fn   | Function | Customized callback function. |

**Usage**

```javascript
const child = group.find(function (item) {
  return item.attr('fill') === 'red'; // Find the first graphics filled with red
});
```

### group.findById(id)

Find the element by its id. <br />The type of the return value: Object。

**Parameters**

| Name | Type   | Description          |
| ---- | ------ | -------------------- |
| id   | String | The id of the group. |

**Usage**

```javascript
const group1 = group.findById('group1');
```

### group.findAll(fn)

Find all the elements that match the rule.<br />The type of the return value: [ Object ]

**Parameters**

| Name | Type     | Description                   |
| ---- | -------- | ----------------------------- |
| fn   | Function | Customized callback function. |

**Usage**

```javascript
const children = group.findAll(function (item) {
  return item.get('id') < 10; // get all the elements with the id smaller than 10
});
```

### group.getShape(x,y)

Get the top shape which is on (x, y). <br />The type of the return value: Object

**Parameters**

| Name | Type   | Description  |
| ---- | ------ | ------------ |
| x    | number | x coordinate |
| y    | number | y coordinate |

**Usage**

```javascript
// Get the top element on (10, 30)
const element = group.getShape(10, 30);
```

### group.getFirst()

Get **the first** element of the group. <br />The type of the return value: Object

**Usage**

```javascript
const child = group.getFirst();

// Equal to
const childrens = group.get('children');
const child = childrens[0];
```

### group.getLast()

Get the last element of the group. <br />The type of the return value: Object

**Usage**

```javascript
const child = group.getLast();

// Equal to
const childrens = group.get('children');
const child = childrens[childrens.length - 1];
```

### group.getChildByIndex(index）

Get the `index`-th child of the group started from `0`.<br />The type of the return value: Object

**Parameters**

| Name  | Type   | Description                           |
| ----- | ------ | ------------------------------------- |
| index | number | The index of the child. 0 by default. |

**Usage**

```javascript
const child = group.getChildByIndex(2);
```

### group.removeChild(child)

Remove a group or a graphics from the group.

**Parameters**

| Name  | Type          | Description                          |
| ----- | ------------- | ------------------------------------ |
| child | Group / Shape | A sub group or an instance of Shape. |

**Usage**

```javascript
group.removeChild(child);
```

### group.sort()

Sort method. <br />In general, it is called for ordering the children of the group.

Typical scenerio: we set index for each `shape` when add `shape` by `group.addShape()`. After adding, sort the shapes by calling `group.sort()`.

**Usage**

```javascript
group.sort();
```

### group.clear()

Clear all the children in the group.

**Usage**

```javascript
group.clear();
```
