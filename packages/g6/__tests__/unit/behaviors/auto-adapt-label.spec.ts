import { Point, type Graph } from '@/src';
import { behaviorAutoAdaptLabel } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior auto adapt label', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorAutoAdaptLabel, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('disable', async () => {
    graph.updateBehavior({ key: 'auto-adapt-label', enable: false });
    await expect(graph).toMatchSnapshot(__filename, 'disable');
  });

  it('update options', async () => {
    graph.updateBehavior({ key: 'auto-adapt-label', enable: true, padding: 60 });
    await expect(graph).toMatchSnapshot(__filename, 'padding-60');
  });

  it('update sorter', async () => {
    graph.updateBehavior({ key: 'auto-adapt-label', padding: 0 });
    const origin: Point = [200, 200, 0];
    graph.zoomTo(3, false, origin);
    await expect(graph).toMatchSnapshot(__filename, 'zoom-3');
    graph.zoomTo(1, false, origin);
  });
});
