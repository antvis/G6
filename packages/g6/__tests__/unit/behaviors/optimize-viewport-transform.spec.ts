import { GraphEvent, type Graph } from '@/src';
import { behaviorOptimizeViewportTransform } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior optimize canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorOptimizeViewportTransform, { animation: false });
  });

  it('viewport', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(GraphEvent.BEFORE_TRANSFORM, {
      type: GraphEvent.BEFORE_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, -3],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'viewport-change');
    graph.emit(GraphEvent.AFTER_TRANSFORM, {
      type: GraphEvent.AFTER_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, -1],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'after-viewport-change');
  });

  it('destroy', () => {
    graph.destroy();
  });
});
