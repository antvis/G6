---
title: Indented 缩进树
---

缩进树布局。树节点的层级通过水平方向的缩进量来表示。每个元素会占一行/一列。常用场景是文件目录结构。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>

## 配置项

### direction

> _'LR' \| 'LR' \| 'H'_ **Default:** `'LR'`

树布局的方向

- `'LR'`：根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='img'/>

- `'RL'`：根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='img'/>

- `'H'`：根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='img'/>

### indent

> _Number \| ((d?: Node) => string)_ **Default:** `20`

列间间距。类型为Number时，列间间距是固定值；类型为Function时，节点与根结点的间距是函数返回值。

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.parent?.id === 'testId') return d.parent.x + 50;
  return 100;
};
```

### getWidth

> _(d?: Node) => number_

每个节点的宽度，`direction` 为 `'H'` 时有效

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

### getSide

> _(d?: Node) => string_

节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧。

示例：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 'left';
  return 'right';
};
```

### dropCap

> _boolean_ **Default:** `true`

每个节点的第一个自节点是否位于下一行
