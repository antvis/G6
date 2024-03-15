import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const controllerElementZIndex: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 150, y: 150, color: 'red' } },
        { id: 'node-2', style: { x: 175, y: 175, color: 'green' } },
        { id: 'node-3', style: { x: 200, y: 200, color: 'blue' } },
      ],
    },
    theme: 'light',
    node: {
      style: {
        size: 50,
      },
    },
  };

  const graph = new Graph(options);
  await graph.render();
  const front = () => graph.frontElement('node-2');
  const to = (zIndex: number) => graph.setElementZIndex('node-2', zIndex);

  controllerElementZIndex.form = (panel) => [
    panel.add({ front }, 'front').name('Bring Element To Front'),
    panel.add({ to: 0 }, 'to', -10, 10, 1).onChange((zIndex: number) => to(zIndex)),
  ];

  return graph;
};
