```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C'][i % 3] } })),
    },
    layout: { type: 'grid', cols: 6 },
    node: {
      palette: {
        type: 'group',
        field: 'category',
        color: 'tableau',
      },
    },
  },
  { width: 200, height: 50 },
);
```
