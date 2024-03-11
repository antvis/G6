import type { Graph } from '@/src';
import { elementVisibility } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('element visibility', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementVisibility, { animation: false });
  });

  it('default status', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename);
  });

  it('hide', async () => {
    await graph.setElementVisibility({
      'node-1': 'hidden',
      'node-2': 'hidden',
      'node-3': 'hidden',
      'edge-1': 'hidden',
      'edge-2': 'hidden',
      'edge-3': 'hidden',
    });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__hide');
  });

  it('show', async () => {
    await graph.setElementVisibility({
      'node-1': 'visible',
      'node-2': 'visible',
      'edge-1': 'visible',
    });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__show');
  });

  it('show and hide', async () => {
    await graph.setElementVisibility({
      'node-1': 'hidden',
      'node-3': 'visible',
      'edge-1': 'hidden',
      'edge-2': 'visible',
    });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__show-and-hide');
  });
});
