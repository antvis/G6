---
title: ComboCombined
order: 13
---

_It is a new feature of V4.6._ ComboCombined supports configuring layout method for items inside a combo and layout method for the outer combo and nodes. By default, the inner layout is Concentric layout, and the outer layout is Gforce. When you assigning inner layout by yourself, please use the sync layout methods, such as Circular, Concentric, Grid, Dagre, MDS, Radial, or any custom sync layout. You can also assign custom layout method for the outer layout.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZlvWS7xOkjMAAAAAAAAAAAAAARQnAQ' width=650 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  groupByTypes: false, // If you want to have a combo graph with reasonable visual levels of nodes, edges, and combo, set groupByTypes to false
  layout: {
    type: 'comboCombined',
    center: [ 200, 200 ],     // The center of the graph by default
    onLayoutEnd: () => {
      console.log('combo force layout done');
    }
  }
);
```

### layoutCfg.center

**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Description**: The center of the layout

### layoutCfg.nodeSize

**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Description**: The diameter of the node. It is used for preventing node overlappings. If `nodeSize` is not assigned, the size property in node data will take effect. If the size in node data does not exist either, `nodeSize` is assigned to 10 by default

### layoutCfg.spacing

**Type**: Number / Function <br />**Default**: 0 <br />**Required**: false <br />**Example**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<br />**Description**: Takes effect when `preventNodeOverlap` or `preventOverlap` is `true`. It is the minimum distance between nodes/combos to prevent node/combo overlappings. It can be a function to define different distances for different nodes (example 2)

<br />

### layoutCfg.comboPadding

**Type**: Number / Function <br />**Default**: 10 <br />**Required**: false <br />**Example**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a combo
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

### layoutCfg.outerLayout

```javascript
outerLayout: new G6.Layout['gForce']({
  ... // the parameters for the gForce layout
});
```

**Type**: Object<br />**Default**: GForce Instance<br />**Required**: false<br />**Description**: The outer layout instance. Refer to the corresponding layout docs. The default configuration of the `outerLayout` is: 

```javascript
outerLayout: new G6.Layout['gForce']({
  gravity: 1,
  factor: 2,
  linkDistance: (edge: any, source: any, target: any) => {
    const nodeSize = ((source.size?.[0] || 30) + (target.size?.[0] || 30)) / 2;
    return Math.min(nodeSize * 1.5, 700);
  }
});
```

### layoutCfg.innerLayout

```javascript
innerLayout: new G6.Layout['grid']({
  ... // the parameters for the grid layout
});
```

**Type**:Object<br />**Default**:Concentric Instance<br />**Required**:false<br />**Description**: The layout method for the items inside a combo, should be a sync layout method. Refer to the corresponding layout docs. The default configuration of the `outerLayout` is: 

```javascript
outerLayout: new G6.Layout['concentric']({
  sortBy: 'id'
});
```

<br />**Description**: The padding value inside each combo. It is not about rendering, only used for force calculation


### layoutCfg.workerEnabled

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Whether to enable the web-worker in case layout calculation takes too long to block page interaction.
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Notice:</strong></span> When `workerEnabled: true`, all the function type parameters are not supported.
