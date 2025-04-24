---
title: CompactBox 紧凑树
---

## 概述

紧凑树布局适用于结构化树形数据的展示，基于经典的 [Reingold–Tilford tidy 布局算法](http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf) 演进而来，通过布局时综合考虑每个树节点的包围盒，有效保持树结构的紧凑性与层次清晰。参考更多 CompactBox 布局[样例](https://g6.antv.antgroup.com/examples#layout-compact-box)和[源码](https://github.com/antvis/hierarchy/blob/master/src/compact-box.js)

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 alt='CompactBox 紧凑树布局示例'/>

## 使用场景

- 决策树: 通过紧凑树布局可简单直观的图形化展示每个决策路径
- 知识图谱: 展示概念之间的层级关系和连接，紧凑布局可以在有限空间内呈现复杂的知识网络

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'compact-box',
    direction: 'LR',
    getHeight: () => 16,
    getWidth: () => 16,
    getVGap: () => 16,
    getHGap: () => 40,
  },
});
```

## 配置项

| 属性      | 描述                                                                                                    | 类型                                                      | 默认值 | 必选 |
| --------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------ | ---- |
| type      | 布局类型                                                                                                | `compact-box`                                             | -      | ✓    |
| direction | 布局方向，[可选值](#direction)                                                                          | `LR` \| `RL` \| `TB` \| `BT` \| `H` \| `V`                | `LR`   |      |
| getSide   | 设置节点排布在根节点的左侧/右侧，如未设置，则算法自动分配左侧/右侧。注意：该参数仅在 `H` 布局方向上生效 | (d?: [NodeData](/manual/data#节点数据nodedata)) => string |        |      |
| getId     | 节点 id 的回调函数                                                                                      | (d?: [NodeData](/manual/data#节点数据nodedata)) => string |        |      |
| getWidth  | 计算每个节点的宽度                                                                                      | (d?: [NodeData](/manual/data#节点数据nodedata)) => number |        |      |
| getHeight | 计算每个节点的高度                                                                                      | (d?: [NodeData](/manual/data#节点数据nodedata)) => number |        |      |
| getHGap   | 计算每个节点的水平间隙                                                                                  | (d?: [NodeData](/manual/data#节点数据nodedata)) => number |        |      |
| getVGap   | 计算每个节点的垂直间隙                                                                                  | (d?: [NodeData](/manual/data#节点数据nodedata)) => number |        |      |
| radial    | 是否启用辐射状布局，[说明](#radial)                                                                     | boolean                                                   | false  |      |

### direction

> `LR` \| `RL` \| `TB` \| `BT` \| `H` \| `V` **Default:** `LR`

树布局方向

- `TB`：根节点在上，往下布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KrAqTrFbNjMAAAAAAAAAAABkARQnAQ' width=150 alt='垂直布局'/>

- `BT`：根节点在下，往上布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vNmOTJ4q0uwAAAAAAAAAAABkARQnAQ' width=150 alt='垂直布局'/>

- `LR`：根节点在左，往右布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ffD6S74MXw4AAAAAAAAAAABkARQnAQ' width=150 alt='水平布局'/>

- `RL`：根节点在右，往左布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vTg2SJbtj_sAAAAAAAAAAABkARQnAQ' width=150 alt='水平布局'/>

- `H`：根节点在中间，水平对称布局。可传入 `getSide` 方法指定每个节点的左右分布逻辑

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0GsIQISvieYAAAAAAAAAAABkARQnAQ' width=150 alt='水平布局'/>

- `V`：根节点在中间，垂直对称布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=150 alt='垂直布局'/>

### getSide

> _(d?: [NodeData](/manual/data#节点数据nodedata)) => string_

设置节点排布在根节点的左侧/右侧。注意：该参数仅在 `direction` 为 `H` 时生效。如未设置，会默认将子节点前半部分放置在右侧，后半部分放置在左侧，参考 [getSide自动计算逻辑](https://github.com/antvis/hierarchy/blob/d786901874f59d96c47e2a5dfe17b373eefd72e3/src/layout/separate-root.js#L11)。

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```

### getId

> _(d?: [NodeData](/manual/data#节点数据nodedata)) => string_

节点 id 的回调函数

示例：

```javascript
(d) => {
  // d 是一个节点
  return d.id + '_node';
};
```

### getWidth

> _(d?: [NodeData](/manual/data#节点数据nodedata)) => number_

每个节点的宽度

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHeight

> _(d?: [NodeData](/manual/data#节点数据nodedata)) => number_

每个节点的高度

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHGap

> _(d?: [NodeData](/manual/data#节点数据nodedata)) => number_

每个节点的水平间隙

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getVGap

> _(d?: [NodeData](/manual/data#节点数据nodedata)) => number_

每个节点的垂直间隙

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

### radial

> _boolean_

是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>

## 代码示例

<Playground path="layout/compact-box/demo/basic.js" rid="circular-basic"></Playground>
