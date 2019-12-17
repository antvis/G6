---
title: TreeGraph Layout
order: 2
---
## CompactBox

CompactBox is the default layout for TreeGraph. It will consider the bounding box of each node when layout. It comes from classical <a href='http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf' target='_blank'>Reingold–Tilford tidy layout algorithm</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 />

### Configuration

#### direction
**Type**: String<br />**Options**: 'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**: 'LR'<br />**Required**: false<br />**Description**: The direction of layout. 

- TB —— Root is on the top, layout from the top to the bottom

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gBrxRL_fzlMAAAAAAAAAAABkARQnAQ' width=141/>

- BT —— Root is on the bottom, layout from the bottom to the top

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=140/>

- LR —— Root is on the left, layout from the left to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BGNcSaWupSUAAAAAAAAAAABkARQnAQ' width=68/>

- RL —— Root is on the right, layout from the right to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J6JTSa-IID8AAAAAAAAAAABkARQnAQ' width=56/>

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=100/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=102/>


#### getId
**Type**: Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  return d.id + '_node';
}
```
**Required**: false<br />**Description**: Sets the id for each node

#### getWidth
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Description**: The width of each node


#### getHeight
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Description**: The height of each node


#### getHGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Default**: 18<br />**Required**: false<br />**Description**: The horizontal separation of nodes


#### getVGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Default**: 18<br />**Required**: false<br />**Description**: The vertical separation of nodes


#### radial
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: If layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 />

## Dendrogram

<a href='https://en.wikipedia.org/wiki/Dendrogram' target='_blank'>Dendrogram</a> arranges all the leaves on the same level. It is appropriate for hierarchical clustering. It does not consider the node size, which will be regarded as 1px.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 />

### Configuration

#### direction
**Type**: String<br />**Options**: 'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**: 'LR'<br />**Required**: false<br />**Description**: The direction of layout. 

- TB —— Root is on the top, layout from the top to the bottom

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B2hvT4yzh7YAAAAAAAAAAABkARQnAQ' width=112/>

- BT —— Root is on the bottom, layout from the bottom to the top

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=115/>

- LR —— Root is on the left, layout from the left to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2lJ5SYrUqhQAAAAAAAAAAABkARQnAQ' width=52/>

- RL —— Root is on the right, layout from the right to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UQlBR6dz8ZoAAAAAAAAAAABkARQnAQ' width=52/>

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=83/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=116/>


#### nodeSep
**Type**: Number<br />**Default**: 0<br />**Required**: false<br />**Description**: Node separation


#### rankSep
**Type**: Number<br />**Default**: 0<br />**Required**: false<br />**Description**: Level separation


#### radial
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Wheter layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqFcTLAhXIsAAAAAAAAAAABkARQnAQ' width=171/>

## Indented

Indented layout represents the hierarchy by indent between them. Each node will take a row/column. It is appropriate for file directory.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 />

### Configuration

#### direction
**Type**: String<br />**Options**: 'LR' | 'RL' | 'H'<br />**Default**: 'LR'<br />**Required**: false<br />**Description**: The direction of layout:

- LR —— Root is on the left, layout from the left to the right(left image below)<br />
- RL —— Root is on the right, layout from the right to the left(center image below)<br />
- H —— Root is on the middle, layout in horizontal symmetry(right image below)

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 />

> (Left)LR. (Center)RL. (Right)H.

#### indent
**Type**: Number<br />**Default**: 20<br />**Required**: false<br />**Description**: Colunm separation

#### getWidth
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Description**: The width of each node

#### getHeight
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Description**: The height of each node

#### getSide
**Type**: Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 'left'
  return 'right';
}
```
**Required**: false<br />**Description**: The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it.

## Mindmap

Mindmap arranged the nodes with same depth on the same level. Different from compactBox, it does not consider the size of nodes while doing layout.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=350 />

### Configuration

#### direction
**Type**: String<br />**Options**: 'H' | 'V'<br />**Default**: 'H'<br />**Required**: false<br />**Description**: The direction of layout. 

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1v35TYcFO0cAAAAAAAAAAABkARQnAQ' width=170/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x-bVTLOD-BcAAAAAAAAAAABkARQnAQ' width=145/>

#### getWidth
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Description**: The width of each node

#### getHeight
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Description**: The height of each node


#### getHGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Default**: 18<br />**Required**: false<br />**Description**: The horizontal separation of nodes


#### getVGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Default**: 18<br />**Required**: false<br />**Description**: The vertical separation of nodes


#### getSide
**Type**: Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'test-child-id') return 'right'
  return 'left';
}
```
**Default**: 'right'<br />**Required**: false<br />**Description**: The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it
