import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-0', style: { x: 200, y: 150 } }],
  },
  node: {
    style: {
      size: 60,
      labelText: 'Drag Me!',
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
  },
  behaviors: ['drag-element'],
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});

graph.render().then(() => {
  window.addPanel((gui) => {
    const history = graph.getPluginInstance('history');
    const config = {
      undo: () => {
        if (history.canUndo()) history.undo();
      },
      redo: () => {
        if (history.canRedo()) history.redo();
      },
    };
    gui.add(config, 'undo').name('⬅️ undo');
    gui.add(config, 'redo').name('➡️ redo');
  });
});
