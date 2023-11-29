---
title: 自定义节点
order: 13
---

在 G6 中，如果内置节点不能满足特定需求，可以通过扩展已有的节点类型来创建自定义节点。这允许您利用 G6 强大的内置功能的同时，为节点添加特有的逻辑和样式。

可以通过继承内置的节点（例如 CircleNode），来创建自定义节点。可继承图形参见： [节点类型](/manual/customize/extension-cats#1-%E8%8A%82%E7%82%B9%E7%B1%BB%E5%9E%8Bnodes)

## 示例

```typescript
import { Graph, Extensions, extend } from '@antv/g6';

// 自定义节点类型，继承一个已有的节点类型或节点基类 Extensions.BaseNode
class CustomNode extends Extensions.CircleNode {
  // 覆写方法，可覆写的类方法见下文
}

const ExtGraph = extend(Graph, {
  // 注册自定义节点
  nodes: {
    'custom-node': CustomNode,
  },
});

const graph = new ExtGraph({
  // ... 其他配置
  node: {
    type: 'custom-node', // 使用注册的节点
  },
});
```

## 覆写方法

<embed src="../../../common/BaseNodeOverrideMethod.zh.md"></embed>

## 成员属性及方法

`BaseNode` 及其子类提供了一些成员属性和方法，用于方便地新增或更新图形。

<embed src="../../../common/PluginMergedStyles.zh.md"></embed>

<embed src="../../../common/PluginUpsertShape.zh.md"></embed>
