---
title: 自定义插件
order: 7
---

通过继承 [PluginBase](https://github.com/antvis/G6/blob/fddf9a5c0f7933b4d704038a7474358cb47037d0/packages/g6/src/types/plugin.ts#L15) 类来实现一个插件。

```ts
import { PluginBase } from '@antv/g6';

class CustomPlugin extends PluginBase {
  // 覆写方法
  // 插件类方法
}
```

## 覆写方法

### init

**类型**：`() => void`

初始化插件，需要调用 `super.init()` 方法

### getDefaultCfgs

**类型**：`() => object`

获取插件的默认配置项

### updateCfgs

**类型**：`(cfgs: object) => void`

更新插件的配置项，参数为当前配置项

### getEvents

**类型**：`() => { [key in string]: string }`

获取插件的事件监听器

例如当鼠标移入节点时，触发插件类方法 `handleNodeMouseenter`：

```typescript
getEvents() {
  return {
    'node:mouseenter': this.handleNodeMouseenter,
  };
}
```

### destroy

**类型**：`() => void`

销毁插件，需要调用 `super.destroy()` 方法

## 示例

这里以实现一个简单的插件为例，该插件创建一个文本标签，用于显示当前画布中的节点和边数量。

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
    // 将文本标签添加到 DOM 中
    this.container.appendChild(this.label);
    // 设置样式
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
      // 监听画布上节点和边的增删事件
      afteritemchange: this.updateCounter,
    };
  }

  updateCounter() {
    const { graph } = this;
    this.label.innerHTML = `节点数量：${graph.getAllNodesData().length}, 边数量：${graph.getAllEdgesData().length}`;
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
  // 启用 counter 插件
  plugins: [
    {
      type: 'counter',
      key: 'counter',
      fontStyle: { color: 'red', 'font-size': '16px' },
    },
  ],
});
```
