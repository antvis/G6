---
title: G6 坐标系深度解析
order: 0
---

在 G6 中，实例化图时指定 `container` 字段指定了画布 `<Canvas></Canvas>` 标签的父容器。而 DOM 的坐标与真正绘制图形时的坐标并不是同一套坐标系，这可能会使得如下场景中用户指定坐标时产生困惑：

- 在画布上放置一个 `position: absolute` 的 DOM 元素，如 tooltip、 menu 等时：
  - 在鼠标点击画布上的位置放置；
  - 鼠标点击节点时，在节点位置。上面问题在 graph 缩放、平移后更加凸显。下面，我们将深度解析这些坐标之间的关系。

## 三个坐标系

首先，我们要知道 G6 中有三个坐标系：clientX/clientY、canvasX/canvasY、pointX/pointY。

### clientX/clientY

相对于浏览器的坐标系，原点位于浏览器内容范围的左上角（坐标系位置不随滚动条变化）。如下两图中的 y 轴上页面滚动（y-scroll）位置不同，但 clientX/clientY 坐标系的原点都在左上角。因而 Container DOM 的左上角的 clientX/clientY 不同，左图 Container DOM 的左上角坐标为（100， 1000），右图 Container DOM 的左上角坐标为（100， 200）。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WBCHS6uJSIMAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yeEVR6ihc74AAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

### canvasX/canvasY

Container DOM 的自身坐标系。假设示例化图时设定 `width` 与 `height` 分别是 550 与 500:

```
const Graph = new G6.Graph({
  container: 'container',
  width: 550,
  height: 500
})
```

则下图 Container DOM 的宽高即为 550\*500。canvasX/canvsY 的原点在 Container DOM 的左上角，Container DOM 右下角的 canvasX/canvasY 坐标为（550，500）。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1wNDQI9sgRoAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

### pointX/pointY

以上两种坐标系均可理解为 DOM 相关的坐标，其取值均为整数。而在真正绘制图形时，图形是根据 pointX/pointY 定位的，即节点的 (x, y) 等都是与 pointX/pointY 坐标系相对应的。图的缩放、平移其实是整个 pointX/pointY 坐标系的缩放和平移。

## 三个坐标系的关系

上面描述比较抽象。下面我们通过具体例子，进一步了解三种坐标系的关系。

下面所有图中，灰色的坐标系表示 clientX/clientY，蓝色坐标系表示 canvasX/canvasY，红色坐标系表示 pointX/pointY。灰、蓝、红色的虚线以及数字均是相应坐标系的标注。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8ZjgQL9GE1gAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

### 图无变换

下图展示了当图没有缩放和平移，也就是说其变换矩阵 matrix 为单位矩阵时，三个坐标系的关系。可以看到 canvasX/canvasY 与 pointX/pointY 两个坐标系是完全重合的，坐标轴尺度、原点位置完全一致。如下图中树图根节点（黑点标注的）位置，其 canvasX/canvasY 和 pointX/pointY 坐标值是一样的。而 clientX/clientY 的原点在浏览器内容左上角，黑点的 clientX/clientY 则需要加上 Container DOM 的左边距和上边距。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Dzz_R5yJEooAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

> 图 1：图无变换时的三种坐标系。

### 图缩放

当图被缩放：以 pointX/pointY 坐标系的原点为缩放中心，放大为原来的两倍，即图的变换矩阵 matrix 为：

```
matrix =
  2 0 0
  0 2 0
  0 0 1
```

很容易想到，大部分图可能会超出 Container DOM。

事实上，在缩放时，是在缩放 pointX/pointY 的整个坐标系。由于这个例子中缩放中心是 pointX/pointY 坐标系的原点，缩放两倍即是 pointX/pointY 的 x 轴、y 轴的尺度变为原来的两倍。打个比方，我们把 pointX/pointY 的 x 轴、y 轴看作两根绳子，绳子上每隔 1cm 有标记 1、2、3、……这些标记就是 pointX/pointY 的坐标值，我们分别拽住绳子的一端，把它们分别沿正方向拉长一倍，那么相邻标记之间的距离变成了 2cm 。

canvasX/canvasY 和 clientX/clientY 坐标系不随图的变换而变化。换句话说，在这种情况下，canvasX/canvasY 的 (90, 0) 对应的 pointX/pointY 坐标为 (45, 0) ，canvasX/canvasY 的 (0, 250) 对应的 pointX/pointY 坐标为 (0, 125) 。而 clientX/clientY 仍然是 canvasX/canvasY 加上 Container DOM 的左/上边距。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dbZBQKvdhYAAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

> 图 2：图缩放变换时的三种坐标系。

可以看到上图中，图 1 中的树图根节点位置（黑点 A）的 canvasX/canvasY 和 clientX/clientY 坐标不变，仍然分别是 (90, 250) 和 (290, 350)。但由于 pointX/pointY 的坐标轴尺度发生了变化，所以它的 pointX/pointY 变为了 (45, 125)。而现在的根节点（黑点 B 标记）的绘制坐标不变，pointX/pointY 仍然是 (90, 250)，但黑点 B 对应的 canvasX/canvasY 和 clientX/clientY 分别变为了 (180, 500)，(380, 600)。

### 图缩放 + 平移

当图在上一节的基础上再进行平移：把图的左上角移动到 (50, 50) 的位置，即图的变换矩阵 matrix 为：

```
matrix =
  2  0  0
  0  2  0
  50 50 1
```

很容易想到，大部分图可能会超出 Container DOM 且左上角为出现留白。

和上一节缩放相似，平移图其实是在平移 pointX/pointY 的整个坐标系。打个比方，我们把 pointX/pointY 的 x 轴、y 轴看作两根绳子，两根绳子一起向右平移 50，向下平移 50。

