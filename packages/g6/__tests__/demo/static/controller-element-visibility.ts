import type { G6Spec } from '../../../src';
import { idOf } from '../../../src/utils/id';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerElementVisibility: StaticTestCase = async (context) => {
  const { canvas, animation, toMatchSVGSnapshot, env } = context;

  const options: G6Spec = {
    animation,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150, opacity: 0.5 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3', style: { opacity: 0.5 } },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        width: 20,
        height: 20,
      },
      animation: animation && {},
    },
    edge: {
      style: {},
      animation: animation && {},
    },
  };

  const graph = createGraph(options, canvas);
  await graph.render();

  const hide = () =>
    graph.setElementVisibility(['node-3', idOf(options.data!.edges![1]), idOf(options.data!.edges![2])], 'hidden');
  const show = () =>
    graph.setElementVisibility(['node-3', idOf(options.data!.edges![1]), idOf(options.data!.edges![2])], 'visible');

  if (env === 'test') {
    await hide();
    await toMatchSVGSnapshot?.('hidden');
    await show();
  }

  controllerElementVisibility.form = [
    {
      type: 'button',
      options: { innerText: 'Show' },
      onload: (button) => button.addEventListener('click', show),
    },
    {
      type: 'button',
      options: { innerText: 'Hide' },
      onload: (button) => button.addEventListener('click', hide),
    },
  ];
};
