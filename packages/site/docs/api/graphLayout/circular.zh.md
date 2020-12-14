---
title: 环形 Circular
order: 4
---

Circular 布局将所有节点布局在一个圆环上，可以选择节点在圆环上的排列顺序。可以通过参数的配置扩展出环的分组布局、螺旋形布局等。原文链接： <a href='https://www.sciencedirect.com/science/article/pii/S1570866705000031' target='_blank'>A framework and algorithms for circular drawings of graphs</a>。

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
    center: [200, 200], // 可选，默认为图的中心
    radius: null, // 可选
    startRadius: 10, // 可选
    endRadius: 100, // 可选
    clockwise: false, // 可选
    divisions: 5, // 可选
    ordering: 'degree', // 可选
    angleRatio: 1, // 可选
  },
});
```

## layoutCfg.center

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：图的中心<br />**是否必须**：false<br />**说明**：布局的中心

## layoutCfg.radius

**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：圆的半径。若设置了 radius，则 startRadius 与 endRadius 不生效

## layoutCfg.startRadius

**类型**： Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：螺旋状布局的起始半径

## layoutCfg.endRadius

**类型**：Number<br />**默认值**：null<br />**是否必须**：false<br />**说明**：螺旋状布局的结束半径

## layoutCfg.clockwise

**类型**：Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否顺时针排列

## layoutCfg.divisions

**类型**：Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：节点在环上的分段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效

## layoutCfg.ordering

**类型**：String<br />**默认值**：false<br />**可选值**：null | 'topology' | 'degree'<br />**是否必须**：false<br />**说明**：节点在环上排序的依据。默认 null 代表直接使用数据中的顺序。'topology' 按照拓扑排序。'degree' 按照度数大小排序

## layoutCfg.angleRatio

**类型**： Number<br />**默认值**：1<br />**是否必须**：false<br />**说明**：从第一个节点到最后节点之间相隔多少个 2\*PI

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
