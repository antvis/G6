---
title: 各图形属性
order: 4
---

图形是组成图上一个元素（节点/边）的基本单位。节点/边的 `style` 属性即对应了各自 keyShape（关键图形）的图形属性。节点或边上标签 `labelCfg` 中的 `style` 属性对应了 text 图形的图形属性。

G6 支持以下图形：
- [circle](#圆图形-circle)：圆；
- [rect](#矩形图形-rect)：矩形；
- [ellipse](#椭圆图形-ellipse)：椭圆；
- [polygon](#多边形图形-polygon)：多边形；
- [fan](#扇形图形-fan)：扇形；
- [image](#图片图形-image)：图片；
- [marker](#标记图形-marker)：标记；
- [path](#路径-path)：路径；
- [text](#文本-text)：文本。


## 通用属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| fill | 设置用于填充绘画的颜色、渐变或模式 | 对应 Canvas 属性 `fillStyle` |
| stroke | 设置用于笔触的颜色、渐变或模式 | 对应 Canvas 属性 `strokeStyle` |
| lineWidth | 描边宽度 | |
| shadowColor | 设置用于阴影的颜色 |  |
| shadowBlur | 设置用于阴影的模糊级别 | 数值越大，越模糊 |
| shadowOffsetX | 设置阴影距形状的水平距离 |  |
| shadowOffsetY | 设置阴影距形状的垂直距离 |  |
| opacity | 设置绘图的当前 alpha 或透明值 | 对应 Canvas 属性 `globalAlpha` |
| fillOpacity | 设置填充的 alpha 或透明值 |  |

## 用法
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

## 圆图形 Circle

### 特殊属性

| 属性名 | 含义 |
| --- | --- |
| x | 圆心的 x 坐标 |
| y | 圆心的 y 坐标 |
| r | 圆的半径 |


### 用法
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

## 椭圆图形 Ellipse

### 特殊属性

| 属性名 | 含义 |
| --- | --- |
| x | 圆心的 x 坐标 |
| y | 圆心的 y 坐标 |
| rx | 水平半径 |
| ry | 垂直半径 |

 

### 用法
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


## 扇形图形 Fan

### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 扇形圆心的 x 坐标 |  |
| y | 扇形圆心的 y 坐标 |  |
| rs | 水平半径 |  |
| re | 垂直半径 |  |
| startAngle | 起点弧度 | 弧度制，即使用 Math.PI 表示 |
| endAngle |  终点弧度 | 弧度制，即使用 Math.PI 表示 |
| clockwise | 为 `true` 时顺时针渲染，为 `false` 时逆时针渲染 |  |



### 用法
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


## 图片图形 Image

### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 图片左上角的 x 坐标 |  |
| y |  图片左上角的 y 坐标 |  |
| width | 图片宽度 |  |
| height | 图片高度 |  |
| img | 图片源 | G6 支持多种格式的图片：<br />- url<br />- ImageData<br />- Image<br />- canvas<br /> |



### 用法
```javascript
group.addShape('image', {
  attrs: {
    x: 0,
    y: 0,
    img:'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
  }
})
```


## 标记图形 Marker

### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 中心的 x 坐标 |  |
| y | 中心的 y 坐标 |  |
| r | 形状半径 |  |
| symbol | 指定形状 | 内置了一些常用形状，如圆形 `circle`，矩形 `square`，菱形 `diamond`，三角形 `triangle`，倒三角形 `triangle-down`，也可以是自定义的 path 路径。 |



### 用法
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


## 多边形图形 Polygon

### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| points | 多边形的所有端点坐标 | 数组形式 |



### 用法
```javascript
group.addShape('polygon', {
  attrs: {
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
    fill: 'red'
  }
});
```


## 矩形图形 Rect

### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 矩形左上角的 x 坐标 |  |
| y | 矩形左上角的 y 坐标 |  |
| width | 矩形的宽度 |  |
| height | 矩形的高度 |  |
| radius | 定义圆角 | 支持整数或数组形式，分别对应左上、右上、右下、左下角的半径：<br />- radius 缩写为 1 或 [ 1 ] 相当于 [ 1, 1, 1, 1 ]<br />- radius 缩写为 [ 1, 2 ] 相当于 [ 1, 2, 1, 2 ]<br />- radius 缩写为 [ 1, 2, 3 ] 相当于 [ 1, 2, 3, 2 ]<br /> |

 

### 用法
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


## 线条 Path
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️注意:</strong></span>当边太细时候点击不中时，请设置 **lineAppendWidth** 属性值。

### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| path |  线条路径 | 可以是 String 形式，也可以是线段的数组。 |
| startArrow | 起始端的箭头 | 为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| endArrow | 末尾端的箭头 | 为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| lineAppendWidth | 边的击中范围 | 提升边的击中范围，扩展响应范围，数值越大，响应范围越广 |
| lineCap | 设置线条的结束端点样式 |  |
| lineJoin | 设置两条线相交时，所创建的拐角形状 |  |
| lineWidth | 设置当前的线条宽度 |  |
| miterLimit | 设置最大斜接长度 |  |
| lineDash | 设置线的虚线样式，可以指定一个数组 | 一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。 |


### 用法
```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的 path
      d: 10
    },
    endArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的 path
      d: 10
    },
    path: [
      [ 'M', 100, 100 ],
      [ 'L', 200, 200 ]
    ],
    stroke: '#000',
    lineWidth: 8,
    lineAppendWidth: 5
  }
});
```


## 文本 Text
### 特殊属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| fill | 设置用于填充绘画的颜色、渐变或模式 | 对应 Canvas 属性 `fillStyle` |
| stroke | 设置用于笔触的颜色、渐变或模式 | 对应 Canvas 属性 `strokeStyle` |
| shadowColor | 设置用于阴影的颜色 |  |
| shadowBlur | 设置用于阴影的模糊级别 | 数值越大，越模糊 |
| shadowOffsetX | 设置阴影距形状的水平距离 |  |
| shadowOffsetY | 设置阴影距形状的垂直距离 |  |
| opacity | 设置绘图的当前 alpha 或透明值 | 对应 Canvas 属性 `globalAlpha` |
| font | 设置文本内容的当前字体属性 |  |
| textAlign | 设置文本内容的当前对齐方式 | 支持的属性：`center` / `end` / `left` / `right` / `start`，默认值为 `start` |
| textBaseline | 设置在绘制文本时使用的当前文本基线 | 支持的属性:<br />`top` / `middle` / `bottom` / `alphabetic` / `hanging`。默认值为 `bottom` |
| fontStyle | 字体样式 | 对应 `font-style` |
| fontVariant | 设置为小型大写字母字体 | 对应 `font-variant` |
| fontWeight | 字体粗细 | 对应 `font-weight` |
| fontSize | 字体大小 | 对应 `font-size` |
| fontFamily | 字体系列 | 对应 `font-family` |

### 用法

```javascript
group.addShape('text', {
  attrs: {
    text: 'test text',
    fill: 'red',
    fontWeight: 400,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10
  }
});
```