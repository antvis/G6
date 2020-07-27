---
title: Coordinate Systems in G6
order: 0
---

In G6, the container of the `<Canvas></Canvas>` is assigned by `container` when instantiating a Graph. But the coordinate system of DOM and the drawing coordinate system are not the same, which leads to some confusion in the cases:

- Placing a DOM element (tooltip, menu, and so on) with `position: absolute` upon the canvas on the position where
  - the mouse clicked;
  - the clicked node.

The problem is more obvious after the graph has been panned and zoomed. Now, we are going to learn the coordinate systems in G6 to help you solve the issue.

## Three Coordinate Systems

First of all, we know that there are three kinds of coordinate system in G6, we call them: clientX/clientY, canvasX/canvasY, and pointX/pointY.

### clientX/clientY

It is related to the broswer, whose origin is at the left top of the broswer's content and it is not scrolled with the page. As shown below, the two pictures show the cases with different positions of y-scroll, but the origin of clientX/clientY is fixed. But the clientX/clientY coordinates of the left-top of the Container Dom in the two cases are different. Left one has (100, 1000), but right one has (100, 200).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WBCHS6uJSIMAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yeEVR6ihc74AAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

### canvasX/canvasY

It is the self coordinate system of the Container DOM. We suppose that the `width` and `height` of the graph were assigned to be 550 and 500:

```
const Graph = new G6.Graph({
  container: 'container',
  width: 550,
  height: 500
})
```

The size of the Container DOM is 550\*500. The origin of the canvasX/canvasY system is at the left-top of the Container DOM, and the right-bottom point of the Container DOM is (550, 500).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1wNDQI9sgRoAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

### pointX/pointY

The previous two coordinate systems are the DOM related systems, and the coordinate values are integer. Different from them, pointX/pointY is the real drawing coordinate systems for shapes on the canvas. For nodes, each node has (x, y) in pointX/pointY system as position information. Notice that when end users pan or zoom a graph, they are actually manipulating the pointX/pointY coordinate system.

## The Relationships between the Three System

To be more specific, we show an example in this section.

The three systems in the figures of this section are colored with grey, blue, and red, corresponds to clientX/clientY, canvasX/canvasY, and pointX/pointY respectively. And the labels and numbers for each system have the corresponding colors.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8ZjgQL9GE1gAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

### Graph without Transformation

The figure below shows the case without transfromation, that is, the tranfromational matrix is a unit matrix. We can see from the figure that the canvasX/canvasY and pointX/pointY are overlapped, including the scale of the axes and the origin. The canvasX/canvasY and pointX/pointY coordinates of the root node's position, tagged by black point, of the graph are the same. And the origin of the clientX/clientY is at the left-top of the broswer's content, and the black point's clientX/clientY coordinate is equal to the canvasX/canvasY or pointX/pointY plus the left and top distance to the browser's border.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Dzz_R5yJEooAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

> Figure 1: three coordinate systems when the graph has no transformation.

### Zoomed Graph

In fact, zooming the graph is zooming the pointX/pointY system (centered at the its origin by default). Now we zoom the graph with scale `2`, which means the transformational matrix of the graph is:

```
matrix =
  2 0 0
  0 2 0
  0 0 1
```

It is easy to be imagine that part of the graph will be out of the Container DOM.

The graph is zoomed with scale `2` means the pointX/pointY system is zoomed with scale `2`, the scale of the axes are zoomed two times to origin state. You can think of the coordinate axes as two retractable ropes. The ropes have a mark with '1' or '2' or '3' ... every one centimeter in the relaxed state. These marks are the coordinate values of the pointX/pointY system. To zoom the graph, we pull the ends of the ropes separately and double them in the positive direction, then the distance between adjacent marks becomes two centimeters.

In the same time, canvasX/canvasY and clientX/clientY coordinate systems stay unchanged. In the other word, (90, 0) in canvasX/canvasY is (45, 0) in the pointX/pointY, (0, 250) in canvasX/canvasY is (0, 125) in pointX/pointY. But the corresponding values in clientX/clientY is the values in canvasX/canvasY plus the left and top distances from the Container DOM to the borders of the browser.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dbZBQKvdhYAAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

> Figure 2: Three coordinate systems when the graph is zoomed.

In figure 2, the canvasX/canvasY and clientX/clientY coordinate value of the black point in figure 1 stays unchanged with (90, 250) and (290, 350) respectively. Due to the changes of the scales of the pointX/pointY system, the value is changed to (45, 125). And the root node (marked with black point B) in figure 2 has same pointX/pointY value as figure 1, and its values in canvasX/canvasY and clientX/clientY are changed to (180, 500) and (380, 600) respectively.

### Zoomed and Translated Graph

Based on the zoomed graph of previous section, we now translate with vector (50, 50), which means the transfromational matrix becomes:

```
matrix =
  2  0  0
  0  2  0
  50 50 1
```

It is easy to be imagine that the left top part of the COntainer DOM will be empty.

