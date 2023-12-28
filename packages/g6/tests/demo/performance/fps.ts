import Stats from 'stats.js';
import { Extensions, Graph, extend } from '../../../src/index';
import { container, width } from '../../datasets/const';
import data from '../../datasets/eva-3d-data.json';

const createGraph = async () => {
  const ExtGraph = extend(Graph, {
    behaviors: {
      'brush-select': Extensions.BrushSelect,
      'hover-activate': Extensions.HoverActivate,
    },
  });

  const graph = new ExtGraph({
    container: container as HTMLElement,
    width,
    height: 1200,
    renderer: 'webgl',
    // transforms: ['transform-v4-data'],
    modes: {
      default: [
        { type: 'zoom-canvas', enableOptimize: false },
        { type: 'drag-canvas', enableOptimize: false },
        'drag-node',
        'brush-select',
        'click-select',
        {
          type: 'hover-activate',
        },
      ],
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            lineWidth: 0.5,
          },
          haloShape: {
            fill: 'red',
          },
        },
      };
    },
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          lodLevels: [],
          keyShape: {
            r: 4,
          },
          // haloShape: {},
          labelShape: {
            // text: innerModel.id,
            opacity: 0.8,
            maxWidth: '150%',
          },
          labelBackgroundShape: {},
        },
      };
    },
  });
  return graph;
};

const generateData = (nodeNum, edgeNum) => {
  const nodes = [],
    edges = [];
  for (let i = 0; i < nodeNum; i++) {
    nodes.push({
      id: `${i}`,
      data: {
        x: Math.random() * 900,
        y: Math.random() * 900,
      },
    });
  }
  for (let i = 0; i < edgeNum; i++) {
    edges.push({
      id: 'e' + i,
      source: `${Math.floor(Math.random() * nodeNum)}`,
      target: `${Math.floor(Math.random() * nodeNum)}`,
      data: {},
    });
  }
  return {
    nodes,
    edges,
  };
};

export default async () => {
  console.log(
    'graphsize: #NODE:',
    data.nodes.length,
    ', #EDGE:',
    data.edges.length,
    '#SHAPES',
    data.nodes.length * 10 + data.edges.length * 4,
  );
  const graph = await createGraph();
  // data.nodes.forEach((node) => delete node.data.z);
  // graph.read(data);

  // 1.3w items
  // fetch(
  //   'https://gw.alipayobjects.com/os/bmw-prod/f1565312-d537-4231-adf5-81cb1cd3a0e8.json',
  // ).then((res) =>
  //   res.json().then((d) => {
  //     graph.read(d);
  //   }),
  // );

  container.addEventListener('dblclick', (e) => {
    //   // 5.5w
    // fetch(
    //   'https://gw.alipayobjects.com/os/bmw-prod/f1565312-d537-4231-adf5-81cb1cd3a0e8.json',
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     data.edges.forEach((edge) => (edge.id = `edge-${Math.random()}`));
    //     graph.read(data);
    //   });
    // graph.read(generateData(200000, 100000));
    graph.read(generateData(10000, 5000));
  });

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

  console.log('graph', graph);

  return graph;
};
