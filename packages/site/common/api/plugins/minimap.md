minimap.md

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: Array.from({ length: 50 }).map((_, i) => ({
        id: `node-${i}`,
        x: Math.random() * 500,
        y: Math.random() * 300,
      })),
      edges: Array.from({ length: 100 }).map((_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 50)}`,
        target: `node-${Math.floor(Math.random() * 50)}`,
      })),
    },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'minimap', key: 'minimap', size: [240, 160], position: 'right-bottom' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'minimap',
      width: 240,
      height: 160,
      shape: 'key',
      padding: 10,
      position: 'right-bottom',
      maskStyleBorder: '1px solid #ddd',
      maskStyleBackground: 'rgba(0, 0, 0, 0.1)',
      containerStyleBorder: '1px solid #ddd',
      containerStyleBackground: '#fff',
      delay: 128,
    };
    const optionFolder = gui.addFolder('Minimap Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder
      .add(options, 'width', 100, 500, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          size: [value, options.height],
        });
        graph.render();
      });
    optionFolder
      .add(options, 'height', 100, 500, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          size: [options.width, value],
        });
        graph.render();
      });
    optionFolder
      .add(options, 'shape', ['key'])
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          shape: value,
        });
        graph.render();
      });
    optionFolder
      .add(options, 'padding', 0, 50, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          padding: value,
        });
        graph.render();
      });
    optionFolder
      .add(options, 'position', ['right-bottom', 'left-bottom', 'right-top', 'left-top'])
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          position: value,
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'maskStyleBorder')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          maskStyle: { ...options.maskStyle, border: value },
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'maskStyleBackground')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          maskStyle: { ...options.maskStyle, background: value },
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'containerStyleBorder')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          containerStyle: { ...options.containerStyle, border: value },
        });
        graph.render();
      });
    optionFolder
      .addColor(options, 'containerStyleBackground')
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          containerStyle: { ...options.containerStyle, background: value },
        });
        graph.render();
      });
    optionFolder
      .add(options, 'delay', 0, 500, 1)
      .listen()
      .onChange((value) => {
        graph.updatePlugin({
          key: 'minimap',
          delay: value,
        });
        graph.render();
      });

    // Update the maskStyle and containerStyle in the options object
    Object.defineProperty(options, 'maskStyle', {
      get: () => ({
        border: options.maskStyleBorder,
        background: options.maskStyleBackground,
      }),
      set: (value) => {
        options.maskStyleBorder = value.border;
        options.maskStyleBackground = value.background;
      },
    });

    Object.defineProperty(options, 'containerStyle', {
      get: () => ({
        border: options.containerStyleBorder,
        background: options.containerStyleBackground,
      }),
      set: (value) => {
        options.containerStyleBorder = value.border;
        options.containerStyleBackground = value.background;
      },
    });
  },
);
```
