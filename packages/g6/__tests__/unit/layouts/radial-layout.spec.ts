import {
  layoutRadialBasic,
  layoutRadialConfigurationTranslate,
  layoutRadialPreventOverlap,
  layoutRadialPreventOverlapUnstrict,
  layoutRadialSort,
} from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('radial layout', () => {
  it('basic', async () => {
    const graph = await createDemoGraph(layoutRadialBasic);
    await expect(graph).toMatchSnapshot(__filename, 'basic');
    graph.destroy();
  });

  it('configuration translate', async () => {
    const graph = await createDemoGraph(layoutRadialConfigurationTranslate);
    await expect(graph).toMatchSnapshot(__filename, 'configuration-translate');
    graph.destroy();
  });

  it('prevent overlap', async () => {
    const graph = await createDemoGraph(layoutRadialPreventOverlap);
    await expect(graph).toMatchSnapshot(__filename, 'prevent-overlap');
    graph.destroy();
  });

  it('prevent overlap unstrict', async () => {
    const graph = await createDemoGraph(layoutRadialPreventOverlapUnstrict);
    await expect(graph).toMatchSnapshot(__filename, 'prevent-overlap-unstrict');
    graph.destroy();
  });

  it('sort', async () => {
    const graph = await createDemoGraph(layoutRadialSort);
    await expect(graph).toMatchSnapshot(__filename, 'sort');
    graph.destroy();
  });
});
