---
title: LassoSelect 套索选择
---

## 概述

鼠标点击拖出一个 _不规则的_ 框框笼罩元素，精准框选范围内的元素 `点` `边` `Combo` 会被选中。

## 使用场景

这一交互主要用于：

- 快速选中一批元素，并且更容易的避开不想选的元素
- 快速取消选中一批元素，并且更容易的避开想保留的元素

## 在线体验

<embed src="@/common/api/behaviors/lasso-select.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['lasso-select'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      immediately: true, // 可以看到框框笼罩过去时，元素立即被框选了
      trigger: ['shift', 'alt', 'control'], // 配合多种按键进行框选
    },
  ],
});
```

## 配置项

| 配置项                      | 说明                                                                                                                                                                                                          | 类型                                                                                                                           | 默认值                    | 必选 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ---- |
| type                        | 交互类型名称。此插件已内置，你可以通过 `type: 'lasso-select'` 来使用它。                                                                                                                                      | `lasso-select` \| string                                                                                                       | `lasso-select`            | ✓    |
| animation                   | 是否启用动画                                                                                                                                                                                                  | boolean                                                                                                                        | false                     |      |
| enable                      | 是否启用框选功能                                                                                                                                                                                              | boolean \| ((event: [Event](/api/event#事件对象属性)) => boolean)                                                              | true                      |      |
| enableElements              | 可框选的元素类型                                                                                                                                                                                              | ( `node` \| `edge` \| `combo` )[]                                                                                              | [`node`, `combo`, `edge`] |      |
| [immediately](#immediately) | 是否及时框选, 仅在[框选模式 mode](#mode)为 `default` 时生效                                                                                                                                                   | boolean                                                                                                                        | false                     |      |
| [mode](#mode)               | 框选的选择模式                                                                                                                                                                                                | `union` \| `intersect` \| `diff` \| `default`                                                                                  | `default`                 |      |
| onSelect                    | 框选元素状态回调                                                                                                                                                                                              | (states:Record&lt;string,string\|string[]>) =>Record&lt;string,string\|string[]>                                               |                           |      |
| state                       | 被选中时切换到该状态                                                                                                                                                                                          | string \| `selected` \| `active` \| `inactive` \| `disabled` \| `highlight`                                                    | `selected`                |      |
| [style](#style)             | 框选时的 框样式                                                                                                                                                                                               | <a href="/manual/element/shape/properties" target="_blank" rel="noopener noreferrer">RectStyleProps extends BaseStyleProps</a> | [默认值](#style)          |      |
| trigger                     | 按下该快捷键配合鼠标点击进行框选 **按键参考：** _<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_ | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                                                                       | [`shift`]                 |      |

### immediately

> _boolean_ **Default:** `false`

是否及时框选, 仅在框选模式为 `default` 时生效

```tsx
const graph = new Graph({
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      immediately: true, // 可以看到框框笼罩过去时，元素立即被框选了
      trigger: [], // 不需要配合其他按键，点击鼠标拖动即可框选
    },
  ],
});
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 50 } },
        { id: 'node-2', style: { x: 260, y: 50 } },
        { id: 'node-3', style: { x: 280, y: 100 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-2', target: 'node-3' },
      ],
    },
    node: {
      style: { fill: '#7e3feb' },
    },
    edge: {
      stroke: '#8b9baf',
    },
    behaviors: [
      {
        type: 'lasso-select',
        key: 'lasso-select',
        immediately: true, // 立即框选
        trigger: [],
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 400, height: 200 },
);
```

### mode

> _'union' \| 'intersect' \| 'diff' \| 'default'_ **Default:** `'default'`

框选的选择模式

- `'union'`：保持已选元素的当前状态，并添加指定的 state 状态。

- `'intersect'`：如果已选元素已有指定的 state 状态，则保留；否则清除该状态。

- `'diff'`：对已选元素的指定 state 状态进行取反操作。

- `'default'`：清除已选元素的当前状态，并添加指定的 state 状态。

```tsx
const graph = new Graph({
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      mode: 'default', // 框选模式, 默认框选模式
    },
  ],
});
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 200, y: 100 } },
        { id: 'node-2', style: { x: 360, y: 100 } },
        { id: 'node-3', style: { x: 280, y: 220 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-2', target: 'node-3' },
      ],
    },
    node: {
      style: { fill: '#7e3feb' },
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
        type: 'lasso-select',
        key: 'lasso-select',
        trigger: [],
        immediately: true,
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'lasso-select',
      type: 'lasso-select',
      animation: false,
      enable: true,
      enableElements: ['node', 'edge', 'combo'],
      mode: 'default',
      state: 'selected',
    };
    const optionFolder = gui.addFolder('lassoSelect Options');
    optionFolder.add(options, 'type').disable(true);

    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'mode', ['union', 'intersect', 'diff', 'default']);
    // .onChange((e) => {
    //   immediately.show(e === 'default');
    // });

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'lasso-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```

### style

> _RectStyleProps_ <br> **Default:**
>
> ```tsx
>   // 默认值
>   {
>    width: 0,
>    height: 0,
>    lineWidth: 1,
>    fill: '#1677FF',
>    stroke: '#1677FF',
>    fillOpacity: 0.1,
>    zIndex: 2,
>    pointerEvents: 'none',
>  }
> ```
>
> 框选时的 框样式

```tsx
const graph = new Graph({
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2], // 虚线外框
        // rgb超级炫彩框框
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
});
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 200, y: 100 } },
        { id: 'node-2', style: { x: 360, y: 100 } },
        { id: 'node-3', style: { x: 280, y: 220 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-2', target: 'node-3' },
      ],
    },
    node: {
      style: { fill: '#7e3feb' },
    },
    edge: {
      stroke: '#8b9baf',
    },
    behaviors: [
      {
        type: 'lasso-select',
        key: 'lasso-select',
        trigger: [],
        immediately: true,
        style: {
          width: 0,
          height: 0,
          lineWidth: 4,
          lineDash: [2, 2], // 虚线外框
          // rgb超级炫彩框框
          fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
          stroke: 'pink',
          fillOpacity: 0.2,
          zIndex: 2,
          pointerEvents: 'none',
        },
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
);
```

### trigger

> _string[]_ **Default:** `['shift']`

按下该快捷键配合鼠标点击进行框选，若设为**空数组**时则表示鼠标点击进行框选，不需要按下其他按键配合。

注意，`trigger` 设置为 `['drag']` 时会导致 `drag-canvas` 行为失效。两者不可同时配置。

### 自己定制尝试看看

<Playground path="behavior/select/demo/lasso.js" rid="lasso-select"></Playground>