Similar the previous version, translating the graph is actrually translating the whole pointX/pointY system, that is moving the axes ropes along positive direction of x by 50 and positive direction of y by 50 respectively.

In the sametime, canvasX/canvasY and clientX/clientY system stay unchanged. E.g., (90, 0) of canvasX/canvasY corresponds to ((90-50)/2=20, 0) in pointX/pointY system; (0, 250) of canvasX/canvasY corresponds to (0, (250-50)/2=100) in pointX/pointY system. But the corresponding values in clientX/clientY is still the values in canvasX/canvasY plus the left and top distances from the Container DOM to the borders of the browser.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s35JSa1VxTsAAAAAAAAAAABkARQnAQ' alt='img' width='500'/>

> Figure 3: Three coordinate systems of zoomed and translated graph.

In figure 3, the canvasX/cnavasY and clientX/clientY coordinate value of the black point in figure 1 stays unchanged with (90, 250) and (290, 350) respectively. Due to the changes of the origin of the pointX.pointY system, the value is changed to (20, 100). And the root node (marked with black point B) in figure 3 has same pointX/pointY value as figure 1 and figure 2, and its canvasX/canvasY and clientX/clientY are chagned to (230, 550) and (430, 650) respectively.

## Translate the Coordinates with API

Sometimes we need to translate the coordinates for different usages. In G6, the paremeter `event` of different events contains three coordinate values for the three coordinate system, the correspondence of the variable names in `event` and the systems is:

- event.x, event.y => pointX/pointY;
- event.canvasX, event.canvasY => canvasX/canvasY;
- event.clientX, event.clientY => clientX/clientY.

Notice that the `x` and `y` are the velus of pointX/pointY system.

### getCanvasByPoint

Translate coordinate values of pointX/pointY system to canvasX/canvasY system.

### getPointByCanvas

Translate coordinate values of canvasX/canvasY system to pointX/pointY system.

### getClientByPoint

Translate coordinate values of pointX/pointY system to clientX/clientY system.

### getPointByClient

Translate coordinate values of clientX/clientY system to pointX/pointY system.

Easy to find out that these four APIs are all about pointX/pointY, and users are able to translate between clientX/clientY and canvasX/canvasY by combining the four APIs:

- clientX/clientY to canvasX/canvasY:

```
const point = graph.getPointByClient(clientX, clientY)
const canvasXY = graph.getCanvasByPoint(point.x, point.y);
```

- canvasX/canvasY to clientX/clientY:

```
const point = graph.getPointByCanvas(canvasX, canvasY)
const clientXY = graph.getClientByPoint(point.x, point.y);
```

## Using The Three Coordinate Systems

At the beginning of this document, we metioned the following case:

Place a DOM with `position: absolute` , e.g. tooltip, menu, and so on, at the position where

- the point currently clicked by the mouse;
- the currently clicked node's position.

Wrong offset will occur if user takes coordinate values of wrong coordinate systems. The problem will become worse if the graph is zoomed or translated.

Now, we are going to define a DOM for such case:

```
  const floatDOM = createDom(`
  <div id="test-dom" style="position: absolute; background: #f00; height: 100px; width: 200px">
    floating dom
  </div>
  `);
```

No matter which case, we recommend two ways to mount the DOM:

- Way 1: Mount the DOM on body:

```
document.body.appendChild(floatDOM);
```

- Way 3: Mount the DOM on Container DOM , which means the DOM has the same parent of the canvas:

```
const container = document.getElementById('container') // Suppose that the id of the COntainer DOM is 'container'
container.appendChild(floatDOM);
```

### Mount DOM on body

We know that a DOM with `position: absolute` is positioned related to the parent DOM. Mounting the DOM on body means the parent DOM of the DOM is body. So we can use `clientX/clientY` to assign its `left/top`:

- Place the DOM on the position where the mouse currently clicked:

```
graph.on('canvas:click', event => {
    floatDOM.style.left = event.clientX;
  floatDOM.style.top = event.clientY;
});
```

- Place the DOM on the position where the currently clicked node on:

```
const node = graph.getNodes()[0];
const { x, y } = node.getModel(); // 获得该节点的位置，对应 pointX/pointY 坐标
const clientXY = graph.getClientByPoint(x, y);
floatDOM.style.left = clientXY.x;
floatDOM.style.top = clientXY.y;
```

### Mount DOM on Container DOM

If we mount the DOM on the Container DOM, the parent of the DOM is the Container DOM, we can use `canvasX/canvasY` to assign its `marginLeft/marginTop`:

- Place the DOM on the position where the mouse currently clicked:

```
graph.on('canvas:click', event => {
    floatDOM.style.marginLeft = event.canvasX;
  floatDOM.style.marginTop = event.canvasY;
});
```

- Place the DOM on the position where the currently clicked node on:

```
const node = graph.getNodes()[0];
const { x, y } = node.getModel(); // 获得该节点的位置，对应 pointX/pointY 坐标
const canvasXY = graph.getCanvasByPoint(x, y);
floatDOM.style.marginLeft = canvasXY.x;
floatDOM.style.marginTop = canvasXY.y;
```
