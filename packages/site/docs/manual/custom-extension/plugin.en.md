---
title: Custom Plugin
order: 3
---

## Overview

Custom plugins can implement additional functionalities, such as adding extra components, rendering logic, etc.

## Implement Plugin

Similar to interactions, the implementation of plugins is also quite flexible, and you can implement your plugins in the style you prefer.

Below is an example of a simple custom plugin that automatically loads remote data during the graph instantiation process:

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

In the example above, we have simulated the implementation of a data loading plugin. After using this plugin, there is no need to pass in data when instantiating the Graph; the plugin will automatically load remote data.

<embed src="@/docs/manual/custom-extension-common/plugin/implement-plugin.md"></embed>

## Register Plugin

You can register plugins using the `register` method provided by G6. For more details, please refer to [Register Plugin](/en/manual/core-concept/plugin#register-plugin)

## Configure Plugin

You can pass the name of the interaction type or a configuration parameters object in the `plugins` field. For more details, please refer to [Configure Plugins](/en/manual/core-concept/plugin#configure-plugin)
