import { Graph } from '@/src';
import { IGraphWithHistory } from '../../../src/plugins/history/api';
import type { STDTestCase } from '../types';

export const pluginHistory: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-2', x: 120, y: 100 } },
        { id: 'node-2', style: { parentId: 'combo-1', x: 300, y: 200 } },
        { id: 'node-3', style: { parentId: 'combo-1', x: 200, y: 300 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3' },
      ],
      combos: [
        {
          id: 'combo-1',
          style: { type: 'rect', parentId: 'combo-2', collapsed: true },
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
    plugins: ['history'],
  });

  await graph.render();

  pluginHistory.form = (panel) => {
    const config = {
      element: 'node-1',
      visible: true,
      add: () => {
        graph.addNodeData([{ id: 'node-5', style: { x: 200, y: 200 } }]);
        graph.draw();
      },
      remove: () => {
        // graph.removeComboData(['combo-1', 'combo-2']);
        graph.removeNodeData(['node-5']);

        graph.draw();
      },
      undo: () => (graph as IGraphWithHistory).undo(),
      redo: () => (graph as IGraphWithHistory).redo(),
    };
    const visible = panel
      .add(config, 'visible')
      .name('node-1 visibility')
      .onChange((value: boolean) => {
        value ? graph.showElement(config.element) : graph.hideElement(config.element);
      });
    return [
      visible,
      panel.add(config, 'add').name('add node-5'),
      panel.add(config, 'remove').name('remove node-5'),
      panel.add(config, 'undo'),
      panel.add(config, 'redo'),
    ];
  };

  return graph;
};
