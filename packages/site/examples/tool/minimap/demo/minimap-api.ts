import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    minimap: Extensions.Minimap,
  },
});

import insertCss from 'insert-css';

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const data = Util.mock(20).random();

const graph = new Graph({
  container,
  width,
  height,
  data,
  layout: {
    type: 'force',
  },
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
});

graph.addPlugins([
  {
    key: 'minimap1',
    type: 'minimap',
    mode: 'delegate',
  },
  {
    key: 'minimap2',
    type: 'minimap',
    mode: 'keyShape',
    className: 'g6-minimap-2',
  },
]);

/** set the style of minimap  */
insertCss(`
  .g6-minimap-2 {
    position:absolute;
    bottom:40px;
    right:40px;
    box-shadow:0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }
  .g6-minimap-viewport-2 {
    border: 2px solid rgb(25, 128, 255);
  }
   
`);
