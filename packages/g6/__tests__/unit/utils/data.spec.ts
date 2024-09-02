import type { EdgeData, NodeData } from '@/src';
import { cloneElementData, isElementDataEqual, isEmptyData, mergeElementsData } from '@/src/utils/data';

describe('data', () => {
  it('mergeElementsData', () => {
    const originalData: NodeData = {
      id: 'node-1',
      data: {
        value1: 100,
        value2: { value3: 300, value4: 400 },
      },
      style: {
        fill: 'red',
        badges: [
          { text: 'badge1', stroke: 'red' },
          { text: 'badge2', stroke: 'blue' },
        ],
      },
    };

    const modifiedData: NodeData = {
      id: 'node-1',
      data: {
        value1: 200,
        value2: { value3: 300 },
      },
      style: {
        badges: [
          { text: 'badge2', stroke: 'blue' },
          { text: 'badge3', stroke: 'green' },
        ],
        stroke: 'pink',
      },
    };

    expect(mergeElementsData(originalData, modifiedData)).toEqual({
      id: 'node-1',
      data: {
        value1: 200,
        value2: { value3: 300 },
      },
      style: {
        fill: 'red',
        badges: [
          { text: 'badge2', stroke: 'blue' },
          { text: 'badge3', stroke: 'green' },
        ],
        stroke: 'pink',
      },
    });
  });

  it('mergeElementsData edge', () => {
    const originalData: EdgeData = {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    };

    const modifiedData: EdgeData = {
      id: 'edge-1',
      source: 'node-2',
      target: 'node-1',
      data: {
        weight: 10,
      },
    };

    expect(mergeElementsData(originalData, modifiedData)).toEqual({
      id: 'edge-1',
      source: 'node-2',
      target: 'node-1',
      data: {
        weight: 10,
      },
    });
  });

  it('cloneElementData', () => {
    const data = { id: 'node-1', data: { value1: { a: 1 }, value2: 2 }, style: { fill: 'pink', startPoint: [0, 100] } };
    const clonedData = cloneElementData(data);
    expect(clonedData).toEqual(data);

    data.data.value1.a = 2;
    data.style.startPoint[0] = 100;
    expect(clonedData).toEqual(data);

    data.data.value2 = 3;
    data.style.startPoint = [100, 100];
    expect(clonedData).not.toEqual(data);
  });

  it('isEmptyData', () => {
    expect(isEmptyData({})).toBe(true);
    expect(isEmptyData({ nodes: [] })).toBe(true);
    expect(isEmptyData({ nodes: [], edges: [] })).toBe(true);
    expect(isEmptyData({ nodes: [], edges: [], combos: [] })).toBe(true);
    expect(isEmptyData({ nodes: [{ id: 'node-1' }] })).toBe(false);
    expect(isEmptyData({ edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }] })).toBe(false);
    expect(isEmptyData({ combos: [{ id: 'combo-1' }] })).toBe(false);
  });

  it('isElementDataEqual', () => {
    expect(isElementDataEqual({ id: 'node-1' }, { id: 'node-1' })).toBe(true);
    expect(isElementDataEqual({ id: 'node-1' }, { id: 'node-2' })).toBe(false);

    // children
    expect(isElementDataEqual({ id: 'node-1', children: ['a', 'b'] }, { id: 'node-1', children: ['a', 'b'] })).toBe(
      true,
    );
    expect(isElementDataEqual({ id: 'node-1', children: ['a', 'b'] }, { id: 'node-1', children: ['a', 'c'] })).toBe(
      false,
    );
    expect(
      isElementDataEqual({ id: 'node-1', children: ['a', 'b'] }, { id: 'node-1', children: ['a', 'b', 'c'] }),
    ).toBe(false);
    expect(isElementDataEqual({ id: 'node-1' }, { id: 'node-1', data: {} })).toBe(true);
    expect(isElementDataEqual({ id: 'node-1', data: { value: 1 } }, { id: 'node-1', data: { value: 1 } })).toBe(true);

    // states
    expect(isElementDataEqual({ id: 'node-1' }, { id: 'node-1', states: [] })).toBe(true);
    expect(isElementDataEqual({ id: 'node-1', states: [] }, { id: 'node-1', states: [] })).toBe(true);
    expect(isElementDataEqual({ id: 'node-1', states: ['selected'] }, { id: 'node-1', states: ['selected'] })).toBe(
      true,
    );
    expect(
      isElementDataEqual({ id: 'node-1', states: ['selected'] }, { id: 'node-1', states: ['selected', 'hover'] }),
    ).toBe(false);

    // too deep
    const obj = { a: 1 };
    expect(
      isElementDataEqual({ id: 'node-1', data: { value: { ...obj } } }, { id: 'node-1', data: { value: { ...obj } } }),
    ).toBe(false);
    expect(isElementDataEqual({ id: 'node-1', data: { value: obj } }, { id: 'node-1', data: { value: obj } })).toBe(
      true,
    );

    // style
    expect(isElementDataEqual({ id: 'node-1' }, { id: 'node-1', style: {} })).toBe(true);
    expect(isElementDataEqual({ id: 'node-1', style: { fill: 'red' } }, { id: 'node-1', style: { fill: 'red' } })).toBe(
      true,
    );
    expect(
      isElementDataEqual({ id: 'node-1', style: { fill: 'red' } }, { id: 'node-1', style: { fill: 'blue' } }),
    ).toBe(false);
    expect(
      isElementDataEqual(
        { id: 'node-1', style: { fill: 'red' } },
        { id: 'node-1', style: { fill: 'red', stroke: 'red' } },
      ),
    ).toBe(false);
  });
});
