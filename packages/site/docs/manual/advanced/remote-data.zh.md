---
title: 远程数据源
---

如果你的数据不是在本地，而是在远程服务器上，你可以采取下列两种方式处理：

## 方式一：等待远程数据加载完成后再创建图实例

```ts
import { Graph } from '@antv/g6';

async function init() {
  const data = await fetch('data source url').then((res) => res.json());

  const graph = new Graph({
    // ... 其他配置项
    data,
  });
}
```

## 方式二：在图实例创建完成后再加载远程数据

```ts
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... 其他配置项
});

fetch('data source url')
  .then((res) => res.json())
  .then((data) => {
    // 加载数据
    graph.read(data);
  });
```
