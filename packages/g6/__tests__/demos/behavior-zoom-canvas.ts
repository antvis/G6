import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const behaviorZoomCanvas: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'd3-force',
    },
    node: {
      style: {
        size: 20,
      },
    },
    zoomRange: [0.5, 5],
    behaviors: [{ type: 'zoom-canvas' }],
  });

  await graph.render();

  behaviorZoomCanvas.form = (panel) => {
    const config = {
      DisableZoom: false,
      addShortcutZoom: () => {
        graph.setBehaviors((currBehaviors) => [
          ...currBehaviors,
          {
            key: 'shortcut-zoom-canvas',
            type: 'zoom-canvas',
            trigger: {
              zoomIn: ['Control', '='],
              zoomOut: ['Control', '-'],
              reset: ['Control', '0'],
            },
          },
        ]);
        alert('Zoom behavior added');
      },
      removeShortcutZoom: () => {
        graph.setBehaviors((currBehaviors) => {
          return currBehaviors.slice(0, 1);
        });
        alert('Zoom behavior removed');
      },
    };

    return [
      panel.add(config, 'DisableZoom').onChange((disable: boolean) => {
        graph.setBehaviors((currBehaviors) => {
          return currBehaviors.map((behavior, index) => {
            if (index === 0 && typeof behavior === 'object') {
              return { ...behavior, enable: !disable };
            }
            return behavior;
          });
        });
      }),
      panel.add(config, 'addShortcutZoom'),
      panel.add(config, 'removeShortcutZoom'),
    ];
  };

  return graph;
};
