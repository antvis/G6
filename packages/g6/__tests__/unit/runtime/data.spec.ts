import { treeToGraphData } from '@/src';
import { DataController } from '@/src/runtime/data';
import { reduceDataChanges } from '@/src/utils/change';
import { idOf } from '@/src/utils/id';
import tree from '@@/dataset/algorithm-category.json';
import { clone } from '@antv/util';

const data = {
  nodes: [
    { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } },
    { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
    { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
  ],
  edges: [
    { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
    { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} },
  ],
  combos: [{ id: 'combo-1', data: {}, style: {} }],
};

describe('DataController', () => {
  it('init', () => {
    const controller = new DataController();

    expect(controller).toBeDefined();
    expect(controller.model).toBeDefined();
  });

  it('empty data', () => {
    const controller = new DataController();

    expect(controller.getData()).toEqual({ nodes: [], edges: [], combos: [] });

    controller.addComboData([{ id: 'combo-1' }]);

    expect(controller.getComboData(['combo-1'])).toEqual([{ id: 'combo-1', data: {}, style: {} }]);
  });

  it('setData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    controller.setData({
      nodes: [{ id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }],
    });

    expect(controller.getData()).toEqual({
      nodes: [{ id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }],
      edges: [],
      combos: [],
    });
  });

  it('addData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getData()).toEqual(data);

    controller.addData({
      nodes: [{ id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }],
    });

    expect(controller.hasNode('node-4')).toBe(true);

    controller.addComboData([{ id: 'combo-2' }]);

    expect(controller.hasEdge('combo-2')).toBe(false);
    expect(controller.hasEdge('combo-2')).toBe(false);
    expect(controller.hasCombo('combo-2')).toBe(true);

    controller.addNodeData([]);

    controller.addNodeData([{ id: 'node-5', data: { value: 5 }, combo: 'combo-2', style: { fill: 'black' } }]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-5', data: { weight: 3 } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } },
        { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
        { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
        { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } },
        { id: 'node-5', data: { value: 5 }, combo: 'combo-2', style: { fill: 'black' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} },
        { id: 'edge-3', source: 'node-1', target: 'node-5', data: { weight: 3 }, style: {} },
      ],
      combos: [
        { id: 'combo-1', data: {}, style: {} },
        { id: 'combo-2', data: {}, style: {} },
      ],
    });
  });

  it('getData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getData()).toEqual(data);

    expect(controller.getNodeData(['node-2'])).toEqual(data.nodes.slice(1, 2));

    expect(controller.getEdgeData(['edge-1'])).toEqual(data.edges.slice(0, 1));

    expect(controller.getComboData(['combo-1'])).toEqual(data.combos.slice(0, 1));

    expect(controller.getChildrenData('combo-1').map(idOf)).toEqual(['node-2', 'node-3']);

    expect(controller.getAncestorsData('node-2', 'combo').map(idOf)).toEqual(['combo-1']);
  });

  it('updateData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    controller.updateData({
      nodes: [{ id: 'node-1', data: { value: 2 }, style: { fill: 'pink', lineWidth: 2 } }],
      edges: [{ id: 'edge-1', data: { weight: 678 } }],
    });

    controller.addComboData([{ id: 'combo-2' }]);

    controller.updateNodeData([{ id: 'node-1', data: { value: 666 }, combo: 'combo-2' }]);

    controller.updateNodeData([{ id: 'node-2', combo: 'combo-2' }]);

    controller.updateEdgeData([{ id: 'edge-2', data: { weight: 666 } }]);

    controller.updateComboData([{ id: 'combo-1', data: { value: 100 }, style: { stroke: 'blue' } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: { value: 666 }, combo: 'combo-2', style: { fill: 'pink', lineWidth: 2 } },
        { id: 'node-2', data: { value: 2 }, combo: 'combo-2', style: { fill: 'green' } },
        { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 678 }, style: {} },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 666 }, style: {} },
      ],
      combos: [
        { id: 'combo-1', data: { value: 100 }, style: { stroke: 'blue' } },
        { id: 'combo-2', data: {}, style: {} },
      ],
    });
  });

  it('updateNodeData', () => {
    const controller = new DataController();
    controller.addNodeData([{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }]);
    // no changes
    controller.updateNodeData([{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }]);

    expect(controller.getNodeData()).toEqual([{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }]);
  });

  it('updateEdgeData', () => {
    const controller = new DataController();
    controller.addData({
      nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } }],
    });
    // no changes
    controller.updateEdgeData([{ id: 'edge-1', data: { weight: 1 } }]);

    expect(controller.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
    ]);

    // update source
    controller.updateEdgeData([{ id: 'edge-1', source: 'node-2' }]);

    expect(controller.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-2', target: 'node-2', data: { weight: 1 }, style: {} },
    ]);

    // update target
    controller.updateEdgeData([{ id: 'edge-1', target: 'node-1' }]);
    expect(controller.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-2', target: 'node-1', data: { weight: 1 }, style: {} },
    ]);
  });

  it('updateComboData', () => {
    const data = {
      nodes: [
        { id: 'node-1', combo: 'combo-1', style: { x: 50, y: 50 } },
        { id: 'node-2', combo: 'combo-1', style: { x: 100, y: 100 } },
      ],
      combos: [
        {
          id: 'combo-1',
          style: { x: 0, y: 0 },
        },
        { id: 'combo-2' },
      ],
    };

    const controller = new DataController();

    controller.addData(data);

    controller.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }]);

    // no changes
    controller.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, combo: 'combo-1', style: { x: 50, y: 50 } },
        { id: 'node-2', data: {}, combo: 'combo-1', style: { x: 100, y: 100 } },
      ],
      edges: [],
      combos: [
        { id: 'combo-1', data: {}, style: { x: 100, y: 100, z: 0 } },
        { id: 'combo-2', data: {}, style: {} },
      ],
    });

    controller.updateComboData([{ id: 'combo-1', style: { fill: 'pink' } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, combo: 'combo-1', style: { x: 50, y: 50 } },
        { id: 'node-2', data: {}, combo: 'combo-1', style: { x: 100, y: 100 } },
      ],
      edges: [],
      combos: [
        { id: 'combo-1', data: {}, style: { x: 100, y: 100, z: 0, fill: 'pink' } },
        { id: 'combo-2', data: {}, style: {} },
      ],
    });

    controller.updateComboData([{ id: 'combo-2' }]);
  });

  it('translateComboBy', () => {
    const controller = new DataController();

    controller.addData({
      nodes: [{ id: 'node-1', combo: 'combo-1' }],
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboBy('combo-1', [100, 100]);

    expect(controller.getData()).toEqual({
      nodes: [{ id: 'node-1', data: {}, combo: 'combo-1', style: { x: 100, y: 100, z: 0 } }],
      combos: [{ id: 'combo-1', data: {}, style: { x: 100, y: 100, z: 0 } }],
      edges: [],
    });
  });

  it('translateComboBy with children', () => {
    const controller = new DataController();

    controller.addData({
      nodes: [
        { id: 'node-1' },
        { id: 'node-2', combo: 'combo-1', style: { y: 50, fill: 'green' } },
        { id: 'node-3', combo: 'combo-1', style: { x: 100, y: 100, fill: 'blue' } },
      ],
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboBy('combo-1', [66, 67]);

    expect(controller.getNodeData()).toEqual([
      { id: 'node-1', data: {}, style: {} },
      { id: 'node-2', combo: 'combo-1', data: {}, style: { x: 66, y: 117, z: 0, fill: 'green' } },
      { id: 'node-3', combo: 'combo-1', data: {}, style: { x: 166, y: 167, z: 0, fill: 'blue' } },
    ]);
  });

  it('translateComboBy without children', () => {
    const controller = new DataController();

    controller.addData({
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboBy('combo-1', [100, 100]);

    expect(controller.getData()).toEqual({
      nodes: [],
      edges: [],
      combos: [{ id: 'combo-1', data: {}, style: { x: 100, y: 100, z: 0 } }],
    });
  });

  it('translateComboTo', () => {
    const controller = new DataController();

    controller.addData({
      nodes: [
        { id: 'node-1', combo: 'combo-1' },
        { id: 'node-2', combo: 'combo-1', style: { x: 10, y: 10 } },
      ],
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboTo('combo-1', [100, 100]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, combo: 'combo-1', style: { x: 100, y: 100, z: 0 } },
        { id: 'node-2', data: {}, combo: 'combo-1', style: { x: 110, y: 110, z: 0 } },
      ],
      combos: [{ id: 'combo-1', data: {}, style: { x: 100, y: 100, z: 0 } }],
      edges: [],
    });
  });

  it('removeData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    controller.removeData({
      nodes: ['node-1'],
      edges: ['edge-1'],
      // combos: ['combo-1'],
    });

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
        { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
      ],
      edges: [{ id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} }],
      combos: [{ id: 'combo-1', data: {}, style: {} }],
    });

    controller.removeComboData(['combo-1']);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, combo: undefined, style: { fill: 'green' } },
        { id: 'node-3', data: { value: 3 }, combo: undefined, style: { fill: 'blue' } },
      ],
      edges: [{ id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} }],
      combos: [],
    });

    controller.removeEdgeData([]);

    controller.removeEdgeData(['edge-2']);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, combo: undefined, style: { fill: 'green', combo: undefined } },
        { id: 'node-3', data: { value: 3 }, combo: undefined, style: { fill: 'blue' } },
      ],
      edges: [],
      combos: [],
    });

    controller.removeNodeData();

    controller.removeNodeData(['node-2']);

    expect(controller.getData()).toEqual({
      nodes: [{ id: 'node-3', data: { value: 3 }, combo: undefined, style: { fill: 'blue' } }],
      edges: [],
      combos: [],
    });
  });

  it('removeComboData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getParentData('node-2', 'combo')).toEqual(data.combos[0]);

    controller.removeComboData(['combo-1']);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } },
        { id: 'node-2', data: { value: 2 }, combo: undefined, style: { fill: 'green' } },
        { id: 'node-3', data: { value: 3 }, combo: undefined, style: { fill: 'blue' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} },
      ],
      combos: [],
    });

    expect(controller.getParentData('node-2', 'combo')).toEqual(undefined);
  });

  it('removeComboData with children', () => {
    const data = {
      nodes: [
        { id: 'node-1', data: {}, combo: 'combo-1' },
        { id: 'node-2', data: {}, combo: 'combo-1' },
        { id: 'node-3', data: {}, combo: 'combo-1' },
      ],
      combos: [
        { id: 'combo-1', data: {}, combo: 'combo-2' },
        { id: 'combo-2', data: {}, style: {} },
      ],
    };

    const controller = new DataController();

    controller.addData(data);

    expect(controller.getParentData('node-1', 'combo')?.id).toEqual('combo-1');
    expect(controller.getParentData('combo-1', 'combo')?.id).toEqual('combo-2');

    controller.removeComboData(['combo-1']);

    expect(controller.getParentData('node-1', 'combo')?.id).toEqual('combo-2');

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: {}, style: {}, combo: 'combo-2' },
        { id: 'node-2', data: {}, style: {}, combo: 'combo-2' },
        { id: 'node-3', data: {}, style: {}, combo: 'combo-2' },
      ],
      edges: [],
      combos: [{ id: 'combo-2', data: {}, style: {} }],
    });
  });

  it('changes', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    controller.setData({
      nodes: [
        { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'pink' } },
        { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } },
      ],
      combos: [{ id: 'combo-2' }],
    });

    const changes = controller.getChanges();

    expect(changes).toEqual([
      { value: { id: 'combo-1', data: {}, style: {} }, type: 'ComboAdded' },
      { value: { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }, type: 'NodeAdded' },
      { value: { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } }, type: 'NodeAdded' },
      { value: { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } }, type: 'NodeAdded' },
      // 新增子元素后更新 combo / update combo after add child
      {
        value: { id: 'combo-1', data: {}, style: {} },
        original: { id: 'combo-1', data: {}, style: {} },
        type: 'ComboUpdated',
      },
      {
        value: { id: 'combo-1', data: {}, style: {} },
        original: { id: 'combo-1', data: {}, style: {} },
        type: 'ComboUpdated',
      },
      {
        value: { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
        type: 'EdgeAdded',
      },
      {
        value: { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} },
        type: 'EdgeAdded',
      },
      { value: { id: 'combo-2' }, type: 'ComboAdded' },
      { value: { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }, type: 'NodeAdded' },
      {
        value: { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'pink' } },
        original: { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
        type: 'NodeUpdated',
      },
      // 移动节点后更新 combo / update combo after move node
      {
        value: { id: 'combo-2', data: {}, style: {} },
        original: { id: 'combo-2', data: {}, style: {} },
        type: 'ComboUpdated',
      },
      {
        value: { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
        type: 'EdgeRemoved',
      },
      {
        value: { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 }, style: {} },
        type: 'EdgeRemoved',
      },
      { value: { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }, type: 'NodeRemoved' },
      {
        value: { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
        type: 'NodeRemoved',
      },
      // 移除节点后更新 combo / update combo after remove node
      {
        value: { id: 'combo-1', data: {}, style: {} },
        original: { id: 'combo-1', data: {}, style: {} },
        type: 'ComboUpdated',
      },
      { value: { id: 'combo-1', data: {}, style: {} }, type: 'ComboRemoved' },
    ]);

    expect(reduceDataChanges(changes)).toEqual([
      {
        type: 'NodeAdded',
        value: { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'pink' } },
      },
      { value: { id: 'combo-2', data: {}, style: {} }, type: 'ComboAdded' },
      { value: { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }, type: 'NodeAdded' },
    ]);
  });

  it('changes add', () => {
    const controller = new DataController();

    controller.addData({
      nodes: [
        { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'pink' } },
        { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } },
      ],
      combos: [{ id: 'combo-2' }],
    });

    const changes = controller.getChanges();

    expect(reduceDataChanges(changes)).toEqual([
      { value: { id: 'combo-2', data: {}, style: {} }, type: 'ComboAdded' },
      {
        type: 'NodeAdded',
        value: { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'pink' } },
      },
      { value: { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }, type: 'NodeAdded' },
    ]);
  });

  it('silence', () => {
    const controller = new DataController();

    controller.silence(() => {
      controller.addData(clone(data));

      controller.setData({
        nodes: [
          { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'pink' } },
          { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } },
        ],
        combos: [{ id: 'combo-2' }],
      });
    });

    const changes = controller.getChanges();

    expect(changes.length).toBe(0);
  });

  it('getElementData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getElementDataById('node-1')).toEqual(data.nodes[0]);

    expect(controller.getElementDataById('edge-1')).toEqual(data.edges[0]);

    expect(controller.getElementDataById('combo-1')).toEqual(data.combos[0]);

    expect(() => {
      controller.getElementDataById('undefined');
    }).toThrow();
  });

  it('getNodeLikeData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getNodeLikeData(['node-1'])[0]).toEqual(data.nodes[0]);

    expect(controller.getNodeLikeData(['edge-1'])[0]).toEqual(undefined);

    expect(controller.getNodeLikeData(['combo-1'])[0]).toEqual(data.combos[0]);

    expect(controller.getNodeLikeData()).toEqual([...data.combos, ...data.nodes]);
  });

  it('getRootsData', () => {
    const controller = new DataController();

    controller.addData(treeToGraphData(tree));

    expect(controller.getRootsData('tree').map(idOf)).toEqual(['Modeling Methods']);
  });

  it('getAncestorsData getParentData getChildrenData', () => {
    const controller = new DataController();

    controller.addData(treeToGraphData(tree));

    expect(controller.getAncestorsData('Logistic regression', 'tree').map(idOf)).toEqual([
      'Classification',
      'Modeling Methods',
    ]);

    expect(controller.getParentData('Classification', 'tree')?.id).toBe(tree.id);

    expect(controller.getChildrenData('Modeling Methods').map((child) => child.id)).toEqual(
      tree.children.map((child) => child.id),
    );
  });

  it('hasNode', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.hasNode('node-1')).toBe(true);
    expect(controller.hasNode('node-4')).toBe(false);
  });

  it('hasEdge', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.hasEdge('edge-1')).toBe(true);
    expect(controller.hasEdge('edge-4')).toBe(false);
  });

  it('hasCombo', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.hasCombo('combo-1')).toBe(true);
    expect(controller.hasCombo('combo-4')).toBe(false);
  });

  it('getComboChildrenData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getChildrenData('combo-1')).toEqual(data.nodes.slice(1));

    controller.updateNodeData([{ id: 'node-1', combo: 'combo-1' }]);

    expect(controller.getChildrenData('combo-1')?.sort((a, b) => (a.id < b.id ? -1 : 1))).toEqual([
      { id: 'node-1', data: { value: 1 }, combo: 'combo-1', style: { fill: 'red' } },
      { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
      { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
    ]);

    controller.addComboData([{ id: 'combo-2' }]);

    controller.updateNodeData([
      { id: 'node-2', combo: 'combo-2' },
      { id: 'node-3', combo: 'combo-2' },
    ]);

    expect(controller.getChildrenData('combo-1')).toEqual([
      { id: 'node-1', data: { value: 1 }, combo: 'combo-1', style: { fill: 'red' } },
    ]);

    expect(controller.getChildrenData('combo-2')).toEqual([
      { id: 'node-2', data: { value: 2 }, combo: 'combo-2', style: { fill: 'green' } },
      { id: 'node-3', data: { value: 3 }, combo: 'combo-2', style: { fill: 'blue' } },
    ]);
  });

  it('getParentComboData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getParentData('node-1', 'combo')).toEqual(undefined);

    controller.updateNodeData([{ id: 'node-1', combo: 'combo-1' }]);

    expect(controller.getParentData('node-1', 'combo')).toEqual(data.combos[0]);

    expect(controller.getParentData('combo-3', 'combo')).toEqual(undefined);
  });

  it('getRelatedEdgesData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getRelatedEdgesData('node-1')).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
    ]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } }]);

    expect(controller.getRelatedEdgesData('node-1')).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
      { id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 }, style: {} },
    ]);

    expect(controller.getRelatedEdgesData('node-1', 'in')).toEqual([]);

    expect(controller.getRelatedEdgesData('node-1', 'out')).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 }, style: {} },
      { id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 }, style: {} },
    ]);
  });

  it('getNeighborNodesData', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getNeighborNodesData('node-1')).toEqual([
      { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
    ]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } }]);

    expect(controller.getNeighborNodesData('node-1')).toEqual([
      { id: 'node-2', data: { value: 2 }, combo: 'combo-1', style: { fill: 'green' } },
      { id: 'node-3', data: { value: 3 }, combo: 'combo-1', style: { fill: 'blue' } },
    ]);
  });

  it('getElementType', () => {
    const controller = new DataController();

    controller.addData(clone(data));

    expect(controller.getElementType('node-1')).toEqual('node');

    expect(controller.getElementType('edge-1')).toEqual('edge');

    expect(controller.getElementType('combo-1')).toEqual('combo');

    expect(() => {
      controller.getElementType('undefined');
    }).toThrow();
  });
});
