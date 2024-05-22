```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
        { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
      ],
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    combo: {
      style: {
        labelText: (d) => d.id,
        labelPadding: [1, 5],
        labelFill: '#fff',
        labelBackground: true,
        labelBackgroundRadius: 10,
        labelBackgroundFill: '#7863FF',
      },
    },
    behaviors: ['collapse-expand'],
    plugins: ['grid-line'],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      collapsed: false,
      collapsedSize: 32,
      collapsedMarker: true,
      collapsedMarkerFontSize: 12,
      collapsedMarkerType: 'child-count',
    };

    const optionFolder = gui.addFolder('combo2.style');

    optionFolder.add(options, 'collapsed');
    optionFolder.add(options, 'collapsedSize', 0, 100, 1);
    optionFolder.add(options, 'collapsedMarker');
    optionFolder.add(options, 'collapsedMarkerFontSize', 12, 20, 1);
    optionFolder.add(options, 'collapsedMarkerType', ['child-count', 'descendant-count', 'node-count']);

    optionFolder.onChange(({ property, value }) => {
      graph.updateComboData([{ id: 'combo2', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
