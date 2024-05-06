---
title: Animation - 动画
order: 8
---

## 概述

<image width="150px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NkILT56xXp4AAAAAAAAAAAAADmJ7AQ/original"></image>

动画是指元素在一段时间内的状态变化，例如节点的位置、大小、颜色等。在 G6 中，动画通常用于增强用户体验，提升图更新过程的连贯性和流畅度。

G6 提供了一套动画范式来描述元素动画，并内置了一些常用的动画效果，用户可以通过配置动画参数来实现不同的动画效果。

一个动画范式的实现如下：

```ts
[
  {
    fields: ['x', 'y'],
  },
];
```

上述动画范式表示当元素的 `x` 和 `y` 属性发生变化时，会执行动画。

## 配置动画

G6 中动画配置分为全局配置和局部配置，全局配置主要用于配置全局是否开启动画、动画时长等参数，局部配置主要用于配置元素的动画效果。

### 关闭全局动画

若要关闭全局动画，可以在实例化 `Graph` 时传入 `animation` 配置项：

```ts
{
  animation: false,
}
```

### 配置全局动画

如果要启用动画且同时配置动画的默认播放时长，可以传入 `animation` 配置项：

```ts
{
  animation: {
    duration: 500,
  },
}
```

### 配置元素动画

对于单个元素，可以配置其在不同阶段的动画。例如希望元素在进场和退场时具有淡入淡出效果，可以以如下方式配置：

```ts
{
  node: {
    animation: {
      enter: 'fade',
      exit: 'fade'
    }
  }
}
```

如果希望更新元素位置时是以平移过渡的方式，可以配置如下：

```ts
{
  node: {
    animation: {
      update: 'translate',
    }
  }
}
```

如果希望关闭元素的动画，可以配置如下：

```ts
{
  node: {
    animation: false,
  }
}
```

## 动画范式

上一节中提到的动画配置实际上使用了内置的动画范式，本节介绍如何自定义动画范式。

