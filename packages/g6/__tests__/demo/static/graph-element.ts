import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';
import data from '@@/dataset/cluster.json';
import type { StaticTestCase } from '../types';

export const graphElement: StaticTestCase = async (context) => {
  const { canvas, animation, expect } = context;

  const options = {
    container: canvas,
    data,
    theme: 'light',
    node: {
      style: {
        size: 20,
      },
      state: {
        active: { fill: '#dbedd0' },
      },
      animation: animation && {},
    },
    edge: {
      style: {},
      state: {
        active: { stroke: 'pink', lineWidth: 3 },
      },
      animation: animation && {},
    },
    layout: {
      type: 'd3force',
      preventOverlap: true,
      nodeSize: 20,
      animation,
    },
  };

  const graph = new Graph(options);

  // static
  if (expect) {
    expect(graph.getData().nodes).toEqual(data.nodes);
    expect(graph.getData().edges).toEqual(data.edges);
    expect(graph.getNodeData()).toEqual(data.nodes);
    expect(graph.getNodeData(data.nodes[0].id)).toEqual(data.nodes[0]);
    expect(graph.getNodeData(data.nodes.slice(0, 2).map((node) => node.id))).toEqual(data.nodes.slice(0, 2));
    expect(graph.getEdgeData()).toEqual(data.edges);
    expect(graph.getEdgeData(idOf(data.edges[0]))).toEqual(data.edges[0]);
    expect(graph.getEdgeData(data.edges.slice(0, 2).map(idOf))).toEqual(data.edges.slice(0, 2));
    expect(graph.getComboData()).toEqual([]);

    const ops = graph.getOptions();
    expect(ops.container).toEqual(canvas);
    expect(ops.data?.nodes?.length).toBe(data.nodes.length);
    expect(ops.data?.edges?.length).toBe(data.edges.length);
    expect(ops.node?.style?.size).toBe(20);
    expect(ops.node?.state).toEqual(options.node?.state);
    expect(ops.edge?.style).toEqual(options.edge?.style);
    expect(ops.edge?.state).toEqual(options.edge?.state);
    expect(ops.layout).toEqual(options.layout);
    expect(graph.getLayout()).toEqual(options.layout);
    expect(ops.theme).toBe('light');
    expect(graph.getTheme()).toBe('light');
    expect(graph.getBehaviors()).toEqual([]);
    expect(graph.getWidgets()).toEqual([]);

    expect(graph.getElementType(data.nodes[0].id)).toBe('node');
    expect(graph.getElementType(idOf(data.edges[0]))).toBe('edge');
    expect(graph.getRelatedEdgesData(data.nodes[0].id)).toEqual(
      data.edges.filter((edge) => edge.source === data.nodes[0].id || edge.target === data.nodes[0].id),
    );
    expect(graph.getNeighborNodesData(data.nodes[0].id)).toEqual(
      data.edges
        .filter((edge) => edge.source === data.nodes[0].id || edge.target === data.nodes[0].id)
        .map((edge) =>
          edge.source === data.nodes[0].id ? graph.getNodeData(edge.target) : graph.getNodeData(edge.source),
        ),
    );
    expect(graph.getParentData(data.nodes[0].id)).toBe(undefined);
  }

  await graph.render();

  // runtime
  if (expect) {
    expect(graph.getSize()).toEqual([500, 500]);
    expect(graph.getElementDataByState('node', 'active')).toEqual([]);
    expect(graph.getZoom()).toBe(1);
    const [pX, pY] = graph.getPosition();
    expect(pX).toBeCloseTo(250);
    expect(pY).toBeCloseTo(250);

    expect(graph.getElementPosition('0')).toBeTruthy();
    expect(graph.getElementRenderStyle('0')).toBeTruthy();
    expect(graph.getElementVisibility('0')).toBe('visible');
    expect(graph.getElementZIndex('0')).toBe(0);
    expect(graph.getElementState('0')).toEqual([]);
    expect(graph.getElementRenderBounds('0')).toBeTruthy();

    // 注意，此处 canvas 没有进行变换，所以 canvas 和 viewport 一致
    // Note that the canvas is not transformed here, so the canvas and viewport are the same
    const [cX, cY] = graph.getCanvasByViewport([250, 250]);
    expect(cX).toBeCloseTo(250);
    expect(cY).toBeCloseTo(250);

    const [vX, vY] = graph.getViewportByCanvas([250, 250]);
    expect(vX).toBeCloseTo(250);
    expect(vY).toBeCloseTo(250);

    const [ciX, ciY] = graph.getClientByCanvas([250, 250]);
    expect(ciX).toBeCloseTo(250);
    expect(ciY).toBeCloseTo(250);

    const [vcX, vcY] = graph.getCanvasByClient([250, 250]);
    expect(vcX).toBeCloseTo(250);
    expect(vcY).toBeCloseTo(250);

    const [centerX, centerY] = graph.getViewportCenter();
    expect(centerX).toBeCloseTo(250);
    expect(centerY).toBeCloseTo(250);

    expect(await graph.toDataURL()).toContain('data:image');
  }
};
