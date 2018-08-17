const G6 = require('../../../src/index');
const MaxSpanningForestPlugin = require('../../../plugins/template.maxSpanningForest/');
const Mapper = require('../../../plugins/tool.mapper/');
const expect = require('chai').expect;
const Util = G6.Util;
const Simulate = require('event-simulate');

document.body.appendChild(Util.createDOM(`
<div id='template'></div>
<div id='tem_minimap'></div>
<div id='tem_legend'></div>
`));

describe('maxSpanningForest test', () => {
  const originInnerHTML = document.getElementById('template').innerHTML;
  // the instances of plugins
  const maxSpanningForest = new MaxSpanningForestPlugin({
    fisheye: false,
    layoutCfg: {
      maxIteration: 10,
      useWorker: false,
      kg: 10,
      prevOverlapping: true,
      onLayoutComplete() {
        const minimap = document.getElementById('tem_minimap');
        const legend = document.getElementById('tem_legend');
        if (minimap !== undefined) minimap.style.display = 'block';
        if (legend !== undefined) legend.style.display = 'block';
      }
    }
  });
  const edgeSizeMapper = new Mapper('edge', 'weight', 'size', [ 1, 16 ], {
    legendCfg: null
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
      source: 'node1',
      weight: 100
    }, {
      target: 'node2',
      source: 'node3',
      weight: 10
    }]
  };
  const graph = new G6.Graph({
    container: 'template',
    width: 500,
    height: 500,
    plugins: [ maxSpanningForest, edgeSizeMapper ]
  });

  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);

  it('layout node positions', () => {
    const node1Model = graph.find('node1').getModel();
    expect(node1Model.x).not.eql(undefined);
    expect(node1Model.y).not.eql(undefined);
  });
  it('mouseenter a node', () => {
    const node1 = graph.find('node1');
    const node1Model = node1.getModel();
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
    expect(node1.getKeyShape().attr('stroke')).eql('#fff');
  });
  it('mouseleave a node', () => {
    const node1 = graph.find('node1');
    const node1Model = node1.getModel();
    const clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x,
      clientY: clientPoint.y - 50
    });
    expect(node1.getKeyShape().attr('stroke')).eql('#696969');
  });

  it('mouseenter an edge', () => {
    const edge = graph.getEdges()[0];
    graph.toFront(edge);
    const points = edge.getPoints();
    const clientPoint = graph.getClientPoint(points[0]);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: clientPoint.x - 500,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x - 500,
      clientY: clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x,
      clientY: clientPoint.y
    });
    expect(edge.getKeyShape().attr('stroke')).eql('#4C7295');
  });
  it('mouseleave an edge', () => {
    const edge = graph.getEdges()[0];
    const clientPoint = edge.getPoints()[0];
    Simulate.simulate(mouseEventWrapper, 'mousemove', {
      clientX: clientPoint.x - 500,
      clientY: clientPoint.y - 500
    });
    const edgeModel = edge.getModel();
    expect(edgeModel.style.stroke).eql('#4F7DAB');
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(document.getElementById('template').innerHTML).eql(originInnerHTML);
  });
});

describe('fisheye test', () => {
  // the instances of plugins
  const maxSpanningForest = new MaxSpanningForestPlugin({
    layoutCfg: {
      maxIteration: 10,
      useWorker: false,
      kg: 10,
      prevOverlapping: true
    }
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
      source: 'node1',
      weight: 100
    }, {
      target: 'node2',
      source: 'node3',
      weight: 10
    }]
  };
  const div = document.createElement('div');
  div.id = 'template2';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'template2',
    width: 500,
    height: 500,
    plugins: [ maxSpanningForest ]
  });

  graph.read(data);

  it('active item string', () => {
    graph.activeItem('node1');
    const node1 = graph.find('node1');
    expect(node1.getKeyShape().attr('stroke')).eql('#fff');
  });
  it('active string for nothing', () => {
    const item = { type: 'nothing' };
    graph.activeItem(item);
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(document.getElementById('template2').innerHTML).eql('');
  });
});


