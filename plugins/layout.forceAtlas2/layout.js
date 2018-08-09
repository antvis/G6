/**
 * @fileOverview force atlas 2
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;
const Worker = require('./layout.worker');

// import StaticsWorker from 'worker-loader?inline!./statistics.worker.js';
class Layout {
  constructor(options) {
    Util.mix(this, {
      /**
       * width
       * @type  {number}
       */
      width: null,

      /**
       * height
       * @type  {number}
       */
      height: null,

      /**
       * the center of the layout
       * @type  {object}
       */
      center: null,

      /**
       * the parameter for repulsive forces,
       * it will scale the layout but won't change the layout
       * larger the kr, looser the layout
       * @type  {number}
       */
      kr: 10,

      /**
       * the parameter for gravity forces
       * @type  {number}
       */
      kg: 1.0,

      /**
       * modes:
       * 'normal' for normal using
       * 'linlog' for closer clusters.
       * @type  {string}
       */
      mode: 'normal',

      /**
       * whether preventing the node overlapping
       * @type  {boolean}
       */
      prevOverlapping: false,

      /**
       * whether active the dissuade hub mode
       * true: grant authorities (nodes with a high indegree)
       * a more central position than hubs (nodes with a high outdegree)
       * @type  {boolean}
       */
      dissuadeHubs: false,

      /**
       * whether active the barnes hut optimization on computing repulsive forces
       * @type  {boolean}
       */
      barnesHut: false,

      /**
       * the max iteration number
       * @type  {number}
       */
      maxIteration: 1500,

      /**
       * control the global velocity
       * defualt: 0.1(gephi)
       * @type  {number}
       */
      ks: 0.1,

      /**
       * the max global velocity
       * @type  {number}
       */
      ksmax: 10,

      /**
       * the tolerance for the global swinging
       * @type  {number}
       */
      tao: 0.1,

      /**
       * the function of layout complete listener, display the legend and minimap after layout
       * @type  {function}
       */
      onLayoutComplete: () => {}
    }, options);
  }
  // execute the layout
  execute() {
    let {
      graph,
      nodes,
      edges,
      kr,
      kg,
      mode,
      prevOverlapping,
      dissuadeHubs,
      barnesHut,
      maxIteration,
      ks,
      ksmax,
      tao,
      onLayoutComplete
    } = this;

    if (!barnesHut && nodes.length > 300) barnesHut = true;
    else if (barnesHut && nodes.length <= 300) barnesHut = false;

    const width = this.width ? this.width : graph.getWidth();
    const height = this.height ? this.height : graph.getHeight();
    const center = this.center ? this.center : {
      x: width / 2,
      y: height / 2
    };
    // the whidth of each nodes
    const widths = [];
    const size = nodes.length;
    for (let i = 0; i < size; i += 1) {
      widths[i] = graph.getNodes()[i].getBBox().maxX;
    }
    const obj = {
      nodes,
      edges,
      kr,
      kg,
      mode,
      prevOverlapping,
      dissuadeHubs,
      barnesHut,
      maxIteration,
      ks,
      ksmax,
      tao,
      center,
      widths
    };

   // a loading dom before worker
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.setProperty('background-color', '#fff');
    loading.style.setProperty('position', 'absolute');
    const parent = graph.getGraphContainer().parentNode;
    const divHeight = parent.offsetHeight ? parent.offsetHeight : 600;
    const divWidth = parent.offsetWidth ? parent.offsetWidth : 600;
    loading.style.setProperty('width', divWidth + 'px');
    loading.style.setProperty('height', divHeight + 'px');
    loading.style.setProperty('margin-top', -parent.offsetHeight + 'px');
    loading.style.zIndex = 999;
    parent.appendChild(loading);
    // the loading image
    const imgSize = 200;
    const loadingImg = document.createElement('img');
    loadingImg.src = 'https://gw.alipayobjects.com/zos/rmsportal/mnEmjOmrHbghTsZNeTmI.gif';
    loadingImg.style.setProperty('width', imgSize + 'px');
    loadingImg.style.setProperty('height', imgSize + 'px');
    const Cw = imgSize;
    const Pw = loading.offsetWidth;
    const left = (Pw - Cw) / 2;
    loadingImg.style.setProperty('margin-left', left + 'px');
    const Ch = imgSize;
    const Ph = loading.offsetHeight;
    const top = (Ph - Ch) / 2;
    loadingImg.style.setProperty('margin-top', top + 'px');
    loading.appendChild(loadingImg);

    const worker = new Worker();
    worker.postMessage(obj);
    worker.onmessage = function(event) {
      this.nodes = event.data;
      const graphNodes = graph.getNodes();
      for (let i = 0; i < size; i += 1) {
        const model = graphNodes[i].getModel();
        model.x = this.nodes[i].x;
        model.y = this.nodes[i].y;
      }
      graph.changeLayout();
      const fitView = graph.get('fitView');
      fitView && graph.setFitView(fitView);
      worker.terminate();
      loading.style.display = 'none';
      onLayoutComplete();

    };
  }
}
module.exports = Layout;
