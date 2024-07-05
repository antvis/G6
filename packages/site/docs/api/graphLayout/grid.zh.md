---
title: 格子 Grid
order: 10
---

Grid 布局是将所有节点通过某种指定属性排序后，整齐地放置在网格上。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Oh6mRLVEBBIAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'grid',
    begin: [ 0, 0 ],          // 可选，
    preventOverlap: true,     // 可选，必须配合 nodeSize
    preventOverlapPadding: 20, // 可选
    nodeSize: 30,             // 可选
    condense: false,          // 可选
    rows: 5,                  // 可选
    cols: 5,                  // 可选
    sortBy: 'degree'          // 可选
    workerEnabled: true       // 可选，开启 web-worker
  }
});
```

## layoutCfg.begin

**类型**： Array<br />**示例**：[ 0, 0 ]<br />**默认值**：[ 0, 0 ]<br />**是否必须**：false<br />**说明**：网格开始位置（左上角）

## layoutCfg.preventOverlap

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测

## layoutCfg.nodeSize

**类型**： Number<br />**默认值**：30<br />**是否必须**：false<br />**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## layoutCfg.preventOverlapPadding

**类型**：Number<br />**默认值**：10<br />**是否必须**：false<br />**说明**：避免重叠时节点的间距 `padding`。`preventOverlap` 为 `true` 时生效

## layoutCfg.condense

**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：为 `false` 时表示利用所有可用画布空间，为 `true` 时表示利用最小的画布空间

## layoutCfg.rows

**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：网格的行数，为 undefined 时算法根据节点数量、布局空间、`cols`（若指定）自动计算

## layoutCfg.cols

**类型**： Number<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：网格的列数，为 undefined 时算法根据节点数量、布局空间、`rows`（若指定）自动计算

## layoutCfg.sortBy

**类型**： String<br />**默认值**：undefined<br />**是否必须**：false<br />**说明**：指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互。
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> `workerEnabled: true` 时，不支持所有函数类型的参数。
