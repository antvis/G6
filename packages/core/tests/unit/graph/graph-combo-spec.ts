import Graph from '../implement-graph';
import { GraphData, ICombo, ComboTree, Util } from '../../../src';
import { clone } from '@antv/util';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      comboId: 'a',
      x: 100,
      y: 100,
    },
    {
      id: '1',
      label: '1',
      comboId: 'a',
      x: 150,
      y: 140,
    },
    {
      id: '2',
      label: '2',
      comboId: 'b',
      x: 300,
      y: 200,
    },
    {
      id: '3',
      label: '3',
      comboId: 'b',
      x: 370,
      y: 260,
    },
    {
      id: '5',
      label: '5',
      comboId: 'e',
      x: 220,
      y: 240,
    },
    {
      id: '6',
      label: '6',
      comboId: 'e',
      x: 250,
      y: 250,
    },
    {
      id: '4',
      label: '4',
      comboId: 'c',
      x: 360,
      y: 510,
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '1',
      target: '2',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '3',
      target: '0',
    },
    {
      source: '4',
      target: '1',
    },
    {
      id: '5-6',
      source: '5',
      target: '6',
    },
    {
      id: '4-6',
      source: '4',
      target: '6',
    },
  ],
  combos: [
    {
      id: 'a',
      label: 'combo a',
    },
    {
      id: 'b',
      label: 'combo b',
    },
    {
      id: 'c',
      label: 'combo c',
    },
    {
      id: 'e',
      label: 'combo e',
      parentId: 'b',
    },
  ],
};

