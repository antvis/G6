import { Graph } from '@/src';
import { isObject } from '@antv/util';
import type { STDTestCase } from '../types';

export const comboExpandCollapse: STDTestCase = async (context) => {
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
    behaviors: [{ type: 'drag-element' }, 'collapse-expand'],
  });

  await graph.render();

  comboExpandCollapse.form = (panel) => {
    const config = {
      element: 'combo-1',
      dropEffect: 'move',
      collapse: () => graph.collapse(config.element),
      expand: () => graph.expand(config.element),
    };

    return [
      panel
        .add(config, 'element', {
          'combo-1': 'combo-1',
          'combo-2': 'combo-2',
          'combo-3': 'combo-3',
          'combo-4': 'combo-4',
        })
        .name('Combo'),
      panel.add(config, 'collapse').name('Collapse'),
      panel.add(config, 'expand').name('Expand'),
      panel.add(config, 'dropEffect', ['link', 'move', 'none']).onChange((value: string) => {
        graph.setBehaviors((behaviors) => {
          return behaviors.map((behavior) => {
            if (isObject(behavior) && behavior.type === 'drag-element') {
              return {
                ...behavior,
                dropEffect: value,
              };
            }
            return behavior;
          });
        });
      }),
    ];
  };

  Object.assign(window, { graph });

  return graph;
};
