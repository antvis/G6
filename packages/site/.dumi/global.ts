// @ts-nocheck
if (window) {
  // window.g6 = require('@antv/g6/es'); // import the source for debugging
  window.g6 = require('@antv/g6/src'); // import the source for debugging

  window.layoutGpu = require('@antv/layout-gpu'); // import the source for debugging
  window.algorithm = require('@antv/algorithm');
  window.layoutWasm = require('@antv/layout-wasm'); // import the source for debugging
  window.graphlib = require('@antv/graphlib');

  window.insertCss = require('insert-css');
  window.util = require('@antv/util');
  window.stats = require('stats.js');
  window.g2 = require('@antv/g2');
  window.antd = require('antd');

  window.React = require('react');
  window.ReactDOM = require('react-dom');

  // 用于文档中快速创建 ob demo 示例
  window.createGraph = (options, style = {}) => {
    const container = document.createElement('div');
    Object.entries(style).forEach(([key, value]) => {
      if (key === 'width' || key === 'height') {
        if (typeof value === 'number') {
          container.style[key] = `${value}px`;
        }
        container.style[key] = value;
      }
    });

    const graph = new window.g6.Graph({
      width: style.width,
      height: style.height,
      container,
      ...options,
    });

    graph.render();

    return container;
  };
}
