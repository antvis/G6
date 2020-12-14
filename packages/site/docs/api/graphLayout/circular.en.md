---
title: Circular
order: 4
---

Circular layout arranges the node on a circle. By tuning the configurations, user can adjust the node ordering method, division number, radial layout, and so on. G6 implements it according to the paper: <a href='https://www.sciencedirect.com/science/article/pii/S1570866705000031' target='_blank'>A framework and algorithms for circular drawings of graphs</a>.

 <br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-3idTK1xa6wAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_nLORItzM5QAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6J6BRIjmXKAAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'circular',
    center: [200, 200], // The center of the graph by default
    radius: null,
    startRadius: 10,
    endRadius: 100,
    clockwise: false,
    divisions: 5,
    ordering: 'degree',
    angleRatio: 1,
  },
});
```

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.radius

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The radius of the circle. If the `raidus` exists, `startRadius` and `endRadius` do not take effect.

## layoutCfg.startRadius

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The start radius of spiral layout

## layoutCfg.endRadius

**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Description**: The end radius of spiral layout

## layoutCfg.clockwise

**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Description**: Whether to layout clockwisely

## layoutCfg.divisions

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: The division number of the nodes on the circle. Takes effect when `endRadius - startRadius !== 0`

## layoutCfg.ordering

**Type**: String<br />**Default**: false<br />**Options**: null | 'topology' | 'degree'<br />**Required**: false<br />**Description**: The ordering method for nodes. `null` by default, which means the nodes are arranged in data order. 'topology' means in topology order; 'degree' means in degree order.

## layoutCfg.angleRatio

**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Description**: How many 2\*PIs Between the first node and the last node

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
