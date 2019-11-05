---
title: 自定义边
order: 3
---

G6 除了提供丰富的 [自定义边](https://www.yuque.com/antv/g6/internal-edge) 外，还提供了自定义边的机制，方便用户开发更加定制化的边，包括含有复杂图形的边、复杂交互的边、带有动画的边等。

在本章中我们会通过四个案例，从简单到复杂讲解边的自定义：<br />1. 从无到有的定义边；<br />2. 扩展现有边：<br />3. 边的交互样式；<br />4. 自定义带箭头的边。

<a name="Ov27z"></a>
<br />
# 1. 从无到有定义边
我们来实现垂直的折线：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/89796/1548413029414-51b39bd3-c5f4-42ab-90f2-1183c069b34f.png#align=left&display=inline&height=281&name=image.png&originHeight=281&originWidth=206&search=&size=5679&status=done&width=206)![image.png](https://cdn.nlark.com/yuque/0/2019/png/89796/1548412991278-5ddb50ea-3f1d-4269-b8d9-19ac84106ff6.png#align=left&display=inline&height=280&name=image.png&originHeight=280&originWidth=187&search=&size=5072&status=done&width=187)![image.png](https://cdn.nlark.com/yuque/0/2019/png/89796/1548413062802-40be1962-e421-4295-9985-6c9709656462.png#align=left&display=inline&height=264&name=image.png&originHeight=264&originWidth=187&search=&size=5117&status=done&width=187)
> （左）直线边。（中）默认的折线边。（右）调整了节点的控制点后的折线边。


<a name="JWc01"></a>
## 自定义边
```javascript
G6.registerEdge('hvh', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#333',
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y], // 三分之一处
          ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],   // 三分之二处
          ['L', endPoint.x, endPoint.y]
        ]
      }
    });
    return shape;
  }
});
```

- 默认的 `startPoint`， `endPoint` 是两个端点中点的连接线分别同圆的交点；
- 修改节点的锚点可以修改 `startPoint` 和 `endPoint` 的位置。

<a name="raY8X"></a>
## 示例数据
通过以下的数据，使用自定义的 hvh 边，就可以实现上图最右边的效果。
```javascript
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200,
    anchorPoints:[
      [0, 0.5],  [1, 0.5]
    ]
 },{
    id: 'node2',
    x: 200,
    y: 100,
    anchorPoints:[
      [0, 0.5],  [1, 0.5]
    ]
 },{
    id: 'node3',
    x: 200,
    y: 300,
    anchorPoints:[
      [0, 0.5],  [1, 0.5]
    ]
 }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1',
    shape: 'hvh'
 },{
    id: 'edge2',
    target: 'node3',
    source: 'node1',
   	shape: 'hvh'
 }]
};
```

<a name="t4ZIo"></a>
<br />
# 2. 扩展现有边
通过 `afterDraw` 接口给现有的曲线增加动画。

![line-grow.gif](https://cdn.nlark.com/yuque/0/2019/gif/89796/1548411369501-cdf8f944-79db-43eb-b266-de6ad9f4b6a8.gif#align=left&display=inline&height=251&name=line-grow.gif&originHeight=251&originWidth=184&search=&size=27589&status=done&width=184)

```javascript
G6.registerEdge('line-growth', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = shape.getTotalLength();
    shape.animate({
      onFrame(ratio) {
        const startLen = ratio * length;
        const cfg = {
          lineDash: [startLen, length - startLen]
        };
        return cfg;
      },
      repeat: true
    }, 2000);
  }
}, 'cubic');
```

<a name="RlQc9"></a>
<br />
# 3. 边的交互样式
以点击选中、鼠标 hover 到边为示例，实现如下需求：

- 点击边时边变粗，再点击变成细；
- 鼠标移动上去变成红色，离开变成 `'#333'` 。

效果如下图所示。<br />![active-select.gif](https://cdn.nlark.com/yuque/0/2019/gif/89796/1548411103714-a97cdf5a-539c-40b1-8772-4f72b1f4fea3.gif#align=left&display=inline&height=171&name=active-select.gif&originHeight=171&originWidth=412&search=&size=54407&status=done&width=412)<br />提示：边如果过细点击时很难击中，可以设置 `**lineAppendWidth**` 来提升击中范围。

```javascript
// 基于 line 扩展出新的图形
G6.registerEdge('custom-edge', {
  // 设置状态
  setState(name, value, item) {
    const group = item.getContainer();
    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
    if(name === 'active') {
      if(value) {
        shape.attr('stroke', 'red');
      } else {
        shape.attr('stroke', '#333');
      }
    }
    if (name === 'selected') {
      if(value) {
        shape.attr('lineWidth', 3);
      } else {
        shape.attr('lineWidth', 2);
      }
    }
  }
}, 'line');

// 点击时选中，再点击时取消
graph.on('edge:click', ev=> {
  const edge = ev.item;
  graph.setItemState(edge, 'selected', !edge.hasState('selected')); // 切换选中
});

graph.on('edge:mouseenter' ,ev=> {
	const edge = ev.item;
  graph.setItemState(edge, 'active', true);
});

graph.on('edge:mouseleave' , ev=> {
	const edge = ev.item;
  graph.setItemState(edge, 'active', false);
});

```

<a name="QfUXj"></a>
<br />
# 4. 自定义带箭头的边
很多时候，G6 默认提供的箭头并不能满足业务上的需求，这个时候，就需要我们自定义箭头。当然了，G6 也支持箭头样式的自定义。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571143168729-72137df2-8d1e-4da6-ba53-86e9726a7af8.png#align=left&display=inline&height=166&name=image.png&originHeight=332&originWidth=632&search=&size=79105&status=done&width=316)
> （左）G6 内置箭头。（右）自定义边带有自定义箭头。


```javascript
G6.registerEdge('line-arrow', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg
    const keyShape = group.addShape('path', {
      attrs: {
        path: [
          [ 'M', startPoint.x, startPoint.y ],
          [ 'L', endPoint.x, endPoint.y ]
        ],
        stroke: 'steelblue',
        lineWidth: 3,
        startArrow: {
          path: 'M 10,0 L -10,-10 L -10,10 Z',
          d: 10
        },
        endArrow: {
          path: 'M 10,0 L -10,-10 L -10,10 Z',
          d: 10
        }
      }
    });
    return keyShape
  }
});
```

