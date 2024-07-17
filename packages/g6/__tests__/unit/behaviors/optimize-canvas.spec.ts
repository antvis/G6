import { behaviorOptimizeCanvas } from '@/__tests__/demos';
import { GraphEvent, type Graph } from '@/src';
import { createDemoGraph } from '@@/utils';

describe('behavior optimize canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorOptimizeCanvas, { animation: false });
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
  });

  it('destroy', () => {
    graph.destroy();
  });
});
