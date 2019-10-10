/*
 * @Author: moyee
 * @Date: 2019-07-30 10:57:38
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-20 17:03:00
 * @Description: file content
 */
const expect = require('chai').expect;
const groupDataUtil = require('../../../src/util');

describe.only('group data transform util test', () => {
  it('flat transform to tree', () => {
    const flatData = [
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
        id: 'p1',
        title: '3',
        parentId: 'p0'
      },
      {
        id: 'p0',
        parentId: 'p'
      },
      {
        id: 'p'
      },
      {
        id: 'bzn',
        title: 'bzn'
      },
      {
        id: 'bym',
        title: 'bym',
        parentId: 'bzn'
      },
      {
        id: 'yxl',
        title: 'yxl'
      }
    ];

    const originData = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          groupId: 'group1'
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1'
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2'
        },
        {
          id: 'node6',
          groupId: 'p1'
        },
        {
          id: 'node6',
          groupId: 'bym'
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2'
        }
      ],
      groups: flatData
    };

    const data = [
      {
        id: 'p',
        children: [
          {
            id: 'p0',
            parentId: 'p',
            children: [
              {
                id: 'p1',
                parentId: 'p0',
                title: '3',
                nodes: [ 'node6' ],
                children: [
                  {
                    id: 'group1',
                    title: '1',
                    parentId: 'p1',
                    nodes: [ 'node1', 'node2' ]
                  },
                  {
                    id: 'group2',
                    title: '2',
                    parentId: 'p1',
                    nodes: [ 'node3' ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'bzn',
        title: 'bzn',
        children: [
          {
            id: 'bym',
            title: 'bym',
            parentId: 'bzn'
          }
        ]
      },
      {
        id: 'yxl',
        title: 'yxl'
      }
    ];

    const treeData = groupDataUtil.flatToTree(originData);
    expect(treeData.length).equal(3);

    const tree1 = treeData.filter(td => td.id === data[0].id);
    const tree2 = treeData.filter(td => td.id === data[1].id);
    const tree3 = treeData.filter(td => td.id === data[2].id);

    expect(tree1.length).equal(1);
    expect(tree1[0].id).equal(data[0].id);
    expect(tree1[0].children.length).equal(1);

    expect(tree2[0].id).equal(data[1].id);
    expect(tree2[0].children.length).equal(1);
    expect(tree2[0].children[0].parentId).equal(data[1].id);

    expect(tree3.children).equal(undefined);

    const groupByIdData = groupDataUtil.addNodesToParentNode(treeData, originData.nodes);
    expect(groupByIdData.p.length).equal(4);
    expect(groupByIdData.group2.length).equal(0);
    expect(groupByIdData.p1.length).equal(2);
    expect(groupByIdData.p1[0].id).equal('group1');
    expect(groupByIdData.p1[0].parentId).equal('p1');
  });

  it('groupBy groupId test', () => {
    const nodes = [
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1'
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1'
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2'
      },
      {
        id: 'node6',
        groupId: 'p1'
      },
      {
        id: 'node6',
        groupId: 'bym'
      }
    ];

    const nodesNoGroup = [
      {
        id: 'node1',
        label: 'node1'
      },
      {
        id: 'node2',
        label: 'node2'
      },
      {
        id: 'node3',
        label: 'node3'
      },
      {
        id: 'node6'
      }
    ];

    const nodeHasGroupId = nodes.filter(node => node.groupId);
    expect(nodeHasGroupId.length).equal(5);

    const nodeNoGroupId = nodesNoGroup.filter(node => node.groupId);
    expect(nodeNoGroupId.length).equal(0);
  });
});
