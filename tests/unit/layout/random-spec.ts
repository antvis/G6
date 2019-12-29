import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '0',
    },
    {
      id: '1',
    },
  ],
  edges: [],
};

describe.only('random', () => {
  it('new graph without layout, random by default', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(undefined);
    graph.destroy();
  });
  it('new graph with random layout', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'random' },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(undefined);
    graph.destroy();
  });
});
