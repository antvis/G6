import G6 from '../../../src';
import dataset from './data';
import { mathEqual } from './util';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'circular-layout';
document.body.appendChild(div);

describe('circular layout', () => {
  it('circular layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'circular' },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();
    const width = graph.get('width');
    const height = graph.get('height');
    const radius = height > width ? width / 2 : height / 2;
    expect(mathEqual(data.nodes[0].x, 250 + radius)).toEqual(true);
    expect(mathEqual(data.nodes[0].y, 250)).toEqual(true);
    expect(data.nodes[0].y === 250);
    graph.destroy();
  });

  it('fixed radius, start angle, end angle', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();
    const pos = (200 * Math.sqrt(2)) / 2;
    expect(mathEqual(data.nodes[0].x, 250 + pos)).toEqual(true);
    expect(mathEqual(data.nodes[0].y, 250 + pos)).toEqual(true);
    graph.destroy();
  });

  it('circular with no node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [],
    });
    graph.render();
    graph.destroy();
  });

  it('circular with one node', () => {
    const center = [150, 50];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center: center,
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
        },
      ],
    });
    graph.render();
    const nodeModel = graph.getNodes()[0].getModel();
    expect(nodeModel.x).toEqual(center[0]);
    expect(nodeModel.y).toEqual(center[1]);
    graph.destroy();
  });

  it('circular with no radius but startRadius and endRadius', () => {
    const center = [150, 200];
    const startRadius = 1;
    const endRadius = 100;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center,
        startRadius,
        endRadius,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const nodeModelFirst = graph.getNodes()[0].getModel();
    expect(nodeModelFirst.x).toEqual(center[0] + startRadius);
    expect(nodeModelFirst.y).toEqual(center[1]);
    const nodeNumber = graph.getNodes().length;
    const nodeModelLast = graph.getNodes()[nodeNumber - 1].getModel();
    expect(mathEqual(nodeModelLast.x, 248)).toEqual(true);
    expect(mathEqual(nodeModelLast.y, 180)).toEqual(true);
    graph.destroy();
  });

  it('circular with no radius and startRadius but endRadius', () => {
    const center = [150, 200];
    const endRadius = 100;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center,
        endRadius,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const nodeModelFirst = graph.getNodes()[0].getModel();
    expect(nodeModelFirst.x).toEqual(center[0] + endRadius);
    expect(nodeModelFirst.y).toEqual(center[1]);
    graph.destroy();
  });

  it('circular with no radius and endRadius but startRadius', () => {
    const center = [150, 200];
    const startRadius = 100;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center,
        startRadius,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const nodeModelFirst = graph.getNodes()[0].getModel();
    expect(nodeModelFirst.x).toEqual(center[0] + startRadius);
    expect(nodeModelFirst.y).toEqual(center[1]);
    graph.destroy();
  });

  it('circular with topology ordering', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        ordering: 'topology',
        radius: 200,
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node) => {
      node.label = node.id;
    });
    graph.data(data);
    graph.render();
    const node0 = graph.findById('Uruguay').getModel();
    const node1 = graph.findById('Saudi Arabia').getModel();
    const dist1 =
      (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y);

    const node2 = graph.findById('Switzerland').getModel();
    const dist2 =
      (node2.x - node1.x) * (node2.x - node1.x) + (node2.y - node1.y) * (node2.y - node1.y);
    expect(mathEqual(dist1, dist2)).toEqual(true);

    const node3 = graph.findById('Sweden').getModel();
    const dist3 =
      (node2.x - node3.x) * (node2.x - node3.x) + (node2.y - node3.y) * (node2.y - node3.y);
    expect(mathEqual(dist3, dist2)).toEqual(true);
    graph.destroy();
  });

  it('circular with topology-directed ordering', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        ordering: 'topology-directed',
        radius: 200,
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node) => {
      node.label = node.id;
      node.size = 10;
    });
    graph.data(data);
    graph.render();
    const node0 = graph.findById('Uruguay').getModel();
    const node1 = graph.findById('Tunisia').getModel();
    const dist1 =
      (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y);

    const node2 = graph.findById('Switzerland').getModel();
    const dist2 =
      (node2.x - node1.x) * (node2.x - node1.x) + (node2.y - node1.y) * (node2.y - node1.y);
    expect(mathEqual(dist1, dist2)).toEqual(true);

    const node3 = graph.findById('Sweden').getModel();
    const dist3 =
      (node2.x - node3.x) * (node2.x - node3.x) + (node2.y - node3.y) * (node2.y - node3.y);
    expect(mathEqual(dist3, dist2)).toEqual(true);
    graph.destroy();
  });

  it('circular with degree ordering, counterclockwise', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        ordering: 'degree',
        radius: 200,
        clockwise: false,
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node) => {
      node.label = node.id;
    });
    graph.data(data);
    graph.render();
    const node0 = graph.findById('England').getModel();
    const node1 = graph.findById('Croatia').getModel();
    const dist1 =
      (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y);

    const node2 = graph.findById('Belgium').getModel();
    const dist2 =
      (node2.x - node1.x) * (node2.x - node1.x) + (node2.y - node1.y) * (node2.y - node1.y);
    expect(mathEqual(dist1, dist2)).toEqual(true);

    const node3 = graph.findById('Uruguay').getModel();
    const dist3 =
      (node2.x - node3.x) * (node2.x - node3.x) + (node2.y - node3.y) * (node2.y - node3.y);
    expect(mathEqual(dist3, dist2)).toEqual(true);
    graph.destroy();
  });

  it('circular layout', () => {
    const circularLayout = new G6.Layout['circular']({
      center: [250, 250],
    });
    circularLayout.init(data);
    circularLayout.execute();

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div,
    });
    graph.data(data);
    graph.render();

    expect(graph.getNodes()[0].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(undefined);
    graph.destroy();
  });
});
