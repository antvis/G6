---
title: D3Force3D 3D 力导向布局
---

## 配置项

### alpha

> _number_

当前的迭代收敛阈值

### alphaDecay

> _number_

迭代阈值的衰减率。范围 [0, 1]。0.028 对应迭代数为 300

### alphaMin

> _number_

停止迭代的阈值

### alphaTarget

> _number_

设置目标迭代收敛阈值

### center

> _false \| { x?: number; y?: number; strength?: number; }_

中心力

### collide

> _false \| { radius?: number \| ((node: Node, index: number, nodes: Node[]) => number); strength?: number; iterations?: number; }_

碰撞力

### forceSimulation

> _Simulation<Node, Edge>_

自定义 force 方法，若不指定，则使用 d3.js 的方法

### iterations

> _number_

迭代次数

Number of iterations 设置的是力的迭代次数，而不是布局的迭代次数

### link

> _false \| { id?: (edge: Edge, index: number, edges: Edge[]) => string; distance?: number \| ((edge: Edge, index: number, edges: Edge[]) => number); strength?: number \| ((edge: Edge, index: number, edges: Edge[]) => number); iterations?: number; }_

链接力

### manyBody

> _false \| { strength?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); theta?: number; distanceMin?: number; distanceMax?: number; }_

多体力

### nodeSize

> _number \| ((node: NodeData, index: number, nodes: NodeData[]) => number)_ **Default:** `10`

节点大小（直径）。用于防止节点重叠时的碰撞检测

### onTick

> _(data: LayoutMapping) => void_

每次迭代执行回调

### radial

> _false \| { strength?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); radius?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); x?: number; y?: number; }_

径向力

### randomSource

> _() => number_

设置用于生成随机数的函数

### velocityDecay

> _number_

指定衰减因子

### x

> _false \| { strength?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); x?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); }_

X 轴力

### y

> _false \| { strength?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); y?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); }_

Y 轴力

### center

> _false \| { x?: number; y?: number; z?: number; strength?: number; }_

中心力 Center force

### numDimensions

> _number_

### radial

> _false \| { strength?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); radius?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); x?: number; y?: number; z?: number; }_

径向力

### z

> _false \| { strength?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); z?: number \| ((node: NodeData, index: number, nodes: NodeData[]) => number); }_

Z 轴力
