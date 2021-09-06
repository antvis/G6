import { Circle } from '@antv/g';
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
            lineWidth: 0
          },
        },
      ],
    };
    graph.data(data);
    graph.render();

    let rootGroup = graph.getGroup();
    let bbox = rootGroup.getBounds();

    expect(bbox.min[0]).toBe(25);
    expect(bbox.min[1]).toBe(50);
    expect(bbox.max[0]).toBe(175);
    expect(bbox.max[1]).toBe(150);

    data.nodes[0].size = [200, 300];
    graph.changeData(data);
    graph.render();

    rootGroup = graph.getGroup();
    bbox = rootGroup.getBounds();
    
    expect(bbox.min[0]).toBe(0);
    expect(bbox.min[1]).toBe(-50);
    expect(bbox.max[0]).toBe(200);
    expect(bbox.max[1]).toBe(250);
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
            lineWidth: 0
          },
        },
      ],
    };
    graph.data(data);
    graph.render();
    graph.fitView([50, 50]);

    const bbox = graph.getGroup().getBounds();
    // bbox 是全局坐标系, 所以与 fitView 无关
    expect(bbox.min[0]).toBe(-400);
    expect(bbox.min[1]).toBe(-650);
    expect(bbox.max[0]).toBe(600);
    expect(bbox.max[1]).toBe(850);
    
    // 将 bbox 转成视口坐标系, 上下左右将有 50 padding
    const viewLeftTop = graph.getCanvasByPoint(bbox.min[0], bbox.min[1]);
    const viewRightBottom = graph.getCanvasByPoint(bbox.max[0], bbox.max[1]);
    expect(viewLeftTop.y).toBe(50);
    expect(viewRightBottom.y).toBe(450);
  });
  it('focus item', () => {
    const div2 = document.createElement('div');
    div2.id = 'view-spec';
    document.body.appendChild(div2);
    const graph2 = new Graph({
      container: div2,
      width: 500,
      height: 500,
      fitView: true,
    });
    graph.read({});
    graph2.zoom(2, { x: 250, y: 250 });
    const node = graph2.addItem('node', {
      id: 'focus-node',
      type: 'circle',
      x: 50,
      y: 50,
      size: 10,
      color: '#f00',
      style: {
        fill: '#f00'
      }
    });
    graph2.focusItem(node);

    let centerPoint = graph2.getPointByCanvas(250, 250);
    expect(centerPoint.x).toBe(50);
    expect(centerPoint.y).toBe(50);

    graph2.zoom(0.1, { x: 10, y: 10 });
    centerPoint = graph2.getPointByCanvas(250, 250);
    console.log('cneterpoint1', centerPoint);

    expect(centerPoint.x).not.toBe(50);
    expect(centerPoint.y).not.toBe(50);

    // TODO: 表现错误, 可能与 G 
    graph2.focusItem('focus-node');
    centerPoint = graph2.getPointByCanvas(250, 250);
    console.log('cneterpoint', centerPoint);

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
    // g.get('canvas').get('el').style.backgroundColor='#ccc';
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
});
