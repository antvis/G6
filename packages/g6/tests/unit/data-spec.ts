import G6, { GraphData, IGraph } from '../../src/index';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const data: GraphData = {
  nodes: [
    { id: 'node1', data: { x: 100, y: 200 } },
    { id: 'node2', data: { x: 200, y: 250 } },
    { id: 'node3', data: { x: 300, y: 200 } },
    { id: 'node4', data: { x: 300, y: 250 } },
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2', data: {} },
    { id: 'edge2', source: 'node1', target: 'node3', data: {} },
  ],
};

describe('data', () => {
  let graph: IGraph<any>;
  it('new graph with data', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data, // with data, graph will be rendered in constructor
    });
    graph.on('afterrender', () => {
      expect(graph.canvas.document.childNodes[0].childNodes.length).toBe(2);
      done();
    });
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(4);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(2);
    expect(graph.backgroundCanvas).not.toBe(undefined);
    expect(graph.transientCanvas).not.toBe(undefined);
    expect(graph.canvas).not.toBe(undefined);
  });
  it('updateData', () => {
    // === update node ===
    const node1UpdateUserData = {
      id: 'node1',
      data: {
        x: 350,
      },
    };
    graph.updateData('node', node1UpdateUserData);
    const newNode1UserData = {
      ...data.nodes[0],
      ...node1UpdateUserData,
      data: {
        ...data.nodes[0].data,
        ...node1UpdateUserData.data,
      },
    };
    const node1InnerData = graph.getNodeData('node1');
    expect(JSON.stringify(newNode1UserData)).toBe(JSON.stringify(node1InnerData));

    // === update edge data ===
    const edge2UpdateUserData = {
      id: 'edge2',
      data: {
        keyShape: {
          lineWidth: 8,
        },
      },
    };
    graph.updateData('edge', edge2UpdateUserData);
    const newEdge2UserData = {
      ...data.edges[1],
      ...edge2UpdateUserData,
      data: {
        ...data.edges[1].data,
        ...edge2UpdateUserData.data,
      },
    };
    const edge2InnerData = graph.getEdgeData('edge2');
    expect(JSON.stringify(newEdge2UserData)).toBe(JSON.stringify(edge2InnerData));
    expect(graph.itemController.itemMap['edge2'].shapeMap['keyShape'].attributes.lineWidth).toBe(
      edge2UpdateUserData.data.keyShape.lineWidth,
    );

    // === update edge source  ===
    const edge1UpdateUserData = {
      id: 'edge1',
      source: 'node3',
    };
    graph.updateData('edge', edge1UpdateUserData);
    const newSourceData = graph.getNodeData('node3');
    expect(graph.itemController.itemMap['edge1'].shapeMap['keyShape'].attributes.x1).toBe(
      newSourceData.data.x,
    );
    expect(graph.itemController.itemMap['edge1'].shapeMap['keyShape'].attributes.y1).toBe(
      newSourceData.data.y,
    );
    expect(graph.itemController.itemMap['edge1'].sourceItem).toBe(
      graph.itemController.itemMap['node3'],
    );

    // === update edge source, target, and data in the same time  ===
    const edge1UpdateUserData2 = {
      id: 'edge1',
      source: 'node1',
      target: 'node4',
      data: {
        keyShape: {
          stroke: '#f00',
        },
      },
    };
    graph.updateData('edge', edge1UpdateUserData2);
    const sourceData = graph.getNodeData('node1');
    const targetData = graph.getNodeData('node4');
    const edgeItem = graph.itemController.itemMap['edge1'];
    expect(edgeItem.shapeMap['keyShape'].attributes.x1).toBe(sourceData.data.x);
    expect(edgeItem.shapeMap['keyShape'].attributes.y1).toBe(sourceData.data.y);
    expect(edgeItem.shapeMap['keyShape'].attributes.x2).toBe(targetData.data.x);
    expect(edgeItem.shapeMap['keyShape'].attributes.y2).toBe(targetData.data.y);
    expect(edgeItem.shapeMap['keyShape'].attributes.stroke).toBe(
      edge1UpdateUserData2.data.keyShape.stroke,
    );

    // === update nodes ===
    graph.updateData('node', [
      {
        id: 'node1',
        data: {
          keyShape: {
            fill: '#0f0',
          },
        },
      },
      {
        id: 'node2',
        data: {
          keyShape: {
            lineWidth: 2,
            stroke: '#0f0',
          },
        },
      },
    ]);
    const node1Item = graph.itemController.itemMap['node1'];
    const node2Item = graph.itemController.itemMap['node2'];
    expect(node1Item.shapeMap['keyShape'].attributes.fill).toBe('#0f0');
    expect(node2Item.shapeMap['keyShape'].attributes.lineWidth).toBe(2);
    expect(node2Item.shapeMap['keyShape'].attributes.stroke).toBe('#0f0');

    // === update edges ===
    graph.updateData('edge', [
      {
        id: 'edge1',
        source: 'node2',
        data: {
          keyShape: {
            stroke: '#0f0',
          },
        },
      },
      {
        id: 'edge2',
        data: {
          keyShape: {
            lineDash: [5, 5],
          },
        },
      },
    ]);
    const edge1Item = graph.itemController.itemMap['edge1'];
    const edge2Item = graph.itemController.itemMap['edge2'];
    expect(edge1Item.shapeMap['keyShape'].attributes.stroke).toBe('#0f0');
    expect(edge1Item.sourceItem).toBe(graph.itemController.itemMap['node2']);
    expect(JSON.stringify(edge2Item.shapeMap['keyShape'].attributes.lineDash)).toBe('[5,5]');
  });
  it('addData', () => {
    graph.addData('node', {
      id: 'node5',
      data: {
        x: 300,
        y: 100,
      },
    });
    graph.addData('node', {
      id: 'node6',
      data: {
        x: 300,
        y: 200,
      },
    });
    graph.addData('edge', {
      id: 'edge3',
      source: 'node5',
      target: 'node6',
      data: {},
    });
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(6);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(3);

    // === add nodes ===
    graph.addData('node', [
      {
        id: 'node7',
        data: {
          x: 100,
          y: 400,
        },
      },
      {
        id: 'node8',
        data: {
          x: 200,
          y: 400,
        },
      },
      {
        id: 'node9',
        data: {
          x: 300,
          y: 400,
        },
      },
    ]);
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(9);
    graph.addData('edge', [
      {
        id: 'edge4',
        source: 'node7',
        target: 'node8',
        data: {},
      },
      {
        id: 'edge5',
        source: 'node8',
        target: 'node9',
        data: {},
      },
    ]);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(5);
  });
  it('removeData', () => {
    // === remove node ===
    // remoev a node, related edges will be removed in the same time
    graph.removeData('node', 'node5');
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(8);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(4);

    // === remove nodes ===
    graph.removeData('node', ['node7', 'node8']);
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(6);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(2);

    // === remove edge ===
    graph.removeData('edge', 'edge1');
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(1);
  });
  it('getNodeData', () => {
    const foundNode = graph.getNodeData('node1');
    expect(foundNode).toBe(graph.dataController.graphCore.getNode('node1'));

    const inexisNode = graph.getNodeData('inexistnode');
    expect(inexisNode).toBe(undefined);
  });
  it('getEdgeData', () => {
    const foundEdge = graph.getEdgeData('edge2');
    expect(foundEdge).toBe(graph.dataController.graphCore.getEdge('edge2'));

    const removedEdge = graph.getEdgeData('edge1');
    expect(removedEdge).toBe(undefined);

    const inexisEdge = graph.getEdgeData('inexistedge');
    expect(inexisEdge).toBe(undefined);
  });
  it('getAllNodesData getAllEdgesDat', () => {
    expect(graph.getAllNodesData().length).toBe(6);
    expect(graph.getAllEdgesData().length).toBe(1);
  });

  it('changeData with replace', () => {
    const newData = {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200 } },
        { id: 'node2', data: { x: 400, y: 450 } },
        { id: 'node11', data: { x: 300, y: 200 } },
        { id: 'node12', data: { x: 300, y: 250 } },
      ],
      edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} },
        { id: 'edge11', source: 'node1', target: 'node11', data: {} },
      ],
    };
    graph.changeData(newData, 'replace');
    expect(graph.getNodeData('node2').data.x).toBe(400);
    expect(graph.getNodeData('node2').data.y).toBe(450);
    expect(graph.getNodeData('node3')).toBe(undefined);
    expect(graph.getNodeData('node11')).not.toBe(undefined);
    expect(graph.getNodeData('node12')).not.toBe(undefined);
  });

  it('changeData with mergeReplace', () => {
    const newData = {
      nodes: [{ id: 'node13', data: { x: 50, y: 50 } }],
      edges: [{ id: 'edge1', source: 'node13', target: 'node13', data: {} }],
    };
    graph.changeData(newData, 'mergeReplace');
    const allNodes = graph.getAllNodesData();
    expect(allNodes.length).toBe(1);
    expect(allNodes[0].id).toBe('node13');

    const allEdges = graph.getAllEdgesData();
    expect(allEdges.length).toBe(1);
    expect(allEdges[0].id).toBe('edge1');
    expect(allEdges[0].source).toBe('node13');
    expect(allEdges[0].target).toBe('node13');

    graph.destroy();
    expect(graph.destroyed).toBe(true);
    // expect(graph.canvas.destroyed).toBe(true);
    // expect(graph.backgroundCanvas.destroyed).toBe(true);
    // expect(graph.transientCanvas.destroyed).toBe(true);
  });
});
