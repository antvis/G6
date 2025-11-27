---
title: 交互
order: 8
---

## 交互概述

交互（Behavior）是 G6 的核心构建模块，它精确定义了用户与图之间的互动行为。每个 Behavior 插件都是一个高度封装的功能单元，内部集成了特定场景下的事件监听、状态管理和响应处理逻辑。

G6 的内置 Behavior 涵盖了大多数常见交互需求，同时提供了灵活的扩展机制，支持开发者根据业务场景构建定制化交互体验。
有关完整的交互行为类型、配置选项及开发示例，请参阅 [交互总览](/manual/behavior/overview) 章节。

## API 参考

### Graph.getBehaviors()

获取当前图表中所有已配置的交互行为。

```typescript
getBehaviors(): BehaviorOptions;
```

**返回值**

- **类型**: [BehaviorOptions](#behavioroptions)
- **描述**: 当前图表中已配置的所有交互行为

**示例**

```typescript
// 获取当前所有交互行为
const behaviors = graph.getBehaviors();
console.log('当前图表的交互行为:', behaviors);
```

### Graph.setBehaviors(behaviors)

设置图表的交互行为，将替换所有现有的交互行为。

```typescript
setBehaviors(behaviors: BehaviorOptions | ((prev: BehaviorOptions) => BehaviorOptions)): void;
```

**参数**

| 参数      | 描述                                                 | 类型                                                                              | 默认值 | 必选 |
| --------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- | ------ | ---- |
| behaviors | 新的交互行为配置，或一个基于当前配置返回新配置的函数 | [BehaviorOptions](#behavioroptions) \| (prev: BehaviorOptions) => BehaviorOptions | -      | ✓    |

**说明**

设置的交互会全量替换原有的交互，如果需要新增交互可以使用函数式更新：

```typescript
graph.setBehaviors((behaviors) => [...behaviors, { type: 'zoom-canvas' }]);
```

**示例 1**: 设置基本交互

```typescript
// 设置基本交互
graph.setBehaviors([
  'drag-canvas', // 拖拽画布
  'zoom-canvas', // 缩放画布
  'drag-element', // 拖拽元素
]);
```

**示例 2**: 设置带配置的交互

```typescript
graph.setBehaviors([
  // 字符串形式（使用默认配置）
  'drag-canvas',

  // 对象形式（自定义配置）
  {
    type: 'zoom-canvas',
    key: 'my-zoom', // 指定唯一标识，用于后续更新
    sensitivity: 1.5, // 缩放灵敏度
  },

  // 只有节点上启用拖拽
  {
    type: 'drag-element',
    key: 'drag-node-only',
    enable: (event) => event.targetType === 'node', // 仅在节点上启用拖拽
  },
]);
```

**示例 3**: 使用函数式更新

```typescript
// 添加新的交互行为
graph.setBehaviors((currentBehaviors) => [
  ...currentBehaviors,
  {
    type: 'brush-select',
    key: 'selection-brush',
  },
]);

// 替换特定交互行为
graph.setBehaviors((currentBehaviors) => {
  // 过滤掉现有的缩放交互
  const filteredBehaviors = currentBehaviors.filter((behavior) => {
    if (typeof behavior === 'string') return behavior !== 'zoom-canvas';
    return behavior.type !== 'zoom-canvas';
  });

  // 添加新的缩放交互配置
  return [
    ...filteredBehaviors,
    {
      type: 'zoom-canvas',
      key: 'new-zoom',
      enableOptimize: true,
    },
  ];
});
```

### Graph.updateBehavior(behavior)

更新指定的交互行为配置，需要通过 `key` 标识要更新的交互。

```typescript
updateBehavior(behavior: UpdateBehaviorOption): void;
```

**参数**

| 参数     | 描述               | 类型                                          | 默认值 | 必选 |
| -------- | ------------------ | --------------------------------------------- | ------ | ---- |
| behavior | 更新的交互行为配置 | [UpdateBehaviorOption](#updatebehavioroption) | -      | ✓    |

**说明**

如果要更新一个交互，必须在原始交互配置中指定 `key` 字段，以便能够准确找到并更新该交互。

**示例 1**: 更新交互配置

```typescript
// 初始设置交互时指定 key
graph.setBehaviors([
  {
    type: 'zoom-canvas',
    key: 'my-zoom-canvas',
    sensitivity: 1.0,
  },
]);

// 更新交互配置
graph.updateBehavior({
  key: 'my-zoom-canvas', // 指定要更新的交互
  sensitivity: 2.0, // 新的缩放灵敏度
  enableOptimize: true, // 添加新配置
});
```

**示例 2**: 禁用/启用交互

```typescript
// 设置带 key 的行为
graph.setBehaviors([
  {
    type: 'drag-canvas',
    key: 'main-drag',
  },
  {
    type: 'zoom-canvas',
    key: 'main-zoom',
  },
]);

// 禁用拖拽功能
graph.updateBehavior({
  key: 'main-drag',
  enable: false,
});

// 稍后重新启用
setTimeout(() => {
  graph.updateBehavior({
    key: 'main-drag',
    enable: true,
  });
}, 5000);
```

## 类型定义

### BehaviorOptions

```typescript
type BehaviorOptions = (string | CustomBehaviorOption | ((this: Graph) => CustomBehaviorOption))[];

type CustomBehaviorOption = {
  // 交互类型
  type: string;

  // 交互 key，即唯一标识，用于标识交互，从而进一步操作此交互
  key?: string;

  // 针对不同类型的交互，还可能有其他配置项
  [configKey: string]: any;
};
```

### UpdateBehaviorOption

```typescript
type UpdateBehaviorOption = {
  // 要更新的交互的唯一标识
  key: string;

  // 其他要更新的配置项
  [configKey: string]: unknown;
};
```
