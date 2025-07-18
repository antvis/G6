---
title: Force 力导向布局
order: 13
---

## 概述

力导向布局是一种基于物理模拟的图布局算法，它通过模拟节点间的引力和斥力来确定节点的位置。这种布局方式特别适合展示复杂的关系网络，如社交网络、知识图谱等。

力导向布局会自动计算并调整节点位置，使得相连的节点保持适当的距离，同时尽量减少边的交叉。布局过程中会模拟物理系统，节点会像带电粒子一样相互排斥，边则像弹簧一样连接节点。

力导向布局的主要特点包括：

1. **自动排列**：不需要手动设置节点位置，系统会自动找到合适的位置
2. **实时调整**：当你拖动某个节点时，其他节点会实时跟随调整位置
3. **灵活配置**：
   - 可以调整节点间的吸引力和排斥力
   - 可以设置边的长度
   - 可以防止节点重叠
4. **动画效果**：节点移动时会有平滑的动画，让变化更自然

<img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/pdZUQIReZ_gAAAAAAAAAAAAADpdRAQFr/original' alt='力导向布局示例'/>

## 核心概念

### Force 力导向布局基本原理

力导向布局是一种基于物理模拟的图布局算法，它将图中的节点和边模拟为物理系统：

- 节点被视为物理粒子
- 边被视为弹簧
- 整个系统通过物理模拟达到能量最低状态

### 核心力详解

#### 斥力（Node Repulsion）

- **物理模型**：库伦定律（Coulomb's Law）
- **作用**：防止节点重叠，让节点分布更均匀，其中 `factor` 和 `coulombDisScale` 控制斥力的总体强度和范围。
- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/7udvQ5K8VvMAAAAAAAAAAAAADpdRAQFr/original' alt='斥力'/>

  - k: 斥力系数（`factor` / `coulombDisScale²`）
  - q1,q2: 节点强度(`nodeStrength`)
  - r: 节点间距离

#### 边拉力（Edge Attraction）

- **物理模型**：胡克定律（Hooke's Law）
- **作用**：模拟边的拉力，使节点沿着边的方向移动，其中 `edgeStrength` 和 `linkDistance` 控制边的“硬度”和长度。
- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/WY15QYfpMSAAAAAAAAAAAAAADpdRAQFr/original' alt='边拉力'/>

  - ka: 边拉力强度（`edgeStrength`）
  - L: 边的长度（`linkDistance`）
  - r: 实际边长度

#### 向心力（Gravity）

- **物理模型**：牛顿万有引力定律（Newton's Universal Law of Gravitational）
- **作用**：使节点向画布中心或者聚类中心聚集，其中 `gravity` 和 `center` 控制重力强度和中心点位置
- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/R-26R4Zc09kAAAAAQDAAAAgADpdRAQFr/original' alt='向心力'/>

  - G: 万有引力常数（`gravity`）
  - xc: 中心点坐标（`center`）
  - mass: 节点质量（`nodeSize`）

#### 三种力的相互作用

- **物理模型**：力的相互作用，产生加速度
- **作用**：斥力、边拉力、向心力共同作用，通过加速度叠加影响节点运动，最终达到能量最低状态。
- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/R-26R4Zc09kAAAAAQDAAAAgADpdRAQFr/original' alt='力的相互作用'/>

### 物理系统

#### 节点运动速度公式

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/4Nk0Q44tWGIAAAAAAAAAAAAADpdRAQFr/original' alt='节点运动速度公式'/>

  - v: 速度
  - a: 加速度
  - dt: 时间步长（`interval`）
  - damping: 阻尼系数（`damping`）

- **作用**：
  1. 控制节点移动的稳定性
  2. 阻尼系数防止系统震荡
  3. 时间步长影响每次迭代的位移

#### 节点位置公式

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/orF2RoAlHwAAAAAAAAAAAAAADpdRAQFr/original' alt='节点位置公式'/>

  - x: 节点位置
  - v: 节点速度
  - dt: 时间步长（`interval`）

- **作用**：
  1. 根据速度更新节点位置
  2. 确保运动连续性
  3. 通过 `preventOverlap` 防止节点重叠

#### 聚类中心计算

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/2jc-TrgcG20AAAAAQDAAAAgADpdRAQFr/original' alt='聚类中心计算'/>

  - n: 聚类内节点数量
  - (xi​,yi​): 每个节点的位置

- **作用**：
  1. 计算聚类中心
  2. 向心力将节点拉向所属聚类中心
  3. 聚类中心可动态变化

#### 聚类强度计算

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/sVEtTLyM3rwAAAAAAAAAAAAADpdRAQFr/original' alt='聚类强度计算'/>

  - s: 聚类强度（`clusterNodeStrength`）
  - xc​: 聚类中心

