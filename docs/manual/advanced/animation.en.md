---
title: Basic Animation
order: 8
---

There are two-level animation in G6:

- GLobal animation: Transform the graph animatively when the changes are global;
- Item animation: The animation on a node or an edge.

<br />
## Global Animation
The global animation is controlled by Graph instance. It takes effect when some global changes happen, such as:

- `graph.updateLayout(cfg)` change the layout;
- `graph.changeData()` change the data.

Configure `animate: true` when instantiating a graph to achieve it.
<br />
```javascript
const graph = new G6.Graph({
  // ...                      // Other configurations
  animate: true,           // Boolean, whether activate the animation when global changes happen
  animateCfg: {
    duration: 500,         // Number, the duration of one animation
    easing: 'linearEasing' // String, the easing function
  }
});
```

G6 supports all the easing functions in d3.js. Thus, the options of `easing` in `animateCfg`: <br />`'easeLinear'` ，<br />`'easePolyIn'` ，`'easePolyOut'` ， `'easePolyInOut'`  ，<br />`'``easeQuad``'` ，`'easeQuadIn'` ，`'easeQuadOut'` ， `'easeQuadInOut'` 。

For more detail of the easing functions, please refer to: [d3 Easings](https://github.com/d3/d3/blob/master/API.md#easings-d3-ease)。


## Item Animation
All the built-in nodes and edges are static withou animation. To animate node or edge, please register your type of [Custom Node](/en/docs/manual/advanced/custom-node) or [Custom Edge](/en/docs/manual/advanced/custom-edge), and rewrite the `afterDraw` function.

### Node Animation
The animation frames are applied on one graphics shape of a node.
We are going to introduce this part by three demos:

- The graphics animation (Left of the figure below);
- The background animation (Center of the figure below);
- Partial animation (Right of the figure below).


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aAjWQ4n_OOEAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FxDJQ5eY-5oAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uFQsQqxIa_QAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<br />

The code of the three demos can be found at:
[Node Animation](/en/examples/scatter/node)。

#### The Graphics Animation
In this example, we are going to magnify and shrink the node. <br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aAjWQ4n_OOEAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

We first find the graphics shape to be animated by `group.get('children')[0]`. Here we find the 0th graphics shape of this type of node. Then, we call `animate` for the node to define the attributes for each frame(`onFrame` returns the attributes of each frame).
```javascript
// Magnify and shrink animation
G6.registerNode('circle-animate', {
  afterDraw(cfg, group) {
    // Get the first graphics shape of this type of node
    const shape = group.get('children')[0];
    // The animation
    shape.animate({
      // Whehter play the animation repeatly
      repeat: true,
      // Returns the attributes for each frame. The input parameter ratio is a number that range from 0 to 1. The return value is an object that defines the attributes for this frame.
      onFrame(ratio) {
        // Magnify first, and then shrink
        const diff = ratio <=0.5 ? ratio * 10 : (1 - ratio) * 10;
        let radius = cfg.size;
        if (isNaN(radius)) radius = radius[0];
        // The attributes for this frame. Only radius for this example
        return {
          r: radius / 2 + diff
        }
      }
    }, 3000, 'easeCubic'); // The duration of one animation is 3000, and the easing fuction is 'easeCubic'
  }
}, 'circle'); // This custom node extend the built-in node 'circle'. Except for the rewrited afterDraw, other functions will extend from 'circle' node
```

#### Background Animation
You can add extra shape with animation in `afterDraw`.<br />

In `afterDraw` of this demo, we draw three background circle shape with different filling colors. And the `animate` is called for magnifying and fading out the three circles. We do not call `onFrame` here, but assign the target style for each animation to the input paramter: magify the radius to 10 and reduce the opacity to 0.1.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FxDJQ5eY-5oAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerNode('background-animate', {
  afterDraw(cfg, group) {
    let r = cfg.size / 2;
      if (isNaN(r)) {
        r = cfg.size[0] / 2;
      };
    // The first background circle
    const back1 = group.addShape('circle',{
      zIndex: -3,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: cfg.color,
        opacity: 0.6
      }
    });
    // The second background circle
    const back2 = group.addShape('circle',{
      zIndex: -2,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: 'blue',
        opacity: 0.6
      }
    });
    // The third background circle
    const back3 = group.addShape('circle',{
      zIndex: -1,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: 'green',
        opacity: 0.6
      }
    });
    group.sort(); // Sort the graphic shapes of the nodes by zIndex
    
    // Magnify the first circle and fade it out
    back1.animate({
      r: r + 10,
      opacity: 0.1,
      repeat: true // Play the animation repeatly
    }, 3000, 'easeCubic', null, 0) // No delay

    // Magnify the second circle and fade it out
    back2.animate({
      r: r + 10,
      opacity: 0.1,
      repeat: true // Play the animation repeatly
    }, 3000, 'easeCubic', null, 1000) // Delay 1s

    // Magnify the third circle and fade it out
    back3.animate({
      r: r + 10,
      opacity: 0.1,
      repeat: true // Play the animation repeatly
    }, 3000, 'easeCubic', null, 2000) // Delay 2s
  }
}, 'circle');
```

#### Partial Animation
In this demo, we add extra graphics shape(an image) in `afterDraw`, and set a rotation animation for it. Note that the rotation animation is a little complicated, which should be manipulated by matrix.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uFQsQqxIa_QAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerNode('inner-animate', {
  afterDraw(cfg, group) {
    const size = cfg.size;
    const width = size[0] - 12;
    const height = size[1] - 12;
    // Add an image shape
    const image = group.addShape('image', {
      attrs: {
        x: - width / 2,
        y: - height / 2,
        width: width,
        height: height,
        img: cfg.img
      }
    });
    // Add animation for the image
    image.animate({
      // Play the animation repeatly
      repeat: true,
      // Returns the attributes for each frame. The input parameter ratio is a number that range from 0 to 1. The return value is an object that defines the attributes for this frame.
      onFrame(ratio) {
        // Rotate by manipulating matrix
        // The current matrix
        const matrix = Util.mat3.create();
        // The target matrix
        const toMatrix = Util.transform(matrix, [
          ['r', ratio * Math.PI * 2]
        ]) ;
        // The attributes of this frame. Only target matrix for this demo
        return {
          matrix: toMatrix
        };
      }
    }, 3000, 'easeCubic');
  }
}, 'rect');
```

