import { Graph } from '../../../src';
import Stats from 'stats-js';

/* nodes: 1589, edges: 2742, shapes: 5920 */

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

const generateData = (nodeNum, edgeNum) => {
  const nodes = [], edges = [];
  for (let i = 0; i < nodeNum; i ++) {
    nodes.push({
      id: `${i}`,
      // label: `${i}`
    });
  }
  for (let i = 0; i < edgeNum; i ++) {
    edges.push({
      source: `${Math.floor(Math.random() * nodeNum)}`,
      target: `${Math.floor(Math.random() * nodeNum)}`,
    });
  }
  return { nodes, edges };
}

describe('graph', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      style: {
        lineWidth: 0.3
      }
    },
    // modes: {
    //   default: [{
    //     type: 'activate-relations'
    //   }]
    // }
  });

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  it('first render', () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
    .then((res) => res.json())
    .then((data) => {
      // data.nodes.forEach(node => {
      //   node.label = node.olabel
      // })
      graph.data(data);
      graph.render();
    });
  });
  it('move nodes and refresh edges', () => {
    const gdata = generateData(1000, 2000);
    graph.data(gdata);
    graph.render();

    // function animate() {
    //   stats.update();
    //   const nodes = graph.getNodes();
    //   nodes.forEach(node => {
    //     const model = node.getModel();
    //     graph.updateItem(node, {
    //       x: model.x + (Math.random() - 0.5) * 20,
    //       y: model.y + (Math.random() - 0.5) * 20,
    //     })
    //   });
      
    //   requestAnimationFrame( animate );
    // }
    // requestAnimationFrame( animate );
  });
  it('updateItem', () => {
    const gdata = generateData(500, 1000);
    graph.data(gdata);
    graph.render();

    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#ccc', '#333', '#fff', '#000']

    // function animate() {
    //   stats.update();
    //   const nodes = graph.getNodes();
    //   nodes.forEach(node => {
    //     graph.updateItem(node, {
    //       color: colors[Math.ceil(Math.random() * 10)],
    //       style: {
    //         fill: colors[Math.ceil(Math.random() * 10)],
    //       }
    //     })
    //   });
      
    //   requestAnimationFrame( animate );
    // }
    // requestAnimationFrame( animate );
  });
});