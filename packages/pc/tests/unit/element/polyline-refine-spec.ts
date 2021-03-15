import { Graph } from '../../../src';
import '../../../src';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

describe('polyline edge', () => {
  const data = {
    nodes: [
      {
        id: '0',
        x: 150,
        y: 100,
        label: '0',
        anchorPoints: [[0.5, 1]],
      },
      {
        id: '1',
        x: 208,
        y: 51,
        label: '1',
        anchorPoints: [[0.5, 0]],
      },
      {
        id: '2',
        x: 193,
        y: 102,
        label: '2',
        anchorPoints: [[0.5, 0]],
      },
    ],
    edges: [
      {
        source: '0',
        target: '1',
      },
      {
        source: '0',
        target: '2',
      },
    ],
  };
  // TODO: edge2 error polyline
  it('polyline with simple', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
          },
          'zoom-canvas',
          'drag-canvas',
        ],
      },
      defaultEdge: {
        type: 'polyline',
        sourceAnchor: 0,
        targetAnchor: 0,
        routeCfg: {
          simple: true,
        },
        style: {
          offset: 5,
          endArrow: true,
        },
      },
      defaultNode: {
        type: 'rect',
        size: [120, 50],
        style: {
          opacity: 0.1,
        },
      },
      fitCenter: true,
    });
    graph.data(data);
    graph.render();
    console.log(graph.getEdges()[0].getKeyShape());
    console.log(graph.getEdges()[1].getKeyShape());

    const path1 = graph.getEdges()[0].getKeyShape().attr('path');
    expect(path1[1][1]).toBe(150);
    expect(path1[1][2]).toBe(130.5);
    expect(path1[2][1]).toBe(273.5);
    expect(path1[2][2]).toBe(130.5);
    expect(path1[3][1]).toBe(273.5);
    expect(path1[3][2]).toBe(20.5);
    expect(path1[4][1]).toBe(208);
    expect(path1[4][2]).toBe(20.5);
    expect(path1[5][1]).toBe(208);
    expect(path1[5][2]).toBe(25.5);
  });


  it.only('polyline with radius and circle ellipse node', () => {

    const data2 = {
      nodes: [
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '3',
        },
        {
          id: '4',
        },
        {
          id: '5',
        },
        {
          id: '6',
        },
        {
          id: '7',
        },
        {
          id: '8',
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
        },
        {
          source: '1',
          target: '3',
        },
        {
          source: '2',
          target: '4',
        },
        {
          source: '3',
          target: '4',
        },
        {
          source: '4',
          target: '5',
        },
        {
          source: '5',
          target: '6',
        },
        {
          source: '6',
          target: '7',
        },
        {
          source: '6',
          target: '8',
        },
      ],
    };

    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
          },
          'zoom-canvas',
          'drag-canvas',
        ],
      },
      defaultEdge: {
        type: 'polyline',
        // routeCfg: {
        //   simple: true,
        // },
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
        },
      },
      defaultNode: {
        type: 'circle',
        style: {
          opacity: 0.1,
        },
      },
    });
    graph.data(data2);
    graph.render();

    // const path1 = graph.getEdges()[0].getKeyShape().attr('path');
    // expect(path1[1][1]).toBe(150);
    // expect(path1[1][2]).toBe(130.5);
    // expect(path1[2][1]).toBe(273.5);
    // expect(path1[2][2]).toBe(130.5);
    // expect(path1[3][1]).toBe(273.5);
    // expect(path1[3][2]).toBe(20.5);
    // expect(path1[4][1]).toBe(208);
    // expect(path1[4][2]).toBe(20.5);
    // expect(path1[5][1]).toBe(208);
    // expect(path1[5][2]).toBe(25.5);
  });
  
  xit('polyline edge performance exam', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // linkCenter: true,
      modes: {
        default: [
          {
            type: 'drag-node',
            // enableDebounce: true,
            // enableOptimize: true,
          },
          'zoom-canvas',
          'drag-canvas',
        ],
      },
      defaultEdge: {
        type: 'polyline',
        routeCfg: {
          simple: true,
        },
      },
      defaultNode: {
        type: 'rect',
        size: [10, 10],
      },
      fitCenter: true,
    });
    const data = {
      nodes: [
        {
          id: 'root',
          x: 50,
          y: 250,
        },
      ],
      edges: [],
    };
    for (let i = 0; i < 20; i++) {
      data.nodes.push({
        id: `${i}`,
        x: 200,
        y: 10 + i * 10,
      });
      data.edges.push({
        source: 'root',
        target: `${i}`,
      });
    }
    graph.data(data);
    graph.render();
  });
});
