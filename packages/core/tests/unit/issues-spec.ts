import Graph from './implement-graph';
import { Arrow } from '../../src';

const div = document.createElement('div');
div.id = 'issues-shape';
document.body.appendChild(div);

const nodes = [
  {
    id: 'node1',
    x: 100,
    y: 150,
  },
  {
    id: 'node2',
    x: 200,
    y: 150,
  },
];
const edges = [
  {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    style: {
      startArrow: {
        path: Arrow.circle(5, 0),
        fill: '#0f0',
        d: 0,
      },
      endArrow: {
        path: Arrow.circle(5, 0),
        fill: '#f00',
        d: 0,
      },
    },
  },
];
const data = {
  edges: edges,
  nodes: nodes,
};
describe('issues', () => {
  it('update arrow', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      groupByTypes: false,
    });
    graph.data(data);
    graph.render();

    graph.updateItem('edge1', {
      style: {
        endArrow: false,
        startArrow: false,
      },
    });

    graph.setItemState('edge1', 'selected', true);
    graph.setItemState('edge1', 'selected', false);
  });

  it('create combo with node', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      groupByTypes: false,
    });
    graph.data(data);
    graph.render();

    graph.createCombo('combo1', ['node1', 'node2']);
    const combo = graph.getCombos();
    expect(combo.length).toBe(1);
    const comboIds = graph.getNodes().map(node => node.getModel().comboId);
    expect(comboIds).toEqual(['combo1', 'combo1']);
  });

  it('create combo with node and combo', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      groupByTypes: false,
    });
    const combos = [
      {
        id: 'combo',
      },
    ];
    const data = {
      nodes,
      edges,
      combos,
    };
    graph.data(data);
    graph.render();

    graph.createCombo('combo1', ['node1', 'node2', 'combo']);
    const comboIds = graph.getNodes().map(node => node.getModel().comboId);
    // combo1中包含两个节点
    expect(comboIds).toEqual(['combo1', 'combo1']);

    // id 为 combo 的 combo 中应该添加一个 parentId，值为 combo1
    const comboItems = graph.getCombos();
    expect(comboItems.length).toBe(2);
    const current = comboItems.filter(combo => combo.getModel().parentId);
    expect(current.length).toBe(1);
    expect(current[0].getModel().parentId).toEqual('combo1');
  });
});
