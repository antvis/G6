```js | ob { pin: false }
(() => {
  const { BasePlugin, Graph, register, ExtensionCategory } = window.g6;

  class RemoteDataSource extends BasePlugin {
    constructor(context, options) {
      super(context, options);
      this.loadData();
    }

    async loadData() {
      // mock remote data
      const data = {
        nodes: [
          { id: 'node-1', style: { x: 25, y: 50 } },
          { id: 'node-2', style: { x: 175, y: 50 } },
        ],
        edges: [{ source: 'node-1', target: 'node-2' }],
      };

      const { graph } = this.context;
      graph.setData(data);
      await graph.render();
    }
  }

  register(ExtensionCategory.PLUGIN, 'remote-data-source', RemoteDataSource);

  const container = window.createContainer({ width: 200, height: 100 });

  const graph = new Graph({
    container,
    width: 200,
    height: 100,
    plugins: ['remote-data-source'],
  });

  graph.render();

  return container;
})();
```
