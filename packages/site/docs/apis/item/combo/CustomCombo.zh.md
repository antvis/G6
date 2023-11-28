---
title: 自定义 Combo
order: 3
---

在 G6 中，如果内置 Combo 不能满足特定需求，可以通过扩展已有的 Combo 类型来创建自定义 Combo。这允许您利用 G6 强大的内置功能的同时，为 Combo 添加特有的逻辑和样式。[带有 Marker 的 Circle DEMO](/zh/examples/item/customCombo#cCircle)。

可以通过继承内置的 Combo （例如 CircleCombo），来创建自定义 Combo 。可继承图形参见： [Combo 类型](/manual/customize/extension-cats#3-combo-类型-combos)

## 示例

```typescript
import { Graph, Extensions, extend } from '@antv/g6';

// 自定义节点类型，继承一个已有的 Combo 类型或节点基类 Extensions.BaseNode
class CustomCombo extends Extensions.CircleCombo {
  // 覆写方法，可覆写的类方法见下文
}

const ExtGraph = extend(Graph, {
  // 注册自定义节点
  combos: {
    'custom-combo': CustomCombo,
  },
});

const graph = new ExtGraph({
  // ... 其他配置
  combo: {
    type: 'custom-combo', // 使用注册的 Combo
  },
});
```

## 覆写方法

> ⚠️ 注意：`Combo` 的实现继承自基类 `BaseNode`，可以看作是一个 “特殊” 的节点。

<embed src="../../../common/BaseNodeOverrideMethod.zh.md"></embed>

## 成员属性及方法

`BaseNode` 及其子类提供了一些成员属性和方法，用于方便地新增或更新图形。

<embed src="../../../common/PluginMergedStyles.zh.md"></embed>

<embed src="../../../common/PluginUpsertShape.zh.md"></embed>
