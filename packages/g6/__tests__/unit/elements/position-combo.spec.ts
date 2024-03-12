import type { Graph } from '@/src';
import { elementPositionCombo } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('element position combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementPositionCombo, { animation: false });
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });
});
