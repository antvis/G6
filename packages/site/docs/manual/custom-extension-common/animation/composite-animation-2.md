```js | ob { pin: false }
(() => {
  const container = createContainer({ width: 200, height: 50 });

  const graph = new window.g6.Graph({
    width: 200,
    height: 50,
    container,
    data: {
      nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
    },
    node: {
      animation: {
        update: [
          {
            fields: ['x', 'y'],
          },
          { fields: ['r', 'fill'], shape: 'key' },
        ],
      },
    },
  });

  graph.draw().then(() => {
    graph.updateNodeData([{ id: 'node-1', style: { x: 175, size: 40, fill: 'pink' } }]);
    graph.draw();
  });

  return container;
})();
```
