---
title: 蛇形布局 Snake
order: 21
---

## 概览

蛇形布局（Snake Layout）是一种特殊的图形布局方式，能够在较小的空间内更有效地展示长链结构。需要注意的是，其图数据需要确保节点按照从源节点到汇节点的顺序进行线性排列，形成一条明确的路径。

节点按 S 字型排列，第一个节点位于第一行的起始位置，接下来的节点在第一行向右排列，直到行末尾。到达行末尾后，下一行的节点从右向左反向排列。这个过程重复进行，直到所有节点排列完毕。

## 使用场景

适合需要紧凑呈现线性关系的场景：

- **长流程可视化**

  完美适配流程步骤过多的场景，如审批流程、生产线工序、物流运输路径等。

- **有限空间内的层级结构**

  层级结构过长但画布受限，需通过折叠行节省空间，比如 API 调用依赖（客户端 → 网关 → 服务A → 服务B → 数据库，蛇形布局将 5 层压缩为 2 行）、文件目录树（深度嵌套的文件夹结构，如 src/components/utils/helpers/... ，用蛇形布局横向折叠子目录）。

## 在线体验

<embed src="@/common/api/layouts/snake.md"></embed>

## 配置项

> 如果布局有其特定的属性，我们将在下面列出。对于所有布局的通用属性，见[布局通用配置项](/manual/layout/base-layout)

| 属性                    | 描述                               | 类型                                               | 默认值                                 | 必选 |
| ----------------------- | ---------------------------------- | -------------------------------------------------- | -------------------------------------- | ---- |
| type                    | 布局类型                           | snake                                              | -                                      | ✓    |
| [clockwise](#clockwise) | 节点排布方向是否顺时针             | boolean                                            | true                                   |      |
| colGap                  | 节点列之间的间隙大小               | number                                             | 默认将根据画布宽度和节点总列数自动计算 |      |
| cols                    | 节点列数                           | number                                             | 5                                      |      |
| nodeSize                | 节点尺寸                           | Size \| ((node: NodeData) => Size)                 | -                                      |      |
| padding                 | 内边距，即布局区域与画布边界的距离 | number \| number[]                                 | 0                                      |      |
| rowGap                  | 节点行之间的间隙大小               | number                                             | 默认将根据画布高度和节点总行数自动计算 |      |
| sortBy                  | 节点排序方法                       | (nodeA: NodeData, nodeB: NodeData) => -1 \| 0 \| 1 | 默认按照在图中的路径顺序进行展示       |      |

### clockwise

- 在顺时针排布时，节点从左上角开始，第一行从左到右排列，第二行从右到左排列，依次类推，形成 S 型路径。

- 在逆时针排布时，节点从右上角开始，第一行从右到左排列，第二行从左到右排列，依次类推，形成反向 S 型路径。

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
  edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'snake',
    padding: 50,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```
