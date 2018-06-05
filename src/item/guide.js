/**
 * @fileOverview guide item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');

class Guide extends Item {
  constructor(cfg) {
    const defaultCfg = {
      type: 'guide',
      isGuide: true,
      zIndex: 4
    };
    Util.mix(defaultCfg, cfg);
    super(defaultCfg);
  }
}

module.exports = Guide;
