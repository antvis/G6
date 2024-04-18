import { Graph } from '@/src';
import * as BUILT_IN_PALETTES from '@/src/palettes';
import { light as LIGHT_THEME } from '@/src/themes';
import { idOf } from '@/src/utils/id';
import { createGraph } from '@@/utils';
import { omit } from '@antv/util';

describe('ElementController', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 100, y: 100, fill: 'red', stroke: 'pink', lineWidth: 1 }, data: { value: 100 } },
          { id: 'node-2', style: { x: 150, y: 100 }, data: { value: 150 } },
          { id: 'node-3', style: { x: 125, y: 150, parentId: 'combo-1', states: ['selected'] }, data: { value: 150 } },
        ],
        edges: [
          { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 250 } },
          {
            id: 'edge-2',
            source: 'node-2',
            target: 'node-3',
            style: { lineWidth: 5, states: ['active', 'selected'] },
            data: { weight: 300 },
          },
        ],
        combos: [{ id: 'combo-1' }],
      },
      node: {
        style: {
          fill: (datum) => ((datum?.data?.value as number) > 100 ? 'red' : 'blue'),
        },
        state: {
          selected: {
            fill: (datum) => ((datum?.data?.value as number) > 100 ? 'purple' : 'cyan'),
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
        palette: { type: 'group', color: 'oranges', field: (d) => idOf(d).toString(), invert: true },
      },
      combo: {
        style: {},
        state: {},
        palette: 'blues',
      },
    });

    await graph.render();
  });

  afterAll(() => {
    graph.destroy();
  });

  it('static', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    // @ts-expect-error context is private.
    const elementController = graph.context.element!;

    const options = graph.getOptions();

    const node1 = options.data!.nodes![0];
    const node2 = options.data!.nodes![1];
    const node3 = options.data!.nodes![2];
    const edge1 = options.data!.edges![0];
    const edge2 = options.data!.edges![1];
    const combo1 = options.data!.combos![0];

    const edge1Id = idOf(edge1);
    const edge2Id = idOf(edge2);

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

    expect(elementController.getDefaultStyle('node-1')).toEqual({ fill: 'blue' });
    expect(elementController.getDefaultStyle('node-2')).toEqual({ fill: 'red' });
    expect(elementController.getDefaultStyle('node-3')).toEqual({ fill: 'red' });
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

    expect(elementController.getElementComputedStyle('node', node1)).toEqual({
      ...LIGHT_THEME.node?.style,
      fill: 'blue',
      stroke: 'pink',
      lineWidth: 1,
      // from palette
      color: BUILT_IN_PALETTES.spectral[0],
      x: 100,
      y: 100,
    });

    expect(elementController.getElementComputedStyle('node', node2)).toEqual({
      ...LIGHT_THEME.node?.style,
      fill: 'red',
      // from palette
      color: BUILT_IN_PALETTES.spectral[1],
      x: 150,
      y: 100,
    });

    expect(elementController.getElementComputedStyle('node', node3)).toEqual({
      ...LIGHT_THEME.node?.style,
      ...LIGHT_THEME.node?.state?.selected,
      parentId: 'combo-1',
      states: ['selected'],
      // from state
      fill: 'purple',
      // from palette
      color: BUILT_IN_PALETTES.spectral[2],
      x: 125,
      y: 150,
    });

    expect(omit(elementController.getElementComputedStyle('edge', edge1), ['sourceNode', 'targetNode'])).toEqual({
      ...LIGHT_THEME.edge?.style,
      color: BUILT_IN_PALETTES.oranges.at(-1),
    });

    expect(omit(elementController.getElementComputedStyle('edge', edge2), ['sourceNode', 'targetNode'])).toEqual({
      ...LIGHT_THEME.edge?.style,
      ...LIGHT_THEME.edge?.state?.active,
      ...LIGHT_THEME.edge?.state?.selected,
      lineWidth: 4,
      stroke: 'red',
      states: ['active', 'selected'],
      color: BUILT_IN_PALETTES.oranges.at(-2),
    });

    const comboStyle = elementController.getElementComputedStyle('combo', combo1);

    expect(comboStyle.childrenNode[0].id).toEqual('node-3');

    expect(omit(comboStyle, ['childrenNode', 'childrenData'])).toEqual({
      ...LIGHT_THEME.combo?.style,
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
