---
title: Item
order: 0
---

Item is the object of node / edge in G6.


## Update

### update(model)
Update the item according to the data model.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| model | Object | true | The data model of the item. |


Tips: `model` contains: 

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | String | true | The unique id of the item. |
| style | Object | false | The style of the item. |
| shape | String | false | The shape of the item. The default shape for edge is 'line', the default shape for node is 'circle'. The default shapes will take effect when `shape` is null. |
| label | String | false | The label of the item. A label will be rendered if it exists. |


**Usage**
```javascript
const model = {
	id: 'node',
  shape: 'rect',
  label: 'node',
  style: {
  	fill: 'red'
  }
}

item.update(model)
```


### refresh()
Refresh the item with its positions and style in the item's data model. This operation will clear the cache in the same time.

It is usually called after:

- The data model of item is changed;
- The positions of endpoints of an edge is changed.


**Usage**
```javascript
item.refresh()
```


### updatePosition(cfg)
Update the position of the item. We recommend to call this function for single item to avoid repainting the whole canvas.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cfg | Object | true | The configurations of the item, including `x` and `y`. The x and y value in source data model will take effect if there are no `x` and `y` in `cfg`. |



**Usage**
```javascript
const cfg = {
	x: 100,
  y: 200
}
// There are x and y in cfg, so the operation below will update the position
item.updatePosition(cfg)

const cfg1 = {
	name: 'abc',
  dept: 'antv'
}
// There are no x and y in cfg, the operation below will use x and y in item.getModel()
item.updatePosition(cfg1)
```


## Destroy

### destroy()
Destroy an item, including stopping the animation, deleting the items in a group, clearing the configurations, setting the `destroyed` to be `true`, and so on.


**Usage**
```javascript
item.destroy()
```


## Common Usage

### getBBox()
Get the **bounding box** of the item.


**Return**

- The type of return value: Object.

The return value includes:

| Name | Type | Description |
| --- | --- | --- |
| x | number | The x coordinate of view port. |
| y | number | The y coordinate of view port. |
| width | number | The width of the bbox. |
| height | number | The height of the bbox. |
| centerX | number | The x coordinate of the center of the bbox. |
| centerY | number | The y coordinate of the center of the bbox. |



**Usage**
```javascript
item.getBBox()
```


### getContainer()
Get the container of the item.


**Return**

- The type of return value: G.Group;
- Return the group where the item in.


**Usage**
```javascript
// Get the container of the item
const group = item.getContainer()

// Equals to
const group = item.get('group')
```

### getKeyShape()
Get the key shape of the item. `keyShape` is used for calculating the node size, edge length, and so on.


**Return**

- The type of return value: G.Shape;
- Return the `keyShape` of the item.


**Usage**
```javascript
// Get the keyShape of the item
const keyShape = item.getKeyShape()

// Equals to
const keyShape = item.get('keyShape')
```


### getModel()
Get the data model of the item.


**Return**

- The type of return value: Object;
- Return the data model of the item.


**Usage**
```javascript
// Get the data model of the item
const model = item.getModel()

// Equals to
const model = item.get('model')
```


### getType()
Get the type of the item.


**Return**

- The type of return value: String;
- Return the type of the item. It might be `'node'` or `'edge'`.


**Usage**
```javascript
// Get the type of the item
const type = item.getType()

// Equals to
const type = item.get('type')
```


### enableCapture(enable)
Whether to enable the item to be picked and enable its interaction events.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| enable | Boolean | true | The flag to enable if it is `true`. |



**Usage**
```javascript
// Do not allow the item response interaction events
item.enableCapture(false)

// Allow the item to response the interaction events
item.enableCapture(true)
```


### clearCache()
Clear the cache. It is usually called after updating or refreshing operation.


**Usage**
```javascript
// Clear the cache
item.clearCache()
```


## State

### show()
Show the item.


**Usage**
```javascript
item.show()
```


### hide()
Hide the item.


**Usage**
```javascript
item.hide()
```


### changeVisibility(visible)
Change the visibility of the item.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| visible | Boolean | true | The flag to hide or show the item. `true` means show the item, `false` means hide the item. |



**Usage**
```javascript
// Show the item
item.changeVisibility(true)

// Hide the item
item.changeVisibility(false)
```


### isVisible()
Query the visibility of the item.


**Return**

- The type of return value: Boolean;
- `true` means the item is visibile. The item is invisible otherwise.


**Usage**
```javascript
const visible = item.isVisible()
```

### toFront()
Set the visual level / zindex to the front to avoid being overlapped by other items.


**Usage**
```javascript
item.toFront()
```


### toBack()
Set the visual level / zindex to the back.


**Usage**
```javascript
item.toBack()
```


### setState(state, enable)
Update the state of the item.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| state | String | true | The state name of the item, e.g. `'selected'`, `'hover'`. |
| enable | Boolean | true | The flag to enable the state if it is `true`. |



**Usage**
```javascript
item.setState('selected', true)
item.setState('actived', false)
```


### clearStates(states)
Clear all the states of the item. If the `states` is null, this operatcion will clear **the first** state of the item by default.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| states | String / Array | true | The names of the states to be cleared. |



**Usage**
```javascript
// Clear the state 'selected'
item.clearStates('selected')

// Clear the states 'active' and 'hover'
item.clearStates(['actived', 'hover'])
```



### getStates()
Get all the states of the item.


**Return**

- The type of return value: Array;
- Returns an array of strings, which are the states of the item.


**Usage**
```javascript
// Get all the states of the item
const states = item.getStates()
```


### hasState(state)
Query the `state` value of the node.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| state | String | true | The state name. |



**Return**

- The type of return value: Boolean;
- Returns `true` if the item has the `state`. `false` otherwise.


**Usage**
```javascript
// Query value of state 'hover'
const state = item.hasState('hover')
```


## Style

### getStateStyle(state)
Get the style of the item. The global style, default style, and custom style will be mixed in the return value.


**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| state | String | true | The state name. |



**Return**

- The type of return value: Object；
- The global style, default style, and custom style will be mixed in the return value.


**Usage**
```javascript
// Get the item's style of state 'selected'
const style = item.getStateStyle('selected')
```


### getOriginStyle()
Get the keyShape's style of the item.


**Return**

- The type of return value: Object | undefined;
- Returns the style of the `keyShape` if it exists. Returns `undefined` otherwise.


**Usage**
```javascript
const style = item.getKeyShapeStyle()
```


### getCurrentStatesStyle()
Get the item's styles of all the states.


**Return**

- The type of return value: Object；
- Returns the item's styles of all the states.


**Usage**
```javascript
const styles = item.getCurrentStatesStyle()
```
