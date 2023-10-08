import { Graph, Extensions, extend } from '@antv/g6';
import { MapView } from '@antv/g6-plugin-map-view';

const ExtGraph = extend(Graph, {
  plugins: {
    'map-view': MapView,
  },
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
  },
});

const data = {
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
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new ExtGraph({
  container,
  width,
  height,
  data,
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

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
