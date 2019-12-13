---
title: 自定义边
order: 3
---

G6 除了提供丰富的 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 外，还提供了自定义边的机制，方便用户开发更加定制化的边，包括含有复杂图形的边、复杂交互的边、带有动画的边等。

在本章中我们会通过四个案例，从简单到复杂讲解边的自定义：<br />1. 从无到有的定义边；<br />2. 扩展现有边：<br />3. 边的交互样式；<br />4. 自定义带箭头的边。


## 1. 从无到有定义边
我们来实现垂直的折线：<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxY-TJ2vJFMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ijy4QpaB-fgAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gz09R5fM-HMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>

> （左）直线边。（中）默认的折线边。（右）调整了节点的锚点（连入点）后的折线边。

### 自定义边
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

- 上面自定义边中的 `startPoint` 和 `endPoint` 分别是是边两端与起始节点和结束节点的交点；
- 可以通过修改节点的锚点（边连入点）来改变 `startPoint` 和 `endPoint` 的位置。

### 在数据中修改 anchorPoints
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

## 2. 扩展现有边
通过 `afterDraw` 接口给现有的曲线增加动画。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

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

<br />

## 3. 边的交互样式
以点击选中、鼠标 hover 到边为示例，实现如下需求：

- 点击边时边变粗，再点击变成细；
- 鼠标移动上去变成红色，离开变成 `'#333'` 。

效果如下图所示。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IWLxRZomOfMAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>
<br />
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️注意:</strong></span>

边如果过细点击时很难击中，可以设置 `lineAppendWidth` 来提升击中范围。

```javascript
// 基于 line 扩展出新的边
G6.registerEdge('custom-edge', {
  // 响应状态变化
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

<br />

## 4. 自定义带箭头的边
很多时候，G6 默认提供的箭头并不能满足业务上的需求，这个时候，就需要我们自定义箭头。当然了，G6 也支持箭头样式的自定义。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*f1G9RJ5dE2oAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

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

