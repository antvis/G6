---
title: 基础动画
order: 5
---

G6 中的动画分为两个层次：

- 全局动画：全局性的动画，图整体变化时的动画过渡；
- 元素（边和节点）动画：节点或边上的独立动画。

<br />

## 全局动画

G6 的全局动画指通过图实例进行某些全局操作时，产生的动画效果。例如：

- `graph.updateLayout(cfg)` 布局的变化
- `graph.changeData()` 数据的变化

通过实例化图时配置 `animate: true`，可以达到每次进行上述操作时，动画效果变化的目的。配合 `animateCfg` 配置动画参数，`animateCfg` 具体配置参见 [animateCfg](#animateCfg)<br />

```javascript
const graph = new G6.Graph({
  // ...                   // 图的其他配置项
  animate: true, // Boolean，切换布局时是否使用动画过度，默认为 false
  animateCfg: {
    duration: 500, // Number，一次动画的时长
    easing: 'linearEasing', // String，动画函数
  },
});
```

## 元素动画

由于 G6 的内置节点和边是没有动画的，需要实现节点和边上的动画需要通过[自定义节点](/zh/docs/manual/middle/elements/nodes/custom-node)、[自定义边](/zh/docs/manual/middle/elements/edges/custom-edge)时复写  `afterDraw`  实现。

### 节点动画

节点上的动画，即每一帧发生变化的是节点上的某一个图形。关于节点动画，以下面三个动画示例进行讲解：

- 节点上图形的动画（如下图左）；
- 增加带有动画的背景图形（如下图中）；
- 节点上部分图形的旋转动画（如下图右）。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aAjWQ4n_OOEAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FxDJQ5eY-5oAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uFQsQqxIa_QAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<br />

以上三个动画节点的 demo 代码见： <a href='/zh/examples/scatter/node' target='_blank'>节点动画</a>。

#### 节点上图形的动画

<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aAjWQ4n_OOEAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

本例实现节点放大缩小，通过  `group.get('children')[0]` 找到需要更新的图形（这里找到该节点上第 0 个图形），然后调用该图形的 `animate` 方法指定动画的参数及每一帧的变化（  第一个参数是返回每一帧需要变化的参数集的函数，其参数 `ratio` 是当前正在进行的一次动画的进度，范围 [0, 1]；第二个参数是动画的参数，动画参数的具体配置参见 [animateCfg](#animateCfg)）。

```javascript
// 放大、变小动画
G6.registerNode(
  'circle-animate',
  {
    afterDraw(cfg, group) {
      // 获取该节点上的第一个图形
      const shape = group.get('children')[0];
      // 该图形的动画
      shape.animate(
        (ratio) => {
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          // 先变大、再变小
          const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
          let radius = cfg.size;
          if (isNaN(radius)) radius = radius[0];
          // 返回这一帧需要变化的参数集，这里只包含了半径
          return {
            r: radius / 2 + diff,
          };
        },
        {
          // 动画重复
          repeat: true,
          duration: 3000,
          easing: 'easeCubic',
        },
      ); // 一次动画持续的时长为 3000，动画效果为 'easeCubic'
    },
  },
  'circle',
); // 该自定义节点继承了内置节点 'circle'，除了被复写的 afterDraw 方法外，其他按照 'circle' 里的函数执行。
```

#### 增加带有动画的背景图形

在 `afterDraw` 方法中为已有节点添加额外的 shape ，并为这些新增的图形设置动画。<br />

本例在 `afterDraw` 方法中，绘制了三个背景 circle ，分别使用不同的颜色填充，再调用 `animate` 方法实现这三个 circle 逐渐变大、变淡的动画。本例中没有使用函数参数的形式，直接在 `animate` 函数的第一个参数中设置每次动画结束时的最终目标样式，即半径增大 10，透明度降为 0.1。第二个参数设置动画的配置，动画参数的具体配置参见 [animateCfg](#animateCfg)。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FxDJQ5eY-5oAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerNode(
  'background-animate',
  {
    afterDraw(cfg, group) {
      let r = cfg.size / 2;
      if (isNaN(r)) {
        r = cfg.size[0] / 2;
      }
      // 第一个背景圆
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape1',
      });
      // 第二个背景圆
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: 'blue', // 为了显示清晰，随意设置了颜色
          opacity: 0.6,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape2',
      });
      // 第三个背景圆
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: 'green',
          opacity: 0.6,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape3',
      });
      group.sort(); // 排序，根据 zIndex 排序

      // 第一个背景圆逐渐放大，并消失
      back1.animate(
        {
          r: r + 10,
          opacity: 0.1,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: 0, // 无延迟
        },
      );

      // 第二个背景圆逐渐放大，并消失
      back2.animate(
        {
          r: r + 10,
          opacity: 0.1,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: 1000, // 1 秒延迟
        },
      ); // 1 秒延迟

      // 第三个背景圆逐渐放大，并消失
      back3.animate(
        {
          r: r + 10,
          opacity: 0.1,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: 2000, // 2 秒延迟
        },
      );
    },
  },
  'circle',
);
```

#### 部分图形旋转动画

这一例也是在 `afterDraw` 方法中为已有节点添加额外的 shape （本例中为 image），并为这些新增的图形设置旋转动画。旋转动画较为复杂，需要通过矩阵的操作实现。`animate` 函数的第一个参数是返回每一帧需要变化的参数集的函数，其参数 `ratio` 是当前正在进行的一次动画的进度，范围 [0, 1]；第二个参数是动画的参数，动画参数的具体配置参见 [animateCfg](#animateCfg)。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uFQsQqxIa_QAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerNode(
  'inner-animate',
  {
    afterDraw(cfg, group) {
      const size = cfg.size;
      const width = size[0] - 12;
      const height = size[1] - 12;
      // 添加图片 shape
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          width: width,
          height: height,
          img: cfg.img,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'image-shape',
      });
      // 该图片 shape 的动画
      image.animate(
        (ratio) => {
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          // 旋转通过矩阵来实现
          // 当前矩阵
          const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          // 目标矩阵
          const toMatrix = Util.transform(matrix, [['r', ratio * Math.PI * 2]]);
          // 返回这一帧需要的参数集，本例中只有目标矩阵
          return {
            matrix: toMatrix,
          };
        },
        {
          repeat: true, // 动画重复
          duration: 3000,
          easing: 'easeCubic',
        },
      );
    },
  },
  'rect',
);
```

