import G6, { Graph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);
const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      cluster: 'a',
    },
    {
      id: '1',
      label: '1',
      cluster: 'a',
    },
    {
      id: '2',
      label: '2',
      cluster: 'a',
    },
    {
      id: '3',
      label: '3',
      cluster: 'a',
    },
    {
      id: '4',
      label: '4',
      cluster: 'a',
    },
    {
      id: '5',
      label: '5',
      cluster: 'a',
    },
    {
      id: '6',
      label: '6',
      cluster: 'a',
    },
    {
      id: '7',
      label: '7',
      cluster: 'a',
    },
    {
      id: '8',
      label: '8',
      cluster: 'a',
    },
    {
      id: '9',
      label: '9',
      cluster: 'a',
    },
    {
      id: '10',
      label: '10',
      cluster: 'a',
    },
    {
      id: '11',
      label: '11',
      cluster: 'a',
    },
    {
      id: '12',
      label: '12',
      cluster: 'a',
    },
    {
      id: '13',
      label: '13',
      cluster: 'b',
    },
    {
      id: '14',
      label: '14',
      cluster: 'b',
    },
    {
      id: '15',
      label: '15',
      cluster: 'b',
    },
    {
      id: '16',
      label: '16',
      cluster: 'b',
    },
    {
      id: '17',
      label: '17',
      cluster: 'b',
    },
    {
      id: '18',
      label: '18',
      cluster: 'c',
    },
    {
      id: '19',
      label: '19',
      cluster: 'c',
    },
    {
      id: '20',
      label: '20',
      cluster: 'c',
    },
    {
      id: '21',
      label: '21',
      cluster: 'c',
    },
    {
      id: '22',
      label: '22',
      cluster: 'c',
    },
    {
      id: '23',
      label: '23',
      cluster: 'c',
    },
    {
      id: '24',
      label: '24',
      cluster: 'c',
    },
    {
      id: '25',
      label: '25',
      cluster: 'c',
    },
    {
      id: '26',
      label: '26',
      cluster: 'c',
    },
    {
      id: '27',
      label: '27',
      cluster: 'c',
    },
    {
      id: '28',
      label: '28',
      cluster: 'c',
    },
    {
      id: '29',
      label: '29',
      cluster: 'c',
    },
    {
      id: '30',
      label: '30',
      cluster: 'c',
    },
    {
      id: '31',
      label: '31',
      cluster: 'd',
    },
    {
      id: '32',
      label: '32',
      cluster: 'd',
    },
    {
      id: '33',
      label: '33',
      cluster: 'd',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};
describe('edge click state', () => {
  it('edge ', () => {
    let graph;
    const render = () => {
      if (graph) {
        graph.destroy()
      }
      graph = new G6.Graph({
        container: 'container',
        width:800,
        height: 800,
        layout: {
          type: 'gForce',
          animate: true, // 设置为 false 可关闭布局动画
          maxSpeed: 100,
          linkDistance: 50,
          animate: false,
          clustering: true,
          nodeClusterBy: 'cluster',
          clusterNodeStrength: 300,
        },
      });
    
      graph.data(data);
      graph.render();
      graph.on('afterrender', () => {
        console.log('afterrender')
        graph.updateLayout({
          animate: true
        })
      })
      graph.on('node:dragstart', function (e) {
        const forceLayout = graph.get('layoutController').layoutMethods[0];
        forceLayout.stop()
      });
      graph.on('node:drag', function (e) {
        refreshDragedNodePosition(e);
        graph.layout()
      });
    }
    render();
    setTimeout(() => render(), 1000)
  });
});