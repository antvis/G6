const G6 = require('../../src/index');
const expect = require('chai').expect;

describe('issue-297-spec', () => {
  const div = G6.Util.createDOM('<div id="mountNode"></div>');
  document.body.appendChild(div);
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200,
      label: '节点1',
      parent: 'group1'
    }, {
      id: 'node2',
      x: 300,
      y: 200,
      label: '节点2',
      parent: 'group1'
    }, {
      id: 'node3',
      x: 100,
      y: 300,
      label: '节点3',
      parent: 'group2'
    }, {
      id: 'node4',
      x: 300,
      y: 300,
      label: '节点4',
      parent: 'group2'
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    },
    {
      id: 'g2g',
      target: 'group1',
      source: 'group2'
    }],
    groups: [{
      id: 'group1',
      label: '展开群组'
    }, {
      id: 'group2',
      label: '折叠群组',
      collapsed: true
    }]
  };
  const graph = new G6.Graph({
    container: 'mountNode',
    fitView: 'cc',
    height: window.innerHeight
  });
  graph.read(data);

  it('test group link group default edge', () => {
    expect(graph.find('g2g').getKeyShape().attr('path')).eql([
      [ 'M', 172.09395973154363, 239 ],
      [ 'L', 176.22818791946312, 231 ]
    ]);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
