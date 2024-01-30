import type { G6Spec } from '../../../src';
import { BUILT_IN_PALETTES } from '../../../src/palettes';
import '../../../src/preset';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import type { RuntimeContext } from '../../../src/runtime/types';
import { LIGHT_THEME } from '../../../src/themes/light';
import { idOf } from '../../../src/utils/id';

class Canvas {
  init() {
    return Promise.resolve();
  }

  children: unknown[] = [];
  appendChild(node: unknown) {
    this.children.push(node);
  }
}

class Graph {}

const createContext = (options: G6Spec): RuntimeContext => {
  const dataController = new DataController();
  dataController.setData(options.data || {});
  return {
    canvas: new Canvas() as any,
    graph: new Graph() as any,
    options,
    dataController,
  };
};

describe('ElementController', () => {
  it('init', async () => {
    const options: G6Spec = {
      data: {
        nodes: [
          { id: 'node-1', style: { fill: 'red', stroke: 'pink', lineWidth: 1 }, data: { value: 100 } },
          { id: 'node-2', data: { value: 150 } },
          { id: 'node-3', style: { parentId: 'combo-1', states: ['selected'] }, data: { value: 150 } },
        ],
        edges: [
          { source: 'node-1', target: 'node-2', data: { weight: 250 } },
          {
            source: 'node-2',
            target: 'node-3',
            style: { lineWidth: 5, states: ['active', 'selected'] },
            data: { weight: 300 },
          },
        ],
        combos: [{ id: 'combo-1' }],
      },
      theme: 'light',
      node: {
        style: {
          fill: (data: any) => (data.data.value > 100 ? 'red' : 'blue'),
        },
        state: {
          selected: {
            fill: (data: any) => (data.data.value > 100 ? 'purple' : 'cyan'),
          },
        },
        palette: 'spectral',
      },
      edge: {
        style: {},
        state: {
          selected: {
            stroke: 'red',
          },
          active: {
            stroke: 'pink',
            lineWidth: 4,
          },
        },
        palette: { type: 'group', color: 'oranges', invert: true },
      },
      combo: {
        style: {},
        state: {},
        palette: 'blues',
      },
    };

    const context = createContext(options);

    const elementController = new ElementController(context);

    await elementController.init;

    // @ts-expect-error computeStyle is private
    elementController.computeStyle();

    expect(elementController.getDataStyle('node', 'node-1')).toEqual(options.data!.nodes![0].style || {});
    // 没有属性 / no style
    expect(elementController.getDataStyle('node', 'node-2')).toEqual({});
    // 没有样式属性 / No style attribute
    expect(elementController.getDataStyle('node', 'node-3')).toEqual({});
    expect(elementController.getDataStyle('edge', idOf(options.data!.edges![0]))).toEqual(
      options.data!.edges![0].style || {},
    );
    expect(elementController.getDataStyle('combo', 'combo-1')).toEqual({});

    // ref light theme
    expect(elementController.getThemeStyle('node', [])).toEqual(LIGHT_THEME.node!.style);
    expect(elementController.getThemeStyle('node', ['selected'])).toEqual({
      ...LIGHT_THEME.node!.style,
      ...LIGHT_THEME.node!.state!.selected,
    });
    expect(elementController.getThemeStyle('node', ['selected', 'active'])).toEqual({
      ...LIGHT_THEME.node!.style,
      ...LIGHT_THEME.node!.state!.selected,
      ...LIGHT_THEME.node!.state!.active,
    });

    const paletteKey = 'keyShapeColor';

    expect(elementController.getPaletteStyle('node-1')[paletteKey]).toBe(BUILT_IN_PALETTES.spectral[0]);
    expect(elementController.getPaletteStyle('node-2')[paletteKey]).toBe(BUILT_IN_PALETTES.spectral[1]);
    expect(elementController.getPaletteStyle('node-3')[paletteKey]).toBe(BUILT_IN_PALETTES.spectral[2]);
    // invert
    expect(elementController.getPaletteStyle(idOf(options.data!.edges![0]))[paletteKey]).toBe(
      BUILT_IN_PALETTES.oranges.at(-1),
    );
    expect(elementController.getPaletteStyle('combo-1')[paletteKey]).toBe(BUILT_IN_PALETTES.blues[0]);

    expect(elementController.getDefaultStyle('node-1')).toEqual({ fill: 'blue' });
    expect(elementController.getDefaultStyle('node-2')).toEqual({ fill: 'red' });
    expect(elementController.getDefaultStyle('node-3')).toEqual({ fill: 'red' });
    expect(elementController.getDefaultStyle(idOf(options.data!.edges![0]))).toEqual({});
    expect(elementController.getDefaultStyle('combo-1')).toEqual({});

    expect(elementController.getStateStyle('node-1')).toEqual({});
    expect(elementController.getStateStyle('node-2')).toEqual({});
    expect(elementController.getStateStyle('node-3')).toEqual({ fill: 'purple' });
    expect(elementController.getStateStyle(idOf(options.data!.edges![1]))).toEqual({
      stroke: 'red',
      lineWidth: 4,
    });
    expect(elementController.getStateStyle('combo-1')).toEqual({});

    expect(Object.keys(elementController.getElementsByState('selected'))).toEqual([
      'node-3',
      idOf(options.data!.edges![1]),
    ]);

    expect(elementController.getElementStates('node-1')).toEqual([]);
    expect(elementController.getElementStates('node-2')).toEqual([]);
    expect(elementController.getElementStates('node-3')).toEqual(['selected']);
    expect(elementController.getElementStates('edge-1')).toEqual([]);
    expect(elementController.getElementStates(idOf(options.data!.edges![1]))).toEqual(['active', 'selected']);
  });
});