canvasX/canvasY 和 clientX/clientY 坐标系不随图的变换而变化。换句话说，在这种情况下，canvasX/canvasY 的 (90, 0) 对应的 pointX/pointY 坐标为 ((90-50)/2=20, 0) ，canvasX/canvasY 的 (0, 250) 对应的 pointX/pointY 坐标为 (0, (250-50)/2=100) 。而 clientX/clientY 仍然是 canvasX/canvasY 加上 Container DOM 的左/上边距。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s35JSa1VxTsAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

> 图 3：图缩放+平移变换时的三种坐标系。

可以看到上图中，图 1 中的树图根节点位置（黑点 A）的 canvasX/canvasY 和 clientX/clientY 坐标不变，仍然分别是 (90, 250) 和 (290, 350)。但由于 pointX/pointY 的坐标轴尺度、原点发生了变化，所以它的 pointX/pointY 变为了 (20, 100)。而现在的根节点（黑点 B 标记）的绘制坐标不变，pointX/pointY 仍然是 (90, 250)，但黑点 B 对应的 canvasX/canvasY 和 clientX/clientY 分别变为了 (230, 550)，(430, 650)。

## 使用 API 进行转换

了解了三种坐标系的含义后，我们有时需要通过相互转换使用。首先，在 G6 的事件中，event 会包含当前鼠标操作位置的三种坐标值，它们的变量名与上述三种坐标系对应关系如下：

- event.x, event.y => pointX/pointY；
- event.canvasX, event.canvasY => canvasX/canvasY；
- event.clientX, event.clientY => clientX/clientY。

可以发现后两者的名字是直接对应的，我们只需要注意 event 中的 x 和 y 对应的是 pointX/pointY 坐标系即可。

### getCanvasByPoint

将 pointX/pointY 坐标系的坐标值转换为 canvasX/canvasY 的坐标值。

### getPointByCanvas

将 canvasX/canvasY 坐标系的坐标值转换为 pointX/pointY 的坐标值。

### getClientByPoint

将 pointX/pointY 坐标系的坐标值转换为 clientX/clientY 的坐标值。

### getPointByClient

将 clientX/clientY 坐标系的坐标值转换为 pointX/pointY 的坐标值。

可以发现 G6 的上述四个 API 都是围绕 point，通过上面四个 API 可以进行组合从而使得 clientX/clientY 与 canvasX/canvasY 进行转换：

- clientX/clientY 转 canvasX/canvasY：

```
const point = graph.getPointByClient(clientX, clientY)
const canvasXY = graph.getCanvasByPoint(point.x, point.y);
```

- canvasX/canvasY 转 clientX/clientY：

```
const point = graph.getPointByCanvas(canvasX, canvasY)
const clientXY = graph.getClientByPoint(point.x, point.y);
```

## 使用三种坐标系

本文开始时，我们提到了如下场景需要我们使用三种坐标系：

在画布上放置一个 `position: absolute` 的悬浮 DOM 元素，如 tooltip、 menu 等时：

- 在鼠标点击画布上的位置放置；
- 鼠标点击节点时，在节点位置。

如果使用了错误的坐标系来给定悬浮 DOM 元素的位置，将会出现偏移，在图有缩放、平移等变化时，偏移更加严重。在了解如何使用坐标系给悬浮 DOM 定位前，我们先定义一个悬浮 DOM 元素：

```
  const floatDOM = createDom(`
  <div id="test-dom" style="position: absolute; background: #f00; height: 100px; width: 200px">
    floating dom
  </div>
  `);
```

不论上述哪一种情况，我们都推荐两种挂载这个悬浮 DOM 的方式：

- 方法一：挂载在 body 上：

```
document.body.appendChild(floatDOM);
```

- 方法二：挂载在 Container DOM 上，即与 canvas 标签同一父容器：

```
const container = document.getElementById('container') // 假设 Container DOM 的 id 为 container
container.appendChild(floatDOM);
```

### 悬浮 DOM 挂载在 body 上

众所周知，`position: absolute` 的 DOM 元素相对于父容器定位。若我们把悬浮 DOM 挂载在 body 上，它的父容器是 body，我们可以使用 `clientX/clientY` 来指定它的 `left/top`：

- 在点击画布的位置上放置 DOM：

```
graph.on('canvas:click', event => {
    floatDOM.style.left = event.clientX;
  floatDOM.style.top = event.clientY;
});
```

- 在某个节点的位置上放置 DOM：

```
const node = graph.getNodes()[0];
const { x, y } = node.getModel(); // 获得该节点的位置，对应 pointX/pointY 坐标
const clientXY = graph.getClientByPoint(x, y);
floatDOM.style.left = clientXY.x;
floatDOM.style.top = clientXY.y;
```

### 悬浮 DOM 挂载在 Container DOM 上

若我们把悬浮 DOM 挂载在 Container DOM 上，它的父容器是 Container DOM，我们可以使用 `canvasX/canvasY` 来指定它的 `marginLeft/marginTop`：

- 在点击画布的位置上放置 DOM：

```
graph.on('canvas:click', event => {
    floatDOM.style.marginLeft = event.canvasX;
  floatDOM.style.marginTop = event.canvasY;
});
```

- 在某个节点的位置上放置 DOM：

```
const node = graph.getNodes()[0];
const { x, y } = node.getModel(); // 获得该节点的位置，对应 pointX/pointY 坐标
const canvasXY = graph.getCanvasByPoint(x, y);
floatDOM.style.marginLeft = canvasXY.x;
floatDOM.style.marginTop = canvasXY.y;
```
