const G6 = require('../../../src/index');
const chai = require('chai');
const expect = chai.expect;
const Simulate = require('event-simulate');
const Fisheye = require('../../../plugins/tool.fisheye/');
const chaiAlmost = require('chai-almost');
chai.use(chaiAlmost());

describe('fisheye test', () => {
  const fisheye = new Fisheye();
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: 10
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: 100
    }, {
      id: 'node3',
      x: 0,
      y: -200,
      weight: 100
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
  div.id = 'fisheyeMountNode';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ fisheye ]
  });
  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);


  it('fisheye mouse move on node test', () => {
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
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x - 100,
      clientY: clientPoint.y
    });
    expect([ node1Model.x, node1Model.y ]).eql([ 130, 200 ]);

    graph.update('node3', {
      x: -50,
      y: -100
    });
    const node3Model = graph.find('node3').getModel();
    const clientPoint3 = graph.getClientPoint(node3Model);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint3.x,
      clientY: clientPoint3.y - 50
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint3.x,
      clientY: clientPoint3.y - 50
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint3.x,
      clientY: clientPoint3.y
    });
    expect([ node1Model.x, node1Model.y ]).eql([ 130, 200 ]);
    expect(div.childNodes.length).not.eql(0);
  });

  it('fisheye after updating node to (0, 0) test1', done => {
    graph.update('node2', {
      x: 0,
      y: 0
    });
    setTimeout(() => {
      const node2Model = graph.find('node2').getModel();
      const clientPoint = graph.getClientPoint(node2Model);
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
      expect(div.childNodes.length).not.eql(0);
      done();
    }, 100);
  });

  it('fisheye after updating node to (0, 0) test2', done => {
    graph.update('node2', {
      x: 0,
      y: 0
    });
    setTimeout(() => {
      Simulate.simulate(mouseEventWrapper, 'mousedown', {
        clientX: 0 + 50,
        clientY: 0
      });
      Simulate.simulate(mouseEventWrapper, 'mousemove', {
        clientX: 0 + 50,
        clientY: 0
      });
      Simulate.simulate(mouseEventWrapper, 'mousemove', {
        clientX: 0,
        clientY: 0
      });
      expect(div.childNodes.length).not.eql(0);
      done();
    }, 100);
  });

  it('fisheye after updating node to (0, -100)', done => {
    graph.update('node2', {
      x: 0,
      y: -100
    });
    setTimeout(() => {
      Simulate.simulate(mouseEventWrapper, 'mousedown', {
        clientX: 0 + 50,
        clientY: 100
      });
      Simulate.simulate(mouseEventWrapper, 'mousemove', {
        clientX: 0 + 50,
        clientY: 100
      });
      Simulate.simulate(mouseEventWrapper, 'mousemove', {
        clientX: 0,
        clientY: 100
      });
      expect(div.childNodes.length).not.eql(0);
      done();
    }, 100);
  });


  it('fisheye after updating node to red', done => {
    graph.update('node1', {
      color: 'red'
    });
    setTimeout(() => {
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
      expect([ node1Model.x, node1Model.y ]).to.be.deep.almost([ 130, 200 ], 5);
      expect(div.childNodes.length).not.eql(0);
      done();
    }, 100);
  });

  it('graph destroy', () => {
    graph.destroy();
    expect(div.childNodes.length).equal(0);
  });
});


describe('graph destroyed cacheLocation test', () => {
  const fisheye = new Fisheye();
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: 10
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: 100
    }, {
      id: 'node3',
      x: 0,
      y: -200,
      weight: 100
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
  div.id = 'fisheyeMountNode1';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'fisheyeMountNode1',
    width: 500,
    height: 500,
    plugins: [ fisheye ]
  });

  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);
  graph.destroy();

  it('fisheye mouse move on node', () => {
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: 100 - 50,
      clientY: 200
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: 100 - 50,
      clientY: 200
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: 100,
      clientY: 200
    });
  });
});


// describe('graph destroyed mousemove test', () => {
//   const fisheye = new Fisheye();
//   const div = document.createElement('div');
//   div.id = 'fisheyeMountNode2';
//   document.body.appendChild(div);
//   const graph = new G6.Graph({
//     container: 'fisheyeMountNode2',
//     width: 500,
//     height: 500,
//     plugins: [ fisheye ]
//   });

//   const mouseEventWrapper = graph.getMouseEventWrapper();
//   graph.destroy();

//   it('fisheye mouse move on node', () => {
//     Simulate.simulate(mouseEventWrapper, 'mousemove', {
//       clientX: 100 - 50,
//       clientY: 200
//     });
//     Simulate.simulate(mouseEventWrapper, 'mousemove', {
//       clientX: 100,
//       clientY: 200
//     });
//   });
// });


describe('node position undefined test', () => {
  const fisheye = new Fisheye();
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
  const div = document.createElement('div');
  div.id = 'fisheyeMountNode3';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'fisheyeMountNode3',
    width: 500,
    height: 500,
    plugins: [ fisheye ]
  });

  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);

  it('fisheye mouse move on node', () => {
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: 100 - 50,
      clientY: 200
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: 100 - 50,
      clientY: 200
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: 100,
      clientY: 200
    });
  });

  it('graph destroy', () => {
    graph.destroy();
    expect(div.childNodes.length).equal(0);
  });
});
