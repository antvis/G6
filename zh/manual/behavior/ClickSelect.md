---
title: "点击选中 ClickSelect"
description: "点击选中 ClickSelect"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/behavior/ClickSelect/"
version: "5.1.1"
---

## 概述

当鼠标点击元素时，会使元素高亮。

## 使用场景

这一交互主要用于：

- 聚焦元素
- 查看元素详情
- 查看元素关系

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 280, y: 60, fill: '#E4504D', labelText: 'degree: 0' } },
        { id: 'node-2-1', style: { x: 330, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-2-2', style: { x: 230, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-3-1', style: { x: 380, y: 220, fill: '#0f0', labelText: 'degree: 2' } },
        { id: 'node-3-2', style: { x: 180, y: 220, fill: '#0f0', labelText: 'degree: 2' } },

        {
          id: 'degree引导',
          style: {
            x: 525,
            y: 110,
            fill: null,
            labelText: '这里可以修改degree ->',
            labelFontWeight: 700,
            labelFontSize: 10,
          },
        },
      ],
      edges: [
        { source: 'node-1', target: 'node-2-1' },
        { source: 'node-1', target: 'node-2-2' },
        { source: 'node-2-1', target: 'node-3-1' },
        { source: 'node-2-2', target: 'node-3-2' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        key: 'click-select',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'click-select',
      type: 'click-select',
      animation: true,
      enable: true,
      multiple: false,
      trigger: 'shift+click',
      state: 'selected',
      unselectedState: undefined,
      degree: 0,
    };
    const optionFolder = gui.addFolder('Click Select Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'unselectedState', [undefined, 'inactive']);
    const trigger = optionFolder
      .add(options, 'trigger', {
        'shift+click': ['shift'],
        'meta+click': ['Meta'],
      })
      .hide();
    optionFolder.add(options, 'multiple').onChange((v) => trigger.show(v));

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'click-select',
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
  behaviors: ['click-select'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'click-select',
      key: 'click-select-1',
      degree: 2, // 选中扩散范围
      state: 'active', // 选中的状态
      neighborState: 'neighborActive', // 相邻节点附着状态
      unselectedState: 'inactive', // 未选中节点状态
    },
  ],
});
```

## 配置项

| 配置项          | 说明                                                                                                                                                                                                       | 类型                                                                     | 默认值         | 必选 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------- | ---- |
| type            | 交互类型名称。此交互已内置，你可以通过 `type: 'click-select'` 来使用它。                                                                                                                                   | `click-select` \| string                                                 | `click-select` | ✓    |
| animation       | 是否在元素状态切换时启用动画效果                                                                                                                                                                           | boolean                                                                  | true           |      |
| degree          | 控制了高亮扩散范围，[示例](#degree)                                                                                                                                                                        | number \| (event:[Event](/zh/api/event/#事件对象属性)) => number             | 0              |      |
| enable          | 是否启用点击元素的功能，支持通过函数的方式动态控制是否启用，[示例](#enable)                                                                                                                                | boolean \| ((event: [Event](/zh/api/event/#事件对象属性)) => boolean)        | true           |      |
| multiple        | 是否允许多选                                                                                                                                                                                               | boolean                                                                  | false          |      |
| state           | 当元素被选中时应用的状态                                                                                                                                                                                   | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight` | `selected`     |      |
| neighborState   | 当有元素选中时，其相邻 n 度关系的元素应用的状态。n 的值由属性 degree 控制，例如 degree 为 1 时表示直接相邻的元素，[示例](#neighborstate)                                                                   | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight` | `selected`     |      |
| unselectedState | 当有元素被选中时，除了选中元素及其受影响的邻居元素外，其他所有元素应用的状态，[示例](#unselectedState)                                                                                                     | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight` |                |      |
| onClick         | 点击元素时的回调                                                                                                                                                                                           | (event: [Event](/zh/api/event/#事件对象属性)) => void                        |                |      |
| trigger         | 按下该快捷键配合鼠标点击进行多选，按键参考： _<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_ | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                 | `['shift']`    |      |

### degree

控制了高亮扩散范围

- 对于节点来说，`0` 表示只选中当前节点，`1` 表示选中当前节点及其直接相邻的节点和边，以此类推。
- 对于边来说，`0` 表示只选中当前边，`1` 表示选中当前边及其直接相邻的节点，以此类推。

> 如下示例，当 `degree: 0` 仅高亮红色点;
> 当 `degree: 1` 高亮红色和橙色点。



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 280, y: 60, fill: '#E4504D', labelText: 'degree: 0' } },
        { id: 'node-2-1', style: { x: 330, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-2-2', style: { x: 230, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-3-1', style: { x: 380, y: 220, fill: '#0f0', labelText: 'degree: 2' } },
        { id: 'node-3-2', style: { x: 180, y: 220, fill: '#0f0', labelText: 'degree: 2' } },

        {
          id: 'degree引导',
          style: {
            x: 525,
            y: 110,
            fill: null,
            labelText: '这里可以修改degree ->',
            labelFontWeight: 700,
            labelFontSize: 10,
          },
        },
      ],
      edges: [
        { source: 'node-1', target: 'node-2-1' },
        { source: 'node-1', target: 'node-2-2' },
        { source: 'node-2-1', target: 'node-3-1' },
        { source: 'node-2-2', target: 'node-3-2' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        key: 'click-select',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'click-select',
      type: 'click-select',
      animation: true,
      enable: true,
      multiple: false,
      trigger: 'shift+click',
      state: 'selected',
      unselectedState: undefined,
      degree: 0,
    };
    const optionFolder = gui.addFolder('Click Select Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'unselectedState', [undefined, 'inactive']);
    const trigger = optionFolder
      .add(options, 'trigger', {
        'shift+click': ['shift'],
        'meta+click': ['Meta'],
      })
      .hide();
    optionFolder.add(options, 'multiple').onChange((v) => trigger.show(v));

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'click-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



### enable

是否启用点击元素的功能

可以通过函数的方式动态控制是否启用，例如只有节点被选中时才启用。

```js
{
  //⚠️ 注意，这里需要同时设置节点和画布，否则用户点击画布时将不会监听到事件
  enable: (event) => ['node', 'canvas'].includes(event.targetType);
}
```



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 60 } },
      { id: 'node2', style: { x: 200, y: 60 } },
      { id: 'node3', style: { x: 300, y: 60 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0f0',
      },
      neighborActive: {
        fill: '#FFC40C',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      neighborState: 'neighborActive',
      enable: (event) => ['node', 'canvas'].includes(event.targetType),
    },
  ],
});

