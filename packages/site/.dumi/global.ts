if (window) {
  // window.g6 = require('@antv/g6/es'); // import the source for debugging
  // window.g6 = require('@antv/g6/lib'); // import the source for debugging
  (window as any).g6 = require('@antv/g6'); // import the package for webworker // /dist/g6.min.js
  (window as any).g6v5 = require('g6v5'); // import the package for webworker
  (window as any).Algorithm = require('@antv/algorithm'); // import the package for webworker
  (window as any).Layout = require('@antv/layout-wasm');
  (window as any).Hierarchy = require('@antv/hierarchy');
  (window as any).insertCss = require('insert-css');
  (window as any).Chart = require('@antv/chart-node-g6');
  (window as any).AntVUtil = require('@antv/util');
  (window as any).GraphLayoutPredict = require('@antv/vis-predict-engine');
}