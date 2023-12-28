import G6 from '@antv/G6';
import { labelPropagation } from '@antv/algorithm';
import Stats from 'stats.js';
import { container, width } from '../../datasets/const';
import data from './data.json';

const nodeIds = [];

const edges = data.edges.map((edge) => {
  return {
    id: `edge-${Math.random()}`,
    source: edge.source,
    target: edge.target,
    data: {},
  };
});

const degrees = {};
edges.forEach((edge) => {
  const { source, target } = edge;
  degrees[source] = degrees[source] || 0;
  degrees[target] = degrees[target] || 0;
  degrees[source]++;
  degrees[target]++;
});

const nodes = data.nodes
  .map((node) => {
    const id = node.id || `node-${Math.random()}`;
    if (nodeIds.includes(id)) return;
    nodeIds.push(id);
    return {
      id: id as string,
      // label: node.olabel,
      x: node.x * 10 - 3000,
      y: node.y * 10 - 5000,
      icon: {
        show: true,
        img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        width: 12 + degrees[id] / 4,
        height: 12 + degrees[id] / 4,
        opacity: 0.8,
      },
    };
  })
  .filter(Boolean);

const clusteredData = labelPropagation({ nodes, edges }, false);

const subjectColors = [
  '#5F95FF', // blue
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];
const colorSets = G6.Util.getColorSetsBySubjectColors(subjectColors, '#fff', 'default', '#777');

clusteredData.clusters.forEach((cluster, i) => {
  const colorSet = colorSets[i % colorSets.length];
  cluster.nodes.forEach((node) => {
    node.cluster = `c${i}`;
    node.style = {
      fill: colorSet.mainFill,
      stroke: colorSet.mainStroke,
      r: 12 + degrees[node.id] / 4,
    };
  });
});

const create2DGraph = () => {
  const graph = new G6.Graph({
    container: container,
    width,
    height: 800,
    fitView: true,
    minZoom: 0.0001,
    modes: {
      default: [
        { type: 'zoom-canvas' },
        // @ts-ignore
        {
          type: 'drag-canvas',
          enableOptimize: false,
        },
        'drag-node',
        'brush-select',
      ],
    },
  });
  graph.read({ nodes, edges });
  // graph.zoom(0.15);
  return graph;
};

export default () => {
  const graph = create2DGraph();
  // stats
  const stats = new Stats();
  stats.showPanel(0);
  const $stats = stats.dom;
  $stats.style.position = 'absolute';
  $stats.style.left = '0px';
  $stats.style.top = '0px';
  document.body.appendChild($stats);
  const update = () => {
    if (stats) {
      stats.update();
    }
    requestAnimationFrame(update);
  };
  update();

  return graph;
};
