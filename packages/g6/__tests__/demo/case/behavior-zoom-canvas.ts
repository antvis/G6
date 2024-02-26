import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const behaviorZoomCanvas: STDTestCase = async (context) => {
  const { canvas, animation } = context;
  const graph = new Graph({
    animation,
    container: canvas,
    data,
    layout: {
      type: 'd3force',
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

  behaviorZoomCanvas.form = [
    {
      label: 'Disable Zoom: ',
      type: 'input',
      onload: (input) => {
        input.onchange = (e) => {
          graph.setBehaviors((currBehaviors) => {
            return currBehaviors.map((behavior, index) => {
              const target = e.target as HTMLInputElement;
              if (index === 0 && typeof behavior === 'object') {
                return { ...behavior, enable: !target.checked };
              }
              return behavior;
            });
          });
        };
      },
      options: { type: 'checkbox' },
    },
    {
      type: 'button',
      onload: (button) => {
        button.innerText = 'Add Shortcut Zoom';
        button.onclick = () => {
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
        };
      },
    },

    {
      type: 'button',
      onload: (button) => {
        button.innerText = 'Remove Shortcut Zoom';
        button.onclick = () => {
          graph.setBehaviors((currBehaviors) => {
            return currBehaviors.slice(0, 1);
          });
          alert('Zoom behavior removed');
        };
      },
    },
  ];

  return graph;
};
