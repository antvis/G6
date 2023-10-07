import { Graph, Extensions, extend } from '../../../src/index';
import { TestCaseContext } from '../interface';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

export default (context: TestCaseContext, options = {}) => {
  const { watermarkerCanvas, ...pluginConfigs } = options;
  const data = {
    nodes: [
      { id: 'node1', data: { x: 100, y: 200, nodeType: 'a' } },
      { id: 'node2', data: { x: 200, y: 250, nodeType: 'b' } },
      { id: 'node3', data: { x: 200, y: 350, nodeType: 'b' } },
      { id: 'node4', data: { x: 300, y: 250, nodeType: 'c' } },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: { edgeType: 'e1' },
      },
      {
        id: 'edge2',
        source: 'node2',
        target: 'node3',
        data: { edgeType: 'e2' },
      },
      {
        id: 'edge3',
        source: 'node3',
        target: 'node4',
        data: { edgeType: 'e3' },
      },
      {
        id: 'edge4',
        source: 'node1',
        target: 'node4',
        data: { edgeType: 'e3' },
      },
    ],
  };

  const ExtGraph = extend(Graph, {
    plugins: {
      watermarker: Extensions.WaterMarker,
    },
  });
  // const testCanvas = createNodeGCanvas('canvas', 500, 500);
  const graph = new ExtGraph({
    ...context,
    type: 'graph',
    layout: {
      type: 'grid',
    },
    modes: {
      default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    plugins: [
      {
        type: 'watermarker',
        position: 'bottom',
        mode: 'image',
        begin: [10, 10],
        seperation: [10, 10],
        text: {
          texts: [
            'hello',
            'antv',
            'dasdfasdfaasdfasdfas',
            'kjadkja',
            'iy32iuhehfka',
          ],
          fill: '#f00',
          rotate: 30,
        },
        image: {
          imgURL:
            'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
          width: 94,
          height: 28,
          rotate: 40,
        },
        canvas: watermarkerCanvas,
        ...pluginConfigs,
      },
    ],
    data,
  });
  return graph;
};
