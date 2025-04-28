# Dagre 布局

## 概述

Dagre 是一种层次化布局，适用于有向无环图（DAG）的布局场景，能够自动处理节点之间的方向和间距，支持水平和垂直布局。参考更多 Dagre 布局[样例](https://g6.antv.antgroup.com/examples#layout-dagre)或[源码](https://github.com/dagrejs/dagre/blob/master/lib/layout.js)以及[官方文档](https://github.com/dagrejs/dagre/wiki)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2uMmRo5wYPUAAAAAAAAAAABkARQnAQ' width=350 alt='Dagre布局'/>

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'dagre',
    rankdir: 'TB',
    align: 'UL',
    nodesep: 50,
    ranksep: 50,
    controlPoints: false,
  },
});
```

## 配置项

> 更多配置项可参考[官方文档](https://github.com/dagrejs/dagre/wiki#configuring-the-layout)

<img src="https://img.alicdn.com/imgextra/i3/O1CN01OpQHBZ1HcpZuWZLS7_!!6000000000779-0-tps-1274-1234.jpg" width="400" alt="Dagre 布局配置项图解" />

| 属性          | 描述                                                                                                                                          | 类型                                                | 默认值            | 必选 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------- | ---- |
| type          | 布局类型                                                                                                                                      | `dagre`                                             | -                 | ✓    |
| rankdir       | 布局方向，可选值                                                                                                                              | `TB` \| `BT` \| `LR` \| `RL`                        | `TB`              |      |
| align         | 节点对齐方式，可选值                                                                                                                          | `UL` \| `UR` \| `DL` \| `DR`                        | `UL`              |      |
| nodesep       | 节点间距（px）。在rankdir 为 `TB` 或 `BT` 时是节点的水平间距；在rankdir 为 `LR` 或 `RL` 时代表节点的竖直方向间距                              | number                                              | 50                |      |
| ranksep       | 层间距（px）。在rankdir 为 `TB` 或 `BT` 时是竖直方向相邻层间距；在rankdir 为 `LR` 或 `RL` 时代表水平方向相邻层间距                            | number                                              | 100               |      |
| ranker        | 为每个节点分配等级的算法，共支持三种算法，分别是：`longest-path` 最长路径算法、`tight-tree` 紧凑树算法、`network-simplex` 网络单形法          | `network-simplex` \| `tight-tree` \| `longest-path` | `network-simplex` |      |
| nodeSize      | G6自定义属性，统一指定或为每个节点指定节点大小。如果仅返回单个number，则表示节点的宽度和高度相同；如果返回一个数组，则形如：`[width, height]` | number \| number[] \| () => (number \| number[])    |                   |      |
| controlPoints | 是否保留边的控制点                                                                                                                            | boolean                                             | false             |      |

### rankdir

> `TB` | `BT` | `LR` | `RL`， **Default**: `TB`

布局方向

- `TB`：从上到下；

<img src='https://img.alicdn.com/imgextra/i3/O1CN01ulI3Se1DeQUfhQ29v_!!6000000000241-0-tps-1092-1218.jpg' width=170 alt='：从上到下布局'/>

- `BT`：从下到上；

<img src='https://img.alicdn.com/imgextra/i1/O1CN01IfytBS1EOE6NXVprx_!!6000000000341-0-tps-1004-1236.jpg' width=170 alt='从下到上布局'/>

- `LR`：从左到右；

<img src='https://img.alicdn.com/imgextra/i2/O1CN01tpEdMJ1MsTBKpoP6r_!!6000000001490-0-tps-1452-786.jpg' width=170 alt='从左到右布局'/>

- `RL`：从右到左。

<img src='https://img.alicdn.com/imgextra/i4/O1CN01Lw8JHC27j71xd0wl9_!!6000000007832-0-tps-1460-848.jpg' width=170 alt='水平布局'/>

### align

> `UL` | `UR` | `DL` | `DR`， **Default**: `UL`

节点对齐方式

- `UL`：左上对齐
- `UR`：右上对齐
- `DL`：左下对齐
- `DR`：右下对齐

### nodesep

> number， **Default**: 50

节点间距（px）。在rankdir 为 `TB` 或 `BT` 时是节点的水平间距；在rankdir 为 `LR` 或 `RL` 时代表节点的竖直方向间距

### ranksep

> number， **Default**: 50

层间距（px）。在rankdir 为 `TB` 或 `BT` 时是竖直方向相邻层间距；在rankdir 为 `LR` 或 `RL` 时代表水平方向相邻层间距

### ranker

> `network-simplex` | `tight-tree` | `longest-path`， **Default**: `network-simplex`

为每个节点分配层级的算法，共支持三种算法，分别是：

- `longest-path`： 最长路径算法，使用DFS深度优先搜索，递归查找每个节点的最长路径。优点是计算简单速度快，但会导致长边过多；
- `tight-tree`： 紧凑树算法，一种优化算法，目的是减少长边的数量。先用最长路径算法`longest-path`计算出初始层级，然后调整松弛边的长度，从而构建可行树。
- `network-simplex`： 网络单形法，参考算法[A Technique for Drawing Directed Graphs](https://www.graphviz.org/documentation/TSE93.pdf)，核心思想是迭代修改节点的层级，缩小松弛边。

### nodeSize

> number \| number[] \| () => (number \| number[])

G6自定义属性，统一指定或为每个节点指定节点大小。如果仅返回单个number，则表示节点的宽度和高度相同；如果返回一个数组，则形如：`[width, height]`

```js
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 20;
  return [10, 20];
};
```

### controlPoints

> boolean， **Default**: false

是否保留边的控制点。

## 布局适用场景

- **流程图**：适合展示流程图，节点之间的方向和间距会自动处理；
- **依赖关系图**：展示软件包或模块之间的依赖关系；
- **任务调度图**：展示任务之间的依赖关系和执行顺序。

## 相关文档

> 以下文档可以帮助你更好地理解Dagre 布局

- [图布局算法｜详解 Dagre 布局](https://mp.weixin.qq.com/s/EdyTfFUH7fyMefNSBXI2nA)
- [深入解读Dagre布局算法](https://www.yuque.com/antv/g6-blog/xxp5nl)