### 边动画

关于边动画，以下面三个动画示例进行讲解：

- 圆点在沿着线运动（下图左）；
- 虚线运动的效果（下图中，gif 图片的帧率问题导致看起来是静态的，可以访问下面的 demo 链接查看）；
- 线从无到有的效果（下图右）。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OAGPRZbYpw4AAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VUgETK6aMzcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

以上三个边动画的 demo 代码见：<a href='/zh/examples/scatter/edge' target='_blank'>边动画</a>。

#### 圆点运动

本例通过在 `afterDraw` 方法中为边增加了一个 circle 图形，该图形沿着线运动。沿着线运动的原理：设定每一帧中，该 circle 在线上的相对位置。`animate` 函数的第一个参数是返回每一帧需要变化的参数集的函数，其参数 `ratio` 是当前正在进行的一次动画的进度，范围 [0, 1]；第二个参数是动画的参数，动画参数的具体配置参见 [animateCfg](#animateCfg)。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OAGPRZbYpw4AAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerEdge(
  'circle-running',
  {
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
          r: 3,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape',
      });

      // 对红色圆点添加动画
      circle.animate(
        (ratio) => {
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          // 根据比例值，获得在边 path 上对应比例的位置。
          const tmpPoint = shape.getPoint(ratio);
          // 返回需要变化的参数集，这里返回了位置 x 和 y
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
          };
        },
        {
          repeat: true, // 动画重复
          duration: 3000,
        },
      ); // 一次动画的时间长度
    },
  },
  'cubic',
); // 该自定义边继承内置三阶贝塞尔曲线 cubic
```

#### 虚线运动的效果

虚线运动的效果是通过计算线的 `lineDash` ，并在每一帧中不断修改实现。`animate` 函数的第一个参数是返回每一帧需要变化的参数集的函数，其参数 `ratio` 是当前正在进行的一次动画的进度，范围 [0, 1]；第二个参数是动画的参数，动画参数的具体配置参见 [animateCfg](#animateCfg)。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VUgETK6aMzcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
// lineDash 的差值，可以在后面提供 util 方法自动计算
const lineDash = [4, 2, 1, 2];
G6.registerEdge(
  'line-dash',
  {
    afterDraw(cfg, group) {
      // 获得该边的第一个图形，这里是边的 path
      const shape = group.get('children')[0];
      let index = 0;
      // 边 path 图形的动画
      shape.animate(
        () => {
          index++;
          if (index > 9) {
            index = 0;
          }
          const res = {
            lineDash,
            lineDashOffset: -index,
          };
          // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
          return res;
        },
        {
          repeat: true, // 动画重复
          duration: 3000, // 一次动画的时长为 3000
        },
      );
    },
  },
  'cubic',
); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic
```

#### 线从无到有

