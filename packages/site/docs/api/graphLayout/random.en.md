---
title: Random
order: 1
---

Random is the default layout in G6. It will take effect when `layout` is not assigned to the Graph instance and there is no position information in node data.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G5_uRodUTaYAAAAAAAAAAABkARQnAQ' width=430 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'random',
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

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.
