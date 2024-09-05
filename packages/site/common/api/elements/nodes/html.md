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
            size: [120, 40],
            innerHTML: `
<div style="width: 100%; height: 100%; background: #7e3feb; display: flex; justify-content: center; align-items: center;">
  <span style="color: #fff; font-size: 12px;">
    HTML Node
  </span>
</div>`,
          },
        },
      ],
    },
    node: { type: 'html' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'html' }, 'type').disable();

    const options = {
      size: 50,
      innerHTML: `
<div style="width: 100%; height: 100%; background: #7863FF; display: flex; justify-content: center; align-items: center;">
  <span style="color: #fff; font-size: 20px;">
    'HTML Node'
  </span>
</div>`,
    };
    const optionFolder = gui.addFolder('html.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'innerHTML');

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
