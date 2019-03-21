const Util = require('../util');
const base = require('./tooltip-base');

module.exports = Util.mix({
  getDefaultCfg() {
    return {
      item: 'node',
      formatText(model) { return model.label; }
    };
  },
  getEvents() {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove'
    };
  }
}, base);
