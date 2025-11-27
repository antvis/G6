import { Graph } from '@antv/g6';

const graph = new Graph({
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  autoFit: 'center',
  background: '#fff',
  plugins: [
    {
      type: 'fullscreen',
      key: 'fullscreen',
    },
    function () {
      const graph = this;
      return {
        type: 'toolbar',
        key: 'toolbar',
        position: 'top-left',
        onClick: (item) => {
          const fullscreenPlugin = graph.getPluginInstance('fullscreen');
          if (item === 'request-fullscreen') {
            fullscreenPlugin.request();
          }
          if (item === 'exit-fullscreen') {
            fullscreenPlugin.exit();
          }
        },
        getItems: () => {
          return [
            { id: 'request-fullscreen', value: 'request-fullscreen' },
            { id: 'exit-fullscreen', value: 'exit-fullscreen' },
          ];
        },
      };
    },
  ],
});

graph.render();
