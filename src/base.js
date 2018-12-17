/**
 * @fileOverview
 * The base class for complex class
 * @author huangtonger@aliyun.com
 */

const Util = require('./util/');
const EventEmitter = require('@antv/g/lib/core/mixin/event');

class Base extends EventEmitter {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    super();
    this._cfg = Util.mix({}, this.getDefaultCfg(), cfg);
    this._cfg._events = {};
  }

  get(name) {
    return this._cfg[name];
  }

  set(name, value) {
    this._cfg[name] = value;
  }

  destroy() {
    this._cfg = {};
    this.removeEvent();
    this.destroyed = true;
  }
}

module.exports = Base;
