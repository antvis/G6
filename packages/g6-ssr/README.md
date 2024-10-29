## SSR extension for G6 5.0

This extension package provides SSR support for G6 5.0, which supports canvas rendering in server side.

## Usage

1. Install

```bash
npm install @antv/g6-ssr
```

2. Render

```js
// usage 1
import { createGraph } from '@antv/g6-ssr';

const graph = createGraph({
  width: 500,
  height: 500,
  data: {
    // your data
  },
  // your other options
});

graph.writeToFile('output.png');
```
