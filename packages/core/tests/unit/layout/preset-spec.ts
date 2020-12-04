import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'preset-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
      x: 150,
      y: 80,
    },
    {
      id: '2',
      label: '2',
      x: 50,
      y: 80,
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
      source: '2',
      target: '1',
    },
  ],
};

const data2 = {
  nodes: [
    {
      id: '0',
      label: '0',
      x: 200,
      y: 130,
    },
    {
      id: 'n1',
      label: 'n1',
      x: 250,
      y: 180,
    },
    {
      id: 'n2',
      label: 'n2',
      x: 150,
      y: 180,
    },
    {
      id: 'n3',
      label: 'n3',
      x: 200,
      y: 210,
    },
  ],
  edges: [
    {
      source: '0',
      target: 'n1',
    },
    {
      source: '0',
      target: 'n2',
    },
    {
      source: 'n2',
      target: 'n1',
    },
    {
      source: 'n2',
      target: 'n3',
    },
  ],
};

describe('preset layout', () => {
  it('new graph without layout, part of the data has position infor', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toEqual(NaN);
    expect(graph.getNodes()[0].getModel().y).not.toEqual(NaN);
    expect(graph.getNodes()[1].getModel().x).toEqual(150);
    expect(graph.getNodes()[1].getModel().y).toEqual(80);
    graph.destroy();
  });
  it('new graph without layout but has positions', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    data.nodes[0].x = 100;
    data.nodes[0].y = 30;
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).toEqual(100);
    expect(graph.getNodes()[0].getModel().y).toEqual(30);
    expect(graph.getNodes()[1].getModel().x).toEqual(150);
    expect(graph.getNodes()[1].getModel().y).toEqual(80);
    graph.destroy();
  });
  it('new graph without layout and change layout', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    data.nodes[0].x = 100;
    data.nodes[0].y = 30;
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).toEqual(100);
    expect(graph.getNodes()[0].getModel().y).toEqual(30);
    expect(graph.getNodes()[1].getModel().x).toEqual(150);
    expect(graph.getNodes()[1].getModel().y).toEqual(80);

    let painted = false;
    graph.on('afterpaint', () => {
      painted = true;
    });

    graph.changeData(data2);
    expect(graph.getNodes()[0].getModel().x).toEqual(200);
    expect(graph.getNodes()[0].getModel().y).toEqual(130);
    expect(graph.getNodes()[1].getModel().x).toEqual(250);
    expect(graph.getNodes()[1].getModel().y).toEqual(180);
    expect(painted).toEqual(true);
    graph.destroy();
  });
  it('new graph with layout, nodes has positions', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'random',
      },
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toEqual(100);
    expect(graph.getNodes()[0].getModel().y).not.toEqual(30);
    expect(graph.getNodes()[1].getModel().x).not.toEqual(150);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(80);
    graph.destroy();
  });
  it('update layout from undefined layout to force layout', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    graph.data(data2);
    graph.render();
    expect(graph.getNodes()[1].getModel().x).toEqual(250);
    expect(graph.getNodes()[1].getModel().y).toEqual(180);
    graph.updateLayout({
      type: 'force',
    });
    expect(graph.getNodes()[1].getModel().x).not.toEqual(NaN);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(NaN);
    graph.destroy();
  });

  // it will return a console.warn to warn user to assign a type for it
  it('update layout from undefined layout, configuration withou layout type', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    graph.data(data2);
    graph.render();
    expect(graph.getNodes()[1].getModel().x).toEqual(250);
    expect(graph.getNodes()[1].getModel().y).toEqual(180);
    graph.updateLayout({
      center: [100, 100],
    });
    expect(graph.getNodes()[1].getModel().x).not.toEqual(NaN);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(NaN);
    graph.destroy();
  });

  it('update layout from force layout to circular layout', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'force',
      },
    });
    graph.data(data2);
    graph.render();
    expect(graph.getNodes()[1].getModel().x).not.toEqual(NaN);
    expect(graph.getNodes()[1].getModel().y).not.toEqual(NaN);
    graph.once('afterlayout', () => {
      graph.updateLayout({
        type: 'circular',
        radius: 100,
      });
      expect(graph.getNodes()[1].getModel().x).not.toEqual(NaN);
      expect(graph.getNodes()[1].getModel().y).not.toEqual(NaN);
      graph.destroy();
    });
  });
});
