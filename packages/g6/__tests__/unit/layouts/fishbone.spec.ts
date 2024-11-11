import type { Graph } from '@/src';
import { layoutFishbone } from '@@/demos/layout-fishbone';
import { createDemoGraph } from '@@/utils';

describe('fishbone', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutFishbone);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'direction-LR');
  });

  it('direction RL', async () => {
    graph.setLayout((prev) => ({ ...prev, type: 'fishbone', direction: 'RL' }));
    await graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'direction-RL');
  });

  it('vGap and hGap', async () => {
    graph.setLayout((prev) => ({ ...prev, type: 'fishbone', vGap: 32, hGap: 32 }));
    await graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'vGap-32-hGap-32');
  });
});
