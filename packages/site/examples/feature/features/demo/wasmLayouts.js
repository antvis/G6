import { Graph, Extensions, extend } from '@antv/g6';
import { supportsThreads, initThreads, ForceLayout, FruchtermanLayout, ForceAtlas2Layout } from '@antv/layout-wasm';

// WASM layout is not built-in G6 stbLib, you need to extend G6 with it.
const ExtGraph = extend(Graph, {
  transforms: { 'transform-v4-data': Extensions.TransformV4Data },
  layouts: {
    'force-wasm': ForceLayout,
    'forceAtlas2-wasm': ForceAtlas2Layout,
    'fruchterman-wasm': FruchtermanLayout,
  },
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
  },
});
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const descriptionDiv = document.createElement('div');
container.appendChild(descriptionDiv);

let timer;
const beginTimer = () => {
  const begin = performance.now();
  timer = setInterval(() => {
    descriptionDiv.innerHTML = `节点数量：1589, 边数量：2742 <br /> ⏰ Computing Time: ${Math.floor(
      performance.now() - begin,
    )}ms`;
  }, 10);
};
beginTimer();

let graph;

fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json') //'https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json'
  .then((res) => res.json())
  .then(async (data) => {
    const supported = await supportsThreads();
    const threads = await initThreads(supported);

    const layoutConfigs = {
      'force-wasm': {
        type: 'force-wasm',
        threads,
        dimensions: 2,
        maxIteration: 130,
        minMovement: 0.4,
        distanceThresholdMode: 'mean',
        height,
        width,
        center: [width / 2, height / 2],
        factor: 1,
        gravity: 10,
        linkDistance: 200,
        edgeStrength: 200,
        nodeStrength: 1000,
        coulombDisScale: 0.005,
        damping: 0.9,
        maxSpeed: 1000,
        interval: 0.02,
      },
      'forceAtals2-wasm': {
        type: 'forceAtlas2-wasm',
        threads,
        dimensions: 2,
        maxIteration: 100,
        minMovement: 0.4,
        distanceThresholdMode: 'mean',
        height,
        width,
        center: [width / 2, height / 2],
        kg: 5,
        kr: 10,
        ks: 0.1,
      },
      'fruchterman-wasm': {
        type: 'fruchterman-wasm',
        threads,
        dimensions: 2,
        maxIteration: 1000,
        minMovement: 0.4,
        distanceThresholdMode: 'mean',
        height,
        width,
        gravity: 1,
        speed: 5,
      },
    };

    // remove positions in data to avoid the affecting
    data.nodes.forEach((node) => {
      delete node.x;
      delete node.y;
    });

    graph = new ExtGraph({
      container: 'container',
      width,
      height,
      renderer: 'webgl',
      transforms: [
        {
          type: 'transform-v4-data',
          activeLifecycle: ['read'],
        },
      ],
      layout: layoutConfigs['force-wasm'],
      autoFit: 'view',
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'brush-select', 'click-select', 'hover-activate'],
      },
      data,
    });
    graph.on('afterlayout', (e) => {
      clearTimeout(timer);
    });

    const btnContainer = document.createElement('div');
    btnContainer.style.position = 'absolute';
    container.appendChild(btnContainer);
    const tip = document.createElement('span');
    tip.innerHTML = '👉 Change Layout:';
    btnContainer.appendChild(tip);

    Object.keys(layoutConfigs).forEach((name, i) => {
      const btn = document.createElement('a');
      btn.innerHTML = name;
      btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      btn.style.padding = '4px';
      btn.style.marginLeft = i > 0 ? '24px' : '8px';
      btnContainer.appendChild(btn);
      btn.addEventListener('click', () => {
        beginTimer();
        graph.layout(layoutConfigs[name]);
      });
    });
  });

window.graph = graph;
