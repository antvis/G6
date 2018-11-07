const Graph = require('../../../src/graph');
const expect = require('chai').expect;
const div = document.createElement('div');
document.body.appendChild(div);
describe('group user case', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500
  });
  graph.read({
    nodes: [
      { id: 'node0', label: 'node0', x: 100, y: 100, parent: 'group0' },
      { id: 'node1', label: 'node1', x: 50, y: 100, parent: 'group1' },
      { id: 'node2', label: 'node2', x: 150, y: 190, parent: 'group1' },
      { id: 'node3', label: 'node3', x: 250, y: 100, parent: 'group2' },
      { id: 'node4', label: 'node4', x: 350, y: 190, parent: 'group2' }
    ],
    edges: [
      {
        id: 'node1->node2',
        source: 'node1',
        target: 'node2'
      },
      {
        id: 'node1->node3',
        source: 'node1',
        target: 'node3'
      }
    ],
    groups: [
      { id: 'group0', label: '群组 0', parent: 'group1' },
      { id: 'group1', label: '群组 1' },
      { id: 'group2', label: '群组 2', collapsed: true }
    ]
  });
  it('graph group collapsed true', () => {
    expect(graph.find('node3').isVisible()).equal(false);
    expect(graph.find('node4').isVisible()).equal(false);
  });
  it('graph group remove', () => {
    graph.remove('group0');
    const box = graph.find('group1').getBBox();
    expect(box.width).equal(162);
    expect(box.height).equal(182);
  });
  it('graph group add', () => {
    graph.add('node', {
      parent: 'group1',
      id: 'node0',
      x: 100,
      y: 50
    });
    const box = graph.find('group1').getBBox();
    expect(box.width).equal(162);
    expect(box.height).equal(232);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
