import type { History } from '@antv/g6';
import { Graph } from '@antv/g6';

export const pluginHistory: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', combo: 'combo-2', style: { x: 120, y: 100 } },
        { id: 'node-2', combo: 'combo-1', style: { x: 300, y: 200 } },
        { id: 'node-3', combo: 'combo-1', style: { x: 200, y: 300 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3' },
      ],
      combos: [
        {
          id: 'combo-1',
          type: 'rect',
          combo: 'combo-2',
          style: { collapsed: true },
        },
        { id: 'combo-2' },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    combo: {
      style: {
        labelText: (d) => d.id,
        lineDash: 0,
        collapsedLineDash: [5, 5],
      },
    },
    behaviors: ['drag-element', 'collapse-expand'],
    plugins: [{ key: 'history', type: 'history' }],
  });

  await graph.render();

  const history = graph.getPluginInstance<History>('history');

  pluginHistory.form = (panel) => {
    const config = {
      element: 'node-1',
      visible: true,
      add: () => {
        graph.addData({
          nodes: [{ id: 'node-5', style: { x: 200, y: 100, fill: 'pink' } }],
          edges: [{ source: 'node-1', target: 'node-5', style: { stroke: 'brown' } }],
        });
        graph.draw();
      },
      update: () => {
        graph.updateData({
          nodes: [{ id: 'node-1', style: { x: 150, y: 100, fill: 'red' } }],
          edges: [{ id: 'edge-1', style: { stroke: 'green' } }],
        });
        graph.draw();
      },
      remove: () => {
        graph.removeData({
          nodes: ['node-1'],
          edges: ['edge-1'],
        });
        graph.draw();
      },
      collapse: () => graph.collapseElement('combo-2'),
      expand: () => graph.expandElement('combo-1'),
      state: () => graph.setElementState('node-1', 'selected', true),
      zIndex: () => graph.setElementZIndex('combo-2', 100),
      undo: () => history.undo(),
      redo: () => history.redo(),
      clear: () => history.clear(),
    };
    const visible = panel
      .add(config, 'visible')
      .name('node-1 visibility')
      .onChange((value: boolean) => {
        value ? graph.showElement(config.element) : graph.hideElement(config.element);
      });
    return [
      visible,
      panel.add(config, 'add').name('add'),
      panel.add(config, 'update').name('update'),
      panel.add(config, 'remove').name('remove'),
      panel.add(config, 'collapse').name('collapse combo2'),
      panel.add(config, 'expand').name('expand combo1'),
      panel.add(config, 'state').name('set node1 selected'),
      panel.add(config, 'zIndex').name('front combo2'),
      panel.add(config, 'undo'),
      panel.add(config, 'redo'),
      panel.add(config, 'clear'),
    ];
  };

  return graph;
};
