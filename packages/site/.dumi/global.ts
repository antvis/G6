if (window) {
  // window.g6 = require('@antv/g6/es'); // import the source for debugging
  window.g6 = require('@antv/g6/lib'); // import the source for debugging

  window.layoutGpu = require('@antv/layout-gpu'); // import the source for debugging
  window.algorithm = require('@antv/algorithm');
  window.layoutWasm = require('@antv/layout-wasm'); // import the source for debugging
  window.graphlib = require('@antv/graphlib');

  window.g6PluginMapView = require('@antv/g6-plugin-map-view');
  // window.g6 = require('@antv/g6/diFst/g6.min.js'); // import the package for webworker
  window.insertCss = require('insert-css');
  window.util = require('@antv/util');
  window.stats = require('stats.js');
  window.g2 = require('@antv/g2');
}
