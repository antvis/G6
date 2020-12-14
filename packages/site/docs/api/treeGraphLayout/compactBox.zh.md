---
title: CompactBox 紧凑树
order: 1
---

紧凑盒树布局。这是树图的默认布局，其特点是布局时统合考虑每个树节点的包围盒，由经典的 <a href='http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf' target='_blank'>Reingold–Tilford tidy 布局算法</a>演进而来，适合于脑图等应用场景。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

### layoutCfg.direction

**类型**：String<br />**可选值**：'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，其他选项说明

- TB —— 根节点在上，往下布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KrAqTrFbNjMAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- BT —— 根节点在下，往上布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vNmOTJ4q0uwAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- LR —— 根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ffD6S74MXw4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- RL —— 根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vTg2SJbtj_sAAAAAAAAAAABkARQnAQ' width=60 alt='img'/>

- H —— 根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0GsIQISvieYAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

- V —— 根节点在中间，垂直对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

### layoutCfg.getId

**类型**: Function<br />**示例**:

```javascript
(d) => {
  // d is a node
  return d.id + '_node';
};
```

**是否必须**: false<br />**说明**: 节点 id 的回调函数

### layoutCfg.getWidth

**类型**：Number | Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

**是否必须**：false<br />**说明**：每个节点的宽度

### layoutCfg.getHeight

**类型**：Number | Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

**是否必须**：false<br />**说明**：每个节点的高度

### layoutCfg.getHGap

**类型**：Number | Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的水平间隙

### layoutCfg.getVGap

**类型**：Number | Function<br />**示例**：

```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50;
  return 100;
};
```

**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的垂直间隙

### layoutCfg.radial

**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>
