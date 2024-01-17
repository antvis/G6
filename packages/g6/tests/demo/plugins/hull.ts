import { Extensions, Graph, ID } from '../../../src/index';
import { ShapeStyle } from '../../../src/types/item';
export default (
  context,
  options: {
    hullType?: 'bubble' | 'smooth-convex' | 'round-convex';
    labelPosition?: string;
    style?: ShapeStyle;
    nonMembers?: ID[];
  } = {},
) => {
  const { hullType = 'smooth-convex', labelPosition = 'left', style, nonMembers = [] } = options;
  const hullPlugin = new Extensions.Hull({
    key: 'hull-plugin1',
    style,
    hulls: [
      {
        id: 'h1',
        members: ['node1', 'node2', 'node4'],
        nonMembers,
        type: hullType,
        labelShape: {
          text: 'hull1-title',
          position: labelPosition as any,
          offsetY: -2,
        },
      },
    ],
  });
  const graph = new Graph({
    ...context,
    type: 'graph',
    plugins: [hullPlugin],
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
    },
    modes: {
      default: [{ type: 'drag-node', enableTransient: false }],
    },
  });

  let hullRemoved = true;
  const addHullBtn = document.createElement('button');
  addHullBtn.textContent = '添加/删除 Hull';
  addHullBtn.id = 'hull-removehull';
  addHullBtn.addEventListener('click', () => {
    if (hullRemoved)
      hullPlugin.addHull({
        id: 'new-hull',
        members: ['node3', 'node4'],
        style: {
          fill: 'green',
        },
      });
    else hullPlugin.removeHull('new-hull');
    hullRemoved = !hullRemoved;
  });

  let nodeRemoved = false;
  const addNodeBtn = document.createElement('button');
  addNodeBtn.textContent = '添加/删除节点';
  addNodeBtn.id = 'hull-removenode';
  addNodeBtn.addEventListener('click', () => {
    if (nodeRemoved) {
      graph.addData('node', { id: 'node1', data: { x: 100, y: 100 } });
      hullPlugin.addHullMember('h1', ['node1']);
    } else {
      graph.removeData('node', 'node1');
    }
    nodeRemoved = !nodeRemoved;
  });

  let memberRemoved = false;
  const addMemberBtn = document.createElement('button');
  addMemberBtn.textContent = '添加/删除成员';
  addMemberBtn.id = 'hull-removemember';
  addMemberBtn.addEventListener('click', () => {
    if (memberRemoved) {
      hullPlugin.addHullMember('h1', ['node4']);
    } else {
      hullPlugin.removeHullMember('h1', ['node4']);
    }
    memberRemoved = !memberRemoved;
  });

  let nonMemberAdded = false;
  const addNonMemberBtn = document.createElement('button');
  addNonMemberBtn.textContent = '添加/删除非成员';
  addNonMemberBtn.id = 'hull-removenonmember';
  addNonMemberBtn.addEventListener('click', () => {
    if (!nonMemberAdded) {
      hullPlugin.addHullNonMember('h1', ['node2']);
    } else {
      hullPlugin.removeHullNonMember('h1', ['node2']);
    }
    nonMemberAdded = !nonMemberAdded;
  });

  const updateHullBtn = document.createElement('button');
  updateHullBtn.textContent = '更新 Hull 配置';
  updateHullBtn.id = 'hull-updateconfig';
  updateHullBtn.addEventListener('click', () => {
    hullPlugin.updateHull({
      id: 'h1',
      style: { fill: '#ff0' },
      labelShape: { text: 'updated-label', position: 'top' },
    });
  });

  document.body.appendChild(addHullBtn);
  document.body.appendChild(addNodeBtn);
  document.body.appendChild(addMemberBtn);
  document.body.appendChild(addNonMemberBtn);
  document.body.appendChild(updateHullBtn);

  return graph;
};
