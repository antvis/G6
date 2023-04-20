import { Group, Text, Rect, Canvas } from '@antv/g';
import { Category, grid, Navigator } from '@antv/gui';
import { Renderer } from '@antv/g-canvas';
import { Graph } from '../../../src/index';
import { createCanvas } from '../../../src/util/canvas';

const container = document.createElement('div');
container.id = 'container';
document.querySelector('body').appendChild(container);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
    type: 'graph',
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200, nodeType: 'a' } },
        { id: 'node2', data: { x: 200, y: 250, nodeType: 'b' } },
        { id: 'node3', data: { x: 200, y: 350, nodeType: 'b' } },
        { id: 'node4', data: { x: 300, y: 250, nodeType: 'c' } },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: { edgeType: 'e1' },
        },
        {
          id: 'edge2',
          source: 'node2',
          target: 'node3',
          data: { edgeType: 'e2' },
        },
        {
          id: 'edge3',
          source: 'node3',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
        {
          id: 'edge4',
          source: 'node1',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
      ],
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => {
            return model.id;
          },
        },
      },
    },
    modes: {
      default: ['brush-select'],
    },
    plugins,
  });
};
describe('plugin', () => {
  test('legend with string config', () => {
    const graph = createGraph([
      {
        type: 'legend',
        size: 'fit-content',
        // orientation: "vertical",
        node: {
          enable: true,
          padding: [20, 20],
          title: 'node-legend',
          typeField: 'nodeType',
          rows: 1,
          cols: 4,
          labelStyle: {
            spacing: 8,
            fontSize: 20,
          },
          // markerStyle: {
          //   shape: "circle",
          //   size: (type) => {
          //     return type === "a" ? 10 : 20;
          //   },
          //   color: (type) => {
          //     return type === "a" ? "#f00" : "#0f0";
          //   },
          // },
        },
        edge: {
          enable: true,
          padding: [10, 20],
          title: 'edge-legend',
          typeField: 'edgeType',
          // markerStyle: {
          //   color: (type) => {
          //     console.log("color", type === "e1" ? "#00f" : "#000");
          //     switch (type) {
          //       case "e1":
          //         return "#00f";
          //       case "e2":
          //         return "#f0f";
          //       case "e3":
          //         return "#0ff";
          //     }
          //   },
          // },
        },
      },
    ]);
    // graph.translate(0, -180);
  });
});

