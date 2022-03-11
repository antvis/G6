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

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.

## layoutCfg.kr

**Type**: Number<br />**Default**: 5<br />**Required**: false<br />**Description**: Repulsive parameter, smaller the kr, more compact the graph

## layoutCfg.kg

**Type**: Number<br />**Default**: 5<br />**Required**: false<br />**Description**: The parameter for the gravity. Larger kg, the graph will be more compact to the center

## layoutCfg.ks

**Type**: Number<br />**Default**: 0.1<br />**Required**: false<br />**Description**: The moving speed of the nodes during iterations

## layoutCfg.tao

**Type**: Number<br />**Default**: 0.1<br />**Required**: false<br />**Description**: The threshold of the swinging

## layoutCfg.mode

**Type**: 'normal' | 'linlog'<br />**Default**: 'normal'<br />**Required**: false<br />**Description**: Under 'linlog' mode, the cluster will be more compact
## layoutCfg.preventOverlap

**Type**: boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether prevent node overlappings

## layoutCfg.dissuadeHubs

**Type**: boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Wheather to enable hub mode. If it is true, the nodes with larger in-degree will be placed on the center in higher priority

## layoutCfg.barnesHut

**Type**: boolean<br />**Default**: undefined<br />**Required**: false<br />**Description**: Whether to enable the barnes hut speedup, which is the quad-tree optimization. Due to the computation for quad-tree re-build in each iteration, we sugguest to enable it in large graph. It is undefined by deafult, when the number of nodes is larger than 250, it will be activated automatically. If it is set to be false, it will not be activated anyway

## layoutCfg.prune

**Type**: boolean<br />**Default**: undefined<br />**Required**: false<br />**Description**: Whether to enable auto pruning. It is undefined by default, which means when the number of nodes is larger than 100, it will be activated automatically. If it is set to be false, it will not be activated anyway

## layoutCfg.maxIteration

**Type**: number<br />**Default**: 0<br />**Required**: false<br />**Description**: The max iteration number. When it is set to be 0, the iteration number will be automatically adjusted according to the convergence

## layoutCfg.getWidth

**Type**: function<br />**Default**: undefined<br />**Required**: false<br />**Description**: The width function of the nodes, the parameter is the data model of a node

## layoutCfg.getHeight

**Type**: function<br />**Default**: undefined<br />**Required**: false<br />**Description**: The height function of the nodes, the parameter is the data model of a node

## layoutCfg.onLayoutEnd

**Type**: function<br />**Default**: undefined<br />**Required**: false<br />**Description**: The callback function of layout

## layoutCfg.onTick

**Type**: function<br />**Default**: undefined<br />**Required**: false<br />**Description**: The callback function for each iteration