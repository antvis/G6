import type { ElementType, Graph } from '@/src';
import { GraphEvent } from '@/src';
import { behaviorOptimizeViewportTransform } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import type { DisplayObject } from '@antv/g';

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
    await expect(graph).toMatchSnapshot(__filename, 'viewport-change-key');
    graph.emit(GraphEvent.AFTER_TRANSFORM, {
      type: GraphEvent.AFTER_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, 3],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'after-viewport-change');
  });

  it("show node's key and icon shapes", async () => {
    graph.updateBehavior({
      key: 'optimize-viewport-transform',
      shapes: (type: ElementType, shape: DisplayObject) => type === 'node' && ['key', 'text'].includes(shape.className),
    });
    graph.emit(GraphEvent.BEFORE_TRANSFORM, {
      type: GraphEvent.BEFORE_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, -3],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'viewport-change-key-text');
    graph.emit(GraphEvent.AFTER_TRANSFORM, {
      type: GraphEvent.AFTER_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, 3],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'after-viewport-change');
  });

  it("show node's key and edge's key", async () => {
    graph.updateBehavior({
      key: 'optimize-viewport-transform',
      shapes: {
        node: ['key'],
        edge: ['key'],
      },
    });
    graph.emit(GraphEvent.BEFORE_TRANSFORM, {
      type: GraphEvent.BEFORE_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, -3],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'viewport-change-keys');
    graph.emit(GraphEvent.AFTER_TRANSFORM, {
      type: GraphEvent.AFTER_TRANSFORM,
      data: {
        mode: 'relative',
        translate: [0, 3],
      },
    });
    await expect(graph).toMatchSnapshot(__filename, 'after-viewport-change');
  });

  it('destroy', () => {
    graph.destroy();
  });
});
