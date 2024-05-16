```js | ob { pin: false }
(async () => {
  const { Graph, BaseLayout, register, ExtensionCategory } = window.g6;

  class DiagonalLayout extends BaseLayout {
    id = 'diagonal-layout';

    async execute(data) {
      const { nodes = [] } = data;
      return {
        nodes: nodes.map((node, index) => ({
          id: node.id,
          style: {
            x: 50 * index + 25,
            y: 50 * index + 25,
          },
        })),
      };
    }
  }

  register(ExtensionCategory.LAYOUT, 'diagonal', DiagonalLayout);

  const container = createContainer({ width: 200, height: 200 });

  const graph = new Graph({
    container,
    width: 200,
    height: 200,
    data: {
      nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
    },
    layout: {
      type: 'diagonal',
    },
  });

  await graph.render();

  return container;
})();
```
