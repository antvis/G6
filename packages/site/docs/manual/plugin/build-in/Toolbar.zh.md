---
title: Toolbar 工具栏
---

## 概述

Toolbar 是 G6 中用于提供操作按钮集合的插件，支持放大、缩小、自适应、重置等常用图表操作。通过工具栏，用户可以快速访问图表的常用功能，提高操作效率和用户体验。

## 使用场景

这一插件主要用于：

- 快速访问图表的常用功能

## 基本用法

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'toolbar',
      getItems: () => [
        { id: 'zoom-in', value: 'zoom-in' },
        { id: 'zoom-out', value: 'zoom-out' },
        { id: 'auto-fit', value: 'auto-fit' },
      ],
      onClick: (value) => {
        // 处理按钮点击事件
        if (value === 'zoom-in') {
          graph.zoomTo(1.1);
        } else if (value === 'zoom-out') {
          graph.zoomTo(0.9);
        } else if (value === 'auto-fit') {
          graph.fitView();
        }
      },
    },
  ],
});
```

## 配置项

| 属性      | 描述                                             | 类型                                                                                        | 默认值       | 必选 |
| --------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------ | ---- |
| type      | 插件类型                                         | string                                                                                      | `toolbar`    | ✓    |
| key       | 插件唯一标识符，用于后续更新                     | string                                                                                      | -            |      |
| className | 工具栏DOM元素的额外CSS类名                       | string                                                                                      | -            |      |
| position  | 工具栏位置，相对于画布，[可选值](#position-属性) | string                                                                                      | `'top-left'` |      |
| style     | 工具栏DOM元素的自定义样式，[常用值](#style-属性) | [CSSStyleDeclaration](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration) | -            |      |
| getItems  | 返回工具栏项目列表                               | () => [ToolbarItem](#toolbaritem)[] \| Promise<[ToolbarItem](#toolbaritem)[]>               | -            | ✓    |
| onClick   | 工具栏项目点击后的回调函数                       | (value: string, target: Element) => void                                                    | -            |      |

### position 属性

`position` 参数支持以下值：

- `'top-left'`：左上角
- `'top-right'`：右上角
- `'bottom-left'`：左下角
- `'bottom-right'`：右下角
- `'left-top'`：左侧靠上
- `'left-bottom'`：左侧靠下
- `'right-top'`：右侧靠上
- `'right-bottom'`：右侧靠下

### style 属性

| 属性            | 描述     | 类型   | 默认值              |
| --------------- | -------- | ------ | ------------------- |
| backgroundColor | 背景颜色 | string | `#fff`              |
| border          | 边框     | string | `1px solid #e8e8e8` |
| borderRadius    | 圆角     | string | `4px`               |
| height          | 高度     | string | `auto`              |
| margin          | 外边距   | string | `12px`              |
| opacity         | 透明度   | number | 0.9                 |
| padding         | 内边距   | string | `8px`               |
| width           | 宽度     | string | `auto`              |

### ToolbarItem

每个工具栏项目 (ToolbarItem) 包含以下属性：

