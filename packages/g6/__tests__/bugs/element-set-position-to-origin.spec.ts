import type { ID } from '@/src';
import { createGraph } from '@@/utils';

describe('element set position to origin', () => {
  it('suite 1', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }],
      },
    });

    await graph.draw();

    // @ts-expect-error Property 'context' is protected
    const getElementOf = (id: ID) => graph.context.element!.getElement(id)!;

    expect(graph.getNodeData('node-1').style).toEqual({ zIndex: 0 });
    expect(getElementOf('node-1').style.transform).toEqual([['translate', 0, 0]]);

    graph.translateElementTo('node-1', [100, 100]);

    expect(graph.getNodeData('node-1').style).toEqual({ x: 100, y: 100, z: 0, zIndex: 0 });
    expect(getElementOf('node-1').style.transform).toEqual([['translate', 100, 100]]);

    graph.translateElementTo('node-1', [0, 0]);

    expect(graph.getNodeData('node-1').style).toEqual({ x: 0, y: 0, z: 0, zIndex: 0 });
    expect(getElementOf('node-1').style.transform).toEqual([['translate', 0, 0]]);
  });
});
