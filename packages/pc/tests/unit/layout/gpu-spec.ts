import G6 from '../../../src';
import dataset from './data';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('gpu layout', () => {
  it('fruchterman gpu', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'fruchterman',
        gpuEnabled: true
      },
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
    const layoutController = graph.get('layoutController');
    expect(layoutController.layoutMethod.getType()).toEqual('fruchterman-gpu');
    graph.destroy();
  });
  it('gforce gpu', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'gForce',
        gpuEnabled: true
      },
      fitView: true,
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
    const layoutController = graph.get('layoutController');
    expect(layoutController.layoutMethod.getType()).toEqual('gForce-gpu');
    graph.destroy();
  });
});
