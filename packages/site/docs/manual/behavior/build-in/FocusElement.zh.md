---
title: FocusElement 聚焦元素
---

## 概述

FocusElement 是 G6 中用于实现元素聚焦功能的内置交互，支持通过点击元素将其聚焦到视图中心。这个交互可以帮助用户快速定位和关注特定的图元素。

## 使用场景

- 快速将关注的节点或边居中显示

## 在线体验

<embed src="@/common/api/behaviors/focus-element.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['focus-element'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'focus-element',
      animation: {
        duration: 500,
        easing: 'ease-in',
      },
    },
  ],
});
```

## 配置项

| 配置项    | 说明             | 类型                                                            | 默认值                                 | 必选 |
| --------- | ---------------- | --------------------------------------------------------------- | -------------------------------------- | ---- |
| type      | 交互类型名称     | string                                                          | `focus-element`                        | ✓    |
| animation | 聚焦动画效果设置 | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | `{ duration: 500, easing: 'ease-in' }` |      |
| enable    | 是否启用聚焦功能 | boolean \| ((event: IElementEvent) => boolean)                  | true                                   |      |

### ViewportAnimationEffectTiming

```typescript
type ViewportAnimationEffectTiming =
  | boolean // true 启用默认动画，false 禁用动画
  | {
      easing?: string; // 动画缓动函数：'ease-in-out'、'ease-in'、'ease-out'、'linear'
      duration?: number; // 动画持续时间(毫秒)
    };
```

## 代码示例

### 基础聚焦功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['focus-element'],
});
```

### 自定义动画效果

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'focus-element',
      animation: {
        duration: 800,
        easing: 'ease-in-out',
      },
    },
  ],
});
```

### 条件性启用聚焦

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'focus-element',
      enable: (event) => {
        // 只对节点启用聚焦，边不聚焦
        return event.target.type === 'node';
      },
    },
  ],
});
```

## 实际案例

<Playground path="behavior/focus/demo/basic.js" rid="focus-element"></Playground>

## API

### FocusElement.destroy()

```typescript
destroy(): void;
```
