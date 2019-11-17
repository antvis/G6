---
title: API
---
## direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为，其他选项说明

- TB —— 根节点在上，往下布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B2hvT4yzh7YAAAAAAAAAAABkARQnAQ' width=112/>

- BT —— 根节点在下，往上布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=115/>

- LR —— 根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2lJ5SYrUqhQAAAAAAAAAAABkARQnAQ' width=52/>

- RL —— 根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UQlBR6dz8ZoAAAAAAAAAAABkARQnAQ' width=52/>

- H —— 根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=83/>

- V —— 根节点在中间，垂直对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=116/>

## nodeSep
**类型**：Number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：节点间距

## rankSep
**类型**：Number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：层与层之间的间距

## radial
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqFcTLAhXIsAAAAAAAAAAABkARQnAQ' width=171/>