import G6 from '../../../src';
import data from './data';

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe.only('force layout', () => {
  it('force layout with default configs', (done) => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x: number;
    let y: number;
    let count = 0;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        tick() {
          count++;
          expect(node.x !== x);
          expect(node.y !== y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
          x = node.x;
          y = node.y;
        },
        onLayoutEnd() {
          expect(node.x);
          expect(node.y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
        },
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();
    setTimeout(() => {
      expect(count > 30);
      graph.destroy();
      done();
    }, 500);
  });

  it('force with fixed link length', (done) => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x: number;
    let y: number;
    let count = 0;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        distance: 40,
        edgeStrength: 0.5,
        tick() {
          count++;
          expect(node.x !== x);
          expect(node.y !== y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
          x = node.x;
          y = node.y;
        },
        onLayoutEnd() {
          expect(node.x);
          expect(node.y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
        },
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();

    setTimeout(() => {
      expect(count > 30);
      done();
      graph.destroy();
    }, 500);
  });
});
