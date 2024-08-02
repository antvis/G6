import { Graph } from '@antv/g6';

export const behaviorExpandCollapseCombo: TestCase = async (context) => {
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
          style: {
            collapsed: true,
          },
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
      },
    },
    behaviors: [{ type: 'drag-element' }, 'collapse-expand', 'click-select'],
  });

  await graph.render();

  behaviorExpandCollapseCombo.form = (panel) => {
    const config = {
      element: 'combo-1',
      dropEffect: 'move',
      collapse: () => graph.collapseElement(config.element),
      expand: () => graph.expandElement(config.element),
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
            if (typeof behavior === 'object' && behavior.type === 'drag-element') {
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
