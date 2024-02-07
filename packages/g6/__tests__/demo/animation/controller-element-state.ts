import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import type { RuntimeContext } from '../../../src/runtime/types';
import { Graph } from '../../mock';
import type { AnimationTestCase } from '../types';

const createContext = (canvas: any, options: G6Spec): RuntimeContext => {
  const dataController = new DataController();
  dataController.setData(options.data || {});
  return {
    canvas,
    graph: new Graph() as any,
    options,
    dataController,
  };
};

export const controllerElementState: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const options: G6Spec = {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, states: ['active', 'selected'] } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150, states: ['active'] } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', style: { states: ['active'] } },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        lineWidth: 1,
        width: 10,
        height: 10,
      },
      state: {
        active: {
          lineWidth: 2,
        },
        selected: {
          fill: 'pink',
        },
      },
      animation: {
        update: [{ fields: ['lineWidth', 'fill'] }],
      },
    },
    edge: {
      style: {
        lineWidth: 1,
      },
      state: {
        active: {
          lineWidth: 2,
          stroke: 'pink',
        },
      },
      animation: {
        update: [
          {
            fields: ['lineWidth', 'stroke'],
          },
        ],
      },
    },
  };

  const elementContext = createContext(canvas, options);

  const elementController = new ElementController(elementContext);

  const renderResult = await elementController.render(elementContext);

  await renderResult?.finished;

  elementContext.dataController.updateData({
    nodes: [
      { id: 'node-1', style: { states: [] } },
      { id: 'node-2', style: { states: ['active'] } },
      { id: 'node-3', style: { states: ['selected'] } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2', style: { states: [] } },
      { source: 'node-2', target: 'node-3', style: { states: ['active'] } },
    ],
  });

  const result = await elementController.render(elementContext);

  return result;
};

controllerElementState.times = [0, 1000];
