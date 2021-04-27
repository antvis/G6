---
title: 自定义节点
order: 2
---

G6 提供了一系列[内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode)，包括 [circle](/zh/docs/manual/middle/elements/nodes/built-in/circle)、[rect](/zh/docs/manual/middle/elements/nodes/built-in/rect)、[diamond](/zh/docs/manual/middle/elements/nodes/built-in/diamond)、[triangle](/zh/docs/manual/middle/elements/nodes/built-in/triangle)、[star](/zh/docs/manual/middle/elements/nodes/built-in/star)、[image](/zh/docs/manual/middle/elements/nodes/built-in/image)、[modelRect](/zh/docs/manual/middle/elements/nodes/built-in/modelRect)。若内置节点无法满足需求，用户还可以通过 `G6.registerNode(typeName: string, nodeDefinition: object, extendedTypeName?: string)` 进行自定义节点，方便用户开发更加定制化的节点，包括含有复杂图形的节点、复杂交互的节点、带有动画的节点等。其参数：

- `typeName`：该新节点类型名称；
- `extendedTypeName`：被继承的节点类型，可以是内置节点类型名，也可以是其他自定义节点的类型名。`extendedTypeName` 未指定时代表不继承其他类型的节点；
- `nodeDefinition`：该新节点类型的定义，其中必要函数详见 [自定义机制 API](/zh/docs/api/registerItem#g6registernodenodename-options-extendednodename)。当有 `extendedTypeName` 时，没被复写的函数将会继承 `extendedTypeName` 的定义。

**需要注意的是**，自定义节点/边时，若给定了 `extendedTypeName`，如 `draw`，`update`，`setState` 等必要的函数若不在 `nodeDefinition` 中进行复写，将会继承 `extendedTypeName` 中的相关定义。常见问题：

- Q：节点/边更新时，没有按照在 `nodeDefinition` 中自定义实现的 `draw` 或 `drawShape` 逻辑更新。例如，有些图形没有被更新，增加了没有在 `draw` 或 `drawShape` 方法中定义的图形等。
- A：由于继承了 `extendedTypeName`，且在 `nodeDefinition` 中没有复写 `update` 方法，导致节点/边更新时执行了 `extendedTypeName` 中的 `update` 方法，从而与自定义的 `draw` 或 `drawShape` 有出入。可以通过复写 `update` 方法为 `undefined` 解决。当 `update` 方法为 `undefined` 时，节点/边的更新将会执行 `draw` 或 `drawShape` 进行重绘。

在本章中我们会通过五个案例，从简单到复杂讲解节点的自定义。这五个案例是： <br /> <strong>1. 从无到有的定义节点：</strong>绘制图形；优化性能。 <br /> <strong>2. 扩展现有的节点：</strong>附加图形；增加动画。 <br /> <strong>3. 调整节点的锚点；</strong> <br /> <strong>4. 调整节点的鼠标选中/悬浮样式：</strong>样式变化响应；动画响应； <br /> <strong>5. 使用 DOM 自定义节点。</strong>

通过 [图形 Shape](/zh/docs/manual/middle/elements/shape/shape-keyshape) 章节的学习，我们应该已经知道了自定义节点时需要满足以下两点：

- 控制节点的生命周期；
- 解析用户输入的数据，在图形上展示。

G6 中自定义节点的 API 如下：

```javascript
G6.registerNode(
  'nodeName',
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中图形对象的容器
     * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
     * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中图形对象的容器
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
     * 响应节点的状态变化。
     * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
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
    getAnchorPoints(cfg) {},
  },
  // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
  // 当不指定该参数则代表不继承任何内置节点类型
  extendedNodeName,
);
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️ 注意:</strong></span>

- 如果不从任何现有的节点或从 `'single-node'` 扩展新节点时，`draw` 方法是必须的；
- 节点内部所有图形**使用相对于节点自身的坐标系**，即 `(0, 0)` 是该节点的中心。而节点的坐标是相对于画布的，由该节点 group 上的矩阵控制，自定义节点中不需要用户感知。若在自定义节点内增加 `rect` 图形，要注意让它的 x 与 y 各减去其长与宽的一半。详见例子 [从无到有定义节点](#1-从无到有定义节点)；
- `update` 方法可以不定义：
  - 当 `update` 未定义：若指定了 `registerNode` 的第三个参数 `extendedNodeName`（即代表继承指定的内置节点类型），则节点更新时将执行被继承的内置节点类型的 `update` 逻辑；若未指定 `registerNode` 的第三个参数，则节点更新时会执行 `draw` 方法，所有图形清除重绘；
  - 当定义了 `update` 方法，则不论是否指定 `registerNode` 的第三个参数，在节点更新时都会执行复写的 `update` 函数逻辑。
- `afterDraw`，`afterUpdate` 方法一般用于扩展已有的节点，例如：在矩形节点上附加图片，圆节点增加动画等；
- `setState` 只有在需要使用动画的方式来响应状态变化时需要复写，一般的样式响应状态变化可以通过 [配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式) 实现；
- `getAnchorPoints` 方法仅在需要限制与边的连接点时才需要复写，也可以在数据中直接指定。

## 1. 从无到有定义节点

### 绘制图形

我们自己来实现一个菱形的节点，如下图所示。

> G6 有内置的菱形节点 diamond。为了演示，这里实现了一个自定义的菱形，相当于复写了内置的 diamond。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LqFCRaKyr0gAAAAAAAAAAABkARQnAQ' alt='img' width='80'/>

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️ 注意:</strong></span> 从下面代码可以看出，自定义节点中所有通过 `addShape` 增加的图形的坐标都是**相对于节点自身的子坐标系**，即 `(0, 0)` 是该节点的中心。如 `'text'` 图形的 `x` 和 `y` 均为 0，代表该图形相对于该节点居中；`'path'` 图形 `path` 属性中的坐标也是以 `(0, 0)` 为原点计算的。换句话说，在**自定义节点时不需要感知相对于画布的节点坐标**，节点坐标由该节点所在 group 的矩阵控制。

```javascript
G6.registerNode('diamond', {
  draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    const keyShape = group.addShape('path', {
      attrs: {
        path: this.getPath(cfg), // 根据配置获取路径
        stroke: cfg.color, // 颜色应用到描边上，如果应用到填充，则使用 fill: cfg.color
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
      // 设置 draggable 以允许响应鼠标的图拽事件
      draggable: true,
    });
    if (cfg.label) {
      // 如果有文本
      // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
      // style.text = cfg.label;
      const label = group.addShape('text', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#666',
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'text-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
    }
    return keyShape;
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
      ['L', -width / 2, 0], // 左侧顶点
      ['Z'], // 封闭
    ];
    return path;
  },
});
```

上面的代码自定义了一个菱形节点。值得注意的是，G6 3.3 需要用户为自定义节点中的图形设置 `name` 和 `draggable`。其中，`name` 可以是不唯一的任意值。`draggable` 为 `true` 是表示允许该图形响应鼠标的拖拽事件，只有 `draggable: true` 时，图上的交互行为 `'drag-node'` 才能在该图形上生效。若上面代码仅在 keyShape 上设置了 `draggable: true`，而 label 图形上没有设置，则鼠标拖拽只能在 keyShape 上响应。

现在，我们使用下面的数据输入就会绘制出 diamond 这个节点。

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 50, y: 100, type: 'diamond' }, // 最简单的
    { id: 'node2', x: 150, y: 100, type: 'diamond', size: [50, 100] }, // 添加宽高
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond' }, // 添加颜色
    { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond' }, // 附加文本
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qv88SrrnmFAAAAAAAAAAAABkARQnAQ' alt='img' width='300'/>

### 优化性能

当图中节点或边通过  `graph.update(item, cfg)` 重绘时，默认情况下会调用节点的 `draw` 方法进行重新绘制。在数据量大或节点上图形数量非常多（特别是文本多）的情况下，`draw` 方法中对所有图形、赋予样式将会非常消耗性能。

在自定义节点时，重写  `update` 方法，在更新时将会调用该方法替代 `draw`。我们可以在该方法中指定需要更新的图形，从而避免频繁调用  `draw` 、全量更新节点上的所有图形。当然，`update` 方法是可选的，如果没有性能优化的需求可以不重写该方法。

在实现 diamond 的过程中，重写  `update` 方法，找到需要更新的 shape 进行更新，从而优化性能。寻找需要更新的图形可以通过：

- `group.get('children')[0]` 找到 [关键图形  keyShape](/zh/docs/manual/middle/elements/shape/shape-keyshape#keyshape)，也就是 `draw` 方法返回的 shape；
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
      stroke: cfg.color,
    };
    shape.attr(style); // 更新属性
    // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
    // 通过 label.attr() 更新文本属性即可
  },
});
```

## 2. 扩展现有节点

### 扩展 Shape

G6 中已经[内置了一些节点](/zh/docs/manual/middle/elements/nodes/defaultNode)，如果用户仅仅想对现有节点进行调整，复用原有的代码，则可以基于现有的节点进行扩展。同样实现 diamond ，可以基于  circle、ellipse、rect 等内置节点的进行扩展。single-node 是这些内置节点类型的基类，也可以基于它进行扩展。（single-edge 是所有内置边类型的基类。）

下面以基于 single-node 为例进行扩展。`update`，`setState` 方法在  single-node 中都有实现，这里仅需要复写 `draw` 方法即可。返回的对象中包含自定义图形的路径和其他样式。

```javascript
G6.registerNode(
  'diamond',
  {
    draw(cfg, group) {
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
        ['L', -width / 2, 0], // 左侧顶点
        ['Z'], // 封闭
      ];
      const style = G6.Util.mix(
        {},
        {
          path: path,
          stroke: color,
        },
        cfg.style,
      );
      // 增加一个 path 图形作为 keyShape
      const keyShape = group.addShape('path', {
        attrs: {
          ...style,
        },
        draggable: true,
        name: 'diamond-keyShape',
      });
      // 返回 keyShape
      return keyShape;
    },
  },
  // 注意这里继承了 'single-node'
  'single-node',
);
```

### 添加动画

通过 `afterDraw` 同样可以实现扩展，下面我们来看一个节点的动画场景，如下图所示。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ga7FQLdUYjkAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

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
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'image-shape'
    });
    // 执行旋转动画
    image.animate((ratio) => {
      const matrix = Util.mat3.create();
      const toMatrix = Util.transform(matrix, [
        ['r', ratio * Math.PI * 2]
      ]) ;
      return {
        matrix: toMatrix
      };
    }, {
      repeat: true
      duration: 3000,
      easing: 'easeCubic'
    });
  }
},
// 继承了 rect 节点
'rect');
```

更多关于动画的实现，请参考[基础动画](/zh/docs/manual/middle/animation)章节。

<br />

## 3. 调整锚点 anchorPoint

节点上的[锚点 anchorPoint](/zh/docs/manual/middle/elements/nodes/anchorpoint) 作用是**确定节点与边的相交的位置**，看下面的场景：<br />

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
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 100,
      anchorPoints: [
        [0, 0.5], // 左侧中间
        [1, 0.5], // 右侧中间
      ],
    },
    //...       // 其他节点
  ],
  edges: [
    //... // 边
  ],
};
```

