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

export const controllerElement: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const options: G6Spec = {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        width: 20,
        height: 20,
      },
    },
    edge: {
      style: {},
    },
  };

  const elementContext = createContext(canvas, options);

  const elementController = new ElementController(elementContext);

  const renderResult = await elementController.render(elementContext);

  await renderResult?.finished;

  elementContext.dataController.addNodeData([
    { id: 'node-4', style: { x: 50, y: 200, stroke: 'orange' } },
    { id: 'node-5', style: { x: 75, y: 150, stroke: 'purple' } },
    { id: 'node-6', style: { x: 200, y: 100, stroke: 'cyan' } },
  ]);

  elementContext.dataController.removeNodeData(['node-1']);

  elementContext.dataController.updateNodeData([{ id: 'node-2', style: { x: 200, y: 200, stroke: 'green' } }]);

  const result = await elementController.render(elementContext);

  return result;
};

controllerElement.times = [50, 200, 1000];
