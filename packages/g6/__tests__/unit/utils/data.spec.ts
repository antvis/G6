import type { EdgeData, NodeData } from '../../../src';
import { mergeElementsData } from '../../../src/utils/data';

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
          { label: 'badge1', color: 'red' },
          { label: 'badge2', color: 'blue' },
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
          { label: 'badge2', color: 'blue' },
          { label: 'badge3', color: 'green' },
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
          { label: 'badge2', color: 'blue' },
          { label: 'badge3', color: 'green' },
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
});
