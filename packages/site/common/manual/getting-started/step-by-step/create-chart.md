```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 150, y: 50 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
  },
  { width: 200, height: 100 },
);
```
