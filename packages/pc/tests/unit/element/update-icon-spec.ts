import { Graph } from '../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('combo: hide by assigning visibile in data', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
  };
  const data = {
    nodes: [
      {
        id: '1',
        x: 100,
        y: 100,
        icon: {
          img: "https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",
          show: true
        }
      },
      {
        id: '2',
        x: 100,
        y: 200,
      },
    ],
    edges: [
      {
        id: 'e12',
        source: '1',
        target: '2',
      },
    ],
  };
  const graph = new Graph(cfg);
  it('combo: hide by data and update', () => {
    graph.data(data);
    graph.render();
    console.log('node ', graph.getNodes()[0])
    let tag = true;
    graph.on('canvas:click', e => {
      tag = !tag;
      graph.updateItem(graph.getNodes()[0], {
        icon: {
          img: "https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png",
          show: tag
        }
      })
    })
  });
});
