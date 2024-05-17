---
title: 自定义插件
order: 3
---

## 概述

自定义插件可以实现一些额外的功能，例如添加额外的组件、渲染逻辑等。

## 实现插件

与交互类似，插件的实现也相当灵活，你可以以你喜欢的风格实现你的插件。

下面是一个简单的自定义插件实现，在图实例化过程中会自动加载远程数据：

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

在上面的例子中，我们模拟实现了一个数据加载插件，在使用该插件后，实例化 Graph 时不用再传入数据，该插件会自动加载远程数据。

<embed src="@/docs/manual/custom-extension-common/plugin/implement-plugin.md"></embed>

## 注册插件

通过 G6 提供的 register 方法注册即可，详见[注册插件](/manual/core-concept/plugin#注册插件)

## 配置插件

可在 `plugins` 中传入交互类型名称或配置参数对象，详见[配置插件](/manual/core-concept/plugin#配置插件)
