import { DataController } from '../../../../src/runtime/controller/data';

class Graph {
  hooks = {
    datachange: {
      tap: () => {},
    },
  };

  getRenderBBox() {
    return {
      center: [0, 0],
    };
  }
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
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    expect(controller).toBeDefined();
  });

  it('addData', () => {
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

    expect(controller.getData()).toEqual(data);

    controller.addData({
      nodes: [{ id: 'node-4', data: { value: 4 }, style: { fill: 'yellow' } }],
    });

    expect(controller.hasNode('node-4')).toBe(true);

    controller.addComboData([{ id: 'combo-2' }]);

    expect(controller.hasCombo('combo-2')).toBe(true);
    expect(controller.hasEdge('combo-2')).toBe(false);

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
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

    expect(controller.getData()).toEqual(data);

    expect(controller.getNodeData(['node-2'])).toEqual(data.nodes.slice(1, 2));

    expect(controller.getEdgeData(['edge-1'])).toEqual(data.edges.slice(0, 1));

    expect(controller.getComboData(['combo-1'])).toEqual(data.combos.slice(0, 1));
  });

  it('updateData', () => {
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

    controller.updateData({
      nodes: [{ id: 'node-1', data: { value: 2 }, style: { fill: 'pink', lineWidth: 2 } }],
      edges: [{ id: 'edge-1', data: { weight: 678 } }],
    });

    controller.addComboData([{ id: 'combo-2' }]);

    controller.updateNodeData([{ id: 'node-1', data: { value: 666 }, style: { parentId: 'combo-2' } }]);

    controller.updateNodeData([{ id: 'node-2', style: { parentId: 'combo-2' } }]);

    controller.updateEdgeData([{ id: 'edge-2', data: { weight: 666 } }]);

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
      combos: [{ id: 'combo-1' }, { id: 'combo-2' }],
    });
  });

  it('removeData', () => {
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

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

    controller.removeData({
      combos: ['combo-1'],
    });

    expect(controller.getData()).toEqual({
      nodes: [
        { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: undefined } },
        { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: undefined } },
      ],
      edges: [{ id: 'edge-2', source: 'node-2', target: 'node-3', data: { weight: 2 } }],
      combos: [],
    });
  });

  it('getChildren', () => {
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

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

  it('getRelatedEdgesData', () => {
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

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
    // @ts-expect-error expect-error
    const controller = new DataController(new Graph());

    controller.addData(structuredClone(data));

    expect(controller.getNeighborNodesData('node-1')).toEqual([
      { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
    ]);

    controller.addEdgeData([{ id: 'edge-3', source: 'node-1', target: 'node-3', data: { weight: 3 } }]);

    expect(controller.getNeighborNodesData('node-1')).toEqual([
      { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
      { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
    ]);
  });

  it('translateComboBy', (done) => {
    const graph = new Graph();
    Object.assign(graph, {
      getComboChildrenData: (id) => {
        if (id === 'combo-1')
          return [
            { id: 'node-2', data: { value: 2 }, style: { fill: 'green', parentId: 'combo-1' } },
            { id: 'node-3', data: { value: 3 }, style: { fill: 'blue', parentId: 'combo-1' } },
          ];
        return [];
      },
    });
    // @ts-expect-error expect-error
    const controller = new DataController(graph);

    controller.addData(structuredClone(data));

    controller.model.once('changed', (event) => {
      expect(event.changes).toEqual([
        { type: 'NodeDataUpdated', id: 'combo-1', propertyName: 'id', oldValue: 'combo-1', newValue: 'combo-1' },
        { type: 'NodeDataUpdated', id: 'combo-1', propertyName: 'style', newValue: { x: 100, y: 100, z: 0 } },
      ]);

      done();
    });

    controller.translateComboBy(['combo-1'], [100, 100]);
  });
});
