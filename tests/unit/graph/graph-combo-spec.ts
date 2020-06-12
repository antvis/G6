import { Graph } from '../../../src';
import '../../../src/behavior';
import { ICombo } from '../../../src/interface/item';
import { GraphData } from '../../../src/types';
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
      y: 100
    },
    {
      id: '1',
      label: '1',
      comboId: 'a',
      x: 150,
      y: 140
    },
    {
      id: '2',
      label: '2',
      comboId: 'b',
      x: 300,
      y: 200
    },
    {
      id: '3',
      label: '3',
      comboId: 'b',
      x: 370,
      y: 260
    },
    {
      id: '5',
      label: '5',
      comboId: 'e',
      x: 220,
      y: 240
    },
    {
      id: '6',
      label: '6',
      comboId: 'e',
      x: 250,
      y: 250
    },
    {
      id: '4',
      label: '4',
      comboId: 'c',
      x: 360,
      y: 510
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
    }
  ],
  combos: [{
    id: 'a',
    label: 'combo a'
  }, {
    id: 'b',
    label: 'combo b'
  }, {
    id: 'c',
    label: 'combo c'
  }, {
    id: 'e',
    label: 'combo e',
    parentId: 'b'
  }]
};

describe('graph with combo', () => {
  it('uncombo', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
    });
    graph.read(clone(data));
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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
    });
    graph.read(clone(data));
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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
    });
    graph.read(clone(data));
    const comboB: ICombo = graph.findById('b') as ICombo;
    const comboBChildren = comboB.getChildren();
    expect(comboBChildren.nodes.length).toBe(2);
    expect(comboBChildren.combos.length).toBe(1);
    expect(comboBChildren.combos[0].getChildren().nodes.length).toBe(2);
    graph.destroy();
  });

  it('hide and show a combo', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
    });
    graph.read(clone(data));
    // hide an item itself
    const comboA: ICombo = graph.findById('a') as ICombo;
    comboA.hide();
    const aChildren = comboA.getNodes();
    aChildren.forEach(child => {
      expect(child.isVisible()).toBe(true);
    });

    // hide an item by graph
    const comboB: ICombo = graph.findById('b') as ICombo;
    graph.hideItem('b');
    const bChildren = comboB.getChildren();
    graph.uncombo(graph.findById('a') as ICombo);
    bChildren.nodes.forEach(node => {
      expect(node.isVisible()).toBe(false);
    });
    bChildren.combos.forEach(combo => {
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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      defaultCombo: {
        size: 10,
        padding: 1
      },
      defaultEdge: {
        style: {
          endArrow: true
        }
      },
      animate: true
    });
    graph.read(clone(data));
    // collapse / expand the combo with invalid id
    graph.collapseCombo('invalidid');
    graph.expandCombo('invalidid');

    // collapse a sub combo
    const comboE = graph.findById('e') as ICombo;
    graph.collapseCombo(comboE);
    comboE.getChildren().nodes.forEach(node => {
      expect(node.isVisible()).toBe(false);
    });

    // collapse a combo
    const comboB = graph.findById('b') as ICombo;
    graph.collapseCombo(comboB);
    comboB.getChildren().nodes.forEach(node => {
      expect(node.isVisible()).toBe(false);
    });
    comboB.getChildren().combos.forEach(combo => {
      expect(combo.isVisible()).toBe(false);
    });

    // expand a combo
    graph.expandCombo(comboB);
    comboB.getChildren().nodes.forEach(node => {
      expect(node.isVisible()).toBe(true);
    });
    comboB.getChildren().combos.forEach(combo => {
      expect(combo.isVisible()).toBe(true);
    });

    graph.collapseCombo('b');
    // collapseExpand function
    graph.collapseExpandCombo('a');
    const comboA = graph.findById('a') as ICombo;
    comboA.getChildren().nodes.forEach(node => {
      expect(node.isVisible()).toBe(false);
    });

    graph.collapseExpandCombo(comboA);
    comboA.getChildren().nodes.forEach(node => {
      expect(node.isVisible()).toBe(true);
    });

    graph.destroy();
  });

  it('combo mapper', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      groupByTypes: false
    });
    graph.combo(() => {
      return {
        style: {
          fill: 'red',
          stroke: 'blue',
          lineWidth: 3,
        }
      }
    });
    graph.read(clone(data));
    expect(graph.getCombos()[0].getKeyShape().attr('fill')).toBe('red');
    expect(graph.getCombos()[0].getKeyShape().attr('stroke')).toBe('blue');
    expect(graph.getCombos()[0].getKeyShape().attr('lineWidth')).toBe(3);
    graph.destroy();
  });

  it('getComboChildren', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
    });
    graph.read(clone(data));

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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      layout: {
        type: 'comboForce'
      },
      modes: {
        default: ['drag-combo']
      },
      fitView: true,
      groupByTypes: false
    });
    graph.read(clone(data));
    const newData = {
      nodes: [{
        id: 'new1',
        label: 'new1',
        comboId: 'a'
      }, {
        id: 'new2',
        label: 'new2',
        comboId: 'a'
      }, {
        id: '3',
      }, {
        id: '4',
        comboId: 'c'
      }, {
        id: 'new5',
        label: 'new5',
        comboId: 'f'
      }],
      edges: [{
        source: 'new1',
        target: 'new2'
      }, {
        source: '3',
        target: 'new2'
      }, {
        source: '3',
        target: '4'
      }, {
        source: 'new1',
        target: 'new5'
      }],
      combos: [{
        id: 'a',
        label: 'c-a'
      }, {
        id: 'b',
        label: 'c-b'
      }, {
        id: 'c',
        parentId: 'a',
        label: 'c-c'
      }, {
        id: 'f',
        parentId: 'a',
        label: 'c-f'
      }]
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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      layout: {
        type: 'comboForce'
      },
      fitView: true
    });
    graph.read(clone(data));
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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      layout: {
        type: 'comboForce'
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas']
      },
      fitView: true
    });
    graph.read(clone(data));
    const newComboItem = graph.addItem('combo', {
      id: 'new combo',
      label: 'new combo'
    });
    expect(newComboItem.getChildren().nodes.length).toBe(0);
    expect(newComboItem.getChildren().combos.length).toBe(0);
    expect(graph.getCombos().length).toBe(5);
    expect(graph.get('comboTrees').length).toBe(4);


    const newComboItem2 = graph.addItem('combo', {
      id: 'new combo 2',
      label: 'new combo 2',
      parentId: 'new combo'
    });
    graph.addItem('combo', {
      id: 'new combo 3',
      label: 'new combo 3',
      parentId: 'new combo'
    });
    expect(newComboItem.getChildren().nodes.length).toBe(0);
    expect(newComboItem.getChildren().combos.length).toBe(2);

    graph.addItem('node', {
      id: 'newsubnode1',
      label: 'newsubnode1',
      comboId: 'new combo'
    });
    expect(newComboItem.getChildren().nodes.length).toBe(1);
    expect(newComboItem.getChildren().combos.length).toBe(2);


    graph.addItem('node', {
      id: 'newsubnode2',
      label: 'newsubnode2',
      comboId: 'new combo 2'
    });
    graph.layout();
    expect(newComboItem2.getChildren().nodes.length).toBe(1);
    expect(newComboItem2.getChildren().combos.length).toBe(0);

    // add an exist combo
    graph.addItem('combo', {
      id: 'a'
    });

    // add a node with a nodeId as comboId
    graph.addItem('node', {
      id: 'nodeWithInvalidComboId',
      label: 'nodeWithInvalidComboId',
      comboId: '4'
    })

    graph.destroy();
  });

  it('graph.save with combos', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      layout: {
        type: 'comboForce'
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas']
      },
      animate: true
    });
    graph.read(clone(data));
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
        y: 150
      },
      {
        id: 'node2',
        x: 350,
        y: 150
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
    graph.on('canvas:click', e => {
      graph.createCombo('combo1', ['node1', 'node2']);
    });
    graph.data(data);
    graph.render()
  });
});