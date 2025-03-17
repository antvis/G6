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
            style: { x: layerX, y: layerY },
          },
        ]);
        graph.draw();
      });
    }
  }

  register(ExtensionCategory.BEHAVIOR, 'click-add-node', ClickAddNode);

  const container = createContainer({ width: 300, height: 300 });
  container.style.border = '1px solid #ccc';

  const graph = new Graph({
    container,
    width: 300,
    height: 300,
    data: {
      nodes: [],
    },
    behaviors: ['click-add-node'],
  });

  await graph.render();

  return container;
})();
```
