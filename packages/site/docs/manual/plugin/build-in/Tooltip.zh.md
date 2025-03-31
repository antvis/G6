---
title: Tooltip 提示框
---

## 概述

用于在用户将鼠标悬停在图中的元素上时，显示额外的信息。Tooltip 可以帮助用户更好地理解图中的数据，提高交互体验。

## 使用场景

- 当用户需要了解元素的详细信息时，可以使用 Tooltip 提示框来展示这些信息。
- 在数据可视化中，Tooltip 可以用于显示图表中的数据点的详细信息，帮助用户更好地理解数据。

## 基本使用

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'tooltip',
    },
  ],
});
```

## 配置项

| 属性         | 描述                    | 类型                                                                                                                            | 默认值                                | 必选 |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---- |
| type         | 插件类型                | string                                                                                                                          | `tooltip`                             | ✓    |
| key          | 标识符                  | string                                                                                                                          | -                                     |      |
| position     | 气泡框位置              | `top` \| `bottom` \| `left` \| `right` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right`                          | `top-right`                           |      |
| enable       | 插件是否启用            | boolean \| ((event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => boolean)           | true                                  |      |
| getContent   | 自定义内容              | (event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => Promise<HTMLElement \| string> | -                                     |      |
| onOpenChange | 显示隐藏的回调          | (open: boolean) => void                                                                                                         | -                                     |      |
| trigger      | 触发行为                | `hover` \| `click`                                                                                                              | `hover`                               |
| container    | tooltip自定义渲染的容器 | string \| HTMLElement                                                                                                           | -                                     |      |
| offset       | 偏移距离                | [number,number]                                                                                                                 | [10,10]                               |      |
| enterable    | 指针是否可以进入        | boolean                                                                                                                         | false                                 |      |
| title        | 标题                    | string                                                                                                                          | -                                     |
| style        | 样式对象                | Record<string,any>                                                                                                              | {'.tooltip': { visibility: 'hidden'}} |      |

### enable

- 是否启用, 支持传入函数动态调整启用插件逻辑

只有节点使用tooltip插件

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'tooltip',
      enable:(e) => e.targetType === 'node';
    },
  ],
});
```

### getContent

- 自定义渲染Tooltip 内容，支持返回 HTMLElement 或 string

动态渲染自定义html内容

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'tooltip',
      trigger: 'click',
      getContent: (e, items) => {
        let result = `<h4>Custom Content</h4>`;
        items.forEach((item) => {
          result += `<p>Type: ${item.data.description}</p>`;
        });
        return result;
      },
    },
  ],
});
```

### onOpenChange

- 显示隐藏的回调

触发tooltip显示，可加入自定义埋点统计上报内容

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      trigger: 'click',
      onOpenChange: (open) => {
        console.log('Tooltip open change');
      },
    },
  ],
});
```

### trigger

触发行为

- `'hover'`：鼠标移入元素时触发
- `'click'`：鼠标点击元素时触发

点击元素触发tooltip

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      trigger: 'click',
    },
  ],
});
```

### position

展示位置 支持以下值

- `top`: 顶部
- `bottom`: 底部
- `left`: 左侧
- `right`: 右侧
- `top-left` : 顶部靠左
- `top-right` : 顶部靠右
- `bottom-left` : 底部靠左
- `bottom-right` : 底部靠右

展示在底部

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      position: 'bottom',
    },
  ],
});
```

### offset

显示位置的偏移量，以鼠标进入元素的点为基点

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      position: 'bottom',
    },
  ],
});
```

### enterable

鼠标指针是否可以进入气泡框

鼠标可进入气泡框

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      enterable: true,
    },
  ],
});
```

### style

样式对象

黑色元素背景颜色

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      key: 'tooltip-click',
      type: 'tooltip',
      style: {
        ['.tooltip']: {
          backgroundColor: 'black',
        },
      },
    },
  ],
});
```

## 实际案例

<embed src="@/common/api/plugins/tooltip.md"></embed>

**参考示例**：

- [提示框](/examples/plugin/tooltip/#basic)
- [点击触发 Tooltip](/examples/plugin/tooltip/#click)
- [鼠标移入和点击同一元素时显示不同的提示框](/examples/plugin/tooltip/#dual)
