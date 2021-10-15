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
    setTimeout(() => {
      const bbox = graph.getGroup().getCanvasBBox();
      console.log('bbox', bbox.x, bbox.y);
      expect(Math.abs(bbox.x - 55.352659713113454) < 10).toBe(true);
      expect(Math.abs(bbox.y - 163.01955290709174) < 10).toBe(true);
      done();
    }, 2000);
    graph.updateLayout(
      {
        type: 'force',
      },
      'center',
      { x: 100, y: 200 },
    );
  });
});
