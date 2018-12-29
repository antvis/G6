const Util = require('../util');
const Behavior = {};

Behavior.registerBehavior = function(type, behavior) {
  if (!behavior) {
    throw new Error('please specify handler for this behavior:' + type);
  }
  const base = function(cfg) {
    Util.mix(this, this.getDefaultCfg(), cfg);
  };
  Util.augment(base, {
    shouldBegin() {
      return true;
    },
    shouldUpdate() {
      return true;
    },
    get(val) {
      return this[val];
    },
    set(key, val) {
      this[key] = val;
      return this;
    },
    getDefaultCfg() {},
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

