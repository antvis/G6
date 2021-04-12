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
          icon: {
            show: true,
            img: undefined,
            text: 'xxx'
          }
        },
      ],
    };
    graph.data(data);
    graph.render();

    expect(graph.getNodes()[0].get('group').find(e => e.get('name') === 'circle-icon').attr('text')).toBe('xxx');
  });
});
