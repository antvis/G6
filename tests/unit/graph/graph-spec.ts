
import G6 from '../../../src'
import '../../../src/behavior'

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const globalGraph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: {
      default: ['drag-canvas']
    }
  });
  
  it('new & destroy graph', () => {
    const inst = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    const length = div.childNodes.length;

    expect(inst).not.toBe(undefined)
    expect(inst instanceof G6.Graph).toBe(true);
    expect(length > 1).toBe(true);

    expect(inst.get('canvas')).not.toBe(undefined)
    expect(inst.get('group')).not.toBe(undefined)

    expect(inst.get('group').get('className')).toEqual('root-container');
    expect(inst.get('group').get('id').endsWith('-root')).toBe(true);

    const children = inst.get('group').get('children');
    expect(children.length).toBe(4);
    expect(children[1].get('className')).toEqual('edge-container');
    expect(children[0].get('className')).toEqual('custom-group-container');

    const nodes = inst.getNodes();
    expect(nodes).not.toBe(undefined)
    expect(nodes.length).toBe(0);

    const edges = inst.getEdges();
    expect(edges).not.toBe(undefined)
    expect(edges.length).toBe(0);

    const canvas = inst.get('canvas');
    inst.destroy();

    expect(inst.destroyed).toBe(true)
    expect(canvas.destroyed).toBe(true);
    expect(length - div.childNodes.length).toBe(1);
  });

  it('translate', () => {
    const canvasMatrix = globalGraph.get('canvas').getMatrix();
    globalGraph.translate(100, 100);

    const matrix = globalGraph.get('group').getMatrix();

    expect(canvasMatrix).toBe(null)
    expect(matrix[6]).toBe(100);
    expect(matrix[7]).toBe(100);

    globalGraph.get('group').resetMatrix();
  });

  it('zoom', () => {
    globalGraph.zoom(3, { x: 100, y: 100 });

    const matrix = globalGraph.get('group').getMatrix()

    expect(matrix[0]).toBe(3);
    expect(matrix[4]).toBe(3);
    expect(matrix[6]).toBe(-200);
    expect(matrix[7]).toBe(-200);
    expect(globalGraph.getZoom()).toBe(3);

    globalGraph.get('group').resetMatrix();
  });

  it('zoomTo', () => {
    let matrix = globalGraph.get('group').getMatrix();
    expect(matrix).toBe(null);

    globalGraph.zoomTo(2);

    matrix = globalGraph.get('group').getMatrix();
    expect(matrix[0]).toBe(2);
    expect(matrix[4]).toBe(2);
    expect(matrix[6]).toBe(0);
    expect(matrix[7]).toBe(0);

    globalGraph.zoomTo(1.5, { x: 250, y: 250 });
    matrix = globalGraph.get('group').getMatrix();

    expect(matrix[0]).toBe(1.5);
    expect(matrix[4]).toBe(1.5);
    expect(matrix[6]).toBe(62.5);
    expect(matrix[7]).toBe(62.5);
  });

  it('change size', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });

    expect(graph.get('width')).toBe(500)
    expect(graph.get('height')).toBe(500)

    expect(typeof graph.changeSize).toEqual('function');
    graph.changeSize(300, 300);

    expect(graph.get('width')).toBe(300);
    expect(graph.get('height')).toBe(300);
    
    graph.destroy();
  });

  it('data & changeData & save', () => {
    const data = {
      nodes: [{
        id: 'a',
        shape: 'circle',
        color: '#333',
        x: 30,
        y: 30,
        size: 20,
        label: 'a'
      }, {
        id: 'b',
        shape: 'ellipse',
        color: '#666',
        x: 50,
        y: 60,
        size: [ 30, 40 ],
        label: 'b'
      }, {
        id: 'c',
        shape: 'rect',
        color: '#999',
        x: 100,
        y: 70,
        size: 20,
        label: 'c'
      }],
      edges: [{
        source: 'a',
        target: 'b',
        id: 'd'
      }, {
        source: 'a',
        target: 'c',
        id: 'e'
      }]
    };
    globalGraph.data(data);
    globalGraph.render();
    expect(globalGraph.get('nodes').length).toBe(3);
    expect(globalGraph.get('edges').length).toBe(2);
    let map = globalGraph.get('itemMap');
    expect(map.a).not.toBe(undefined);
    expect(map.b).not.toBe(undefined);
    expect(map.c).not.toBe(undefined);
    expect(map.d).not.toBe(undefined);
    const edges = globalGraph.getEdges();
    expect(edges.length).toBe(2);
    const nodes = globalGraph.getNodes();
    expect(nodes.length).toBe(3);
    expect(map.e).not.toBe(undefined);
    data.nodes.splice(0, 1);
    data.edges.splice(0, 1);
    data.edges[0].source = 'b';
    data.nodes.push({
      id: 'f',
      shape: 'circle',
      color: '#333',
      x: 100,
      y: 80,
      size: 30,
      label: 'f'
    });
    globalGraph.changeData(data);
    map = globalGraph.get('itemMap');
    expect(globalGraph.get('nodes').length).toBe(3);
    expect(globalGraph.get('edges').length).toBe(1);
    expect(map.a).toBe(undefined);
    expect(map.b).not.toBe(undefined);
    expect(map.c).not.toBe(undefined);
    expect(map.d).toBe(undefined);
    expect(map.e).not.toBe(undefined);
    expect(map.f).not.toBe(undefined);
    const exported = globalGraph.save();
    // expect(JSON.stringify(exported)).not.to.throw;
    expect(exported.nodes.length).toBe(3);
    expect(exported.edges.length).toBe(1);
    const edge = exported.edges[0];
    expect(edge.id).toBe('e');
    expect(edge.source).toBe('b');
    expect(edge.target).toBe('c');
  });
})