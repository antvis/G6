const G6 = require('../../../src/index');
const Mapper = require('../../../plugins/tool.mapper/');
const expect = require('chai').expect;
const Util = G6.Util;

document.body.appendChild(Util.createDOM(`
<div>
  <div id='mountNode'></div>
  <div id="nodeSizeLegend"></div>
  <div id="nodeColorLegend"></div>
  <div id="nodeColorLegend1"></div>
  <div id="nodeColorLegend2"></div>
  <div id="nodeColorLegend3"></div>
  <div id="nodeColorCatLegend"></div>
  <div id="nodeSizeFormatLegend"></div>
  <div id="sliderChangeTestDiv"></div>
</div>
`));

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
    expect(size1).eql(10);
    expect(size2).eql(50);
  });
  it('legend destroy', () => {
    graph.destroy();
    expect(document.getElementById('nodeSizeLegend')).eql(null);
  });
});

describe('node color mapper domain length test', () => {
  const fn = function() {
    const nodeSizeMapper = new Mapper('node', 'class', 'color', [ '#ff0000', '#00ff00' ], {
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
  };

  it('legend render', () => {
    expect(fn).to.Throw();
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
    expect(document.getElementById('nodeColorLegend1')).eql(null);
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
    expect(document.getElementById('nodeColorLegend2')).eql(null);
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
    expect(document.getElementById('nodeColorLegend3')).eql(null);
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
    expect(document.getElementById('nodeColorCatLegend')).eql(null);
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
    expect(size1).eql(10);
    expect(size2).eql(50);
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
  });
});
