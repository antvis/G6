import { Circle } from '@antv/g';
import G6 from '../../src/index';
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
      graph.translate(250, 250);
      let [px, py] = graph.canvas.getCamera().getPosition();
      expect(px).toBeCloseTo(0, 1);
      expect(py).toBeCloseTo(0, 1);

      graph.translate(-250, -250);
      [px, py] = graph.canvas.getCamera().getPosition();
      expect(px).toBeCloseTo(250, 1);
      expect(py).toBeCloseTo(250, 1);

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
      await graph.translate(249, 249, {
        duration: 1000,
      });

      graph.once('viewportchange', ({ translate }) => {
        expect(translate.dx).toBeCloseTo(-250, 1);
        expect(translate.dy).toBeCloseTo(-250, 1);
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(251, 1);
        expect(py).toBeCloseTo(251, 1);
      });

      await graph.translateTo(
        { x: 500, y: 500 },
        {
          duration: 2000,
          easing: 'ease-in',
        },
      );

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
      graph.once('viewportchange', ({ zoom }) => {
        expect(zoom.ratio).toBe(0.5);
        expect(graph.canvas.getCamera().getZoom()).toBe(0.5);
      });
      await graph.zoom(0.5, { x: 250, y: 250 });
      expect(graph.getZoom()).toBe(0.5);

      graph.once('viewportchange', ({ zoom }) => {
        expect(zoom.ratio).toBe(2);
        expect(graph.canvas.getCamera().getZoom()).toBe(1);
      });
      await graph.zoom(2, { x: 250, y: 250 });

      const op = graph.canvas.canvas2Viewport({ x: 450, y: 250 });
      graph.once('viewportchange', ({ zoom }) => {
        expect(zoom.ratio).toBe(1.2);
        expect(graph.canvas.getCamera().getZoom()).toBe(1.2);

        // Zoom origin should be fixed.
        const { x, y } = graph.canvas.canvas2Viewport({ x: 450, y: 250 });
        expect(x).toBeCloseTo(op.x);
        expect(y).toBeCloseTo(op.y);
      });
      await graph.zoomTo(1.2, { x: 450, y: 250 });
      expect(graph.getZoom()).toBe(1.2);

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
      graph.once('viewportchange', ({ zoom }) => {
        expect(zoom.ratio).toBe(0.5);
        expect(graph.canvas.getCamera().getZoom()).toBe(0.5);
      });
      await graph.zoom(
        0.5,
        { x: 250, y: 250 },
        {
          duration: 2000,
        },
      );

      graph.once('viewportchange', ({ zoom }) => {
        expect(zoom.ratio).toBe(2);
        expect(graph.canvas.getCamera().getZoom()).toBe(1);
        expect(graph.canvas.getCamera().getPosition()[0]).toBeCloseTo(250, 1);
        expect(graph.canvas.getCamera().getPosition()[1]).toBeCloseTo(250, 1);
      });
      await graph.zoom(
        2,
        { x: 250, y: 250 },
        {
          duration: 2000,
        },
      );

      // const op = graph.canvas.canvas2Viewport({ x: 450, y: 250 });
      // graph.once('viewportchange', ({ zoom }) => {
      //   expect(zoom.ratio).toBe(3);
      //   expect(graph.canvas.getCamera().getZoom()).toBe(3);
      //   // Zoom origin should be fixed.
      //   const { x, y } = graph.canvas.canvas2Viewport({ x: 450, y: 250 });
      //   expect(x).toBeCloseTo(op.x);
      //   expect(y).toBeCloseTo(op.y);
      // });
      // await graph.zoomTo(
      //   3,
      //   { x: 450, y: 250 },
      //   {
      //     duration: 1000,
      //   },
      // );

      // graph.once('viewportchange', ({ zoom }) => {
      //   expect(zoom.ratio).toBe(1 / 3);
      //   expect(graph.canvas.getCamera().getZoom()).toBe(1);
      //   expect(graph.canvas.getCamera().getPosition()[0]).toBe(250);
      //   expect(graph.canvas.getCamera().getPosition()[1]).toBe(250);
      // });
      // await graph.zoomTo(
      //   1,
      //   { x: 250, y: 250 },
      //   {
      //     duration: 1000,
      //   },
      // );

      graph.destroy();
      done();
    });
  });

  it('should rotate viewport correctly.', (done) => {
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
      graph.once('viewportchange', ({ rotate }) => {
        expect(rotate.angle).toBe(30);
        expect(graph.canvas.getCamera().getRoll()).toBe(30);
      });
      await graph.rotateTo(30, undefined, {
        duration: 1000,
      });

      graph.once('viewportchange', ({ rotate }) => {
        expect(rotate.angle).toBe(30);
        expect(graph.canvas.getCamera().getRoll()).toBe(60);
      });
      await graph.rotateTo(60, undefined, {
        duration: 1000,
      });

      graph.once('viewportchange', ({ rotate }) => {
        expect(rotate.angle).toBe(-30);
        expect(graph.canvas.getCamera().getRoll()).toBe(30);
      });
      await graph.rotateTo(30, undefined, {
        duration: 1000,
      });

      graph.once('viewportchange', ({ rotate }) => {
        expect(rotate.angle).toBe(-29);
        expect(graph.canvas.getCamera().getRoll()).toBe(1);
      });
      // without animation
      await graph.rotate(-29);

      graph.destroy();
      done();
    });
  });

  it('should transform viewport without animation correctly.', (done) => {
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
      const origin = new Circle({
        style: {
          cx: 450,
          cy: 250,
          r: 30,
          fill: 'green',
          opacity: 0.5,
        },
      });
      graph.canvas.appendChild(origin);

      // graph.once('viewportchange', ({ zoom }) => {
      //   expect(zoom.ratio).toBe(0.5);
      //   expect(graph.canvas.getCamera().getZoom()).toBe(0.5);
      // });
      // await graph.transform({
      //   zoom: {
      //     ratio: 0.5,
      //   },
      //   origin: { x: 250, y: 250 },
      // });

      // graph.once('viewportchange', ({ zoom, rotate }) => {
      //   expect(zoom.ratio).toBe(2);
      //   expect(rotate.angle).toBe(30);
      //   expect(graph.canvas.getCamera().getZoom()).toBe(1);
      //   expect(graph.canvas.getCamera().getRoll()).toBe(30);
      // });
      // await graph.transform({
      //   zoom: {
      //     ratio: 2,
      //   },
      //   rotate: {
      //     angle: 30,
      //   },
      //   origin: { x: 250, y: 250 },
      // });

      // graph.once('viewportchange', ({ rotate }) => {
      //   expect(rotate.angle).toBe(-30);
      //   expect(graph.canvas.getCamera().getZoom()).toBe(1);
      //   expect(graph.canvas.getCamera().getRoll()).toBe(0);
      // });
      // await graph.transform({
      //   rotate: {
      //     angle: -30,
      //   },
      //   origin: { x: 250, y: 250 },
      // });

      graph.once('viewportchange', ({ translate }) => {
        expect(translate.dx).toBeCloseTo(-250, 1);
        expect(translate.dy).toBeCloseTo(-250, 1);
        // expect(graph.canvas.getCamera().getZoom()).toBe(0.5);
        // expect(graph.canvas.getCamera().getRoll()).toBe(0);
      });
      await graph.transform({
        translate: {
          dx: -250,
          dy: -250,
        },
      });

      graph.once('viewportchange', ({ zoom }) => {
        expect(zoom.ratio).toBe(0.5);
        expect(graph.canvas.getCamera().getZoom()).toBe(0.5);
      });
      await graph.transform({
        zoom: {
          ratio: 0.5,
        },
        origin: { x: 0, y: 0 },
      });

      await graph.transform({
        translate: {
          dx: 250,
          dy: 250,
        },
        zoom: {
          ratio: 4,
        },
      });
      await graph.transform({
        translate: {
          dx: -250,
          dy: -250,
        },
      });

      // graph.once('viewportchange', ({ rotate }) => {
      //   // expect(rotate.angle).toBe(0);
      //   expect(graph.canvas.getCamera().getZoom()).toBe(0.5);
      //   // expect(graph.canvas.getCamera().getRoll()).toBe(0);
      // });
      // await graph.transform({
      //   // rotate: {
      //   //   angle: 0,
      //   // },
      //   zoom: {
      //     ratio: 1,
      //   },
      //   origin: { x: 450, y: 250 },
      // });

      graph.destroy();
      origin.destroy();
      done();
    });
  });

  it('should stop the current transition of transform correctly.', (done) => {
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
      graph.once('viewportchange', ({ translate }) => {
        expect(translate.dx).toBeCloseTo(-250, 1);
        expect(translate.dy).toBeCloseTo(-250, 1);
      });
      await graph.transform(
        {
          translate: {
            dx: -250,
            dy: -250,
          },
        },
        {
          duration: 2000,
        },
      );
      graph.stopTransformTransition();

      graph.destroy();
      done();
    });
  });

  it('should fitCenter with transition correctly.', (done) => {
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
      await graph.translate(249, 249, {
        duration: 1000,
      });

      graph.once('viewportchange', ({ translate }) => {
        expect(translate.dx).toBeCloseTo(-249, 1);
        expect(translate.dy).toBeCloseTo(-249, 1);
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(250, 1);
        expect(py).toBeCloseTo(250, 1);
      });

      await graph.fitCenter({
        duration: 2000,
        easing: 'ease-in',
      });

      await graph.zoom(0.5);
      await graph.translate(249, 249);
      graph.once('viewportchange', ({ translate }) => {
        expect(translate.dx).toBeCloseTo(-249, 1);
        expect(translate.dy).toBeCloseTo(-249, 1);
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(250, 1);
        expect(py).toBeCloseTo(250, 1);
      });
      await graph.fitCenter();

      graph.destroy();
      done();
    });
  });

  it('should focusItem with transition correctly.', (done) => {
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
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].id).toBe('Argentina');
      expect(nodesData[0].data.x).toBe(450);
      expect(nodesData[0].data.y).toBeCloseTo(250, 1);

      expect(nodesData[4].id).toBe('Colombia');
      expect(nodesData[4].data.x).toBeCloseTo(391.421356237309);
      expect(nodesData[4].data.y).toBeCloseTo(391.4213562373095);

      graph.once('viewportchange', () => {
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(450, 1);
        expect(py).toBeCloseTo(250, 1);
      });
      await graph.focusItem('Argentina', {
        duration: 1000,
        easing: 'ease-in',
      });

      graph.once('viewportchange', () => {
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(391.421356237309);
        expect(py).toBeCloseTo(391.4213562373095);
      });
      await graph.focusItem('Colombia', {
        duration: 1000,
      });

      await graph.focusItem('Spain', {
        duration: 1000,
        easing: 'ease-in',
      });

      graph.once('viewportchange', () => {
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(450, 1);
        expect(py).toBeCloseTo(250, 1);
      });
      await graph.focusItem('Argentina');

      graph.once('viewportchange', () => {
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(250, 1);
        expect(py).toBeCloseTo(250, 1);
      });
      await graph.focusItem(nodesData.map((node) => node.id));

      graph.focusItem('Non existed node');

      graph.destroy();
      done();
    });
  });

  it('should fitView with transition correctly.', (done) => {
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
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].id).toBe('Argentina');
      expect(nodesData[0].data.x).toBeCloseTo(450, 1);
      expect(nodesData[0].data.y).toBeCloseTo(250, 1);

      expect(nodesData[4].id).toBe('Colombia');
      expect(nodesData[4].data.x).toBeCloseTo(391.421356237309);
      expect(nodesData[4].data.y).toBeCloseTo(391.4213562373095);

      graph.once('viewportchange', () => {
        const [px, py] = graph.canvas.getCamera().getPosition();
        expect(px).toBeCloseTo(450, 1);
        expect(py).toBeCloseTo(250, 1);
      });
      await graph.focusItem('Argentina', {
        duration: 1000,
        easing: 'ease-in',
      });
      await graph.zoom(0.5, undefined, {
        duration: 1000,
        easing: 'ease-in',
      });
      await graph.fitView(
        {
          padding: [50, 50, 50, 50],
        },
        {
          duration: 1000,
          easing: 'ease-in',
        },
      );
      await graph.translate(100, 100, {
        duration: 1000,
        easing: 'ease-in',
      });
      await graph.fitView(
        {
          padding: [150, 100],
          rules: {
            direction: 'both',
            ratioRule: 'min',
          },
        },
        {
          duration: 1000,
          easing: 'ease-in',
        },
      );
      await graph.fitView(undefined, {
        duration: 1000,
        easing: 'ease-in',
      });

      graph.destroy();
      done();
    });
  });
});
