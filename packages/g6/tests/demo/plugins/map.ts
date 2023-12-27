import { MapView } from '@antv/g6-plugin-map-view';
import { Extensions, Graph, extend } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const ExtGraph = extend(Graph, {
    plugins: {
      'map-view': MapView,
    },
    behaviors: {
      'hover-activate': Extensions.HoverActivate,
    },
  });

  const graph = new ExtGraph({
    ...context,
    data: {
      nodes: [
        {
          id: 'node1',
          data: {
            x: 100,
            y: 200,
            nodeType: 'a',
            lng: 91.111891,
            lat: 29.662557,
            keyShape: {
              fill: '#f00',
              r: 30,
            },
            labelShape: {
              text: 'xxx',
            },
          },
        },
        {
          id: 'node2',
          data: {
            x: 200,
            y: 250,
            nodeType: 'b',
            lng: 97.342625,
            lat: 37.373799,
            keyShape: {
              fill: '#f0f',
              r: 24,
            },
          },
        },
        {
          id: 'node3',
          data: {
            x: 200,
            y: 350,
            nodeType: 'b',
            lng: 104.067923,
            lat: 23.679943,
            keyShape: {
              opacity: 0.5,
            },
          },
        },
        {
          id: 'node4',
          data: {
            x: 300,
            y: 250,
            nodeType: 'c',
            lng: 106.530635,
            lat: 29.544606,
          },
        },
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
    },
    plugins: ['map-view'],
    modes: {
      default: [
        {
          type: 'drag-node',
        },
        'zoom-canvas',
        'drag-canvas',
        'click-select',
        'hover-activate',
      ],
    },
  });
  graph.on('canvas:click', (e) => {
    // graph.hideItem('node1');
    graph.updateData('node', {
      id: 'node1',
      data: {
        keyShape: {
          fill: '#00f',
        },
      },
    });
  });
  return graph;
};