### 自定义时指定锚点

```javascript
G6.registerNode(
  'diamond',
  {
    //... // 其他方法
    getAnchorPoints() {
      return [
        [0, 0.5], // 左侧中间
        [1, 0.5], // 右侧中间
      ];
    },
  },
  'rect',
);
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
G6.registerNode(
  'custom',
  {
    // 响应状态变化
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // 顺序根据 draw 时确定
      if (name === 'selected') {
        if (value) {
          shape.attr('fill', 'red');
        } else {
          shape.attr('fill', 'white');
        }
      }
    },
  },
  'rect',
);

// 点击时选中，再点击时取消
graph.on('node:click', (ev) => {
  const node = ev.item;
  graph.setItemState(node, 'selected', !node.hasState('selected')); // 切换选中
});
```

G6 并未限定节点的状态，只要你在 `setState` 方法中进行处理你可以实现任何交互，如实现鼠标放到节点上后节点逐渐变大的效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JhhTSJ8PMbYAAAAAAAAAAABkARQnAQ' alt='img' width='350'/>

```javascript
G6.registerNode(
  'custom',
  {
    // 响应状态变化
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // 顺序根据 draw 时确定
      if (name === 'running') {
        if (value) {
          shape.animate(
            {
              r: 20,
            },
            {
              repeat: true,
              duration: 1000,
            },
          );
        } else {
          shape.stopAnimate();
          shape.attr('r', 10);
        }
      }
    },
  },
  'circle',
);

// 鼠标移动到上面 running，移出结束
graph.on('node:mouseenter', (ev) => {
  const node = ev.item;
  graph.setItemState(node, 'running', true);
});

graph.on('node:mouseleave', (ev) => {
  const node = ev.item;
  graph.setItemState(node, 'running', false);
});
```

