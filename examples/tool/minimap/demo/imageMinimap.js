import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  .g6-minimap-container {
    border: 1px solid #e2e2e2;
  }
  .g6-minimap-viewport {
    border: 2px solid rgb(25, 128, 255);
  }
`);
const width = document.getElementById('container').scrollWidth;
let height = document.getElementById('container').scrollHeight || 500;
height -= 110;
const minimap = new G6.ImageMinimap({
  height: 100,
  padding: 10,
  graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DcGMQ7AN3Z0AAAAAAAAAAABkARQnAQ'
});
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  layout: {
    type: 'dendrogram',
    direction: 'LR', // H / V / LR / RL / TB / BT
    nodeSep: 30,
    rankSep: 100,
  },
  defaultNode: {
    size: 26,
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      stroke: '#A3B1BF',
    },
  },
  modes: {
    default: ['drag-canvas', 'zoom-canvas'],
  },
  plugins: [minimap]
});

graph.node(function (node) {
  return {
    label: node.id,
    labelCfg: {
      position: node.children && node.children.length > 0 ? 'left' : 'right',
      offset: 5,
    },
  };
});


fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then(res => res.json())
  .then(data => {
    graph.data(data);
    graph.render();
  });



graph.on('canvas:click', () => {
  minimap.updateGraphImg('https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ');
});
