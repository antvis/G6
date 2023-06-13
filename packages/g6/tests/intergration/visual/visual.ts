import { ForceLayout, FruchtermanLayout } from '@antv/layout-wasm';
import G6 from '../../../src/index';
import { IBadgePosition } from '../../../src/types/item';
import { container, width } from '../../datasets/const';

const createGraph = () => {
  G6.stdLib.layouts['force-wasm'] = ForceLayout;
  G6.stdLib.layouts['fruchterman-wasm'] = FruchtermanLayout;
  const graph = new G6.Graph({
    container: container as HTMLElement,
    width,
    height: 1200,
    type: 'graph',
    // renderer: 'webgl',
    data: {
      nodes: [
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
      ],
      edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} },
        { id: 'edge2', source: 'node1', target: 'node3', data: {} },
        { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      ],
    },
    layout: {
      type: 'grid',
    },
    modes: {
      default: [
        'zoom-canvas',
        'drag-canvas',
        'drag-node',
        'brush-select',
        'click-select',
        'hover-activate',
      ],
    },
    theme: {
      type: 'spec',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
      },
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            lineWidth: 0.5,
          },
          haloShape: {},
          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                shapeId: 'keyShape',
                duration: 500,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            update: [
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                shapeId: 'haloShape',
              },
            ],
          },
        },
      };
    },
    node: (innerModel) => {
      const badgeShapes = {
        0: {
          text: '核心人员',
          position: 'left' as IBadgePosition,
          // color: '#7E92B5',
        },
        1: {
          text: 'A',
          position: 'leftTop' as IBadgePosition,
          // color: '#F86254',
        },
        2: {
          text: 'B',
          position: 'leftBottom' as IBadgePosition,
          // color: '#EDB74B',
        },
      };

      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          lodStrategy: {
            levels: [
              { zoomRange: [0, 0.5] }, // -1
              { zoomRange: [0.5, 1], primary: true }, // 0
              { zoomRange: [1, 1.5] }, // 1
              { zoomRange: [1.5, 1] }, // 2
              { zoomRange: [2, Infinity] }, // 3
            ],
            animateCfg: {
              duration: 500,
            },
          },

          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                duration: 500,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            hide: [
              {
                fields: ['size'],
                duration: 200,
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'labelShape',
              },
            ],
            show: [
              {
                fields: ['size'],
                duration: 200,
              },
              {
                fields: ['opacity'],
                duration: 200,
                shapeId: 'keyShape',
                order: 0,
              },
            ],
            update: [
              {
                fields: ['fill', 'r'],
                shapeId: 'keyShape',
              },
              {
                fields: ['lineWidth'],
                shapeId: 'keyShape',
                duration: 100,
              },
              {
                fields: ['fontSize'],
                shapeId: 'iconShape',
              },
              {
                fields: ['opacity'], // 'r' error, 'lineWidth' has no effect
                shapeId: 'haloShape',
              },
            ],
          },
          haloShape: {},
          // animate in shapes, unrelated to each other, excuted parallely
          keyShape: {
            r: innerModel.data.size ? innerModel.data.size / 2 : 15,
          },
          iconShape: {
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            fill: '#fff',
            fontSize: innerModel.data.size ? innerModel.data.size / 3 + 5 : 13,
          },
          labelShape: {
            text: `${innerModel.id}xasdfasdfasdfa`,
            opacity: 0.8,
            maxWidth: '150%',
          },
          labelBackgroundShape: {},
          badgeShapes,
        },
      };
    },
  });
  return graph;
};

export default () => {
  let graph = createGraph();
  graph.zoom(2, { x: 0, y: 0 });
  return graph;
};
