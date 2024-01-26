import { clone } from '@antv/util';
import { DataController } from '../../../src/runtime/data';

class Graph {}
function newGraph() {
  return new Graph() as any;
}

const data = {
  nodes: [
    { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } },
    { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
    { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
  ],
  edges: [
    { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
    { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 } },
  ],
  combos: [{ id: 'combo-1' }],
};

describe('DataController', () => {
  it('init', () => {
    const controller = new DataController(newGraph());

    expect(controller).toBeDefined();
    expect(controller.graph).toBeInstanceOf(Graph);
    expect(controller.model).toBeDefined();
  });

  it('empty data', () => {
    const controller = new DataController(newGraph());

    expect(controller.getData()).toEqual({ nodes: [], edges: [], combos: [] });

    controller.addComboData([{ id: 'combo-1' }]);

    expect(controller.getComboData(['combo-1'])).toEqual([{ id: 'combo-1' }]);
  });

  it('setData', () => {
    const controller = new DataController(newGraph());

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
    const controller = new DataController(newGraph());

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

    controller.addNodeData([{ id: 'node-5', data: { value: 5 }, style: { fill: 'black', parentId: 'combo-2' } }]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-5', data: { weight: 3 } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } },
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
        { id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } },
        { id: 'node-5', data: { value: 5 }, style: { fill: 'black', parentId: 'combo-2' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 } },
        { id: 'edge-3', source: 'node-1', target: 'node-5', data: { weight: 3 } },
      ],
      combos: [{ id: 'combo-1' }, { id: 'combo-2' }],
    });
  });

  it('getData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getData()).toEqual(data);

    expect(controller.getNodeData(['node-2'])).toEqual(data.nodes.slice(1, 2));

    expect(controller.getEdgeData(['edge-1'])).toEqual(data.edges.slice(0, 1));

    expect(controller.getComboData(['combo-1'])).toEqual(data.combos.slice(0, 1));
  });

  it('updateData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    controller.updateData({
      nodes: [{ id: 'node-1', data: { value: 2 }, style: { fill: 'pink', lineWidth: 2 } }],
      edges: [{ id: 'edge-1', data: { weight: 678 } }],
    });

    controller.addComboData([{ id: 'combo-2' }]);

    controller.updateNodeData([{ id: 'node-1', data: { value: 666 }, style: { parentId: 'combo-2' } }]);

    controller.updateNodeData([{ id: 'node-2', style: { parentId: 'combo-2' } }]);

    controller.updateEdgeData([{ id: 'edge-2', data: { weight: 666 } }]);

    controller.updateComboData([{ id: 'combo-1', data: { value: 100 }, style: { stroke: 'blue' } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: { value: 666 }, style: { fill: 'pink', lineWidth: 2, parentId: 'combo-2' } },
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-2' } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 678 } },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 666 } },
      ],
      combos: [{ id: 'combo-1', data: { value: 100 }, style: { stroke: 'blue' } }, { id: 'combo-2' }],
    });
  });

  it('updateNodeData', () => {
    const controller = new DataController(newGraph());
    controller.addNodeData([{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }]);
    // no changes
    controller.updateNodeData([{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }]);

    expect(controller.getNodeData()).toEqual([{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }]);
  });

  it('updateEdgeData', () => {
    const controller = new DataController(newGraph());
    controller.addData({
      nodes: [{ id: 'node-1' }, { id: 'node-2' }],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } }],
    });
    // no changes
    controller.updateEdgeData([{ id: 'edge-1', data: { weight: 1 } }]);

    expect(controller.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
    ]);

    // update source
    controller.updateEdgeData([{ id: 'edge-1', source: 'node-2' }]);

    expect(controller.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-2', target: 'node-2', data: { weight: 1 } },
    ]);

    // update target
    controller.updateEdgeData([{ id: 'edge-1', target: 'node-1' }]);
    expect(controller.getEdgeData()).toEqual([
      { id: 'edge-1', source: 'node-2', target: 'node-1', data: { weight: 1 } },
    ]);
  });

  it('updateComboData', () => {
    const data = {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, parentId: 'combo-1' } },
        { id: 'node-2', style: { x: 100, y: 100, parentId: 'combo-1' } },
      ],
      combos: [
        {
          id: 'combo-1',
          style: { x: 0, y: 0 },
        },
        { id: 'combo-2' },
      ],
    };

    const controller = new DataController(newGraph());

    controller.addData(data);

    controller.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }]);

    // no changes
    controller.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', style: { x: 150, y: 150, z: 0, parentId: 'combo-1' } },
        { id: 'node-2', style: { x: 200, y: 200, z: 0, parentId: 'combo-1' } },
      ],
      edges: [],
      combos: [{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }, { id: 'combo-2' }],
    });

    controller.updateComboData([{ id: 'combo-1', style: { fill: 'pink' } }]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', style: { x: 150, y: 150, z: 0, parentId: 'combo-1' } },
        { id: 'node-2', style: { x: 200, y: 200, z: 0, parentId: 'combo-1' } },
      ],
      edges: [],
      combos: [{ id: 'combo-1', style: { x: 100, y: 100, z: 0, fill: 'pink' } }, { id: 'combo-2' }],
    });

    controller.updateComboData([{ id: 'combo-2' }]);
  });

  it('translateComboBy', () => {
    const controller = new DataController(newGraph());

    controller.addData({
      nodes: [{ id: 'node-1', style: { parentId: 'combo-1' } }],
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboBy(['combo-1'], [100, 100]);

    expect(controller.getData()).toEqual({
      nodes: [{ id: 'node-1', style: { parentId: 'combo-1', x: 100, y: 100, z: 0 } }],
      combos: [{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }],
      edges: [],
    });
  });

  it('translateComboBy with children', () => {
    const controller = new DataController(newGraph());

    controller.addData({
      nodes: [
        { id: 'node-1' },
        { id: 'node-2', style: { y: 50, fill: 'green', parentId: 'combo-1' } },
        { id: 'node-3', style: { x: 100, y: 100, fill: 'blue', parentId: 'combo-1' } },
      ],
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboBy(['combo-1'], [66, 67]);

    expect(controller.getNodeData()).toEqual([
      { id: 'node-1' },
      { id: 'node-2', style: { x: 66, y: 117, z: 0, fill: 'green', parentId: 'combo-1' } },
      { id: 'node-3', style: { x: 166, y: 167, z: 0, fill: 'blue', parentId: 'combo-1' } },
    ]);
  });

  it('translateComboBy without children', () => {
    const controller = new DataController(newGraph());

    controller.addData({
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboBy(['combo-1'], [100, 100]);

    expect(controller.getData()).toEqual({
      nodes: [],
      edges: [],
      combos: [{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }],
    });
  });

  it('translateComboTo', () => {
    const controller = new DataController(newGraph());

    controller.addData({
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-1' } },
        { id: 'node-2', style: { parentId: 'combo-1', x: 10, y: 10 } },
      ],
      combos: [{ id: 'combo-1' }],
    });

    controller.translateComboTo(['combo-1'], [100, 100]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-1', x: 100, y: 100, z: 0 } },
        { id: 'node-2', style: { parentId: 'combo-1', x: 110, y: 110, z: 0 } },
      ],
      combos: [{ id: 'combo-1', style: { x: 100, y: 100, z: 0 } }],
      edges: [],
    });
  });

  it('removeData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    controller.removeData({
      nodes: ['node-1'],
      edges: ['edge-1'],
      // combos: ['combo-1'],
    });

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
      ],
      edges: [{ id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 } }],
      combos: [{ id: 'combo-1' }],
    });

    controller.removeComboData(['combo-1']);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: undefined } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: undefined } },
      ],
      edges: [{ id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 } }],
      combos: [],
    });

    controller.removeEdgeData([]);

    controller.removeEdgeData(['edge-2']);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: undefined } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: undefined } },
      ],
      edges: [],
      combos: [],
    });

    controller.removeNodeData();

    controller.removeNodeData(['node-2']);

    expect(controller.getData()).toEqual({
      nodes: [{ id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: undefined } }],
      edges: [],
      combos: [],
    });
  });

  it('removeComboData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getParentComboData('node-2')).toEqual(data.combos[0]);

    controller.removeComboData(['combo-1']);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', data: { value: 1 }, style: { fill: 'red' } },
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: undefined } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: undefined } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
        { id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 } },
      ],
      combos: [],
    });

    expect(controller.getParentComboData('node-2')).toEqual(undefined);
  });

  it('removeComboData with children', () => {
    const data = {
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-1' } },
        { id: 'node-2', style: { parentId: 'combo-1' } },
        { id: 'node-3', style: { parentId: 'combo-1' } },
      ],
      combos: [{ id: 'combo-1', style: { parentId: 'combo-2' } }, { id: 'combo-2' }],
    };

    const controller = new DataController(newGraph());

    controller.addData(data);

    expect(controller.getParentComboData('node-1')).toEqual(data.combos[0]);
    expect(controller.getParentComboData('combo-1')).toEqual(data.combos[1]);

    controller.removeComboData(['combo-1']);

    expect(controller.getParentComboData('node-1')).toEqual(data.combos[1]);

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-2' } },
        { id: 'node-2', style: { parentId: 'combo-2' } },
        { id: 'node-3', style: { parentId: 'combo-2' } },
      ],
      edges: [],
      combos: [{ id: 'combo-2' }],
    });
  });

  it('getElementData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getElementsData(['node-1'])[0]).toEqual(data.nodes[0]);

    expect(controller.getElementsData(['edge-1'])[0]).toEqual(data.edges[0]);

    expect(controller.getElementsData(['combo-1'])[0]).toEqual(data.combos[0]);

    expect(controller.getElementsData(['undefined'])[0]).toEqual(undefined);
  });

  it('getNodeLikeData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getNodeLikeData(['node-1'])[0]).toEqual(data.nodes[0]);

    expect(controller.getNodeLikeData(['edge-1'])[0]).toEqual(undefined);

    expect(controller.getNodeLikeData(['combo-1'])[0]).toEqual(data.combos[0]);

    expect(controller.getNodeLikeData()).toEqual([...data.combos, ...data.nodes]);
  });

  it('classifyNodeLikeData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));
    expect(controller.classifyNodeLikeData([...data.combos, ...data.nodes])).toEqual({
      nodes: data.nodes,
      combos: data.combos,
    });
  });

  it('hasNode', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.hasNode('node-1')).toBe(true);
    expect(controller.hasNode('node-4')).toBe(false);
  });

  it('hasEdge', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.hasEdge('edge-1')).toBe(true);
    expect(controller.hasEdge('edge-4')).toBe(false);
  });

  it('hasCombo', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.hasCombo('combo-1')).toBe(true);
    expect(controller.hasCombo('combo-4')).toBe(false);
  });

  it('getComboChildrenData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getComboChildrenData('combo-undefined')).toEqual([]);

    expect(controller.getComboChildrenData('combo-1')).toEqual(data.nodes.slice(1));

    controller.updateNodeData([{ id: 'node-1', style: { parentId: 'combo-1' } }]);

    expect(controller.getComboChildrenData('combo-1')?.sort((a, b) => (a.id < b.id ? -1 : 1))).toEqual([
      { id: 'node-1', data: { value: 1 }, style: { fill: 'red', parentId: 'combo-1' } },
      { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
      { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
    ]);

    controller.addComboData([{ id: 'combo-2' }]);

    controller.updateNodeData([
      { id: 'node-2', style: { parentId: 'combo-2' } },
      { id: 'node-3', style: { parentId: 'combo-2' } },
    ]);

    expect(controller.getComboChildrenData('combo-1')).toEqual([
      { id: 'node-1', data: { value: 1 }, style: { fill: 'red', parentId: 'combo-1' } },
    ]);

    expect(controller.getComboChildrenData('combo-2')).toEqual([
      { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-2' } },
      { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-2' } },
    ]);
  });

  it('getParentComboData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getParentComboData('node-1')).toEqual(undefined);

    controller.updateNodeData([{ id: 'node-1', style: { parentId: 'combo-1' } }]);

    expect(controller.getParentComboData('node-1')).toEqual(data.combos[0]);

    expect(controller.getParentComboData('combo-3')).toEqual(undefined);
  });

  it('getRelatedEdgesData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getRelatedEdgesData('node-1')).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
    ]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } }]);

    expect(controller.getRelatedEdgesData('node-1')).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
      { id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } },
    ]);

    expect(controller.getRelatedEdgesData('node-1', 'in')).toEqual([]);

    expect(controller.getRelatedEdgesData('node-1', 'out')).toEqual([
      { id: 'edge-1', source: 'node-1', target: 'node-2', data: { weight: 1 } },
      { id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } },
    ]);
  });

  it('getNeighborNodesData', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getNeighborNodesData('node-1')).toEqual([
      { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
    ]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } }]);

    expect(controller.getNeighborNodesData('node-1')).toEqual([
      { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
      { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
    ]);
  });

  it('getElementType', () => {
    const controller = new DataController(newGraph());

    controller.addData(clone(data));

    expect(controller.getElementType('node-1')).toEqual('node');

    expect(controller.getElementType('edge-1')).toEqual('edge');

    expect(controller.getElementType('combo-1')).toEqual('combo');

    expect(controller.getElementType('undefined')).toEqual('unknown');
  });
});
