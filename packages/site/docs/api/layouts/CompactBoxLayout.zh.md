---
title: CompactBox 紧凑树
---

紧凑盒树布局。这是树图的默认布局，其特点是布局时统合考虑每个树节点的包围盒，由经典的 <a href='http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf' target='_blank'>Reingold–Tilford tidy 布局算法</a>演进而来，适合于脑图等应用场景。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

## 配置项

### direction

> _'LR' \| 'RL' \| 'TB' \| 'BT' \| 'H' \| 'V'_ **Default:** `'LR'`

树布局的方向

- `'TB'`<!-- -->：根节点在上，往下布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KrAqTrFbNjMAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- `'BT'`<!-- -->：根节点在下，往上布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vNmOTJ4q0uwAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- `'LR'`<!-- -->：根节点在左，往右布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ffD6S74MXw4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- `'RL'`<!-- -->：根节点在右，往左布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vTg2SJbtj_sAAAAAAAAAAABkARQnAQ' width=60 alt='img'/>

- `'H'`<!-- -->：根节点在中间，水平对称布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0GsIQISvieYAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

- `'V'`<!-- -->：根节点在中间，垂直对称布局

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

### getSide

> (d?:\_ _Node_<!-- -->_) =&gt; string_

节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧。

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```

### getId

> (d?:\_ _Node_<!-- -->_) =&gt; string_

节点 id 的回调函数

示例：

```javascript
(d) => {
  // d is a node
  return d.id + '_node';
};
```

### getWidth

> (d?:\_ _Node_<!-- -->_) =&gt; number_

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

> (d?:\_ _Node_<!-- -->_) =&gt; number_

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

> (d?:\_ _Node_<!-- -->_) =&gt; number_

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

> (d?:\_ _Node_<!-- -->_) =&gt; number_

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
