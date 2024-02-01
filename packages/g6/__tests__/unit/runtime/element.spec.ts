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
    return node;
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
  it('static', async () => {
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
          fill: (datum: any) => (datum?.data?.value > 100 ? 'red' : 'blue'),
          border: (datum: any, index: number, data: any) => (index % 2 === 0 ? 0 : 10),
        },
        state: {
          selected: {
            fill: (datum: any) => (datum?.data?.value > 100 ? 'purple' : 'cyan'),
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

    const edge1Id = idOf(options.data!.edges![0]);
    const edge2Id = idOf(options.data!.edges![1]);

    // @ts-expect-error computeStyle is private
    elementController.computeStyle();

    expect(elementController.getDataStyle('node', 'node-1')).toEqual(options.data!.nodes![0].style || {});
    // 没有属性 / no style
    expect(elementController.getDataStyle('node', 'node-2')).toEqual({});
    // 没有样式属性 / No style attribute
    expect(elementController.getDataStyle('node', 'node-3')).toEqual({});
    expect(elementController.getDataStyle('edge', edge1Id)).toEqual(options.data!.edges![0].style || {});
    expect(elementController.getDataStyle('combo', 'combo-1')).toEqual({});

    // ref light theme
    expect(elementController.getThemeStyle('node')).toEqual(LIGHT_THEME.node!.style);
    expect(elementController.getThemeStateStyle('node', [])).toEqual({});

    expect(elementController.getThemeStateStyle('node', ['selected'])).toEqual({
      ...LIGHT_THEME.node!.state!.selected,
    });
    expect(elementController.getThemeStateStyle('node', ['selected', 'active'])).toEqual({
      ...LIGHT_THEME.node!.state!.selected,
      ...LIGHT_THEME.node!.state!.active,
    });
    const paletteKey = 'keyShapeColor';

    expect(elementController.getPaletteStyle('node-1')[paletteKey]).toBe(BUILT_IN_PALETTES.spectral[0]);
    expect(elementController.getPaletteStyle('node-2')[paletteKey]).toBe(BUILT_IN_PALETTES.spectral[1]);
    expect(elementController.getPaletteStyle('node-3')[paletteKey]).toBe(BUILT_IN_PALETTES.spectral[2]);
    // invert
    expect(elementController.getPaletteStyle(edge1Id)[paletteKey]).toBe(BUILT_IN_PALETTES.oranges.at(-1));
    expect(elementController.getPaletteStyle(edge2Id)[paletteKey]).toBe(BUILT_IN_PALETTES.oranges.at(-2));
    expect(elementController.getPaletteStyle('combo-1')[paletteKey]).toBe(BUILT_IN_PALETTES.blues[0]);

    expect(elementController.getDefaultStyle('node-1')).toEqual({ fill: 'blue', border: 0 });
    expect(elementController.getDefaultStyle('node-2')).toEqual({ fill: 'red', border: 10 });
    expect(elementController.getDefaultStyle('node-3')).toEqual({ fill: 'red', border: 0 });
    expect(elementController.getDefaultStyle(edge1Id)).toEqual({});
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

    expect(elementController.getElementComputedStyle('node', 'node-1')).toEqual({
      ...LIGHT_THEME.node?.style,
      fill: 'blue',
      stroke: 'pink',
      lineWidth: 1,
      border: 0,
      // from palette
      keyShapeColor: BUILT_IN_PALETTES.spectral[0],
    });

    expect(elementController.getElementComputedStyle('node', 'node-2')).toEqual({
      ...LIGHT_THEME.node?.style,
      fill: 'red',
      border: 10,
      // from palette
      keyShapeColor: BUILT_IN_PALETTES.spectral[1],
    });

    expect(elementController.getElementComputedStyle('node', 'node-3')).toEqual({
      ...LIGHT_THEME.node?.style,
      ...LIGHT_THEME.node?.state?.selected,
      border: 0,
      // from state
      fill: 'purple',
      // from palette
      keyShapeColor: BUILT_IN_PALETTES.spectral[2],
    });

    expect(elementController.getElementComputedStyle('edge', edge1Id)).toEqual({
      ...LIGHT_THEME.edge?.style,
      sourcePoint: [0, 0, 0],
      targetPoint: [0, 0, 0],
      keyShapeColor: BUILT_IN_PALETTES.oranges.at(-1),
    });
    expect(elementController.getElementComputedStyle('edge', edge2Id)).toEqual({
      ...LIGHT_THEME.edge?.style,
      ...LIGHT_THEME.edge?.state?.active,
      ...LIGHT_THEME.edge?.state?.selected,
      lineWidth: 4,
      stroke: 'red',
      // 在运行时环境测试 / Test in runtime environment
      sourceNode: undefined,
      targetNode: undefined,
      // 暂未实现 / Not implemented yet
      sourcePoint: [0, 0, 0],
      targetPoint: [0, 0, 0],
      keyShapeColor: BUILT_IN_PALETTES.oranges.at(-2),
    });

    expect(elementController.getElementComputedStyle('combo', 'combo-1')).toEqual({
      ...LIGHT_THEME.combo?.style,
      keyShapeColor: BUILT_IN_PALETTES.blues[0],
      children: {
        // 值为 undefined 是因为在非运行时环境 / The value is undefined because it is not in the runtime environment
        'node-3': undefined,
      },
    });
  });

  it('mock runtime', async () => {
    const options: G6Spec = {
      data: {
        nodes: [
          { id: 'node-1' },
          { id: 'node-2', style: { parentId: 'combo-1' } },
          { id: 'node-3', style: { parentId: 'combo-1' } },
        ],
        edges: [
          { source: 'node-1', target: 'node-2' },
          { source: 'node-2', target: 'node-3' },
        ],
        combos: [{ id: 'combo-1' }],
      },
    };

    const context = createContext(options);

    const elementController = new ElementController(context);

    await elementController.init;

    await elementController.render(context);

    // @ts-expect-error container is private
    const container = elementController.container;

    expect(container.node.children.length).toBe(3);
    expect(container.edge.children.length).toBe(2);
    // TODO 目前暂未提供 combo 图形，因此无法渲染 / Currently, combo graphics are not provided, so they cannot be rendered
    expect(container.combo.children.length).toBe(0);

    // @ts-expect-error animationMap is private
    expect(Object.keys(elementController.animationMap)).toEqual([
      'node-1',
      'node-2',
      'node-3',
      idOf(options.data!.edges![0]),
      idOf(options.data!.edges![1]),
    ]);

    // @ts-expect-error animationMap is private
    expect(Object.keys(elementController.elementMap)).toEqual([
      'node-1',
      'node-2',
      'node-3',
      idOf(options.data!.edges![0]),
      idOf(options.data!.edges![1]),
    ]);
  });
});
