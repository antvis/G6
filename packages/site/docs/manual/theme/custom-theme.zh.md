---
title: 自定义主题
order: 2
---

除了使用内置主题外，G6 还支持创建自定义主题来满足特定的视觉需求。本文将介绍如何创建和使用自定义主题。

## 创建自定义主题

一个自定义主题需要遵循主题的基本结构，包含画布背景色和元素样式配置：

```javascript
const customTheme = {
  // 1. 画布背景色
  background: '#f0f0f0',

  // 2. 节点配置
  node: {
    // 调色板配置
    palette: {
      type: 'group',
      color: ['#1783FF', '#00C9C9' /* 自定义颜色... */],
    },
    // 基础样式
    style: {
      fill: '#fff',
      stroke: '#d9d9d9',
      lineWidth: 1,
      // ... 其他节点样式
    },
    // 状态样式
    state: {
      selected: {
        fill: '#e8f3ff',
        stroke: '#1783FF',
      },
      // ... 其他状态样式
    },
  },

  // 3. 边配置
  edge: {
    style: {
      stroke: '#d9d9d9',
      lineWidth: 1,
      // ... 其他边样式
    },
    state: {
      // ... 状态样式
    },
  },

  // 4. Combo 配置
  combo: {
    style: {
      fill: '#f7f7f7',
      stroke: '#d9d9d9',
      // ... 其他 Combo 样式
    },
    state: {
      // ... 状态样式
    },
  },
};
```

## 使用限制

在创建自定义主题时，需要注意以下限制：

1. **仅支持静态值**

   ```javascript
   // ❌ 错误示例：不支持回调函数
   const theme = {
     node: {
       style: {
         fill: (d) => d.style.color,
       },
     },
   };
   ```

2. **不支持配置元素类型**

   ```javascript
   // ❌ 错误示例：不支持在主题中配置元素类型
   const theme = {
     node: {
       type: 'rect',
       style: {
         fill: '#fff',
       },
     },
   };
   ```

3. **状态样式需要对应默认样式**
   ```javascript
   // ✅ 正确示例：状态样式的属性在默认样式中都有定义
   const theme = {
     node: {
       style: {
         fill: '#fff',
         stroke: '#000',
       },
       state: {
         selected: {
           fill: '#e8f3ff',
           stroke: '#1783FF',
         },
       },
     },
   };
   ```

## 应用自定义主题

先注册主题，然后通过名称引用：

```javascript
// 1. 注册主题
import { register, ExtensionCategory } from '@antv/g6';
register(ExtensionCategory.THEME, 'custom-theme', customTheme);

// 2. 使用主题
const graph = new Graph({
  theme: 'custom-theme',
  // ... 其他配置
});
```
