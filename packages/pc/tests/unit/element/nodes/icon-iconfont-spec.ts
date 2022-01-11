import { Graph } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('icon with iconfont', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'circle',
    },
  };
  const graph = new Graph(cfg);
  it('default circle config', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
        },
      ],
    };
    graph.data(data);
    graph.render();

    graph.on('canvas:click', e => {
      graph.updateItem('node', {
        icon: {
          show: true,
          img: undefined,
          text: 'xxx'
        }
      })
    })

    graph.emit('canvas:click', {});
    expect(graph.getNodes()[0].get('group').find(e => e.get('name') === 'circle-icon').attr('text')).toBe('xxx');
  });
  it('update iconfont node', () => {
    graph.updateItem('node', {});
    expect(graph.getNodes()[0].get('group').find(e => e.get('name') === 'circle-icon').attr('x')).toBe(0);
    expect(graph.getNodes()[0].get('group').find(e => e.get('name') === 'circle-icon').attr('y')).toBe(0);
  });
});