### Edge Animation
关于边动画，以下面三个动画示例进行讲解：

- 圆点在沿着线运动（下图左）；
- 虚线运动的效果（下图中，gif 图片的帧率问题导致看起来是静态的，可以访问下面的 demo 链接查看）；
- 线从无到有的效果（下图右）。


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OAGPRZbYpw4AAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VUgETK6aMzcAAAAAAAAAAABkARQnAQ' alt='download' width='110'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

以上三个边动画的 demo 代码见：[边动画](https://codepen.io/Yanyan-Wang/pen/yLLJJoJ)。

#### 圆点运动
本例通过在 afterDraw 方法中为边增加了一个 circle 图形，该图形沿着线运动。沿着线运动的原理：设定每一帧中，该 circle 在线上的相对位置。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OAGPRZbYpw4AAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerEdge('circle-running', {
  afterDraw(cfg, group) {
    // 获得当前边的第一个图形，这里是边本身的 path
    const shape = group.get('children')[0];
    // 边 path 的起点位置
    const startPoint = shape.getPoint(0);
    
    // 添加红色 circle 图形
    const circle = group.addShape('circle', {
      attrs: {
        x: startPoint.x,
        y: startPoint.y,
        fill: 'red',
        r: 3
      }
    });
    
    // 对红色圆点添加动画
    circle.animate({
      // 动画重复
      repeat: true,
      // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
      onFrame(ratio) {
        // 根据比例值，获得在边 path 上对应比例的位置。
        const tmpPoint = shape.getPoint(ratio);
        // 返回需要变化的参数集，这里返回了位置 x 和 y
        return {
          x: tmpPoint.x,
          y: tmpPoint.y
        };
      }
    }, 3000); // 一次动画的时间长度
  }
}, 'cubic');  // 该自定义边继承内置三阶贝塞尔曲线 cubic
```

#### 虚线运动的效果
虚线运动的效果是通过计算线的 `lineDash` ，并在每一帧中不断修改实现。<br />


<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VUgETK6aMzcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
// lineDash 的差值，可以在后面提供 util 方法自动计算
const dashArray = [
  [0,1],
  [0,2],
  [1,2],
  [0,1,1,2],
  [0,2,1,2],
  [1,2,1,2],
  [2,2,1,2],
  [3,2,1,2],
  [4,2,1,2]
];

const lineDash = [4, 2, 1, 2];
const interval = 9; // lineDash 的和
G6.registerEdge('line-dash', {
  afterDraw(cfg, group) {
    // 获得该边的第一个图形，这里是边的 path
    const shape = group.get('children')[0];
    // 获得边的 path 的总长度
    const length = shape.getTotalLength();
    let totalArray = [];
    // 计算出整条线的 lineDash
    for (var i = 0; i < length; i += interval) {
      totalArray = totalArray.concat(lineDash);
    }
    
    let index = 0;
    // 边 path 图形的动画
    shape.animate({
      // 动画重复
      repeat: true,
      // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
      onFrame(ratio) {
        const cfg = {
          lineDash: dashArray[index].concat(totalArray)
        };
        // 每次移动 1
        index = (index + 1) % interval;
        // 返回需要修改的参数集，这里只修改了 lineDash
        return cfg;
      }
    }, 3000);  // 一次动画的时长为 3000
  }
}, 'cubic');   // 该自定义边继承了内置三阶贝塞尔曲线边 cubic
```

#### 线从无到有
线从无到有的动画效果，同样可以通过计算 `lineDash` 来实现。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerEdge('line-growth', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = group.getTotalLength();
    shape.animate({
      // 动画重复
      repeat: true,
      // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
      onFrame(ratio) {
        const startLen = ratio * length;
        // 计算线的lineDash
        const cfg = {
          lineDash: [startLen, length - startLen]
        };
        return cfg;
      }
    }, 2000);  // 一次动画的时长为 2000
  }
}, 'cubic');   // 该自定义边继承了内置三阶贝塞尔曲线边 cubic
```

### 交互动画
在交互的过程中也可以添加动画。如下图所示，当鼠标移到节点上时，所有与该节点相关联的边都展示虚线运动的动画。<br />![交互动画.gif](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-90pSrm4hkUAAAAAAAAAAABkARQnAQ)<br />上图完整 demo 即代码参见：[状态切换动画](/zh/examples/scatter/stateChange)。

这种动画涉及到了边的 [状态](/zh/docs/manual/middle/states/state)。在自定义边时复写 `setState` 方法，可对边的各种状态进行监听。鼠标移动到节点上，相关边的某个状态被开启，`setState` 方法中监听到后开启动画效果。步骤如下：

- 自定义边中复写 `setState` 方法监听该边的状态，以及某状态下的动画效果；
- 监听中间的节点的 `mouseenter` 和 `mouseleave` 事件，触发相关边的状态变化。

下面代码节选自 demo [状态切换动画](/zh/examples/scatter/stateChange)，请注意省略了部分代码，只展示了交互相关以及边动画相关的代码。
```javascript
// const data = ...
// const graph = new G6.Graph({...});

