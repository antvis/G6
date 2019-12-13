---
title: 自定义节点
order: 2
---

G6 提供了一系列[内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode)，包括 [circle](/zh/docs/manual/middle/elements/nodes/circle)、[rect](/zh/docs/manual/middle/elements/nodes/rect)、[diamond](/zh/docs/manual/middle/elements/nodes/diamond)、[triangle](/zh/docs/manual/middle/elements/nodes/triangle)、[star](/zh/docs/manual/middle/elements/nodes/star)、[image](/zh/docs/manual/middle/elements/nodes/image)、[modelRect](/zh/docs/manual/middle/elements/nodes/modelRect)。若内置节点无法满足需求，用户还可以通过 `G6.registerNode('nodeName', options)` 进行自定义节点，方便用户开发更加定制化的节点，包括含有复杂图形的节点、复杂交互的节点、带有动画的节点等。

在本章中我们会通过四个案例，从简单到复杂讲解节点的自定义。这四个案例是：
<br />
<strong>1. 从无到有的定义节点：</strong>绘制图形；优化性能。
<br />
<strong>2. 扩展现有的节点：</strong>附加图形；增加动画。
<br />
<strong>3. 调整节点的锚点；</strong>
<br />
<strong>4. 调整节点的鼠标选中/悬浮样式。</strong>样式变化响应；动画响应。

通过 [图形 Shape](/zh/docs/manual/middle/keyconcept/shape-keyshape) 章节的学习，我们应该已经知道了自定义节点时需要满足以下两点：

- 控制节点的生命周期；
- 解析用户输入的数据，在图形上展示。

