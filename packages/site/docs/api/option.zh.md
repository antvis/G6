---
title: 图配置项
order: 7
---

## 图配置项概述

G6 图实例的 [配置项](/manual/graph/option) 控制着图的各个方面，包括画布设置、视口属性、数据、布局、样式、交互行为、插件等。通过合理配置这些选项，可以灵活定制图的外观和行为。

配置项可以在图实例创建时指定，也可以通过 API 在运行时动态修改。某些基础配置（如 devicePixelRatio、container）修改后需要销毁并重新创建图实例才能生效。

## API 参考

### Graph.getOptions()

获取当前图表的所有配置项。

```typescript
getOptions(): GraphOptions;
```

**返回值**

- **类型**: [GraphOptions](/manual/graph/option)
- **描述**: 当前图表的完整配置项

**示例**

```typescript
// 获取当前图表的配置项
const options = graph.getOptions();
console.log('当前图表配置:', options);

// 获取特定配置
console.log('当前画布宽度:', options.width);
console.log('当前布局配置:', options.layout);
```

### Graph.setOptions(options)

更新图表的配置项。

```typescript
setOptions(options: GraphOptions): void;
```

**参数**

| 参数    | 描述       | 类型                                 | 默认值 | 必选 |
| ------- | ---------- | ------------------------------------ | ------ | ---- |
| options | 新的配置项 | [GraphOptions](/manual/graph/option) | -      | ✓    |

**说明**

⚠️ **注意**: 要更新 devicePixelRatio、container 等基础属性，需要销毁当前图实例后重新创建。其他大部分配置可以动态更新。

**示例 1**: 基本用法

```typescript
// 更新图表配置
graph.setOptions({
  width: 1000, // 更新宽度
  height: 800, // 更新高度
  autoFit: true, // 开启自适应
  animation: true, // 启用动画
});
```

**示例 2**: 更新主题

```typescript
// 更新图表主题配置
graph.setOptions({
  theme: {
    type: 'dark', // 切换到暗色主题
    // 自定义主题配置
    node: {
      palette: ['#1AAF8B', '#F8E71C', '#8B572A', '#7ED321'],
    },
    edge: {
      palette: ['#F5A623', '#F8E71C', '#8B572A', '#7ED321'],
    },
  },
});
```

**示例 3**: 更新布局配置

```typescript
// 更新布局配置
graph.setOptions({
  layout: {
    type: 'force', // 切换到力导向布局
    preventOverlap: true,
    nodeStrength: -50,
    edgeStrength: 0.7,
  },
});
```

**示例 4**: 更新节点和边的默认配置

```typescript
// 更新节点和边的默认样式配置
graph.setOptions({
  node: {
    style: {
      fill: '#91d5ff',
      stroke: '#40a9ff',
      lineWidth: 1,
      radius: 10,
    },
  },
  edge: {
    style: {
      stroke: '#91d5ff',
      lineWidth: 2,
      endArrow: true,
    },
  },
});
```
