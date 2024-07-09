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
import { D3ForceLayout, DagreLayout } from '@antv/layout';

import type { GraphData } from '@/src';
import type { LayoutMapping } from '@antv/layout';

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
    const layoutMapping: LayoutMapping = {
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
    const layoutMapping: LayoutMapping = {
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
    const context = {
      model: {
        model: {
          hasTreeStructure: () => true,
          getParent: () => null,
        },
      },
    } as any;
    const AdaptiveDagreLayout = layoutAdapter(DagreLayout, context);

    const layout = new AdaptiveDagreLayout(context);

    const result = await layout.execute(dagreData);
    expect(result).toEqual({
      nodes: [
        { id: '0', style: { x: 82.5, y: 0, z: 0 } },
        { id: '1', style: { x: 25, y: 50, z: 0 } },
        { id: '2', style: { x: 117.5, y: 200, z: 0 } },
        { id: '3', style: { x: 82.5, y: 50, z: 0 } },
        { id: '4', style: { x: 50, y: 100, z: 0 } },
        { id: '5', style: { x: 25, y: 150, z: 0 } },
        { id: '6', style: { x: 82.5, y: 150, z: 0 } },
        { id: '7', style: { x: 50, y: 200, z: 0 } },
        { id: '8', style: { x: 0, y: 200, z: 0 } },
        { id: '9', style: { x: 117.5, y: 250, z: 0 } },
      ],
      edges: [
        { id: '0-1', source: '0', target: '1', style: { controlPoints: [[25, 25, 0]] } },
        {
          id: '0-2',
          source: '0',
          target: '2',
          style: {
            controlPoints: [
              [117.5, 25, 0],
              [117.5, 50, 0],
              [117.5, 75, 0],
              [117.5, 100, 0],
              [117.5, 125, 0],
              [117.5, 150, 0],
              [117.5, 175, 0],
            ],
          },
        },
        { id: '1-4', source: '1', target: '4', style: { controlPoints: [[25, 75, 0]] } },
        { id: '0-3', source: '0', target: '3', style: { controlPoints: [[82.5, 25, 0]] } },
        { id: '3-4', source: '3', target: '4', style: { controlPoints: [[82.5, 75, 0]] } },
        { id: '4-5', source: '4', target: '5', style: { controlPoints: [[25, 125, 0]] } },
        { id: '4-6', source: '4', target: '6', style: { controlPoints: [[82.5, 125, 0]] } },
        { id: '5-7', source: '5', target: '7', style: { controlPoints: [[50, 175, 0]] } },
        { id: '5-8', source: '5', target: '8', style: { controlPoints: [[0, 175, 0]] } },
        { id: '8-9', source: '8', target: '9', style: { controlPoints: [[0, 225, 0]] } },
        { id: '2-9', source: '2', target: '9', style: { controlPoints: [[117.5, 225, 0]] } },
        {
          id: '3-9',
          source: '3',
          target: '9',
          style: {
            controlPoints: [
              [152.5, 75, 0],
              [152.5, 100, 0],
              [152.5, 125, 0],
              [152.5, 150, 0],
              [152.5, 175, 0],
              [152.5, 200, 0],
              [152.5, 225, 0],
            ],
          },
        },
      ],
      combos: [],
    });
  });

  it('layoutAdapter with onTick', async () => {
    const context = {
      model: {
        model: {
          hasTreeStructure: () => true,
          getParent: () => null,
        },
      },
    } as any;
    const AdaptiveDagreLayout = layoutAdapter(D3ForceLayout, context);

    const onTick = jest.fn();

    const layout = new AdaptiveDagreLayout(context, {
      onTick,
    });

    await layout.execute(dagreData);

    expect(onTick).toHaveBeenCalled();
    expect(onTick).toHaveBeenCalledTimes(300);
  });

  it('invoke and get', async () => {
    const context = {
      model: {
        model: {
          hasTreeStructure: () => true,
          getParent: () => null,
        },
      },
    } as any;
    const AdaptiveDagreLayout = layoutAdapter(DagreLayout, context);

    const layout = new AdaptiveDagreLayout(context);

    expect(invokeLayoutMethod(layout, 'execute', dagreData)).toBeTruthy();
    expect(invokeLayoutMethod(layout, 'null')).toBe(null);

    expect(typeof getLayoutProperty(layout, 'assign')).toBe('function');
    expect(getLayoutProperty(layout, 'id')).toBe('dagre');
    expect(getLayoutProperty(layout, 'null')).toBe(null);
  });
});
