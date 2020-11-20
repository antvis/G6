---
title: MDS
order: 9
---

MDS (Multidimensional scaling) is used for project high dimensional data onto low dimensional space.<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aUS7TJR2NHcAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'mds',
    workerEnabled: true, // Whether to activate web-worker
  },
});
```

## layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

## layoutCfg.linkDistance

**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Description**: The edge length

## layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction
