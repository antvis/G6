import { Graph, Util } from '../../../src';
import '../../../src';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

describe('polyline edge performance', () => {
  it('create polyline edge', () => {
    console.log('polyline performance');
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas', 'create-edge'],
      },
      defaultEdge: {
        type: 'polyline',
      },
    });
    const data = {
      nodes: [
        {
          id: '0',
          label: '0',
          x: 100,
          y: 100,
        },
      ],
      edges: [],
    };
    let nodeCount = 0;
    const nodeNum = 30;
    while (nodeCount < nodeNum) {
      nodeCount++;
      data.nodes.push({
        id: `${nodeCount}`,
        x: (nodeCount % 5) * 100 + 10,
        y: (nodeCount / 5) * 100 + 10,
      });
      data.edges.push({
        source: '0',
        target: `${nodeCount}`,
      });
    }
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    graph.emit('node:dragstart', { x: 100, y: 100, item: node0 });
    const start = performance.now();
    let count = 0;
    while (count < 10) {
      graph.emit('node:drag', { x: 110, y: 110, item: node0 });
      graph.emit('node:drag', { x: 110, y: 120, item: node0 });
      graph.emit('node:drag', { x: 110, y: 130, item: node0 });
      graph.emit('node:drag', { x: 110, y: 140, item: node0 });
      graph.emit('node:drag', { x: 120, y: 150, item: node0 });
      count++;
    }
    graph.emit('node:dragend', { x: 100, y: 100, item: node0 });
    console.log('mouse move time:', performance.now() - start);
    // graph.emit('node:click', { x: 100, y: 100, item: node0 });
    // const start = performance.now();
    // let count = 0;
    // while (count < 10) {
    //   graph.emit('mousemove', { x: 110, y: 110 });
    //   graph.emit('mousemove', { x: 110, y: 120 });
    //   graph.emit('mousemove', { x: 110, y: 130 });
    //   graph.emit('mousemove', { x: 110, y: 140 });
    //   graph.emit('mousemove', { x: 110, y: 150 });
    //   count++;
    // }
    // console.log('mouse move time:', performance.now() - start);
  });
  it.only('dagre wtih polyline edges', () => {
    console.log('polyline performance');
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableOptimize: true,
            // enableDelegate: true,
          },
          'zoom-canvas',
          'drag-canvas',
          'create-edge',
        ],
      },
      defaultEdge: {
        type: 'polyline',
      },
      layout: {
        type: 'dagre',
        ranksep: 1,
        nodesep: 1,
        // controlPoints: true,
      },
      fitView: true,
    });
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then((res) => res.json())
      .then((data) => {
        const data2 = {
          nodes: [
            {
              id: '1',
              x: 100,
              y: 300,
            },
            {
              id: '2',
              x: 200,
              y: 200,
            },
          ],
          edges: [
            {
              id: 'edge',
              source: '1',
              target: '2',
            },
          ],
        };
        graph.on('canvas:click', (e) => {
          console.log('begin');
          const start = performance.now();
          graph.read(data);
          // graph.hideItem('edge');
          console.log('time', performance.now() - start);
        });
        // console.log(data.nodes);
      });
  });
});
