/*
 * @Author: moyee
 * @Date: 2019-07-31 11:54:41
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 14:16:27
 * @Description: Group单测文件
 */
import G6 from '../../../../src';
import groupBy from '@antv/util/lib/group-by';
import { getAllNodeInGroups } from '../../../../src/util/group';

const div = document.createElement('div');
div.id = 'graph-group-spec';
document.body.appendChild(div);

G6.registerNode(
  'circleNode',
  {
    drawShape(cfg, group) {
      const keyShape = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 30,
          fill: '#87e8de',
        },
      });

      return keyShape;
    },
  },
  'circle',
);

describe('single layer group', () => {
  it('render single group test', () => {
    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    const nodes = [
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
        x: 150,
        y: 100,
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2',
        x: 300,
        y: 100,
      },
      {
        id: 'node7',
        groupId: 'p1',
        x: 200,
        y: 200,
      },
      {
        id: 'node6',
        groupId: 'bym',
        label: 'rect',
        x: 100,
        y: 300,
        type: 'rect',
      },
      {
        id: 'node9',
        label: 'noGroup',
        x: 300,
        y: 210,
      },
    ];
    const data = {
      nodes,
    };

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');

    const group = graph.get('customGroup');
    const children = group.get('children');
    // group的数量
    expect(children.length).toBe(4);

    // 每个group的圆心坐标
    const nodesInGroup = groupBy(data.nodes, 'groupId');
    for (const node in nodesInGroup) {
      if (node === 'undefined') {
        continue;
      }
      const currentNodes = nodesInGroup[node];
      const nodeIds = currentNodes.map((nodeId) => nodeId.id);
      const { x, y, width, height } = groupControll.calculationGroupPosition(nodeIds);
      const r = width > height ? width / 2 : height / 2;
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;

      const groupShape = groupControll.getDeletageGroupById(node);
      const paddingValue = groupControll.getGroupPadding(node);
      const { groupStyle } = groupShape;
      expect(groupStyle.x).toEqual(cx);
      expect(groupStyle.y).toEqual(cy);
      expect(groupStyle.r).toEqual(r + paddingValue);
    }

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('setGroupStyle', () => {
    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          groupId: 'group1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1',
          x: 150,
          y: 100,
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2',
          x: 300,
          y: 100,
        },
        {
          id: 'node7',
          groupId: 'p1',
          x: 200,
          y: 200,
        },
        {
          id: 'node6',
          groupId: 'bym',
          label: 'rect',
          x: 100,
          y: 300,
          type: 'rect',
        },
        {
          id: 'node9',
          label: 'noGroup',
          x: 300,
          y: 210,
        },
      ],
    };

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');

    const { nodeGroup } = groupControll.getDeletageGroupById('group2');
    const keyShape = nodeGroup.get('keyShape');
    groupControll.setGroupStyle(keyShape, 'hover');

    // 这里的hover样式和定义custom group时指定的一样
    const hover = {
      stroke: '#faad14',
      fill: '#ffe58f',
      fillOpacity: 0.3,
      opacity: 0.3,
      lineWidth: 3,
    };

    expect(keyShape.attr('stroke')).toEqual(hover.stroke);
    expect(keyShape.attr('fill')).toEqual(hover.fill);
    expect(keyShape.attr('fillOpacity')).toEqual(hover.fillOpacity);
    expect(keyShape.attr('opacity')).toEqual(hover.opacity);
    expect(keyShape.attr('lineWidth')).toEqual(hover.lineWidth);
    expect(keyShape.attr('customStyle')).toEqual(undefined);

    // 设置自定义样式属性customStyle
    groupControll.setGroupStyle(keyShape, { customStyle: true });
    expect(keyShape.attr('customStyle')).toEqual(true);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('setDeletageGroupByStyle / getDeletageGroupById', () => {
    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    const nodes = [
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
        x: 150,
        y: 100,
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2',
        x: 300,
        y: 100,
      },
      {
        id: 'node7',
        groupId: 'p1',
        x: 200,
        y: 200,
      },
      {
        id: 'node6',
        groupId: 'bym',
        label: 'rect',
        x: 100,
        y: 300,
        type: 'rect',
      },
      {
        id: 'node9',
        label: 'noGroup',
        x: 300,
        y: 210,
      },
    ];
    const data = {
      nodes,
    };

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');

    // setDeletageGroupByStyle方法是在创建的时候就调用的，这里测试创建时候存进去的值通过getDeletageGroupById取出来后是否相同
    const group2 = groupControll.getDeletageGroupById('group2');
    const { groupStyle, nodeGroup } = group2;

    expect(nodeGroup).not.toBe(null);
    expect(nodeGroup.get('id')).toEqual('group2');
    expect(nodeGroup.get('destroyed')).toBe(undefined);

    const nodeInGroup2 = data.nodes
      .filter((node) => node.groupId === 'group2')
      .map((node) => node.id);
    const { width, height, x, y } = groupControll.calculationGroupPosition(nodeInGroup2);

    const r = width > height ? width / 2 : height / 2;
    const cx = (width + 2 * x) / 2;
    const cy = (height + 2 * y) / 2;

    const paddingValue = groupControll.getGroupPadding('group2');
    expect(groupStyle.x).toEqual(cx);
    expect(groupStyle.y).toEqual(cy);
    expect(groupStyle.r).toEqual(r + paddingValue);
    expect(groupStyle.width).toEqual(width);
    expect(groupStyle.height).toEqual(height);

    // 通过不存在的groupId查询
    const notGroup = groupControll.getDeletageGroupById('group5');
    expect(notGroup).toBe(undefined);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('collapseExpandGroup', () => {
    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          groupId: 'group1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1',
          x: 150,
          y: 100,
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2',
          x: 300,
          y: 100,
        },
        {
          id: 'node7',
          groupId: 'p1',
          x: 200,
          y: 200,
        },
        {
          id: 'node6',
          groupId: 'bym',
          label: 'rect',
          x: 100,
          y: 300,
          type: 'rect',
        },
        {
          id: 'node9',
          label: 'noGroup',
          x: 300,
          y: 210,
        },
      ],
    };

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    expect(nodeGroup.get('hasHidden')).toBe(undefined);

    groupControll.collapseExpandGroup('group1');
    expect(nodeGroup.get('hasHidden')).toBe(true);

    groupControll.collapseExpandGroup('group1');
    expect(nodeGroup.get('hasHidden')).toBe(false);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('collapseGroup / expandGroup', () => {
    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          groupId: 'group1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1',
          x: 150,
          y: 100,
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2',
          x: 300,
          y: 100,
        },
        {
          id: 'node7',
          groupId: 'p1',
          x: 200,
          y: 200,
        },
        {
          id: 'node6',
          groupId: 'bym',
          label: 'rect',
          x: 100,
          y: 300,
          type: 'rect',
        },
        {
          id: 'node9',
          label: 'noGroup',
          x: 300,
          y: 210,
        },
      ],
    };

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');

    const nodes = graph.getNodes();
    const groupNodes = nodes.filter((node) => {
      const model = node.getModel();
      return model.groupId === 'group1';
    });

    // 没有收起群组之前，所有节点都应该是显示状态
    for (const node of groupNodes) {
      const isVisible = node.isVisible();
      expect(isVisible).toBe(true);
    }

    groupControll.collapseGroup('group1');

    // group收起后，隐藏所有节点
    for (const node of groupNodes) {
      const isVisible = node.isVisible();
      expect(isVisible).toBe(false);
    }

    // 同时检测之前的group是否正确
    const { nodeGroup, groupStyle } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');
    // 延迟下判断，因为收起会有一个动画效果
    setTimeout(() => {
      expect(keyShape.attr('r')).toBe(30);
      expect(keyShape.attr('x')).toBe(groupStyle.x);
      expect(keyShape.attr('y')).toBe(groupStyle.y);
    }, 2000);

    // group 展开
    groupControll.expandGroup('group1');

    setTimeout(() => {
      // 展开后，所有node都是显示状态
      for (const node of groupNodes) {
        const isVisible = node.isVisible();
        expect(isVisible).toBe(true);
      }

      expect(keyShape.attr('r')).toBe(30);
      expect(keyShape.attr('x')).toBe(groupStyle.x);
      expect(keyShape.attr('y')).toBe(groupStyle.y);

      const nodeIds = groupNodes.map((node) => {
        const model = node.getModel();
        return model.id;
      });

      const { width, height } = groupControll.calculationGroupPosition(nodeIds);
      expect(width).toBe(groupStyle.width);
      expect(height).toBe(groupStyle.height);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    }, 5500);
  });

  it('remove group', () => {
    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    const nodes = [
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
        x: 150,
        y: 100,
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2',
        x: 300,
        y: 100,
      },
      {
        id: 'node7',
        groupId: 'p1',
        x: 200,
        y: 200,
      },
      {
        id: 'node6',
        groupId: 'bym',
        label: 'rect',
        x: 100,
        y: 300,
        type: 'rect',
      },
      {
        id: 'node9',
        label: 'noGroup',
        x: 300,
        y: 210,
      },
    ];
    const data = {
      nodes,
    };

    graph.data(data);
    graph.render();

    const groupNodes = graph.get('groupNodes');
    const keys = Object.keys(groupNodes);
    expect(keys.length).toBe(4);
    expect(keys.includes('group1')).toBe(true);
    expect(groupNodes.group1.length).toBe(2);
    expect(groupNodes.group2.length).toBe(1);
    expect(groupNodes.bym.length).toBe(1);
    expect(groupNodes.p1.length).toBe(1);

    const groups = graph.get('groups');
    expect(groups.length).toBe(4);

    // 删除group1
    // const customGroup = graph.get('customGroupControll');
    graph.remove('group1');

    const groupNodes1 = graph.get('groupNodes');
    const keys1 = Object.keys(groupNodes1);
    expect(keys1.length).toBe(3);
    expect(keys1.includes('group1')).toBe(false);
    expect(groupNodes.group2.length).toBe(1);
    expect(groupNodes.bym.length).toBe(1);
    expect(groupNodes.p1.length).toBe(1);

    const filterNodes = graph.save().nodes.filter((node) => node.groupId);
    filterNodes.forEach((node) => {
      expect(node.id).not.toEqual('node1');
      expect(node.id).not.toEqual('node2');
    });
  });
});

