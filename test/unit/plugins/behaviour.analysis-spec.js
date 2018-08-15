const G6 = require('../../../src/index');
const Simulate = require('event-simulate');
const expect = require('chai').expect;
const Util = G6.Util;
require('../../../plugins/behaviour.analysis/');
document.body.appendChild(Util.createDOM(`
  <div id='mountNode'></div>
`));
describe('behaviour analysis test', () => {
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
    height: 500
  });
  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);
  it('panCanvas', () => {
    graph.addBehaviour([ 'panCanvas' ]);
    const clientPoint = graph.getClientPoint({
      x: 50,
      y: 50
    });
    Simulate.simulate(mouseEventWrapper, 'mouseenter', {
      clientX: clientPoint.x - 10,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 10,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseleave', {
      clientX: clientPoint.x - 10,
      clientY: clientPoint.y
    });
    expect(graph.getMatrix()[6]).eql(150);
    graph.removeBehaviour([ 'panCanvas' ]);
    graph.updateMatrix([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });
  it('rightPanCanvas', () => {
    graph.addBehaviour([ 'rightPanCanvas' ]);
    const clientPoint = graph.getClientPoint({
      x: 50,
      y: 50
    });
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x,
      clientY: clientPoint.y,
      button: 2
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 10,
      clientY: clientPoint.y,
      button: 2
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y,
      button: 2
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y,
      button: 2
    });
    expect(graph.getMatrix()[6]).eql(150);
    graph.removeBehaviour([ 'rightPanCanvas' ]);
    graph.updateMatrix([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });
  it('panBlank', () => {
    graph.addBehaviour([ 'panBlank' ]);
    let clientPoint = graph.getClientPoint({
      x: 100,
      y: 200
    });
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 10,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    expect(graph.getMatrix()[6]).eql(0);
    clientPoint = graph.getClientPoint({
      x: 0,
      y: 0
    });
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 10,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    expect(graph.getMatrix()[6]).eql(150);
    graph.removeBehaviour([ 'panBlank' ]);
    graph.updateMatrix([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });
  it('panNode', () => {
    graph.addBehaviour([ 'panNode' ]);
    const clientPoint = graph.getClientPoint({
      x: 100,
      y: 200
    });
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 5,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: clientPoint.x + 150,
      clientY: clientPoint.y
    });
    expect(graph.find('node1').getModel().x).eql(245);
    graph.removeBehaviour([ 'panBlank' ]);
  });
  it('wheelZoom', done => {
    const times = 2;
    graph.addBehaviour([ 'wheelZoom' ]);
    for (let index = 0; index < times; index++) {
      setTimeout(() => {
        graph.emit('mousewheel', {
          domEvent: {
            preventDefault() {

            },
            wheelDelta: 11
          },
          x: 50,
          y: 50
        });
      }, 30 * index);
    }
    for (let index = 0; index < times; index++) {
      setTimeout(() => {
        graph.emit('mousewheel', {
          domEvent: {
            preventDefault() {

            },
            wheelDelta: 2
          },
          x: 50,
          y: 50
        });
        if (index === times - 1) {
          done();
        }
      }, 30 * (index + times));
    }
  });
  it('destroy', () => {
    graph.destroy();
  });
});
