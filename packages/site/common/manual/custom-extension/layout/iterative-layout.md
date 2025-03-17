```js | ob { pin: false }
(async () => {
  const { Graph, BaseLayout, register, ExtensionCategory } = window.g6;
  class TickTockLayout extends BaseLayout {
    id = 'tick-tock-layout';

    async execute(data, options) {
      const { onTick } = { ...this.options, ...options };

      this.tickCount = 0;
      this.data = data;

      this.promise = new Promise((resolve) => {
        this.resolve = resolve;
      });

      this.timer = window.setInterval(() => {
        onTick(this.simulateTick());
        if (this.tickCount === 10) this.stop();
      }, 200);

      await this.promise;

      return this.simulateTick();
    }

    simulateTick = () => {
      const x = this.tickCount++ % 2 === 0 ? 50 : 150;

      return {
        nodes: (this?.data?.nodes || []).map((node, index) => ({
          id: node.id,
          style: { x, y: (index + 1) * 30 },
        })),
      };
    };

    tick = () => {
      return this.simulateTick();
    };

    stop = () => {
      clearInterval(this.timer);
      this.resolve?.();
    };
  }

  register(ExtensionCategory.LAYOUT, 'tick-tock', TickTockLayout);

  const container = createContainer({ width: 200, height: 200 });

  const graph = new Graph({
    container,
    width: 200,
    height: 200,
    animation: true,
    data: {
      nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
    },
    layout: {
      type: 'tick-tock',
    },
  });

  graph.render();

  return container;
})();
```
