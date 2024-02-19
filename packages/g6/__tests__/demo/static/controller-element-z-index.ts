import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import type { RuntimeContext } from '../../../src/runtime/types';
import { Graph } from '../../mock';
import type { StaticTestCase } from '../types';

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

export const controllerElementZIndex: StaticTestCase = async (context) => {
  const { canvas, animation, toMatchSVGSnapshot, env } = context;

  const options: G6Spec = {
    animation,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 150, y: 150, fill: 'red' } },
        { id: 'node-2', style: { x: 175, y: 175, fill: 'green' } },
        { id: 'node-3', style: { x: 200, y: 200, fill: 'blue' } },
      ],
    },
    theme: 'light',
    node: {
      style: {
        width: 50,
        height: 50,
      },
      animation: animation && {},
    },
  };

  const elementContext = createContext(canvas, options);

  const elementController = new ElementController(elementContext);

  const result = await elementController.render(elementContext);

  await result?.finished;

  const front = () => elementController.setElementZIndex('node-2', 'front');
  const back = () => elementController.setElementZIndex('node-2', 'back');
  const to = (zIndex: number) => elementController.setElementZIndex('node-2', zIndex);

  if (env === 'test') {
    front();
    await toMatchSVGSnapshot?.('front');
    back();
    await toMatchSVGSnapshot?.('back');
    to(0);
  }

  controllerElementZIndex.form = [
    {
      type: 'button',
      options: { innerText: 'Bring To Front' },
      onload: (button) => button.addEventListener('click', front),
    },
    {
      type: 'button',
      options: { innerText: 'Send To Back' },
      onload: (button) => button.addEventListener('click', back),
    },
    {
      label: 'Set zIndex:',
      type: 'input',
      options: { type: 'number' },
      onload: (input) =>
        input.addEventListener('change', (e) => {
          const value = (e.target as HTMLInputElement).value;
          if (value !== '') to(+value);
        }),
    },
  ];
};
