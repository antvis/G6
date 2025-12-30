import type { GraphData } from '@/src';
import { AntVGraphData } from '@/src/layouts/types';
import {
  getLayoutProperty,
  invokeLayoutMethod,
  isComboLayout,
  isPositionSpecified,
  isTreeLayout,
  layoutAdapter,
  layoutMapping2GraphData,
} from '@/src/utils/layout';
import dagreData from '@@/dataset/dagre.json';

class MockLayout {
  public id = 'mock';

  private nodes: any[] = [];

  private edges: any[] = [];

  public async execute(model: any, options: any): Promise<void> {
    this.nodes = (model.nodes ?? []).map((datum: any, index: number) => {
      const node = typeof options?.node === 'function' ? options.node(datum) : datum;
      return { ...node, x: index * 10, y: index * 20, z: node.z ?? 0 };
    });

    this.edges = (model.edges ?? []).map((datum: any, index: number) => {
      const edge = typeof options?.edge === 'function' ? options.edge(datum) : datum;
      return {
        ...edge,
        points: [
          { x: index, y: index },
          { x: index + 1, y: index + 1 },
        ],
      };
    });

    if (typeof options?.onTick === 'function') {
      for (let i = 0; i < 3; i++) options.onTick(this);
    }
  }

  public forEachNode(callback: (node: any) => void) {
    this.nodes.forEach(callback);
  }

  public forEachEdge(callback: (edge: any) => void) {
    this.edges.forEach(callback);
  }
}

describe('layout', () => {
  it('isComboLayout', () => {
    expect(isComboLayout({ type: 'force' })).toBe(false);
    expect(isComboLayout({ type: 'comboCombined' })).toBe(true);
    expect(isComboLayout({ type: 'antv-dagre', sortByCombo: true })).toBe(true);
    expect(isComboLayout({ type: 'antv-dagre' })).toBe(false);
  });

  it('isTreeLayout', () => {
    expect(isTreeLayout({ type: 'force' })).toBe(false);
    expect(isTreeLayout({ type: 'compact-box' })).toBe(true);
    expect(isTreeLayout({ type: 'mindmap' })).toBe(true);
  });

  it('isPositionSpecified', () => {
    expect(isPositionSpecified({})).toBe(false);
    expect(isPositionSpecified({ x: 100 })).toBe(false);
    expect(isPositionSpecified({ y: 100 })).toBe(false);
    expect(isPositionSpecified({ x: 100, y: 100 })).toBe(true);
    expect(isPositionSpecified({ x: 100, y: 100, z: 100 })).toBe(true);
    expect(isPositionSpecified({ x: 0, y: 0, z: 0 })).toBe(true);
  });

  it('layoutMapping2GraphData', () => {
    const layoutMapping: AntVGraphData = {
      nodes: [
        { id: 'node-1', data: { x: 0, y: 0 } },
        { id: 'node-2', data: { x: 100, y: 100 } },
        { id: 'combo-1', data: { x: 50, y: 50, _isCombo: true } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: {} }],
    };

    const graphData: GraphData = layoutMapping2GraphData(layoutMapping);

    expect(graphData).toEqual({
      nodes: [
        { id: 'node-1', style: { x: 0, y: 0, z: 0 } },
        { id: 'node-2', style: { x: 100, y: 100, z: 0 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', style: {} }],
      combos: [{ id: 'combo-1', style: { x: 50, y: 50, z: 0 } }],
    });
  });

  it('layoutMapping2GraphData with controlPoints', () => {
    const layoutMapping: AntVGraphData = {
      nodes: [
        { id: 'node-1', data: { x: 0, y: 0 } },
        { id: 'node-2', data: { x: 100, y: 100 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: { controlPoints: [{ x: 50, y: 50 }] } }],
    };

    const graphData: GraphData = layoutMapping2GraphData(layoutMapping);

    expect(graphData).toEqual({
      nodes: [
        { id: 'node-1', style: { x: 0, y: 0, z: 0 } },
        { id: 'node-2', style: { x: 100, y: 100, z: 0 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', style: { controlPoints: [[50, 50, 0]] } }],
      combos: [],
    });
  });

  it('layoutAdapter', async () => {
    const data: GraphData = {
      nodes: [{ id: 'node-1', style: { x: 1, y: 2, z: 3 } }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'combo-1' }],
      combos: [{ id: 'combo-1' }],
    };

    const context = {
      model: {
        isCombo: (id: string) => id === 'combo-1',
        model: {
          hasTreeStructure: () => true,
          getParent: () => null,
        },
      },
    } as any;
    const AdaptiveMockLayout = layoutAdapter(MockLayout as any, context);

    const layout = new AdaptiveMockLayout(context);

    const result = await layout.execute(data);
    expect(result).toEqual({
      nodes: [{ id: 'node-1', style: { x: 0, y: 0, z: 3 } }],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'combo-1',
          style: {
            controlPoints: [
              { x: 0, y: 0 },
              { x: 1, y: 1 },
            ],
          },
        },
      ],
      combos: [{ id: 'combo-1', style: { x: 10, y: 20, z: 0 } }],
    });
  });

  it('layoutAdapter with onTick', async () => {
    const data: GraphData = {
      nodes: [{ id: 'node-1' }],
      edges: [],
      combos: [],
    };

    const context = {
      model: {
        isCombo: () => false,
        model: {
          hasTreeStructure: () => true,
          getParent: () => null,
        },
      },
    } as any;
    const AdaptiveMockLayout = layoutAdapter(MockLayout as any, context);

    const onTick = jest.fn();

    const layout = new AdaptiveMockLayout(context, {
      onTick,
    });

    await layout.execute(data);

    expect(onTick).toHaveBeenCalled();
    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it('invoke and get', async () => {
    const context = {
      model: {
        isCombo: () => false,
        model: {
          hasTreeStructure: () => true,
          getParent: () => null,
        },
      },
    } as any;
    const AdaptiveMockLayout = layoutAdapter(MockLayout as any, context);

    const layout = new AdaptiveMockLayout(context);

    expect(invokeLayoutMethod(layout, 'execute', dagreData)).toBeInstanceOf(Promise);
    expect(invokeLayoutMethod(layout, 'null')).toBe(null);

    expect(typeof getLayoutProperty(layout, 'options')).toBe('object');
    expect(getLayoutProperty(layout, 'id')).toBe('mock');
    expect(getLayoutProperty(layout, 'null')).toBe(null);
  });
});
