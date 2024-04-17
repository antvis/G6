import { pluginHull } from '@/__tests__/demos';
import type { Graph, Hull } from '@/src';
import { createDemoGraph } from '@@/utils';

describe('plugin hull', () => {
  let graph: Graph;
  let hull: Hull;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginHull, { animation: false });
    hull = graph.getPluginInstance<Hull>('hull');
  });

  afterAll(() => {
    graph.destroy();
  });

  it('init', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'default');
  });

  it('update corner', async () => {
    hull.updateOptions((options) => ({ ...options, corner: 'sharp' }));
    await expect(graph).toMatchSnapshot(__filename, 'corner__sharp');
    hull.updateOptions((options) => ({ ...options, corner: 'smooth' }));
    await expect(graph).toMatchSnapshot(__filename, 'corner__smooth');
    hull.updateOptions((options) => ({ ...options, corner: 'rounded' }));
    await expect(graph).toMatchSnapshot(__filename, 'corner__rounded');
  });

  it('update padding', async () => {
    hull.updateOptions((options) => ({ ...options, padding: 20 }));
    await expect(graph).toMatchSnapshot(__filename, 'padding__20');
    hull.updateOptions((options) => ({ ...options, padding: 0 }));
    await expect(graph).toMatchSnapshot(__filename, 'padding__0');
  });

  it('update labelPlacement', async () => {
    hull.updateOptions((options) => ({ ...options, labelPlacement: 'top' }));
    await expect(graph).toMatchSnapshot(__filename, 'labelPlacement__top');
    hull.updateOptions((options) => ({ ...options, labelPlacement: 'left' }));
    await expect(graph).toMatchSnapshot(__filename, 'labelPlacement__left');
    hull.updateOptions((options) => ({ ...options, labelPlacement: 'right' }));
    await expect(graph).toMatchSnapshot(__filename, 'labelPlacement__right');
    hull.updateOptions((options) => ({ ...options, labelPlacement: 'bottom' }));
    await expect(graph).toMatchSnapshot(__filename, 'labelPlacement__bottom');
  });

  it('update labelCloseToPath', async () => {
    hull.updateOptions((options) => ({ ...options, labelCloseToPath: false }));
    await expect(graph).toMatchSnapshot(__filename, 'labelCloseToHull__false');
    hull.updateOptions((options) => ({ ...options, labelCloseToPath: true }));
    await expect(graph).toMatchSnapshot(__filename, 'labelCloseToHull__true');
  });

  it('update labelAutoRotate', async () => {
    hull.updateOptions((options) => ({ ...options, labelAutoRotate: false }));
    await expect(graph).toMatchSnapshot(__filename, 'labelAutoRotate__false');
    hull.updateOptions((options) => ({ ...options, labelAutoRotate: true }));
    await expect(graph).toMatchSnapshot(__filename, 'labelAutoRotate__true');
  });

  it('addMembers', async () => {
    hull.addMembers('node3');
    await expect(graph).toMatchSnapshot(__filename, 'addMembers__node3');
  });

  it('removeMembers', async () => {
    hull.removeMembers('node1');
    await expect(graph).toMatchSnapshot(__filename, 'removeMembers__node1');
  });

  it('updateMembers', async () => {
    hull.updateMembers(['node5', 'node6']);
    await expect(graph).toMatchSnapshot(__filename, 'updateMembers');
  });
});
