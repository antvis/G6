import { elementPositionCombo } from '@/__tests__/demos';
import type { Graph } from '@/src';
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
