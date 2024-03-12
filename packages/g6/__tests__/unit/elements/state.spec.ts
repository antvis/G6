import type { Graph } from '@/src';
import { elementState } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('element state', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementState, { animation: false });
  });

  it('default status', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename);
  });

  it('set state', async () => {
    graph.setElementState({
      'node-1': ['active'],
      'node-2': ['selected'],
      'edge-1': [],
      'edge-2': ['active'],
    });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__setState');
  });

  it('set state single api', async () => {
    graph.setElementState('node-1', ['selected']);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__setState-single');

    graph.setElementState('node-1', []);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__setState-single-default');
  });
});