describe('click node show menu test', () => {
  const maxSpanningForest = new MaxSpanningForestPlugin({
    layoutCfg: {
      maxIteration: 10,
      useWorker: false,
      kg: 10,
      prevOverlapping: true,
      fisheye: false
    }
  });
  const data = {
    nodes: [{
      id: 'node1'
    }, {
      id: 'node2'
    }, {
      id: 'node3'
    }, {
      id: 'node4'
    }, {
      id: 'node5'
    }, {
      id: 'node6'
    }],
    edges: [{
      target: 'node1',
      source: 'node2',
      weight: 100
    }, {
      target: 'node2',
      source: 'node1',
      weight: 10
    }, {
      target: 'node2',
      source: 'node3',
      weight: 10
    }, {
      target: 'node1',
      source: 'node3',
      weight: 10
    }, {
      target: 'node4',
      source: 'node1',
      weight: 100
    }, {
      target: 'node5',
      source: 'node1',
      weight: 100
    }, {
      target: 'node5',
      source: 'node1',
      weight: 1
    }, {
      target: 'node1',
      source: 'node5',
      weight: 10
    }, {
      target: 'node5',
      source: 'node6',
      weight: 10
    }]
  };
  const div = document.createElement('div');
  div.id = 'template3';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'template3',
    width: 500,
    height: 500,
    plugins: [ maxSpanningForest ]
  });

  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);
  const edge = graph.getEdges()[0];
  const points = edge.getPoints();
  const sourcePoint = graph.getClientPoint(points[0]);
  const endPoint = graph.getClientPoint(points[1]);
  const blanckPoint = { x: (sourcePoint.x + endPoint.x) / 2, y: (sourcePoint.y + endPoint.y) / 2 };

  it('click menu li 0', () => {
    const node1Model = graph.find('node1').getModel();
    const node1clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    // click menu
    const li0 = document.getElementsByClassName('menu_li')[0];
    Simulate.simulate(li0, 'click');
    const edges = graph.getEdges();
    expect(edges[3].isVisible()).eql(true);
    expect(edges[7].isVisible()).eql(true);
  });
  it('click blanck hide menu', () => {
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: blanckPoint.x,
      clientY: blanckPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: blanckPoint.x,
      clientY: blanckPoint.y
    });
    const menu = document.getElementsByClassName('menu')[0];
    expect(menu.style.display).eql('none');
  });
  it('click menu li 1', () => {
    const node1Model = graph.find('node1').getModel();
    const node1clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    // click menu
    const li1 = document.getElementsByClassName('menu_li')[1];
    Simulate.simulate(li1, 'click');
    const edges = graph.getEdges();
    expect(edges[1].isVisible()).eql(true);
    expect(edges[4].isVisible()).eql(true);
    expect(edges[5].isVisible()).eql(true);
  });
  it('click blanck hide menu', () => {
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: blanckPoint.x,
      clientY: blanckPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: blanckPoint.x,
      clientY: blanckPoint.y
    });
    const menu = document.getElementsByClassName('menu')[0];
    expect(menu.style.display).eql('none');
  });
  it('click menu li 2', () => {
    const node1Model = graph.find('node1').getModel();
    const node1clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    // click menu
    const li2 = document.getElementsByClassName('menu_li')[2];
    Simulate.simulate(li2, 'click');
    const edges = graph.getEdges();
    expect(edges[1].isVisible()).eql(true);
    expect(edges[3].isVisible()).eql(true);
    expect(edges[4].isVisible()).eql(true);
    expect(edges[5].isVisible()).eql(true);
    expect(edges[7].isVisible()).eql(true);
  });
  it('click blanck hide menu', () => {
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: blanckPoint.x,
      clientY: blanckPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: blanckPoint.x,
      clientY: blanckPoint.y
    });
    const menu = document.getElementsByClassName('menu')[0];
    expect(menu.style.display).eql('none');
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(document.getElementById('template3').innerHTML).eql('');
  });
});


describe('customize callback', () => {
  // the instances of plugins
  const maxSpanningForest = new MaxSpanningForestPlugin({
    layoutCfg: {
      maxIteration: 10,
      useWorker: false,
      kg: 10,
      prevOverlapping: true,
      fisheye: false
    },
    menuCfg: {
      lists: [{
        html: '来源',
        callBack() {
          return;
        }
      },
      {
        html: '去向',
        callBack: 'showTargets'
      },
      {
        html: '来源去向',
        callBack: 'showAll'
      }]
    }
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
      source: 'node1',
      weight: 100
    }, {
      target: 'node2',
      source: 'node3',
      weight: 10
    }, {
      target: 'node1',
      source: 'node3',
      weight: 10
    }]
  };
  const div = document.createElement('div');
  div.id = 'template4';
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: 'template4',
    width: 500,
    height: 500,
    plugins: [ maxSpanningForest ]
  });

  const mouseEventWrapper = graph.getMouseEventWrapper();
  graph.read(data);
  it('click menu li 0', () => {
    const node1Model = graph.find('node1').getModel();
    const node1clientPoint = graph.getClientPoint(node1Model);
    Simulate.simulate(mouseEventWrapper, 'mousedown', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    Simulate.simulate(mouseEventWrapper, 'mouseup', {
      clientX: node1clientPoint.x,
      clientY: node1clientPoint.y
    });
    // click menu
    const li0 = document.getElementsByClassName('menu_li')[0];
    Simulate.simulate(li0, 'click');
    const edges = graph.getEdges();
    expect(edges[2].isVisible()).eql(true);
  });

  it('graph destroy', () => {
    graph.destroy();
    expect(document.getElementById('template4').innerHTML).eql('');
  });
});
