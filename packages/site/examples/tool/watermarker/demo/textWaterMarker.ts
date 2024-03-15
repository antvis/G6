import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    'water-marker': Extensions.WaterMarker,
  },
});

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();

const graph = new Graph({
  container,
  width,
  height,
  data,
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-element'],
  },
  plugins: [
    {
      key: 'water-marker-plg',
      type: 'water-marker',
      mode: 'text',
      begin: [100, 50],
      separation: [50, 50],
      text: {
        texts: ['AntV G6', 'Graph Visualization'],
        lineHeight: 20,
        fontSize: 14,
        fontFamily: 'Microsoft YaHei',
        fill: 'rgba(0, 0, 0, 0.1)',
        rotate: 20,
        textAlign: 'center',
      },
    },
  ],
});

window.graph = graph;
