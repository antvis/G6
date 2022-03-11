---
title: Combo 复合布局 ComboCombined
order: 13
---

*V4.6 新增功能。*ComboCombined 支持自由配置 combo 内部元素的布局以及最外层 combo 和节点之间的布局，默认情况下将使用 Concentric 同心圆布局作为内部布局，gForce 力导向布局作为外部布局。能够达到较好的效果以及稳定性。当您指定内部布局时，请使用同步的布局算法，可从以下布局中选择：Circular，Concentric，Grid，Dagre，MDS，Radial，或任何同步的自定义布局。也可以自定义布局作为内部/外部布局。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZlvWS7xOkjMAAAAAAAAAAAAAARQnAQ' width=650 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  groupByTypes: false, // 若希望在带有 combo 的图上，节点、边、combo 的层级符合常规逻辑，需要将 groupByTypes 设置为 false
  layout: {
    type: 'comboCombined',
    center: [ 200, 200 ],     // 可选，默认为图的中心
    onLayoutEnd: () => {      // 可选
      console.log('combo force layout done');
    }
  }
);
```

### layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

### layoutCfg.nodeSize

**类型**： Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于碰撞检测。若不指定，则根据传入的节点的 size 属性计算。若即不指定，节点中也没有 `size`，则默认大小为 `10`

### layoutCfg.spacing

**类型**: Number / Function<br />**默认值**: 0<br />**是否必须**: false <br />**示例**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a node
  if (d.id === 'node1') {
    return 100;
  }
  return 10;
};
```

<br />**描述**: `preventNodeOverlap` 或 `preventOverlap` 为 `true` 时生效, 防止重叠时节点/ combo 边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例 2 所示

### layoutCfg.comboPadding

**类型**: Number / Function<br />**默认值**: 10<br />**是否必须**: false <br />**示例**: Example 1: 10 <br />Example 2:

```javascript
(d) => {
  // d is a combo
  if (d.id === 'combo1') {
    return 100;
  }
  return 10;
};
```

<br />**描述**: Combo 内部的 padding 值，不用于渲染，仅用于计算力。推荐设置为与视图上 combo 内部 padding 值相同的值

### layoutCfg.outerLayout

```javascript
outerLayout: new G6.Layout['gForce']({
  ... // 该布局的参数
});
```

**类型**：Object<br />**默认值**：GForce 实例<br />**是否必须**：false<br />**说明**：最外层的布局算法，需要使用同步的布局算法，默认为 gForce。具体参数详见被使用布局的文档。
默认情况下 gForce 布局将使用以下参数：

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
  ... // 该布局的参数
});
```

**类型**：Object<br />**默认值**：Concentric 实例<br />**是否必须**：false<br />**说明**：ombo 内部的布局算法，默认为 concentric。具体参数详见被使用布局的文档。
默认情况下 concentric 布局将使用以下参数：

```javascript
outerLayout: new G6.Layout['concentric']({
  sortBy: 'id'
});
```

### layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
