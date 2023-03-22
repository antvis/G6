
import { DisplayObject } from '@antv/g';
import { clone } from '@antv/util';
import G6, { EdgeDisplayModel, Graph, GraphData, IGraph, NodeDisplayModel } from '../../src/index';
import { LineEdge } from '../../src/stdlib/item/edge';
import { CircleNode } from '../../src/stdlib/item/node';
import { BaseNode } from '../../src/stdlib/item/node/base';
import { NodeModelData, NodeShapeMap } from '../../src/types/node';
import { extend } from '../../src/util/extend';
import { upsertShape } from '../../src/util/shape';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

let CustomGraph;

describe('node item', () => {
  let graph: IGraph<any>;
  it('new graph with one node', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      renderer: 'webgl',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 200, z: 50, labelShape: { text: 'label'} },
          },
          {
            id: 'node2',
            data: { x: 200, y: 200, z: 1 },
          },
          {
            id: 'node3',
            data: { x: 300, y: 200, z: 100 },
          },
        ],
        edges: [{
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: {}
        },{
          id: 'edge2',
          source: 'node2',
          target: 'node3',
          data: {}
        }, {
          id: 'edge3',
          source: 'node1',
          target: 'node3',
          data: {}
        }]
      },
      node: {
        type: 'sphere-node',
        // type: 'circle-node'
      }
    });

    graph.on('afterrender', () => {
      // const nodeItem = graph.itemController.itemMap['node1'];
      // expect(nodeItem).not.toBe(undefined);
      // expect(nodeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
});