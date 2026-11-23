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
import { AntVDagreLayout, DagreLayout, type GraphEdge } from '@antv/layout';

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

  describe('layoutAdapter control points', () => {
    const context = { model: { isCombo: () => false } } as any;
    const createData = (): GraphData => ({
      nodes: [
        { id: 'source', style: { size: 32 } },
        { id: 'target', style: { size: 32 } },
      ],
      edges: [{ id: 'edge', source: 'source', target: 'target' }],
    });

    it.each(['LR', 'RL', 'TB', 'BT'])('excludes Dagre endpoints for %s', async (rankdir) => {
      const data = createData();
      const original = JSON.parse(JSON.stringify(data));
      const AdaptiveDagreLayout = layoutAdapter(DagreLayout, context);
      const layout = new AdaptiveDagreLayout(context, { rankdir, nodeSize: 32, ranksep: 50, enableWorker: false });

      const result = await layout.execute(data);
      const rawEdges: GraphEdge[] = [];
      invokeLayoutMethod(layout, 'forEachEdge', (edge: GraphEdge) => rawEdges.push(edge));

      expect(rawEdges).toHaveLength(1);
      const rawPoints = rawEdges[0].points;
      const source = result.nodes!.find((node) => node.id === 'source')!.style!;
      const target = result.nodes!.find((node) => node.id === 'target')!.style!;
      const midpoint = [(Number(source.x) + Number(target.x)) / 2, (Number(source.y) + Number(target.y)) / 2, 0];
      const direction = rankdir === 'LR' || rankdir === 'TB' ? 1 : -1;
      const offset = rankdir === 'LR' || rankdir === 'RL' ? [direction * 16, 0] : [0, direction * 16];

      expect(result.edges?.[0].style?.controlPoints).toEqual([midpoint]);
      expect(result.edges?.[0].style?.controlPoints).not.toBe(rawPoints);
      expect(rawPoints).toEqual([
        [Number(source.x) + offset[0], Number(source.y) + offset[1], 0],
        midpoint,
        [Number(target.x) - offset[0], Number(target.y) - offset[1], 0],
      ]);
      expect(data).toEqual(original);
    });

    it('preserves AntVDagre control points', async () => {
      const data = createData();
      const original = JSON.parse(JSON.stringify(data));
      const AdaptiveAntVDagreLayout = layoutAdapter(AntVDagreLayout, context);
      const layout = new AdaptiveAntVDagreLayout(context, {
        rankdir: 'LR',
        nodeSize: 32,
        ranksep: 50,
        controlPoints: true,
        edgeLabelSpace: true,
        enableWorker: false,
      });

      const result = await layout.execute(data);
      const rawEdges: GraphEdge[] = [];
      invokeLayoutMethod(layout, 'forEachEdge', (edge: GraphEdge) => rawEdges.push(edge));

      expect(rawEdges).toHaveLength(1);
      expect(rawEdges[0].points).toBeDefined();
      expect(rawEdges[0].points!.length).toBeGreaterThan(0);
      expect(result.edges?.[0].style?.controlPoints).toEqual(rawEdges[0].points);
      expect(data).toEqual(original);
    });

    it.each([
      { id: 'dagre', points: undefined },
      { id: 'dagre', points: [] },
      { id: 'custom', points: undefined },
      { id: 'custom', points: [] },
    ])('handles $id with points=$points', async ({ id, points }) => {
      class EmptyPointsLayout extends MockLayout {
        public id = id;

        public forEachEdge(callback: (edge: any) => void) {
          super.forEachEdge((edge) => callback({ ...edge, points }));
        }
      }

      const data = createData();
      const original = JSON.parse(JSON.stringify(data));
      const AdaptiveEmptyPointsLayout = layoutAdapter(EmptyPointsLayout as any, context);
      const layout = new AdaptiveEmptyPointsLayout(context);

      const result = await layout.execute(data);
      expect(result.edges?.[0].style?.controlPoints).toEqual([]);
      expect(data).toEqual(original);

      const emptyResult = await layout.execute({ ...data, edges: [] });
      expect(emptyResult.edges).toEqual([]);
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
