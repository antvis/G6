---
title: 自定义主题
order: 4
---

## 概述

G6 中的主题是 Graph Options 的子集，它包含了关于画布和元素样式的配置。主题可以帮助你快速地切换不同的图样式。

## 定制主题

对于元素样式来说，主题中的配置都是静态的，不支持使用回调函数动态计算样式，同时 `type` 也不支持在主题中配置。一个主题包含以下配置：

- `background` 画布背景颜色
- `node` 节点样式
- `edge` 边样式
- `combo` 组合样式

下面是一个简单的主题配置示例：

```typescript
const theme = {
  background: '#fff',
  node: {
    style: {
      fill: '#e1f3fe',
      lineWidth: 0,
    },
    selected: {
      style: {
        fill: '#3b71d6',
        lineWidth: 1,
      },
    },
  },
  edge: {
    // ...
  },
  combo: {
    // ...
  },
};
```

❌ 错误示例

```typescript
const theme = {
  node: {
    // ❌ 主题不支持配置元素类型
    type: 'rect',
    style: {
      // ❌ 主题不支持回调函数
      fill: (d) => d.style.color,
    },
  },
};
```

:::warning{title=注意}
对于元素状态样式来说，请确保状态样式中的每一个属性在默认样式(style)中都有对应的默认样式，否则可能会导致无法清除状态样式。
:::

## 注册主题

通过 G6 提供的 register 方法注册即可，下面是一个示例：

```typescript
import { register, ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.THEME, 'custom-theme', theme);
```

## 配置主题

要启用并配置主题，需要在实例化 `Graph` 时传入 `theme` 配置项：

```typescript
{
  theme: 'custom-theme',
}
```

### 切换主题

在 `Graph` 实例化后可以通过 [setTheme](/api/graph/method#setTheme) 方法切换主题：

```typescript
graph.setTheme('dark');
```

此外你还可以通过 `getTheme` 方法获取当前主题：

```typescript
graph.getTheme();
// => 'dark'
```
