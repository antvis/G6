import G6 from '../../../src';
import dataset from './data';
import { mathEqual } from './util';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('layout mechanism', () => {
  it('use layout indenpently', () => {
    const circular = new G6.Layout['circular']();
    circular.init(data);
    circular.execute();

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
  it('register layout', () => {
    G6.registerLayout('custom', {
      getDefaultCfg() {
        return {
          attr1: 'a',
          attr2: 'b',
          attr3: 'c',
        };
      },
      execute() {
        const { nodes } = this;
        nodes.forEach((node, i) => {
          node.x = i * 10;
          node.y = i * 5;
        });
      },
    });
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'custom' },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
      expect(graph.getNodes()[0].getModel().x).toEqual(0);
      expect(graph.getNodes()[0].getModel().y).toEqual(0);
      expect(graph.getNodes()[1].getModel().x).toEqual(10);
      expect(graph.getNodes()[1].getModel().y).toEqual(5);
      graph.destroy();
    });
  });
  it('register layout and use it independently', () => {
    G6.registerLayout('custom2', {
      getDefaultCfg() {
        return {
          attr1: 'a',
          attr2: 'b',
          attr3: 'c',
        };
      },
      execute() {
        const { nodes } = this;
        nodes.forEach((node, i) => {
          node.x = (i + 1) * 10;
          node.y = (i + 1) * 5;
        });
      },
    });
    const custom2 = new G6.Layout['custom2']();
    custom2.layout(data);
    expect((data.nodes[0] as any).x).toBe(10);
    expect((data.nodes[0] as any).y).toBe(5);
    expect((data.nodes[1] as any).x).toBe(20);
    expect((data.nodes[1] as any).y).toBe(10);
  });
});
