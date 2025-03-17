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

  const container = createContainer({ width: 50, height: 50 });

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
