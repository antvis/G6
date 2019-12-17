---
title: TreeGraph Layout
order: 2
---
## CompactBox 紧凑树布局

紧凑盒树布局。这是树图的默认布局，其特点是布局时统合考虑每个树节点的包围盒，由经典的 <a href='http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf' target='_blank'>Reingold–Tilford tidy 布局算法</a>演进而来，适合于脑图等应用场景。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 />

### 属性

#### direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，其他选项说明

- TB —— 根节点在上，往下布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KrAqTrFbNjMAAAAAAAAAAABkARQnAQ' width=150 />

- BT —— 根节点在下，往上布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vNmOTJ4q0uwAAAAAAAAAAABkARQnAQ' width=150 />

- LR —— 根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ffD6S74MXw4AAAAAAAAAAABkARQnAQ' width=150 />

- RL —— 根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vTg2SJbtj_sAAAAAAAAAAABkARQnAQ' width=60 />

- H —— 根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0GsIQISvieYAAAAAAAAAAABkARQnAQ' width=100 />

- V —— 根节点在中间，垂直对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=100 />


#### getId
**类型**: Function<br />**示例**: 
```javascript
(d) => {
  // d is a node
  return d.id + '_node';
}
```
**是否必须**: false<br />**说明**: 节点 id 的回调函数


#### getWidth
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的宽度


#### getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度


#### getHGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的水平间隙


#### getVGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的垂直间隙


#### radial
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 />

## Dendrogram 生态树布局

<a href='https://en.wikipedia.org/wiki/Dendrogram' target='_blank'>生态树</a>布局的特点是所有子节点布局在同一层级，不考虑节点大小，每个节点被当成 1px 处理。适用于表示层次聚类。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 />

### 属性

#### direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为 `'LR'`，其他选项说明

- TB —— 根节点在上，往下布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*krAnRrLTEnEAAAAAAAAAAABkARQnAQ' width=115 />

- BT —— 根节点在下，往上布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0HRyS64i7QoAAAAAAAAAAABkARQnAQ' width=115 />

- LR —— 根节点在左，往右布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*T5KZTJdA2OUAAAAAAAAAAABkARQnAQ' width=55 />


- RL —— 根节点在右，往左布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q7QJQ5RbQ5kAAAAAAAAAAABkARQnAQ' width=55 />

- H —— 根节点在中间，水平对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tzIfRJ5CuR8AAAAAAAAAAABkARQnAQ' width=85 />

- V —— 根节点在中间，垂直对称布局

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B9sjToOzCiAAAAAAAAAAAABkARQnAQ' width=115 />


#### nodeSep
**类型**：Number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：节点间距


#### rankSep
**类型**：Number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：层与层之间的间距


#### radial
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AhopQI5j-bcAAAAAAAAAAABkARQnAQ' width=175 />

## Indented 缩进树布局

缩进树布局。树节点的层级通过水平方向的缩进量来表示。每个元素会占一行/一列。常用场景是文件目录结构。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 />

### 属性

#### direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'H'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为 `'LR'`，其他选项说明：

- LR —— 根节点在左，往右布局（下图左）<br />
- RL —— 根节点在右，往左布局（下图中）<br />
- H —— 根节点在中间，水平对称布局（下图右）

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 />

> （左）LR。（中）RL。（右）H。

#### indent
**类型**：Number<br />**默认值**：20<br />**是否必须**：false<br />**说明**：列间间距

#### getWidth
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的宽度

#### getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度

#### getSide
**类型**：Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 'left'
  return 'right';
}
```
**是否必须**：false<br />**说明**：节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点。

## Mindmap 脑图树布局

深度相同的节点将会被放置在同一层，与 compactBox 不同的是，布局不会考虑节点的大小。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=350 />

### 属性

#### direction
**类型**：String<br />**可选值**：'H' | 'V'<br />**默认值**：'H'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为 `'H'`，其他选项说明

- H：horizontal（水平）—— 根节点的子节点分成两部分横向放置在根节点左右两侧

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=170 />

- V：vertical （竖直）—— 将根节点的所有孩子纵向排列

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AD0GTaNT5cQAAAAAAAAAAABkARQnAQ' width=150 />

#### getWidth
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的宽度

#### getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度


#### getHGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的水平间隙


#### getVGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的垂直间隙


#### getSide
**类型**：Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'test-child-id') return 'right'
  return 'left';
}
```
**默认值**：'right'<br />**是否必须**：false<br />**说明**：节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧。
