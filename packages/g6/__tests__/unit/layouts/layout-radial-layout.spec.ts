import {
  layoutRadialBasic,
  layoutRadialConfigurationTranslate,
  layoutRadialPreventOverlap,
  layoutRadialPreventOverlapUnstrict,
  layoutRadialSort,
} from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular', () => {
  it('layoutRadialBasic', async () => {
    const graph = await createDemoGraph(layoutRadialBasic);
    await expect(graph).toMatchSnapshot(__filename, 'layout-radial-basic');
    graph.destroy();
  });

  it('layoutRadialConfigurationTranslate', async () => {
    const graph = await createDemoGraph(layoutRadialConfigurationTranslate);
    await expect(graph).toMatchSnapshot(__filename, 'layout-radial-configuration-translate');
    graph.setLayout({
      type: 'radial',
      unitRadius: 50,
      focusNode: '0',
      preventOverlap: false,
    }),
      await graph.layout();

    await expect(graph).toMatchSnapshot(__filename, 'layout-radial-configuration-translate-focus');
    graph.destroy();
  });

  it('layoutRadialPreventOverlap', async () => {
    const graph = await createDemoGraph(layoutRadialPreventOverlap);
    await expect(graph).toMatchSnapshot(__filename, 'layout-radial-prevent-overlap');
    graph.destroy();
  });

  it('layoutRadialPreventOverlapUnstrict', async () => {
    const graph = await createDemoGraph(layoutRadialPreventOverlapUnstrict);
    await expect(graph).toMatchSnapshot(__filename, 'layout-radial-prevent-overlap-unstrict');
    graph.destroy();
  });

  it('layoutRadialSort', async () => {
    const graph = await createDemoGraph(layoutRadialSort);
    await expect(graph).toMatchSnapshot(__filename, 'layout-radial-sort');
    graph.destroy();
  });
});
