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

import * as g6 from '@antv/g6';
(async () => {
  const { BaseBehavior, CanvasEvent, register, ExtensionCategory, Graph } = g6;

  class ClickAddNode extends BaseBehavior {
    constructor(context, options) {
      super(context, options);

      const { graph } = this.context;
      graph.on(CanvasEvent.CLICK, (event) => {
        const { layerX, layerY } = event.nativeEvent;
        graph.addNodeData([
          {
            id: 'node-' + Date.now(),
            style: { x: layerX, y: layerY, fill: options.fill },
          },
        ]);
        graph.draw();
      });
    }
  }

  register(ExtensionCategory.BEHAVIOR, 'click-add-node', ClickAddNode);

  const wrapEl = await createGraph(
    {
      data: {
        nodes: [],
      },
      behaviors: [
        {
          type: 'click-add-node',
          key: 'click-add-node',
          fill: 'red',
        },
      ],
    },
    { width: 600, height: 300 },
    (gui, graph) => {
      const options = {
        key: 'click-add-node',
        type: 'click-add-node',
        fill: 'red',
      };
      const optionFolder = gui.addFolder('ClickAddNode Options');
      optionFolder.add(options, 'fill', ['red', 'black', 'blue', 'green', 'yellow', 'purple']);

      optionFolder.onChange(({ property, value }) => {
        graph.updateBehavior({
          key: 'click-add-node',
          [property]: value,
        });
        graph.render();
      });
    },
  );

  return wrapEl;
})();
