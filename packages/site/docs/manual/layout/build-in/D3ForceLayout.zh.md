---
title: D3Force 力导向布局
---

## 概述

D3Force 布局是基于 [d3-force](https://d3js.org/d3-force) 实现的力导向布局。它通过模拟物理力的作用（如引力、斥力、碰撞等），使图布局达到一个能量最小的稳定状态。

这种布局的主要特点是：

1. **自动排列**：不需要手动设置节点位置，系统会自动找到合适的位置
2. **实时调整**：当你拖动某个节点时，其他节点会实时跟随调整位置
3. **灵活配置**：
   - 可以调整节点间的吸引力和排斥力
   - 可以设置边的理想长度
   - 可以固定某些重要节点的位置
4. **动画效果**：节点移动时会有平滑的动画，让变化更自然

<img alt="D3Force 布局示意图" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-_sFS5IRGGcAAAAAAAAAAAAADmJ7AQ/original" />

## 核心概念

### 力系统 Force System

D3Force 布局通过模拟五种不同的力来实现自动布局。想象一个物理世界，这些力同时作用，最终达到平衡：

<img width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*p5L2S6gtZ2AAAAAAAAAAAAAAemJ7AQ/original" alt="force" />

> 注：图中不同颜色的箭头代表不同类型的力，实际布局中这些力是无形的，同时也会受其他力影响。

- **链接力**（Link Force）：想象节点之间连着橡皮筋，可以把相连的节点拉到合适的距离。橡皮筋的松紧度就是力的强度（strength），理想长度就是我们设置的距离（distance）。
- **多体力**（Many-Body Force）：类似磁铁的效果，可以让所有节点互相吸引或排斥。力的强度为负值时节点会互相排斥（像相同磁极），为正值时会互相吸引（像相反磁极）。这个力决定了图的疏密程度。
- **中心力**（Center Force）：就像所有节点都被一根看不见的绳子拴在画布中心。这个力可以防止节点飘得太远，让整个图保持在画布的中心位置。
- **碰撞力**（Collision Force）：让节点变成有实体大小的小球，当节点太近时会自动弹开。这个力主要用来防止节点重叠，提高图的可读性。
- **径向力**（Radial Force）：想象有一个看不见的圆环，这个力会把节点吸引到圆环上。通过设置圆的半径和力的强度，可以让节点形成漂亮的环形布局。

### 迭代系统（Iteration System）

布局计算是一个反复调整的过程，包含两个关键概念：

#### Alpha 值（活力值）

就像布局的"能量"，决定节点移动的剧烈程度：

- **初始状态**：Alpha = 1，节点移动剧烈
- **计算过程**：Alpha 值逐渐降低，节点移动变缓
- **结束状态**：当 Alpha < alphaMin 时，节点停止移动

#### 迭代次数（Iterations）

控制每次计算时力的作用次数：

- **作用**：值越大，布局越精确，但计算越慢
- **调节**：
  - 简单图：使用默认值即可
  - 复杂图：可以适当增加迭代次数
  - 实时交互：建议使用较小的迭代次数

> 提示：迭代次数（iterations）和活力值（alpha）是相互配合的。增加迭代次数可以让每一步计算更精确，而活力值则控制整体计算的进度。

## 配置项

| 属性            | 描述                                          | 类型                                       | 默认值     | 必选 |
| --------------- | --------------------------------------------- | ------------------------------------------ | ---------- | ---- |
| type            | 布局类型                                      | string                                     | 'd3-force' | ✓    |
| nodeSize        | 节点大小（直径），用于碰撞检测防止节点重叠    | number \| ((node, index, nodes) => number) | -          |      |
| iterations      | 力的迭代次数，值越大布局越精确但性能消耗越大  | number                                     | -          |      |
| onTick          | 每次迭代的回调函数，用于实时获取布局结果      | (data: LayoutMapping) => void              | -          |      |
| forceSimulation | 自定义力模拟方法，若不指定则使用 d3.js 的方法 | Simulation<NodeDatum, EdgeDatum>           | -          |      |
| randomSource    | 用于生成随机数的函数                          | () => number                               | -          |      |

### 迭代控制

| 属性          | 描述                                                   | 类型   | 默认值 | 必选 |
| ------------- | ------------------------------------------------------ | ------ | ------ | ---- |
| alpha         | 当前迭代的收敛阈值，控制布局的活跃程度                 | number | 1      |      |
| alphaMin      | 停止迭代的最小阈值，当 alpha 小于该值时停止迭代        | number | 0.001  |      |
| alphaDecay    | 收敛阈值的衰减率，范围 [0, 1]，0.028 对应约 300 次迭代 | number | 0.028  |      |
| alphaTarget   | 目标收敛阈值，系统会尝试将 alpha 收敛到该值            | number | 0      |      |
| velocityDecay | 速度衰减因子，值越大节点运动越缓慢                     | number | 0.4    |      |

### 力模型配置

#### 链接力（link）

| 属性            | 描述                               | 类型                                       | 默认值      | 必选 |
| --------------- | ---------------------------------- | ------------------------------------------ | ----------- | ---- |
| link.id         | 边的 id 生成函数                   | (edge, index, edges) => string             | (e) => e.id |      |
| link.distance   | 理想边长，边会趋向于该长度         | number \| ((edge, index, edges) => number) | 30          |      |
| link.strength   | 力的强度，值越大边长越接近理想边长 | number \| ((edge, index, edges) => number) | 1           |      |
| link.iterations | 链接力的迭代次数                   | number                                     | 1           |      |

#### 多体力（manyBody）

| 属性                 | 描述                                                  | 类型                                       | 默认值   | 必选 |
| -------------------- | ----------------------------------------------------- | ------------------------------------------ | -------- | ---- |
| manyBody.strength    | 力的强度，负值为斥力，正值为引力                      | number \| ((node, index, nodes) => number) | -30      |      |
| manyBody.theta       | Barnes-Hut 算法的精度参数，值越小越精确但性能消耗越大 | number                                     | 0.9      |      |
| manyBody.distanceMin | 最小作用距离，防止力过大                              | number                                     | 1        |      |
| manyBody.distanceMax | 最大作用距离，超过该距离的节点不产生力                | number                                     | Infinity |      |

#### 中心力（center）

| 属性            | 描述                               | 类型   | 默认值 | 必选 |
| --------------- | ---------------------------------- | ------ | ------ | ---- |
| center.x        | 中心点 x 坐标                      | number | 0      |      |
| center.y        | 中心点 y 坐标                      | number | 0      |      |
| center.strength | 力的强度，值越大节点越趋向于中心点 | number | 1      |      |

#### 碰撞力（collide）

| 属性               | 描述                                   | 类型                                       | 默认值 | 必选 |
| ------------------ | -------------------------------------- | ------------------------------------------ | ------ | ---- |
| collide.radius     | 碰撞半径，小于该距离的节点会产生排斥力 | number \| ((node, index, nodes) => number) | 10     |      |
| collide.strength   | 力的强度，值越大排斥效果越明显         | number                                     | 1      |      |
| collide.iterations | 碰撞检测的迭代次数                     | number                                     | 1      |      |

#### 径向力（radial）

| 属性            | 描述                                   | 类型                                       | 默认值 | 必选 |
| --------------- | -------------------------------------- | ------------------------------------------ | ------ | ---- |
| radial.strength | 力的强度，值越大节点越趋向于目标半径   | number \| ((node, index, nodes) => number) | 0.1    |      |
| radial.radius   | 目标半径，节点会被吸引到该半径的圆周上 | number \| ((node, index, nodes) => number) | 100    |      |
| radial.x        | 圆心 x 坐标                            | number                                     | 0      |      |
| radial.y        | 圆心 y 坐标                            | number                                     | 0      |      |

#### X 轴力（x）

| 属性       | 描述                                | 类型                                       | 默认值 | 必选 |
| ---------- | ----------------------------------- | ------------------------------------------ | ------ | ---- |
| x.strength | X 轴方向的力强度                    | number \| ((node, index, nodes) => number) | -      |      |
| x.x        | 目标 x 坐标，节点会被吸引到这个位置 | number \| ((node, index, nodes) => number) | -      |      |

#### Y 轴力（y）

| 属性       | 描述                                | 类型                                       | 默认值 | 必选 |
| ---------- | ----------------------------------- | ------------------------------------------ | ------ | ---- |
| y.strength | Y 轴方向的力强度                    | number \| ((node, index, nodes) => number) | -      |      |
| y.y        | 目标 y 坐标，节点会被吸引到这个位置 | number \| ((node, index, nodes) => number) | -      |      |

## 代码示例

### 防止节点重叠

```js
{
  layout: {
    type: 'd3-force',
    collide: {
      // Prevent nodes from overlapping by specifying a collision radius for each node.
      radius: (d) => d.size / 2,
    },
  },
}
```

效果见 [示例 - 力导向布局防止节点重叠](/examples/layout/force-directed/#prevent-overlap)

### 团队聚类布局

该示例展示了如何使用力导向布局实现团队聚类效果，不同团队的节点会自动聚集在一起。

```js | ob {pin: false}
createGraph(
  {
    autoFit: 'view',
    data: {
      nodes: [
        // 团队 A
        { id: 'A1', team: 'A', label: 'A1', size: 30 },
        { id: 'A2', team: 'A', label: 'A2', size: 20 },
        { id: 'A3', team: 'A', label: 'A3', size: 20 },
        { id: 'A4', team: 'A', label: 'A4', size: 20 },
        // 团队 B
        { id: 'B1', team: 'B', label: 'B1', size: 30 },
        { id: 'B2', team: 'B', label: 'B2', size: 20 },
        { id: 'B3', team: 'B', label: 'B3', size: 20 },
        { id: 'B4', team: 'B', label: 'B4', size: 20 },
        // 团队 C
        { id: 'C1', team: 'C', label: 'C1', size: 30 },
        { id: 'C2', team: 'C', label: 'C2', size: 20 },
        { id: 'C3', team: 'C', label: 'C3', size: 20 },
        { id: 'C4', team: 'C', label: 'C4', size: 20 },
      ],
      edges: [
        // 团队 A 内部连接
        { source: 'A1', target: 'A2' },
        { source: 'A1', target: 'A3' },
        { source: 'A1', target: 'A4' },
        // 团队 B 内部连接
        { source: 'B1', target: 'B2' },
        { source: 'B1', target: 'B3' },
        { source: 'B1', target: 'B4' },
        // 团队 C 内部连接
        { source: 'C1', target: 'C2' },
        { source: 'C1', target: 'C3' },
        { source: 'C1', target: 'C4' },
        // 团队间的少量连接
        { source: 'A1', target: 'B1' },
        { source: 'B1', target: 'C1' },
      ],
    },
    node: {
      style: {
        size: (d) => d.size,
        fill: (d) => {
          // 不同团队使用不同颜色
          const colors = {
            A: '#FF6B6B',
            B: '#4ECDC4',
            C: '#45B7D1',
          };
          return colors[d.team];
        },
        labelText: (d) => d.label,
        labelPlacement: 'center',
        labelFill: '#fff',
      },
    },
    edge: {
      style: {
        stroke: '#aaa',
      },
    },
    layout: {
      type: 'd3-force',
      // 配置链接力 - 团队内部节点更靠近
      link: {
        distance: (d) => {
          // 同一团队内的连接距离更短
          if (d.source.team === d.target.team) return 50;
          // 不同团队间的连接距离更长
          return 200;
        },
        strength: (d) => {
          // 同一团队内的连接强度更大
          if (d.source.team === d.target.team) return 0.7;
          // 不同团队间的连接强度更小
          return 0.1;
        },
      },
      // 配置多体力 - 控制节点间的排斥力
      manyBody: {
        strength: (d) => {
          // 团队领导节点（编号1）的排斥力更强
          if (d.label.endsWith('1')) return -100;
          return -30;
        },
      },
      // 配置碰撞力 - 防止节点重叠
      collide: {
        radius: 35,
        strength: 0.8,
      },
      // 配置中心力 - 保持图形在画布中心
      center: {
        strength: 0.05,
      },
    },
    behaviors: ['drag-element-force'],
  },
  { width: 500, height: 250 },
);
```

<details><summary>展开查看完整代码</summary>

```javascript
import { Graph } from '@antv/g6';

// 创建模拟数据，包含不同团队的节点
const data = {
  nodes: [
    // 团队 A
    { id: 'A1', team: 'A', label: 'A1', size: 30 },
    { id: 'A2', team: 'A', label: 'A2', size: 20 },
    { id: 'A3', team: 'A', label: 'A3', size: 20 },
    { id: 'A4', team: 'A', label: 'A4', size: 20 },
    // 团队 B
    { id: 'B1', team: 'B', label: 'B1', size: 30 },
    { id: 'B2', team: 'B', label: 'B2', size: 20 },
    { id: 'B3', team: 'B', label: 'B3', size: 20 },
    { id: 'B4', team: 'B', label: 'B4', size: 20 },
    // 团队 C
    { id: 'C1', team: 'C', label: 'C1', size: 30 },
    { id: 'C2', team: 'C', label: 'C2', size: 20 },
    { id: 'C3', team: 'C', label: 'C3', size: 20 },
    { id: 'C4', team: 'C', label: 'C4', size: 20 },
  ],
  edges: [
    // 团队 A 内部连接
    { source: 'A1', target: 'A2' },
    { source: 'A1', target: 'A3' },
    { source: 'A1', target: 'A4' },
    // 团队 B 内部连接
    { source: 'B1', target: 'B2' },
    { source: 'B1', target: 'B3' },
    { source: 'B1', target: 'B4' },
    // 团队 C 内部连接
    { source: 'C1', target: 'C2' },
    { source: 'C1', target: 'C3' },
    { source: 'C1', target: 'C4' },
    // 团队间的少量连接
    { source: 'A1', target: 'B1' },
    { source: 'B1', target: 'C1' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      size: (d) => d.size,
      fill: (d) => {
        // 不同团队使用不同颜色
        const colors = {
          A: '#FF6B6B',
          B: '#4ECDC4',
          C: '#45B7D1',
        };
        return colors[d.team];
      },
      labelText: (d) => d.label,
      labelPlacement: 'center',
      labelFill: '#fff',
    },
  },
  edge: {
    style: {
      stroke: '#aaa',
    },
  },
  layout: {
    type: 'd3-force',
    // 配置链接力 - 团队内部节点更靠近
    link: {
      distance: (d) => {
        // 同一团队内的连接距离更短
        if (d.source.team === d.target.team) return 50;
        // 不同团队间的连接距离更长
        return 200;
      },
      strength: (d) => {
        // 同一团队内的连接强度更大
        if (d.source.team === d.target.team) return 0.7;
        // 不同团队间的连接强度更小
        return 0.1;
      },
    },
    // 配置多体力 - 控制节点间的排斥力
    manyBody: {
      strength: (d) => {
        // 团队领导节点（编号1）的排斥力更强
        if (d.label.endsWith('1')) return -100;
        return -30;
      },
    },
    // 配置碰撞力 - 防止节点重叠
    collide: {
      radius: 35,
      strength: 0.8,
    },
    // 配置中心力 - 保持图形在画布中心
    center: {
      strength: 0.05,
    },
  },
  behaviors: ['drag-element-force'],
});

graph.render();
```

</details>

主要配置说明：

- `link.distance`：团队内部距离短，团队间距离长
- `link.strength`：团队内部连接强度大，团队间连接强度小
- `manyBody.strength`：控制节点间排斥力
- `collide`：防止节点重叠
- `center`：保持整体布局在画布中心

还可以参考 [定制不同节点的参数](/examples/layout/force-directed/#functional-params) 示例。
