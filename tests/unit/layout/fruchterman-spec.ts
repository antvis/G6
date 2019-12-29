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

describe.only('fruchterman', () => {
  it('new graph with fruchterman layout, without configurations', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'fruchterman' },
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
  it('new graph with fruchterman layout, with configurations', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
        center: [100, 100],
        maxIteration: 100,
      },
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
  it('update fructherman layout configurations', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    graph.updateLayout({
      center: [100, 100],
      gravity: 50,
    });
    expect(graph.getNodes()[0].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().x).not.toEqual(undefined);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(undefined);
    graph.destroy();
  });
});
