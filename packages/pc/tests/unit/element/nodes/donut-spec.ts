import { Graph } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('donut test', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'donut',
      size: 50,
      icon: {
        show: true
      }
    },
  };
  const graph = new Graph(cfg);
  it('default donut config', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
          donutAttrs: {
            prop1: 10,
            prop2: 20,
            prop3: 25
          }
        },
      ],
    };
    graph.data(data);
    graph.render();
    
    graph.on('canvas:click', e => {
      graph.updateItem(graph.getNodes()[0], {
        donutAttrs: {
          prop2: 0,
          prop3: 0,
          prop4: Math.random(),
          prop1: Math.random(),
          prop6: Math.random(),
          prop7: Math.random(),
          prop8: Math.random()
        }
      })
    })
  });
});