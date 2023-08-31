import { Graph, Extensions } from '@antv/g6';
// import by this way in your project. 在您的项目中请这样引入
// import { Graph as GraphCore } from '@antv/graphlib';

const { Graph: GraphCore } = window.GraphLib;

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
        subGraph: '1',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
        subGraph: '1',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
        subGraph: '1',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
        subGraph: '1',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
        subGraph: '1',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
        subGraph: '1',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
        subGraph: '1',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
        subGraph: '1',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
        subGraph: '1',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
        subGraph: '1',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
        subGraph: '1',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
        subGraph: '1',
      },
    },
    {
      id: '12',
      data: {
        label: '12',
        subGraph: '0',
      },
    },
    {
      id: '13',
      data: {
        label: '13',
        subGraph: '1',
      },
    },
    {
      id: '14',
      data: {
        label: '14',
        subGraph: '1',
      },
    },
    {
      id: '15',
      data: {
        label: '15',
        subGraph: '1',
      },
    },
    {
      id: '16',
      data: {
        label: '16',
        subGraph: '0',
      },
    },
    {
      id: '17',
      data: {
        label: '17',
        subGraph: '0',
      },
    },
    {
      id: '18',
      data: {
        label: '18',
        subGraph: '0',
      },
    },
    {
      id: '19',
      data: {
        label: '19',
        subGraph: '0',
      },
    },
    {
      id: '20',
      data: {
        label: '20',
        subGraph: '0',
      },
    },
    {
      id: '21',
      data: {
        label: '21',
        subGraph: '0',
      },
    },
    {
      id: '22',
      data: {
        label: '22',
        subGraph: '0',
      },
    },
    {
      id: '23',
      data: {
        label: '23',
        subGraph: '0',
      },
    },
    {
      id: '24',
      data: {
        label: '24',
        subGraph: '0',
      },
    },
    {
      id: '25',
      data: {
        label: '25',
        subGraph: '0',
      },
    },
    {
      id: '26',
      data: {
        label: '26',
        subGraph: '0',
      },
    },
    {
      id: '27',
      data: {
        label: '27',
        subGraph: '0',
      },
    },
    {
      id: '28',
      data: {
        label: '28',
        subGraph: '0',
      },
    },
    {
      id: '29',
      data: {
        label: '29',
        subGraph: '0',
      },
    },
    {
      id: '30',
      data: {
        label: '30',
        subGraph: '0',
      },
    },
    {
      id: '31',
      data: {
        label: '31',
        subGraph: '0',
      },
    },
    {
      id: '32',
      data: {
        label: '32',
        subGraph: '0',
      },
    },
    {
      id: '33',
      data: {
        label: '33',
        subGraph: '0',
      },
    },
  ],
  edges: [
    {
      id: 'edge-179',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-811',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-168',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-430',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-492',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-261',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-794',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-898',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-719',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-114',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-514',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-248',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-913',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-472',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-986',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-356',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-776',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-650',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-949',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-531',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-869',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-777',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-339',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-122',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-691',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-484',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-300',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-493',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-626',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-134',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-316',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-212',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-195',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-639',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-742',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-113',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-538',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-301',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-449',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-541',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-138',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-841',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-881',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-854',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-255',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-945',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-119',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-700',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-327',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-685',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-359',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-930',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-998',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-796',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-518',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-778',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-851',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-483',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-335',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-689',
      source: '32',
      target: '33',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new Graph({
  container: 'container',
  width,
  height,
  autoFit: 'view',
  modes: {
    default: ['drag-node', 'zoom-canvas', 'drag-canvas', 'click-select'],
  },
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  node: {
    labelBackgroundShape: {},
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 20]);
  };

const btn = document.createElement('a');
btn.style.position = 'absolute';
btn.innerHTML = '👉 Layout Subgraph';
btn.style.fontSize = '20px';
btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
btn.style.border = '2px solid #873bf4';
btn.style.padding = '4px 8px';
container.appendChild(btn);
btn.addEventListener('click', async () => {
  const subGridLayout = new Extensions.GridLayout({
    begin: [width / 5, height / 5],
  });
  const subgraphNodes0 = graph.getAllNodesData().filter((node) => node.data.subGraph === '0');
  const subgraphData0 = {
    nodes: subgraphNodes0,
    edges: graph
      .getAllEdgesData()
      .filter(
        (edge) =>
          subgraphNodes0.find((node) => node.id === edge.source) &&
          subgraphNodes0.find((node) => node.id === edge.target),
      ),
  };
  const gridPositions = await subGridLayout.execute(new GraphCore(subgraphData0));
  graph.updateNodePosition(gridPositions.nodes);

  const subForceLayout = new Extensions.ForceLayout({
    center: [(width / 3) * 2, (height / 3) * 2],
    linkDistance: 100,
    maxSpeed: 100,
    preventOverlap: true,
    nodeSize: 32,
    onTick: function tick(positions) {
      // the tick function to show the animation of layout process
      graph.updateNodePosition(positions.nodes);
    },
  });
  const subgraphNodes1 = graph.getAllNodesData().filter((node) => node.data.subGraph === '1');
  const subgraphData1 = {
    nodes: subgraphNodes1,
    edges: graph
      .getAllEdgesData()
      .filter(
        (edge) =>
          subgraphNodes1.find((node) => node.id === edge.source) &&
          subgraphNodes1.find((node) => node.id === edge.target),
      ),
  };
  subForceLayout.execute(new GraphCore(subgraphData1));
});
