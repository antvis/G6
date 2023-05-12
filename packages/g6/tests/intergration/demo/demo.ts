import G6 from '../../../src/index';
import {
  BadgePosition,
  IBadgePosition,
  ShapeStyle,
} from '../../../src/types/item';
import { container, height, width } from '../../datasets/const';
import data from './data';
import { labelPropagation } from '@antv/algorithm';

const nodeIds = [];
const nodes = data.nodes
  .map((node) => {
    const id = node.id || `node-${Math.random()}`;
    if (nodeIds.includes(id)) return;
    nodeIds.push(id);
    return {
      id: id as string,
      data: {
        // x: node.x * 10 - 2700,
        // y: node.y * 10 - 3000,
        x: node.x * 10 - 3000,
        y: node.y * 10 - 5000,
        z: Math.random() * 1000,
      },
    };
  })
  .filter(Boolean);

const edges = data.edges.map((edge) => {
  return {
    id: `edge-${Math.random()}`,
    source: edge.source,
    target: edge.target,
    data: {},
  };
});
const clusteredData = labelPropagation({ nodes, edges }, false);
console.log('clusteredData', clusteredData);

clusteredData.clusters.forEach((cluster, i) => {
  cluster.nodes.forEach((node) => {
    node.data.cluster = `c${i}`;
  });
});

export default () => {
  console.log('nodesedges', nodes, edges);
  const graph = new G6.Graph({
    container: container as HTMLElement,
    width,
    height: 1400,
    type: 'graph',

    renderer: 'webgl-3d',
    layout: {
      type: 'force',
      dimensions: 3,
      // iterations: 100,
      minMovement: 10,
      center: [width / 2, height / 2, 0],
    },
    modes: {
      default: [
        {
          type: 'orbit-canvas-3d',
          trigger: 'drag',
        },
        'zoom-canvas-3d',
      ],
    },

    data: { nodes, edges },
    // fitView: true,
    // modes: {
    //   default: [
    //     'zoom-canvas',
    //     // @ts-ignore
    //     {
    //       type: 'drag-canvas',
    //       scalableRange: 0.9,
    //     },
    //     'drag-node',
    //   ],
    // },
    // @ts-ignore
    theme: {
      type: 'spec',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
      },
    },
    edge: {
      keyShape: {
        lineWidth: 0.5,
        opacity: 0.2,
      },
      type: 'line-edge',
    },
    // (innerModel) => {
    //   return {
    //     ...innerModel,
    //     data: {
    //       // keyShape: {
    //       //   lineDash: undefined
    //       // },
    //       ...innerModel.data,
    //       keyShape: {
    //         lineWidth: 2,
    //         stroke: 'grey',
    //       },
    //       type: 'line-edge',
    //       // labelShape: {
    //       //   position: 'end',
    //       //   text: 'edge-label',
    //       // },
    //       // labelBackgroundShape: {
    //       //   fill: '#fff',
    //       // },
    //       // animates: {
    //       //   buildIn: [
    //       //     {
    //       //       fields: ['opacity'],
    //       //       duration: 300,
    //       //       delay: 1000 + Math.random() * 1000,
    //       //     },
    //       //   ],
    //       // },
    //     },
    //   };
    // },
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          type: 'sphere-node',
          // animates: {
          //   buildIn: [
          //     {
          //       fields: ['opacity'],
          //       duration: 1000,
          //       delay: 1000 + Math.random() * 1000,
          //     },
          //   ],
          //   hide: [
          //     {
          //       fields: ['size'],
          //       duration: 200,
          //     },
          //     {
          //       fields: ['opacity'],
          //       duration: 200,
          //       shapeId: 'keyShape',
          //     },
          //     {
          //       fields: ['opacity'],
          //       duration: 200,
          //       shapeId: 'labelShape',
          //     },
          //   ],
          //   show: [
          //     {
          //       fields: ['size'],
          //       duration: 200,
          //     },
          //     {
          //       fields: ['opacity'],
          //       duration: 200,
          //       shapeId: 'keyShape',
          //       order: 0,
          //     },
          //   ],
          // },
          // animate in shapes, unrelated to each other, excuted parallely
          keyShape: {
            r: 12,
          },
          // iconShape: {
          //   img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          //   fill: '#fff',
          // },
          // labelShape: {
          //   text: innerModel.id,
          //   opacity: 0.8,
          //   maxWidth: '150%',
          // },
          // labelBackgroundShape: {},
        },
      };
    },
  });
  // graph.zoom(0.25);
  graph.zoom(0.15);
  return graph;
};
