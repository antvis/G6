---
title: Custom Plugin
order: 20
---

## Overview

Custom plugins can implement additional features, such as adding extra components, rendering logic, etc. Custom plugins can effectively achieve functional decoupling, better manage and orchestrate code, and facilitate subsequent maintenance.

## Use Cases

### Add extra components, rendering logic, etc.

- **Extra components**: Such as built-in plugins like `Tooltip`, `Minimap`, `Snapline`, `Grid`, `Context Menu`, `Watermark`, etc.
- **Rendering logic**: Such as built-in plugins like `Edge Bundling`, and `Remote Data Loading` ([Example](#remote-data-loading)), etc.

### When built-in plugins cannot meet the requirements

When built-in plugins cannot fully meet business needs, users can also make adjustments and modifications through custom plugins (inheriting built-in plugins).

_(If the features supported by built-in plugins are more general, or if there are bugs in built-in plugins, you are welcome to submit issues or PRs on [Github](https://github.com/antvis/G6))_

## Custom Plugin Examples

Like interactions, the implementation of plugins is also quite flexible, and you can implement your plugin in your preferred style.

Here are a few simple custom plugin implementations:

### Remote Data Loading

Automatically load remote data during graph instantiation:

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

- In this example, we simulate a data loading plugin. After using this plugin, there is no need to pass data when instantiating the Graph, as the plugin will automatically load remote data.

- `BasePlugin` is the base class for all plugins, and each custom plugin needs to inherit this base class.

<embed src="@/common/manual/custom-extension/plugin/implement-plugin.md"></embed>

### Automatically Enable or Disable Animation Based on Node Count

```typescript
import type { BasePluginOptions, RuntimeContext } from '@antv/g6';
import { BasePlugin, GraphEvent } from '@antv/g6';

interface AutoSwitchAnimationOptions extends BasePluginOptions {
  maxLength: number; // Disable global animation when the number of nodes reaches this value
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

- In this example, we listen to the `GraphEvent.BEFORE_RENDER` event and determine whether the current number of nodes exceeds a specified value. If so, global animation is disabled; otherwise, it is enabled.
- `maxLength` is a defined configuration item that can be passed in when initializing the graph instance. [Plugin Configuration](#configure-plugin)

## Register Plugin

Register using the method provided by G6

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { MyCustomPlugin } from './my-custom-plugin';

register(ExtensionCategory.PLUGIN, 'my-custom-plugin', MyCustomPlugin);
```

## Configure Plugin

- You can pass the plugin type name or configuration parameter object in `plugins`, see [Configure Plugin](/manual/plugin/overview#configuration-method)

- For example, the previous [Automatically Enable or Disable Animation Based on Node Count](#automatically-enable-or-disable-animation-based-on-node-count) is configured as follows:

  ```typescript
  const graph = new Graph({
    // Other configurations
    plugins: [
      {
        type: 'auto-switch-animation',
        maxLength: 500,
      },
    ],
  });
  ```
