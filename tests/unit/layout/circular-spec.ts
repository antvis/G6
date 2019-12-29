import G6 from '../../../src';
import data from './data';
import { mathEqual } from './util';

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe.only('circular layout', () => {
  it('circular layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'circular' },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();
    const width = graph.get('width');
    const height = graph.get('height');
    const radius = height > width ? width / 2 : height / 2;
    expect(mathEqual(data.nodes[0].x, 250 + radius)).toEqual(true);
    expect(mathEqual(data.nodes[0].y, 250)).toEqual(true);
    expect(data.nodes[0].y === 250);
    graph.destroy();
  });

  it('circular counterclockwise, and fixed radius, start angle, end angle', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();
    const pos = (200 * Math.sqrt(2)) / 2;
    expect(mathEqual(data.nodes[0].x, 250 + pos)).toEqual(true);
    expect(mathEqual(data.nodes[0].y, 250 + pos)).toEqual(true);
    graph.destroy();
  });
});
