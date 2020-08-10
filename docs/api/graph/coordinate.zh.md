---
title: 坐标转换
order: 10
---

这部分主要是说明视口坐标、Canvas 坐标和页面坐标之前的相互转换。其中视口坐标和 Canvas 坐标的示意图如下所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*loahSq940hMAAAAAAAAAAABkARQnAQ' width=565 alt='img'/>

### graph.getPointByClient(clientX, clientY)

将屏幕/页面坐标转换为视口坐标。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| clientX | Number | true     | 屏幕 x 坐标 |
| clientY | Number | true     | 屏幕 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示视口的 x 、y 坐标。

**用法**

```javascript
const point = graph.getPointByClient(e.clientX, e.clientY);
console.log('视口 x/y 坐标分别为:', point.x, point.y);
```

### graph.getClientByPoint(x, y)

将视口坐标转换为屏幕/页面坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 视口 x 坐标  |
| y    | Number | true     | 视口  y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：`x` 和 `y` 属性，分别表示屏幕/页面的 x、y 坐标。

**用法**

```javascript
const point = graph.getClientByPoint(100, 200);
console.log('屏幕/页面x/y坐标分别为:', point.x, point.y);
```

### graph.getPointByCanvas(canvasX, canvasY)

将 Canvas 画布坐标转换为视口坐标。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| canvasX | Number | true     | 画布 x 坐标 |
| canvasY | Number | true     | 画布 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示视口的 x、y 坐标。

**用法**

```javascript
const point = graph.getPointByCanvas(100, 200);
console.log('视口x/y坐标分别为:', point.x, point.y);
```

### graph.getCanvasByPoint(x, y)

将视口坐标转换为 Canvas 画布坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 视口 x 坐标  |
| y    | Number | true     | 视口  y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示 Canvas 画布的 x、y 坐标。

**用法**

```javascript
const point = graph.getCanvasByPoint(100, 200);
console.log('Canvas画布的x/y坐标分别为:', point.x, point.y);
```
