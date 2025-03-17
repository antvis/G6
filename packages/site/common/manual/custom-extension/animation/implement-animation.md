```js | ob { pin: false }
(() => {
  const container = createContainer({ width: 50, height: 50 });

  const graph = new window.g6.Graph({
    width: 50,
    height: 50,
    container,
    data: {
      nodes: [{ id: 'node-1', style: { x: 25, y: 25, size: 20 } }],
    },
    node: {
      animation: {
        update: [
          {
            fields: ['r'],
            shape: 'key',
          },
        ],
      },
    },
  });

  graph.draw().then(() => {
    graph.updateNodeData([{ id: 'node-1', style: { size: 40 } }]);
    graph.draw();
  });

  return container;
})();
```