describe('nesting layer group', () => {
  it('render nesting layer group', () => {
    const data = {
      nodes: [
        {
          id: 'node6',
          groupId: 'group3',
          label: 'rect',
          x: 100,
          y: 300,
        },
        {
          id: 'node1',
          label: 'fck',
          groupId: 'group1',
          x: 100,
          y: 100,
        },
        {
          id: 'node9',
          label: 'noGroup1',
          groupId: 'p1',
          x: 300,
          y: 210,
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1',
          x: 150,
          y: 200,
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2',
          x: 300,
          y: 100,
        },
        {
          id: 'node7',
          groupId: 'p1',
          label: 'node7-p1',
          x: 200,
          y: 200,
        },
        {
          id: 'node10',
          label: 'noGroup',
          groupId: 'p2',
          x: 300,
          y: 210,
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
      ],
      groups: [
        {
          id: 'group1',
          title: '1',
          parentId: 'p1',
        },
        {
          id: 'group2',
          title: '2',
          parentId: 'p1',
        },
        {
          id: 'group3',
          title: '2',
          parentId: 'p2',
        },
        {
          id: 'p1',
          title: '3',
        },
        {
          id: 'p2',
          title: '3',
        },
      ],
    };

    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');

    graph.data(data);
    graph.render();

    const { groups } = graph.save();
    expect(groups.length).toBe(5);

    // 渲染的每个group的位置和坐标是否和计算的一致
    const groupNodes = getAllNodeInGroups(data);
    // tslint:disable-next-line:forin
    for (const groupId in groupNodes) {
      const nodeIds = groupNodes[groupId];
      const { x, y, width, height } = groupControll.calculationGroupPosition(nodeIds);
      const r = width > height ? width / 2 : height / 2;
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;

      const groupShape = groupControll.getDeletageGroupById(groupId);
      const paddingValue1 = groupControll.getGroupPadding(groupId);
      const { groupStyle } = groupShape;
      expect(groupStyle.x).toBe(cx);
      expect(groupStyle.y).toBe(cy);
      expect(groupStyle.r).toBe(r + paddingValue1);
    }

    // 指定groupId，验证渲染后的位置是否正确
    const shape = groupControll.getDeletageGroupById('group2');
    const paddingValue = groupControll.getGroupPadding('group2');
    const shapeStyle = shape.groupStyle;
    expect(shapeStyle.r).toBe(30 + paddingValue);
    expect(shapeStyle.x).toBe(300);
    expect(shapeStyle.y).toBe(100);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('remove nesting group', () => {
    const data = {
      nodes: [
        {
          id: 'node6',
          groupId: 'group3',
          label: 'rect',
          x: 100,
          y: 300,
        },
        {
          id: 'node1',
          label: 'fck',
          groupId: 'group1',
          x: 100,
          y: 100,
        },
        {
          id: 'node9',
          label: 'noGroup1',
          groupId: 'p1',
          x: 300,
          y: 210,
        },
        {
          id: 'node2',
          label: 'node2',
          groupId: 'group1',
          x: 150,
          y: 200,
        },
        {
          id: 'node3',
          label: 'node3',
          groupId: 'group2',
          x: 300,
          y: 100,
        },
        {
          id: 'node7',
          groupId: 'p1',
          label: 'node7-p1',
          x: 200,
          y: 200,
        },
        {
          id: 'node10',
          label: 'noGroup',
          groupId: 'p2',
          x: 300,
          y: 210,
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
      ],
      groups: [
        {
          id: 'group1',
          title: '1',
          parentId: 'p1',
        },
        {
          id: 'group2',
          title: '2',
          parentId: 'p1',
        },
        {
          id: 'group3',
          title: '2',
          parentId: 'p2',
        },
        {
          id: 'p1',
          title: '3',
        },
        {
          id: 'p2',
          title: '3',
        },
      ],
    };

    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    graph.data(data);
    graph.render();

    let { groups } = graph.save();
    expect(groups.length).toBe(5);

    let groupNodes = graph.get('groupNodes');
    let keys = Object.keys(groupNodes);
    expect(keys.length).toBe(5);
    expect(keys.includes('group1')).toBe(true);
    expect(groupNodes.group1.length).toBe(2);
    expect(groupNodes.group2.length).toBe(1);
    expect(groupNodes.p1.length).toBe(5);

    const testGroupId = 'p1';
    let parentGroupId = null;
    for (const group of groups) {
      if (testGroupId !== group.id) {
        continue;
      }
      parentGroupId = group.parentId;
      break;
    }

    const groupControll = graph.get('customGroupControll');
    // 删除group1
    groupControll.remove(testGroupId);

    groupNodes = graph.get('groupNodes');
    keys = Object.keys(groupNodes);
    expect(keys.length).toBe(4);
    expect(keys.includes(testGroupId)).toBe(false);
    expect(groupNodes.group2.length).toBe(1);
    expect(groupNodes.group1.length).toBe(2);

    groups = graph.save().groups;
    expect(groups.length).toBe(4);

    expect(parentGroupId).toBe(undefined);
    expect(groupNodes[testGroupId]).toBe(undefined);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });
});

// 手动创建分子
describe('create node group', () => {
  it('use addItem create group', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'fck',
          groupId: 'group1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          label: 'node2',
          x: 150,
          y: 200,
        },
        {
          id: 'node3',
          label: 'node3',
          x: 300,
          y: 100,
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
      ],
      groups: [
        {
          id: 'group1',
          title: '1',
        },
      ],
    };

    const graph = new G6.Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    graph.data(data);
    graph.render();

    graph.data(data);
    graph.render();

    let { groups } = graph.save();
    expect(groups.length).toBe(1);

    graph.addItem('group', {
      groupId: 'xxx',
      nodes: ['node2', 'node3'],
      type: 'rect',
      title: '自定义',
    });

    groups = graph.save().groups;
    expect(groups.length).toBe(2);

    const customGroup = graph.get('customGroup');
    const children = customGroup.get('children');
    expect(children.length).toBe(2);

    const { nodes } = graph.save();
    const groupNodes = nodes.filter((node) => node.groupId === 'xxx');
    expect(groupNodes.length).toBe(2);
  });
});
