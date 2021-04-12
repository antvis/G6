---
title: Force Atlas 2
order: 11
---

*V4.2.2 新增功能。*Force Atlas 2 是一种力导向布局的变形，比 force 收敛地更好，更紧凑。

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

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.width

**类型**： Number<br />**默认值**：图的宽度<br />**是否必须**：false<br />**说明**：布局的宽度范围

## layoutCfg.height

**类型**： Number<br />**默认值**：图的高度<br />**是否必须**：false<br />**说明**：布局的高度范围

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互

## layoutCfg.kr

**类型**： Number<br />**默认值**：5<br />**是否必须**：false<br />**说明**：斥力系数，可用于调整布局的紧凑程度。kr 越大，布局越松散

## layoutCfg.kg

**类型**： Number<br />**默认值**：5<br />**是否必须**：false<br />**说明**：重力系数。kg 越大，布局越聚集在中心

## layoutCfg.ks

**类型**： Number<br />**默认值**：0.1<br />**是否必须**：false<br />**说明**：控制迭代过程中，节点移动的速度

## layoutCfg.tao

**类型**： Number<br />**默认值**：0.1<br />**是否必须**：false<br />**说明**：迭代接近收敛时停止震荡的容忍度

## layoutCfg.mode

**类型**： 'normal' | 'linlog'<br />**默认值**：'normal'<br />**是否必须**：false<br />**说明**：'linlog' 模式下，聚类将更加紧凑

## layoutCfg.preventOverlap

**类型**： boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止节点重叠

## layoutCfg.dissuadeHubs

**类型**： boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否打开 hub 模式。若为 true，相比与出度大的节点，入度大的节点将会有更高的优先级被放置在中心位置

## layoutCfg.barnesHut

**类型**： boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否打开 barnes hut 加速，即四叉树加速。由于每次迭代需要更新构建四叉树，建议在较大规模图上打开

## layoutCfg.prune

**类型**： boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否开启自动剪枝模式。默认情况下，当节点数量大于 100 时它将会被激活。注意，剪枝能够提高收敛速度，但可能会降低图的布局质量

## layoutCfg.maxIteration

**类型**： number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：最大迭代次数，若为 0 则将自动调整

## layoutCfg.getWidth

**类型**： function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：节点宽度的函数，参数为节点数据

## layoutCfg.getHeight

**类型**： function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：节点高度的函数，参数为节点数据

## layoutCfg.onLayoutEnd

**类型**： function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：布局结束后的回调函数

## layoutCfg.onTick

**类型**： function<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：布局每次迭代的回调函数