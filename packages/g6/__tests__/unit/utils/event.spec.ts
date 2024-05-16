import { Polyline } from '@/src/elements/edges';
import { Circle } from '@/src/elements/nodes';
import { eventTargetOf } from '@/src/utils/event';
import { Document, Rect } from '@antv/g';

describe('event', () => {
  const node1 = new Circle({
    id: 'node-1',
  });

  const node2 = new Circle({ id: 'node-2' });

  const edge = new Polyline({ style: { sourceNode: node1, targetNode: node2 } });

  it('eventTargetOf', () => {
    expect(eventTargetOf(node1)?.type).toEqual('node');
    expect(eventTargetOf(edge)?.type).toEqual('edge');
    expect(eventTargetOf(new Rect({ style: { width: 50, height: 50 } }))).toBeFalsy();
    expect(eventTargetOf(new Document())?.type).toBe('canvas');
  });
});