describe('plugin', () => {
  test('minimap with string config', (done) => {
    const graph = createGraph(['minimap']);
    graph.on('afterlayout', (e) => {
      const viewport = document.getElementsByClassName(
        'g6-minimap-viewport',
      )?.[0];
      expect(viewport).not.toBe(undefined);
      // setTimeout for: minimap viewport debounce update
      setTimeout(() => {
        expect(viewport.style.left).toBe('0px');
        expect(viewport.style.top).toBe('0px');
        expect(viewport.style.width).toBe('200px');
        expect(viewport.style.height).toBe('120px');

        graph.zoom(3);
        graph.translate(50, 250);
        // setTimeout for: 1. zoom an translate are async function; 2. minimap viewport debounce update
        setTimeout(() => {
          expect(viewport.style.left).toBe('73.6155px');
          expect(viewport.style.top).toBe('0px');
          expect(viewport.style.width).toBe('86.8839px');
          expect(viewport.style.height).toBe('42.1433px');

          graph.addData('node', [{ id: 'node3', data: { x: 50, y: 150 } }]);
          setTimeout(() => {
            expect(viewport.style.left).toBe('83.8302px');
            expect(viewport.style.top).toBe('0px');
            expect(viewport.style.width).toBe('107.741px');
            expect(viewport.style.height).toBe('86.3402px');

            graph.updateData('node', [
              { id: 'node3', data: { x: 150, y: 50 } },
            ]);

            setTimeout(() => {
              expect(viewport.style.left).toBe('78.9018px');
              expect(viewport.style.top).toBe('28.3537px');
              expect(viewport.style.width).toBe('69.4723px');
              expect(viewport.style.height).toBe('69.4723px');

              graph.removeData('node', 'node3');
              setTimeout(() => {
                expect(viewport.style.left).toBe('60.1094px');
                expect(viewport.style.top).toBe('0px');
                expect(viewport.style.width).toBe('131.37px');
                expect(viewport.style.height).toBe('72.4113px');

                graph.destroy();
                const viewport2 = document.getElementsByClassName(
                  'g6-minimap-viewport',
                )?.[0];
                expect(viewport2).toBe(undefined);
                done();
              }, 100);
            }, 100);
          }, 100);
        }, 200);
      }, 100);
    });
  });

  test('minimap with object onfig and delegate type', (done) => {
    const graph = createGraph([
      {
        key: 'minimap1',
        type: 'minimap',
        size: [300, 300],
        mode: 'delegate',
        delegateStyle: {
          fill: '#f00',
        },
      },
    ]);

    graph.on('afterlayout', (e) => {
      const viewport = document.getElementsByClassName(
        'g6-minimap-viewport',
      )?.[0];
      setTimeout(() => {
        expect(viewport.style.width).toBe('300px');
        expect(viewport.style.height).toBe('300px');
        const { plugin: minimap } =
          graph.pluginController.pluginMap.get('minimap1');
        expect(minimap).not.toBe(undefined);
        const minimapCanvas = minimap.canvas;
        const minimapRootGroup = minimapCanvas.getRoot();
        expect(minimapRootGroup.children.length).toBe(8);
        const node1Delegate = minimapRootGroup.find(
          (ele) => ele.id === 'minimap-delegate-node1',
        );
        expect(node1Delegate.nodeName).toBe('rect');
        expect(node1Delegate.style.fill).toBe('#f00');
        const node2Delegate = minimapRootGroup.find(
          (ele) => ele.id === 'minimap-delegate-node2',
        );
        expect(node2Delegate.nodeName).toBe('rect');
        expect(node2Delegate.style.fill).toBe('#f00');
        graph.destroy();
        done();
      }, 100);
    });
  });

  test('minimap with object onfig and keyShape type', (done) => {
    const graph = createGraph([
      {
        key: 'minimap1',
        type: 'minimap',
        mode: 'keyShape',
        size: [200, 300],
      },
    ]);

    graph.on('afterlayout', (e) => {
      const viewport = document.getElementsByClassName(
        'g6-minimap-viewport',
      )?.[0];
      setTimeout(() => {
        expect(viewport.style.width).toBe('200px');
        expect(viewport.style.height).toBe('300px');
        const { plugin: minimap } =
          graph.pluginController.pluginMap.get('minimap1');
        expect(minimap).not.toBe(undefined);
        const minimapCanvas = minimap.canvas;
        const minimapRootGroup = minimapCanvas.getRoot();
        expect(minimapRootGroup.children.length).toBe(8);
        const node1Delegate = minimapRootGroup.find(
          (ele) => ele.id === 'minimap-keyShape-node1',
        );
        expect(node1Delegate.nodeName).toBe('circle');
        const node1KeyShape =
          graph.itemController.itemMap['node1'].shapeMap['keyShape'];
        expect(node1Delegate.style.fill).toBe(node1KeyShape.style.fill);

        const node2Delegate = minimapRootGroup.find(
          (ele) => ele.id === 'minimap-keyShape-node2',
        );
        expect(node2Delegate.nodeName).toBe('circle');
        const node2KeyShape =
          graph.itemController.itemMap['node2'].shapeMap['keyShape'];
        expect(node2Delegate.style.fill).toBe(node2KeyShape.style.fill);

        graph.destroy();
        done();
      }, 100);
    });
  });
});

describe('graph plugin related APIs', () => {
  let graph;
  test('add plugins to graph', (done) => {
    graph = createGraph(undefined);
    graph.on('afterlayout', () => {
      let viewport = document.getElementsByClassName(
        'g6-minimap-viewport',
      )?.[0];
      expect(viewport).toBe(undefined);
      graph.addPlugins('minimap');

      // setTimeout for minimap canvas ready
      setTimeout(() => {
        viewport = document.getElementsByClassName('g6-minimap-viewport')?.[0];
        expect(viewport).not.toBe(undefined);

        graph.addPlugins([
          {
            key: 'minimap1',
            type: 'minimap',
            mode: 'delegate',
          },
          {
            key: 'minimap2',
            type: 'minimap',
            mode: 'keyShape',
          },
        ]);

        // setTimeout for minimap canvas ready
        setTimeout(() => {
          const viewports = document.getElementsByClassName(
            'g6-minimap-viewport',
          );
          expect(viewports.length).toBe(3);
          done();
        }, 100);
      }, 100);
    });
  });

  test('update minimap', (done) => {
    graph.updatePlugin({
      key: 'minimap2',
      mode: 'delegate',
      delegateStyle: {
        fill: '#f00',
      },
    });

    // setTimeout for minimap canvas ready
    setTimeout(() => {
      const viewports = document.getElementsByClassName('g6-minimap-viewport');
      expect(viewports.length).toBe(3);

      const { plugin: minimap } =
        graph.pluginController.pluginMap.get('minimap2');
      expect(minimap).not.toBe(undefined);
      const minimapCanvas = minimap.canvas;
      const minimapRootGroup = minimapCanvas.getRoot();
      const node1Delegate = minimapRootGroup.find(
        (ele) => ele.id === 'minimap-delegate-node1',
      );
      expect(node1Delegate.nodeName).toBe('rect');
      expect(node1Delegate.style.fill).toBe('#f00');

      done();
    }, 100);
  });

  test('remove minimap', (done) => {
    graph.removePlugins(['minimap1', 'minimap2']);
    // setTimeout for minimap canvas ready
    setTimeout(() => {
      const viewports = document.getElementsByClassName('g6-minimap-viewport');
      expect(viewports.length).toBe(1);
      graph.destroy();
      done();
    }, 100);
  });
});
