/**
 * @fileOverview
 * The base class for complex class
 * @author huangtonger@aliyun.com
 */

const Util = require('./util/');
const EventEmitter = require('wolfy87-eventemitter');

class Base extends EventEmitter {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this._cfg = Util.mix({}, defaultCfg, cfg);
  }

  get(name) {
    return this._cfg[name];
  }

  set(name, value) {
    this._cfg[name] = value;
  }

  destroy() {
    this._cfg = {};
    this.removeAllListeners();
    this.destroyed = true;
  }
}

module.exports = Base;
