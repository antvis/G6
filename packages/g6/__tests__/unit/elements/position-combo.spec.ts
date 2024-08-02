import type { Graph } from '@/src';
import { elementPositionCombo } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element position combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementPositionCombo, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });
});
