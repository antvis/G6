import { Graph } from '@/src';
import { createDemoGraph } from '@@/utils';
import { elementDeleteLastNode } from '../../demos';

describe('delete last node', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementDeleteLastNode, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('removeData', async () => {
    graph.removeData({
      nodes: ['1'],
    });
    graph.addNodeData([{ id: '2', style: { x: 100, y: 300 } }]);

    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'deleteLastNode');
  });
});
