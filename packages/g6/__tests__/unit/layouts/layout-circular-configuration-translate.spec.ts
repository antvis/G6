import type { Graph } from '@/src';
import { layoutCircularConfigurationTranslate } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular configuration translate', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCircularConfigurationTranslate);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-configuration-translate');
  });

  it('change layout', async () => {
    graph.setLayout({
      type: 'circular',
      radius: 200,
      startAngle: Math.PI / 4,
      endAngle: Math.PI,
      divisions: 5,
      ordering: 'degree',
    }),
      await graph.layout();

    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-configuration-translate-division');
  });
});
