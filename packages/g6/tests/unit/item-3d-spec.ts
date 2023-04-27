import G6, { IGraph } from '../../src/index';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

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
      renderer: 'webgl-3d',
      // renderer: 'canvas',
      modes: {
        default: [
          'click-select',
          'track-canvas-3d',
          'zoom-canvas-3d',
          // 'rotate-canvas-3d',
          // 'zoom-canvas-3d',
          // 'drag-node',
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
        graph.setItemState(e.itemId, 'selected', true);
      });
    });
  });
});
