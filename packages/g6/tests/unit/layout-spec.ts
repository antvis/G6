import G6, { IGraph } from '../../src/index';
import { data } from '../datasets/dataset1';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

describe('layout', () => {
  let graph: IGraph<any>;
  it('should apply circular layout correctly.', (done) => {
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

    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].data.x).toBe(450);
      expect(nodesData[0].data.y).toBe(250);

      graph.destroy();
      done();
    });
  });

  it('should trigger re-layout by calling `layout` method manually.', (done) => {
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

    // first-time layout
    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].data.x).toBe(450);
      expect(nodesData[0].data.y).toBe(250);

      // re-layout
      graph.once('afterlayout', () => {
        const nodesData = graph.getAllNodesData();
        expect(nodesData[0].data.x).toBe(350);
        expect(nodesData[0].data.y).toBe(250);

        graph.destroy();
        done();
      });

      graph.layout({
        type: 'circular',
        center: [250, 250],
        radius: 100, // change radius here
      });
    });
  });

  it('should trigger re-layout by calling `changeData` method manually.', (done) => {
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

    // first-time layout
    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].data.x).toBe(450);
      expect(nodesData[0].data.y).toBe(250);

      // re-layout
      graph.once('afterlayout', () => {
        const nodesData = graph.getAllNodesData();
        expect(nodesData[0].data.x).toBe(250);
        expect(nodesData[0].data.y).toBe(250);

        graph.destroy();
        done();
      });

      // Only one single node.
      const newData = {
        nodes: [{ id: 'node13', data: { x: 50, y: 50 } }],
        edges: [{ id: 'edge1', source: 'node13', target: 'node13', data: {} }],
      };
      graph.changeData(newData);
    });
  });

  it('should run layout in WebWorker with `workerEnabled`.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'circular',
        workerEnabled: true,
        center: [250, 250],
        radius: 200,
      },
    });

    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].data.x).toBe(450);
      expect(nodesData[0].data.y).toBe(250);

      // re-layout
      graph.once('afterlayout', () => {
        const nodesData = graph.getAllNodesData();
        expect(nodesData[0].data.x).toBe(350);
        expect(nodesData[0].data.y).toBe(250);

        graph.destroy();
        done();
      });

      graph.layout({
        type: 'circular',
        center: [250, 250],
        radius: 100, // change radius here
      });
    });
  });

  it('should display the layout process with `animated`.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'd3force',
        animated: true,
        center: [250, 250],
        preventOverlap: true,
        nodeSize: 20,
      },
    });

    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData.every((node) => node.data.x > 0 && node.data.y > 0)).toBeTruthy();
      graph.destroy();
      done();
    });
  });

  it('should stop animated layout process with `stopLayout`.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'd3force',
        animated: true,
        center: [250, 250],
        preventOverlap: true,
        nodeSize: 20,
      },
    });

    setTimeout(() => {
      graph.stopLayout();

      const nodesData = graph.getAllNodesData();
      expect(nodesData.every((node) => node.data.x > 0 && node.data.y > 0)).toBeTruthy();

      graph.destroy();
      done();
    }, 1000);
  });

  it('should manually steps the simulation with `iterations` and `animated` disabled.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'd3force',
        animated: false,
        center: [250, 250],
        preventOverlap: true,
        nodeSize: 20,
        iterations: 1000,
      },
    });

    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData.every((node) => node.data.x > 0 && node.data.y > 0)).toBeTruthy();

      graph.destroy();
      done();
    });
  });
});
