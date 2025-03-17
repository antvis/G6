---
title: Animation Overview
order: 1
---

## Overview

<image width="150px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NkILT56xXp4AAAAAAAAAAAAADmJ7AQ/original" />

Animation refers to the state changes of elements over a period of time, such as the position, size, and color of nodes. In G6, animations are often used to enhance user experience and improve the coherence and smoothness of the graph update process.

G6 provides a set of animation paradigms to describe element animations and has built-in some common animation effects. Users can achieve different animation effects by configuring animation parameters.

The implementation of an animation paradigm is as follows:

```typescript
[
  {
    fields: ['x', 'y'],
  },
];
```

The aforementioned animation paradigm indicates that when the `x` and `y` attributes of an element change, an animation will be executed.

## Configure Animation

In G6, animation configuration is divided into global configuration and local configuration. Global configuration is mainly used to set whether animations are enabled globally, the duration of animations, and other parameters. Local configuration is primarily used to set the animation effects for elements.

### Disabled Global Animation

To disable global animations, you can pass the `animation` option when instantiating the `Graph`:

```typescript
{
  animation: false,
}
```

### Configure Global Animation

If you want to enable animations and also configure the default duration for the animations, you can pass the `animation` option:

```typescript
{
  animation: {
    duration: 500,
  },
}
```

### Configure Element Animation

For individual elements, you can configure animations at different stages. For example, if you want an element to have a fade-in and fade-out effect when it enters and exits, you can configure it as follows:

```typescript
{
  node: {
    animation: {
      enter: 'fade',
      exit: 'fade'
    }
  }
}
```

If you want to update the position of an element with a translation transition, you can configure it as follows:

```typescript
{
  node: {
    animation: {
      update: 'translate',
    }
  }
}
```

If you wish to disable animations for an element, you can configure it as follows:

```typescript
{
  node: {
    animation: false,
  }
}
```

## Animation Paradigm

The animation configuration mentioned in the previous section actually used the built-in animation paradigm. This section introduces how to customize the animation paradigm.

:::info{title=Tip}
Before writing an animation paradigm, it is necessary to understand the compositional structure of an element. For details, please refer to the [Element](/en/manual/core-concept/element#composition-node) section.
:::

The [Element](/en/manual/core-concept/element) section mentioned that elements in G6 are composed of one or more atomic graphics. Therefore, the animation of an element is essentially a combination of these atomic shape animations.

Thus, the animation paradigm is an array that describes the animation effects of each atomic shape within the element. For the element itself, it is also a special composite shape and thus has basic shape attributes such as `x`, `y`, etc.

Therefore, you can directly write an animation paradigm for the element itself:

```typescript
[
  {
    fields: ['x', 'y'],
  },
];
```

## Custom Animation

If the built-in animations do not meet your requirements, you can create custom animations. For details, please refer to [Custom Animation](/en/manual/custom-extension/animation).

## Animation Priority

Animation priority refers to the precedence between global animation configuration and element-specific animation configuration. It can be summarized as follows:

| Global Animation Config | Local Animation Config | Whether to Execute Animation                                                                     |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| ✅ true                 | ✅ true                | ✅ Execute animation with default configuration                                                  |
| ✅ true                 | ❌ false               | ❌ Won't execute animation                                                                       |
| ✅ true                 | ✅ Custom Animation    | ✅ Execute animation with local animation configuration                                          |
| ❌ false                | ✅ true                | ❌ Won't execute animation                                                                       |
| ❌ false                | ❌ false               | ❌ Won't execute animation                                                                       |
| ❌ false                | ✅ Custom Animation    | ❌ Won't execute animation                                                                       |
| ✅ Custom Animation     | ✅ true                | ✅ Execute animation with global animation configuration                                         |
| ✅ Custom Animation     | ✅ Custom Animation    | ✅ Execute animation, local animation configuration overrides the global animation configuration |
| ✅ Custom Animation     | ❌ false               | ❌ Won't execute animation                                                                       |

## Persistent Animation

If you want elements to have persistent animations, such as the undulating effect of nodes or the ant line effect of edges, this can be achieved by customizing the elements. Below is an implementation of an edge with an Ant Line animation provided:

```typescript
import { Line } from '@antv/g6';

class AntLine extends Line {
  onCreate() {
    this.shapeMap.key.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}
```

The `onCreate` is a lifecycle hook used to execute animations when an element is created.

Configure the edge style in the options as follows:

```typescript
{
  edge: {
    type: 'ant-line',
    style:{
      lineDash: [10, 10]
    }
  }
}
```

<embed src="@/common/manual/core-concept/animation/ant-line.md"></embed>

The `lineDash` is an array for `lineDashOffset`, and the AntLine effect is achieved by continuously varying the `lineDashOffset`.

Similarly, you can also create a breathing effect for nodes:

```typescript
import { Circle } from '@antv/g6';

class BreathingCircle extends Circle {
  onCreate() {}
}
```

The `lineDashOffset` is the offset for `lineDash`, and the AntLine effect is achieved by continuously varying the `lineDashOffset`.

Similarly, you can also create a breathing effect for nodes:

```typescript
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

Node Style Configuration:

```typescript
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

<embed src="@/common/manual/core-concept/animation/breathing-circle.md"></embed>
