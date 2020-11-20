import G6 from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    clustering: true,
    clusterNodeStrength: -5,
    clusterEdgeDistance: 200,
    clusterNodeSize: 20,
    clusterFociStrength: 1.2,
    nodeSpacing: 5,
    preventOverlap: true,
  },
  defaultNode: {
    size: 15,
  },
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node']
  }
});

let colorMap = {
  2012: '#BDD2FD',
  2013: '#BDEFDB',
  2014: '#F6C3B7',
  2015: '#FFD8B8',
  2016: '#D3C6EA',
};

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    data.nodes.forEach((i) => {
      i.cluster = i.year;
      i.style = Object.assign(i.style || {}, {
        fill: colorMap[i.year],
      });
    });
    graph.render();

    if (window && typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });
