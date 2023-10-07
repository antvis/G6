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
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
  plugins: [
    {
      key: 'water-marker-plg',
      type: 'water-marker',
      begin: [0, 50],
      image: {
        imgURL: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
        width: 94,
        height: 28,
        rotate: 30,
      },
    },
  ],
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