describe('graph with combo', () => {
  let graph: Graph;

  function makeGraph(config = {}, forceData = undefined) {
    graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      ...config
    });
    graph.read(clone(forceData || data));
  }

  it('createCombo', () => {
    makeGraph();

    graph.addItem('node', { id: 'top-level-node' });

    const newComboChildIds = [
      'top-level-node', // a top-level node
      '0', // Inside top-level combo 'a'
      '2', // Inside top-level combo 'b'
      '5', // Inside depth-1 combo 'e'
      'a', // Top-level combo
      'e', // Depth-1 combo
    ];

    graph.createCombo('new-combo', newComboChildIds);

    const newCombo = graph.findById('new-combo') as ICombo;

    // Children are assigned correctly to the new combo parent
    newComboChildIds.forEach(id => {
      const itemModel = graph.findById(id).getModel();
      expect(itemModel.comboId || itemModel.parentId).toBe('new-combo');
    });

    // Combo children are updated correctly
    const expectedChildrenById = {
      a: ['1'], // '0' has been transferred to new combo
      b: ['3'], // 'e' moved to new combo
      c: ['4'], // Not changed
      e: ['6'], // '5' moved to new combo
      'new-combo': newComboChildIds,
    }

    Object.entries(expectedChildrenById).forEach(([comboId, expectedChildIds]) => {
      const combo = graph.findById(comboId) as ICombo;
      const children = [...combo.getNodes(), ...combo.getCombos()];
      const childIds = children.map(item => item.getID());

      // Double-contains because we don't care about order
      expect(childIds).toEqual(expect.arrayContaining(expectedChildIds));
      expect(expectedChildIds).toEqual(expect.arrayContaining(childIds));
    });

    // Children should have been removed from their original parents in the comboTrees
    const expectedTopLevelComboIds = ['b', 'c', 'new-combo'];

    const comboTrees = graph.get('comboTrees');
    const topLevelComboIds = comboTrees.map(comboTree => comboTree.id);

    expect(topLevelComboIds).toEqual(expect.arrayContaining(expectedTopLevelComboIds));
    expect(expectedTopLevelComboIds).toEqual(expect.arrayContaining(topLevelComboIds));

    comboTrees.forEach(ctree => {
      Util.traverseTree<ComboTree>(ctree, (node: ComboTree): boolean => {
        if (node.itemType === 'combo') {
          const childIds = node.children.map(child => child.id);
          const expectedChildIds = expectedChildrenById[node.id];

          expect(childIds).toEqual(expect.arrayContaining(expectedChildIds));
          expect(expectedChildIds).toEqual(expect.arrayContaining(childIds));
        }

        return true;
      });
    });
  });

  it('uncombo', () => {
    makeGraph();

    // uncombo with combo item
    graph.uncombo(graph.findById('a') as ICombo);
    expect(graph.getCombos().length).toBe(3);
    expect(graph.get('comboTrees').length).toBe(2);
    // uncombo with id
    graph.uncombo('e');
    expect(graph.getCombos().length).toBe(2);
    expect(graph.get('comboTrees').length).toBe(2);
    // uncombo with an invalid id (a node's id)
    graph.uncombo('0');
    expect(graph.getCombos().length).toBe(2);
    expect(graph.get('comboTrees').length).toBe(2);
    // uncombo with an invalid id
    graph.uncombo('invalidid');
    expect(graph.getCombos().length).toBe(2);
    expect(graph.get('comboTrees').length).toBe(2);
    graph.destroy();
  });
  it('uncombo subcombo', () => {
    makeGraph();

    // uncombo the parent first and then uncombo the subcombo
    graph.uncombo(graph.findById('b') as ICombo);
    expect(graph.getCombos().length).toBe(3);
    expect(graph.findById('b')).toBe(undefined);
    graph.uncombo('e');
    expect(graph.getCombos().length).toBe(2);
    expect(graph.findById('e')).toBe(undefined);
    graph.destroy();
  });

  it('get combo children', () => {
    makeGraph();

    const comboB: ICombo = graph.findById('b') as ICombo;
    const comboBChildren = comboB.getChildren();
    expect(comboBChildren.nodes.length).toBe(2);
    expect(comboBChildren.combos.length).toBe(1);
    expect(comboBChildren.combos[0].getChildren().nodes.length).toBe(2);
    graph.destroy();
  });

  it('hide and show a combo', () => {
    makeGraph();

    // hide an item itself
    const comboA: ICombo = graph.findById('a') as ICombo;
    comboA.hide();
    const aChildren = comboA.getNodes();
    aChildren.forEach((child) => {
      expect(child.isVisible()).toBe(true);
    });

    // hide an item by graph
    const comboB: ICombo = graph.findById('b') as ICombo;
    graph.hideItem('b');
    const bChildren = comboB.getChildren();
    graph.uncombo(graph.findById('a') as ICombo);
    bChildren.nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    bChildren.combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });
    expect(graph.findById('5-6').isVisible()).toBe(false);
    expect(graph.findById('4-6').isVisible()).toBe(false);
    graph.showItem('b');
    expect(graph.findById('5-6').isVisible()).toBe(true);
    expect(graph.findById('4-6').isVisible()).toBe(true);

    // hide with an invalid id
    graph.hideItem('invalidid');
    graph.destroy();
  });

  it('collapse expand combo', () => {
    makeGraph({
      defaultCombo: {
        size: 10,
        padding: 1,
      },
      defaultEdge: {
        style: {
          endArrow: true,
        },
      },
      animate: true,
    });

    // collapse / expand the combo with invalid id
    graph.collapseCombo('invalidid');
    graph.expandCombo('invalidid');

    // collapse a sub combo
    const comboE = graph.findById('e') as ICombo;
    graph.collapseCombo(comboE);
    comboE.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });

    // collapse a combo
    const comboB = graph.findById('b') as ICombo;
    graph.collapseCombo(comboB);
    comboB.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    comboB.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });

    // expand a combo
    graph.expandCombo(comboB);
    comboB.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(true);
    });
    comboB.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(true);
    });

    graph.collapseCombo('b');
    // collapseExpand function
    graph.collapseExpandCombo('a');
    const comboA = graph.findById('a') as ICombo;
    comboA.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });

    graph.collapseExpandCombo(comboA);
    comboA.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(true);
    });

    graph.destroy();
  });

  it('collapse combo should create only one edge', () => {
    // this data reproduces the issue where one combo was connected to a node with 2 vedges
    const data = {
      nodes: [
        { id: "node1", x: 250, y: 150, comboId: "combo" },
        { id: "node2", x: 350, y: 150, comboId: "combo" },
        { id: "node3", x: 250, y: 300 },
      ],
      combos: [{ id: "combo", label: "Combo" }],
      edges: [
        { id: "edge1", source: "node1", target: "node3" },
        { id: "edge2", target: "node2", source: "node3" },
      ],
    };

    makeGraph({}, data);

    graph.collapseCombo('combo');

    const edges = graph.get('vedges');
    expect(edges).toHaveLength(1);
  });

  it('combo mapper', () => {
    makeGraph({ groupByTypes: false });

    graph.combo(() => {
      return {
        style: {
          fill: 'red',
          stroke: 'blue',
          lineWidth: 3,
        },
      };
    });
    graph.read(clone(data));
    expect(graph.getCombos()[0].getKeyShape().attr('fill')).toBe('red');
    expect(graph.getCombos()[0].getKeyShape().attr('stroke')).toBe('blue');
    expect(graph.getCombos()[0].getKeyShape().attr('lineWidth')).toBe(3);
    graph.destroy();
  });

  it('getComboChildren', () => {
    makeGraph();

    // getComboChildren with id
    const childrenById = graph.getComboChildren('b');
    const comboB = graph.findById('b') as ICombo;
    const childrenByItem = graph.getComboChildren(comboB);
    expect(childrenById.nodes.length).toBe(2);
    expect(childrenById.nodes.length).toBe(childrenByItem.nodes.length);
    expect(childrenById.combos.length).toBe(1);
    expect(childrenById.combos.length).toBe(childrenByItem.combos.length);

    // get children by invalid id
    const invalidCombo = graph.getComboChildren('invalidid');
    expect(invalidCombo).toBe(undefined);

    graph.destroy();
  });

  it('changeData with combos', () => {
    makeGraph({
      layout: {
        type: 'comboForce',
      },
      modes: {
        default: ['drag-combo'],
      },
      fitView: true,
      groupByTypes: false,
    });

    const newData = {
      nodes: [
        {
          id: 'new1',
          label: 'new1',
          comboId: 'a',
        },
        {
          id: 'new2',
          label: 'new2',
          comboId: 'a',
        },
        {
          id: '3',
        },
        {
          id: '4',
          comboId: 'c',
        },
        {
          id: 'new5',
          label: 'new5',
          comboId: 'f',
        },
      ],
      edges: [
        {
          source: 'new1',
          target: 'new2',
        },
        {
          source: '3',
          target: 'new2',
        },
        {
          source: '3',
          target: '4',
        },
        {
          source: 'new1',
          target: 'new5',
        },
      ],
      combos: [
        {
          id: 'a',
          label: 'c-a',
        },
        {
          id: 'b',
          label: 'c-b',
        },
        {
          id: 'c',
          parentId: 'a',
          label: 'c-c',
        },
        {
          id: 'f',
          parentId: 'a',
          label: 'c-f',
        },
      ],
    };
    // graph.changeData(newData);
    // graph.fitView();
    // // the nodes with no parent combo will not be counted into comboTrees
    // expect(graph.get('comboTrees').length).toBe(2);
    // const comboAChildren = (graph.findById('a') as ICombo).getChildren();
    // expect(comboAChildren.nodes.length).toBe(2);
    // expect(comboAChildren.combos.length).toBe(2);
    // graph.destroy();
  });

  it('updateComboTree', () => {
    makeGraph({
      layout: {
        type: 'comboForce',
      },
      fitView: true,
    });

    graph.updateComboTree('4', 'b');
    graph.layout();
    expect(graph.get('comboTrees').length).toBe(3);
    const comboBChildren = (graph.findById('b') as ICombo).getChildren();
    expect(comboBChildren.nodes.length).toBe(3);
    expect(comboBChildren.combos.length).toBe(1);
    const comboC = graph.findById('c') as ICombo;
    expect(comboC.getChildren().nodes.length).toBe(0);

    const comboA = graph.findById('a') as ICombo;
    graph.updateComboTree(comboA, 'c');
    expect(comboA.getChildren().nodes.length).toBe(2);
    expect(comboC.getChildren().nodes.length).toBe(0);
    expect(comboC.getChildren().combos.length).toBe(1);
    graph.destroy();
  });
  it('add combo item', () => {
    makeGraph({
      layout: {
        type: 'comboForce',
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'],
      },
      fitView: true,
    });

    const newComboItem = graph.addItem('combo', {
      id: 'new combo',
      label: 'new combo',
    }) as ICombo;
    expect(newComboItem.getChildren().nodes.length).toBe(0);
    expect(newComboItem.getChildren().combos.length).toBe(0);
    expect(graph.getCombos().length).toBe(5);
    expect(graph.get('comboTrees').length).toBe(4);

    const newComboItem2 = graph.addItem('combo', {
      id: 'new combo 2',
      label: 'new combo 2',
      parentId: 'new combo',
    }) as ICombo;
    graph.addItem('combo', {
      id: 'new combo 3',
      label: 'new combo 3',
      parentId: 'new combo',
    });
    expect(newComboItem.getChildren().nodes.length).toBe(0);
    expect(newComboItem.getChildren().combos.length).toBe(2);

    graph.addItem('node', {
      id: 'newsubnode1',
      label: 'newsubnode1',
      comboId: 'new combo',
    });
    expect(newComboItem.getChildren().nodes.length).toBe(1);
    expect(newComboItem.getChildren().combos.length).toBe(2);

    graph.addItem('node', {
      id: 'newsubnode2',
      label: 'newsubnode2',
      comboId: 'new combo 2',
    });
    graph.layout();
    expect(newComboItem2.getChildren().nodes.length).toBe(1);
    expect(newComboItem2.getChildren().combos.length).toBe(0);

    // add an exist combo
    graph.addItem('combo', {
      id: 'a',
    });

    // add a node with a nodeId as comboId
    graph.addItem('node', {
      id: 'nodeWithInvalidComboId',
      label: 'nodeWithInvalidComboId',
      comboId: '4',
    });

    graph.destroy();
  });

  it('graph.save with combos', () => {
    makeGraph({
      layout: {
        type: 'comboForce',
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'],
      },
      animate: true,
    });

    const result = graph.save() as GraphData;
    expect(result.combos).not.toBe(undefined);
    expect(result.combos.length).toBe(4);
    graph.destroy();
  });
});

describe('empty combo', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 250,
        y: 150,
      },
      {
        id: 'node2',
        x: 350,
        y: 150,
      },
    ],
    // combos: [{
    //   id: 'combo',
    //   label: 'Combo'
    // }]
  };
  it('circle no label', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
      },
    });
    graph.on('canvas:click', (e) => {
      graph.createCombo('combo1', ['node1', 'node2']);
    });
    graph.data(data);
    graph.render();
  });
});
