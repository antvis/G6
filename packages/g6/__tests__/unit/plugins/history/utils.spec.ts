import { alignFields, parseCommand } from '@/src/plugins/history/util';
import type { DataChange } from '@/src/types';

describe('history utils', () => {
  it('alignFields', () => {
    const data = {
      id: 'combo-2',
      data: {},
      style: {
        zIndex: 0,
        collapsed: true,
        visibility: 'hidden',
        states: ['active'],
      },
    };
    const data2 = {
      id: 'combo-2',
      data: {},
      style: {
        zIndex: 0,
      },
    };
    alignFields(data, data2);
    expect(data2).toEqual({
      id: 'combo-2',
      data: {},
      style: {
        zIndex: 0,
        collapsed: false,
        visibility: 'visible',
        states: [],
      },
    });
  });

  it('parseCommand', () => {
    const command = [
      {
        value: {
          id: 'combo-2',
          data: {},
          style: {
            x: 188.11,
            y: 193.5,
            zIndex: 0,
            collapsed: true,
          },
        },
        original: {
          id: 'combo-2',
          data: {},
          style: {
            x: 188.11,
            y: 193.5,
            zIndex: 0,
            collapsed: false,
          },
        },
        type: 'ComboUpdated',
      },
    ] as DataChange[];
    expect(parseCommand(command).current.update.combos![0]).toEqual({
      data: {},
      id: 'combo-2',
      style: { collapsed: true, x: 188.11, y: 193.5, zIndex: 0 },
    });
    expect(parseCommand(command).original.update.combos![0]).toEqual({
      data: {},
      id: 'combo-2',
      style: { collapsed: false, x: 188.11, y: 193.5, zIndex: 0 },
    });
    const command2 = [
      {
        type: 'NodeAdded',
        value: {
          id: 'node-1',
          data: {},
          style: {
            x: 100,
            y: 100,
          },
        },
      },
    ] as DataChange[];
    expect(parseCommand(command2).current.add.nodes![0]).toEqual({
      data: {},
      id: 'node-1',
      style: { x: 100, y: 100 },
    });
    expect(parseCommand(command2).original.remove.nodes![0]).toEqual({
      data: {},
      id: 'node-1',
      style: { x: 100, y: 100 },
    });
    const command3 = [
      {
        type: 'EdgeRemoved',
        value: {
          id: 'edge-1',
          data: {},
          source: 'node-1',
          target: 'node-2',
        },
      },
    ] as DataChange[];
    expect(parseCommand(command3).current.remove.edges![0]).toEqual({
      data: {},
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    });
    expect(parseCommand(command3).original.add.edges![0]).toEqual({
      data: {},
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    });
  });
});
