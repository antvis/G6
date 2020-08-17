import G6 from '../../../src';
import dataset from './data';
import { mathEqual } from './util';
import { isString } from 'util';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'concentric-layout';
document.body.appendChild(div);

describe('concentric layout', () => {
  it('concentric layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'concentric' },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
      modes: {
        default: ['zoom-canvas'],
      },
    });
    data.nodes[2].label = data.nodes[2].id;
    graph.data(data);
    graph.render();
    const node = data.nodes[2];
    const width = graph.get('width');
    const height = graph.get('height');
    expect(mathEqual(node.x, width / 2)).toEqual(true);
    expect(mathEqual(node.y, height / 2)).toEqual(true);
    graph.destroy();
  });

  it('concentric with no node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
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

  it('concentric with one node', () => {
    const center = [150, 50];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
        center: center,
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
        },
      ],
    });
    graph.render();
    const nodeModel = graph.getNodes()[0].getModel();
    expect(nodeModel.x).toEqual(center[0]);
    expect(nodeModel.y).toEqual(center[1]);
    graph.destroy();
  });

  it('concentric with array nodeSize', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
        nodeSize: [10, 20],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const node = data.nodes[2];
    const width = graph.get('width');
    const height = graph.get('height');
    expect(mathEqual(node.x, width / 2)).toEqual(true);
    expect(mathEqual(node.y, height / 2)).toEqual(true);
    graph.destroy();
  });

  it('concentric with array size in node data, sortBy in data undefined', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
        sortBy: 'ttt',
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node) => {
      node.size = [10, 20];
    });
    graph.data(data);
    graph.render();
    const node = data.nodes[2];
    const width = graph.get('width');
    const height = graph.get('height');
    expect(mathEqual(node.x, width / 2)).toEqual(true);
    expect(mathEqual(node.y, height / 2)).toEqual(true);
    graph.destroy();
  });

  it('concentric with sortBy which is not a string, counterclockwise, sweep', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
        sortBy: 1,
        counterclockwise: true,
        sweep: 1,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const layout = graph.get('layoutController').layoutMethod;
    expect(!isString(layout.sortBy)).toEqual(false);
    graph.destroy();
  });

  it('concentric preventOverlap', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
        preventOverlap: true,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const node = data.nodes[2];
    const width = graph.get('width');
    const height = graph.get('height');
    expect(mathEqual(node.x, width / 2)).toEqual(true);
    expect(mathEqual(node.y, height / 2)).not.toEqual(true);
    graph.destroy();
  });

  it('concentric equidistant', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'concentric',
        equidistant: true,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const node = data.nodes[2];
    const width = graph.get('width');
    const height = graph.get('height');
    expect(mathEqual(node.x, width / 2)).toEqual(true);
    expect(mathEqual(node.y, height / 2)).toEqual(true);
    graph.destroy();
  });

  it('instantiate layout', () => {
    const concentricLayout = new G6.Layout['concentric']({
      center: [250, 250],
    });
    concentricLayout.init(data);
    concentricLayout.execute();

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
