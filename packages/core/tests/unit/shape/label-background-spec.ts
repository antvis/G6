import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('edge label with background', () => {
  it('edge label background with overlapped end nodes ', () => {
    const graph = new Graph({
      container: 'container',
      width: 500,
      height: 500,
      defaultNode: {
        style: {
          opacity: 0
        }
      },
      defaultEdge: {
        type: 'line',
        labelCfg: {
          autoRotate: true,
          style: {
            fill: '#1890ff',
            fontSize: 14,
            fontFamily: 'Arial',
            background: {
              fill: '#ffffff',
              stroke: '#9EC9FF',
              padding: [2, 2, 2, 2],
              radius: 2,
            },
          },
        },
      },
    });

    graph.read({
      nodes: [{ id: '1', x: 100, y: 100 }, { id: '2', x: 100, y: 100 }],
      edges: [{ source: '1', target: '2', label: 'abc' }],
    });

    const edge = graph.getEdges()[0];
    const group = edge.getContainer();
    const bgRect = group.find(e => e.get('name') === 'text-bg-shape');
    expect(Math.abs(bgRect.attr('x') - 86) < 1).toBe(true);
    expect(Math.abs(bgRect.attr('y') - 91) < 2).toBe(true);
    expect(Math.abs(bgRect.attr('width') - 27) < 3).toBe(true);
    expect(Math.abs(bgRect.attr('height') - 18) < 3).toBe(true);
    graph.destroy();
  });
});
