if (window) {
  // window.g6 = require('@antv/g6/es'); // import the source for debugging
  (window as any).g6 = require('@antv/g6/lib'); // import the source for debugging
  (window as any).layoutGPU = require('@antv/layout-gpu'); // import the source for debugging
  (window as any).Algorithm = require('@antv/algorithm');
  (window as any).layoutWASM = require('@antv/layout-wasm'); // import the source for debugging
  (window as any).GraphLib = require('@antv/graphlib');
  // (window as any).g6 = require('@antv/g6/dist/g6.min.js'); // import the package for webworker
  (window as any).insertCss = require('insert-css');
  (window as any).Chart = require('@antv/chart-node-g6');
  (window as any).AntVUtil = require('@antv/util');
  (window as any).GraphLayoutPredict = require('@antv/vis-predict-engine');
  (window as any).stats = require('stats.js');
}
