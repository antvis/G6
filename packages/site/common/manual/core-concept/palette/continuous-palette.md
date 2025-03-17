```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i}`, data: { value: (i + 1) * 20 } })),
    },
    layout: { type: 'grid', cols: 6 },
    node: {
      palette: {
        type: 'value',
        field: 'value',
        color: (value) => `rgb(${value * 255}, 0, 0)`,
      },
    },
  },
  { width: 200, height: 50 },
);
```
