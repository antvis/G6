---
title: CompactBox
order: 1
---

CompactBox is the default layout for TreeGraph. It will consider the bounding box of each node when layout. It comes from classical <a href='http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf' target='_blank'>Reingold–Tilford tidy layout algorithm</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

### layoutCfg.direction

**Type**: String<br />**Options**: 'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**: 'LR'<br />**Required**: false<br />**Description**: The direction of layout.

- TB —— Root is on the top, layout from the top to the bottom

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gBrxRL_fzlMAAAAAAAAAAABkARQnAQ' width=141 alt='img'/>

- BT —— Root is on the bottom, layout from the bottom to the top

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=140 alt='img'/>

- LR —— Root is on the left, layout from the left to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BGNcSaWupSUAAAAAAAAAAABkARQnAQ' width=68 alt='img'/>

- RL —— Root is on the right, layout from the right to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J6JTSa-IID8AAAAAAAAAAABkARQnAQ' width=56 alt='img'/>

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=102 alt='img'/>

### layoutCfg.getId

**Type**: Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  return d.id + '_node';
};
```

**Required**: false<br />**Description**: Sets the id for each node

### layoutCfg.getWidth

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Required**: false<br />**Description**: The width of each node

### layoutCfg.getHeight

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Required**: false<br />**Description**: The height of each node

### layoutCfg.getHGap

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Default**: 18<br />**Required**: false<br />**Description**: The horizontal separation of nodes

### layoutCfg.getVGap

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Default**: 18<br />**Required**: false<br />**Description**: The vertical separation of nodes

### layoutCfg.radial

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: If layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>
