import { Graph } from '../../../src';
import '../../../src';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

describe('vertical horizontal cubic edge', () => {
  it('vertical horizontal cubic edge with curveOffset', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // linkCenter: true,
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#333',
        },
        targetAnchor: 0,
        sourceAnchor: 1,
      },
      defaultNode: {
        type: 'rect',
        size: [10, 10],
        style: {
          opacity: 0.1,
        },
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      fitCenter: true,
    });
    const data = {
      nodes: [
        {
          id: '1',
          label: '1',
          x: 100,
          y: 300,
        },
        {
          id: '2',
          label: '2',
          x: 200,
          y: 200,
        },
        {
          id: '3',
          label: '3',
          x: 0,
          y: 200,
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
          curveOffset: 40,
        },
        {
          source: '1',
          target: '3',
          curveOffset: 80,
        },
      ],
    };
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    const keyShape = edge.getKeyShape();
    const path = keyShape.attr('path');
    console.log(path);
    expect(path[0][1]).toBe(105.5);
    expect(path[0][2]).toBe(300);
    expect(path[1][1]).toBe(190);
    expect(path[1][2]).toBe(300);
    expect(path[1][3]).toBe(110);
    expect(path[1][4]).toBe(200);
    expect(path[1][5]).toBe(194.5);
    expect(path[1][6]).toBe(200);

    const edge2 = graph.getEdges()[1];
    const keyShape2 = edge2.getKeyShape();
    const path2 = keyShape2.attr('path');
    console.log(path2);
    expect(path2[0][1]).toBe(105.5);
    expect(path2[0][2]).toBe(300);
    expect(path2[1][1]).toBe(130);
    expect(path2[1][2]).toBe(300);
    expect(path2[1][3]).toBe(-30);
    expect(path2[1][4]).toBe(200);
    expect(path2[1][5]).toBe(-5.5);
    expect(path2[1][6]).toBe(200);

    graph.destroy();
  });
  it('vertical horizontal cubic edge with minCurveOffset', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // linkCenter: true,
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#333',
        },
        targetAnchor: 0,
        sourceAnchor: 1,
      },
      defaultNode: {
        type: 'rect',
        size: [10, 10],
        style: {
          opacity: 0.1,
        },
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      fitCenter: true,
    });
    const data = {
      nodes: [
        {
          id: '1',
          label: '1',
          x: 100,
          y: 300,
        },
        {
          id: '2',
          label: '2',
          x: 100,
          y: 200,
        },
        {
          id: '3',
          label: '3',
          x: 80,
          y: 200,
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
          minCurveOffset: 40,
        },
        {
          source: '1',
          target: '3',
          minCurveOffset: 80,
        },
      ],
    };
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    const keyShape = edge.getKeyShape();
    const path = keyShape.attr('path');
    expect(path[0][1]).toBe(105.5);
    expect(path[0][2]).toBe(300);
    expect(path[1][1]).toBe(140);
    expect(path[1][2]).toBe(300);
    expect(path[1][3]).toBe(60);
    expect(path[1][4]).toBe(200);
    expect(path[1][5]).toBe(94.5);
    expect(path[1][6]).toBe(200);

    const edge2 = graph.getEdges()[1];
    const keyShape2 = edge2.getKeyShape();
    const path2 = keyShape2.attr('path');
    console.log(path2);
    expect(path2[0][1]).toBe(105.5);
    expect(path2[0][2]).toBe(300);
    expect(path2[1][1]).toBe(170);
    expect(path2[1][2]).toBe(300);
    expect(path2[1][3]).toBe(10);
    expect(path2[1][4]).toBe(200);
    expect(path2[1][5]).toBe(74.5);
    expect(path2[1][6]).toBe(200);

    graph.destroy();
  });
});
