---
title: Custom Edge
order: 3
---

G6 provides abundant [Built-in Edges](/en/docs/manual/middle/elements/defaultEdge). Besides, the custom machanism allows the users to design their own type of edges. An edge with complex graphics shapes, complex interactions, fantastic animations can be implemented easily.

In this document, we will introduce the custom edge by three examples:
<br />1. Register a bran-new edge;
<br />2. Register an edge by extending a built-in edge;
<br />3. Register an edge with interactions and styles;
<br />4. Register an edge with custom arrow.


## 1. Register a Bran-new Edge
Now, we are goint to register a perpendicular polyline:<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxY-TJ2vJFMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Ijy4QpaB-fgAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gz09R5fM-HMAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>

> (Left) Straight line edge. (Center) A custom polyline edge. (Right) The result after modifying the link points of the end nodes.

### Register a Custom Edge
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
          ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , startPoint.y], // 1/3
          ['L', endPoint.x / 3 + 2 / 3 * startPoint.x , endPoint.y],   // 2/3
          ['L', endPoint.x, endPoint.y]
        ]
      }
    });
    return shape;
  }
});
```

Now, we register a custom edge named `'hvh'` whose result is shown in the center of the figure above. The default `startPoint` and `endPoint` in the custom edge are the intersection of the edge and the end nodes.

To achieve the result shown in the right of the figure, we modify the anchorPoints (link points) of the end nodes to change the positions of `startPoint` and `endPoint`.

### Modify the anchorPoints in Data
Now, we modify `anchorPoints` in the node data, and then use the `'hvh'` as `shape` in edge data as shown below.
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

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='img' width='150'/>

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
<br />提示：边如果过细点击时很难击中，可以设置 `**lineAppendWidth**` 来提升击中范围。

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

<br />

## 4. 自定义带箭头的边
很多时候，G6 默认提供的箭头并不能满足业务上的需求，这个时候，就需要我们自定义箭头。当然了，G6 也支持箭头样式的自定义。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*f1G9RJ5dE2oAAAAAAAAAAABkARQnAQ' alt='img' width='250'/>

> (Left) G6 内置箭头。(Right) 自定义边带有自定义箭头。


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