:::info{title=提示}
在编写动画范式之前需要了解元素的组成结构，具体请参考[元素](/manual/core-concept/element#节点的构成)一节
:::

[元素](/manual/core-concept/element)一节中提到：G6 中的元素是由一个或多个原子图形组合而成。因此元素的动画本质上是这些原子图形动画的组合。

因此动画范式是一个数组，用于描述元素中各原子图形的动画效果。对于元素本身来说，其也是一个特殊的复合图形，因此具有基本的图形属性，如 `x`、`y` 等。

因此可以直接为元素本身编写动画范式：

```ts
[
  {
    fields: ['x', 'y'],
  },
];
```

### 自定义动画

对于圆形节点（Circle）元素，其主图形是一个圆形，现在为其编写一个动画，当节点的尺寸发生变化时，能够以缩放的方式进行过渡动画：

```ts
[
  {
    fields: ['r'],
    shape: 'key',
  },
];
```

下面我们创建一个图实例并更新元素尺寸来触发更新动画：

```ts
const graph = new Graph({
  container: 'container',
  width: 50,
  height: 50,
  data: {
    nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
  },
  node: {
    animation: {
      update: [{ fields: ['r'], shape: 'key' }],
    },
  },
});

graph.draw().then(() => {
  graph.updateNodeData([{ id: 'node-1', style: { size: 40 } }]);
  graph.draw();
});
```

> ⬇️ 指针移动至下方图中，并点击左侧播放按钮进行重新播放

```js | ob { pin:false }
(() => {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '50px',
    height: '50px',
  });

  const graph = new window.g6.Graph({
    width: 50,
    height: 50,
    container,
    data: {
      nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
    },
    node: {
      animation: {
        update: [
          {
            fields: ['r'],
            shape: 'key',
          },
        ],
      },
    },
  });

  graph.draw().then(() => {
    graph.updateNodeData([{ id: 'node-1', style: { size: 40 } }]);
    graph.draw();
  });

  return container;
})();
```

#### 原理分析

当对一个元素执行动画时，该元素会将其动画帧参数转化为其各个子图形上的动画帧参数，并执行对应的动画。

在上面的例子中，通过更新节点尺寸(size)，对该节点执行了动画，其动画帧参数为：

```json
[{ "size": 20 }, { "size": 40 }]
```

节点元素拿到该属性后，将其转化为主图形（圆形）的动画帧参数：

```json
[{ "r": 10 }, { "r": 20 }]
```

因此这里最终是对圆形执行了半径从 10 到 20 的过渡动画。

#### 复合动画

直接将位置变化动画和尺寸变化动画合并到一个动画范式即可得到复合动画范式：

```ts
[
  {
    fields: ['x', 'y'],
  },
  {
    fields: ['r'],
    shape: 'key',
  },
];
```

并同时更新该节点的位置和尺寸：

```ts
graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40 } }]);
graph.draw();
```

> ⬇️ 指针移动至下方图中，并点击左侧播放按钮进行重新播放

```js | ob { pin:false }
(() => {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '200px',
    height: '50px',
  });

  const graph = new window.g6.Graph({
    width: 200,
    height: 50,
    container,
    data: {
      nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
    },
    node: {
      animation: {
        update: [
          {
            fields: ['x', 'y'],
          },
          { fields: ['r'], shape: 'key' },
        ],
      },
    },
  });

  graph.draw().then(() => {
    graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40 } }]);
    graph.draw();
  });

  return container;
})();
```

加入颜色过渡：

```ts
[
  {
    fields: ['x', 'y'],
  },
  {
    fields: ['r', 'fill'],
    shape: 'key',
  },
];
```

执行节点更新：

```ts
graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40, fill: 'pink' } }]);
graph.draw();
```

> ⬇️ 指针移动至下方图中，并点击左侧播放按钮进行重新播放

```js | ob { pin:false }
(() => {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '200px',
    height: '50px',
  });

  const graph = new window.g6.Graph({
    width: 200,
    height: 50,
    container,
    data: {
      nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
    },
    node: {
      animation: {
        update: [
          {
            fields: ['x', 'y'],
          },
          { fields: ['r', 'fill'], shape: 'key' },
        ],
      },
    },
  });

  graph.draw().then(() => {
    graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40, fill: 'pink' } }]);
    graph.draw();
  });

  return container;
})();
```

## 动画优先级

动画优先级是指全局动画配置和元素动画配置之前的优先级，可以归纳如下：

| 全局动画配置 | 局部动画配置 | 是否执行动画                                      |
| ------------ | ------------ | ------------------------------------------------- |
| ✅ true      | ✅ true      | ✅ 执行动画，以默认动画配置执行                   |
| ✅ true      | ❌ false     | ❌ 不执行该类元素动画                             |
| ✅ true      | ✅ 配置动画  | ✅ 执行动画，以局部动画配置执行                   |
| ❌ false     | ✅ true      | ❌ 不执行任何动画                                 |
| ❌ false     | ❌ false     | ❌ 不执行任何动画                                 |
| ❌ false     | ✅ 配置动画  | ❌ 不执行任何动画                                 |
| ✅ 配置动画  | ✅ true      | ✅ 执行动画，以全局动画配置执行                   |
| ✅ 配置动画  | ✅ 配置动画  | ✅ 执行动画，将局部动画配置覆盖全局动画配置后执行 |
| ✅ 配置动画  | ❌ false     | ❌ 不执行该类元素动画                             |

## 持续动画

如果希望元素具有持续动画，例如节点的波动效果、边的飞线效果等，可以通过自定义元素方式实现，下面提供一个具有飞线(FlyLine)动画的边的实现：

```ts
import { Line } from '@antv/g6';

class FlyLine extends Line {
  onCreate() {
    this.shapeMap.key.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}
```

其中 `onCreate` 是一个生命周期钩子，用于在元素创建时执行动画。

在 options 中配置边样式：

```ts
{
  edge: {
    type: 'fly-line',
    style:{
      lineDash: [10, 10]
    }
  }
}
```

```js | ob { pin: false }
(() => {
  const { register, Line, Graph } = window.g6;

  class FlyLine extends Line {
    onCreate() {
      this.shapeMap.key.animate([{ lineDashOffset: 20 }, { lineDashOffset: 0 }], {
        duration: 500,
        iterations: Infinity,
      });
    }
  }

  register('edge', 'fly-line', FlyLine);

  const container = document.createElement('div');
  Object.assign(container.style, { width: '200px', height: '50px' });

  const graph = new Graph({
    container,
    width: 200,
    height: 50,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 25, y: 25 } },
        { id: 'node-2', style: { x: 175, y: 25 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2', style: { lineDash: [10, 10] } }],
    },
    edge: {
      type: 'fly-line',
    },
  });

  graph.draw();

  return container;
})();
```

其中 `lineDashOffset` 是 `lineDash` 的偏移量，通过不断变化 `lineDashOffset` 来实现飞线效果。

同样的，还可以实现节点的呼吸效果：

```ts
import { Circle } from '@antv/g6';

class BreathingCircle extends Circle {
  onCreate() {
    this.shapeMap.halo.animate([{ lineWidth: 5 }, { lineWidth: 10 }], {
      duration: 1000,
      iterations: Infinity,
      direction: 'alternate',
    });
  }
}
```

节点样式配置：

```ts
{
  node: {
    type: 'breathing-circle',
    style: {
      halo: true,
      haloLineWidth: 5,
    },
  },
}
```

```js | ob { pin: false }
(() => {
  const { register, Circle, Graph } = window.g6;

  class BreathingCircle extends Circle {
    onCreate() {
      this.shapeMap.halo.animate([{ lineWidth: 5 }, { lineWidth: 10 }], {
        duration: 1000,
        iterations: Infinity,
        direction: 'alternate',
      });
    }
  }

  register('node', 'breathing-circle', BreathingCircle);

  const container = document.createElement('div');
  Object.assign(container.style, { width: '50px', height: '50px' });

  const graph = new Graph({
    container,
    width: 50,
    height: 50,
    data: {
      nodes: [{ id: 'node-1', style: { x: 25, y: 25 } }],
    },
    node: {
      type: 'breathing-circle',
      style: {
        halo: true,
        haloLineWidth: 5,
      },
    },
  });

  graph.draw();

  return container;
})();
```
