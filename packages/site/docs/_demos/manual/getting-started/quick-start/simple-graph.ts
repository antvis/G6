import { Graph as DemoGraph } from '@antv/g6';

async function createGraph(options, size = {}) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%', maxWidth: `${size.width || 600}px`, height: `${size.height || 400}px`,
  });
  document.getElementById('container').append(container);
  const graph = new DemoGraph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  return container;
}

fetch('https://assets.antv.antgroup.com/g6/graph.json')
  .then((res) => res.json())
  .then((data) =>
    createGraph(
      {
        data,
        autoFit: 'view',
        animation: false,
        node: {
          style: {
            size: 10,
          },
          palette: {
            field: 'group',
            color: 'tableau',
          },
        },
        layout: {
          type: 'd3-force',
          animation: false,
          manyBody: {},
          x: {},
          y: {},
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      },
      { width: 500, height: 500 },
    ),
  );
