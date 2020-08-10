---
title: Coordinate Transformation
order: 10
---

In this part, we will describe the methods about transformation between view port, canvas, and client coordinates. The relationships between them are shown below:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M_xPSqLZYawAAAAAAAAAAABkARQnAQ' width=565 alt='img'/>

### graph.getPointByClient(clientX, clientY)

Transform client/screen coordinates into view port coordinates.

**Parameters**

| Name    | Type   | Required | Description                    |
| ------- | ------ | -------- | ------------------------------ |
| clientX | Number | true     | x coordinate of client/screen. |
| clientY | Number | true     | y coordinate of client/screen. |

**Return**

- Type of the return value: Object;
- Includes x and y.

**Usage**

```javascript
const point = graph.getPointByClient(e.clientX, e.clientY);
console.log('The x and y of view port are: ', point.x, point.y);
```

### graph.getClientByPoint(x, y)

Transform view port coordinates into client/screen coordinates.

**Parameters**

| Name | Type   | Required | Description                |
| ---- | ------ | -------- | -------------------------- |
| x    | Number | true     | x coordinate of view port. |
| y    | Number | true     | y coordinate of view port. |

**Return**

- Type of the return value: Object;
- Includes `x` and `y`.

**Usage**

```javascript
const point = graph.getClientByPoint(100, 200);
console.log('The x and y of client/screen are: ', point.x, point.y);
```

### graph.getPointByCanvas(canvasX, canvasY)

Transform canvas coordinates into view port coordinates.

**Parameters**

| Name    | Type   | Required | Description                 |
| ------- | ------ | -------- | --------------------------- |
| canvasX | Number | true     | The x coordinate of canvas. |
| canvasY | Number | true     | The y coordinate of canvas. |

**Return**

- Type of the return value: Object;
- Include x and y.

**Usage**

```javascript
const point = graph.getPointByCanvas(100, 200);
console.log('The x and y of view port: ', point.x, point.y);
```

### graph.getCanvasByPoint(x, y)

Transform view port coordinates into canvas coordinates.

**Parameters**

| Name | Type   | Required | Description                    |
| ---- | ------ | -------- | ------------------------------ |
| x    | Number | true     | The x coordinate of view port. |
| y    | Number | true     | The y coordinate of view port. |

**Return**

- Type of the return value: Object;
- Includes x and y.

**Usage**

```javascript
const point = graph.getCanvasByPoint(100, 200);
console.log('The x and y coordinates of canvas: ', point.x, point.y);
```
