---
title: Coordinate Transformation
order: 15
---

In this part, we will describe the methods about transformation between point canvas, and client coordinates. The relationships and details could be refered to [Coordinate Systems in G6](/en/docs/manual/advanced/coordinate-system).

### graph.getPointByClient(clientX, clientY)

Transform client/screen coordinates into point coordinates.

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
console.log('The x and y of point coordinate system are: ', point.x, point.y);
```

### graph.getClientByPoint(x, y)

Transform point coordinates into client/screen coordinates.

**Parameters**

| Name | Type   | Required | Description                |
| ---- | ------ | -------- | -------------------------- |
| x    | Number | true     | x coordinate of point coordinate system. |
| y    | Number | true     | y coordinate of point coordinate system. |

**Return**

- Type of the return value: Object;
- Includes `x` and `y`.

**Usage**

```javascript
const point = graph.getClientByPoint(100, 200);
console.log('The x and y of client/screen are: ', point.x, point.y);
```

### graph.getPointByCanvas(canvasX, canvasY)

Transform canvas coordinates into point coordinates.

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
console.log('The x and y of point coordinate system: ', point.x, point.y);
```

### graph.getCanvasByPoint(x, y)

Transform point coordinates into canvas coordinates.

**Parameters**

| Name | Type   | Required | Description                    |
| ---- | ------ | -------- | ------------------------------ |
| x    | Number | true     | The x coordinate of point coordinate system. |
| y    | Number | true     | The y coordinate of point coordinate system. |

**Return**

- Type of the return value: Object;
- Includes x and y.

**Usage**

```javascript
const point = graph.getCanvasByPoint(100, 200);
console.log('The x and y coordinates of canvas: ', point.x, point.y);
```

### graph.getGraphCenterPoint()

Get the x/y in point coordinate system of the graph content's center. Supported by v4.2.1

**Parameters**

None

**Return**

- Type of the return value: Object;
- Includes x and y of point coordinate system.

**Usage**

```javascript
const point = graph.getGraphCenterPoint();
console.log('graph content center under point coordinate system', point.x, point.y);
```

### graph.getViewPortCenterPoint()

Get the x/y in point coordinate system of the view port center. Supported by v4.2.1

**Parameters**

None

**Return**

- Type of the return value: Object;
- Includes x and y of point coordinate system.

**Usage**

```javascript
const point = graph.getViewPortCenterPoint();
console.log('view port center under point coordinate system', point.x, point.y);
```