- **作用**：
  1. 控制聚类的紧密程度
  2. 聚类强度越大，聚类越紧凑
  3. 可根据节点属性动态调整

#### 质量对力的影响

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/5ckVQ6gHQygAAAAAQBAAAAgADpdRAQFr/original' alt='质量对力的影响'/>

  - a: 加速度
  - F: 力（斥力、边拉力、向心力）
  - mass: 节点质量

- **作用**：
  1. 质量大的节点移动较小
  2. 质量小的节点移动较大
  3. 通过 `getMass` 可自定义质量计算

#### 能量计算

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/M84ERKphqf0AAAAAAAAAAAAADpdRAQFr/original' alt='能量计算'/>

  - m: 节点质量
  - v: 节点速度

- **作用**：
  1. 监控布局收敛情况
  2. 能量趋近于零时系统趋于稳定

#### 系统收敛条件

- **公式**：
  <img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/oBHdRLKIEAcAAAAAQFAAAAgADpdRAQFr/original' alt='系统收敛条件'/>

- **作用**：
  1. 控制迭代次数
  2. 移动量小于阈值时停止
  3. 通过 `distanceThresholdMode` 可选择平均值、最大值或最小值

### 力相互作用图

<img src='https://mdn.alipayobjects.com/huamei_4greni/afts/img/2lI1RruANXoAAAAAAAAAAAAADpdRAQFr/original' alt='力作用模拟图'/>

## 配置项

根据上述力导向布局的物理特性，有以下配置项：

### 基础配置

| 属性                  | 描述                                                                                                                                                         | 默认值   | 必选 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---- |
| type                  | 布局类型                                                                                                                                                     | `force`  | ✓    |
| dimensions            | 布局维度，2表示2D布局，3表示3D布局                                                                                                                           | 2        |      |
| width                 | 布局宽度                                                                                                                                                     | 画布宽度 |      |
| height                | 布局高度                                                                                                                                                     | 画布高度 |      |
| center                | 布局的中心点                                                                                                                                                 | 图中心   |      |
| maxIteration          | 最大迭代次数，若为 0 则将自动调整                                                                                                                            | 0        |      |
| minMovement           | 当平均移动距离小于0.4时停止迭代                                                                                                                              | 0.4      |      |
| distanceThresholdMode | 移动距离的计算模式：mean: 平均移动距离小于 `minMovement` 时停止迭代；max: 最大移动距离小于时 `minMovement` 时停止迭代；min: 最小移动距离小于时 `minMovement` | `mean`   |      |
| maxDistance           | 最大距离                                                                                                                                                     |          |      |

### 力相关配置

#### 斥力配置

| 属性            | 描述                                                               | 默认值 | 必选 |
| --------------- | ------------------------------------------------------------------ | ------ | ---- |
| nodeStrength    | 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用 | 1000   |      |
| factor          | 斥力系数，数值越大，斥力越大                                       | 1      |      |
| coulombDisScale | 库伦系数，斥力的一个系数，数字越大，节点之间的斥力越大             | 0.005  |      |

#### 边拉力配置

| 属性         | 描述                                                               | 默认值 | 必选 |
| ------------ | ------------------------------------------------------------------ | ------ | ---- |
| edgeStrength | 边的作用力（引力）大小，固定作用力或回调函数动态返回不同边的作用力 | 500    |      |
| linkDistance | 边的长度，固定长度或回调函数动态返回不同边的长度                   | 200    |      |

#### 向心力配置

| 属性               | 描述                                                                                                                                                         | 默认值 | 必选 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---- |
| gravity            | 向中心力大小，指所有节点被吸引到 center 的力。数字越大，布局越紧凑                                                                                           | 10     |      |
| centripetalOptions | 向心力配置，包括叶子节点、离散点、其他节点的向心中心及向心力大小。leaf: 叶子节点向心力；single: 单点向心力；others: 其他节点向心力；center: 自定义中心点函数 | [0, 0] |      |

#### 聚类配置

| 属性                | 描述                                                                                                                                                                                                                                                                                                      | 默认值  | 必选 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| clustering          | 是否需要全部节点聚类，若为 `true`，将使用 `nodeClusterBy` 配置的节点数据中的字段作为聚类依据。 `centripetalOptions.single`、`centripetalOptions.leaf`、`centripetalOptions.others` 将使用 `getClusterNodeStrength` 返回值；`leaf`、`centripetalOptions.center` 将使用当前节点所属聚类中所有节点的平均中心 | `false` |      |
| nodeClusterBy       | 指定节点数据中的字段名称作为节点聚类的依据，`clustering` 为 true 时生效，自动生成 `centripetalOptions`，可配合 `clusterNodeStrength` 使用                                                                                                                                                                 |         |      |
| clusterNodeStrength | 配合 `clustering` 和 `nodeClusterBy` 使用，指定聚类向心力的大小                                                                                                                                                                                                                                           |         |      |
| leafCluster         | 是否需要叶子节点聚类，若为 `true`，则 `centripetalOptions.single` 将为 100；`centripetalOptions.leaf` 将使用 `getClusterNodeStrength` 返回值；`getClusterNodeStrength.center` 将为叶子节点返回当前所有叶子节点的平均中心                                                                                  | false   |      |

