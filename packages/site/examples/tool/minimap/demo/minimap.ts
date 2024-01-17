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

/** minimap with string config */
const minimap1 = 'minimap';
/** minimap with object onfig and delegate type */
const minimap2 = {
  key: 'minimap2',
  type: 'minimap',
  size: [300, 200],
  mode: 'delegate',
  delegateStyle: {
    fill: 'red',
  },
  className: 'g6-minimap-2',
  viewportClassName: 'g6-minimap-viewport-2',
};
/** minimap with object onfig and keyShape type */
const minimap3 = {
  key: 'minimap3',
  type: 'minimap',
  mode: 'keyShape',
  size: [300, 200],
  className: 'g6-minimap-3',
  viewportClassName: 'g6-minimap-viewport-3',
};
new Graph({
  container,
  width,
  height,
  data,
  layout: {
    type: 'force',
  },
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => {
          return model.id;
        },
      },
    },
  },
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
  plugins: [minimap1, minimap2, minimap3],
});

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
  .g6-minimap-3 {
    position:absolute;
    bottom:40px;
    left:40px;
    box-shadow:0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }
  .g6-minimap-viewport-3 {
    border: 2px solid rgb(25, 128, 255);
  }
`);
