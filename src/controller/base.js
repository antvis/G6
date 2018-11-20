/**
 * @fileOverview controller base
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');

class Base {
  getDefaultCfg() {
    return {};
  }
  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this._init();
  }
  _init() {}
  destroy() {}
}

module.exports = Base;
