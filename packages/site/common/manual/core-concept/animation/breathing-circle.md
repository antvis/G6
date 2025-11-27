```js | ob { pin: false, inject: true }
import { register, Circle, Graph } from '@antv/g6';

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

const graph = new Graph({
  container: 'container',
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

graph.render();
```
