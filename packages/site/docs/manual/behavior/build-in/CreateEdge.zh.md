---
title: CreateEdge 创建边
---

## 概述

CreateEdge 是 G6中用于实现画布中交互式创建边(Edge)的内置交互，通过拖拽或点击节点创建边，支持自定义样式。这是图可视化中最常见的交互之一，使用户能够在可视化图中动态调整数据结构，实现更高效的交互编辑体验。

## 使用场景

这一交互主要用于：

- 需要交互式创建节点间连接关系的场景，如流程图、知识图谱等

## 在线体验

<embed src="@/common/api/behaviors/create-edge.md"></embed>

## 基本用法

在图配置中添加这一交互

```javascript
// 使用默认配置
const graph = new Graph({
    // 其他配置...
    behaviors: ['create-edge'], // 直接添加，使用默认配置
});

// 或使用自定义配置
const graph = new Graph({
    // 其他配置
    behaviors: [
        {
            type: 'create-edge',
            trigger: 'click', // 交互配置，通过点击创建边
            style: {} // 边自定义样式
        }
    ]
});

```

## 配置项

| 配置项        | 说明          | 类型         | 默认值            | 必选 |
| -------------- | -------------------------------------------------------- | ------------ | ------------ | ---- |
| type         | 交互类型名称                            | string                   | `create-edge` | √   |
| trigger      | 触发新建边的方式，支持点击(click)或拖拽(drag)          | string                 | `drag` |      |
| enable       | 是否启用该交互                           |  boolean \| ((event:_ [Event](/api/event#事件对象属性)_) => boolean)                           | true   |           |
| onCreate     | 创建边回调函数，返回边数据                   | (edge: [EdgeData](/manual/data#边数据edgedata)) => [EdgeData](/manual/data#边数据edgedata))       | -            |       |
| onFinish     | 成功创建边回调函数                       | (edge: [EdgeData](/manual/data#边数据edgedata)) => void     | -                     |       |
| style        | 新建边的样式配置                         | edgeStyle: object         | -                           |    |


### style

`style`主要配置的是新建边的样式

```javascript
{
    style: {
        fill: 'red',
        lineWidth: 2
    }
}
```

## API

### destroy()

`destroy` 方法用于销毁 `CreateEdge` 的交互行为，释放相关资源，防止内存泄漏或交互冲突

```javascript
CreateEdge.destroy();
```

> `destroy` 是彻底销毁，如果仅需要移除，请使用 `removeBehavior` 方法

## 代码示例

### 基础创建边功能

```javascript
const graph = new Graph({
    container: 'container',
    width: 800,
    height: 600,
    behaviors: ['create-edge'],
})
```

### 自定义创建边功能

```javascript
const graph = new Graph({
    // 其他配置,
    behaviors: [
        {
            type: 'create-edge',
            style: {
                fill: red,
                lineWidth: 3
            }
        }
    ]
})
```

### 使用点击创建边

```javascript
const graph = new Graph({
    // 其他配置
    behaviors: [
        {
            type: 'create-edge',
            trigger: 'click'
        }
    ]
})
```

### 销毁交互示例

```javascript
const graph = new Graph({
    container: 'container',
    modes: {
        default: ['create-edge']
    },
});

// 获取 CreateEdge 交互实例
const createEdgeBehavior = graph.get('modes').default.find(b => b.type === 'create-edge');

// 销毁 CreateEdge 交互
if(createEdgeBehavior) {
    createEdgeBehavior.destroy();
}
```

## 实际案例

<Playground path="behavior/create-edge/demo/by-drag.js" rid="default-create-edge"></Playground>
