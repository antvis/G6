---
title: Dendrogram 生态树
---

## 概述

生态树布局适用于层次聚类数据的可视化，其特点是所有子节点布局在同一层级，不考虑节点大小，每个节点被当成 1px 处理。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 alt='生态树布局示例'/>

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'dendrogram',
    direction: 'LR',
    nodeSep: 30,
    rankSep: 250,
    radial: false,
  },
});
```

## 配置项

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tTShQLD_dGoAAAAAAAAAAAAAemJ7AQ/original" width="400" alt="生态树配置项图解" />

| 属性      | 描述                                           | 类型                                       | 默认值 | 必选 |
| --------- | ---------------------------------------------- | ------------------------------------------ | ------ | ---- |
| type      | 布局类型                                       | `dendrogram`                               | -      | ✓    |
| direction | 布局方向，[可选值](#direction)                 | `LR` \| `RL` \| `TB` \| `BT` \| `H` \| `V` | `LR`   |      |
| nodeSep   | 节点间距，即同一层级节点之间的距离，单位为像素 | number                                     | 20     |      |
| rankSep   | 层级间距，即不同层级之间的距离，单位为像素     | number                                     | 200    |      |
| radial    | 是否启用辐射状布局，[说明](#radial)            | boolean                                    | false  |      |

### direction

树布局的方向，有以下选项：

- `TB`：根节点在上，往下布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*krAnRrLTEnEAAAAAAAAAAABkARQnAQ' width=115 alt='TB方向'/>

- `BT`：根节点在下，往上布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0HRyS64i7QoAAAAAAAAAAABkARQnAQ' width=115 alt='BT方向'/>

- `LR`：根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*T5KZTJdA2OUAAAAAAAAAAABkARQnAQ' width=55 alt='LR方向'/>

- `RL`：根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q7QJQ5RbQ5kAAAAAAAAAAABkARQnAQ' width=55 alt='RL方向'/>

- `H`：根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tzIfRJ5CuR8AAAAAAAAAAABkARQnAQ' width=85 alt='H方向'/>

- `V`：根节点在中间，垂直对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B9sjToOzCiAAAAAAAAAAAABkARQnAQ' width=115 alt='V方向'/>

### radial

是否启用辐射状布局模式。启用后，节点将以根节点为中心呈辐射状分布。

若 `radial` 设置为 `true`，建议将 `direction` 设置为 `'LR'` 或 `'RL'` 以获得最佳效果。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AhopQI5j-bcAAAAAAAAAAABkARQnAQ' width=175 alt='辐射状布局'/>
