/*
 * @Author: moyee
 * @Date: 2019-07-31 11:54:41
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-20 17:17:52
 * @Description: file content
 */
const expect = require('chai').expect;
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'graph-group-spec';
document.body.appendChild(div);

describe('graph group', () => {
  const graph = new G6.Graph({
    container: div,
    width: 1500,
    height: 1000,
    pixelRatio: 2,
    modes: {
      default: [ 'drag-group', 'drag-node' ]
    }
  });

  it('render signle group test', () => {
    const nodes = [
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1',
        x: 100,
        y: 100
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
        x: 150,
        y: 100
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2',
        x: 300,
        y: 100
      },
      {
        id: 'node7',
        groupId: 'p1',
        x: 200,
        y: 200
      },
      {
        id: 'node6',
        groupId: 'bym',
        label: 'rect',
        x: 100,
        y: 300,
        shape: 'rect'
      },
      {
        id: 'node9',
        label: 'noGroup',
        x: 300,
        y: 210
      }
    ];
    const data = {
      nodes
    };

    graph.data(data);
    graph.render();

    const group = graph.get('customGroup');
    const children = group.get('children');
    expect(children.length).equal(4);
  });

  it.only('nesting group test', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'fck',
          groupId: 'group1',
          x: 100,
          y: 100
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1',
          x: 150,
          y: 200
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2',
          x: 300,
          y: 100
        },
        {
          id: 'node7',
          groupId: 'p1',
          x: 200,
          y: 200
        },
        {
          id: 'node6',
          groupId: 'group3',
          label: 'rect',
          x: 100,
          y: 300,
          shape: 'rect'
        },
        {
          id: 'node9',
          label: 'noGroup1',
          groupId: 'p1',
          x: 300,
          y: 210
        },
        {
          id: 'node10',
          label: 'noGroup',
          groupId: 'p2',
          x: 300,
          y: 210
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2'
        },
        {
          source: 'node2',
          target: 'node3'
        }
      ],
      groups: [
        {
          id: 'group1',
          title: '1',
          parentId: 'p1'
        },
        {
          id: 'group2',
          title: '2',
          parentId: 'p1'
        },
        {
          id: 'group3',
          title: '2',
          parentId: 'p2'
        },
        {
          id: 'p1',
          title: '3'
        },
        {
          id: 'p2',
          title: '3'
        }
      ]
    };

    graph.data(data);
    graph.render();

    const { groups } = graph.save();
    expect(groups.length).equal(5);
  });
});
