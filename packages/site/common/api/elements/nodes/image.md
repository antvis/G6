```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            x: 300,
            y: 110,
            src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
          },
        },
      ],
    },
    node: { type: 'image' },
    plugins: ['grid-line'],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'image' }, 'type').disable();

    const options = {
      size: 50,
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
    };
    const optionFolder = gui.addFolder('image.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'src');

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
