import G6, { Graph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const nodes = [], edges = [];
const nodeNum = 3000;
const edgeNum = 2000;
for (let i = 0 ; i < nodeNum; i ++) {
  nodes.push({
    id: `${i}`,
    label: i,
    cluster: i % 5
  })
}
for (let i = 0 ; i < edgeNum; i++) {
  edges.push({
    id: `e${i}`,
    source: nodes[Math.floor(Math.random() * nodeNum)].id,
    target: nodes[Math.floor(Math.random() * nodeNum)].id,
  })
}
const data = {nodes,edges};

describe('edge click state', () => {
  it('edge ', () => {

    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 1000,
      modes: {
        default: ['drag-canvas', 'zoom-canvas']
      },
      layout: {
        preset: {
          type: 'fruchterman',
          gpuEnabled: true,
          gravity: 1,
          width: 1000,
          height: 1000,
          // center: [500, 500]
        },
        type: 'force2',
        animate: true,
        linkDistance: 50,
        maxSpeed: 2000,
        damping: 0.3,
        interval: 0.05,
        minMovement: 5,
      },
      // layout: {
      //   type: 'fruchterman',
      //   gpuEnabled: true,
      //   gravity: 1,
      // },
    });

    graph.read(data);
  });
});
