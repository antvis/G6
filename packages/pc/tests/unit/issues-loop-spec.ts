import G6, { Graph } from '../../src';
import { Arrow } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);


describe('issues', () => {
  it('basic test ui', () => {

    const nodes = [
      {
        id: '1',
        type: 'rect',
        color: '#333',
        x: 100,
        y: 200,
        size: [80, 80],
        label: 'rect',
      },
      {
        id: '2',
        type: 'rect',
        color: '#333',
        x: 100,
        y: 400,
        size: [400, 80],
        label: 'rect',
      },
      {
        id: '3',
        type: 'circle',
        color: '#666',
        x: 100,
        y: 700,
        size: [200, 40],
        label: 'circle',
      },
    ];

    const directions = [
      'top-left',
      'top',
      'top-right',
      'right',
      'bottom-right',
      'bottom',
      'bottom-left',
      'left',
    ];

    const edges = [];
    nodes.forEach((node) => {
      const perNodeEdge = directions.map((currentDirection) => ({
        source: node.id,
        target: node.id,
        type: 'loop',
        loopCfg: {
          position: currentDirection,
          dist: 20,
          pointPadding: 15,
          clockwise: true,
        },
      }));
      edges.push(...perNodeEdge);
    });

    const data = {
      nodes,
      edges,
    };
    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
      defaultNode: {
        type: 'rect',
      },
    });

    graph.data(data);
    graph.render();
  });

  it('test position right calc pointPadding value is ok ', () => {
    const node =
    {
      id: '1',
      type: 'rect',
      color: '#333',
      x: 100,
      y: 200,
      size: [80, 80],
      label: 'rect',
      style: {
        lineWidth: 0
      },
    };
    const edge = {
      source: '1',
      target: '1',
      type: 'loop',
      loopCfg: {
        position: 'right',
        dist: 20,
        pointPadding: 15,
      },
    };

    const data = {
      nodes: [node],
      edges: [edge],
    };

    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
    });

    const center = [node.x, node.y];
    const halfOfWidth = node.size[0] / 2;
    const halfOfHeight = node.size[1] / 2;
    const pointPadding = edge.loopCfg.pointPadding;
    graph.data(data);
    graph.render();
    const startPoint = [center[0] + halfOfWidth, center[1] - pointPadding];
    const endPoint = [center[0] + halfOfWidth, center[1] + pointPadding];

    const { edges } = data;
    const currentEdges = edges[0];

    //@ts-ignore
    expect([currentEdges.startPoint.x, currentEdges.startPoint.y]).toEqual(startPoint);
    //@ts-ignore
    expect([currentEdges.endPoint.x, currentEdges.endPoint.y]).toEqual(endPoint);
  });

  it('test position top-right calc pointPadding value is ok ', () => {
    const node =
    {
      id: '1',
      type: 'rect',
      color: '#333',
      x: 100,
      y: 200,
      size: [80, 80],
      label: 'rect',
      style: {
        lineWidth: 0
      },
    };
    const edge = {
      source: '1',
      target: '1',
      type: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 20,
        pointPadding: 15,
      },
    };

    const data = {
      nodes: [node],
      edges: [edge],
    };

    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
    });

    const center = [node.x, node.y];
    const halfOfWidth = node.size[0] / 2;
    const halfOfHeight = node.size[1] / 2;
    const pointPadding = edge.loopCfg.pointPadding;
    graph.data(data);
    graph.render();

    const startPoint = [center[0] + halfOfWidth - pointPadding, center[1] - halfOfHeight];
    const endPoint = [center[0] + halfOfWidth, center[1] - halfOfHeight + pointPadding];

    const { edges } = data;
    const currentEdges = edges[0];

    //@ts-ignore
    expect([currentEdges.startPoint.x, currentEdges.startPoint.y]).toEqual(startPoint);
    //@ts-ignore
    expect([currentEdges.endPoint.x, currentEdges.endPoint.y]).toEqual(endPoint);
  });

  it('test unset pointPadding and final pointPadding calc is ok', () => {
    const node =
    {
      id: '1',
      type: 'rect',
      color: '#333',
      x: 100,
      y: 200,
      size: [80, 80],
      label: 'rect',
      style: {
        lineWidth: 0
      },
    };
    const edge = {
      source: '1',
      target: '1',
      type: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 20,
      },
    };

    const data = {
      nodes: [node],
      edges: [edge],
    };

    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
    });

    const center = [node.x, node.y];
    const halfOfWidth = node.size[0] / 2;
    const halfOfHeight = node.size[1] / 2;
    // 预期 pointPadding 为 20
    const pointPadding = 20;
    graph.data(data);
    graph.render();

    const startPoint = [center[0] + halfOfWidth - pointPadding, center[1] - halfOfHeight];
    const endPoint = [center[0] + halfOfWidth, center[1] - halfOfHeight + pointPadding];

    const { edges } = data;
    const currentEdges = edges[0];

    //@ts-ignore
    expect([currentEdges.startPoint.x, currentEdges.startPoint.y]).toEqual(startPoint);
    //@ts-ignore
    expect([currentEdges.endPoint.x, currentEdges.endPoint.y]).toEqual(endPoint);
  });

  it('test set pointPadding greater than minimum height and width minimum value , final pointPadding calc is ok', () => {
    const node =
    {
      id: '1',
      type: 'rect',
      color: '#333',
      x: 100,
      y: 200,
      size: [80, 80],
      label: 'rect',
      style: {
        lineWidth: 0
      },
    };
    const edge = {
      source: '1',
      target: '1',
      type: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 20,
        clockwise: true,
        pointPadding: 1000,
      },
    };

    const data = {
      nodes: [node],
      edges: [edge],
    };

    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
    });

    const center = [node.x, node.y];
    const halfOfWidth = node.size[0] / 2;
    const halfOfHeight = node.size[1] / 2;
    // 预期 pointPadding 为 40
    const pointPadding = 40;
    graph.data(data);
    graph.render();

    const startPoint = [center[0] + halfOfWidth - pointPadding, center[1] - halfOfHeight];
    const endPoint = [center[0] + halfOfWidth, center[1] - halfOfHeight + pointPadding];

    const { edges } = data;
    const currentEdges = edges[0];

    //@ts-ignore
    expect([currentEdges.startPoint.x, currentEdges.startPoint.y]).toEqual(startPoint);
    //@ts-ignore
    expect([currentEdges.endPoint.x, currentEdges.endPoint.y]).toEqual(endPoint);
  });

  it('test set clockwise => true, calc pointPadding is ok', () => {
    const node =
    {
      id: '1',
      type: 'rect',
      color: '#333',
      x: 100,
      y: 200,
      size: [80, 80],
      label: 'rect',
      style: {
        lineWidth: 0
      },
    };
    const edge = {
      source: '1',
      target: '1',
      type: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 20,
        clockwise: true,
        pointPadding: 1000,
      },
    };

    const data = {
      nodes: [node],
      edges: [edge],
    };

    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
    });

    const center = [node.x, node.y];
    const halfOfWidth = node.size[0] / 2;
    const halfOfHeight = node.size[1] / 2;
    // 预期 pointPadding 为 40
    const pointPadding = 40;
    graph.data(data);
    graph.render();

    const startPoint = [center[0] + halfOfWidth - pointPadding, center[1] - halfOfHeight];
    const endPoint = [center[0] + halfOfWidth, center[1] - halfOfHeight + pointPadding];

    const { edges } = data;
    const currentEdges = edges[0];

    //@ts-ignore
    expect([currentEdges.startPoint.x, currentEdges.startPoint.y]).toEqual(startPoint);
    //@ts-ignore
    expect([currentEdges.endPoint.x, currentEdges.endPoint.y]).toEqual(endPoint);
  });
});
