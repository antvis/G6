import { AbstractCanvas } from '@antv/g-base';
import Graph from '../../implement-graph';

const div = document.createElement('div');
div.id = 'view-spec';
document.body.appendChild(div);

function numberEqual(a: number, b: number, gap = 0.001) {
  return Math.abs(a - b) <= gap;
}

describe('view', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    fitView: true,
  });
  it('default fit view', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
          size: [150, 100],
          type: 'simple-rect',
          color: '#333',
          style: {
            fill: '#666',
          },
        },
      ],
    };
    graph.data(data);
    graph.render();

    const canvas: AbstractCanvas = graph.get('canvas');

    let bbox = canvas.getCanvasBBox();

    expect(numberEqual(bbox.x, 10, 1)).toBe(true);
    expect(numberEqual(bbox.y, 89, 1)).toBe(true);
    expect(numberEqual(bbox.maxX, 490, 1)).toBe(true);
    expect(numberEqual(bbox.width, 480, 1)).toBe(true);
    expect(numberEqual(bbox.height, 321, 1)).toBe(true);

    data.nodes[0].size = [200, 300];
    graph.changeData(data);
    graph.render();

    bbox = graph.get('canvas').getCanvasBBox();

    expect(numberEqual(bbox.x, 90, 1)).toBe(true);
    expect(numberEqual(bbox.maxX, 410, 1)).toBe(true);
    expect(numberEqual(bbox.y, 10, 1)).toBe(true);
    expect(numberEqual(bbox.width, 320, 1)).toBe(true);
    expect(numberEqual(bbox.height, 480, 1)).toBe(true);
  });
  it('modify padding', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
          size: [1000, 1500],
          type: 'simple-rect',
          color: '#333',
          style: {
            fill: '#666',
          },
        },
      ],
    };
    graph.data(data);
    graph.render();
    graph.fitView([50, 50]);
    const bbox = graph.get('canvas').getCanvasBBox();
    expect(numberEqual(bbox.x, 116, 1)).toBe(true);
    expect(numberEqual(bbox.y, 50)).toBe(true);
    expect(numberEqual(bbox.width, 266, 1)).toBe(true);
    expect(numberEqual(bbox.height, 400, 1)).toBe(true);
  });
  it('focus item', () => {
    graph.clear();
    graph.zoom(2, { x: 250, y: 250 });
    const node = graph.addItem('node', {
      id: 'focus-node',
      type: 'circle',
      x: 50,
      y: 50,
      size: 60,
      color: '#666',
    });
    graph.focusItem(node);

    let centerPoint = graph.getPointByCanvas(250, 250);
    expect(centerPoint.x).toBe(50);
    expect(centerPoint.y).toBe(50);

    graph.zoom(0.1, { x: 50, y: 50 });
    centerPoint = graph.getPointByCanvas(250, 250);

    expect(centerPoint.x).not.toBe(50);
    expect(centerPoint.y).not.toBe(50);

    graph.focusItem('focus-node');
    centerPoint = graph.getPointByCanvas(250, 250);

    expect(centerPoint.x - 50 < 0.1).toBe(true);
    expect(centerPoint.y - 50 < 0.1).toBe(true);
  });
  it('focus edge', () => {
    const data = {
      nodes: [{id: '1', x: 10, y: 10}, {id: '2', x: 25, y: 40}, {id: '3', x: -50, y: 80}],
      edges: [{source: '1', target: '2'}, {source: '1', target: '3'}]
    }
    const g = new Graph({
      container: div,
      width: 500,
      height: 500,
    })
    g.read(data);
    g.get('canvas').get('el').style.backgroundColor='#ccc';
    g.zoom(2, { x: 10, y: 10 });
    g.focusItem(g.getEdges()[0]);
    let centerPoint = g.getPointByCanvas(250, 250);
    expect(centerPoint.x).toBe(17.5);
    expect(centerPoint.y).toBe(25);

    g.focusItem(g.getEdges()[1]);
    centerPoint = g.getPointByCanvas(250, 250);
    expect(centerPoint.x).toBe(-20);
    expect(centerPoint.y).toBe(45);
  });

  it('getPointByCanvas', () => {
    const point = graph.getPointByCanvas(250, 250);
    expect(numberEqual(point.x, 50, 0.1)).toBe(true);
    expect(numberEqual(point.y, 50, 0.1)).toBe(true);
  });
});
