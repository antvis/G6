import { Graph } from '../../../../src';
import ZoomAction from '../../../../src/interaction/action/zoom';
import { Context } from '@antv/interaction';
import { getZoom } from '../../util/util';

describe('test move action', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
  });

  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
      },
      {
        id: 'node2',
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node1',
      },
      {
        id: 'edge3',
        source: 'node2',
        target: 'node2',
      },
    ],
  };

  graph.data(data);
  graph.render();
  const context = new Context();
  context.source = graph;
  context.event = {};
  const zoom = new ZoomAction(context);
  // @ts-ignore
  const ratio = zoom.zoomRatio;
  it('zoom in', () => {
    expect(getZoom(graph)).toBe(1);
    zoom.zoomIn();
    expect(getZoom(graph)).toBeCloseTo(1 - ratio);
    zoom.zoomIn();
    expect(getZoom(graph)).toBeCloseTo((1 - ratio) * (1 - ratio));
    zoom.zoomIn();
    expect(getZoom(graph)).toBeCloseTo((1 - ratio) * (1 - ratio) * (1 - ratio));
  });

  
  it('zoom out', () => {
    const curRatio = getZoom(graph);
    zoom.zoomOut();
    expect(getZoom(graph)).toBeCloseTo(curRatio / (1 - ratio));
    zoom.zoomOut();
    expect(getZoom(graph)).toBeCloseTo(curRatio / ((1 - ratio) * (1 - ratio)));
    zoom.zoomOut();
    expect(getZoom(graph)).toBeCloseTo(1);
  });

  it('zoom in by point', () => {
    context.event = {
      canvasX: 100,
      canvasY: 100
    };
    const curRatio = getZoom(graph);
    expect(curRatio).toBeCloseTo(1);
    zoom.zoomIn();
    expect(getZoom(graph)).toBeCloseTo(1 - ratio);
    zoom.zoomIn();
    expect(getZoom(graph)).toBeCloseTo((1 - ratio) * (1 - ratio));
  });

  it('reset', () => {
    context.event = {
      
    };
    zoom.zoomIn();
    zoom.zoomOut();
    zoom.zoomOut();
    zoom.reset();
    expect(getZoom(graph)).toBe(1);
  });
  afterAll(() => {
    graph.destroy();
    context.destroy();
  });
});