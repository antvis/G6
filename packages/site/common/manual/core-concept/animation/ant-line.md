```js | ob {  pin: false , autoMount: true }
import { register, Line, Graph } from '@antv/g6';

class AntLine extends Line {
  onCreate() {
    this.shapeMap.key.animate([{ lineDashOffset: 20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}

register('edge', 'ant-line', AntLine);

const graph = new Graph({
  container: 'container',
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
    type: 'ant-line',
  },
});

graph.render();
```