## 5. 使用 DOM 自定义节点

> SVG 与 DOM 图形在 V3.3.x 中不支持。
> 仅在 Graph 的 `renderer` 为 `'svg'` 时可以使用 DOM 自定义节点。

这里，我们演示使用 DOM 自定义一个名为 `'dom-node'` 的节点。在 `draw` 方法中使用 `group.addShape` 增加一个 `'dom'` 类型的图形，并设置其 `html` 为 DOM 的 `html` 值。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VgQlQK1MdbIAAAAAAAAAAABkARQnAQ' alt='img' width='120'/>

```javascript
G6.registerNode(
  'dom-node',
  {
    draw: (cfg: ModelConfig, group: Group) => {
      return group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // 传入 DOM 的 html
          html: `
        <div style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
        },
        draggable: true,
      });
    },
  },
  'single-node',
);
```

上面的代码自定义了一个名为 `'dom-node'` 的带有 DOM 的节点。值得注意的是，G6 3.3 需要用户为自定义节点中的图形设置 `name` 和 `draggable`。其中，`name` 可以是不唯一的任意值。`draggable` 为 `true` 是表示允许该图形响应鼠标的拖拽事件，只有 `draggable: true` 时，图上的交互行为 `'drag-node'` 才能在该图形上生效。

现在，我们使用下面的数据输入就会绘制出带有 `'dom-node'` 节点的图。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*coxYTo3zEecAAAAAAAAAAABkARQnAQ' alt='img' width='300'/>

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 50, y: 100 },
    { id: 'node2', x: 150, y: 100 },
  ],
  edges: [(source: 'node1'), (target: 'node2')],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  defaultNode: {
    type: 'dom-node',
    size: [120, 40],
  },
});
graph.data(data);
graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> G6 的节点/边事件不支持 DOM 类型的图形。如果需要为 DOM 节点绑定事件，请使用原生 DOM 事件。例如：

```javascript
G6.registerNode(
  'dom-node',
  {
    draw: (cfg: ModelConfig, group: Group) => {
      return group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // 传入 DOM 的 html，带有原生 onclick 事件
          html: `
        <div onclick="alert('Hi')" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `,
        },
        draggable: true,
      });
    },
  },
  'single-node',
);
```
