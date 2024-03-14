import {
  layoutCircularBasic,
  layoutCircularConfigurationTranslate,
  layoutCircularDegree,
  layoutCircularDivision,
  layoutCircularSpiral,
} from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular', () => {
  it('layoutCircularBasic', async () => {
    const graph = await createDemoGraph(layoutCircularBasic);
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-basic');
    graph.destroy();
  });

  it('layoutCircularConfigurationTranslate', async () => {
    const graph = await createDemoGraph(layoutCircularConfigurationTranslate);
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-configuration-translate');

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
    graph.destroy();
  });

  it('layoutCircularDegree', async () => {
    const graph = await createDemoGraph(layoutCircularDegree);
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-degree');
    graph.destroy();
  });

  it('layoutCircularDivision', async () => {
    const graph = await createDemoGraph(layoutCircularDivision);
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-division');
    graph.destroy();
  });

  it('layoutCircularSpiral', async () => {
    const graph = await createDemoGraph(layoutCircularSpiral);
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-spiral');
    graph.destroy();
  });
});
