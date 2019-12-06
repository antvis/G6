---
title: 节点各图形属性
order: 0
---

### 通用属性

**属性**

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| fill | 设置用于填充绘画的颜色、渐变或模式 | 对应 Canvas 属性 `fillStyle` |
| stroke | 设置用于笔触的颜色、渐变或模式 | 对应 Canvas 属性 `strokeStyle` |
| shadowColor | 设置用于阴影的颜色 |  |
| shadowBlur | 设置用于阴影的模糊级别 | 数值越大，越模糊 |
| shadowOffsetX | 设置阴影距形状的水平距离 |  |
| shadowOffsetY | 设置阴影距形状的垂直距离 |  |
| opacity | 设置绘图的当前 alpha 或透明值 | 对应 Canvas 属性 `globalAlpha` |

**用法**
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

### 圆图形 Circle

**属性**

| 属性名 | 含义 |
| --- | --- |
| x | 圆心的 x 坐标 |
| y | 圆心的 y 坐标 |
| r | 圆的半径 |


**用法**
```javascript
group.addShape('circle', {
	attrs: {
  	x: 100,
    y: 100,
    r: 50,
    fill: 'blue'
  }
})
```

### 椭圆图形 Ellipse

**属性**

| 属性名 | 含义 |
| --- | --- |
| x | 圆心的 x 坐标 |
| y | 圆心的 y 坐标 |
| rx | 水平半径 |
| ry | 垂直半径 |

 

**用法**
```javascript
group.addShape('ellipse', {
	attrs: {
  	x: 100,
    y: 100,
    rx: 50,
    ry: 50,
    fill: 'blue'
  }
})
```


### 扇形图形 Fan

**属性**

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 扇形圆心的 x 坐标 |  |
| y | 扇形圆心的 y 坐标 |  |
| rs | 水平半径 |  |
| re | 垂直半径 |  |
| startAngle | 起点弧度 | 弧度制，即使用 Math.PI 表示 |
| endAngle |  终点弧度 | 弧度制，即使用 Math.PI 表示 |
| clockwise | 为 `true` 时顺时针渲染，为 `false` 时逆时针渲染 |  |



**用法**
```javascript
group.addShape('fan', {
  attrs: {
    x: 50,
    y: 50,
    re: 40,
    rs: 30,
    startAngle: 1/2 * Math.PI,
    endAngle: Math.PI,
    clockwise: false,
    fill: '#b7eb8f'
  }
})
```


### 图片图形 Image

**属性**

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 图片左上角的 x 坐标 |  |
| y |  图片左上角的 y 坐标 |  |
| width | 图片宽度 |  |
| height | 图片高度 |  |
| img | 图片源 | G6 支持多种格式的图片：<br />- url<br />- ImageData<br />- Image<br />- canvas<br /> |



**用法**
```javascript
group.addShape('image', {
  attrs: {
    x: 0,
    y: 0,
    img:'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
  }
})
```


### 标记图形 Marker

**属性**

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 中心的 x 坐标 |  |
| y | 中心的 y 坐标 |  |
| r | 形状半径 |  |
| symbol | 指定形状 | 内置了一些常用形状，如圆形 `circle`，矩形 `square`，菱形 `diamond`，三角形 `triangle`，倒三角形 `triangle-down`，也可以是自定义的 path 路径。 |



**用法**
```javascript
group.addShape('marker', {
  attrs: {
    x: 10,
    y: 10,
    r: 10,
    symbol: function(x, y, r) {
      return [
        [ 'M', x, y ],
        [ 'L', x + r, y + r ],
        [ 'L'，x + r * 2, y ],
        [ 'Z' ]
      ]
    }
  }
});
```


### 多边形图形 Polygon

**属性**

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| points | 多边形的所有端点坐标 | 数组形式 |



**用法**
```javascript
group.addShape('polygon', {
  attrs: {
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
    fill: 'red'
  }
});
```


### 矩形图形 Rect

**属性**

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 矩形左上角的 x 坐标 |  |
| y | 矩形左上角的 y 坐标 |  |
| width | 矩形的宽度 |  |
| height | 矩形的高度 |  |
| radius | 定义圆角 | 支持整数或数组形式，分别对应左上、右上、右下、左下角的半径：<br />- radius 缩写为 1 或 [ 1 ] 相当于 [ 1, 1, 1, 1 ]<br />- radius 缩写为 [ 1, 2 ] 相当于 [ 1, 2, 1, 2 ]<br />- radius 缩写为 [ 1, 2, 3 ] 相当于 [ 1, 2, 3, 2 ]<br /> |

 

**用法**
```javascript
group.addShape('rect', {
  attrs: {
    x: 150,
    y: 150,
    width: 150,
    height: 150,
    stroke: 'black',
    radius: [2, 4]
  }
});
```
