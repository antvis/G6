const G6 = require('../../../src/index');
const TextDisplay = require('../../../plugins/tool.textDisplay/');
const expect = require('chai').expect;

describe('text display test', () => {
  const textDisplay = new TextDisplay();
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      name: 'node1'
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      name: ''
    }, {
      id: 'node3',
      x: 400,
      y: 200,
      name: 'node3node3node3node3node3node3node3node3node3node3node3node3node3node3'
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node3',
      source: 'node2'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    plugins: [ textDisplay ]
  });
  graph.node({
    label(model) {
      return {
        text: model.name,
        stroke: '#fff',
        lineWidth: 4
      };
    }
  });
  graph.read(data);

  it('graph change view port', () => {
    graph.emit('afterviewportchange', {});

    const node1 = graph.find('node1');
    const node1label = node1.getLabel();
    const node3 = graph.find('node3');
    const node3label = node3.getLabel();
    expect(node1label.get('visible')).eql(true);
    expect(node3label.get('visible')).eql(false);
  });
  it('graph zoom', () => {
    graph.emit('afterzoom', {});

    const node1 = graph.find('node1');
    const node1label = node1.getLabel();
    const node3 = graph.find('node3');
    const node3label = node3.getLabel();
    expect(node1label.get('visible')).eql(true);
    expect(node3label.get('visible')).eql(false);
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(div.childNodes.length).equal(0);
  });
});
