---
title: Indented 缩进树
order: 3
---

缩进树布局。树节点的层级通过水平方向的缩进量来表示。每个元素会占一行/一列。常用场景是文件目录结构。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>

### layoutCfg.direction

**类型**：String<br />**可选值**：'LR' | 'RL' | 'H'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为 `'LR'`，其他选项说明：

- LR —— 根节点在左，往右布局（下图左）<br />
- RL —— 根节点在右，往左布局（下图中）<br />
- H —— 根节点在中间，水平对称布局（下图右）

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='img'/>

> （左）LR。（中）RL。（右）H。

### layoutCfg.indent

**类型**：Number | Function<br />**默认值**：20<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.parent?.id === 'testId') return d.parent.x + 50;
  return 100;
};
```

**是否必须**：false<br />**说明**：类型为Number时，列间间距是固定值；类型为Function时，节点与根结点的间距是函数返回值。

### layoutCfg.getWidth

**类型**：Number | Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

**是否必须**：false<br />**说明**：每个节点的宽度，`direction` 为 `'H'` 时有效

### layoutCfg.getHeight

**类型**：Number | Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

**是否必须**：false<br />**说明**：每个节点的高度

### layoutCfg.getSide

**类型**：Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 'left';
  return 'right';
};
```

### layoutCfg.dropCap

**类型**：Boolean

<br />

**是否必须**：false

<br />**说明**：每个节点的第一个自节点是否位于下一行。默认为 `true`

**是否必须**：false<br />**说明**：节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点。
