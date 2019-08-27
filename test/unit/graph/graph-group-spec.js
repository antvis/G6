/*
 * @Author: moyee
 * @Date: 2019-07-31 11:54:41
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 14:16:27
 * @Description: file content
 */
const expect = require('chai').expect;
const G6 = require('../../../src');
const { groupBy } = require('lodash');

const div = document.createElement('div');
div.id = 'graph-group-spec';
document.body.appendChild(div);

G6.registerNode('circleNode', {
  drawShape(cfg, group) {
    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 30,
        fill: '#87e8de'
      }
    });

    return keyShape;
  }
}, 'circle');

describe.only('create graph group', () => {
  const graph = new G6.Graph({
    container: div,
    width: 1500,
    height: 1000,
    pixelRatio: 2,
    modes: {
      default: [ 'drag-group' ]
    },
    defaultNode: {
      shape: 'circleNode'
    },
    defaultEdge: {
      color: '#bae7ff'
    }
  });

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

  const groupControll = graph.get('customGroupControll');

  it('render signle group test', () => {
    const group = graph.get('customGroup');
    const children = group.get('children');
    // group的数量
    expect(children.length).equal(4);

    // 每个group的圆心坐标
    const nodesInGroup = groupBy(data.nodes, 'groupId');
    for (const node in nodesInGroup) {
      if (node === 'undefined') {
        continue;
      }
      const currentNodes = nodesInGroup[node];
      const nodeIds = currentNodes.map(nodeId => nodeId.id);
      const { x, y, width, height } = groupControll.calculationGroupPosition(nodeIds);
      const r = width > height ? width / 2 : height / 2;
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;

      const groupShape = groupControll.getDeletageGroupById(node);

      const { groupStyle } = groupShape;
      expect(groupStyle.x).eql(cx);
      expect(groupStyle.y).eql(cy);
      expect(groupStyle.r).eql(r);
    }
  });

  it.only('drag signle group', () => {

    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');

    const { width, height } = keyShape.getBBox();

    // 触发mousedown事件
    graph.emit('dragstart', {
      canvasX: 0,
      canvasY: 0,
      target: keyShape
    });

    graph.emit('drag', {
      canvasX: 200,
      canvasY: 250,
      target: keyShape
    });

    setTimeout(() => {
    }, 1000);
    graph.emit('dragend', {
      target: keyShape
    });

    const nodeIds = data.nodes.filter(node => node.groupId === 'group1').map(node => node.id);
    const { x, y, width: w, height: h } = groupControll.calculationGroupPosition(nodeIds);
    const r = w > h ? w / 2 : h / 2;
    const cx = (w + 2 * x) / 2;
    const cy = (h + 2 * y) / 2;
    expect(keyShape.attr('r')).eql(r + nodeIds.length * 10);
    expect(keyShape.attr('x')).eql(cx);
    expect(keyShape.attr('y')).eql(cy);

    const bbox = keyShape.getBBox();

    // 拖动完成以后group宽高不变
    expect(bbox.width).eql(width);
    expect(bbox.height).eql(height);

  });

  it('nesting group test', () => {
    const data = {
      nodes: [
        {
          id: 'node6',
          groupId: 'group3',
          label: 'rect',
          x: 100,
          y: 300
        },
        {
          id: 'node1',
          label: 'fck',
          groupId: 'group1',
          x: 100,
          y: 100
        },
        {
          id: 'node9',
          label: 'noGroup1',
          groupId: 'p1',
          x: 300,
          y: 210
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
          label: 'node7-p1',
          x: 200,
          y: 200
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
