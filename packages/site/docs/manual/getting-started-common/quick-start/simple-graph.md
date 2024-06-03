```js | ob { pin: false }
fetch('https://assets.antv.antgroup.com/g6/graph.json')
  .then((res) => res.json())
  .then((data) =>
    createGraph(
      {
        data,
        autoFit: 'view',
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3-force',
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      },
      { width: 500, height: 500 },
    ),
  );
```
