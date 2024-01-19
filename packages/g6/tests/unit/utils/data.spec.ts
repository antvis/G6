import { dataIdOf, transformSpecDataToGraphlibData } from '../../../src/utils/data';

describe('data', () => {
  it('transformSpecDataToGraphlibData', () => {
    expect(
      transformSpecDataToGraphlibData([
        { id: 'node-1' },
        { id: 'node-2', data: { value: 1 } },
        { id: 'node-3', data: { value: 2 }, style: { opacity: 0.5 } },
      ]),
    ).toEqual([
      { id: 'node-1', data: { id: 'node-1' } },
      { id: 'node-2', data: { id: 'node-2', data: { value: 1 } } },
      { id: 'node-3', data: { id: 'node-3', data: { value: 2 }, style: { opacity: 0.5 } } },
    ]);

    expect(
      transformSpecDataToGraphlibData([
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
      ]),
    ).toEqual([
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        data: { id: 'edge-1', source: 'node-1', target: 'node-2' },
      },
      {
        id: 'edge-2',
        source: 'node-2',
        target: 'node-3',
        data: { id: 'edge-2', source: 'node-2', target: 'node-3', data: { value: 2 }, style: { fill: 'blue' } },
      },
    ]);
  });

  it('dataIdOf', () => {
    expect(dataIdOf({ nodes: [], edges: [], combos: [] })).toEqual({ nodes: [], edges: [], combos: [] });
    expect(dataIdOf({ nodes: [] })).toEqual({ nodes: [], edges: [], combos: [] });

    expect(
      dataIdOf({
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
        combos: [{ id: 'combo-1' }],
      }),
    ).toEqual({
      nodes: ['node-1', 'node-2'],
      edges: ['edge-1'],
      combos: ['combo-1'],
    });
  });
});
