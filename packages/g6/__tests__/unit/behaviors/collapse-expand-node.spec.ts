import type { Graph } from '@/src';
import { NodeEvent, treeToGraphData } from '@/src';
import { behaviorExpandCollapseNode } from '@@/demos/behavior-expand-collapse-node';
import { createDemoGraph, createGraph } from '@@/utils';

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

it('expands an initially collapsed node whose children were pre-laid out', async () => {
  const graph = createGraph({
    data: treeToGraphData({
      id: 'root',
      style: { collapsed: true },
      children: [{ id: 'child' }],
    }),
    layout: {
      type: 'dendrogram',
      preLayout: true,
      isLayoutInvisibleNodes: true,
    },
  });

  try {
    await graph.render();

    // @ts-expect-error access private property
    const elements = graph.context.element!;
    expect(elements.getElement('child')).toBeUndefined();
    const { x, y } = graph.getNodeData('child').style ?? {};
    expect(Number.isFinite(x)).toBe(true);
    expect(Number.isFinite(y)).toBe(true);

    await graph.expandElement('root', { animation: false });

    expect(elements.getElement('child')).toBeDefined();
    expect(graph.getElementPosition('child').slice(0, 2)).toEqual([x, y]);
  } finally {
    graph.destroy();
  }
});
