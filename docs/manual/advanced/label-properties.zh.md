---
title: 文本属性
order: 4
---

## 属性
文本有以下可用的属性。

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| fill | 设置用于填充绘画的颜色、渐变或模式 | 对应 canvas 属性 `fillStyle` |
| stroke | 设置用于笔触的颜色、渐变或模式 | 对应 canvas 属性 `strokeStyle` |
| shadowColor | 设置用于阴影的颜色 |  |
| shadowBlur | 设置用于阴影的模糊级别 | 数值越大，越模糊 |
| shadowOffsetX | 设置阴影距形状的水平距离 |  |
| shadowOffsetY | 设置阴影距形状的垂直距离 |  |
| opacity | 设置绘图的当前 alpha 或透明值 | 对应 canvas 属性 `globalAlpha` |
| font | 设置文本内容的当前字体属性 |  |
| textAlign | 设置文本内容的当前对齐方式 | 支持的属性：`center`|`end`|`left`|`right`|`start`，默认值为`start` |
| textBaseline | 设置在绘制文本时使用的当前文本基线 | 支持的属性:<br />`top`|`middle`|`bottom` |`alphabetic`|`hanging`。默认值为 `bottom` |
| fontStyle | 字体样式 | 对应 font-style |
| fontVariant | 设置为小型大写字母字体 | 对应 font-variant |
| fontWeight | 字体粗细 | 对应 font-weight |
| fontSize | 字体大小 | 对应 font-size |
| fontFamily | 字体系列 | 对应 font-family |
| autoRotate | 是否自动旋转 |  |

## 案例
```javascript
const data = {
	nodes: [
  	{
      id: 'node1',
      x: 100,
      y: 100,
      shape: 'rect',
      label: 'rect'
    }
  ]
}

const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500
});
graph.data(data);
graph.render();

const node = graph.findById('node1')
graph.update(node, {
  style: {
    stroke: 'blue'
  },
  labelCfg: {
    style: {
      fill: 'red',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowColor: 'blue',
      shadowBlur: 10
    }
  }
})
```

通过以上代码修改node中文本的样式，效果如下图：

<img src='https://cdn.nlark.com/yuque/0/2019/png/244306/1567404022599-698a424a-5c1d-4218-84e7-61b27ba0c33f.png#align=left&display=inline&height=391&name=image.png&originHeight=782&originWidth=778&search=&size=118744&status=done&width=389' alt='download' width='150'/>