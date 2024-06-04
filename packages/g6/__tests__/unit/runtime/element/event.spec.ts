import { IPointerEvent, NodeEvent } from '@/src';
import { createGraph } from '@@/utils';
import type { DisplayObject } from '@antv/g';
import { CustomEvent } from '@antv/g';

describe('element event', () => {
  it('element event target', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    const click = jest.fn();

    graph.on<IPointerEvent>(NodeEvent.CLICK, click);

    await graph.draw();

    // @ts-expect-error context is private
    const node1 = graph.context.element!.getElement('node-1')!;
    (node1.children[0] as DisplayObject).dispatchEvent(new CustomEvent('click', {}));

    expect(click).toHaveBeenCalledTimes(1);
    expect(click.mock.calls[0][0].target).toBe(node1);
    expect(click.mock.calls[0][0].targetType).toBe('node');
    expect(click.mock.calls[0][0].originalTarget).toBe(node1.children[0]);

    graph.destroy();
  });
});
