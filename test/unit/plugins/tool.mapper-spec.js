const G6 = require('../../../src/index');
const Mapper = require('../../../plugins/tool.mapper/');
const expect = require('chai').expect;
const Util = G6.Util;
const Simulate = require('event-simulate');
const container = Util.createDOM(`
<div>
  <div id='mapperMountNode'></div>
  <div id="nodeSizeLegend"></div>
  <div id="nodeColorLegend"></div>
  <div id="nodeColorLegend1"></div>
  <div id="nodeColorLegend2"></div>
  <div id="nodeColorLegend3"></div>
  <div id="nodeColorCatLegend"></div>
  <div id="nodeSizeFormatLegend"></div>
  <div id="sliderChangeTestDiv"></div>
</div>
`);
document.body.appendChild(container);

describe('node size mapper test', () => {
  const originInnerHTML = document.getElementById('nodeSizeLegend').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'size', [ 10, 50 ], {
    scaleCfg: {
      type: 'log'
    },
    legendCfg: {
      containerId: 'nodeSizeLegend',
      layout: 'horizontal'
    }
  });
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
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeSizeMapper ]
  });
  graph.read(data);
  it('legend render', () => {
    expect(document.getElementById('nodeSizeLegend').innerHTML).not.eql(originInnerHTML);
  });
  it('node size mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    const size1 = node1Model.size / 2;
    const size2 = node2Model.size / 2;
    expect(size1).eql(5);
    expect(size2).eql(25);
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('nodeSizeLegend').innerHTML).eql(originInnerHTML);
  });
});

describe('node color mapper domain length test', () => {
  const nodeColorMapper = new Mapper('node', 'class', 'color', [ '#ff0000', '#00ff00', '#0000ff' ], {
    legendCfg: {
      layout: 'vertical'
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      class: 'class1'
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      class: 'class2'
    }, {
      id: 'node3',
      x: 400,
      y: 200,
      class: 'class3'
    }, {
      id: 'node4',
      x: 400,
      y: 200,
      class: 'class4'
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node3',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeColorMapper ]
  });
  graph.read(data);

  it('legend render', () => {
    expect(graph.find('node4').getModel().color).eql('#ff0000');
  });
  it('category filter cat 0', () => {

    const legend = nodeColorMapper.legend.get('canvas');
    const canvasEventWrapper = legend.get('el');
    const itemsGroup = nodeColorMapper.legend.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[0];
    const currentTarget = targetItem.get('children')[0];

    const canvasPos = [ (currentTarget.getBBox().minX + currentTarget.getBBox().maxX) / 2,
      (currentTarget.getBBox().minY + currentTarget.getBBox().maxY) / 2, 1 ];
    const matrix = currentTarget.getTotalMatrix();
    Util.vec3.transformMat3(canvasPos, canvasPos, matrix);
    const clientPos = legend.getClientByPoint(canvasPos[0], canvasPos[1]);

    Simulate.simulate(canvasEventWrapper, 'click', {
      clientX: clientPos.clientX,
      clientY: clientPos.clientY
    });
    expect((targetItem.get('checked')), false);
  });
  it('category filter cat 0 back', () => {

    const legend = nodeColorMapper.legend.get('canvas');
    const canvasEventWrapper = legend.get('el');
    const itemsGroup = nodeColorMapper.legend.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[0];
    const currentTarget = targetItem.get('children')[0];

    const canvasPos = [ (currentTarget.getBBox().minX + currentTarget.getBBox().maxX) / 2,
      (currentTarget.getBBox().minY + currentTarget.getBBox().maxY) / 2, 1 ];
    const matrix = currentTarget.getTotalMatrix();
    Util.vec3.transformMat3(canvasPos, canvasPos, matrix);
    const clientPos = legend.getClientByPoint(canvasPos[0], canvasPos[1]);

    Simulate.simulate(canvasEventWrapper, 'click', {
      clientX: clientPos.clientX,
      clientY: clientPos.clientY
    });
    expect((targetItem.get('checked')), true);
  });
  it('category filter cat 2', () => {

    const legend = nodeColorMapper.legend.get('canvas');
    const canvasEventWrapper = legend.get('el');
    const itemsGroup = nodeColorMapper.legend.get('itemsGroup');
    const targetItem = itemsGroup.get('children')[2];
    const currentTarget = targetItem.get('children')[2];

    const canvasPos = [ (currentTarget.getBBox().minX + currentTarget.getBBox().maxX) / 2,
      (currentTarget.getBBox().minY + currentTarget.getBBox().maxY) / 2, 1 ];
    const matrix = currentTarget.getTotalMatrix();
    Util.vec3.transformMat3(canvasPos, canvasPos, matrix);
    const clientPos = legend.getClientByPoint(canvasPos[0], canvasPos[1]);

    Simulate.simulate(canvasEventWrapper, 'click', {
      clientX: clientPos.clientX,
      clientY: clientPos.clientY
    });
    expect((targetItem.get('checked')), false);
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(div.innerHTML).eql('');
  });
});

describe('node color mapper domian equals 1 test', () => {
  const originInnerHTML = document.getElementById('nodeColorLegend1').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'color', [ '#ff0000', '#00ff00' ], {
    scaleCfg: {
      type: 'pow'
    },
    legendCfg: {
      containerId: 'nodeColorLegend1',
      layout: 'vertical'
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: 1
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: 1
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeSizeMapper ]
  });
  graph.read(data);
  it('legend render', () => {
    expect(document.getElementById('nodeColorLegend1').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('#00ff00');
    expect(node2Model.color).eql('#00ff00');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('nodeColorLegend1').innerHTML).eql(originInnerHTML);
  });
});

