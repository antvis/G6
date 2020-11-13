---
title: Get/Set
order: 2
---

### graph.get(key)

Get an property of graph by key.

**Parameters**

| Name | Type   | Required | Description          |
| ---- | ------ | -------- | -------------------- |
| key  | string | true     | Key of the property. |

**Usage**

```javascript
// get the group
const group = graph.get('group');

// get the canvas instance
const canvas = graph.get('canvas');

// get the value of autoPaint
const autoPaint = graph.get('autoPaint');
```

### graph.set(key, val)

Set the value to an property.

**Parameters**

| Name | Type                    | Required | Description                |
| ---- | ----------------------- | -------- | -------------------------- |
| key  | string                  | true     | The key of the property.   |
| val  | string / Object / Array | true     | The value of the property. |

**Usage**

```javascript
// Set capture to false
graph.set('capture', false);

// Set customGroup to group
graph.set('customGroup', group);

// Set nodeIdList to [1, 3, 5]
graph.set('nodeIdList', [1, 3, 5]);
```

### graph.getContainer()

Get the DOM container of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getContainer();
```

### graph.getGroup()

Get the root [graphics group](/en/docs/manual/advanced/keyconcept/graphics-group) of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getGroup();
```

### graph.getMinZoom()

Get the `minZoom` for the graph, which is the lower limit of the zoom ratio.

**Parameter**

No parameter

**Usage**

```javascript
graph.getMinZoom();
```

### graph.setMinZoom(ratio)

Set the `minZoom` for the graph, which is the lower limit of the zoom ratio.

**Parameter**

| Name  | Type   | Required | Description                  |
| ----- | ------ | -------- | ---------------------------- |
| ratio | number | true     | The minimum zoom ratio value |

**Usage**

```javascript
graph.setMinZoom(0.001);
```

### graph.getMaxZoom()

Get the `maxZoom` for the graph, which is the upper limit of the zoom ratio.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getMaxZoom();
```

### graph.setMaxZoom(ratio)

Set the `maxZoom` for the graph, which is the upper limit of the zoom ratio.

**Parameter**

| Name  | Type   | Required | Description                  |
| ----- | ------ | -------- | ---------------------------- |
| ratio | number | true     | The maximum zoom ratio value |

**Usage**

```javascript
graph.setMaxZoom(1000);
```

### graph.getWidth()

Get the current width of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getWidth();
```

### graph.getHeight()

Get the current height of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getHeight();
```

</div>