| 属性  | 描述                                            | 类型     | 必选 |
| ----- | ----------------------------------------------- | -------- | ---- |
| id    | 项目的图标ID，内置图标ID见[内置图标](#内置图标) | `string` | ✓    |
| value | 点击项目时返回的值                              | `string` | ✓    |

### 内置图标

Toolbar 提供以下内置图标 ID：

- `'zoom-in'`：放大
- `'zoom-out'`：缩小
- `'redo'`：重做
- `'undo'`：撤销
- `'edit'`：编辑
- `'delete'`：删除
- `'auto-fit'`：自适应视图
- `'export'`：导出图表
- `'reset'`：重置视图
- `'request-fullscreen'`：请求全屏
- `'exit-fullscreen'`：退出全屏

### 自定义图标

除了使用内置图标外，还可以通过引入第三方图标库（如阿里巴巴 iconfont）来使用自定义图标：

```js
// 引入 iconfont 脚本
const iconFont = document.createElement('script');
iconFont.src = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'; // 替换为你的 iconfont 脚本地址
document.head.appendChild(iconFont);

// 在工具栏中使用自定义图标
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'toolbar',
      getItems: () => [
        { id: 'icon-xinjian', value: 'new' }, // 使用 iconfont 中的图标
        { id: 'icon-fenxiang', value: 'share' },
        { id: 'icon-chexiao', value: 'undo' },
      ],
      onClick: (value) => {
        // 处理点击事件
      },
    },
  ],
});
```

> 注意：自定义图标的 ID 通常以 `icon-` 开头，需要与引入的 iconfont 中的图标名称对应。

## 代码示例

### 基础工具栏

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'toolbar',
      position: 'top-right',
      getItems: () => [
        { id: 'zoom-in', value: 'zoom-in' },
        { id: 'zoom-out', value: 'zoom-out' },
        { id: 'undo', value: 'undo' },
        { id: 'redo', value: 'redo' },
        { id: 'auto-fit', value: 'fit' },
      ],
      onClick: (value) => {
        // redo、undo 需要配合 history 插件使用
        const history = graph.getPluginInstance('history');
        switch (value) {
          case 'zoom-in':
            graph.zoomTo(1.1);
            break;
          case 'zoom-out':
            graph.zoomTo(0.9);
            break;
          case 'undo':
            history?.undo();
            break;
          case 'redo':
            history?.redo();
            break;
          case 'fit':
            graph.fitView();
            break;
          default:
            break;
        }
      },
    },
  ],
});
```

### 自定义样式

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'toolbar',
      className: 'my-custom-toolbar',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        border: '1px solid #e8e8e8',
        opacity: '0.9',
        marginTop: '12px',
        marginLeft: '12px',
      },
      getItems: () => [
        { id: 'zoom-in', value: 'zoom-in' },
        { id: 'zoom-out', value: 'zoom-out' },
      ],
      onClick: (value) => {
        // 处理点击事件
      },
    },
  ],
});
```

> 常用的样式属性包括：
>
> - `backgroundColor`：背景颜色
> - `padding`：内边距
> - `margin`/`marginTop`/`marginLeft` 等：外边距
> - `border`：边框
> - `borderRadius`：圆角
> - `boxShadow`：阴影效果
> - `opacity`：透明度
> - `width`/`height`：宽高（默认自适应内容）
> - `zIndex`：层级（默认为 100）
> - `display`：显示方式（默认为 flex）

工具栏容器默认设置 `display: flex`，子项目默认使用行布局（或根据 position 配置的方向改变）。你可以通过 `style` 自定义其外观和位置。

### 异步加载工具栏项

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'toolbar',
      getItems: async () => {
        // 可以从服务器或其他异步源获取工具栏配置
        const response = await fetch('/api/toolbar-config');
        const items = await response.json();
        return items;
      },
      onClick: (value) => {
        // 处理点击事件
      },
    },
  ],
});
```

## 常见问题

### 1. 工具栏图标不显示？

- 检查是否使用了正确的内置图标 ID
- 确保 CSS 样式未被覆盖或冲突

### 2. 如何结合其他插件使用？

工具栏常常与其他插件（如历史记录）配合使用：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
    {
      type: 'toolbar',
      getItems: () => [
        { id: 'undo', value: 'undo' },
        { id: 'redo', value: 'redo' },
      ],
      onClick: (value) => {
        const history = graph.getPluginInstance('history');
        if (value === 'undo') {
          history.undo();
        } else if (value === 'redo') {
          history.redo();
        }
      },
    },
  ],
});
```

### 3. 如何动态更新工具栏？

可以使用 `updatePlugin` 方法动态更新工具栏：

```js
const graph = new Graph({
  // 其他配置...
  plugins: [
    {
      type: 'toolbar',
      key: 'my-toolbar',
    },
  ],
});

// 更新工具栏位置
graph.updatePlugin({
  key: 'my-toolbar',
  position: 'bottom-right',
});
```

## 实际案例

<Playground path="plugin/toolbar/demo/basic.js" rid="toolbar-basic"></Playground>
