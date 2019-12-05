---
title: 边属性
order: 1
---

## 通用属性

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| fill | 设置用于填充绘画的颜色、渐变或模式 | 对应 Canvas 属性 `fillStyle` |
| stroke | 设置用于笔触的颜色、渐变或模式 | 对应 Canvas 属性 `strokeStyle` |
| shadowColor | 设置用于阴影的颜色 |  |
| shadowBlur | 设置用于阴影的模糊级别 | 数值越大，越模糊 |
| shadowOffsetX | 设置阴影距形状的水平距离 |  |
| shadowOffsetY | 设置阴影距形状的垂直距离 |  |
| opacity | 设置绘图的当前 alpha 或透明值 | 对应 Canvas 属性 `globalAlpha` |



## 线条 Path
⚠️**注意：**当边太细时候点击不中时，请设置 **lineAppendWidth** 属性值。

**属性**

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


**用法**
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
