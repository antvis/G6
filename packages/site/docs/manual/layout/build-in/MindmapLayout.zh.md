---
title: Mindmap 脑图树
---
## 概述

脑图树布局适用于树状结构的层次化布局，支持左右两侧展开，深度相同的节点将会被放置在同一层。需要注意：布局**会**考虑节点的大小。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=350 alt='img'/>

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'mindmap',
    direction: 'H',
    preLayout: false,
    getHeight: () => 32,
    getWidth: () => 32,
    getVGap: () => 16,
    getHGap: () => 72,
  },
});
```

## 配置项

<img src="https://img.alicdn.com/imgextra/i4/O1CN014J5e691gxm5GSrwD2_!!6000000004209-0-tps-1163-832.jpg" width="400" alt="脑图树配置项图解" />

| 属性      | 描述                                                               | 类型                 | 默认值 | 必选 |
| --------- | ------------------------------------------------------------------ | -------------------- | ------ | ---- |
| type      | 布局类型                                                           | `mindmap`            | -      | ✓    |
| direction | 布局方向，[可选值](#direction)                                     | `H` \| `V`           | `H`    | ✓    |
| getHeight | 计算每个节点的高度                                                 | (d?: Node) => number |        | ✓    |
| getWidth  | 计算每个节点的宽度                                                 | (d?: Node) => number |        | ✓    |
| getVGap   | 每个节点的垂直间隙，注意实际两个节点间的垂直间隙是2倍的vgap        | (d?: Node) => number |        |      |
| getHGap   | 每个节点的水平间隙，注意实际两个节点间的水平间隙是2倍的hgap        | (d?: Node) => number |        |      |
| getSide   | 设置节点排布在根节点的左侧/右侧，如未设置，则算法自动分配左侧/右侧 | (d?: Node) => string |        |      |

### direction

> _'H' \| 'V'_ **Default:** `'H'`

树布局的方向

- `'H'`：horizontal（水平）—— 根节点的子节点分成两部分横向放置在根节点左右两侧

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=170 alt='水平布局'/>

- `'V'`：vertical （竖直）—— 将根节点的所有孩子纵向排列

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AD0GTaNT5cQAAAAAAAAAAABkARQnAQ' width=150 alt='竖直布局'/>

### getWidth

> _(d?: Node) => number_

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

> _(d?: Node) => number_

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

> _(d?: Node) => number_

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

> _(d?: Node) => number_

每个节点的垂直间隙

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getSide

> _(d?: Node) => string_

设置节点排布在根节点的左侧/右侧，如未设置，则算法自动分配左侧/右侧

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```
