// @ts-nocheck
if (window) {
  window.d3Hierarchy = require('d3-hierarchy');
  window.gCanvas = require('@antv/g-canvas');
  window.gPluginRoughCanvasRenderer = require('@antv/g-plugin-rough-canvas-renderer');

  window.g6 = require('@antv/g6');
  window.g6Extension3d = require('@antv/g6-extension-3d');
  window.g6ExtensionReact = require('@antv/g6-extension-react');

  window.layout = require('@antv/layout');
  window.layoutGpu = require('@antv/layout-gpu');
  window.algorithm = require('@antv/algorithm');
  window.layoutWasm = require('@antv/layout-wasm');

  window.insertCss = require('insert-css');
  window.util = require('@antv/util');
  window.stats = require('stats.js');
  window.g = require('@antv/g');
  window.gSvg = require('@antv/g-svg');
  window.gWebgl = require('@antv/g-webgl');
  window.g2 = require('@antv/g2');
  window.antd = require('antd');
  window.icons = require('@ant-design/icons');

  window.react = require('react');
  window.React = window.react;
  window.client = require('react-dom');
  window.styledComponents = require('styled-components');

  window.addPanel = async (renderPanel: (gui) => void) => {
    const container = document.getElementById('container')?.parentNode;
    const gui = new window.lil.GUI({ container, autoPlace: true });
    gui.title('Control');
    renderPanel(gui);
    Object.assign(gui.domElement.style, {
      position: 'absolute',
      top: 0,
      right: 0,
    });
  };

  window.createContainer = (style = {}) => {
    const container = document.createElement('div');

    Object.entries(style).forEach(([key, value]) => {
      if (key === 'width' || key === 'height') {
        if (typeof value === 'number') {
          value = `${value}px`;
        }
      }
      container.style[key] = value;
    });
    return container;
  };

  // 用于文档中快速创建 ob demo 示例
  window.createGraph = async (options, style = {}, renderPanel?: (gui) => void) => {
    const container = createContainer(style);

    const graph = new window.g6.Graph({
      width: style.width,
      height: style.height,
      container,
      ...options,
    });

    await graph.render();

    if (renderPanel) {
      const $wrapper = createContainer({ width: style.width + 245, height: style.height, display: 'flex' });
      $wrapper.appendChild(container);

      const gui = new window.lil.GUI({ container: $wrapper, autoPlace: false });
      gui.title('Playground');
      renderPanel(gui, graph);
      $wrapper.appendChild(gui.domElement);

      return $wrapper;
    }

    return container;
  };
}
