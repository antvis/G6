import { Layout, LayoutMapping } from '@antv/layout';
import G6, { stdLib } from '../../src/index';
import { data } from '../datasets/dataset1';
const container = document.createElement('div');
document.querySelector('body')!.appendChild(container);

describe('layout', () => {
  let graph: any;

  it('should use grid as default when layout is unset in spec.', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
    });

    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(nodesData[0].data.x).toBe(125);
      expect(nodesData[0].data.y).toBe(75);

      expect(nodesData[1].data.x).toBe(225);
      expect(nodesData[1].data.y).toBe(125);

      graph.destroy();
      done();
    });
  });

  it("should use user-defined x/y as node's position when layout is unset in spec.", (done) => {
    setTimeout(() => {
      graph = new G6.Graph({
        container,
        width: 500,
        height: 500,
        type: 'graph',
        data: {
          nodes: [
            {
              id: 'a',
              data: {
                x: 100,
                y: 100,
              },
            },
            {
              id: 'b',
              data: {
                x: 100,
              },
            },
            {
              id: 'c',
              data: {},
            },
          ],
          edges: [],
        },
      });

      graph.once('afterlayout', async () => {
        const nodesData = graph.getAllNodesData();
        expect(nodesData[0].data.x).toBe(100);
        expect(nodesData[0].data.y).toBe(100);
        expect(nodesData[1].data.x).toBe(100);
        expect(nodesData[1].data.y).toBe(0);
        expect(nodesData[2].data.x).toBe(0);
        expect(nodesData[2].data.y).toBe(0);

        // re-layout
        await graph.layout({
          execute: async () => {
            return {
              nodes: [
                {
                  id: 'a',
                  data: {
                    x: 200,
                    y: 200,
                  },
                },
                {
                  id: 'b',
                  data: {
                    x: 100,
                    y: 100,
                  },
                },
                {
                  id: 'c',
                  data: {
                    x: 250,
                    y: 250,
                  },
                },
              ],
              edges: [],
            };
          },
          animated: true,
          animationEffectTiming: {
            duration: 1000,
          },
        });

        expect(nodesData[0].data.x).toBe(200);
        expect(nodesData[0].data.y).toBe(200);
        expect(nodesData[1].data.x).toBe(100);
        expect(nodesData[1].data.y).toBe(100);
        expect(nodesData[2].data.x).toBe(250);
        expect(nodesData[2].data.y).toBe(250);

        graph.destroy();
        done();
      });
    }, 500);
  });

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

  it('should display the process in layout with iterations when `animated` enabled.', (done) => {
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
      expect(
        nodesData.every((node) => node.data.x > 0 && node.data.y > 0),
      ).toBeTruthy();
      graph.destroy();
      done();
    });
  });

  it('should display the process in layout without iterations when `animated` enabled.', (done) => {
    setTimeout(() => {
      graph = new G6.Graph({
        container,
        width: 500,
        height: 500,
        type: 'graph',
        data,
        layout: {
          type: 'circular',
          animated: true,
          center: [250, 250],
          radius: 200,
        },
      });

      graph.once('afterlayout', async () => {
        const nodesData = graph.getAllNodesData();
        expect(nodesData[0].data.x).toBe(450);
        expect(nodesData[0].data.y).toBe(250);

        await graph.layout({
          type: 'circular',
          center: [250, 250],
          radius: 100,
          animated: true,
          animationEffectTiming: {
            duration: 1000,
            easing: 'in-out-bounce',
          },
        });

        await graph.layout({
          type: 'random',
          animated: true,
          animationEffectTiming: {
            duration: 1000,
          },
        });

        await graph.layout({
          type: 'circular',
          center: [250, 250],
          radius: 200,
          animated: false,
        });

        graph.destroy();
        done();
      });
    }, 500);
  });

  it('should execute an immediately invoked layout with animation.', (done) => {
    setTimeout(() => {
      graph = new G6.Graph({
        container,
        width: 500,
        height: 500,
        type: 'graph',
        data,
        layout: {
          type: 'circular',
          animated: true,
          center: [250, 250],
          radius: 200,
        },
      });

      graph.once('afterlayout', async () => {
        const nodesData = graph.getAllNodesData();
        expect(nodesData[0].data.x).toBe(450);
        expect(nodesData[0].data.y).toBe(250);

        await graph.layout({
          execute: async (graph) => {
            const nodes = graph.getAllNodes();
            return {
              nodes: nodes.map((node) => ({
                id: node.id,
                data: {
                  x: 250,
                  y: 250,
                },
              })),
              edges: [],
            };
          },
          animated: true,
          animationEffectTiming: {
            duration: 1000,
          },
        });

        graph.destroy();
        done();
      });
    }, 500);
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
      expect(
        nodesData.every((node) => node.data.x > 0 && node.data.y > 0),
      ).toBeTruthy();

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
      expect(
        nodesData.every((node) => node.data.x > 0 && node.data.y > 0),
      ).toBeTruthy();

      graph.destroy();
      done();
    });
  });

  it('should allow registering custom layout at runtime.', (done) => {
    // Put all nodes at `[0, 0]`.
    class MyCustomLayout implements Layout<{}> {
      async assign(graph, options?: {}): Promise<void> {
        throw new Error('Method not implemented.');
      }
      async execute(graph, options?: {}): Promise<LayoutMapping> {
        const nodes = graph.getAllNodes();
        return {
          nodes: nodes.map((node) => ({
            id: node.id,
            data: {
              x: 0,
              y: 0,
            },
          })),
          edges: [],
        };
      }
      options: {};
      id: 'myCustomLayout';
    }

    // Register custom layout
    stdLib.layouts['myCustomLayout'] = MyCustomLayout;

    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'myCustomLayout',
      },
    });

    graph.once('afterlayout', () => {
      const nodesData = graph.getAllNodesData();
      expect(
        nodesData.every((node) => node.data.x === 0 && node.data.y === 0),
      ).toBeTruthy();

      graph.destroy();
      done();
    });
  });
});
