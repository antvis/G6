---
title: 自定义插件
order: 3
---

## 概述

自定义插件可以实现一些额外的功能，例如添加额外的组件、渲染逻辑等。通过自定义插件可以很好地实现功能解耦，更好地进行管理、编排代码以及后续维护。

## 使用场景

### 添加额外的组件、渲染逻辑等

- **额外的组件**：如内置插件的`提示框`、`小地图`、`对齐线`、`网格线`、`上下文菜单`、`水印`等
- **渲染逻辑**：如内置插件的`边绑定`，以及`远程数据加载`（[示例](#远程数据加载)）等

### 内置插件无法满足需求

当内置插件无法完全满足业务需求时，用户也可以通过自定义插件（继承内置插件）进行调整和修改。

_（如果需要内置插件支持的特性是较通用的，或者内置插件存在 Bug ，这种时候欢迎大家到 [Github](https://github.com/antvis/G6) 提 Issue 或者 PR ）_

## 自定义插件示例

与交互类似，插件的实现也相当灵活，你可以以你喜欢的风格实现你的插件。

下面列举几个简单的自定义插件实现：

### 远程数据加载

在图实例化过程中自动加载远程数据：

```typescript
import { BasePlugin } from '@antv/g6';
import type { BasePluginOptions, RuntimeContext } from '@antv/g6';

interface RemoteDataSourceOptions extends BasePluginOptions {}

class RemoteDataSource extends BasePlugin<RemoteDataSourceOptions> {
  constructor(context: RuntimeContext, options: RemoteDataSourceOptions) {
    super(context, options);
    this.loadData();
  }

  private async loadData() {
    // mock remote data
    const data = {
      nodes: [
        { id: 'node-1', x: 100, y: 100 },
        { id: 'node-2', x: 200, y: 200 },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    };

    const { graph } = this.context;
    graph.setData(data);
    await graph.render();
  }
}
```

- 在这个例子中，我们模拟实现了一个数据加载插件，在使用该插件后，实例化 Graph 时不用再传入数据，该插件会自动加载远程数据。

- `BasePlugin` 是所有插件的基类，每个自定义插件都需要继承这个基类实现。

<embed src="@/common/manual/custom-extension/plugin/implement-plugin.md"></embed>

### 自动判断节点数量开启或关闭动画

```typescript
import type { BasePluginOptions, RuntimeContext } from '@antv/g6';
import { BasePlugin, GraphEvent } from '@antv/g6';

interface AutoSwitchAnimationOptions extends BasePluginOptions {
  maxLength: number; // 节点数量达到这个值后关闭全局动画
}

class AutoSwitchAnimation extends BasePlugin<AutoSwitchAnimationOptions> {
  static defaultOptions: Partial<AutoSwitchAnimationOptions> = {
    maxLength: 1000,
  };
  constructor(context: RuntimeContext, options: AutoSwitchAnimationOptions) {
    super(context, options);
    this.bindEvents();
  }
  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.BEFORE_RENDER, this.switchAnimation);
  }
  private switchAnimation() {
    const { graph } = this.context;
    graph.setOptions({
      animation: graph.getNodeData().length < this.options.maxLength,
    });
  }
  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.BEFORE_RENDER, this.switchAnimation);
  }
  destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
```

- 在这个例子中，我们监听 `GraphEvent.BEFORE_RENDER` 事件，在响应中判断当前节点数量是否大于指定值，是的话则关闭全局动画，否则开启
- `maxLength` 是定义的配置项，可在初始化画布实例时传入具体配置，[插件配置](#配置插件)

## 注册插件

通过 G6 提供的 register 方法注册即可

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { MyCustomPlugin } from './my-custom-plugin';

register(ExtensionCategory.PLUGIN, 'my-custom-plugin', MyCustomPlugin);
```

## 配置插件

- 可在 `plugins` 中传入插件类型名称或配置参数对象，详见[配置插件](/manual/plugin/overview#配置方式)

- 比如前面的[自动判断节点数量开启或关闭动画](#自动判断节点数量开启或关闭动画)，配置如下：

  ```typescript
  const graph = new Graph({
    // 其他配置
    plugins: [
      {
        type: 'auto-switch-animation',
        maxLength: 500,
      },
    ],
  });
  ```
