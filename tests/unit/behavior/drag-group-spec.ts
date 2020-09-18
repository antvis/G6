/*
 * @Author: moyee
 * @Date: 2019-07-31 11:54:41
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 14:16:27
 * @Description: Group Behavior单测文件
 */

import '../../../src/behavior';
import '../../../src/shape';
import Graph from '../../../src/graph/graph';
import G6 from '../../../src';
import { getAllNodeInGroups } from '../../../src/util/group';

const div = document.createElement('div');
div.id = 'drag-group-spec';
document.body.appendChild(div);

// TODO: wait for group
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
        draggable: true,
      });

      return keyShape;
    },
  },
  'circle',
);

describe('drag single layer group', () => {
  it('drag single layer group', () => {
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
    const graph = new Graph({
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

    const { nodeGroup } = groupControll.getDeletageGroupById('group1');

    const nodes = data.nodes.filter((node) => node.groupId === 'group1');

    expect(nodes.length).toEqual(2);

    const node1 = nodes[0];
    const node2 = nodes[1];
    expect(node1.x).toEqual(100);
    expect(node1.y).toEqual(100);
    expect(node2.x).toEqual(150);
    expect(node2.y).toEqual(100);

    const keyShape = nodeGroup.get('keyShape');

    const { width, height } = keyShape.getBBox();

    // 触发mousedown事件
    graph.emit('dragstart', {
      x: 0,
      y: 0,
      target: keyShape,
    });
    graph.emit('drag', {
      x: 0,
      y: 0,
      target: keyShape,
    });

    graph.emit('drag', {
      x: 150,
      y: 150,
      target: keyShape,
    });

    graph.emit('dragend', {
      target: keyShape,
    });

    const nodeIds = data.nodes.filter((node) => node.groupId === 'group1').map((node) => node.id);
    const { x, y, width: w, height: h } = groupControll.calculationGroupPosition(nodeIds);
    // const r = w > h ? w / 2 : h / 2;
    const cx = (w + 2 * x) / 2;
    const cy = (h + 2 * y) / 2;
    expect(keyShape.attr('r')).toEqual(85);
    expect(keyShape.attr('x')).toEqual(cx);
    expect(keyShape.attr('y')).toEqual(cy);

    const bbox = keyShape.getBBox();

    // 拖动完成以后group宽高不变
    expect(bbox.width).toEqual(width);
    expect(bbox.height).toEqual(height);

    // 拖拽完以后，group移动到了(100, 100)位置，group中的节点也移动了相应的距离
    expect(node1.x).toEqual(249.5);
    expect(node1.y).toEqual(249.5);
    expect(node2.x).toEqual(299.5);
    expect(node2.y).toEqual(249.5);

    // 拖动以后，节点group的matrix值
    const node = graph.findById(node1.id);
    const matrix = node.get('group').getMatrix();
    expect(matrix[6]).toEqual(249.5);
    expect(matrix[7]).toEqual(249.5);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('rect group', () => {
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
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: [
          {
            type: 'drag-group',
          },
        ],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
      groupType: 'rect',
    });

    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');

    const { nodeGroup } = groupControll.getDeletageGroupById('group2');

    const nodes = data.nodes.filter((node) => node.groupId === 'group2');

    expect(nodes.length).toEqual(1);

    const node3 = nodes[0];
    expect(node3.x).toEqual(300);
    expect(node3.y).toEqual(100);

    const keyShape = nodeGroup.get('keyShape');

    const { width, height } = keyShape.getBBox();

    // 触发mousedown事件
    graph.emit('dragstart', {
      x: 0,
      y: 0,
      target: keyShape,
    });
    graph.emit('drag', {
      x: 0,
      y: 0,
      target: keyShape,
    });

    graph.emit('drag', {
      x: 150,
      y: 150,
      target: keyShape,
    });

    graph.emit('dragend', {
      target: keyShape,
    });

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('not dragging a group', () => {
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
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: [
          {
            type: 'drag-group',
          },
        ],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
      groupType: 'rect',
    });

    graph.data(data);
    graph.render();

    const node = graph.getNodes()[0];

    // 触发mousedown事件
    graph.emit('dragstart', {
      x: 0,
      y: 0,
      target: node,
    });
    graph.emit('drag', {
      x: 0,
      y: 0,
      target: node,
    });

    graph.emit('drag', {
      x: 150,
      y: 150,
      target: node,
    });

    graph.emit('dragend', {
      target: node,
    });

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });
});

describe('nesting layer group', () => {
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
  it('render nesting layer group', () => {
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group', 'drag-node-with-group'],
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

    expect(graph.destroyed).toBe(false);

    const groupControll = graph.get('customGroupControll');

    graph.data(data);
    graph.render();

    const { groups } = graph.save();
    expect(groups.length).toEqual(5);

    // 渲染的每个group的位置和坐标是否和计算的一致
    const groupNodes = getAllNodeInGroups(data);
    for (const groupId in groupNodes) {
      const nodeIds = groupNodes[groupId];
      const { x, y, width, height } = groupControll.calculationGroupPosition(nodeIds);
      const r = width > height ? width / 2 : height / 2;
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;

      const groupShape = groupControll.getDeletageGroupById(groupId);

      const { groupStyle } = groupShape;
      expect(groupStyle.x).toEqual(cx);
      expect(groupStyle.y).toEqual(cy);
      // expect(groupStyle.r === r + 40 || groupStyle.r === r + 100).toEqual(true); // r + padding
    }

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('drag group out from group', () => {
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-group', 'drag-node-with-group'],
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

    // 等所有群组都渲染完以后再去做单测
    setTimeout(() => {
      const groupControll = graph.get('customGroupControll');
      const { nodeGroup } = groupControll.getDeletageGroupById('group1');

      const groupNodes = graph.get('groupNodes');
      const p1Nodes = groupNodes.p1;
      const group1Nodes = groupNodes.group1;
      expect(p1Nodes.length).toEqual(5);
      expect(p1Nodes.indexOf('node1') > -1).toBe(true);
      expect(p1Nodes.indexOf('nop1') > -1).toBe(false);
      expect(group1Nodes.length).toEqual(2);

      const keyShape = nodeGroup.get('keyShape');

      graph.emit('dragstart', {
        target: keyShape,
        x: 0,
        y: 0,
      });

      graph.emit('drag', {
        target: keyShape,
        x: 500,
        y: 200,
      });

      // 还没有拖出群组，group p1中还包括group1
      expect(p1Nodes.length).toEqual(5);
      expect(p1Nodes.indexOf('node2') > -1).toBe(true);
      graph.emit('dragend', {
        target: keyShape,
        x: 500,
        y: 200,
      });

      const currentP1Nodes = groupNodes.p1;
      // 拖出群组，group p1中不包括group1
      expect(currentP1Nodes.length).toEqual(5);
      expect(currentP1Nodes.indexOf('node1') > -1).toBe(true);
      expect(currentP1Nodes.indexOf('node2') > -1).toBe(true);
      expect(group1Nodes.length).toEqual(2);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    }, 1000);
  });

  it('collapse the group', () => {
    // done
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['collapse-expand-group'],
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
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');

    // collapse
    graph.emit('dblclick', {
      target: keyShape,
    });
    // setTimeout(() => {
    //   expect((keyShape.attr('r'))).toEqual(30);
    //   done();
    // }, 800);

    // expand
    graph.emit('dblclick', {
      target: keyShape,
    });
    expect(keyShape.attr('r')).toEqual(110);
  });

  it('collapse the group with invalid trigger', () => {
    // done
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: [
          {
            type: 'collapse-expand-group',
            trigger: 'invalidTrigger',
          },
        ],
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
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');

    // collapse
    graph.emit('dblclick', {
      target: keyShape,
    });
    // setTimeout(() => {
    //   expect((keyShape.attr('r'))).toEqual(30);
    //   done();
    // }, 800);

    // expand
    graph.emit('dblclick', {
      target: keyShape,
    });
    expect(keyShape.attr('r')).toEqual(110);
  });

  it('not click on a group', () => {
    // done
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: [
          {
            type: 'collapse-expand-group',
          },
        ],
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

    const node = graph.getNodes()[0];

    // collapse on a node, does not take effect
    graph.emit('dblclick', {
      target: node,
    });
  });
});

describe('drag node with group', () => {
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
  it('drag node to out from nesting group', () => {
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-node-with-group', 'drag-group'],
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

    const nodes = data.nodes.filter((node) => node.groupId === 'group1');

    expect(nodes.length).toEqual(2);

    const node = graph.findById('node1');

    const matrixBefore = node.get('group').getMatrix();
    expect(matrixBefore[6]).toEqual(100);
    expect(matrixBefore[7]).toEqual(100);

    const groupControll = graph.get('customGroupControll');
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const groupNodes = graph.get('groupNodes');

    // TODO: wrong when drag a node out of nested groups
    setTimeout(() => {
      graph.emit('node:dragstart', {
        target: node,
        item: node,
        x: 0,
        y: 0,
      });

      graph.emit('dragover', {
        target: nodeGroup,
      });

      graph.emit('node:drag', {
        target: node,
        item: node,
        x: 250,
        y: 250,
      });

      // 拖动过程中，group中还会保留原来的node
      expect(nodes.length).toEqual(2);
      const matrix = node.get('group').getMatrix();

      expect(matrix[6]).toEqual(100);
      expect(matrix[7]).toEqual(100);

      const p1Nodes = groupNodes.p1;
      const g1Nodes = groupNodes.group1;
      expect(p1Nodes.indexOf('node1') > -1).toBe(true);
      expect(g1Nodes.indexOf('node1') > -1).toBe(true);

      graph.emit('node:dragend', {
        item: node,
        target: node,
        x: 500,
        y: 250,
      });

      graph.paint();
      // const matrixEnd = node.get('group').getMatrix();
      // expect(matrixEnd[6]).toEqual(974.5);
      // expect(matrixEnd[7]).toEqual(399.5);

      const gnodes = graph.getNodes().filter((node) => {
        const model = node.getModel();
        return model.groupId === 'group1';
      });
      // 将指定节点拖出group外，group中只有一个节点
      expect(gnodes.length).toEqual(1);
      expect(gnodes[0].get('id')).toEqual('node2');

      // 拖出以后，p1中也只有不包括node1
      const currentP1Nodes = groupNodes.p1;
      const currentG1Nodes = groupNodes.group1;
      expect(currentG1Nodes.indexOf('node1') > -1).toBe(false);
      // expect(currentP1Nodes.indexOf('node1') > -1).toBe(false);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    }, 1000);
  });

  //drag-node-with-group
  it('drag a node out of group', () => {
    const data2 = {
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
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-node-with-group', 'drag-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    graph.data(data2);
    graph.render();

    const nodes = data2.nodes.filter((node) => node.groupId === 'group1');

    expect(nodes.length).toEqual(2);

    const node = graph.findById('node1');

    const matrixBefore = node.get('group').getMatrix();
    expect(matrixBefore[6]).toEqual(100);
    expect(matrixBefore[7]).toEqual(100);

    const groupControll = graph.get('customGroupControll');
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');

    graph.emit('node:dragstart', {
      target: node,
      item: node,
      x: 0,
      y: 0,
    });

    graph.emit('dragover', {
      target: keyShape,
    });
    graph.emit('node:drag', {
      target: node,
      item: node,
      x: 0,
      y: 0,
    });

    graph.emit('node:drag', {
      target: node,
      item: node,
      x: 200,
      y: 250,
    });

    // 拖动过程中，group中还会保留原来的node
    expect(nodes.length).toEqual(2);
    const matrix = node.get('group').getMatrix();

    expect(matrix[6]).toEqual(100);
    expect(matrix[7]).toEqual(100);

    graph.emit('node:dragend', {
      item: node,
      target: node,
      x: 200,
      y: 250,
    });

    graph.paint();
    const matrixEnd = node.get('group').getMatrix();
    expect(matrixEnd[6]).toEqual(300);
    expect(matrixEnd[7]).toEqual(350);

    const gnodes = graph.getNodes().filter((node) => {
      const model = node.getModel();
      return model.groupId === 'group1';
    });
    // 将指定节点拖出group外，group中只有一个节点
    expect(gnodes.length).toEqual(1);
    expect(gnodes[0].get('id')).toEqual('node2');
    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('drag node to group', () => {
    const data2 = {
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
    const graph = new Graph({
      container: div,
      width: 1500,
      height: 1000,
      modes: {
        default: ['drag-node-with-group'],
      },
      defaultNode: {
        type: 'circleNode',
      },
      defaultEdge: {
        color: '#bae7ff',
      },
    });

    graph.data(data2);
    graph.render();

    const nodes = data2.nodes.filter((node) => node.groupId === 'group1');

    expect(nodes.length).toEqual(2);

    // 将group2中的node3拖入到group1中
    const node = graph.findById('node3');
    const group3Nodes = data2.nodes.filter((node) => node.groupId === 'group2');
    expect(group3Nodes.length).toEqual(1);

    const matrixBefore = node.get('group').getMatrix();
    expect(matrixBefore[6]).toEqual(300);
    expect(matrixBefore[7]).toEqual(100);

    const groupControll = graph.get('customGroupControll');
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');

    graph.emit('node:dragstart', {
      target: node,
      item: node,
      x: 0,
      y: 0,
    });

    graph.emit('dragover', {
      target: keyShape,
    });

    graph.emit('node:drag', {
      target: node,
      item: node,
      x: -200,
      y: -60,
    });

    // 拖动过程中，group中还会保留原来的node
    expect(nodes.length).toEqual(2);
    const matrix = node.get('group').getMatrix();

    expect(matrix[6]).toEqual(300);
    expect(matrix[7]).toEqual(100);

    graph.emit('node:dragend', {
      item: node,
      target: node,
      x: -200,
      y: -60,
    });

    graph.paint();
    const matrixEnd = node.get('group').getMatrix();
    expect(matrixEnd[6]).toEqual(100);
    expect(matrixEnd[7]).toEqual(40);

    const gnodes = graph.getNodes().filter((node) => {
      const model = node.getModel();
      return model.groupId === 'group1';
    });
    // 将指定节点拖如到group1中，group中有3个节点
    expect(gnodes.length).toEqual(3);
    const node3GroupId = gnodes
      .filter((node) => {
        const model = node.getModel();
        return model.id === 'node3';
      })
      .map((node) => {
        const model = node.getModel();
        return model.groupId;
      });

    expect(node3GroupId[0]).toEqual('group1');
    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('drag node out of canvas, and do not update edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node-with-group',
            updateEdge: false,
          },
        ],
      },
    });
    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');
    const node = graph.getNodes()[0];

    graph.emit('node:dragstart', {
      item: node,
      x: 0,
      y: 0,
    });
    graph.emit('node:drag', {
      item: node,
      x: 100,
      y: 100,
    });
    graph.emit('canvas:mouseleave', { target: node });
    // mouseup out of the canvas
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'mouseup',
      true,
      true,
      document.defaultView,
      0,
      0,
      0,
      550,
      550, // clientX = 550, clientY = 550
      false,
      false,
      false,
      false,
      0,
      null,
    );
    document.body.dispatchEvent(event);

    graph.emit('dragover', { target: keyShape });
    graph.emit('node:dragstart', {
      target: node,
      item: node,
      x: 0,
      y: 0,
    });
    graph.emit('dragleave', { target: keyShape });

    // a node without group
    const nodeWithoutGroup = graph.addItem('node', {
      id: 'noGroupNode',
      label: 'noGroupNode',
      x: 300,
      y: 350,
    });
    graph.emit('dragover', { target: nodeWithoutGroup });
    graph.emit('dragleave', { target: nodeWithoutGroup });
    graph.destroy();
  });

  it('drag a node without group into a group', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node-with-group',
          },
        ],
      },
    });
    graph.data(data);
    graph.render();

    // a node without group
    const nodeWithoutGroup = graph.addItem('node', {
      id: 'noGroupNode',
      label: 'noGroupNode',
      x: 450,
      y: 350,
    });

    graph.destroy();
  });

  xit('temperal!!, drag a node without group, tmp test for dragover,dragleave', () => {
    const data2 = {
      nodes: [
        {
          id: 'node6',
          groupId: 'group1',
          label: 'rect',
          x: 100,
          y: 300,
        },
        {
          id: 'node1',
          label: 'fck',
          x: 100,
          y: 100,
        },
      ],
      groups: [
        {
          id: 'group1',
          title: '1',
        },
      ],
    };
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node-with-group',
          },
        ],
      },
    });
    graph.data(data2);
    graph.render();

    // a node without group
    // const nodeWithoutGroup = graph.addItem('node', { id: 'noGroupNode', label: 'noGroupNode', x: 450, y: 350 });

    // graph.destroy();
  });

  it('drag node without start', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node-with-group',
            updateEdge: false,
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const node = graph.getNodes()[0];
    graph.emit('node:drag', {
      item: node,
      x: 100,
      y: 100,
    });
    graph.destroy();
  });

  it('drag node should not begin', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node-with-group',
            shouldBegin: () => {
              return false;
            },
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const node = graph.getNodes()[0];
    graph.emit('node:dragstart', {
      item: node,
      x: 0,
      y: 0,
    });
    graph.destroy();
  });

  it('drag node should not update, end', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node-with-group',
            shouldEnd: () => {
              return false;
            },
            shouldUpdate: () => {
              return false;
            },
          },
        ],
      },
    });
    graph.data(data);
    graph.render();
    const node = graph.getNodes()[0];
    graph.emit('node:dragstart', {
      item: node,
      x: 0,
      y: 0,
    });
    graph.emit('node:drag', {
      item: node,
      x: 0,
      y: 0,
    });
    graph.emit('node:dragend', {
      item: node,
      x: 0,
      y: 0,
    });
    graph.destroy();
  });
});

describe('drag group out of range', () => {
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
  // FIXME: drag out of canvas did not stop
  it('drag out of canvas', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-group',
          },
        ],
      },
    });
    graph.data(data);
    graph.render();

    const groupControll = graph.get('customGroupControll');
    const { nodeGroup } = groupControll.getDeletageGroupById('group1');
    const keyShape = nodeGroup.get('keyShape');

    graph.emit('dragstart', {
      target: keyShape,
      x: 0,
      y: 0,
    });
    graph.emit('drag', {
      target: keyShape,
      x: 500,
      y: 200,
    });
    graph.emit('canvas:mouseleave', { target: keyShape });
    // mouseup out of the canvas
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'mouseup',
      true,
      true,
      document.defaultView,
      0,
      0,
      0,
      550,
      550, // clientX = 550, clientY = 550
      false,
      false,
      false,
      false,
      0,
      null,
    );
    document.body.dispatchEvent(event);
  });
});
