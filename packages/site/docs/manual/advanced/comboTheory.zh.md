---
title: Combo 实现原理
order: 3
---

## Combo 渲染视觉层级逻辑

当图中只有 Node 和 Edge 而不存在 Combo 时，所有 Edge 的「视觉层级 zIndex」默认低于所有的 Node。但增加嵌套的 Combo 后，元素间的视觉层级需要较复杂的规则定义，方能符合合理的逻辑。为了方便说明，我们用 z(X) 表示 X 元素的视觉层级值。

- 规则一：单层 Combo 中各元素层级关系是 z(Node) > z(Edge) > z(Combo)，如下所示：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q96OSKiu_F8AAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> z(a) = z(b) > z(e0) > z(Combo A)

- 规则一补充：假设 Combo A 内部的子元素包括子 Combo 及节点，且节点间存在边，则：z(子 Combo) > z(Node) > z(Edge) > z(Combo A 本身)，示例如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wKcnQoN4c-MAAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> z(b1) = z(b2) > z(e2) > z(Combo B) > z(a1) = z(a2) > z(e1) > z(Combo A)

- 规则二：通过规则一，可以得到所有 Combo 及 Node 的视觉层级值。若存在某条边 E 的两个端点 a 与 b 来自不同的 Combo，已知 z(a) 与 z(b)，则 z(E) 为 max(z(a), z(b)) 所在 Combo 内边的层级，即：
  - 当 z(a) > z(b) 时，z(E) 等于 a 所在 Combo 内边的层级；
  - 当 z(a) <= z(b)，z(E) 等于 b 所在 Combo 内边的层级。

以下图为例，图中红色标注的边属于上述情况：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dQwAQr0lCjQAAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> z(e4) = z(e2) z(e5) = z(e2) z(e6) = z(e1)=z(e3)

- 规则二补充：在上图的基础上，Combo B 收起后，如下左图；Combo A 收起后，如下右图。可以发现，在收缩一个 Combo 后，隐藏了与该 Combo 相关的节点及边，而增加了虚拟边来表示有外部元素连接到该 Combo 内的元素。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RTF-Q5NgVtMAAAAAAAAAAABkARQnAQ' width=350 alt="img" />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sN2BRproFKQAAAAAAAAAAABkARQnAQ' width=350 alt="img" />

## Combo 布局原理

Combo 使用带有不重叠约束的力导型布局方法，Combo 布局分为以下三种情况：

1. 布局最细粒度所有元素；
2. 交互展开一个 Combo；
3. 交互收起一个 Combo。

力导向布局的原则：所有点对之间存在斥力 `Fr = k/r2`，边连接的点对之间存在引力 `Fa = ks * r`，其中 `r` 为两个节点之间的距离，`k` 与 `ks` 为系数。

#### 为边上的引力 Fa 添加系数 m = f(c)

- 「跨组边」—— 边两端节点来自不同的 Combos，减弱其引力大小，即 `m = f(c) < 1`。图中所有标出的边都为跨组边。跨越层数越多，减弱程度越高。如 `e46`、`e23`、`e12`、`e15` 跨越了一层，`e34`、`e13` 跨越了两层。因此 `f(c)` 是关于跨越层数(c)的函数，可以是 `m = 1/c` 等；
- 「同组边」—— 边两端节点来自相同 Combo，则引力定义方式不变，即 `m = f(c) = 1`。

#### 增加 Combo 的中心力

- 为方便描述，我们为 Combo X 定义层级的高低值 `P(X)`。如下图所示，A、B、C、D 四个组的层级高低：`P(A) > P(B) > P(C) > P(D)`；
- 每个 Combo 中有由分组内节点当前的平均位置中心发出的重力，该平均中心根据每次迭代的节点位置进行更新；
- `P(X)` 越小，其发出的重力 `G(X)` 越大。例如 `G(X) = 1/P(X)`；
- 有些节点可能受到多个重力。例如下图 6 号节点，受到了它上层红色 Combo C 的重力 `G(C)`，绿色 Combo B 的重力 `G(B)`，黄色 Combo A 的重力 `G(A)`。`G(C) > G(B) > G(A)`。

#### 迭代中的重叠检测

- 每次迭代检测节点之间是否存在重叠：
  - 若两个节点之间存在重叠，则为二者间的斥力乘以一个放大系数 `R`，使之斥开。
- 每次迭代（或每 `q` 次迭代）检测 Combo 之间是否存在重叠：
  - 首先计算最小能够包围该组内元素的圆形或矩形（根据 Combo Type 决定）；
  - 计算至上而下遍历，检测每个 Combo 内层级相同的子 Combos 是否存在重叠；
  - 若存在重叠则加大该 Combo 的重力。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Eu4FRJVqPScAAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> 相同颜色的 border 代表了相同的层级，该图层级由高到低分别是：A > B > C > D