G6 中自定义节点的 API 如下：
```javascript
G6.registerNode('nodeName', {
  options: {
  	style: {},
    stateStyles: {
    	hover: {},
      selected: {}
    }
  },
  /**
	 * 绘制节点，包含文本
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G.Group} group 节点的容器
	 * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
	 */
	draw(cfg, group) {},
  /**
	 * 绘制后的附加操作，默认没有任何操作
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G.Group} group 节点的容器
   */
  afterDraw(cfg, group) {},
  /**
	 * 更新节点，包含文本
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {Node} node 节点
	 */
  update(cfg, node) {},
  /**
	 * 更新节点后的操作，一般同 afterDraw 配合使用
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {Node} node 节点
	 */
  afterUpdate(cfg, node) {},
  /**
	 * 响应节点的状态变化，主要是交互状态，业务状态请在 draw 方法中实现
	 * 默认情况下，节点的 keyShape 将会响应 selected、active 状态，有其他状态需求的用户自己复写这个方法
	 * @param  {String} name 状态名称
	 * @param  {Object} value 状态值
	 * @param  {Node} node 节点
	 */
  setState(name, value, node) {},
  /**
   * 获取锚点（相关边的连入点）
   * @param  {Object} cfg 节点的配置项
   * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(cfg) {}
}, extendNodeName);
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️注意:</strong></span>

- 如果不从任何现有的节点扩展新节点时，`draw` 方法是必须的；
- `update` 方法可以不定义，数据更新时会走 `draw` 方法，所有图形清除重绘；
- `afterDraw`，`afterUpdate` 方法一般用于扩展已有的节点，例如：在矩形节点上附加图片，圆节点增加动画等；
- `setState` 方法一般也不需要复写，有全局的样式可以替换；
- `getAnchorPoints` 方法仅在需要限制与边的连接点时才需要复写，也可以在数据中直接指定。


## 1. 从无到有定义节点
### 绘制图形
我们自己来实现一个菱形的节点，如下图所示。
> G6 有内置的菱形节点 diamond。为了演示，这里实现了一个自定义的菱形，相当于复写了内置的 diamond。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LqFCRaKyr0gAAAAAAAAAAABkARQnAQ' alt='img' width='80'/>

```javascript
G6.registerNode('diamond', {
	draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    const shape = group.addShape('path', {
    	attrs: {
        path: this.getPath(cfg), // 根据配置获取路径
        stroke: cfg.color // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
      }
    });
    if(cfg.label) { // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      group.addShape('text', {
        // attrs: style
      	attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#666'
        }
      });
    }
    return shape;
  },
  // 返回菱形的路径
  getPath(cfg) {
    const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];
  	//  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ['M', 0, 0 - height / 2], // 上部顶点
      ['L', width / 2, 0], // 右侧顶点
      ['L', 0, height / 2], // 下部顶点
      ['L', - width / 2, 0], // 左侧顶点
      ['Z'] // 封闭
    ];
    return path;
  },
});
```

上面的代码自定义了一个菱形节点，然后我们使用下面的数据输入就会绘制出 diamond 这个节点。
```javascript
const data = {
 nodes: [
   {x: 50, y: 100, shape: 'diamond'}, // 最简单的
   {x: 150, y: 100, shape: 'diamond', size: [50, 100]}, // 添加宽高
   {x: 250, y: 100, color: 'red', shape: 'diamond'}, // 添加颜色
   {x: 350, y: 100, label: '菱形', shape: 'diamond'} // 附加文本
 ]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qv88SrrnmFAAAAAAAAAAAABkARQnAQ' alt='img' width='300'/>

### 优化性能
当图中节点或边通过 `graph.update(item, cfg)` 重绘时，默认情况下会调用节点的 `draw` 方法进行重新绘制。在数据量大或节点上图形数量非常多（特别是文本多）的情况下，`draw` 方法中对所有图形、赋予样式将会非常消耗性能。

在自定义节点时，重写 `update` 方法，在更新时将会调用该方法替代 `draw`。我们可以在该方法中指定需要更新的图形，从而避免频繁调用 `draw` 、全量更新节点上的所有图形。当然，`update` 方法是可选的，如果没有性能优化的需求可以不重写该方法。

在实现 diamond 的过程中，重写 `update` 方法，找到需要更新的 shape 进行更新，从而优化性能。寻找需要更新的图形可以通过：

- `group.get('children')[0]` 找到 [关键图形 keyShape](/zh/docs/manual/middle/keyconcept/shape-keyshape#keyshape)，也就是 `draw` 方法返回的 shape；
- `group.get('children')[1]` 找到 label 图形。

下面代码仅更新了 diamond 的关键图形的路径和颜色。
```javascript
G6.registerNode('diamond', {
	draw(cfg, group) {
    // ... // 见前面代码
  },
  getPath(cfg) {
    // ... // 见前面代码
  },
  update(cfg, node) {
    const group = node.getContainer(); // 获取容器
    const shape = group.get('children')[0]; // 按照添加的顺序
    const style = {
      path: this.getPath(cfg),
      stroke: cfg.color
    };
    shape.attr(style); // 更新属性
    // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
    // 通过 label.attr() 更新文本属性即可
  }
});
```

## 2. 扩展现有节点
### 扩展 Shape
G6 中已经[内置了一些节点](/zh/docs/manual/middle/elements/nodes/defaultNode)，如果用户仅仅想对现有节点进行调整，复用原有的代码，则可以基于现有的节点进行扩展。同样实现 diamond ，可以基于 circle、ellipse、rect 等内置节点的进行扩展。<a href='https://github.com/antvis/g6/blob/master/src/shape/single-shape-mixin.js' target='_blank'>single-shape</a> 是这些内置节点图形的基类，也可以基于它进行扩展。

下面以基于 single-shape 为例进行扩展。`draw`，`update`，`setState` 方法在 <a href='https://github.com/antvis/g6/blob/master/src/shape/single-shape-mixin.js' target='_blank'>single-shape</a> 中都有实现，这里仅需要复写 `getShapeStyle` 方法即可。返回的对象中包含自定义图形的路径和其他样式。
```javascript
G6.registerNode('diamond', {
  shapeType: 'path', // 继承自 'single-shape' 时必须指定，否则不需要填写
  getShapeStyle(cfg) {
    const size = this.getSize(cfg); // 转换成 [width, height] 的模式
    const color = cfg.color;
    const width = size[0];
    const height = size[1];
  	//  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ['M', 0, 0 - height / 2], // 上部顶点
      ['L', width / 2, 0], // 右侧顶点
      ['L', 0, height / 2], // 下部顶点
      ['L', - width / 2, 0], // 左侧顶点
      ['Z'] // 封闭
    ];
    const style = Util.mix({}, {
      path: path,
      stroke: color
    }, cfg.style);
    return style;
  }
},
// 注意这里继承了 'single-shape'
'single-shape');
```

### 添加动画
通过 `afterDraw` 同样可以实现扩展，下面我们来看一个节点的动画场景，如下图所示。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ga7FQLdUYjkAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>


上面的动画效果，可以通过以下方式实现：

- 扩展内置的 rect，在 rect 中添加一个图形；
- 反复执行新添加图形的旋转动画。
```javascript
// 自定义一个名为 inner-animate 的节点
G6.registerNode('inner-animate', {
  afterDraw(cfg, group) {
    const size = cfg.size;
    const width = size[0] - 14;
    const height = size[1] - 14;
    // 添加图片
    const image = group.addShape('image', {
      attrs: {
        x: - width / 2,
        y: - height / 2,
        width: width,
        height: height,
        img: cfg.img
      }
    });
    // 执行旋转动画
    image.animate({
      onFrame(ratio) {
        const matrix = Util.mat3.create();
        const toMatrix = Util.transform(matrix, [
          ['r', ratio * Math.PI * 2]
        ]) ;
        return {
          matrix: toMatrix
        };
      },
      repeat: true
    }, 3000, 'easeCubic');
  }
},
// 继承了 rect 节点
'rect');
```

更多关于动画的实现，请参考[基础动画](/zh/docs/manual/advanced/animation)章节。

<br />

## 3. 调整锚点 anchorPoint
节点上的[锚点 anchorPoint](/zh/docs/manual/middle/keyconcept/anchorpoint) 作用是**确定节点与边的相交的位置**，看下面的场景：<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mJ85Q5WRJLwAAAAAAAAAAABkARQnAQ' alt='img' width='200'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*99aSR5zbd44AAAAAAAAAAABkARQnAQ' alt='img' width='200'/>

> （左）没有设置锚点时。（右）diamond 设置了锚点后。


有两种方式来调整节点上的锚点：

- 在数据里面指定 `anchorPoints`。

      **适用场景：**可以为不同节点配置不同的锚点，更定制化。

- 自定义节点中通过 `getAnchorPoints` 方法指定锚点。

      **适用场景：**全局配置锚点，所有该自定义节点类型的节点都相同。

### 数据中指定锚点
```javascript
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    anchorPoints: [
      [0, 0.5], // 左侧中间
      [1, 0.5]  // 右侧中间
    ]},
    //...       // 其他节点
  ],
  edges: [
    //... // 边
  ]
};
```

### 自定义时指定锚点
```javascript
G6.registerNode('diamond', {
  //... // 其他方法
  getAnchorPoints() {
    return  [
      [0, 0.5], // 左侧中间
      [1, 0.5]  // 右侧中间
    ]
  }
}, 'rect');
```

## 4. 调整状态样式
常见的交互都需要节点和边通过样式变化做出反馈，例如鼠标移动到节点上、点击选中节点/边、通过交互激活边上的交互等，都需要改变节点和边的样式，有两种方式来实现这种效果：

1. 在数据上添加标志字段，在自定义 shape 过程中根据约定进行渲染；
2. 将交互状态同原始数据和绘制节点的逻辑分开，仅更新节点。

我们推荐用户使用第二种方式来实现节点的状态调整，可以通过以下方式来实现：

- 在 G6 中自定义节点/边时在 `setState` 方法中进行节点状态变化的响应；
- 通过 `graph.setItemState()` 方法来设置状态。

基于 rect 扩展出一个 custom 图形，默认填充色为白色，当鼠标点击时变成红色，实现这一效果的示例代码如下：
```javascript
// 基于 rect 扩展出新的图形
G6.registerNode('custom', {
  // 响应状态变化
	setState(name, value, item) {
    const group = item.getContainer();
    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
  	if(name === 'selected') {
    	if(value) {
      	shape.attr('fill', 'red');
      } else {
        shape.attr('fill', 'white');
      }
    }
  }
}, 'rect');

// 点击时选中，再点击时取消
graph.on('node:click', ev=> {
	const node = ev.item;
  graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
});
```

G6 并未限定节点的状态，只要你在 `setState` 方法中进行处理你可以实现任何交互，如实现鼠标放到节点上后节点逐渐变大的效果。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JhhTSJ8PMbYAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

```javascript
G6.registerNode('custom', {
  // 响应状态变化
  setState(name, value, item) {
    const group = item.getContainer();
    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
    if(name === 'running') {
      if(value) {
        shape.animate({
          r: 20,
          repeat: true
        }, 1000);
      } else {
        shape.stopAnimate();
        shape.attr('r', 10);
      }
    }
  }
}, 'circle');

// 鼠标移动到上面 running，移出结束
graph.on('node:mouseenter', ev=> {
  const node = ev.item;
  graph.setItemState(node, 'running', true);
});

graph.on('node:mouseleave', ev=> {
  const node = ev.item;
  graph.setItemState(node, 'running', false);
});
```