#### 性能与优化配置

| 属性            | 描述                                                                                                                                                                                           | 默认值 | 必选 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| damping         | 阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢                                                                                                                                            | 0.9    |      |
| maxSpeed        | 一次迭代的最大移动长度                                                                                                                                                                         | 200    |      |
| interval        | 控制每个迭代节点的移动速度                                                                                                                                                                     | 0.02   |      |
| preventOverlap  | 是否防止重叠，必须配合下面属性 `nodeSize` 或节点数据中的 `data.size` 属性，只有在数据中设置了 `data.size` 或在该布局中配置了与当前图节点大小相同的 `nodeSize` 值，才能够进行节点重叠的碰撞检测 | true   |      |
| nodeSize        | 节点大小（直径）。用于防止节点重叠时的碰撞检测，固定大小或者回调函数动态返回节点大小                                                                                                           |        |      |
| nodeSpacing     | `preventOverlap` 为 `true` 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距                                                                                |        |      |
| collideStrength | 防止重叠的力强度，范围 [0, 1]                                                                                                                                                                  | 1      |      |

#### 其他配置

| 属性      | 描述                                                                                                                                                                                                | 默认值 | 必选 |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| getMass   | 获取节点质量的回调函数，入参为节点内部流转数据，用于计算节点质量大小                                                                                                                                |        |      |
| getCenter | 每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力                                                                                                                                   |        |      |
| onTick    | 每一次迭代的回调函数                                                                                                                                                                                |        |      |
| monitor   | 每个迭代的监控信息回调，energy 表示布局的收敛能量。若配置可能带来额外的计算能量性能消耗，不配置则不计算。入参为迭代监控信息 `{ energy: number; nodes: Node[]; edges: Edge[]; iterations: number; }` |        |      |

## 代码示例

### 基础用法

```js
const graph = new Graph({
  container: 'container',
  layout: {
    type: 'force',
    // 防止节点重叠
    preventOverlap: true,
    // 节点大小
    nodeSize: 20,
    // 布局宽度
    width: 800,
    // 布局高度
    height: 600,
  },
});
```

### 防止节点重叠

```js
const graph = new Graph({
  layout: {
    type: 'force',
    // 防止节点重叠
    preventOverlap: true,
    // 节点大小
    nodeSize: 20,
  },
});
```

### 力导向布局

该示例展示了如何使用力导向布局创建一个基础的力导向图。

```js
import { Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', label: 'Node 1', size: 30 },
    { id: 'node2', label: 'Node 2', size: 20 },
    { id: 'node3', label: 'Node 3', size: 20 },
    { id: 'node4', label: 'Node 4', size: 20 },
    { id: 'node5', label: 'Node 5', size: 30 },
    { id: 'node6', label: 'Node 6', size: 20 },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node4' },
    { source: 'node3', target: 'node4' },
    { source: 'node4', target: 'node5' },
    { source: 'node5', target: 'node6' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  autoFit: 'view',
  modes: {
    default: ['drag-canvas', 'zoom-canvas'],
  },
  layout: {
    type: 'force',
    // 防止节点重叠
    preventOverlap: true,
    // 节点大小
    nodeSize: 20,
    // 向心力
    gravity: 0.9,
    // 迭代次数
    iterations: 100,
  },
  node: {
    style: {
      size: (d) => d.size,
      fill: '#9EC9FF',
      stroke: '#69C8FF',
      label: (d) => d.label,
      labelPlacement: 'center',
      labelFill: '#333',
    },
  },
  edge: {
    style: {
      stroke: '#e2e2e2',
    },
  },
});

graph.on(NodeEvent.CLICK, async (e) => {
  const nodeId = e.target.id;
  graph.updateNodeData([{ id: nodeId, size: 200 }]);
  await graph.render();
});

graph.render();
```

主要配置说明：

- `preventOverlap`: 开启节点重叠检测
- `nodeSize`: 设置节点大小
- `gravity`: 设置节点向心力
- `iterations`: 设置布局计算的精确程度

还可以参考 [查看示例](https://g6.antv.antgroup.com/examples/layout/force-directed/#force) 获取更多用法。
