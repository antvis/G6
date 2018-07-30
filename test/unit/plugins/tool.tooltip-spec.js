const G6 = require('../../../src/index');
const Tooltip = require('../../../plugins/tool.tooltip/');
const Simulate = require('event-simulate');
const expect = require('chai').expect;
const Util = G6.Util;

document.body.appendChild(Util.createDOM(`
  <div id='mountNode'></div>
`));

describe('tooltip test', () => {
  const tooltip = new Tooltip();
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
    plugins: [ tooltip ]
  });
  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.node({
    tooltip(model) {
      return {
        title: model.id,
        list: [
          [ 'x', model.x ],
          [ 'y', model.y ]
        ]
      };
    }
  });
  graph.read(data);
  it('mouseenter show tooltip', () => {
    const node1Model = graph.find('node1').getModel();
    const clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x - 50,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x - 50,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x,
      clientY: clientPoint.y
    });
    expect(document.getElementsByClassName('g6-tooltip')[0]).not.eql(undefined);
  });
  it('mousemove move tooltip', () => {
    const node1Model = graph.find('node1').getModel();
    const clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 5,
      clientY: clientPoint.y
    });
  });
  it('mouseleave hide tooltip', () => {
    const node1Model = graph.find('node1').getModel();
    const clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x,
      clientY: clientPoint.y - 50
    });
    expect(document.getElementsByClassName('g6-tooltip')[0]).eql(undefined);
  });
  it('tooltip destroy', () => {
    graph.destroy();
  });
});
