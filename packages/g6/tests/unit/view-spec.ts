import { Graph, Layout, LayoutMapping } from '@antv/layout';
import G6, { IGraph, stdLib } from '../../src/index';
import { data } from '../datasets/dataset1';
const container = document.createElement('div');
document.querySelector('body')!.appendChild(container);

describe('viewport', () => {
  let graph: any;
  it('should translate viewport without animation correctly.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 100,
      },
    });

    graph.once('afterlayout', () => {
      graph.move(250, 250);
      let [px, py] = graph.canvas.getCamera().getPosition();
      expect(px).toBe(0);
      expect(py).toBe(0);

      graph.move(-250, -250);
      [px, py] = graph.canvas.getCamera().getPosition();
      expect(px).toBe(250);
      expect(py).toBe(250);

      graph.destroy();
      done();
    });
  });

  it('should translate viewport with animation correctly.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 200,
      },
    });

    graph.once('afterlayout', async () => {
      await graph.move(249, 249, {
        duration: 1000,
      });

      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('translate');
        const [px, py] = camera.getPosition();
        expect(px).toBe(250);
        expect(py).toBe(250);
      });

      await graph.moveTo(250, 250, {
        duration: 2000,
        easing: 'ease-in',
      });

      graph.destroy();
      done();
    });
  });

  it('should zoom viewport without animation correctly.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 200,
      },
    });

    graph.once('afterlayout', async () => {
      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(0.5);
      });
      await graph.zoom(0.5, { x: 250, y: 250 });

      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(1);
      });
      await graph.zoom(2, { x: 250, y: 250 });

      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(1.2);
      });
      await graph.zoomTo(1.2, { x: 250, y: 250 });

      graph.destroy();
      done();
    });
  });

  it('should zoom viewport with animation correctly.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'circular',
        center: [250, 250],
        radius: 200,
      },
    });

    graph.once('afterlayout', async () => {
      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(0.5);
      });
      await graph.zoom(
        0.5,
        { x: 250, y: 250 },
        {
          duration: 2000,
        },
      );

      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(1);
      });
      await graph.zoom(
        2,
        { x: 250, y: 250 },
        {
          duration: 2000,
        },
      );

      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(3);
        expect(camera.getPosition()[0]).toBe(1);
        expect(camera.getPosition()[1]).toBe(1);
      });
      await graph.zoomTo(
        3,
        { x: 1, y: 1 },
        {
          duration: 1000,
        },
      );

      graph.once('viewportchange', ({ action, options: { camera } }) => {
        expect(action).toBe('zoom');
        expect(camera.getZoom()).toBe(1);
        expect(camera.getPosition()[0]).toBe(250);
        expect(camera.getPosition()[1]).toBe(250);
      });
      await graph.zoomTo(
        1,
        { x: 250, y: 250 },
        {
          duration: 1000,
        },
      );

      graph.destroy();
      done();
    });
  });
});