// lineDash 的差值，可以在后面提供 util 方法自动计算
const dashArray = [
  [0,1],
  [0,2],
  [1,2],
  [0,1,1,2],
  [0,2,1,2],
  [1,2,1,2],
  [2,2,1,2],
  [3,2,1,2],
  [4,2,1,2]
];

const lineDash = [4, 2, 1, 2];
const interval = 9; // lineDash 的总长度。

// 注册名为 'can-running' 的边
G6.registerEdge('can-running', {
  // 复写setState方法
  setState(name, value, item) {
    const shape = item.get('keyShape');
    // 监听 running 状态
    if (name === 'running') {
      // running 状态为 true 时
      if (value) {
        const length = shape.getTotalLength(); 
        let totalArray = [];
        for (var i = 0; i < length; i += interval) {
          totalArray = totalArray.concat(lineDash);
        }
        let index = 0;
        shape.animate({
          // 动画重复
          repeat: true,
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          onFrame(ratio) {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            };
            index = (index + 1) % interval;
            return cfg;
          }
        }, 3000);   // 一次动画的时长为 3000
      } else { // running 状态为 false 时
        // 结束动画
        shape.stopAnimate();
        // 清空 lineDash
        shape.attr('lineDash', null);
      }
    }
  }
}, 'cubic-horizontal');  // 该自定义边继承了内置横向三阶贝塞尔曲线边 cubic-horizontal

// 监听节点的 mouseenter 事件
graph.on('node:mouseenter', ev => {
  // 获得当前鼠标操作的目标节点
  const node = ev.item;
  // 获得目标节点的所有相关边
  const edges = node.getEdges();
  // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
  edges.forEach(edge => graph.setItemState(edge, 'running', true));
});

// 监听节点的 mouseleave 事件
graph.on('node:mouseleave', ev => {
  // 获得当前鼠标操作的目标节点
  const node = ev.item;
  // 获得目标节点的所有相关边
  const edges = node.getEdges();
  // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
  edges.forEach(edge => graph.setItemState(edge, 'running', false));
});

// graph.data(data);
// graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;注意：</span>
running 为 false 时，要停止动画，同时把 lineDash 清空。

