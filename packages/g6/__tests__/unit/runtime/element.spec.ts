import { Graph } from '@/src';
import * as BUILT_IN_PALETTES from '@/src/palettes';
import { light as LIGHT_THEME } from '@/src/themes';
import { idOf } from '@/src/utils/id';
import { graphElement } from '@@/demo/static/graph-element';
import { createDemoGraph } from '@@/utils';
import { omit } from '@antv/util';

describe('ElementController', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(graphElement);
  });

  it('static', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    // @ts-expect-error context is private.
    const elementController = graph.context.element!;

    const options = graph.getOptions();

    const edge1Id = idOf(options.data!.edges![0]);
    const edge2Id = idOf(options.data!.edges![1]);

    expect(elementController.getDataStyle('node-1')).toEqual(options.data!.nodes![0].style || {});
    // 没有属性 / no style
    expect(elementController.getDataStyle('node-2')).toEqual({ x: 150, y: 100 });
    // 没有样式属性 / No style attribute
    expect(elementController.getDataStyle('node-3')).toEqual({
      x: 125,
      y: 150,
      parentId: 'combo-1',
      states: ['selected'],
    });
    expect(elementController.getDataStyle(edge1Id)).toEqual(options.data!.edges![0].style || {});
    expect(elementController.getDataStyle('combo-1')).toEqual({});

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
    const paletteKey = 'color';

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

    // expect(Object.keys(elementController.getElementsByState('selected'))).toEqual([
    //   'node-3',
    //   idOf(options.data!.edges![1]),
    // ]);

    // elementController.setElementsState({ 'node-1': ['active'] });
    // expect(elementController.getElementStates('node-1')).toEqual(['active']);
    // elementController.setElementsState({ 'node-1': [] });
    // expect(elementController.getElementStates('node-1')).toEqual([]);

    // expect(elementController.getElementStates('node-2')).toEqual([]);
    // expect(elementController.getElementStates('node-3')).toEqual(['selected']);
    // expect(elementController.getElementStates('edge-1')).toEqual([]);
    // expect(elementController.getElementStates(idOf(options.data!.edges![1]))).toEqual(['active', 'selected']);

    expect(elementController.getElementComputedStyle('node', 'node-1')).toEqual({
      ...LIGHT_THEME.node?.style,
      type: 'circle',
      fill: 'blue',
      stroke: 'pink',
      lineWidth: 1,
      border: 0,
      // from palette
      color: BUILT_IN_PALETTES.spectral[0],
      x: 100,
      y: 100,
    });

    expect(elementController.getElementComputedStyle('node', 'node-2')).toEqual({
      ...LIGHT_THEME.node?.style,
      type: 'circle',
      fill: 'red',
      border: 10,
      // from palette
      color: BUILT_IN_PALETTES.spectral[1],
      x: 150,
      y: 100,
    });

    expect(elementController.getElementComputedStyle('node', 'node-3')).toEqual({
      ...LIGHT_THEME.node?.style,
      ...LIGHT_THEME.node?.state?.selected,
      type: 'circle',
      border: 0,
      parentId: 'combo-1',
      states: ['selected'],
      // from state
      fill: 'purple',
      // from palette
      color: BUILT_IN_PALETTES.spectral[2],
      x: 125,
      y: 150,
    });

    expect(omit(elementController.getElementComputedStyle('edge', edge1Id), ['sourceNode', 'targetNode'])).toEqual({
      ...LIGHT_THEME.edge?.style,
      type: 'line',
      color: BUILT_IN_PALETTES.oranges.at(-1),
    });

    expect(omit(elementController.getElementComputedStyle('edge', edge2Id), ['sourceNode', 'targetNode'])).toEqual({
      ...LIGHT_THEME.edge?.style,
      ...LIGHT_THEME.edge?.state?.active,
      ...LIGHT_THEME.edge?.state?.selected,
      type: 'line',
      lineWidth: 4,
      stroke: 'red',
      states: ['active', 'selected'],
      color: BUILT_IN_PALETTES.oranges.at(-2),
    });

    const comboStyle = elementController.getElementComputedStyle('combo', 'combo-1');

    expect(comboStyle.children[0].id).toEqual('node-3');

    expect(omit(comboStyle, ['children'])).toEqual({
      ...LIGHT_THEME.combo?.style,
      type: 'circle',
      color: BUILT_IN_PALETTES.blues[0],
    });
  });

  it('runtime', async () => {
    graph.setData({
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
    });

    await graph.render();

    // @ts-expect-error context is private.
    const elementController = graph.context.element!;

    expect(elementController.getNodes().length).toBe(3);
    expect(elementController.getEdges().length).toBe(2);
    expect(elementController.getCombos().length).toBe(1);
  });
});
