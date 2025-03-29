---
title: Tooltip 提示框
---

## 概述

用于在用户将鼠标悬停在图中的节点、边或其他元素上时，显示额外的信息。Tooltip 可以帮助用户更好地理解图中的数据，提高交互体验。

## 使用场景

- 当用户需要了解节点、边或 Combo 的详细信息时，可以使用 Tooltip 提示框来展示这些信息。
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

| 属性         | 描述           | 类型                                                                                                                            | 默认值    | 必选 |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| type         | 插件类型       | string                                                                                                                          | `toolbar` | ✓    |
| key          | 标识符         | string                                                                                                                          | -         |      |
| enable       | 插件是否启用   | boolean \| ((event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => boolean)           | `true`    |      |
| getContent   | 自定义内容     | (event: [IElementEvent](/api/event#事件对象属性), items: NodeData \| EdgeData \| ComboData[]) => Promise<HTMLElement \| string> | -         |      |
| onOpenChange | 显示隐藏的回调 | (open: boolean) => void                                                                                                         | -         |      |
| trigger      | 触发行为       | 'hover' \| 'click'                                                                                                              | `hover`   |

## 配置项

### enable

是否启用, 支持传入函数动态调整启用插件逻辑

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

自定义渲染Tooltip 内容，支持返回 HTMLElement 或 string

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

显示隐藏的回调

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

## API

## 实际案例

<embed src="@/common/api/plugins/tooltip.md"></embed>

**参考示例**：

- [提示框](/examples/plugin/tooltip/#basic)
- [点击触发 Tooltip](/examples/plugin/tooltip/#click)
- [鼠标移入和点击同一元素时显示不同的提示框](/examples/plugin/tooltip/#dual)
