---
title: 插件总览
order: 1
---

## 什么是插件

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

插件(Plugin)是 G6 中最灵活的扩展机制，用户可以通过插件来扩展 G6 的功能，例如在画布中额外挂载图形组件、实现撤销重做等功能。

绝大多数的定制需求都可以通过插件来实现，G6 内置了一些常用的插件，例如：[Tooltip](/manual/plugin/build-in/tooltip)、[Grid](/manual/plugin/build-in/grid-line)、[History](/manual/plugin/build-in/history)。

## 内置插件

G6 提供了丰富的内置插件，涵盖多种常见功能场景：

| 分类             | 插件名称                                             | 注册类型           | 功能描述                               |
| ---------------- | ---------------------------------------------------- | ------------------ | -------------------------------------- |
| **视觉样式增强** |                                                      |                    |                                        |
|                  | [网格线](/manual/plugin/build-in/grid-line)          | `grid-line`        | 在画布上显示网格参考线                 |
|                  | [背景](/manual/plugin/build-in/background)           | `background`       | 为画布添加背景图片或颜色               |
|                  | [水印](/manual/plugin/build-in/watermark)            | `watermark`        | 为画布添加水印，保护版权               |
|                  | [轮廓包围](/manual/plugin/build-in/hull)             | `hull`             | 为指定节点集合创建轮廓                 |
|                  | [气泡集](/manual/plugin/build-in/bubble-sets)        | `bubble-sets`      | 创建平滑气泡状的元素集合轮廓           |
|                  | [对齐线](/manual/plugin/build-in/snapline)           | `snapline`         | 拖动元素时显示对齐参考线               |
| **导航与概览**   |                                                      |                    |                                        |
|                  | [缩略图](/manual/plugin/build-in/minimap)            | `minimap`          | 显示图的缩略预览，支持导航             |
|                  | [全屏](/manual/plugin/build-in/fullscreen)           | `fullscreen`       | 支持图表全屏显示和退出                 |
|                  | [时间轴](/manual/plugin/build-in/timebar)            | `timebar`          | 提供时序数据的筛选和播放控制           |
| **交互控件**     |                                                      |                    |                                        |
|                  | [工具栏](/manual/plugin/build-in/toolbar)            | `toolbar`          | 提供常用操作按钮集合                   |
|                  | [上下文菜单](/manual/plugin/build-in/contextmenu)    | `contextmenu`      | 右键点击时显示可选操作菜单             |
|                  | [提示框](/manual/plugin/build-in/tooltip)            | `tooltip`          | 悬停时显示元素详细信息                 |
|                  | [图例](/manual/plugin/build-in/legend)               | `legend`           | 显示图表数据的类别和对应样式说明       |
| **数据探索**     |                                                      |                    |                                        |
|                  | [鱼眼放大镜](/manual/plugin/build-in/fisheye)        | `fisheye`          | 提供焦点+上下文的探索体验              |
|                  | [边过滤镜](/manual/plugin/build-in/edge-filter-lens) | `edge-filter-lens` | 在指定区域内筛选显示边                 |
|                  | [边绑定](/manual/plugin/build-in/edge-bundling)      | `edge-bundling`    | 将相似路径的边捆绑在一起，减少视觉混乱 |
| **高级功能**     |                                                      |                    |                                        |
|                  | [历史记录](/manual/plugin/build-in/history)          | `history`          | 支持撤销/重做操作                      |
|                  | [相机设置](/manual/plugin/build-in/camera-setting)   | `camera-setting`   | 配置3D场景下的相机参数                 |

各插件的详细配置可参考 [内置插件文档](/manual/plugin/build-in/grid-line)。

## 配置方式

### 基本配置

在图实例初始化时，通过 `plugins` 数组指定需要的插件：

```javascript
import { Graph } from '@antv/g6';

const graph = new Graph({
  // 其他配置...
  plugins: ['grid', 'minimap', 'tooltip'],
});
```

### 配置插件参数

对于需要自定义参数的插件，可以使用 `object` 形式配置属性：

```javascript
const graph = new Graph({
  // 其他配置...
  plugins: [
    'grid',
    {
      type: 'tooltip',
      getContent: (e) => `<div>节点：${e.target.id}</div>`,
      key: 'my-tooltip', // 为插件指定key，便于后续更新
    },
  ],
});
```

### 动态更新插件

G6 支持在图实例运行期间动态管理插件，满足复杂交互需求：

可以通过 [setPlugins](/api/plugin#graphsetpluginsplugins) 方法调整插件：

```javascript
// 添加新插件
graph.setPlugins((plugins) => [...plugins, 'minimap']);

// 移除插件
graph.setPlugins((plugins) => plugins.filter((p) => p !== 'grid'));
```

可以通过 [updatePlugin](/api/plugin#graphupdatepluginplugin) 方法更新插件的配置：

```javascript
// 更新单个插件
graph.updatePlugin({
  key: 'my-tooltip',
  getContent: (e) => `<div>更新的内容：${e.target.id}</div>`,
});
```

:::warning{title=注意}
使用`updatePlugin`方法时，需要在初始化时为插件指定唯一的`key`。
:::

### 卸载插件

使用 [setPlugins](/api/plugin#graphsetpluginsplugins) 方法同样可以卸载插件，将插件配置列表置为空即可：

```javascript
// 卸载所有插件
graph.setPlugins([]);
```

### 调用插件方法

一些插件提供了可供用户调用的 API 方法，例如 `history` 插件提供了 `undo` 和 `redo` 方法，用户可以通过调用这些方法来实现撤销和重做操作。

要调用这些方法，需要先获取到插件实例，可通过 [getPluginInstance](/api/plugin#graphgetplugininstancekey) 方法获取：

```javascript
// 获取插件实例
const history = graph.getPluginInstance('history');

// 调用插件方法
history.undo();
history.redo();
```

:::warning{title=注意}
`graph.getPluginInstance` 方法接收插件 key 值作为参数，因此如果需要获取插件实例，需要将对应插件配置为 `object` 的形式，并传入 `key` 值。
:::

更多与插件相关的 API 请参考 [插件 API 文档](/api/plugin)。

## 自定义插件

当内置插件无法满足需求时，你可以：

- 继承和扩展现有插件
- 创建全新的自定义插件

自定义插件需要先注册后使用。详细教程请参考 [自定义插件](/manual/plugin/custom-plugin) 文档。

```javascript
import { register, ExtensionCategory } from '@antv/g6';
import { MyCustomPlugin } from './my-custom-plugin';

// 注册自定义插件
register(ExtensionCategory.PLUGIN, 'my-custom-plugin', MyCustomPlugin);

// 使用自定义插件
const graph = new Graph({
  plugins: ['my-custom-plugin'],
});
```

通过合理组合和配置插件，你可以构建出功能丰富、交互体验出色的图可视化应用。
