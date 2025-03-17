```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(30).fill(0).map((_, i) => ({ id: `node-${i}` })),
    },
    layout: { type: 'grid', cols: 10, rows: 3 },
    node: {
      palette: 'spectral',
    },
  },
  { width: 400, height: 100 },
);
```
