---
title: Custom Plugin
order: 7
---

Custom plugins by inheriting the [PluginBase](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/types/plugin.ts#L15) class.

```ts
import { PluginBase } from '@antv/g6';

class CustomPlugin extends PluginBase {
  // Override method
  // Class method
}
```

## Override method

### init

**Type**: `() => void`

Initialize the plugin, you need to call the `super.init()` method

### getDefaultCfgs

**Type**: `() => object`

Get the default configuration item of the plugin

### updateCfgs

**Type**: `(cfgs: object) => void`

Update the configuration item of the plugin, the parameter is the current configuration item

### getEvents

**Type**: `() => { [key in string]: string }`

Get the event listener of the plugin

For example, when the mouse enters the node, trigger the plugin class method `handleNodeMouseenter`:

```typescript
getEvents() {
  return {
    'node:mouseenter': this.handleNodeMouseenter,
  };
}
```

### destroy

**Type**: `() => void`

Destroy the plugin, you need to call the `super.destroy()` method

## Example

Here is an example of a simple plugin that creates a text label to display the number of nodes and edges in the current canvas.

```ts
import { Graph as BaseGraph, PluginBase, extend } from '@antv/g6';

class Counter extends PluginBase {
  private label = document.createElement('span');

  private get container() {
    if (typeof this.options.container === 'string') {
      return document.querySelector(this.options.container);
    }
    return this.options.container;
  }

  init(graph) {
    super.init(graph);
    // Add text label to DOM
    this.container.appendChild(this.label);
    // Set style
    Object.assign(this.label.style, this.options.fontStyle);
    this.updateCounter();
  }

  getDefaultCfgs() {
    return {
      key: 'counter' + Math.random(),
      container: 'body',
      fontStyle: {
        color: '#000',
        'font-size': '12px',
      },
    };
  }

  getEvents() {
    return {
      // Listen for node and edge add/remove events on the canvas
      afteritemchange: this.updateCounter,
    };
  }

  updateCounter() {
    const { graph } = this;
    this.label.innerHTML = `Nodes: ${graph.getAllNodesData().length}, Edges: ${graph.getAllEdgesData().length}`;
  }
}

const Graph = extend(BaseGraph, {
  plugins: {
    counter: Counter,
  },
});

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 500,
  // Enable counter plugin
  plugins: [
    {
      type: 'counter',
      key: 'counter',
      fontStyle: { color: 'red', 'font-size': '16px' },
    },
  ],
});
```
