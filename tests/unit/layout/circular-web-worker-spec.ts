// 注意：这里不能直接require原始的src文件，而要使用build后的文件，因为web worker代码是通过worker-loader内联进来的
import G6 from '../../../src';
import dataset from './data';
import { mathEqual } from './util';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'circular-layout-web-worker';
document.body.appendChild(div);

describe('circular layout(web worker)', () => {
  it('circular layout(web worker) with default configs', done => {
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
    graph.data(data);
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
    graph.render();
  });

  it('circular(web worker) counterclockwise, and fixed radius, start angle, end angle', done => {
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
    graph.on('afterlayout', () => {
      const pos = (200 * Math.sqrt(2)) / 2;
      expect(mathEqual(data.nodes[0].x, 250 + pos)).toEqual(true);
      expect(mathEqual(data.nodes[0].y, 250 + pos)).toEqual(true);
      graph.destroy();
      done();
    });
    graph.render();
  });
});
