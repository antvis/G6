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
