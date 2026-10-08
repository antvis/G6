import GUI from 'lil-gui';

function addPanel(renderPanel) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

import { Graph as DemoGraph } from '@antv/g6';

async function createGraph(options, size = {}, renderPanel) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%', maxWidth: `${size.width || 600}px`, height: `${size.height || 400}px`,
  });
  document.getElementById('container').append(container);
  const graph = new DemoGraph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}

createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 150, y: 150 },
        },
        {
          id: 'node2',
          style: {
            x: 400,
            y: 150,
            labelText: 'Drag Me!',
            labelPadding: [1, 5],
            labelBackground: true,
            labelBackgroundRadius: 10,
            labelBackgroundFill: '#99add1',
          },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          text: 'polyline',
        },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        stroke: '#7e3feb',
        lineWidth: 2,
        labelText: (d) => d.text,
        labelBackground: true,
        labelBackgroundFill: '#f9f0ff',
        labelBackgroundOpacity: 1,
        labelBackgroundLineWidth: 2,
        labelBackgroundStroke: '#7e3feb',
        labelPadding: [1, 10],
        labelBackgroundRadius: 4,
        router: { type: 'orth' },
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'polyline' }, 'type').disable();

    let index = 3;
    const options = {
      radius: 0,
      router: {
        type: 'orth',
      },
      random: () => {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 300);
        graph.addNodeData([
          {
            id: `node-${index}`,
            style: {
              size: 5,
              fill: '#7e3feb',
              x,
              y,
            },
          },
        ]);
        index++;
        graph.updateEdgeData((prev) => {
          const targetEdgeData = prev.find((edge) => edge.id === 'edge1');
          const controlPoints = [...(targetEdgeData.style.controlPoints || [])];
          controlPoints.push([x, y]);
          return [{ ...targetEdgeData, style: { ...targetEdgeData.style, controlPoints } }];
        });
        graph.render();
      },
    };
    const optionFolder = gui.addFolder('polyline.style');
    optionFolder.add(options, 'radius', 0, 100, 1);
    optionFolder.add(options, 'router');
    optionFolder.add(options, 'random').name('Add random node as control points');

    optionFolder.onChange(({ property, value }) => {
      if (property === 'random') return;
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
