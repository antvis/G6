const G6 = require('../../../src/index');
const Minimap = require('../../../plugins/tool.minimap/');
const expect = require('chai').expect;
const Simulate = require('event-simulate');
const Util = G6.Util;

document.body.appendChild(Util.createDOM(`
<div>
  <div id='minimapMountNode'></div>
  <div id="minimap"></div>
</div>
`));

describe('minimap test', () => {
  const originInnerHTML = document.getElementById('minimap').innerHTML;
  const minimap = new Minimap({
    container: 'minimap',
    width: 100,
    height: 100
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200
    }, {
      id: 'node2',
      x: 300,
      y: 200
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const graph = new G6.Graph({
    container: 'minimapMountNode',
    width: 500,
    height: 500,
    layout() {
      return;
    },
    plugins: [ minimap ]
  });
  graph.read(data);
  it('minimap render', () => {
    expect(document.getElementById('minimap').innerHTML).not.eql(originInnerHTML);
  });
  it('interaction', () => {
    const controlLayer = minimap.minimap.controlLayer;
    Simulate.simulate(controlLayer, 'mousedown', {
      clientX: 0,
      clientY: 0
    });
    Simulate.simulate(controlLayer, 'mousemove', {
      clientX: 10,
      clientY: 10
    });
    Simulate.simulate(controlLayer, 'mousemove', {
      clientX: 20,
      clientY: 20
    });
    Simulate.simulate(controlLayer, 'mouseup', {
      clientX: 20,
      clientY: 20
    });
    Simulate.simulate(controlLayer, 'mouseleave', {
      clientX: 100,
      clientY: 100
    });
  });
  it('after layout', () => {
    graph.layout();
  });
  it('over min node size', () => {
    graph.update('node1', {
      x: 10000
    });
  });
  it('minimap destroy', () => {
    graph.destroy();
    expect(document.getElementById('minimap').innerHTML).eql(originInnerHTML);
  });
});

describe('minimap container undefined test', () => {
  function fn() {
    const minimap = new Minimap();
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200
      }, {
        id: 'node2',
        x: 300,
        y: 200
      }],
      edges: [{
        target: 'node2',
        source: 'node1'
      }]
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 500,
      height: 500,
      layout() {
        return;
      },
      plugins: [ minimap ]
    });
    graph.read(data);
  }
  expect(fn).to.Throw();
});
