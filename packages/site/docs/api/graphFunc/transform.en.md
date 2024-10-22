---
title: View Port Operation
order: 3
---

### graph.getZoom()

Get the current zoom ratio.

**Return**

- Type of return value: Number;
- The return value indicates the current zoom ratio of view port. The default value is 1.

**Usage**

```javascript
// The return value indicates the current zoom ratio
const zoom = graph.getZoom();
```

### graph.zoom(ratio, center, animate, animateCfg)

Change the scale of the graph with a relative ratio.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| ratio | Number | true | Relative zoom ratio |
| center | Object | false | The zoom center. If it is not assigned, (0, 0) will be regarded as the zoom center |
| animate | boolean | false | Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). |

**Usage**

```javascript
// zoom to scale 3 at the center (100, 100)
graph.zoom(3, { x: 100, y: 100 });

// zoom to scale 0.5 at the origin (0, 0) of canvas drawing coordinate system, which is not the same as the lefttop of the viewport. To see the transformantion and relationships between three coordinate systems in G6, checkout out the doc: https://g6-v4.antv.vision/en/manual/advanced/coordinate-system
graph.zoom(0.5);

// zoom to scale 3 at the center (100, 100) with animation
graph.zoom(3, { x: 100, y: 100 }, true, {
  duration: 100,
});
```

### graph.zoomTo(toRatio, center)

Scale the graph to a target ratio.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| toRatio | Number | true | The target ratio |
| center | Object | false | The zoom center. If it is not assigned, (0, 0) will be regarded as the zoom center |
| animate | boolean | false | Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). |

**Usage**

```javascript
// Scale the graph 3 times at the center (100, 100)
graph.zoomTo(3, { x: 100, y: 100 });

// Scale the graph 0.5 times at the center (0, 0)
graph.zoomTo(0.5);

// Scale the graph 3 times at the center (100, 100) with animation
graph.zoomTo(3, { x: 100, y: 100 }, true, {
  duration: 100,
});
```

### graph.changeSize(width, height)

Change the size of the canvas.

**Parameters**

| Name   | Type   | Required | Description               |
| ------ | ------ | -------- | ------------------------- |
| width  | Number | true     | The width of the canvas.  |
| height | Number | true     | The height of the canvas. |

**Usage**

```javascript
graph.changeSize(600, 350);
```

### graph.translate(dx, dy, animate, animateCfg)

Move the canvas with **relative displacement**.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| dx | Number | true | Displacement in the horizontal direction. |
| dy | Number | true | Displacement in the vertical direction. |
| animate | boolean | false | Whether translate the graph with animation. |
| animateCfg | Object | false | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). If it is not assigned, animates following the graph's `animateCfg`. |

**Usage**

```javascript
graph.translate(100, 100);

// 带动画
graph.translate(100, 100, true, {
  duration: 100,
});
```

### graph.moveTo(x, y, animate, animateCfg)

Move the canvas to a **fixed position**.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| x | Number | true | Displacement in the horizontal direction. |
| y | Number | true | Displacement in the vertical direction. |
| animate | boolean | false | Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). If it is not assigned, animates following the graph's `animateCfg`. |

**Usage**

```javascript
graph.moveTo(200, 300);

// with animation
graph.moveTo(200, 300, true, {
  duration: 100,
});
```

### graph.fitView(padding, rules, animate, animateCfg)

Fit the graph to the view port.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| padding | Number / Array | false | The padding of [top, right, bottom, left]. |
| rules | { onlyOutOfViewPort?: boolean; direction?: 'x' / 'y' / 'both'; ratioRule?: 'max' / 'min} | false | rules of fitView |
| animate | boolean | false | _Supported by v4.6.15._ Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | _Supported by v4.6.15._ The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). If it is not assigned, animates following the graph's `animateCfg`. |

**Usage**

```javascript
// When padding is a number, top = right = bottom = left = 20
graph.fitView(20);

// Equal to graph.fitView(20)
graph.fitView([20]);

// When padding is an array with 2 values, top = bottom = 20, right = left = 10
graph.fitView([20, 10]);

// When padding is an array with four values
graph.fitView([20, 10, 20, 15]);

// Use fitViewByRules, default rules: onlyOutOfViewPort = false, direction = 'both', ratioRule = 'min'
graph.fitViewByRule(0, {});

// use fitViewByRules, custom rules
graph.fitView(0, { onlyOutOfViewPort: true, direction: 'y' });
```

### graph.fitCenter()

_Supported by v3.5.1._ Translate the graph to align its center with the canvas.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| animate | boolean | false | _Supported by v4.6.15._ Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | _Supported by v4.6.15._ The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). If it is not assigned, animates following the graph's `animateCfg`. |

**Usage**

```javascript
// Call the following function after rendering and animation
graph.fitCenter();
```

### graph.focusItem(item, animate, animateCfg)

Move the graph to center at the item. This operation can be used as easing animation after searching a node.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| animate | boolean | false | Whether move the graph with animation. If it is not assigned, animates following the graph's `animate`. |
| animateCfg | Object | false | The animation's configuraiton. Its configurations can be found in [Basic Animation Docs](/en/docs/manual/middle/animation). If it is not assigned, animates following the graph's `animateCfg`. |

**Usage**

```javascript
graph.focusItem(item);

// focus with animation
graph.focusItem(item, true);

// focus with animation and animation's configuration
graph.focusItem(item, true, {
  easing: 'easeCubic',
  duration: 400,
});
```
