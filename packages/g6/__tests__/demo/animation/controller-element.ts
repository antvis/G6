import type { G6Spec } from '../../../src';
import { createGraph } from '../../mock';
import type { AnimationTestCase } from '../types';

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

  const graph = createGraph(options, canvas);
  await graph.render();

  graph.addNodeData([
    { id: 'node-4', style: { x: 50, y: 200, stroke: 'orange' } },
    { id: 'node-5', style: { x: 75, y: 150, stroke: 'purple' } },
    { id: 'node-6', style: { x: 200, y: 100, stroke: 'cyan' } },
  ]);

  graph.removeNodeData(['node-1']);

  graph.updateNodeData([{ id: 'node-2', style: { x: 200, y: 200, stroke: 'green' } }]);

  // @ts-expect-error context is private.
  const element = graph.context.element;
  // @ts-expect-error element.render() returns Proxy is not good design.
  const result = await element.render(element.context);
  return result;
};

controllerElement.times = [50, 200, 1000];
