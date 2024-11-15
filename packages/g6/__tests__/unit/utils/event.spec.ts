import type { ID } from '@/src';
import { Polyline } from '@/src/elements/edges';
import { Circle } from '@/src/elements/nodes';
import { eventTargetOf } from '@/src/utils/event';
import { Document, Rect } from '@antv/g';

describe('event', () => {
  const node1 = new Circle({
    id: 'node-1',
  });

  const node2 = new Circle({ id: 'node-2' });

  const context: any = {
    element: {
      getElement(id: ID) {
        if (id === 'node-1') return node1;
        else return node2;
      },
    },
  };

  const edge = new Polyline({ style: { sourceNode: 'node-1', targetNode: 'node-2' }, context });

  it('eventTargetOf', () => {
    expect(eventTargetOf(node1)?.type).toEqual('node');
    expect(eventTargetOf(edge)?.type).toEqual('edge');
    expect(eventTargetOf(new Rect({ style: { width: 50, height: 50 } }))).toBeFalsy();
    expect(eventTargetOf(new Document())?.type).toBe('canvas');
  });
});
