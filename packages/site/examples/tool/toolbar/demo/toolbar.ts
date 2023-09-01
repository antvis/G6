import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    toolbar: Extensions.Toolbar,
  },
});

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(6).circle();
const layout = {
  type: 'grid',
};

new Graph({
  container: 'container',
  width,
  height,
  data,
  layout,
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  plugins: [{ type: 'toolbar', key: 'toolbar-1' }],
});
