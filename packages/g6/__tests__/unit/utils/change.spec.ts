import { reduceDataChanges } from '@/src/utils/change';

describe('change', () => {
  it('reduceDataChanges', () => {
    expect(
      reduceDataChanges([
        { type: 'NodeAdded', value: { id: 'node-0' } },
        { type: 'NodeAdded', value: { id: 'node-1' } },
        { type: 'NodeAdded', value: { id: 'node-2' } },
        { type: 'EdgeAdded', value: { source: 'node-1', target: 'edge-2' } },
        {
          type: 'NodeUpdated',
          value: { id: 'node-3', style: { fill: 'pink' } },
          original: { id: 'node-3', style: { fill: 'red' } },
        },
        {
          type: 'NodeUpdated',
          value: { id: 'node-3', style: { fill: 'purple', lineWidth: 2 } },
          original: { id: 'node-3', style: { fill: 'pink' } },
        },
        { type: 'NodeUpdated', value: { id: 'node-0', data: { value: 10 } }, original: { id: 'node-0' } },
        { type: 'NodeRemoved', value: { id: 'node-0' } },
      ]),
    ).toEqual([
      { type: 'NodeAdded', value: { id: 'node-1' } },
      { type: 'NodeAdded', value: { id: 'node-2' } },
      { type: 'EdgeAdded', value: { source: 'node-1', target: 'edge-2' } },
      {
        type: 'NodeUpdated',
        value: { id: 'node-3', style: { fill: 'purple', lineWidth: 2 } },
        original: { id: 'node-3', style: { fill: 'red' } },
      },
    ]);
  });

  it('reduceDataChanges with Updated and Removed', () => {
    expect(
      reduceDataChanges([
        {
          type: 'NodeUpdated',
          value: { id: 'node-3', style: { fill: 'pink' } },
          original: { id: 'node-3', style: { fill: 'red' } },
        },
        { type: 'NodeRemoved', value: { id: 'node-3' } },
      ]),
    ).toEqual([{ type: 'NodeRemoved', value: { id: 'node-3' } }]);
  });
});
