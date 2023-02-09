import { CanvasEvent } from '@antv/g';
import G6, { GraphData, IGraph } from '../../src/index'
import { Graph as GraphLib, ID } from "@antv/graphlib";
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
    { id: 'edge2', source: 'node1', target: 'node3', data: {} }
  ]
}

xdescribe('graphlib', () => {
  it('xx', () => {
    const graphLib = new GraphLib<any, any>({
      ...data,
      onChanged: event => {
        console.log('event', event.changes);
      }
    })
  })
});

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
      }
    };
    graph.updateData('node', node1UpdateUserData);
    const newNode1UserData = {
      ...data.nodes[0],
      ...node1UpdateUserData,
      data: {
        ...data.nodes[0].data,
        ...node1UpdateUserData.data
      }
    }
    const node1InnerData = graph.getNodeData('node1');
    console.log('node1InnerData', node1InnerData)
    expect(JSON.stringify(newNode1UserData)).toBe(JSON.stringify(node1InnerData));

    // // === update edge ===
    // const edge2UpdateUserData = {
    //   id: 'edge2',
    //   source: 'node2',
    //   data: {
    //     keyShape: {
    //       lineWidth: 2
    //     }
    //   }
    // }
    // graph.updateData('edge', edge2UpdateUserData);
    // const newEdge2UserData = {
    //   ...data.edges[1],
    //   ...edge2UpdateUserData,
    //   data: {
    //     ...data.edges[1].data,
    //     ...edge2UpdateUserData.data
    //   }
    // }
    // const edge2InnerData = graph.getEdgeData('edge2');
    // expect(JSON.stringify(newEdge2UserData)).toBe(JSON.stringify(edge2InnerData));

    // // === update nodes ===
    // graph.updateData('node', [

    // ])

  });
  it('addData', () => {
    graph.addData('node', {
      id: 'node5',
      data: {
        x: 300,
        y: 100,
      }
    });
    graph.addData('node', {
      id: 'node6',
      data: {
        x: 300,
        y: 200,
      }
    });
    graph.addData('edge', {
      id: 'edge3',
      source: 'node5',
      target: 'node6',
      data: {}
    });
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(6);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(3);
  });
  xit('removeData', () => {
    // remoev a node, related edges will be removed in the same time
    graph.removeData('node', ['node5']);
    expect(graph.dataController.graphCore.getAllNodes().length).toBe(3);
    expect(graph.dataController.graphCore.getAllEdges().length).toBe(1);
  });
});
