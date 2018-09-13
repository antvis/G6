/**
 * @fileOverview force atlas 2
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;
const Worker = require('./layout.worker');
const ForceCal = require('./forceCalculator');

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
      kr: 0,

      /**
       * the parameter for gravity forces
       * @type  {number}
       */
      kg: 1,

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
      barnesHut: '',

      /**
       * the max iteration number
       * @type  {number}
       */
      maxIteration: 0,

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
      onLayoutComplete: () => {},

      /**
       * activate the webworker for this algorithm or not
       * @type  {boolean}
       */
      useWorker: true,

      /**
       * activate prune or not.
       * prune the leaves during most iterations, layout the leaves in the last 50 iteraitons.
       * if prune === '', it will be activated when the nodes number > 100
       * note that it will reduce the quality of the layout
       * @type  {boolean}
       */
      prune: ''
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
      maxIteration,
      barnesHut,
      ks,
      ksmax,
      tao,
      onLayoutComplete,
      prune
    } = this;

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
      widths[i] = (graph.getNodes()[i].getBBox().maxX - graph.getNodes()[i].getBBox().minX) / 2;
    }

    if (barnesHut === '') {
      barnesHut = false;
      if (size > 250) {
        barnesHut = true;
      }
      this.barnesHut = barnesHut;
    }
    if (prune === '') {
      if (size > 100) prune = true;
      else prune = false;
    }
    if (this.maxIteration === 0 && !prune) {
      maxIteration = 250;
      if (size <= 200 && size > 100) maxIteration = 1000;
      else if (size > 200) maxIteration = 1200;
      this.maxIteration = maxIteration;
    } else if (this.maxIteration === 0 && prune) {
      maxIteration = 100;
      if (size <= 200 && size > 100) maxIteration = 500;
      else if (size > 200) maxIteration = 950;
      this.maxIteration = maxIteration;
    }

    if (kr === 0) {
      kr = 50;
      if (size > 100 && size <= 500) kr = 20;
      else if (size > 500) kr = 1;
    }
    if (kg === 0) {
      kg = 20;
      if (size > 100 && size <= 500) kg = 10;
      else if (size > 500) kg = 1;
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
      widths,
      prune
    };
    if (this.useWorker) {

      // a loading dom before worker
      const loading = Util.createDOM('<div></div>');
      loading.id = 'loading';
      loading.style.setProperty('background-color', '#fff');
      loading.style.setProperty('position', 'absolute');
      const parent = graph.getGraphContainer().parentNode;
      const divHeight = parent.offsetHeight ? parent.offsetHeight : 600;
      const divWidth = parent.offsetWidth ? parent.offsetWidth : 600;
      loading.style.setProperty('width', divWidth + 'px');
      loading.style.setProperty('height', divHeight + 'px');
      loading.style.setProperty('margin-top', -parent.offsetHeight + 'px');
      loading.style.zIndex = 4;
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
      graph.on('afterdestroy', () => {
        if (loading !== null && loading !== undefined) { loading.destroy(); }
      });

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
        graph.updateNodePosition();
        graph.emit('afterlayout');
        const fitView = graph.get('fitView');
        fitView && graph.setFitView(fitView);
        worker.terminate();
        loading.style.display = 'none';
        loading.destroy();
        onLayoutComplete();
      };
    } else {
      const forceCal = new ForceCal();
      this.nodes = forceCal.updateNodesByForces(obj);
      const graphNodes = graph.getNodes();
      for (let i = 0; i < size; i += 1) {
        const model = graphNodes[i].getModel();
        model.x = this.nodes[i].x;
        model.y = this.nodes[i].y;
      }
      graph.updateNodePosition();
      graph.emit('afterlayout');
      const fitView = graph.get('fitView');
      fitView && graph.setFitView(fitView);
      onLayoutComplete();
    }
  }
}
module.exports = Layout;
