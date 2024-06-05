import { Graph } from '../../../src';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'circular',
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
  });
  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
      },
      {
        id: 'node2',
        label: 'node2',
      },
      {
        id: 'node3',
        label: 'node3',
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
      {
        source: 'node2',
        target: 'node3',
      },
      {
        source: 'node3',
        target: 'node1',
      },
    ],
  };
  graph.data(data);
  graph.render();
  // graph.translate(100, 200);
  it('grid align begin', (done) => {
    graph.once('afterlayout', (e) => {
      setTimeout(() => {
        const bbox = graph.getGroup().getCanvasBBox();
        expect(bbox.x).toBe(0);
        expect(bbox.y).toBe(0);
        done();
      }, 50);
    });
    graph.updateLayout(
      {
        type: 'grid',
      },
      'begin',
    );
  });
  it('dagre align center', (done) => {
    graph.once('afterlayout', (e) => {
      setTimeout(() => {
        const bbox = graph.getGroup().getCanvasBBox();
        expect(bbox.x).toBe(206.43401336669922);
        expect(bbox.y).toBe(49.5);
        done();
      }, 50);
    });
    graph.updateLayout(
      {
        type: 'dagre',
      },
      'center',
    );
  });
  it('force align center', (done) => {
    const canvasPoint = { x: 100, y: 200 }
    const point = graph.getPointByCanvas(canvasPoint.x, canvasPoint.y)
    graph.once('afterlayout', () => {
      const meanCenter = { x: 0, y: 0 };
      graph.getNodes().forEach(node => {
        meanCenter.x += node.getModel().x;
        meanCenter.y += node.getModel().y;
      });
      meanCenter.x /= graph.getNodes().length;
      meanCenter.y /= graph.getNodes().length;
      expect(Math.abs(meanCenter.x - point.x) < 10).toBe(true);
      expect(Math.abs(meanCenter.y - point.y) < 10).toBe(true);
      done();
    });
    graph.updateLayout(
      {
        type: 'force',
      },
      'center',
      canvasPoint,
    );
  });
});
