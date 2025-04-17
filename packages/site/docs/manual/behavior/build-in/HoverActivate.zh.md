---
title: HoverActivate 悬停激活
---

## 概述

HoverActivate 是 G6 中用于实现元素悬停激活效果的内置交互，当鼠标悬停在节点或边上时，会自动触发高亮、显示等视觉反馈。该交互是图可视化中增强数据探索的重要手段，有助于用户快速聚焦目标元素并获取相关信息。

## 使用场景

这一交互主要用于：

- 在复杂关系图中快速定位关注元素
- 通过悬停信息展示节点额外信息
- 分析节点间关联关系时，通过激活边凸显连接路径

## 在线体验

<embed src="@/common/api/behaviors/hover-activate.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['hover-activate'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'hover-activate',
      key: 'hover-activate-1', // 为交互指定标识符，方便动态更新
    },
  ],
});
```

## 配置项

| 配置项        | 说明                 | 类型                                           | 默认值           | 必选 |
| ------------- | -------------------- | ---------------------------------------------- | ---------------- | ---- |
| type          | 交互类型名称         | string                                         | `hover-activate` | ✓    |
| animation     | 是否开启动画效果     | boolean                                        | true             |      |
| enable        | 是否开启悬浮元素功能 | boolean \| ((event: IPointerEvent) => boolean) | true             |      |
| degree        | 激活元素的n度关系    | number \| ((event: IPointerEvent) => number);  | 0                |      |
| direction     | 指定边方向           | `both` \| `in` \| `out`                        | `both`           |      |
| state         | 激活元素的状态       | string                                         | `active`         |      |
| inactiveState | 不激活元素的状态     | string                                         | -                |      |
| onHover       | 当元素被悬停时的回调 | (event: IPointerEvent) => void                 | -                |      |
| onHoverEnd    | 当悬停结束时的回调   | (event: IPointerEvent) => void                 | -                |      |

### enable

`enable` 用于控制是否开启元素的悬浮高亮，可接收一个函数来动态控制
例如：只有节点开启悬浮高亮

```typescript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'hover-activate',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

## 代码示例

### 基础悬浮用法

```typescript
const graph = new Graph({
  // 其他配置...
  behaviors: ['hover-activate'],
});
```

### 节点触发高亮

```typescript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'hover-activate',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

### 流程图移入节点 下一步节点高亮

```typescript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'hover-activate',
      degree: 1,
      direction: 'out',
      enable: (e) => {
        if (e.targetType === 'node') {
          return true;
        }
        return false;
      },
    },
  ],
});
```

## 实际案例

<Playground path="behavior/highlight-element/demo/basic.js" rid="default-hover-activate"></Playground>
