import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    snapline: Extensions.Snapline,
  },
  layouts: {
    random: Extensions.RandomLayout,
  },
});

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();

new Graph({
  container,
  width,
  height,
  data,
  layout: {
    type: 'random',
  },
  modes: {
    default: [
      'zoom-canvas',
      'drag-canvas',
      {
        type: 'drag-node',
        // TODO: snapline with drag-node enableTransient: true (default) has bug now, use enableTransient: false instead temporary
        enableTransient: false,
      },
    ],
  },
  node: {
    type: 'rect-node',
    keyShape: {
      width: 50,
      height: 20,
    },
  },
  plugins: [
    {
      key: 'default-grid',
      type: 'snapline',
    },
  ],
});
