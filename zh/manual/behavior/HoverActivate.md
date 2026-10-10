---
title: "悬停激活 HoverActivate"
description: "悬停激活 HoverActivate"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/behavior/HoverActivate/"
version: "5.1.1"
---

## 概述

HoverActivate 是 G6 中用于实现元素悬停激活效果的内置交互，当鼠标悬停在节点或边上时，会自动触发高亮、显示等视觉反馈。该交互是图可视化中增强数据探索的重要手段，有助于用户快速聚焦目标元素并获取相关信息。

## 使用场景

这一交互主要用于：

- 在复杂关系图中快速定位关注元素
- 通过悬停信息展示节点额外信息
- 分析节点间关联关系时，通过激活边凸显连接路径

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 } },
        { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 } },
        { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
        { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
        { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
        { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
        { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
        { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
        { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
        { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
        { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
        { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
        { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
        { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
        { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
        { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
        { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
      ],
      edges: [
        { source: 'node0', target: 'node1', label: '0-1' },
        { source: 'node0', target: 'node2', label: '0-2' },
        { source: 'node0', target: 'node3', label: '0-3' },
        { source: 'node0', target: 'node4', label: '0-4' },
        { source: 'node0', target: 'node5', label: '0-5' },
        { source: 'node1', target: 'node6', label: '1-6' },
        { source: 'node1', target: 'node7', label: '1-7' },
        { source: 'node2', target: 'node8', label: '2-8' },
        { source: 'node2', target: 'node9', label: '2-9' },
        { source: 'node2', target: 'node10', label: '2-10' },
        { source: 'node2', target: 'node11', label: '2-11' },
        { source: 'node2', target: 'node12', label: '2-12' },
        { source: 'node2', target: 'node13', label: '2-13' },
        { source: 'node3', target: 'node14', label: '3-14' },
        { source: 'node3', target: 'node15', label: '3-15' },
        { source: 'node3', target: 'node16', label: '3-16' },
      ],
    },
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'hover-activate', type: 'hover-activate' }],
    autoFit: 'center',
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'hover-activate',
      type: 'hover-activate',
      animation: true,
      enable: true,
      degree: 1,
      direction: 'both',
    };
    const optionFolder = gui.addFolder('Hover Activate Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 10, 1);
    optionFolder.add(options, 'direction', {
      both: ['both'],
      in: ['in'],
      out: ['out'],
    });

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'hover-activate',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



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



```ts

import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      behaviors: ['hover-activate'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
```
### demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
