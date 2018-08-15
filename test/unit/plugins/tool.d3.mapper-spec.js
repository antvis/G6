const G6 = require('../../../src/index');
const Mapper = require('../../../plugins/tool.d3.mapper/');
const expect = require('chai').expect;
const Util = G6.Util;
const container = Util.createDOM(`
<div>
  <div id='mountNode'></div>
  <div id="d3NodeSizeLegend"></div>
  <div id="d3NodeColorLegend"></div>
  <div id="d3NodeColorLegend1"></div>
  <div id="d3NodeColorLegend2"></div>
  <div id="d3NodeColorLegend3"></div>
  <div id="d3NodeColorCatLegend"></div>
  <div id="d3NodeSizeFormatLegend"></div>
  <div id="d3SliderChangeTestDiv"></div>
</div>
`);
document.body.appendChild(container);

describe('d3 node size mapper test', () => {
  const originInnerHTML = document.getElementById('d3NodeSizeLegend').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'size', [ 10, 50 ], {
    scaleCfg: {
      type: 'log'
    },
    legendCfg: {
      containerId: 'd3NodeSizeLegend',
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
    expect(document.getElementById('d3NodeSizeLegend').innerHTML).not.eql(originInnerHTML);
  });
  it('node size mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    const size1 = node1Model.size;
    const size2 = node2Model.size;
    expect(size1).eql(10);
    expect(size2).eql(50);
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('d3NodeSizeLegend').innerHTML).eql(originInnerHTML);
  });
});

describe('d3 node color mapper domian equals 1 test', () => {
  const originInnerHTML = document.getElementById('d3NodeColorLegend1').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'color', [ '#ff0000', '#00ff00' ], {
    scaleCfg: {
      type: 'pow'
    },
    legendCfg: {
      containerId: 'd3NodeColorLegend1',
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
    expect(document.getElementById('d3NodeColorLegend1').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('rgb(0, 255, 0)');
    expect(node2Model.color).eql('rgb(0, 255, 0)');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('d3NodeColorLegend1').innerHTML).eql(originInnerHTML);
  });
});

describe('d3 node color mapper domian equals 0 test', () => {
  const originInnerHTML = document.getElementById('d3NodeColorLegend2').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'color', [ '#ff0000', '#00ff00' ], {
    scaleCfg: {
      type: 'pow'
    },
    legendCfg: {
      containerId: 'd3NodeColorLegend2',
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
    expect(document.getElementById('d3NodeColorLegend2').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('rgb(0, 255, 0)');
    expect(node2Model.color).eql('rgb(0, 255, 0)');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('d3NodeColorLegend2').innerHTML).eql(originInnerHTML);
  });
});

describe('d3 node color mapper domian equals -1 test', () => {
  const originInnerHTML = document.getElementById('d3NodeColorLegend3').innerHTML;
  const nodeSizeMapper = new Mapper('node', 'weight', 'color', [ '#ff0000', '#00ff00' ], {
    scaleCfg: {
      type: 'pow'
    },
    legendCfg: {
      containerId: 'd3NodeColorLegend3'
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
    expect(document.getElementById('d3NodeColorLegend3').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('rgb(255, 0, 0)');
    expect(node2Model.color).eql('rgb(255, 0, 0)');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('d3NodeColorLegend3').innerHTML).eql(originInnerHTML);
  });
});


describe('d3 edge size mapper test', () => {
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

describe('d3 edge size mapper vertical test', () => {
  const edgeSizeMapper = new Mapper('edge', 'weight', 'size', [ 10, 50 ], {
    legendCfg: {
      layout: 'vertical'
    }
  });
  const nodeXMapper = new Mapper('node', 'x', 'size', [ 10, 50, 90 ]);
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
    plugins: [ nodeXMapper, edgeSizeMapper ]
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

describe('d3 node color category mapper test', () => {
  const originInnerHTML = document.getElementById('d3NodeColorCatLegend').innerHTML;
  const nodeColoreMapper = new Mapper('node', 'class', 'color', [ '#ff0000', '#00ff00' ], {
    legendCfg: {
      containerId: 'd3NodeColorCatLegend'
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
    expect(document.getElementById('d3NodeColorCatLegend').innerHTML).not.eql(originInnerHTML);
  });
  it('node color mapper', () => {
    const node1Model = graph.find('node1').getModel();
    const node2Model = graph.find('node2').getModel();
    expect(node1Model.color).eql('#ff0000');
    expect(node2Model.color).eql('#00ff00');
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('d3NodeColorCatLegend').innerHTML).eql(originInnerHTML);
  });
});

describe('d3 node size mapper with formatter test', () => {
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
    const size1 = node1Model.size;
    const size2 = node2Model.size;
    expect(size1).eql(10);
    expect(size2).eql(50);
    graph.destroy();
  });
});


describe('d3 container undefined test', () => {
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
