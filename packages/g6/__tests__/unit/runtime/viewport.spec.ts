import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import { createGraph } from '@@/utils';

const options = {
  width: 500,
  height: 500,
  data,
  theme: 'light',
  node: {
    style: {
      width: 20,
      height: 20,
    },
    state: {
      active: { fill: '#dbedd0' },
    },
  },
  edge: {
    style: {},
    state: {
      active: { stroke: 'pink', lineWidth: 3 },
    },
  },
  layout: {
    type: 'd3force',
    preventOverlap: true,
    nodeSize: 20,
    animation: true,
  },
};

describe('ViewportController', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = createGraph(options);
    await graph.render();
  });

  it('viewport center', () => {
    expect(graph.getViewportCenter()).toEqual(graph.getPosition());
    const [x, y] = graph.getViewportCenter();
    expect(x).toBeCloseTo(250);
    expect(y).toBeCloseTo(250);
  });

  it('viewport zoom', async () => {
    expect(graph.getZoom()).toBe(1);

    await graph.zoomBy(0.5);
    expect(graph.getZoom()).toBe(0.5);

    await graph.zoomBy(4);
    expect(graph.getZoom()).toBe(2);

    await graph.zoomTo(1);
    expect(graph.getZoom()).toBe(1);

    graph.setZoomRange([0.1, 10]);
    expect(graph.getZoomRange()).toEqual([0.1, 10]);
  });

  it('viewport translate', async () => {
    await graph.translateBy([100, 100]);
    let [x, y] = graph.getPosition();
    expect(x).toBeCloseTo(350);
    expect(y).toBeCloseTo(350);

    await graph.translateTo([200, 200]);
    [x, y] = graph.getPosition();
    expect(x).toBeCloseTo(450);
    expect(y).toBeCloseTo(450);
  });

  it('viewport rotate', async () => {
    await graph.rotateBy(Math.PI / 4);
    expect(graph.getRotation()).toBe(Math.PI / 4);

    await graph.rotateBy(Math.PI / 2);
    expect(graph.getRotation()).toBe((Math.PI * 3) / 4);

    await graph.rotateTo(Math.PI / 2);
    expect(graph.getRotation()).toBe(Math.PI / 2);
  });

  afterAll(() => {
    graph.destroy();
  });
});