graph.render();
```


同理，如果只希望边能被选中：

```js
{
  enable: (event) => ['edge', 'canvas'].includes(event.targetType);
}
```

### neighborState

当有元素选中时，其相邻 n 度关系的元素应用的状态。n 的值由属性 degree 控制，例如 degree 为 1 时表示直接相邻的元素

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      // 被直接点击的节点附着的状态
      state: 'active',
      // 相邻的节点附着的状态
      neighborState: 'neighborActive',
    },
  ],
});
```



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0f0',
      },
      neighborActive: {
        fill: '#FFC40C',
        halo: true,
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      neighborState: 'neighborActive',
    },
  ],
});

graph.render();
```


### unselectedState

当有元素被选中时，除了被选中元素和扩散的邻居元素外，其他所有元素应用的状态。

内置状态： `selected` `active` `inactive` `disabled` `highlight`

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      unselectedState: 'inactive',
    },
  ],
});
```



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0f0',
      },
      neighborActive: {
        fill: '#FFC40C',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      neighborState: 'neighborActive',
      unselectedState: 'inactive',
    },
  ],
});

graph.render();
```


## 示例

### 点击选中节点及其直接相连的节点

**点击节点** 会从 默认状态 切换为 active
<br />
**相邻节点** 会从 默认状态 切换为 neighborActive

```js
const graph = new Graph({
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      // 选中节点状态
      active: {
        fill: '#0f0',
      },
      // 相邻节点状态
      neighborActive: {
        fill: '#FFC40C',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      // 相邻节点附着状态
      neighborState: 'neighborActive',
      // 未选中节点状态
      unselectedState: 'inactive',
    },
  ],
});
```



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0f0',
      },
      neighborActive: {
        fill: '#FFC40C',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      neighborState: 'neighborActive',
      unselectedState: 'inactive',
    },
  ],
});

graph.render();
```


### 实际案例



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0b0',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      unselectedState: 'inactive',
      multiple: true,
      trigger: ['shift'],
    },
    'drag-element',
  ],
});

graph.render();
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
