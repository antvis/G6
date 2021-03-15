---
title: 坐标转换
order: 15
---

这部分主要是说明渲染坐标、Canvas 坐标和页面坐标之前的相互转换。三种坐标系的关系参见文档：[G6 坐标系深度解析](/zh/docs/manual/advanced/coordinate-system)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Dzz_R5yJEooAAAAAAAAAAABkARQnAQ' alt='img' width='1000'/>


### graph.getPointByClient(clientX, clientY)

将屏幕/页面坐标转换为渲染坐标。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| clientX | Number | true     | 屏幕 x 坐标 |
| clientY | Number | true     | 屏幕 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示渲染的 x 、y 坐标。

**用法**

```javascript
const point = graph.getPointByClient(e.clientX, e.clientY);
console.log('渲染坐标 x/y 分别为:', point.x, point.y);
```

### graph.getClientByPoint(x, y)

将渲染坐标转换为屏幕/页面坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 渲染坐标系下的 x 坐标  |
| y    | Number | true     | 渲染坐标系下的 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：`x` 和 `y` 属性，分别表示屏幕/页面的 x、y 坐标。

**用法**

```javascript
const point = graph.getClientByPoint(100, 200);
console.log('屏幕/页面x/y坐标分别为:', point.x, point.y);
```

### graph.getPointByCanvas(canvasX, canvasY)

将 Canvas 画布坐标转换为渲染坐标。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| canvasX | Number | true     | 画布 x 坐标 |
| canvasY | Number | true     | 画布 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示渲染的 x、y 坐标。

**用法**

```javascript
const point = graph.getPointByCanvas(100, 200);
console.log('渲染坐标 x/y 分别为:', point.x, point.y);
```

### graph.getCanvasByPoint(x, y)

将渲染坐标转换为 Canvas 画布坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 渲染坐标系下的 x 坐标  |
| y    | Number | true     | 渲染坐标系下的 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示 Canvas 画布的 x、y 坐标。

**用法**

```javascript
const point = graph.getCanvasByPoint(100, 200);
console.log('Canvas 画布的 x/y 坐标分别为:', point.x, point.y);
```

### graph.getGraphCenterPoint()

获取图内容的中心绘制坐标。v4.2.1 支持。

**参数**

无

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示渲染坐标下的 x、y 值。

**用法**

```javascript
const point = graph.getGraphCenterPoint();
console.log('图内容中心的绘制坐标是', point.x, point.y);
```

### graph.getViewPortCenterPoint()

获取视口中心绘制坐标。v4.2.1 支持。

**参数**

无

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示渲染坐标下的 x、y 值。

**用法**

```javascript
const point = graph.getViewPortCenterPoint();
console.log('视口中心的绘制坐标是', point.x, point.y);
```
