import { supportsThreads, initThreads, ForceLayout } from '@antv/layout-wasm';
import { labelPropagation } from '@antv/algorithm';
import G6 from '../../../src/index';
import { loadDataset } from '../../datasets/legacy-format';

export default async () => {
  const $container = document.getElementById('container')!;
  $container.style.display = 'none';

  const WIDTH = 500;
  const HEIGHT = 500;

  const $app = document.getElementById('app')!;
  const $containers = document.createElement('div');
  $app.appendChild($containers);
  $containers.style.display = 'flex';

  const $container1 = document.createElement('div');
  const $container2 = document.createElement('div');
  $containers.appendChild($container1);
  $containers.appendChild($container2);
  $container1.style.flex = '1';
  $container1.style.position = 'relative';
  $container1.id = 'wasm';
  $container2.style.flex = '1';
  $container2.style.position = 'relative';
  $container2.id = 'cpu';

  const $timer1 = document.createElement('div');
  $timer1.style.cssText = `
    font-size: 26px;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;`;
  $container1.appendChild($timer1);
  const $timer2 = document.createElement('div');
  $timer2.style.cssText = `
    font-size: 26px;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;`;
  $container2.appendChild($timer2);

  const data = await loadDataset(
    'https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json',
  );

  const clusteredData = labelPropagation(data, false);
  clusteredData.clusters.forEach((cluster, i) => {
    cluster.nodes.forEach((node) => {
      node.data.cluster = `c${i}`;
    });
  });
  const degrees = {};
  data.edges.forEach((edge) => {
    const { source, target } = edge;
    degrees[source] = degrees[source] || 0;
    degrees[target] = degrees[target] || 0;
    degrees[source]++;
    degrees[target]++;
  });

  const configures = {
    modes: {
      default: ['zoom-canvas', 'drag-node'],
    },
    theme: {
      type: 'spec',
      specification: {
        node: {
          dataTypeField: 'cluster',
        },
      },
    },
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            ...innerModel.data.keyShape,
            r: 12 + degrees[innerModel.id] / 4,
          },
        },
      };
    },
    edge: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          type: 'line-edge',
          keyShape: {
            lineWidth: 1,
            stroke: '#fff',
            opacity: 1,
          },
        },
      };
    },
  };

  const layoutOptions = {
    dimensions: 2,
    maxIteration: 200,
    minMovement: 0.4,
    distanceThresholdMode: 'mean',
    height: HEIGHT,
    width: WIDTH,
    center: [WIDTH / 2, HEIGHT / 2],
    factor: 1,
    gravity: 10,
    linkDistance: 200,
    edgeStrength: 200,
    nodeStrength: 1000,
    coulombDisScale: 0.005,
    damping: 0.9,
    maxSpeed: 1000,
    interval: 0.02,
  };

  // Force layout WASM
  (async () => {
    const supported = await supportsThreads();
    const threads = await initThreads(supported);

    // Register custom layout
    G6.stdLib.layouts['force-wasm'] = ForceLayout;

    const graph = new G6.Graph({
      container: $container1,
      width: WIDTH,
      height: HEIGHT,
      data: JSON.parse(JSON.stringify(data)),
      layout: {
        type: 'force-wasm',
        threads,
        ...layoutOptions,
        maxIteration: 400,
        minMovement: 0.8,
      },
      ...configures,
    });

    let timer;
    graph.on('startlayout', () => {
      const startTime = performance.now();
      timer = setInterval(() => {
        $timer1.innerHTML = `Time: ${(performance.now() - startTime).toFixed(
          2,
        )}ms`;
      }, 1);
    });

    graph.on('endlayout', () => {
      clearInterval(timer);
      graph.zoom(0.1, undefined, {
        duration: 1000,
      });
    });
  })();

  // Force layout
  (() => {
    const graph = new G6.Graph({
      container: $container2,
      width: WIDTH,
      height: HEIGHT,
      data: JSON.parse(JSON.stringify(data)),
      layout: {
        type: 'force',
        workerEnabled: true,
        ...layoutOptions,
        maxIteration: 8000,
        minMovement: 0.2,
      },
      ...configures,
    });

    let timer;
    graph.on('startlayout', () => {
      const startTime = performance.now();
      timer = setInterval(() => {
        $timer2.innerHTML = `Time: ${(performance.now() - startTime).toFixed(
          2,
        )}ms`;
      }, 1);
    });

    graph.on('endlayout', () => {
      clearInterval(timer);

      graph.zoom(0.1, undefined, {
        duration: 1000,
      });
    });
  })();
};
