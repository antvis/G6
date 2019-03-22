const Util = require('../util');
const base = require('./tooltip-base');

module.exports = Util.mix({
  getDefaultCfg() {
    return {
      item: 'edge',
      formatText(model) { return 'source:' + model.source + ' target:' + model.target; }
    };
  },
  getEvents() {
    return {
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove'
    };
  }
}, base);
