---
title: Custom Theme
order: 2
---

## Overview

In G6, themes provide default styles for nodes, edges, and combos.

## Custom Theme

For element styles, the configurations within a theme are static and do not support the use of callback functions to dynamically calculate styles. Additionally, `type` is also not supported for configuration within a theme. A theme includes the following configurations:

- `node`: Node style
- `edge`: Edge style
- `combo`: Combo style

Below is a simple example of a theme configuration:

```typescript
const theme = {
  node: {
    style: {
      fill: '#e1f3fe',
      lineWidth: 0,
    },
    selected: {
      style: {
        fill: '#3b71d6',
        lineWidth: 1,
      },
    },
  },
  edge: {
    // ...
  },
  combo: {
    // ...
  },
};
```

❌ Incorrect Example

```typescript
const theme = {
  node: {
    // ❌ The theme does not support configuring element types
    type: 'rect',
    style: {
      // ❌ The theme does not support callback functions
      fill: (d) => d.style.color,
    },
  },
};
```

:::warning{title=Note}
For element state styles, please ensure that every property in the state style has a corresponding default style in the default style, otherwise it may result in the inability to clear the state style.
:::

## Register Theme

You can register a theme using the `register` method provided by G6. Here is an example:

```typescript
import { Graph, register, ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.THEME, 'custom-theme', theme);
```

## Configure Theme

To enable and configure a theme, you need to pass the `theme` option when instantiating the `Graph`:

```typescript
const graph = new Graph({
  container: 'container',
  theme: 'custom-theme',
  background: '#fff', // Optional canvas background color
});
```

### Switch Theme

After the `Graph` instance is created, you can switch themes by using the [setTheme](/en/api/theme/#graphsetthemetheme) method:

```typescript
graph.setTheme('dark');
```

Additionally, you can also obtain the current theme by using the `getTheme` method:

```typescript
graph.getTheme();
// => 'dark'
```
