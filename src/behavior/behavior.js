const Util = require('../util');
const Behavior = {};

Behavior.registerBehavior = function(type, behaviors) {
  if (!behaviors) {
    throw new Error('please specify handler for this behavior:' + name);
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
  }, behaviors);
  Behavior[type] = base;
};

Behavior.hasBehavior = function(type) {
  return !!Behavior[type];
};

Behavior.getBehavior = function(type) {
  return Behavior[type];
};

module.exports = Behavior;

