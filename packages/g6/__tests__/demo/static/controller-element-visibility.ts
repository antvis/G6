import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import type { RuntimeContext } from '../../../src/runtime/types';
import { idOf } from '../../../src/utils/id';
import { Graph } from '../../mock';
import type { StaticTestCase } from '../types';
import { getEnv } from '../utils/env';

const createContext = (canvas: any, options: G6Spec): RuntimeContext => {
  const model = new DataController();
  model.setData(options.data || {});
  return {
    canvas,
    graph: new Graph() as any,
    options,
    model,
  };
};

export const controllerElementVisibility: StaticTestCase = async (context) => {
  const { canvas, animation, toMatchSVGSnapshot } = context;

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

  const elementContext = createContext(canvas, options);

  const elementController = new ElementController(elementContext);

  const result = await elementController.render(elementContext);

  await result?.finished;

  const hide = () =>
    elementController.setElementsVisibility(
      ['node-3', idOf(options.data!.edges![1]), idOf(options.data!.edges![2])],
      'hidden',
    );
  const show = () =>
    elementController.setElementsVisibility(
      ['node-3', idOf(options.data!.edges![1]), idOf(options.data!.edges![2])],
      'visible',
    );

  if (getEnv() === 'node') {
    await hide()?.finished;
    await toMatchSVGSnapshot?.('hidden');
    await show()?.finished;
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
