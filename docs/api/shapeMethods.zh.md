---
title: 各图形的通用方法 Shape Func
order: 9
---

### attr()

设置或获取实例的绘图属性。

### attr(name)

获取实例的属性值。

```
const width = shape.attr('width');
```

### attr(name, value)

更新实例的单个绘图属性。

### attr({...})

批量更新实例绘图属性。

```
rect.attr({
    fill: '#999',
    stroke: '#666'
});
```

### setClip(clipCfg)

设置并返回裁剪对象。

`clipCfg` 配置项

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| type | 裁剪的图片形状 | String | 支持 `'circle'`、`'rect'`、`'ellipse'` |
| x | 裁剪图形的 x 坐标 | Number | 默认为 0，类型为 `'circle'`、`'rect'`、`'ellipse'` 时生效 |
| y | 裁剪图形的 y 坐标 | Number | 默认为 0，类型为 `'circle'`、`'rect'`、`'ellipse'` 时生效 |
| show | 是否启用裁剪功能 | Boolean | 默认不裁剪，值为 `false` |
| r | 剪裁圆形的半径 | Number | 剪裁 type 为  `'circle'` 时生效 |
| width | 剪裁矩形的宽度 | Number | 剪裁 type 为 `'rect'` 时生效 |
| height | 剪裁矩形的长度 | Number | 剪裁 type 为 `'rect'` 时生效 |
| rx | 剪裁椭圆的长轴半径 | Number | 剪裁 type 为 `'ellipse'` 时生效 |
| ry | 剪裁椭圆的短轴半径 | Number | 剪裁 type 为 `'ellipse'` 时生效 |

用法

```javascript
shape.setClip({
  type: 'circle', // 支持 circle、rect、ellipse、Polygon 及自定义 path clip
  attrs: {
    r: 10,
    x: 0,
    y: 0,
  },
```

### getClip()

获取裁剪对象。
