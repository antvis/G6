import G6 from '../../../src';
import dataset from './data';
import { mathEqual } from './util';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'circular-layout-web-worker';
document.body.appendChild(div);

describe('circular layout(web worker)', () => {
  // siren: Temporarily disabled
  it.skip('circular layout(web worker) with default configs', (done) => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        // use web worker to layout
        workerEnabled: true,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.on('afterlayout', () => {
      const width = graph.get('width');
      const height = graph.get('height');
      const radius = height > width ? width / 2 : height / 2;

      expect(mathEqual(data.nodes[0].x, 250 + radius)).toEqual(true);
      expect(mathEqual(data.nodes[0].y, 250)).toEqual(true);
      expect(data.nodes[0].y === 250);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('circular(web worker) counterclockwise, and fixed radius, start angle, end angle', (done) => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
        // use web worker to layout
        workerEnabled: true,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();

    let timeout = false;
    graph.on('afterlayout', () => {
      if (timeout) return;
      const pos = (200 * Math.sqrt(2)) / 2;
      expect(mathEqual(data.nodes[0].x, 250 + pos)).toEqual(true);
      expect(mathEqual(data.nodes[0].y, 250 + pos)).toEqual(true);
      graph.destroy();
      done();
    });
    setTimeout(() => {
      timeout = true;
      graph.destroy();
      done();
    }, 1000);
  });
});
