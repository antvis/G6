---
title: View Port Operation
order: 3
---

### graph.getZoom()

Get the current zoom ratio.

**Return**

- Type of return value: Number;
- The return value indicates the current zoom ratio of view port. The default value is 1.

**Usage**

```javascript
// The return value indicates the current zoom ratio
const zoom = graph.getZoom();
```

### graph.changeSize(width, height)

Change the size of the canvas.

**Parameters**

| Name   | Type   | Required | Description               |
| ------ | ------ | -------- | ------------------------- |
| width  | Number | true     | The width of the canvas.  |
| height | Number | true     | The height of the canvas. |

**Usage**

```javascript
graph.changeSize(600, 350);
```

### graph.translate(dx, dy)

Move the canvas with **relative displacement**.

**Parameters**

| Name | Type   | Required | Description                               |
| ---- | ------ | -------- | ----------------------------------------- |
| dx   | Number | true     | Displacement in the horizontal direction. |
| dy   | Number | true     | Displacement in the vertical direction.   |

**Usage**

```javascript
graph.translate(100, 100);
```

### graph.moveTo(x, y)

Move the canvas to a **fixed position**.

**Parameters**

| Name | Type   | Required | Description                               |
| ---- | ------ | -------- | ----------------------------------------- |
| x    | Number | true     | Displacement in the horizontal direction. |
| y    | Number | true     | Displacement in the vertical direction.   |

**Usage**

```javascript
graph.moveTo(200, 300);
```

### graph.fitView(padding)

Fit the graph to the view port.

**Parameters**

| Name    | Type           | Required | Description                                |
| ------- | -------------- | -------- | ------------------------------------------ |
| padding | Number / Array | false    | The padding of [top, right, bottom, left]. |

**Usage**

```javascript
// When padding is a number, top = right = bottom = left = 20
graph.fitView(20);

// Equal to graph.fitView(20)
graph.fitView([20]);

// When padding is an array with 2 values, top = bottom = 20, right = left = 10
graph.fitView([20, 10]);

// When padding is an array with four values
graph.fitView([20, 10, 20, 15]);
```

### graph.fitCenter()

_Supported by v3.5.1._ Translate the graph to align its center with the canvas.

**Usage**

```javascript
// Call the following function after rendering and animation
graph.fitCenter();
```

### graph.focusItem(item, animate, animateCfg)

Move the graph to center at the item. This operation can be used as easing animation after searching a node.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| animate | boolean | false | Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/advanced/animation#animatecfg). If it is not assigned, animates following the graph's `animateCfg`. |

**Usage**

```javascript
graph.focusItem(item);

// focus with animation
graph.focusItem(item, true);

// focus with animation and animation's configuration
graph.focusItem(item, true, {
  easing: 'easeCubic',
  duration: 400,
});
```
