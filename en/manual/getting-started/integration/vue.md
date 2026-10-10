---
title: "vue"
description: "vue"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/getting-started/integration/vue/"
version: "5.1.1"
---

:::warning
Please do not pass Vue reactive data directly to the G6 instance, which may cause G6 to fail to render correctly, or even cause the page to crash.
:::

Refer to the example below, you can use G6 in Vue, and you can also view the [Live Example](https://stackblitz.com/edit/g6-in-vue?file=src/App.vue)。

<iframe src="https://stackblitz.com/edit/g6-in-vue?embed=1&file=src%2FApp.vue&theme=light"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="G6 Vue"></iframe>

```html
<template>
  <div id="container"></div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { Graph } from '@antv/g6';

  onMounted(() => {
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 500,
      height: 500,
      data: {
        nodes: [
          {
            id: 'node-1',
            style: { x: 50, y: 100 },
          },
          {
            id: 'node-2',
            style: { x: 150, y: 100 },
          },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    graph.render();
  });
</script>
```
