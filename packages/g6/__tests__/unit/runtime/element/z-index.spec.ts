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
    graph.setElementZIndex({ 'node-2': 'front' });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__front');
  });

  it('back', async () => {
    graph.setElementZIndex({ 'node-2': 'back' });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__back');
  });

  it('to', async () => {
    graph.setElementZIndex({ 'node-2': 0 });

    await expect(graph.getCanvas()).toMatchSnapshot(__filename);
  });
});
