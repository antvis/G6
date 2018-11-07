const Graph = require('../../src/graph');
const expect = require('chai').expect;
const Util = require('../../src/util/');
const data = require('../fixtures/sample-graph-data.json');

const div = document.createElement('div');
div.setAttribute('data-test-spec', 'graph-spec.js');
div.id = 'graph';
document.body.appendChild(div);
data.nodes.forEach(node => {
  node.label = node.id;
});
const graph = new Graph({
  container: div,
  width: 500,
  height: 500,
  layout() {

  }
});
graph.source(Util.clone(data));
graph.render();
graph.update('node3', {
  x: 111
});

function expectToDeepAlmost(truely, expected, error = 1) {
  Util.each(truely, (tv, tk) => {
    const ev = expected[tk];
    const bool = (tv > ev - error && tv < ev + error);
    expect(bool).equal(true);
  });
}

describe('graph test', () => {
  it('render', () => {
    const canvas = graph.getCanvas();
    let i = 0;
    canvas.deepEach(() => {
      i++;
    });
    expect(i).equal(29);
  });
  it('save', () => {
    graph.save();
  });
  it('getItems', () => {
    const items = graph.getItems();
    expect(items.length).equal(10);
  });
  it('getNodes', () => {
    const items = graph.getNodes();
    expect(items.length).equal(5);
  });
  it('getEdges', () => {
    const items = graph.getEdges();
    expect(items.length).equal(3);
  });
  it('getGroups', () => {
    const items = graph.getGroups();
    expect(items.length).equal(1);
  });
  it('getGuides', () => {
    const items = graph.getGuides();
    expect(items.length).equal(1);
  });
  it('find', () => {
    const item = graph.find('node1');
    expect(item.id).equal('node1');
  });
  it('toFront', () => {
    const itemGroup = graph.get('_itemGroup');
    const children = itemGroup.get('children');
    const node1 = graph.find('node1');
    graph.toFront('node1');
    graph.toFront(node1);
    expect(children[children.length - 1]).equal(node1.getGraphicGroup());
  });
  it('toBack', () => {
    const itemGroup = graph.get('_itemGroup');
    const children = itemGroup.get('children');
    const node1 = graph.find('node1');
    graph.toBack('node1');
    graph.toBack(node1);
    expect(children[0]).equal(node1.getGraphicGroup());
  });
  it('add', () => {
    graph.add('node', {
      id: 'node6',
      x: 150,
      y: 150,
      size: [ 10, 10 ]
    });
    graph.add('group', {
      id: 'group2',
      label: 'group2'
    });
    graph.add('node', {
      id: 'node7',
      x: 150,
      y: 250,
      parent: 'group1'
    });
    graph.add('node', {
      id: 'node8',
      x: 90,
      y: 250,
      parent: 'group2'
    });
    graph.add('node', {

    });
    expect(graph.find('node7').id).equal('node7');
  });
  it('remove', () => {
    const node = graph.find('node1');
    const edges = node.getEdges();
    graph.remove('node1');
    expect(node.destroyed).equal(true);
    expect(graph.find('node1')).equal(undefined);
    Util.each(edges, edge => {
      expect(edge.destroyed).equal(true);
    });
    graph.remove('group1');
    expect(graph.find('group1')).equal(undefined);
    expect(graph.find('node2')).equal(undefined);
    expect(graph.find('node7')).equal(undefined);
    graph.remove('node3');
    expect(graph.find('node3')).equal(undefined);
    graph.remove(graph.find('node5'));
    expect(graph.find('node5')).equal(undefined);
  });
  it('update', () => {
    graph.update('node4', {
      parent: 'group2'
    });
  });
  it('read', () => {
    graph.read({
      nodes: [{
        id: 'node1',
        x: 100,
        y: 100,
        parent: 'group1'
      }, {
        id: 'domCenter',
        x: 250,
        y: 250,
        parent: 'group1'
      }],
      groups: [{
        id: 'group1'
      }]
    });
    expect(graph.find('node4')).equal(undefined);
    expect(graph.find('node1').id).equal('node1');
  });
  it('translate', () => {
    graph.translate(100, 100);
    const matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 1, 0, 0, 0, 1, 0, 100, 100, 1 ]);
  });
  it('getPoint', () => {
    expect(graph.getPoint({
      x: 250,
      y: 250
    })).to.deep.equal({
      x: 150,
      y: 150
    });
  });
  it('getDomPoint', () => {
    const domPoint = graph.getDomPoint({
      x: 100,
      y: 100
    });
    expect(domPoint).to.deep.equal({
      x: 200,
      y: 200
    });
  });
  it('getPointByCanvas', () => {
    const canvasPoint = {
      x: 100,
      y: 100
    };
    const point = graph.getPointByCanvas(canvasPoint);
    const canvas = graph.get('_canvas');
    const pixelRatio = canvas.get('pixelRatio');
    const domPoint = {
      x: canvasPoint.x / pixelRatio,
      y: canvasPoint.y / pixelRatio
    };
    expect(point).to.deep.equal(graph.getPoint(domPoint));
  });
  it('getPointByClient', () => {
    const clientPoint = {
      x: 100,
      y: 100
    };
    const canvas = graph.get('_canvas');
    const canvasPoint = canvas.getPointByClient(clientPoint.x, clientPoint.y);
    const point = graph.getPointByClient({
      x: 100,
      y: 100
    });
    expect(point).to.deep.equal(graph.getPointByCanvas(canvasPoint));
  });
  it('zoom', () => {
    let matrix;
    const minZoom = graph.get('minZoom');
    const maxZoom = graph.get('maxZoom');
    graph.zoom({
      x: 100,
      y: 100
    }, 0.5);
    matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 0.5, 0, 0, 0, 0.5, 0, 150, 150, 1 ]);
    graph.zoom({
      x: 100,
      y: 100
    }, minZoom - 0.1);
    matrix = graph.getMatrix();
    expect(matrix[0]).equal(minZoom);
    graph.zoom({
      x: 100,
      y: 100
    }, maxZoom + 1);
    matrix = graph.getMatrix();
    expect(matrix[0]).equal(maxZoom);
    graph.zoom({
      x: 100,
      y: 100
    }, 1);
    matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 1, 0, 0, 0, 1, 0, 100, 100, 1 ]);
  });
  it('zoomByDom', () => {
    graph.zoomByDom(graph.getDomPoint({
      x: 100,
      y: 100
    }), 0.5);
    const matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 0.5, 0, 0, 0, 0.5, 0, 150, 150, 1 ]);
  });
  it('translateByDom', () => {
    graph.translateByDom(-100, -100);
    const matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 0.5, 0, 0, 0, 0.5, 0, -50, -50, 1 ]);
  });
  it('focusPoint', () => {
    graph.focusPoint({
      x: 100,
      y: 100
    });
    const matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 0.5, 0, 0, 0, 0.5, 0, 200, 200, 1 ]);
  });
  it('focusPointByDom', () => {
    const domPoint = graph.getDomPoint({
      x: 250,
      y: 250
    });
    graph.focusPointByDom(domPoint);
    const matrix = graph.getMatrix();
    expect(matrix).to.deep.equal([ 0.5, 0, 0, 0, 0.5, 0, 125, 125, 1 ]);
  });
  it('getWidth', () => {
    const width = graph.getWidth();
    expect(width).equal(500);
  });
  it('getHeight', () => {
    const height = graph.getHeight();
    expect(height).equal(500);
  });
  it('changeSize', () => {
    graph.changeSize(600, 600);
    const width = graph.getWidth();
    const height = graph.getHeight();
    expect(width).equal(600);
    expect(height).equal(600);
  });
  it('updateMatrix', () => {
    graph.updateMatrix([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });
  it('getCanvas', () => {
    expect(graph.getCanvas()).not.equal(undefined);
  });
  it('getRootGroup', () => {
    expect(graph.getRootGroup()).not.equal(undefined);
  });
  it('setFitView', () => {
    let matrix;
    graph.setFitView('tl');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, -59, -29, 1 ], 1);
    graph.setFitView('cc');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, 125, 140, 1 ], 1);
    graph.setFitView('tc');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, 125, -29, 1 ], 1);
    graph.setFitView('tr');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, 309, -29, 1 ], 1);
    graph.setFitView('rc');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, 309, 140, 1 ], 1);
    graph.setFitView('br');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, 309, 309, 1 ], 1);
    graph.setFitView('bc');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, 125, 309, 1 ], 1);
    graph.setFitView('bl');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, -59, 309, 1 ], 1);
    graph.setFitView('lc');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, -59, 140, 1 ], 1);
    graph.setFitView('');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 1, 0, 0, 0, 1, 0, -59, 140, 1 ], 1);
    graph.setFitView('autoZoom');
    matrix = graph.getMatrix();
    expectToDeepAlmost(matrix, [ 2.3, 0, 0, 0, 2.3, 0, -119.4, -83.4, 1 ], 1);
  });
  it('hide && show', () => {
    graph.add('edge', {
      id: 'node1-domCenter',
      source: 'node1',
      target: 'domCenter'
    });
    graph.add('edge', {
      id: 'node1-{50,50}',
      source: 'node1',
      target: {
        x: 50,
        y: 100
      }
    });
    graph.zoom(1);
    graph.setFitView('cc');

    graph.hide(graph.find('node1-domCenter'));
    expect(graph.find('node1-domCenter').getGraphicGroup().get('visible')).equal(false);
    graph.show(graph.find('node1-domCenter'));
    expect(graph.find('node1-domCenter').getGraphicGroup().get('visible')).equal(true);

    graph.hide(graph.find('node1'));
    expect(graph.find('node1').getGraphicGroup().get('visible')).equal(false);
    expect(graph.find('node1-{50,50}').getGraphicGroup().get('visible')).equal(false);
    graph.show(graph.find('node1'));
    expect(graph.find('node1').getGraphicGroup().get('visible')).equal(true);
    expect(graph.find('node1-{50,50}').getGraphicGroup().get('visible')).equal(true);

    graph.hide('group1');
    expect(graph.find('group1').getGraphicGroup().get('visible')).equal(false);
    expect(graph.find('domCenter').getGraphicGroup().get('visible')).equal(false);
    graph.show('group1');
    expect(graph.find('group1').getGraphicGroup().get('visible')).equal(true);
    expect(graph.find('domCenter').getGraphicGroup().get('visible')).equal(true);
  });
  it('endArrow', () => {
    graph.update('node1-domCenter', {
      endArrow: true,
      startArrow: true
    });
  });
  it('focus', () => {
    graph.focus('node1');
  });
  it('getLayout', () => {
    graph.getLayout();
  });
  it('reRender', () => {
    graph.reRender();
  });
  it('saveImage', () => {
    const imageCanvas = graph.saveImage();
    expect(imageCanvas.tagName).eql('CANVAS');
  });
  it('destroy', () => {
    graph.destroy();
    expect(div.childNodes.length).equal(0);
  });
});

// describe('graph test cfg', () => {
//   it('container is id', () => {
//     const graph = new Graph({
//       id: 'graph',
//       width: 500,
//       height: 500
//     });
//     console.log(div);
//   });
// });
