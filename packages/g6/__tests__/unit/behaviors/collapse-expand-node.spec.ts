import type { Graph } from '@/src';
import { NodeEvent } from '@/src';
import { behaviorExpandCollapseNode } from '@@/demos/behavior-expand-collapse-node';
import { createDemoGraph } from '@@/utils';

describe('behavior node expand collapse', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorExpandCollapseNode, { animation: true });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('collapse B', async () => {
    // @ts-expect-error access private property
    const B = graph.context.element!.getElement('B');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(NodeEvent.CLICK, { target: B, targetType: 'node' });
      },
      'collapse-B',
    );
  });

  it('expand C', async () => {
    // @ts-expect-error access private property
    const C = graph.context.element!.getElement('C');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(NodeEvent.CLICK, { target: C, targetType: 'node' });
      },
      'expand-C',
    );
  });

  it('expand B', async () => {
    // @ts-expect-error access private property
    const B = graph.context.element!.getElement('B');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(NodeEvent.CLICK, { target: B, targetType: 'node' });
      },
      'expand-B-again',
    );
  });

  it('collapse A', async () => {
    // @ts-expect-error access private property
    const A = graph.context.element!.getElement('A');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(NodeEvent.CLICK, { target: A, targetType: 'node' });
      },
      'collapse-A',
    );
  });

  it('expand A', async () => {
    // @ts-expect-error access private property
    const A = graph.context.element!.getElement('A');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(NodeEvent.CLICK, { target: A, targetType: 'node' });
      },
      'expand-A',
    );
  });
});
