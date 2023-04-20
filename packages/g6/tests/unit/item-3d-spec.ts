import { Circle, DisplayObject, CanvasEvent } from '@antv/g';
import { clone } from '@antv/util';
import G6, {
  EdgeDisplayModel,
  Graph,
  GraphData,
  IGraph,
  NodeDisplayModel,
} from '../../src/index';
import { LineEdge } from '../../src/stdlib/item/edge';
import { CircleNode } from '../../src/stdlib/item/node';
import { BaseNode } from '../../src/stdlib/item/node/base';
import { NodeModelData, NodeShapeMap } from '../../src/types/node';
import { extend } from '../../src/util/extend';
import { upsertShape } from '../../src/util/shape';
import { CANVAS_EVENT_TYPE } from '../../src/types/event';
import { createCanvas } from '../../src/util/canvas';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

let CustomGraph;

describe('node item', () => {
  let graph: IGraph<any>;
  it('new graph with one node', () => {
    //done
    const nodes = [];
    for (let i = 0; i < 8; i++) {
      nodes.push({
        id: 'node-' + i,
        data: {
          x: Math.random() * 500,
          y: Math.random() * 500,
          z: Math.random() * 500,
        },
      });
    }
    const edges = [];
    for (let i = 0; i < 4; i++) {
      edges.push({
        id: 'edge1-' + i,
        source: 'node-' + i,
        target: 'node-' + (i + Math.floor(Math.random() * 4)),
        data: {},
      });
    }
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      renderer: 'webgl',
      // renderer: 'canvas',
      modes: {
        default: [
          'click-select',
          'rotate-canvas-3d',
          'zoom-canvas-3d',
          'drag-node',
        ],
      },
      data: {
        nodes,
        edges,
      },
      node: {
        type: 'sphere-node',
        // type: 'circle-node',
        keyShape: {
          opacity: 0.6,
          // materialType: 'basic',
        },
        labelShape: {
          text: 'node-label',
        },
        iconShape: {
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#f00',
          },
          labelShape: {
            fontSize: 20,
          },
        },
      },
    });

    graph.on('afterrender', (e) => {
      graph.on('node:click', (e) => {
        console.log('nodeclick');
        graph.setItemState(e.itemId, 'selected', true);
      });
    });
  });
});
