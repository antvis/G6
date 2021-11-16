---
title: 层次 Dagre
order: 7
---

Dagre 是一种层次布局。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2uMmRo5wYPUAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'dagre',
    rankdir: 'LR', // 可选，默认为图的中心
    align: 'DL', // 可选
    nodesep: 20, // 可选
    ranksep: 50, // 可选
    controlPoints: true, // 可选
  },
});
```

## layoutCfg.rankdir

**类型**： String<br />**可选值**：'TB' | 'BT' | 'LR' | 'RL'<br />**默认值**：'TB'<br />**是否必须**：false<br />**说明**：布局的方向。T：top（上）；B：bottom（下）；L：left（左）；R：right（右）。

- 'TB'：从上至下布局；
- 'BT'：从下至上布局；
- 'LR'：从左至右布局；
- 'RL'：从右至左布局。

## layoutCfg.align

**类型**： String<br />**可选值**：'UL' | 'UR' | 'DL' | 'DR' | undefined<br />**默认值**：'UL'<br />**是否必须**：false<br />**说明**：节点对齐方式。U：upper（上）；D：down（下）；L：left（左）；R：right（右）

- 'UL'：对齐到左上角；
- 'UR'：对齐到右上角；
- 'DL'：对齐到左下角；
- 'DR'：对齐到右下角；
- undefined：默认，中间对齐。

## layoutCfg.nodesep

**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：节点间距（px）。在`rankdir` 为 `'TB'` 或 `'BT'` 时是节点的水平间距；在`rankdir` 为 `'LR'` 或 `'RL'` 时代表节点的竖直方向间距

## layoutCfg.ranksep

**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：层间距（px）。在`rankdir` 为 `'TB'` 或 `'BT'` 时是竖直方向相邻层间距；在`rankdir` 为 `'LR'` 或 `'RL'` 时代表水平方向相邻层间距

## layoutCfg.nodesepFunc

**类型**： Function<br />**默认值**：undefined<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**是否必须**：false<br />**说明**：节点间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距。在`rankdir` 为 'TB' 或 'BT' 时是节点的水平间距；在`rankdir` 为 'LR' 或 'RL' 时代表节点的竖直方向间距。优先级高于 `nodesep`，即若设置了 `nodesepFunc`，则 `nodesep` 不生效

## layoutCfg.ranksepFunc

**类型**： Function<br />**默认值**：undefined<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 100;
  return 10;
};
```

<br />**是否必须**：false<br />**说明**：层间距（px）的回调函数，通过该参数可以对不同节点设置不同的层间距。在`rankdir` 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在`rankdir` 为 'LR' 或 'RL' 时代表水平方向相邻层间距。优先级高于 `ranksep`，即若设置了 `ranksepFunc`，则 `ranksep` 不生效

## layoutCfg.controlPoints

**类型**： Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否保留布局连线的控制点

## layoutCfg.workerEnabled

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 是否启用 web-worker 以防布局计算时间过长阻塞页面交互

## layoutCfg.sortByCombo

**类型**: Boolean<br />**默认值**: false<br />**是否必须**: false<br />**说明**: 同一层节点是否根据每个节点数据中的 `comboId` 进行排序，以防止 combo 重叠
