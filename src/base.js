/**
 * @fileOverview
 * The base class for complex class
 * @author huangtonger@aliyun.com
 */

const Util = require('./util/');
const EventEmitter = require('@antv/g/lib/').EventEmitter;

class Base extends EventEmitter {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    super();
    const self = this;
    Util.mix(self, self.getDefaultCfg());                 // 对象私有属性
    self.model = Util.mix({}, cfg);                       // 用户设置的
    this._cfg = {};                                       // 状态，绘图属性等暂存
  }

  get(name) {
    return this.model[name];
  }

  set(name, value) {
    this.model[name] = value;
  }

  destroy() {
    this.model = {};
    this.removeEvent();
    this.destroyed = true;
  }
}

module.exports = Base;
