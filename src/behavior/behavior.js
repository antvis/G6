const Util = require('../util');
const Behavior = {};

Behavior.registerBehavior = function(type, behavior) {
  if (!behavior) {
    throw new Error('please specify handler for this behavior:' + type);
  }
  const base = function(cfg) {
    this._cfg = cfg;
  };
  Util.augment(base, {
    get(val) {
      return this._cfg[val];
    },
    set(key, val) {
      this._cfg[key] = val;
      return this;
    },
    bind() {},
    unbind() {}
  }, behavior);
  Behavior[type] = base;
};

Behavior.hasBehavior = function(type) {
  return !!Behavior[type];
};

Behavior.getBehavior = function(type) {
  return Behavior[type];
};

module.exports = Behavior;

