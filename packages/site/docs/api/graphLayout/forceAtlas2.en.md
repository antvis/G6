---
title: Force Atlas 2
order: 11
---

_It is a new feature of V3.2.2._ FA2 is a kind of force directed layout, which performs better on the convergence and compactness.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqwAQZLIVPwAAAAAAAAAAAAAARQnAQ' width=430 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'forceAtlas2',
    width: 300,
    height: 300,
  },
});
```

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.width

**Type**: Number<br />**Default**: The width of the graph<br />**Required**: false<br />**Description**: The width of the layout

## layoutCfg.height

**Type**: Number<br />**Default**: The height of the graph<br />**Required**: false<br />**Description**: The height of the layout

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
