// @ts-nocheck
if (window) {
  // window.g6 = require('@antv/g6/es'); // import the source for debugging
  window.g6 = require('@antv/g6'); // import the source for debugging

  window.layoutGpu = require('@antv/layout-gpu'); // import the source for debugging
  window.algorithm = require('@antv/algorithm');
  window.layoutWasm = require('@antv/layout-wasm'); // import the source for debugging
  window.graphlib = require('@antv/graphlib');

  // todo 两个包目前报错
  // window.g6PluginMapView = require('@antv/g6-plugin-map-view');
  // window.g6ReactNode = require('@antv/g6-react-node');
  window.insertCss = require('insert-css');
  window.util = require('@antv/util');
  window.stats = require('stats.js');
  window.g2 = require('@antv/g2');
  window.antd = require('antd');

  window.React = require('react');
  window.ReactDOM = require('react-dom');
}
