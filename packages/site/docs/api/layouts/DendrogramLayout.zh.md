---
title: Dendrogram 生态树
---

<a href='https://en.wikipedia.org/wiki/Dendrogram' target='_blank'>生态树</a>布局的特点是所有子节点布局在同一层级，不考虑节点大小，每个节点被当成 1px 处理。适用于表示层次聚类。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

## 配置项

### direction

> _'LR' \| 'RL' \| 'TB' \| 'BT' \| 'H' \| 'V'_ **Default:** `'LR'`

树布局的方向

- `'TB'`<!-- -->：根节点在上，往下布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*krAnRrLTEnEAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

- `'BT'`<!-- -->：根节点在下，往上布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0HRyS64i7QoAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

- `'LR'`<!-- -->：根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*T5KZTJdA2OUAAAAAAAAAAABkARQnAQ' width=55 alt='img'/>

- `'RL'`<!-- -->：根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q7QJQ5RbQ5kAAAAAAAAAAABkARQnAQ' width=55 alt='img'/>

- `'H'`<!-- -->：根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tzIfRJ5CuR8AAAAAAAAAAABkARQnAQ' width=85 alt='img'/>

- `'V'`<!-- -->：根节点在中间，垂直对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B9sjToOzCiAAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

### nodeSep

> _Number_ **Default:** `20`

节点间距

### rankSep

> _Number_ **Default:** `200`

层与层之间的间距

### radial

> _Boolean_

是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AhopQI5j-bcAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>
