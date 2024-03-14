import type { Graph } from '@/src';
import { controllerElementZIndex } from '@@/demo/static/controller-element-z-index';
import { createDemoGraph } from '@@/utils';

describe('element z-index', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(controllerElementZIndex);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('front', async () => {
    graph.frontElement('node-2');

    await expect(graph).toMatchSnapshot(__filename, 'front');
  });

  it('to', async () => {
    graph.setElementZIndex({ 'node-2': 0 });

    await expect(graph).toMatchSnapshot(__filename);
  });
});
