const G6 = require('../../../src/index');
const Layout = require('../../../plugins/layout.forceAtlas2/');
const expect = require('chai').expect;
const Util = G6.Util;

document.body.appendChild(Util.createDOM(`
<div id='FAMountNode'></div>
`));

describe('custom layout test', () => {
  const originInnerHTML = document.getElementById('FAMountNode').innerHTML;
  const layout = new Layout({
    useWorker: false
  });
  const data = {
    nodes: [{
      id: 'node1'
    }, {
      id: 'node2'
    }, {
      id: 'node3'
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node2',
      source: 'node3'
    }]
  };
  const graph = new G6.Graph({
    container: 'FAMountNode',
    width: 500,
    height: 500,
    plugins: [ layout ]
  });

  graph.read(data);
  it('graph render', () => {
    expect(document.getElementById('FAMountNode').innerHTML).not.eql(originInnerHTML);
  });
  it('layout node positions', () => {
    graph.on('afterlayout', () => {
      const node1Model = graph.find('node1').getModel();
      expect(node1Model.x).not.eql(undefined);
      expect(node1Model.y).not.eql(undefined);
    });
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(document.getElementById('FAMountNode').innerHTML).eql(originInnerHTML);
  });
});

describe('node nonoverlapping test', () => {
  const layout = new Layout({
    prevOverlapping: true,
    maxIteration: 10,
    useWorker: false
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 41,
      y: 0
    }, {
      id: 'node2',
      x: 0,
      y: 0
    }, {
      id: 'node3',
      x: 0,
      y: 0
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node2',
      source: 'node3'
    }]
  };
  const div = document.createElement('div');
  div.id = 'FAMountNode1';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'FAMountNode1',
    width: 500,
    height: 500,
    plugins: [ layout ]
  });
  graph.read(data);
  it('overlapping', () => {
    graph.on('afterlayout', () => {
      const node1Model = graph.find('node1').getModel();
      const node2Model = graph.find('node2').getModel();
      const node3Model = graph.find('node3').getModel();
      const node1BBox = node1Model.getBBox();
      const node2BBox = node2Model.getBBox();
      const node3BBox = node3Model.getBBox();
      const node1Radius = (node1BBox.maxX - node1BBox.minX) / 2;
      const node2Radius = (node2BBox.maxX - node2BBox.minX) / 2;
      const node3Radius = (node3BBox.maxX - node3BBox.minX) / 2;
      const dist12 = Math.plot(node1Model.x - node2Model.x, node1Model.y - node2Model.y);
      const dist23 = Math.plot(node2Model.x - node3Model.x, node2Model.y - node3Model.y);
      const dist13 = Math.plot(node1Model.x - node3Model.x, node1Model.y - node3Model.y);
      expect(node1Radius - node2Radius <= dist12).eql(true);
      expect(node2Radius - node3Radius <= dist23).eql(true);
      expect(node1Radius - node3Radius <= dist13).eql(true);
    });
  });
  it('layout node positions', () => {
    graph.on('afterlayout', () => {
      const node1Model = graph.find('node1').getModel();
      expect(node1Model.x).not.eql(undefined);
      expect(node1Model.y).not.eql(undefined);
    });
  });
  it('graph destroy', () => {
    graph.destroy();
  });
});

describe('barnes hut optimiazation, linlog, dissuadeHubs test', () => {
  const layout = new Layout({
    barnesHut: true,
    useWorker: false,
    dissuadeHubs: true,
    maxIteration: 10,
    mode: 'linlog'
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 0,
      y: 0
    }, {
      id: 'node2',
      x: 0,
      y: 0
    }, {
      id: 'node3',
      x: 10000,
      y: 10000
    }, {
      id: 'node4',
      x: -10000,
      y: -10000
    }, {
      id: 'node5',
      x: 10000,
      y: -10000
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node2',
      source: 'node3'
    }]
  };
  const div = document.createElement('div');
  div.id = 'FAMountNode2';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'FAMountNode2',
    width: 500,
    height: 500,
    plugins: [ layout ]
  });

  graph.read(data);
  it('layout node positions', () => {
    graph.on('afterlayout', () => {
      const node1Model = graph.find('node1').getModel();
      expect(node1Model.x).not.eql(undefined);
      expect(node1Model.y).not.eql(undefined);
    });
  });
  it('graph destroy', () => {
    graph.destroy();
  });
});
