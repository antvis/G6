if window {
  // window.g6 = require('@antv/g6/es'); // import the source for debugging
  window.g6 = require('@antv/g6/lib'); // import the source for debugging

  window.layoutGPU = require('@antv/layout-gpu'); // import the source for debugging
  window.Algorithm = require('@antv/algorithm');
  window.layoutWASM = require('@antv/layout-wasm'); // import the source for debugging
  window.GraphLib = require('@antv/graphlib');

  window.MapViewPlugin = require('@antv/g6-plugin-map-view');
  // window.g6 = require('@antv/g6/diFst/g6.min.js'); // import the package for webworker
  window.insertCss = require('insert-css');
  window.Chart = require('@antv/chart-node-g6');
  window.AntVUtil = require('@antv/util');
  window.GraphLayoutPredict = require('@antv/vis-predict-engine');
  window.stats = require('stats.js');
  window.g2 = require('@antv/g2');
}