线从无到有的动画效果，同样可以通过计算 `lineDash` 来实现。`animate` 函数的第一个参数是返回每一帧需要变化的参数集的函数，其参数 `ratio` 是当前正在进行的一次动画的进度，范围 [0, 1]；第二个参数是动画的参数，动画参数的具体配置参见 [animateCfg](#animateCfg)。<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerEdge(
  'line-growth',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = group.getTotalLength();
      shape.animate(
        (ratio) => {
          const startLen = ratio * length;
          // 计算 lineDash
          const cfg = {
            lineDash: [startLen, length - startLen],
          };
          return cfg;
        },
        {
          repeat: true, // 是否重复执行
          duration: 2000, // 一次动画持续时长
        },
      );
    },
  },
  'cubic',
); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic
```

### 交互动画

在交互的过程中也可以添加动画。如下图所示，当鼠标移到节点上时，所有与该节点相关联的边都展示虚线运动的动画。<br />![交互动画.gif](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-90pSrm4hkUAAAAAAAAAAABkARQnAQ)<br />上图完整 demo 即代码参见：<a href='/zh/examples/scatter/stateChange' target='_blank'>状态切换动画</a>。

这种动画涉及到了边的 [状态](/zh/docs/manual/middle/states/state)。在自定义边时复写 `setState` 方法，可对边的各种状态进行监听。鼠标移动到节点上，相关边的某个状态被开启，`setState` 方法中监听到后开启动画效果。步骤如下：

- 自定义边中复写 `setState` 方法监听该边的状态，以及某状态下的动画效果；
- 监听中间的节点的 `mouseenter` 和 `mouseleave` 事件，触发相关边的状态变化。

下面代码节选自 demo <a href='/zh/examples/scatter/stateChange' target='_blank'>状态切换动画</a>，请注意省略了部分代码，只展示了交互相关以及边动画相关的代码。`animate` 函数的第一个参数是返回每一帧需要变化的参数集的函数，其参数 `ratio` 是当前正在进行的一次动画的进度，范围 [0, 1]；第二个参数是动画的参数，动画参数的具体配置参见 [animateCfg](#animateCfg)。

```javascript
// const data = ...
// const graph = new G6.Graph({...});

const lineDash = [4, 2, 1, 2];

// 注册名为 'can-running' 的边
G6.registerEdge(
  'can-running',
  {
    // 复写setState方法
    setState(name, value, item) {
      const shape = item.get('keyShape');
      // 监听 running 状态
      if (name === 'running') {
        // running 状态为 true 时
        if (value) {
          let index = 0; // 边 path 图形的动画
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
              return res;
            },
            {
              repeat: true, // 动画重复
              duration: 3000, // 一次动画的时长为 3000
            },
          );
        } else {
          // running 状态为 false 时
          // 结束动画
          shape.stopAnimate();
          // 清空 lineDash
          shape.attr('lineDash', null);
        }
      }
    },
  },
  'cubic-horizontal',
); // 该自定义边继承了内置横向三阶贝塞尔曲线边 cubic-horizontal

// 监听节点的 mouseenter 事件
graph.on('node:mouseenter', (ev) => {
  // 获得当前鼠标操作的目标节点
  const node = ev.item;
  // 获得目标节点的所有相关边
  const edges = node.getEdges();
  // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
  edges.forEach((edge) => graph.setItemState(edge, 'running', true));
});

// 监听节点的 mouseleave 事件
graph.on('node:mouseleave', (ev) => {
  // 获得当前鼠标操作的目标节点
  const node = ev.item;
  // 获得目标节点的所有相关边
  const edges = node.getEdges();
  // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
  edges.forEach((edge) => graph.setItemState(edge, 'running', false));
});

// graph.data(data);
// graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️ 注意:</strong></span> `running` 为 `false` 时，要停止动画，同时把 `lineDash` 清空。

## animateCfg

| 配置项         | 类型     | 默认值         | 描述                                     |
| -------------- | -------- | -------------- | ---------------------------------------- |
| duration       | Number   | 500            | 一次动画的时长                           |
| easing         | boolean  | 'linearEasing' | 动画函数，见 [easing 函数](#easing-函数) |
| delay          | Number   | 0              | 延迟一段时间后执行动画                   |
| repeat         | boolean  | false          | 是否重复执行动画                         |
| callback       | Function | undefined      | 动画执行完时的回调函数                   |
| pauseCallback  | Function | undefined      | 动画暂停时（`shape.pause()`）的回调函数  |
| resumeCallback | Function | undefined      | 动画恢复时（`shape.resume()`）的回调函数 |

### easing 函数

easing 函数是指动画的函数。例如线性插值、先快后慢等。<br />G6 支持所有 d3.js 中的动画函数。因此，上面代码中 `animateCfg` 配置中的 String 类型的 `easing` 可以取值有：<br />`'easeLinear'` ，<br />`'easePolyIn'` ，`'easePolyOut'` ， `'easePolyInOut'` ，<br />`'easeQuad'` ，`'easeQuadIn'` ，`'easeQuadOut'` ， `'easeQuadInOut'` 。

更多取值及所有取值含义参见：<a href='https://github.com/d3/d3/blob/master/API.md#easings-d3-ease' target='_blank'>d3 Easings</a>。
