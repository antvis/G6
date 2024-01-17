---
title: Remote Data Source
---

If your data is not local but on a remote server, you can handle it in the following two ways:

## Method 1: Wait for the remote data to load before creating the graph instance

```ts
import { Graph } from '@antv/g6';

async function init() {
  const data = await fetch('data source url').then((res) => res.json());

  const graph = new Graph({
    // ... Other configurations
    data,
  });
}
```

## Method 2: Load remote data after the graph instance is created

```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... Other configurations
});

fetch('data source url')
  .then((res) => res.json())
  .then((data) => {
    // Load data
    graph.read(data);
  });
```
