import '../../../src/behavior';
import TreeGraph from '../../../src/graph/tree-graph';

const div = document.createElement('div');
div.id = 'collapse-expand-spec';
document.body.appendChild(div);

describe('collapse expand tree graph', () => {
  const data = {
    isRoot: true,
    id: 'Root',
    style: {
      fill: 'red',
    },
    children: [
      {
        id: 'SubTreeNode1',
        raw: {},
        children: [
          {
            id: 'SubTreeNode1.1',
          },
          {
            id: 'SubTreeNode1.2',
            label: 'SubTreeNode1.2',
            children: [
              {
                id: 'SubTreeNode1.2.1',
              },
              {
                id: 'SubTreeNode1.2.2',
              },
              {
                id: 'SubTreeNode1.2.3',
              },
            ],
          },
        ],
      },
      {
        id: 'SubTreeNode2',
        children: [
          {
            id: 'SubTreeNode2.1',
          },
        ],
      },
      {
        id: 'SubTreeNode3',
        label: 'SubTreeNode3',
        children: [
          {
            id: 'SubTreeNode3.1',
          },
          {
            id: 'SubTreeNode3.2',
          },
          {
            id: 'SubTreeNode3.3',
          },
        ],
      },
      {
        id: 'SubTreeNode4',
      },
      {
        id: 'SubTreeNode5',
      },
      {
        id: 'SubTreeNode6',
      },
      {
        id: 'SubTreeNode7',
        label: 'SubTreeNode7',
      },
      {
        id: 'SubTreeNode8',
      },
      {
        id: 'SubTreeNode9',
      },
      {
        id: 'SubTreeNode10',
      },
      {
        id: 'SubTreeNode11',
      },
    ],
  };
  const graph = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'compactBox',
    },
    fitView: true,
    modes: {
      default: ['collapse-expand'],
    },
    defaultNode: {
      size: 10,
    },
  });
  graph.data(data);
  graph.render();
  const parent = graph.findById('SubTreeNode1.2');
  it('collapse tree graph', () => {
    graph.once('afterrefreshlayout', () => {
      expect(parent.getModel().collapsed).toEqual(true);
      expect(parent.get('children').length).toEqual(0);
    });
    graph.emit('node:click', { item: parent });
  });
  it('expand tree graph', () => {
    graph.emit('node:click', { item: parent });
    graph.once('afterrefreshlayout', () => {
      expect(parent.getModel().collapsed).toEqual(false);
      expect(parent.get('children').length).toEqual(2);
    });
  });
  it('expand a leaf', () => {
    const leaf = graph.findById('SubTreeNode7');
    graph.once('afterrefreshlayout', () => {
      expect(leaf.getModel().collapsed).toEqual(false);
    });
    graph.emit('node:click', { item: leaf });
    graph.destroy();
  });
  it('collapse-expand with invalid trigger', () => {
    const graph2 = new TreeGraph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'compactBox',
      },
      fitView: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            trigger: 'testInvalid',
          },
        ],
      },
      defaultNode: {
        size: 10,
      },
    });
    graph2.data(data);
    graph2.render();
    const parent2 = graph2.findById('SubTreeNode1.2');
    graph2.once('afterrefreshlayout', () => {
      expect(parent2.getModel().collapsed).toEqual(true);
      expect(parent2.get('children').length).toEqual(0);
    });
    graph2.emit('node:click', { item: parent2 });
    graph2.destroy();
  });
  it('prevent begin', () => {
    const graph2 = new TreeGraph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'compactBox',
      },
      fitView: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            shouldBegin: () => {
              return false;
            },
          },
        ],
      },
      defaultNode: {
        size: 10,
      },
    });
    graph2.data(data);
    graph2.render();
    const parent2 = graph2.findById('SubTreeNode3');
    graph2.once('afterrefreshlayout', () => {
      expect(parent2.getModel().collapsed).toEqual(false);
    });
    graph2.emit('node:click', { item: parent2 });
    graph2.destroy();
  });
  it('prevent update', () => {
    const graph2 = new TreeGraph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'compactBox',
      },
      fitView: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            shouldUpdate: () => {
              return false;
            },
          },
        ],
      },
      defaultNode: {
        size: 10,
      },
    });
    graph2.data(data);
    graph2.render();
    const parent2 = graph2.findById('SubTreeNode3');
    graph2.once('afterrefreshlayout', () => {
      expect(parent2.getModel().collapsed).toEqual(false);
    });
    graph2.emit('node:click', { item: parent2 });
    graph2.destroy();
  });
});
