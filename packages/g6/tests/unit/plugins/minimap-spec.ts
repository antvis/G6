import { Graph } from '../../../src/index';
import { pxCompare } from '../util';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const createGraph = (plugins) => {
  return new Graph({
    container,
    width: 500,
    height: 500,
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200 } },
        { id: 'node2', data: { x: 200, y: 250 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
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
  test('minimap with string config', (done) => {
    const graph = createGraph(['minimap']);
    graph.on('afterlayout', (e) => {
      const viewport = document.getElementsByClassName('g6-minimap-viewport')?.[0];
      expect(viewport).not.toBe(undefined);
      // setTimeout for: minimap viewport debounce update
      setTimeout(() => {
        expect(pxCompare(viewport.style.left, 0)).toBe(true);
        expect(pxCompare(viewport.style.top, 0)).toBe(true);
        expect(pxCompare(viewport.style.width, 200)).toBe(true);
        expect(pxCompare(viewport.style.height, 120)).toBe(true);

        graph.zoom(3);
        graph.translate({ dx: 50, dy: 250 });
        // setTimeout for: 1. zoom an translate are async function; 2. minimap viewport debounce update
        setTimeout(() => {
          expect(pxCompare(viewport.style.left, 100)).toBe(true);
          expect(pxCompare(viewport.style.top, 0)).toBe(true);
          expect(pxCompare(viewport.style.width, 100)).toBe(true);
          expect(pxCompare(viewport.style.height, 76)).toBe(true);
          graph.addData('node', [{ id: 'node3', data: { x: 50, y: 150 } }]);
          setTimeout(() => {
            expect(pxCompare(viewport.style.left, 117)).toBe(true);
            expect(pxCompare(viewport.style.top, 0)).toBe(true);
            expect(pxCompare(viewport.style.width, 82)).toBe(true);
            expect(pxCompare(viewport.style.height, 88)).toBe(true);

            graph.updateData('node', [{ id: 'node3', data: { x: 150, y: 50 } }]);

            setTimeout(() => {
              expect(pxCompare(viewport.style.left, 100)).toBe(true);
              expect(pxCompare(viewport.style.top, 28)).toBe(true);
              expect(pxCompare(viewport.style.width, 100)).toBe(true);
              expect(pxCompare(viewport.style.height, 69)).toBe(true);

              graph.removeData('node', 'node3');
              setTimeout(() => {
                expect(pxCompare(viewport.style.left, 100)).toBe(true);
                expect(pxCompare(viewport.style.top, 0)).toBe(true);
                expect(pxCompare(viewport.style.width, 100)).toBe(true);
                expect(pxCompare(viewport.style.height, 76)).toBe(true);

                graph.destroy();
                const viewport2 = document.getElementsByClassName('g6-minimap-viewport')?.[0];
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
      const viewport = document.getElementsByClassName('g6-minimap-viewport')?.[0];
      setTimeout(() => {
        expect(pxCompare(viewport.style.width, 300)).toBe(true);
        expect(pxCompare(viewport.style.height, 300)).toBe(true);
        expect(viewport.style.width).toBe('300px');
        expect(viewport.style.height).toBe('300px');
        const { plugin: minimap } = graph.pluginController.pluginMap.get('minimap1');
        expect(minimap).not.toBe(undefined);
        const minimapCanvas = minimap.canvas;
        const minimapRootGroup = minimapCanvas.getRoot();
        expect(minimapRootGroup.children.length).toBe(3);
        const node1Delegate = minimapRootGroup.find((ele) => ele.id === 'minimap-delegate-node1');
        expect(node1Delegate.nodeName).toBe('rect');
        expect(node1Delegate.style.fill).toBe('#f00');
        const node2Delegate = minimapRootGroup.find((ele) => ele.id === 'minimap-delegate-node2');
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
      const viewport = document.getElementsByClassName('g6-minimap-viewport')?.[0];
      setTimeout(() => {
        expect(pxCompare(viewport.style.width, 200)).toBe(true);
        expect(pxCompare(viewport.style.height, 300)).toBe(true);
        expect(viewport.style.width).toBe('200px');
        expect(viewport.style.height).toBe('300px');
        const { plugin: minimap } = graph.pluginController.pluginMap.get('minimap1');
        expect(minimap).not.toBe(undefined);
        const minimapCanvas = minimap.canvas;
        const minimapRootGroup = minimapCanvas.getRoot();
        expect(minimapRootGroup.children.length).toBe(3);
        const node1Delegate = minimapRootGroup.find((ele) => ele.id === 'minimap-keyShape-node1');
        expect(node1Delegate.nodeName).toBe('circle');
        const node1KeyShape = graph.itemController.itemMap.get('node1').shapeMap['keyShape'];
        expect(node1Delegate.style.fill).toBe(node1KeyShape.style.fill);

        const node2Delegate = minimapRootGroup.find((ele) => ele.id === 'minimap-keyShape-node2');
        expect(node2Delegate.nodeName).toBe('circle');
        const node2KeyShape = graph.itemController.itemMap.get('node2').shapeMap['keyShape'];
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
      let viewport = document.getElementsByClassName('g6-minimap-viewport')?.[0];
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
          const viewports = document.getElementsByClassName('g6-minimap-viewport');
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

      const { plugin: minimap } = graph.pluginController.pluginMap.get('minimap2');
      expect(minimap).not.toBe(undefined);
      const minimapCanvas = minimap.canvas;
      const minimapRootGroup = minimapCanvas.getRoot();
      const node1Delegate = minimapRootGroup.find((ele) => ele.id === 'minimap-delegate-node1');
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