describe('node color mapper domian equals 0 test', () => {
  const originInnerHTML = document.getElementById('nodeColorLegend2').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'color', [ '#ff0000', '#00ff00' ], {
    scaleCfg: {
      type: 'pow'
    },
    legendCfg: {
      containerId: 'nodeColorLegend2',
      layout: '',
      formatter: num => {
        return num * num;
      }
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: 0
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: 0
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeSizeMapper ]
  });
  graph.read(data);
  it('legend render', () => {
    expect(document.getElementById('nodeColorLegend2').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('#00ff00');
    expect(node2Model.color).eql('#00ff00');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('nodeColorLegend2').innerHTML).eql(originInnerHTML);
  });
});

describe('node color mapper domian equals -1 test', () => {
  const originInnerHTML = document.getElementById('nodeColorLegend3').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'color', [ '#ff0000', '#00ff00' ], {
    scaleCfg: {
      type: 'pow'
    },
    legendCfg: {
      containerId: 'nodeColorLegend3'
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: -1
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: -1
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeSizeMapper ]
  });
  graph.read(data);
  it('legend render', () => {
    expect(document.getElementById('nodeColorLegend3').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('#ff0000');
    expect(node2Model.color).eql('#ff0000');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('nodeColorLegend3').innerHTML).eql(originInnerHTML);
  });
});


describe('edge size mapper test', () => {
  const edgeSizeMapper = new Mapper('edge', 'weight', 'size', [ 10, 50 ], {
    legendCfg: null
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
    }, {
      id: 'node3',
      x: 400,
      y: 200
    }],
    edges: [{
      target: 'node2',
      source: 'node1',
      weight: 1
    }, {
      target: 'node2',
      source: 'node3',
      weight: 2
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ edgeSizeMapper ]
  });
  graph.read(data);
  it('edge size mapper', () => {
    const edges = graph.getEdges();
    const edge1Model = edges[0].getModel();
    const edge2Model = edges[1].getModel();
    const size1 = edge1Model.size;
    const size2 = edge2Model.size;
    expect(size1).eql(10);
    expect(size2).eql(50);
  });
  it('legend destroy', () => {
    graph.destroy();
  });
});

describe('edge size mapper vertical test', () => {
  const edgeSizeMapper = new Mapper('edge', 'weight', 'size', [ 10, 50 ], {
    legendCfg: {
      layout: 'vertical'
    }
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
    }, {
      id: 'node3',
      x: 400,
      y: 200
    }],
    edges: [{
      target: 'node2',
      source: 'node1',
      weight: 1
    }, {
      target: 'node2',
      source: 'node3',
      weight: 2
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ edgeSizeMapper ]
  });
  graph.read(data);
  it('edge size mapper', () => {
    const edges = graph.getEdges();
    const edge1Model = edges[0].getModel();
    const edge2Model = edges[1].getModel();
    const size1 = edge1Model.size;
    const size2 = edge2Model.size;
    expect(size1).eql(10);
    expect(size2).eql(50);
    graph.destroy();
  });
});

describe('node color category mapper test', () => {
  const originInnerHTML = document.getElementById('nodeColorCatLegend').innerHTML;
  const nodeColoreMapper = new Mapper('node', 'class', 'color', [ '#ff0000', '#00ff00' ], {
    legendCfg: {
      containerId: 'nodeColorCatLegend'
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      class: 'class1'
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      class: 'class2'
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeColoreMapper ]
  });
  graph.read(data);
  it('legend render', () => {
    expect(document.getElementById('nodeColorCatLegend').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('#ff0000');
    expect(node2Model.color).eql('#00ff00');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('nodeColorCatLegend').innerHTML).eql(originInnerHTML);
  });
});

describe('node size mapper with formatter test', () => {
  const nodeSizeMapper = new Mapper('node', 'weight', 'size', [ 10, 50 ], {
    legendCfg: {
      formatter: num => {
        return num * num;
      }
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: 2
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: 3
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeSizeMapper ]
  });
  graph.read(data);
  it('node size mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    const size1 = node1Model.size / 2;
    const size2 = node2Model.size / 2;
    expect(size1).eql(5);
    expect(size2).eql(25);
    graph.destroy();
  });
});


describe('container undefined test', () => {
  const fn = function() {
    const nodeSizeMapper = new Mapper('node', 'weight', 'size', [ 10, 50 ], {
      legendCfg: {
        containerId: 'undefinedDOM'
      }
    });
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200,
        weight: 2
      }, {
        id: 'node2',
        x: 300,
        y: 200,
        weight: 3
      }],
      edges: [{
        target: 'node2',
        source: 'node1'
      }]
    };
    const div = document.createElement('div');
    document.body.appendChild(div);
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ nodeSizeMapper ]
    });
    graph.read(data);
    graph.destroy();
  };

  it('legend render', () => {
    expect(fn).to.Throw();
  });
});


describe('slider test', () => {
  const nodeSizeMapper = new Mapper('node', 'weight', 'size', [ 10, 50 ], {
    legendCfg: {
      containerId: 'sliderChangeTestDiv'
    }
  });
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      weight: 1
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      weight: 3
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ nodeSizeMapper ]
  });
  graph.read(data);

  it('legend sliderchange', () => {
    const slider = nodeSizeMapper.legend.get('slider');
    slider.emit('sliderchange', { range: [ 0, 50 ] });
    expect(document.getElementById('sliderChangeTestDiv')).not.eql(undefined);
    graph.destroy();
  });

  it('remove container', () => {
    container.destroy();
  });
});
