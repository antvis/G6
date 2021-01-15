import { Graph } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('default image test', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'image',
    },
    modes: {
      default: ['brush-select'],
    },
  };
  const graph = new Graph(cfg);
  it('default image config', () => {
    const data = {
      nodes: [
        {
          id: 'image',
          x: 100,
          y: 100,
        },
      ],
    };
    graph.data(data);
    graph.render();

    const nodes = graph.getNodes();
    expect(nodes.length).toEqual(1);
    const node = nodes[0];
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('height')).toEqual(200);
    expect(keyShape.attr('x')).toEqual(-100);
    expect(keyShape.attr('y')).toEqual(-100);
    graph.destroy();
  });
});
