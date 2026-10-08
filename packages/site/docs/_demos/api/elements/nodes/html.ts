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
          style: {
            x: 300,
            y: 110,
            size: [120, 40],
            innerHTML: `
<div style="width: 100%; height: 100%; background: #7e3feb; display: flex; justify-content: center; align-items: center;">
  <span style="color: #fff; font-size: 12px;">
    HTML Node
  </span>
</div>`,
          },
        },
      ],
    },
    node: { type: 'html' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'html' }, 'type').disable();

    const options = {
      size: 50,
      innerHTML: `
<div style="width: 100%; height: 100%; background: #7863FF; display: flex; justify-content: center; align-items: center;">
  <span style="color: #fff; font-size: 20px;">
    'HTML Node'
  </span>
</div>`,
    };
    const optionFolder = gui.addFolder('html.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'innerHTML');

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
