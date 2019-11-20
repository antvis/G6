---
title: API
---
## rankdir
**类型**： String<br />**可选值**：'TB' | 'BT' | 'LR' | 'RL'<br />**默认值**：'TB'<br />**是否必须**：false<br />**说明**：布局的方向。T：top（上）；B：bottom（下）；L：left（左）；R：right（右）。

- 'TB'：从上至下布局；
- 'BT'：从下至上布局；
- 'LR'：从左至右布局；
- 'RL'：从右至左布局。

<br />

## align
**类型**： String<br />**可选值**：'UL' | 'UR' | 'DL' | 'DR'<br />**默认值**：'UL'<br />**是否必须**：false<br />**说明**：节点对齐方式。U：upper（上）；D：down（下）；L：left（左）；R：right（右）

- 'UL'：对齐到左上角；
- 'UR'：对齐到右上角；
- 'DL'：对齐到左下角；
- 'DR'：对齐到右下角。

## nodesep
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：节点间距（px）

## ranksep
**类型**： Number<br />**默认值**：50<br />**是否必须**：false<br />**说明**：层间距（px）

## controlPoints
**类型**： Boolean<br />**默认值**：true<br />**是否必须**：false<br />**说明**：是否保留布局连线的控制点