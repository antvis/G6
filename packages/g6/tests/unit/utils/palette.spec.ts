import { register } from '../../../src/plugin/register';
import { assignColorByPalette, parsePalette } from '../../../src/utils/palette';

describe('palette', () => {
  it('parsePalette', () => {
    expect(parsePalette('category3')).toEqual({ type: 'group', color: 'category3', field: 'id' });
    expect(parsePalette(['red', 'green', 'blue'])).toEqual({
      type: 'group',
      color: ['red', 'green', 'blue'],
      field: 'id',
    });
    expect(parsePalette({ type: 'value', color: 'blues', field: 'value' })).toEqual({
      type: 'value',
      color: 'blues',
      field: 'value',
    });
  });

  it('assignColorByPalette unset', () => {
    const data = [
      { id: 'node-1', data: { value: 100, category: 'A' } },
      { id: 'node-2', data: { value: 200, category: 'B' } },
      { id: 'node-3', data: { value: 300, category: 'C' } },
    ];

    expect(assignColorByPalette(data)).toEqual({});
  });

  it('assignColorByPalette discrete', () => {
    register('palette', 'category3', ['#1f77b4', '#ff7f0e', '#2ca02c']);

    const data3 = [
      { id: 'node-1', data: { value: 100, category: 'A' } },
      { id: 'node-2', data: { value: 200, category: 'B' } },
      { id: 'node-3', data: { value: 300, category: 'C' } },
    ];

    const data4 = [...data3, { id: 'node-4', data: { value: 400, category: 'D' } }];

    const data5 = [...data4, { id: 'node-5', data: { value: 500, category: 'A' } }];

    expect(
      assignColorByPalette(data3, {
        type: 'group',
        color: 'category3',
        field: 'category',
      }),
    ).toEqual({
      'node-1': '#1f77b4',
      'node-2': '#ff7f0e',
      'node-3': '#2ca02c',
    });

    // invert
    expect(
      assignColorByPalette(data3, {
        type: 'group',
        color: 'category3',
        field: 'category',
        invert: true,
      }),
    ).toEqual({
      'node-1': '#2ca02c',
      'node-2': '#ff7f0e',
      'node-3': '#1f77b4',
    });

    expect(
      assignColorByPalette(data4, {
        type: 'group',
        color: 'category3',
        field: 'category',
      }),
    ).toEqual({
      'node-1': '#1f77b4',
      'node-2': '#ff7f0e',
      'node-3': '#2ca02c',
      'node-4': '#1f77b4',
    });

    expect(
      assignColorByPalette(data5, {
        type: 'group',
        color: 'category3',
        field: 'category',
      }),
    ).toEqual({
      'node-1': '#1f77b4',
      'node-2': '#ff7f0e',
      'node-3': '#2ca02c',
      'node-4': '#1f77b4',
      'node-5': '#1f77b4',
    });

    expect(
      assignColorByPalette(data5, {
        type: 'group',
        color: 'category3',
      }),
    ).toEqual({
      'node-1': '#1f77b4',
      'node-2': '#ff7f0e',
      'node-3': '#2ca02c',
      'node-4': '#1f77b4',
      'node-5': '#ff7f0e',
    });
  });

  it('assignColorByPalette continuous', () => {
    register('palette', 'blues', (value) => `rgb(0, 0, ${(value * 255).toFixed(0)})`);

    const createData = (length: number) => {
      return Array.from({ length }, (_, index) => ({ id: `node-${index + 1}`, data: { value: index * 100 + 100 } }));
    };

    const data3 = createData(3);

    expect(
      assignColorByPalette(data3, {
        type: 'value',
        color: 'blues',
        field: 'value',
      }),
    ).toEqual({
      'node-1': 'rgb(0, 0, 0)',
      'node-2': 'rgb(0, 0, 128)',
      'node-3': 'rgb(0, 0, 255)',
    });

    // invert
    expect(
      assignColorByPalette(data3, {
        type: 'value',
        color: 'blues',
        field: 'value',
        invert: true,
      }),
    ).toEqual({
      'node-1': 'rgb(0, 0, 255)',
      'node-2': 'rgb(0, 0, 128)',
      'node-3': 'rgb(0, 0, 0)',
    });

    const data11 = createData(11);
    expect(
      assignColorByPalette(data11, {
        type: 'value',
        color: 'blues',
        field: 'value',
      }),
    ).toEqual({
      'node-1': 'rgb(0, 0, 0)',
      'node-2': 'rgb(0, 0, 26)',
      'node-3': 'rgb(0, 0, 51)',
      'node-4': 'rgb(0, 0, 77)',
      'node-5': 'rgb(0, 0, 102)',
      'node-6': 'rgb(0, 0, 128)',
      'node-7': 'rgb(0, 0, 153)',
      'node-8': 'rgb(0, 0, 179)',
      'node-9': 'rgb(0, 0, 204)',
      'node-10': 'rgb(0, 0, 230)',
      'node-11': 'rgb(0, 0, 255)',
    });
  });
});
