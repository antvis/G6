import G6 from '../../../src';
import dataset from './data';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('fruchterman', () => {
  it('new graph with fruchterman layout, without configurations', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'fruchterman' },
      width: 500,
      height: 500,
      defaultNode: {
        size: 10,
      },
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
        maxIteration: 5000,
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
  it('fruchterman layout with no node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [],
    });
    graph.render();
    graph.destroy();
  });
  it('fruchterman layout with undefined nodes in data', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
    });
    const Layout = new G6.Layout['fruchterman']();
    Layout.init({});
    Layout.execute();
    graph.render();
    graph.destroy();
  });
  it('fruchterman layout with one node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [
        {
          id: 'node',
        },
      ],
    });
    graph.render();
    const nodeModel = graph.getNodes()[0].getModel();
    expect(nodeModel.x).toEqual(250);
    expect(nodeModel.y).toEqual(250);
    graph.destroy();
  });
  it('fruchterman layout with clustering and no clusterGravity', () => {
    const colors = ['#f00', '#0f0', '#00f', '#ff0'];
    data.nodes.forEach((node) => {
      node.size = 10;
      node.cluster = Math.ceil((Math.random() / 3) * 10);
      node.style = {
        fill: colors[node.cluster],
      };
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
        clustering: true,
        maxIteration: 3000,
        clusterGravity: null,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const node0 = data.nodes[0];
    expect(node0.x).not.toEqual(NaN);
    expect(node0.y).not.toEqual(NaN);
    graph.destroy();
  });
  it('fruchterman layout with overlapped nodes and loop edge', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
        clustering: true,
        maxIteration: 3000,
        clusterGravity: null,
      },
      width: 500,
      height: 500,
    });
    const tmpData = {
      nodes: [
        {
          id: 'node0',
          x: 100,
          y: 100,
        },
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node3',
          x: 150,
          y: 120,
        },
      ],
      edges: [
        {
          source: 'node3',
          target: 'node3',
        },
      ],
    };
    graph.data(tmpData);
    graph.render();
    const node0 = tmpData.nodes[0];
    const node1 = tmpData.nodes[1];
    expect(node0.x).not.toEqual(node1.x);
    expect(node0.y).not.toEqual(node1.y);
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

  it('instantiate layout', () => {
    const fruchtermanLayout = new G6.Layout['fruchterman']({
      center: [250, 250],
    });
    fruchtermanLayout.init(data);
    fruchtermanLayout.execute();

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div,
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
