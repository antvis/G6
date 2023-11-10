---
title: Radial 辐射
order: 6
---

本文展示所有辐射布局的配置项。[辐射布局 DEMO](/zh/examples/net/radialLayout/#basicRadial)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DQBoTocVv_EAAAAAAAAAAAAADmJ7AQ/original" width=300 />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7DfvS4QOjycAAAAAAAAAAAAADmJ7AQ/original" width=300 />

## center

**类型**：`[number, number]`

**默认值**：当前容器的中心位置

**是否必须**：false

**说明**：圆形布局的中心位置

## focusNode

**类型**：`string` | `number`

**默认值**：`null`

**是否必须**：false

**说明**：辐射的中心点，默认为数据中第一个节点。可以传入节点 id 或节点本身

## height

**类型**：`number`

**默认值**：`undefined`

**是否必须**：false

**说明**：布局的高度，默认使用容器高度

## width

**类型**：`number`

**默认值**：`undefined`

**是否必须**：false

**说明**：布局的宽度，默认使用容器宽度

## unitRadius

**类型**：`number`

**默认值**：`100`

**是否必须**：false

**说明**：每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定

## linkDistance

**类型**：`number`

**默认值**：`50`

**是否必须**：false

**说明**：边长度

## preventOverlap

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否防止重叠，必须配合下面属性 `nodeSize`，只有设置了与当前图节点大小相同的 `nodeSize` 值，才能够有效地进行节点重叠的碰撞检测

## nodeSize

**类型**：`number` \| `number`[] \| (`nodeModel`: `NodeModel`) => `number`

**默认值**：`10`

**是否必须**：false

**说明**：节点大小（直径）。用于防止节点重叠时的碰撞检测

## nodeSpacing

**类型**：`number` \| `number`[] \| (`nodeModel`: `NodeModel`) => `number`

**默认值**：`10`

**是否必须**：false

**说明**：`preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距, 如示例

**示例**：

```javascript
(nodeModel) => {
  // nodeModel is a node's inner model data
  if (nodeModel.id === 'node1') {
    return 100;
  }
  return 10;
};
```

## maxIteration

**类型**：`number`

**默认值**：`1000`

**是否必须**：false

**说明**：停止迭代到最大迭代数

## maxPreventOverlapIteration

**类型**：`number`

**默认值**：`200`

**是否必须**：false

**说明**：防止重叠步骤的最大迭代次数

## sortBy

**类型**：`string`

**默认值**：`undefined`

**是否必须**：false

**说明**：同层节点布局后相距远近的依据。默认 `undefined` ，表示根据数据的拓扑结构（节点间最短路径）排布，即关系越近/点对间最短路径越小的节点将会被尽可能排列在一起；`'data'` 表示按照节点在数据中的顺序排列，即在数据顺序上靠近的节点将会尽可能排列在一起；也可以指定为节点数据中的某个字段名，例如 `'cluster'`、`'name'` 等（必须在数据的 `data` 中存在）

## sortStrength

**类型**：`number`

**默认值**：`10`

**是否必须**：false

**说明**：同层节点根据 `sortBy` 排列的强度，数值越大，`sortBy` 指定的方式计算出距离越小的越靠近。`sortBy` 不为 `undefined` 时生效

## strictRadial

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否必须是严格的 `radial` 布局，及每一层的节点严格布局在一个环上。`preventOverlap` 为 `true` 时生效。

- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `false` 时，有重叠的节点严格沿着所在的环展开，但在一个环上若节点过多，可能无法完全避免节点重叠。

- 当 `preventOverlap` 为 `true`，且 `strictRadial` 为 `true` 时，允许同环上重叠的节点不严格沿着该环布局，可以在该环的前后偏移以避免重叠。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJqbRqm0h2UAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PFRIRosyX7kAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DPQFSqCXaIAAAAAAAAAAAABkARQnAQ' width=270 alt='img'/>

> （左）preventOverlap = false。（中）preventOverlap = false，strictRadial = true。（右）preventOverlap = false，strictRadial = false。
