```js | ob { pin: false }
(async () => {
  const { BaseBehavior, CanvasEvent, register, ExtensionCategory, Graph } = window.g6;

  class ClickAddNode extends BaseBehavior {
    constructor(context, options) {
      super(context, options);

      const { graph } = this.context;
      graph.on(CanvasEvent.CLICK, (event) => {
        const { layerX, layerY } = event.nativeEvent;
        graph.addNodeData([
          {
            id: 'node-' + Date.now(),
            style: { x: layerX, y: layerY, fill: options.fill },
          },
        ]);
        graph.draw();
      });
    }
  }

  register(ExtensionCategory.BEHAVIOR, 'click-add-node', ClickAddNode);

  const wrapEl = await createGraph(
    {
      data: {
        nodes: [],
      },
      behaviors: [
        {
          type: 'click-add-node',
          key: 'click-add-node',
          fill: 'red',
        },
      ],
    },
    { width: 600, height: 300 },
    (gui, graph) => {
      const options = {
        key: 'click-add-node',
        type: 'click-add-node',
        fill: 'red',
      };
      const optionFolder = gui.addFolder('ClickAddNode Options');
      optionFolder.add(options, 'fill', [
        'red',
        'black',
        'blue',
        'green',
        'yellow',
        'purple',
      ]);

      optionFolder.onChange(({ property, value }) => {
        graph.updateBehavior({
          key: 'click-add-node',
          [property]: value,
        });
        graph.render();
      });
    },
  );

  return wrapEl;
})();
```
